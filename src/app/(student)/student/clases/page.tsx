import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Lock, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSyllabusByCourseId } from '@/lib/syllabus-data';

type EnrollmentWithCourse = {
  course_id: string;
  payment_status: string;
  created_at: string;
  courses: { name: string; number: number } | null;
};

export default async function MisClasesPage() {
  const supabase = await createClient();

  // 1. Verify Session
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // 2. Get Enrollments
  // Use maybeSingle to handle 0 or 1 result gracefully.
  // We prioritize 'paid' status, but fetch whatever is there to debug.
  const { data: enrollments, error } = await supabase
    .from('enrollments')
    .select('course_id, payment_status, created_at, courses(name, number)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .returns<EnrollmentWithCourse[]>();

  // Filter for the active course
  const enrollment = enrollments?.find(e => e.payment_status === 'paid' || e.payment_status === 'active') 
                     || enrollments?.[0]; // Fallback to latest if none paid

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

  // Debug Message if payment is not clean 'paid'
  const showPaymentWarning = enrollment.payment_status !== 'paid' && enrollment.payment_status !== 'active';

  // 3. Get Course details (fetch by course_id if necessary)
  let courseNumber = enrollment.courses?.number;
  let courseName = enrollment.courses?.name || '';

  if (!courseNumber && enrollment.course_id) {
    const { data: courseById } = await supabase
      .from('courses')
      .select('id, name, number')
      .eq('id', enrollment.course_id)
      .single();
    if (courseById) {
      courseNumber = courseById.number;
      courseName = courseById.name;
    }
  }

  // Default to Course 1 if no number found
  const syllabus = getSyllabusByCourseId(enrollment.course_id, courseNumber || 1);

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
                {showPaymentWarning && (
                    <span className="ml-2 text-yellow-500 text-xs bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20">
                        Estado: {enrollment.payment_status} (Acceso limitado)
                    </span>
                )}
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
