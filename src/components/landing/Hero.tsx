import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[128px]" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <div className="inline-block px-3 py-1.5 mb-4 md:mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
          <span className="text-[10px] md:text-xs font-semibold text-cyan-300 uppercase tracking-wider">
            Inscripciones Abiertas • Curso 1 Inicia 16 Feb
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 px-2">
          Escuela de Ingeniería y<br />
          <span className="text-gradient">Tecnología 4.0</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4">
          Domina la Inteligencia Artificial, Automatización Industrial y Desarrollo Full Stack. 
          Formación práctica para el futuro de Saltillo y México.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 px-4">
          <Link href="#cursos" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-11 md:h-12 px-6 md:px-8 text-base md:text-lg bg-white text-black hover:bg-gray-200">
              Ver Cursos
            </Button>
          </Link>
          <Link href="/registro" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-11 md:h-12 px-6 md:px-8 text-base md:text-lg border-white/20 hover:bg-white/10">
              Inscribirme Ahora
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
