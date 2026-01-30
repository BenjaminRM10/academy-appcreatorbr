import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-purple-600 to-cyan-500 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/20">
             <svg width="24" height="24" viewBox="0 0 32 32" fill="none" className="text-white">
               <circle cx="16" cy="12" r="3" fill="currentColor"/>
               <circle cx="10" cy="20" r="2.5" fill="currentColor" opacity="0.9"/>
               <circle cx="22" cy="20" r="2.5" fill="currentColor" opacity="0.9"/>
               <path d="M16 15L10 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
               <path d="M16 15L22 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.8"/>
               <path d="M10 20L22 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
             </svg>
          </div>
          <span className="font-bold text-lg tracking-tight group-hover:text-cyan-100 transition-colors">
            Clawd<span className="text-cyan-400">Academy</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#cursos" className="hover:text-cyan-400 transition-colors">
            Cursos
          </Link>
          <Link href="#metodologia" className="hover:text-purple-400 transition-colors">
            Metodología
          </Link>
          <Link href="#precios" className="hover:text-cyan-400 transition-colors">
            Precios
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
              Acceso Estudiante
            </Button>
          </Link>
          <Link href="/registro">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 border-0">
              Inscribirse
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
