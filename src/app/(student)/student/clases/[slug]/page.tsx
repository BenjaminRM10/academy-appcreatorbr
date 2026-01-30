import { createClient } from '@/lib/supabase/server';
import { getSyllabusByCourseId } from '@/lib/syllabus-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, FileText, Video, ExternalLink, Download, MessageSquare, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

type EnrollmentWithCourseNumber = {
  course_id: string;
  courses: { number: number } | null;
};

export default async function ClasePlayerPage({ params }: PageProps) {
  const { slug } = await params; // "semana-1"
  const weekNumber = parseInt(slug.split('-')[1]);
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Fetch active enrollment to get course info
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('course_id, courses(number)')
    .eq('user_id', user.id)
    .eq('payment_status', 'paid')
    .single<EnrollmentWithCourseNumber>();

  if (!enrollment) redirect('/student/dashboard');

  const syllabus = getSyllabusByCourseId(enrollment.course_id, enrollment.courses?.number || 1);
  const weekData = syllabus?.weeks[weekNumber - 1];

  if (!weekData) {
      return <div>Semana no encontrada.</div>;
  }

  // MOCK DATA FOR PLAYER
  // In a real app, this would come from a 'lessons' table in DB.
  const currentLesson = {
      title: weekData.topics[0] || "Clase Introductoria",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?si=Example", // Using YouTube for demo, replace with Drive Embed
      notebookUrl: "https://notebooklm.google.com/",
      description: "En esta clase aprenderemos los fundamentos esenciales para dominar tu entorno de desarrollo. Configuraremos WSL, instalaremos las herramientas clave y entenderemos cómo funciona tu sistema operativo bajo el capó.",
      resources: [
          { name: "Guía de Comandos Linux.pdf", type: "pdf", url: "#" },
          { name: "Repositorio Inicial", type: "github", url: "#" }
      ]
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-[calc(100vh-100px)] flex flex-col">
      {/* Header Navigation */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
            <Link href="/student/clases">
                <ArrowLeft className="h-5 w-5" />
            </Link>
        </Button>
        <div>
            <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold">{weekData.title}</h1>
                <Badge variant="outline" className="text-cyan-500 border-cyan-500/30">Semana {weekNumber}</Badge>
            </div>
            <p className="text-sm text-muted-foreground hidden md:block">
                {syllabus?.title}
            </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_350px] gap-6 flex-1 min-h-0">
        
        {/* Main Player Area */}
        <div className="flex flex-col gap-4 min-h-0">
            {/* Video Container (Responsive Aspect Ratio) */}
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/10 border border-white/10 group">
                <iframe 
                    src={currentLesson.videoUrl} 
                    title="Video Player"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                ></iframe>
            </div>

            {/* Info & Tabs */}
            <div className="flex-1">
                <Tabs defaultValue="resumen" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                        <TabsTrigger value="resumen">Resumen</TabsTrigger>
                        <TabsTrigger value="recursos">Recursos</TabsTrigger>
                        <TabsTrigger value="notas">Mis Notas</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="resumen" className="mt-4 space-y-4">
                        <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {currentLesson.description}
                        </p>
                        
                        {/* NotebookLM Callout */}
                        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-lg p-4 flex items-center justify-between mt-6">
                            <div className="flex gap-3 items-center">
                                <div className="bg-white p-2 rounded-full">
                                    <MessageSquare className="h-5 w-5 text-purple-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-purple-100">Asistente de Estudio IA</h3>
                                    <p className="text-xs text-purple-300">Repasa esta clase con NotebookLM</p>
                                </div>
                            </div>
                            <Button variant="secondary" size="sm" asChild>
                                <Link href={currentLesson.notebookUrl} target="_blank">
                                    Abrir Cuaderno <ExternalLink className="ml-2 h-3 w-3" />
                                </Link>
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="recursos" className="mt-4">
                        <div className="grid gap-2">
                            {currentLesson.resources.map((res, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4 text-cyan-500" />
                                        <span className="text-sm font-medium">{res.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href={res.url}>
                                            <Download className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="notas" className="mt-4">
                         <div className="p-8 text-center border-2 border-dashed rounded-xl text-muted-foreground">
                            <p>Aquí podrás tomar notas privadas de la clase.</p>
                            <span className="text-xs opacity-50">(Próximamente)</span>
                         </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>

        {/* Sidebar Playlist */}
        <Card className="flex flex-col h-full max-h-[calc(100vh-140px)] hidden lg:flex">
            <div className="p-4 border-b bg-muted/20">
                <h3 className="font-semibold">Contenido de la Semana</h3>
                <p className="text-xs text-muted-foreground">3 Clases • 45 min restantes</p>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {weekData.topics.map((topic, i) => (
                    <button 
                        key={i}
                        className={`w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all ${
                            i === 0 
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                            : 'hover:bg-muted text-muted-foreground'
                        }`}
                    >
                        <div className="mt-0.5">
                            {i === 0 ? <PlayCircle className="h-4 w-4" /> : <div className="h-4 w-4 rounded-full border border-current opacity-50" />}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium line-clamp-2">{topic}</p>
                            <p className="text-xs opacity-70 mt-1">15 min</p>
                        </div>
                    </button>
                ))}
            </div>
        </Card>

      </div>
    </div>
  );
}
