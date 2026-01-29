import { getSyllabusByCourseId, SYLLABUS_DATA } from '@/lib/syllabus-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PublicCourseDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // Try to find course by ID (1, 2, etc.) or assume it maps to our syllabus number
  // The CourseGrid passes IDs like 1, 2, 8.
  const courseNumber = parseInt(id);
  const syllabus = SYLLABUS_DATA[courseNumber];

  if (!syllabus) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Curso no encontrado</h1>
        <Button asChild variant="secondary">
            <Link href="/">Volver al Inicio</Link>
        </Button>
      </div>
    );
  }

  // Construct image path based on ID (assuming convention course-X.jpg)
  const imagePath = `/courses/course-${courseNumber}.jpg`;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:py-32">
        {/* Back Link */}
        <Link href="/#cursos" className="inline-flex items-center text-sm text-gray-400 hover:text-cyan-400 mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Cursos
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Info & Syllabus */}
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="space-y-4">
                    <div className="flex gap-2">
                         <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 bg-cyan-500/10">
                            Curso {syllabus.number}
                        </Badge>
                        <Badge variant="outline" className="border-purple-500/50 text-purple-400 bg-purple-500/10">
                            4 Semanas
                        </Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {syllabus.title}
                    </h1>
                    <p className="text-xl text-gray-300 leading-relaxed">
                        {syllabus.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        <Calendar className="h-4 w-4 text-cyan-500" />
                        <span>Inicia: 16 Feb 2026</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                        <Clock className="h-4 w-4 text-purple-500" />
                        <span>Lun, Mié, Vie (19:00 - 21:00)</span>
                    </div>
                </div>

                <div className="space-y-6 pt-8">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <span className="w-1 h-8 bg-cyan-500 rounded-full"></span>
                        Plan de Estudios
                    </h2>
                    
                    <div className="grid gap-4">
                        {syllabus.weeks.map((week, index) => (
                            <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-colors">
                                <h3 className="text-lg font-semibold text-cyan-100 mb-3">
                                    {week.title}
                                </h3>
                                <ul className="space-y-2">
                                    {week.topics.map((topic, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-gray-400">
                                            <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-500 mt-0.5" />
                                            <span>{topic}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Sticky Card & Actions */}
            <div className="lg:sticky lg:top-32 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-cyan-900/20">
                    <Image
                        src={imagePath}
                        alt={syllabus.title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <Card className="bg-gray-900/80 border-cyan-500/30 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Inscríbete Ahora</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-bold text-white">$800</span>
                                <span className="text-xl text-gray-400 mb-1">MXN / mes</span>
                            </div>
                            <p className="text-sm text-gray-400">Acceso completo a clases en vivo, grabaciones y comunidad.</p>
                        </div>

                        <div className="space-y-3">
                             {syllabus.number === 1 ? (
                                <Button size="lg" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/25" asChild>
                                    <Link href="/registro">
                                        Registrarme al Curso <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                             ) : (
                                <Button size="lg" disabled className="w-full bg-gray-700 text-gray-400 cursor-not-allowed border border-gray-600">
                                    Inscripciones Cerradas <span className="ml-2 text-xs opacity-70">(Próximamente)</span>
                                </Button>
                             )}
                            <p className="text-xs text-center text-gray-500">
                                Garantía de satisfacción de 7 días.
                            </p>
                        </div>

                        <div className="pt-4 border-t border-white/10 space-y-4">
                            <div>
                                <h4 className="font-semibold text-white mb-1">¿Para quién es?</h4>
                                <p className="text-sm text-gray-400">{syllabus.targetAudience}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-white mb-1">Meta del Curso</h4>
                                <p className="text-sm text-gray-400">{syllabus.goal}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
