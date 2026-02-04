"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-3 group">
          <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-purple-500/20">
             <Image src="/runa-logo.png" alt="Runa Academy" width={40} height={40} className="object-contain" />
          </div>
          <span className="font-bold text-lg md:text-xl tracking-tight group-hover:text-cyan-100 transition-colors">
            Runa<span className="text-cyan-400">Academy</span>
          </span>
        </Link>

        {/* Desktop Menu */}
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-white/5 animate-in slide-in-from-top-2 duration-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              href="#cursos" 
              className="block py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Cursos
            </Link>
            <Link 
              href="#metodologia" 
              className="block py-2 text-gray-300 hover:text-purple-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Metodología
            </Link>
            <Link 
              href="#precios" 
              className="block py-2 text-gray-300 hover:text-cyan-400 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Precios
            </Link>
            <div className="pt-4 border-t border-white/10 space-y-3">
              <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full border-cyan-500/50 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                  Acceso Estudiante
                </Button>
              </Link>
              <Link href="/registro" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 border-0">
                  Inscribirse
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
