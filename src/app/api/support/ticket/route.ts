import { NextRequest, NextResponse } from 'next/server';
import { resend } from '@/lib/resend';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // 1. Verify Authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Get Request Data
    const body = await request.json();
    const { subject, description, category } = body;

    if (!subject || !description) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 3. Get User Profile for context
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, phone')
      .eq('id', user.id)
      .single();

    const userName = profile?.full_name || user.email || 'Estudiante';
    const userEmail = user.email!;

    // 4. Send Email via Resend
    const data = await resend.emails.send({
      from: 'Soporte Saltillo Academy <onboarding@resend.dev>', // Use default until domain is verified
      to: ['contacto@appcreatorbr.com'], // Destination
      replyTo: userEmail, // Critical: Allows replying directly to student
      subject: `[Soporte] ${category || 'General'}: ${subject} - ${userName}`,
      html: `
        <h1>Nuevo Ticket de Soporte</h1>
        <p><strong>Estudiante:</strong> ${userName} (${userEmail})</p>
        <p><strong>ID Usuario:</strong> ${user.id}</p>
        <p><strong>Categoría:</strong> ${category}</p>
        <hr />
        <h3>${subject}</h3>
        <p style="white-space: pre-wrap;">${description}</p>
        <hr />
        <p><small>Este correo fue enviado desde la plataforma de estudiantes de Saltillo Academy.</small></p>
      `,
    });

    if (data.error) {
      console.error("Resend Error:", data.error);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.data?.id });

  } catch (error) {
    console.error('Support API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
