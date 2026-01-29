import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PagoClient } from './pago-client'

export const metadata: Metadata = {
  title: 'Completa tu Pago | Academy AppCreatorBR',
  description: 'Realiza el pago para activar tu inscripción al curso.',
}

export default async function PagoPage() {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name')
    .eq('id', user.id)
    .single()

  // Check for pending enrollment
  const { data: enrollment, error: enrollmentError } = await supabase
    .from('enrollments')
    .select(`
      id,
      payment_status,
      status,
      courses (
        id,
        name,
        number
      )
    `)
    .eq('user_id', user.id)
    .single()

  if (enrollmentError || !enrollment) {
    // No enrollment found, redirect to registration
    redirect('/registro')
  }

  // If already paid, redirect to dashboard
  if (enrollment.payment_status === 'paid') {
    redirect('/student/dashboard')
  }

  // Handle both array and single object cases from Supabase
  const courseData = enrollment.courses
  const course = Array.isArray(courseData) ? courseData[0] : courseData as { id: string; name: string; number: number }
  const userName = profile 
    ? `${profile.first_name} ${profile.last_name}` 
    : user.user_metadata?.full_name || user.email || 'Usuario'

  return (
    <PagoClient
      courseName={course.name}
      courseNumber={course.number}
      userName={userName}
    />
  )
}
