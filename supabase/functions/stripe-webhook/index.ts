import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"
import Stripe from "https://esm.sh/stripe@14.16.0"

serve(async (req) => {
  try {
    const signature = req.headers.get('stripe-signature')
    
    if (!signature) {
      return new Response('Error: missing stripe-signature header', { status: 400 })
    }

    const stripeKey = Deno.env.get('STRIPE_SECRET_KEY')
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')

    if (!stripeKey || !webhookSecret) {
      console.error('Missing secrets:', { stripeKey: !!stripeKey, webhookSecret: !!webhookSecret })
      return new Response('Error: missing secrets', { status: 500 })
    }

    const stripe = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    })

    const body = await req.text()
    let event

    // Simple, robust check: verify webhook secret is present
    if (!webhookSecret) {
      console.error('Webhook secret is missing from environment variables.')
      return new Response('Server Error: Webhook secret missing', { status: 500 })
    }

    try {
      // Use the raw body text for signature verification
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret)
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`)
      return new Response(`Webhook Error: ${err.message}`, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      const { user_id, enrollment_id } = session.metadata || {}

      if (user_id && enrollment_id) {
        // Initialize Supabase with Service Role Key (Admin) - Production Safe
        const supabaseAdmin = createClient(
          Deno.env.get('SUPABASE_URL') ?? '',
          Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const { error } = await supabaseAdmin
          .from('enrollments')
          .update({
            payment_status: 'paid',
            status: 'active',
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent,
            paid_at: new Date().toISOString(),
          })
          .eq('id', enrollment_id)

        if (error) {
          console.error('Error updating enrollment:', error)
          return new Response('Error updating database', { status: 500 })
        }
        console.log(`Enrollment ${enrollment_id} activated for user ${user_id}`)
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (err) {
    console.error(err)
    return new Response(err.message, { status: 400 })
  }
})
