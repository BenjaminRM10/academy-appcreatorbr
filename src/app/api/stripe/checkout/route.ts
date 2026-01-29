import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getStripe, COURSE_PRICE_CENTAVOS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Get user's pending enrollment
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .select(`
        id,
        course_id,
        payment_status,
        courses (
          id,
          name,
          number
        )
      `)
      .eq('user_id', user.id)
      .eq('payment_status', 'pending')
      .single()

    if (enrollmentError || !enrollment) {
      return NextResponse.json(
        { error: 'No se encontró inscripción pendiente de pago' },
        { status: 404 }
      )
    }

    // Handle both array and single object cases from Supabase
    const courseData = enrollment.courses
    const course = (Array.isArray(courseData) ? courseData[0] : courseData) as { id: string; name: string; number: number }
    
    // Get base URL
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin') || 'http://localhost:3000'

    // Create Stripe Checkout session
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'mxn',
            product_data: {
              name: `Curso ${course.number}: ${course.name}`,
              description: 'Inscripción al curso - Academy AppCreatorBR',
            },
            unit_amount: COURSE_PRICE_CENTAVOS,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/pago/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pago/cancelado`,
      customer_email: user.email,
      metadata: {
        user_id: user.id,
        enrollment_id: enrollment.id,
        course_id: enrollment.course_id,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Error al crear la sesión de pago' },
      { status: 500 }
    )
  }
}
