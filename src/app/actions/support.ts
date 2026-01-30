'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function submitSupportTicket(formData: {
  category: string
  subject: string
  description: string
}) {
  const supabase = await createClient()

  // Get user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return { error: 'No autorizado. Por favor inicia sesión.' }
  }

  try {
    // Get profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', user.id)
      .single()
    
    const userName = profile?.full_name || 'Estudiante'

    // Send email via Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Soporte Runa Academy <soporte@appcreatorbr.com>",
        to: ["contacto@appcreatorbr.com"],
        reply_to: user.email,
        subject: `[Soporte] ${formData.category}: ${formData.subject}`,
        html: `
          <h1>Nuevo Ticket de Soporte</h1>
          <p><strong>De:</strong> ${userName} (${user.email})</p>
          <p><strong>Categoría:</strong> ${formData.category}</p>
          <hr />
          <h3>${formData.subject}</h3>
          <p>${formData.description}</p>
        `,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Resend error:', data)
      return { error: 'Error al enviar el email. Intenta de nuevo.' }
    }

    revalidatePath('/student/soporte')
    return { success: true, data }
  } catch (error) {
    console.error('Submit ticket error:', error)
    return { error: 'Error inesperado. Intenta de nuevo.' }
  }
}
