import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'

// Required for Stripe webhooks - don't parse body as JSON
export const runtime = 'nodejs'

// Create a Supabase client with service role for webhook (bypasses RLS)
function getServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createClient(supabaseUrl, supabaseServiceKey)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('STRIPE_WEBHOOK_SECRET is not set')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    let event: Stripe.Event

    try {
      const stripe = getStripe()
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      console.error(`Webhook signature verification failed: ${errorMessage}`)
      return NextResponse.json(
        { error: `Webhook Error: ${errorMessage}` },
        { status: 400 }
      )
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      const { user_id, enrollment_id, course_id } = session.metadata || {}

      if (!user_id || !enrollment_id) {
        console.error('Missing metadata in checkout session:', session.id)
        return NextResponse.json(
          { error: 'Missing required metadata' },
          { status: 400 }
        )
      }

      console.log(`Payment completed for user ${user_id}, enrollment ${enrollment_id}`)

      // Update enrollment status in database
      const supabase = getServiceClient()

      const { error: updateError } = await supabase
        .from('enrollments')
        .update({
          payment_status: 'paid',
          status: 'active',
          stripe_session_id: session.id,
          stripe_payment_intent: session.payment_intent as string,
          paid_at: new Date().toISOString(),
        })
        .eq('id', enrollment_id)
        .eq('user_id', user_id)

      if (updateError) {
        console.error('Error updating enrollment:', updateError)
        return NextResponse.json(
          { error: 'Error updating enrollment' },
          { status: 500 }
        )
      }

      console.log(`Enrollment ${enrollment_id} updated to paid/active`)

      // TODO: Send confirmation email
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}
