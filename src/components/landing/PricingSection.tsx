import { Check, DollarSign, Calendar, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PricingSection() {
  return (
    <section id="precios" className="py-20 bg-black relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Modelo de Inversión Simple
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Sin contratos forzosos. Paga solo por el curso que tomas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            
            {/* Value Proposition */}
            <div className="space-y-8">
                <div className="flex gap-4 items-start">
                    <div className="bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
                        <DollarSign className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">$800 MXN / Mes</h3>
                        <p className="text-gray-400">Precio fijo por curso. Cada curso dura exactamente 4 semanas (1 mes).</p>
                    </div>
                </div>

                <div className="flex gap-4 items-start">
                    <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                        <BookOpen className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Sistema Modular (8 Cursos)</h3>
                        <p className="text-gray-400">Completa los 8 cursos para graduarte como Ingeniero 4.0. Son independientes y rotativos.</p>
                    </div>
                </div>

                <div className="flex gap-4 items-start">
                    <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                        <Calendar className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Flexibilidad Total</h3>
                        <p className="text-gray-400">No hay orden obligatorio, aunque recomendamos del 1 al 8. Inicia cuando quieras.</p>
                    </div>
                </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-all shadow-2xl shadow-cyan-900/10">
                <div className="text-center mb-8">
                    <p className="text-sm font-medium text-cyan-400 mb-2">MEMBRESÍA MENSUAL</p>
                    <div className="flex items-baseline justify-center gap-1">
                        <span className="text-5xl font-bold text-white">$800</span>
                        <span className="text-gray-400">mxn</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Por curso / mes</p>
                </div>

                <ul className="space-y-4 mb-8">
                    {[
                        "12 Clases en vivo (24 horas)",
                        "Acceso a grabaciones de por vida",
                        "Comunidad de Discord exclusiva",
                        "Certificado digital por curso",
                        "Proyectos prácticos de portafolio",
                        "Garantía de 7 días"
                    ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-5 h-5 text-cyan-500 shrink-0" />
                            {item}
                        </li>
                    ))}
                </ul>

                <Button size="lg" className="w-full bg-white text-black hover:bg-gray-200 font-bold" asChild>
                    <Link href="/registro">Comenzar Ahora</Link>
                </Button>
            </div>

        </div>
      </div>
    </section>
  );
}
