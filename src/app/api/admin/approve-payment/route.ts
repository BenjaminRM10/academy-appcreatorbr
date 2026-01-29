import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // 1. Verify Admin Auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 2. Process Request
  const { userId } = await request.json();

  if (!userId) return NextResponse.json({ error: 'User ID required' }, { status: 400 });

  // 3. Update Enrollment
  const { error } = await supabase
    .from('enrollments')
    .update({ 
        payment_status: 'paid',
        status: 'active',
        paid_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .eq('payment_status', 'pending'); // Safety check

  if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
