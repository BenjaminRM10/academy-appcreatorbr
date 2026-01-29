import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { enrollmentId } = await req.json()

  if (!enrollmentId) {
    return NextResponse.json({ error: 'Missing enrollmentId' }, { status: 400 })
  }

  const { error } = await supabase
    .from('enrollments')
    .update({
      payment_status: 'paid',
      status: 'active',
      payment_proof_status: 'verified',
      paid_at: new Date().toISOString(),
    })
    .eq('id', enrollmentId)

  if (error) {
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
