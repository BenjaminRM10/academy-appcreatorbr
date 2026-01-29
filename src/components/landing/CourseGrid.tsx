import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";

const COURSES = [
  {
    id: 1,
    title: "Ingeniería Asistida por IA",
    description: "Fundamentos de IA aplicada a la ingeniería moderna. Aprende a potenciar tu flujo de trabajo.",
    image: "/courses/course-1.jpg",
    status: "Activo",
    date: "16 Feb 2026",
    price: "$800 MXN",
  },
  {
    id: 2,
    title: "Despliegue de IA Local",
    description: "Ejecuta LLMs y modelos de visión en tu propio hardware. Privacidad y rendimiento sin nubes.",
    image: "/courses/course-2.jpg",
    status: "Próximamente",
    date: "TBD",
    price: "$800 MXN",
  },
  {
    id: 3,
    title: "Ingeniería de Datos y APIs",
    description: "Construye pipelines robustos y APIs escalables para alimentar tus sistemas inteligentes.",
    image: "/courses/course-3.jpg",
    status: "Próximamente",
    date: "TBD",
    price: "$800 MXN",
  },
  {
    id: 4,
    title: "Automatización y Agentes",
    description: "Crea agentes autónomos que trabajen por ti. Automatización de procesos complejos.",
    image: "/courses/course-4.jpg",
    status: "Próximamente",
    date: "TBD",
    price: "$800 MXN",
  },
  {
    id: 5,
    title: "Internet de las Cosas (IoT)",
    description: "Conecta el mundo físico con el digital. Sensores, microcontroladores y nube.",
    image: "/courses/course-5.jpg",
    status: "Próximamente",
    date: "TBD",
    price: "$800 MXN",
  },
  {
    id: 6,
    title: "Automatización Industrial 4.0",
    description: "Lleva la IA a la fábrica. Integración con PLCs, SCADA y robótica industrial.",
    image: "/courses/course-6.jpg",
    status: "Próximamente",
    date: "TBD",
    price: "$800 MXN",
  },
  {
    id: 7,
    title: "Desarrollo Web Full Stack con IA",
    description: "Crea aplicaciones web modernas a velocidad luz asistido por inteligencia artificial.",
    image: "/courses/course-7.jpg",
    status: "Próximamente",
    date: "TBD",
    price: "$800 MXN",
  },
  {
    id: 8,
    title: "Arquitectura de Software",
    description: "Diseña sistemas escalables, mantenibles y seguros. Patrones de diseño y estrategia.",
    image: "/courses/course-8.jpg",
    status: "Próximamente",
    date: "TBD",
    price: "$800 MXN",
  },
];

export function CourseGrid() {
  return (
    <section id="cursos" className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Oferta Educativa</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Un programa modular diseñado para llevarte de cero a experto en las tecnologías más demandadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.map((course) => (
            <Card key={course.id} className="bg-gray-900/50 border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all group flex flex-col">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <Badge 
                  className={`absolute top-4 right-4 ${
                    course.status === 'Activo' 
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' 
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/50'
                  }`}
                >
                  {course.status}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <h3 className="text-xl font-bold leading-tight group-hover:text-cyan-400 transition-colors">
                  {course.title}
                </h3>
              </CardHeader>

              <CardContent className="pb-4 flex-grow">
                <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                  {course.description}
                </p>
                
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-500" />
                    <span>Inicio: {course.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span>4 Semanas • 24 Horas</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0 mt-auto">
                <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                  Ver Detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
