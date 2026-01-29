import { createClient } from '@/lib/supabase/server';
import { getSyllabusByCourseId } from '@/lib/syllabus-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, PlayCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Verify User Session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // 2. Fetch Course Data form DB (to get the official Title and Number)
  const { data: course, error } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !course) {
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold text-destructive">Error: Curso no encontrado</h1>
        <Button asChild className="mt-4" variant="outline">
            <Link href="/student/dashboard">Volver al Dashboard</Link>
        </Button>
      </div>
    );
  }

  // 3. Get Rich Syllabus Data (from our local file, mapping by course number)
  // We assume course.number exists in DB, otherwise we default to 1
  const syllabus = getSyllabusByCourseId(id, course.number || 1);

  if (!syllabus) {
      return <div>Información del temario no disponible.</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-cyan-500/50 text-cyan-500">
                    Curso {syllabus.number}
                </Badge>
                <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/50">
                    Inscrito
                </Badge>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                {syllabus.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
                {syllabus.description}
            </p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" asChild>
                <Link href="/student/dashboard">Volver</Link>
            </Button>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                <PlayCircle className="mr-2 h-4 w-4" />
                Continuar Aprendiendo
            </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-[1fr_300px]">
        
        {/* Left Column: Syllabus Weeks */}
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Plan de Estudios</h2>
                <span className="text-sm text-muted-foreground">4 Semanas • 12 Clases</span>
            </div>
            
            <div className="grid gap-4">
                {syllabus.weeks.map((week, index) => (
                    <Card key={index} className={`border-l-4 ${index === 0 ? 'border-l-cyan-500' : 'border-l-muted'}`}>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center justify-between">
                                {week.title}
                                {index === 0 ? (
                                    <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-500">En Progreso</Badge>
                                ) : (
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {week.topics.map((topic, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <CheckCircle2 className={`h-5 w-5 shrink-0 ${index === 0 ? 'text-cyan-500' : 'text-muted'}`} />
                                        <span>{topic}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        {/* Right Column: Meta Info */}
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Objetivo del Curso</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {syllabus.goal}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Instructor</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500"></div>
                    <div>
                        <p className="font-medium">Equipo AppCreatorBR</p>
                        <p className="text-xs text-muted-foreground">Expertos en Ingeniería 4.0</p>
                    </div>
                </CardContent>
            </Card>

             <Card className="bg-muted/30 border-dashed">
                <CardHeader>
                    <CardTitle className="text-lg">Proyecto Final</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm font-medium">
                        {syllabus.weeks[3].topics.find(t => t.includes("Proyecto")) || "Proyecto Integrador"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                        Se entrega al finalizar la Semana 4 para obtener tu certificado.
                    </p>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
