import { Cpu, Terminal, Rocket, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: Cpu,
    title: "Enfoque Práctico",
    description: "Olvídate de la teoría aburrida. Aquí vienes a construir, romper y arreglar cosas reales."
  },
  {
    icon: Terminal,
    title: "Simuladores en Vivo",
    description: "Tecnología exclusiva para interactuar con el código y los sistemas en tiempo real durante la clase."
  },
  {
    icon: Rocket,
    title: "Proyectos de Portafolio",
    description: "Cada curso termina con un proyecto tangible que puedes mostrar a futuros empleadores o clientes."
  },
  {
    icon: Globe,
    title: "Networking",
    description: "Conecta con otros ingenieros y desarrolladores apasionados por la tecnología en Saltillo."
  }
];

export function FeatureSection() {
  return (
    <section id="metodologia" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Aprende haciendo,<br />
              <span className="text-gradient">no solo escuchando.</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Nuestra metodología combina clases en vivo con simuladores interactivos y retos de código. 
              No formamos "estudiantes", formamos <strong>ingenieros resolutivos</strong>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors">
                <feature.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
