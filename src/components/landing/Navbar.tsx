import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image 
              src="/logo.png" 
              alt="Academy Logo" 
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Academy<span className="text-cyan-400">.Br</span>
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
