import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/student/dashboard')

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-white/10 p-4 flex justify-between items-center bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="font-bold text-xl text-gradient">Admin Panel</div>
        <nav className="flex gap-4">
            <Link href="/admin/dashboard" className="hover:text-cyan-400">Dashboard</Link>
            <Link href="/" className="hover:text-cyan-400">Volver al Sitio</Link>
        </nav>
      </header>
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  )
}
