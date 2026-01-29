import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Lock, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSyllabusByCourseId } from '@/lib/syllabus-data';

export default async function MisClasesPage() {
  const supabase = await createClient();

  // 1. Verify Session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // 2. Get Enrollments (Active only)
  // We want to know WHICH course the student is taking to show the correct syllabus.
  const { data: enrollment } = await supabase
    .from('enrollments')
    .select('course_id, created_at, courses(title, number)')
    .eq('user_id', user.id)
    .eq('payment_status', 'paid')
    .single();

  if (!enrollment) {
      return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
              <h1 className="text-2xl font-bold">No tienes cursos activos</h1>
              <p className="text-muted-foreground">Inscríbete a un curso para ver tus clases.</p>
              <Button asChild>
                  <Link href="/student/dashboard">Ir al Dashboard</Link>
              </Button>
          </div>
      );
  }

  // 3. Get Syllabus Logic
  // Default to Course 1 if no number found, but we should have it.
  const courseNumber = enrollment.courses?.number || 1;
  const syllabus = getSyllabusByCourseId(enrollment.course_id, courseNumber);

  if (!syllabus) return <div>Error cargando temario.</div>;

  // 4. Determine Current Week (Mock Logic for now - ideally based on start date)
  // For the demo, let's say Week 1 is unlocked.
  const currentWeekIndex = 0; // 0-based index

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Mis Clases</h1>
            <p className="text-muted-foreground mt-1">
                {syllabus.title}
            </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* We iterate through the Syllabus Weeks to create "Module Cards" */}
        {syllabus.weeks.map((week, index) => {
            const isUnlocked = index <= currentWeekIndex;
            const isCurrent = index === currentWeekIndex;

            return (
                <Card 
                    key={index} 
                    className={`flex flex-col h-full transition-all hover:shadow-lg ${
                        isCurrent ? 'border-cyan-500/50 shadow-cyan-500/10' : 'opacity-80'
                    }`}
                >
                    <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                            <Badge variant={isCurrent ? "default" : "secondary"} className={isCurrent ? "bg-cyan-600" : ""}>
                                {isCurrent ? "Semana Actual" : `Semana ${index + 1}`}
                            </Badge>
                            {!isUnlocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                        </div>
                        <CardTitle className="line-clamp-2 leading-tight">
                            {week.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                        <ul className="space-y-2 mb-6 flex-1">
                             {week.topics.slice(0, 3).map((topic, i) => (
                                 <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                     <span className="text-cyan-500">•</span> {topic}
                                 </li>
                             ))}
                        </ul>
                        
                        <Button 
                            className={`w-full ${isCurrent ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white" : ""}`}
                            variant={isUnlocked ? "default" : "secondary"}
                            disabled={!isUnlocked}
                            asChild={isUnlocked}
                        >
                            {isUnlocked ? (
                                <Link href={`/student/clases/semana-${index + 1}`}>
                                    <PlayCircle className="mr-2 h-4 w-4" />
                                    Ver Clases
                                </Link>
                            ) : (
                                <span>Próximamente</span>
                            )}
                        </Button>
                    </CardContent>
                </Card>
            );
        })}
      </div>
    </div>
  );
}
