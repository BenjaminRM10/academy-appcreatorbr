import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";

const COURSES = [
  {
    id: 1,
    title: "Ingeniería Asistida por IA",
    description: "Aprende Google Antigravity, Claude Code, MCP Servers y crea tu app de terminal AI que programa Arduino. Incluye simuladores, ejercicios prácticos y material premium.",
    image: "/courses/course-1.jpg",
    status: "Activo",
    date: "16 Feb 2026",
    price: "$800 MXN",
    highlighted: true,
  },
  {
    id: 2,
    title: "Despliegue de IA Local",
    description: "Ejecuta LLMs y modelos de visión en tu propio hardware. Privacidad y rendimiento sin nubes.",
    image: "/courses/course-2.jpg",
    status: "Próximo Curso",
    date: "Después del Curso 1",
    price: "$800 MXN",
    highlighted: false,
  },
  {
    id: 3,
    title: "Ingeniería de Datos y APIs",
    description: "Construye pipelines robustos y APIs escalables para alimentar tus sistemas inteligentes.",
    image: "/courses/course-3.jpg",
    status: "Próximo Curso",
    date: "Después del Curso 1",
    price: "$800 MXN",
    highlighted: false,
  },
  {
    id: 4,
    title: "Automatización y Agentes",
    description: "Crea agentes autónomos que trabajen por ti. Automatización de procesos complejos.",
    image: "/courses/course-4.jpg",
    status: "Próximo Curso",
    date: "Después del Curso 1",
    price: "$800 MXN",
    highlighted: false,
  },
  {
    id: 5,
    title: "Internet de las Cosas (IoT)",
    description: "Conecta el mundo físico con el digital. Sensores, microcontroladores y nube.",
    image: "/courses/course-5.jpg",
    status: "Próximo Curso",
    date: "Después del Curso 1",
    price: "$800 MXN",
    highlighted: false,
  },
  {
    id: 6,
    title: "Automatización Industrial 4.0",
    description: "Lleva la IA a la fábrica. Integración con PLCs, SCADA y robótica industrial.",
    image: "/courses/course-6.jpg",
    status: "Próximo Curso",
    date: "Después del Curso 1",
    price: "$800 MXN",
    highlighted: false,
  },
  {
    id: 7,
    title: "Desarrollo Web Full Stack con IA",
    description: "Crea aplicaciones web modernas a velocidad luz asistido por inteligencia artificial.",
    image: "/courses/course-7.jpg",
    status: "Próximo Curso",
    date: "Después del Curso 1",
    price: "$800 MXN",
    highlighted: false,
  },
  {
    id: 8,
    title: "Arquitectura de Software",
    description: "Diseña sistemas escalables, mantenibles y seguros. Patrones de diseño y estrategia.",
    image: "/courses/course-8.jpg",
    status: "Próximo Curso",
    date: "Después del Curso 1",
    price: "$800 MXN",
    highlighted: false,
  },
];

export function CourseGrid() {
  const featuredCourse = COURSES[0]; // Curso 1
  const otherCourses = COURSES.slice(1); // Cursos 2-8

  return (
    <section id="cursos" className="py-12 md:py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">Oferta Educativa</h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto px-4">
            Un programa modular diseñado para llevarte de cero a experto en las tecnologías más demandadas.
          </p>
        </div>

        {/* Featured Course (Curso 1) */}
        <div className="mb-8 md:mb-12">
          <Card className="bg-gradient-to-br from-cyan-900/30 via-gray-900/50 to-purple-900/30 border-2 border-cyan-500/50 overflow-hidden hover:border-cyan-400 transition-all group">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Image */}
              <div className="relative h-64 lg:h-full min-h-[300px] overflow-hidden">
                <Image
                  src={featuredCourse.image}
                  alt={featuredCourse.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-cyan-500 text-black border-0 font-bold px-3 py-1 text-sm animate-pulse">
                  ⚡ INICIA 16 FEB 2026
                </Badge>
                <Badge className="absolute top-4 right-4 bg-green-500 text-black border-0 font-bold px-3 py-1">
                  INSCRIPCIONES ABIERTAS
                </Badge>
              </div>

              {/* Right: Info */}
              <CardContent className="p-6 lg:p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 mb-3">
                    Curso Destacado
                  </Badge>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    {featuredCourse.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-300 mb-4 leading-relaxed">
                    {featuredCourse.description}
                  </p>
                </div>

                {/* Key Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs text-gray-400">Duración</span>
                    </div>
                    <p className="text-sm font-bold">1 Mes • 12 Sesiones</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-gray-400">Horas</span>
                    </div>
                    <p className="text-sm font-bold">24 Horas Totales</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-gray-400">Modalidad</span>
                    </div>
                    <p className="text-sm font-bold">100% En Línea</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">⏰</span>
                      <span className="text-xs text-gray-400">Horarios</span>
                    </div>
                    <p className="text-sm font-bold">4 Opciones</p>
                  </div>
                </div>

                {/* What's Included */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-400 mb-2">✨ INCLUYE:</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-300">Simuladores Visuales</Badge>
                    <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">Ejercicios Prácticos</Badge>
                    <Badge variant="outline" className="text-xs border-green-500/30 text-green-300">Material Premium</Badge>
                    <Badge variant="outline" className="text-xs border-yellow-500/30 text-yellow-300">Prompts & Flujos</Badge>
                    <Badge variant="outline" className="text-xs border-pink-500/30 text-pink-300">Proyecto Real</Badge>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold h-12"
                    asChild
                  >
                    <Link href={`/curso/${featuredCourse.id}`}>
                      Ver Detalles Completos
                    </Link>
                  </Button>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-2xl font-bold text-cyan-400">{featuredCourse.price}</span>
                    <span className="text-sm text-gray-400">/mes</span>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <p className="text-sm text-gray-500 font-semibold">Próximos Cursos del Programa</p>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>

        {/* Other Courses (2-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {otherCourses.map((course) => (
            <Card key={course.id} className="bg-gray-900/50 border-white/10 overflow-hidden hover:border-cyan-500/50 transition-all group flex flex-col opacity-75">
              <div className="relative h-40 md:h-48 w-full overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <Badge className="absolute top-3 right-3 md:top-4 md:right-4 text-xs bg-gray-500/20 text-gray-400 border-gray-500/50">
                  {course.status}
                </Badge>
              </div>

              <CardHeader className="pb-2 md:pb-3 px-4 pt-4">
                <h3 className="text-base md:text-xl font-bold leading-tight group-hover:text-cyan-400 transition-colors">
                  {course.title}
                </h3>
              </CardHeader>

              <CardContent className="pb-3 md:pb-4 flex-grow px-4">
                <p className="text-xs md:text-sm text-gray-400 mb-3 md:mb-4 line-clamp-3">
                  {course.description}
                </p>

                <div className="flex flex-col gap-1.5 md:gap-2 text-xs md:text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4 text-cyan-500 shrink-0" />
                    <span>{course.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 md:w-4 md:h-4 text-purple-500 shrink-0" />
                    <span>4 Semanas • 24 Horas</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0 mt-auto px-4 pb-4">
                <Button
                  className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 h-9 md:h-10 text-sm"
                  disabled
                >
                  Disponible Pronto
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
