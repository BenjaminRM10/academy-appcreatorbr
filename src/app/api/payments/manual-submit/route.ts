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

  // Update enrollment
  const { error } = await supabase
    .from('enrollments')
    .update({
      payment_method: 'spei_manual',
      payment_proof_status: 'submitted',
      payment_proof_submitted_at: new Date().toISOString(),
    })
    .eq('user_id', user.id)

  if (error) {
    console.error('Error updating manual payment:', error)
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
