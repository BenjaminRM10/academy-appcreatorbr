import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    console.log('Auth header:', authHeader ? 'Present' : 'Missing')
    
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Initialize Supabase with auth header
    const supabase = createClient(
      SUPABASE_URL ?? '',
      SUPABASE_ANON_KEY ?? '',
      {
        global: {
          headers: { Authorization: authHeader },
        },
      }
    )

    // Get user - extract Bearer token
    const token = authHeader.replace('Bearer ', '')
    console.log('Token length:', token.length)
    
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token)

    console.log('User error:', userError)
    console.log('User:', user ? 'Found' : 'Not found')

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized', details: userError?.message }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Parse body
    const { category, subject, description } = await req.json()

    // Get profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()
    
    const userName = profile?.full_name || 'Estudiante'

    // Send email
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Soporte AcademyBR <onboarding@resend.dev>",
        to: ["contacto@appcreatorbr.com"],
        reply_to: user.email,
        subject: `[Soporte] ${category}: ${subject}`,
        html: `
          <h1>Nuevo Ticket de Soporte</h1>
          <p><strong>De:</strong> ${userName} (${user.email})</p>
          <p><strong>Categoría:</strong> ${category}</p>
          <hr />
          <h3>${subject}</h3>
          <p>${description}</p>
        `,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      return new Response(JSON.stringify(data), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
