'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  LogOut,
  Settings,
  ShieldAlert
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

const sidebarItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Usuarios', icon: Users },
  { href: '/admin/payments', label: 'Pagos', icon: CreditCard },
  { href: '/admin/settings', label: 'Configuración', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="hidden border-r bg-zinc-950 text-white md:block md:w-64 lg:w-72 h-screen sticky top-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b border-white/10 px-4 lg:h-[60px] lg:px-6 bg-red-950/20">
          <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
            <ShieldAlert className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold text-red-100">
              Admin Panel
            </span>
          </Link>
        </div>
        <div className="flex-1 py-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-red-400 hover:bg-white/5",
                    isActive 
                      ? "bg-red-900/20 text-red-400" 
                      : "text-gray-400"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4 border-t border-white/10">
          <div className="mb-4 px-2">
             <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Accesos Rápidos</p>
             <Link href="/student/dashboard" className="text-sm text-gray-400 hover:text-white flex items-center gap-2 mb-2">
                Ver como Estudiante
             </Link>
             <Link href="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
                Ir a Landing Page
             </Link>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 text-red-400 hover:text-red-300 hover:bg-red-950/50"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
}
