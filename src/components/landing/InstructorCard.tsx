import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function InstructorCard() {
  return (
    <section className="py-8 md:py-12 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-white/10 rounded-2xl p-4 md:p-6 hover:border-cyan-500/30 transition-all">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6">
              {/* Photo */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/20 shrink-0">
                <Image
                  src="/profile.jpg"
                  alt="Benjamín Rodríguez"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                  Benjamín Rodríguez
                </h3>
                <p className="text-sm md:text-base text-gray-400 mb-3">
                  Ing. Mecánico del Tec de Saltillo • Especialista en Automatización e IA
                </p>
              </div>

              {/* CTA Button */}
              <div className="shrink-0 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto border-cyan-500/50 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300 text-xs md:text-sm"
                  asChild
                >
                  <Link href="https://appcreatorbr.com/es/profile" target="_blank" rel="noopener noreferrer">
                    Ver Perfil Completo
                    <ExternalLink className="ml-2 w-3 h-3 md:w-4 md:h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
