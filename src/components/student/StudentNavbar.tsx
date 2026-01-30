import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User, LogOut, Hexagon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function StudentNavbar() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/student/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img src="/runa-logo.png" alt="Runa Academy" className="w-full h-full object-contain" />
            </div>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Runa Academy
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </nav>
  );
}
