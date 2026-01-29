import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
        global: { headers: { Authorization: req.headers.get('Authorization')! } },
    })

    // 1. Get User from Auth Context
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    // 2. Parse Request Body
    const { category, subject, description } = await req.json()

    // 3. Get Profile Info
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()
    
    const userName = profile?.full_name || 'Estudiante'
    const userEmail = user.email

    // 4. Send Email via Resend API (Direct Fetch)
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Soporte AcademyBR <onboarding@resend.dev>",
        to: ["contacto@appcreatorbr.com"],
        reply_to: userEmail,
        subject: `[Soporte] ${category}: ${subject}`,
        html: `
          <h1>Nuevo Ticket de Soporte</h1>
          <p><strong>De:</strong> ${userName} (${userEmail})</p>
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
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        })
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})
