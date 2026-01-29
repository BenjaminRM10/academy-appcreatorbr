'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PaymentAlert } from '@/components/student/PaymentAlert';
import { NextClassCard } from '@/components/student/NextClassCard';
import { CourseCard } from '@/components/student/CourseCard';
import { Gamepad2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Define the expected data types
interface Profile { full_name: string }

interface Course {
    id: string;
    title: string;
    description?: string;
    duration?: string;
}

interface Group {
    name: string;
    schedule: {
        days: string[];
        time: string;
    };
}

interface Enrollment {
  payment_status: 'pending' | 'paid' | 'canceled';
  created_at: string;
  course_id?: string;
  group_id?: string;
  profiles: Profile | null;
  courses?: Course | null; // If we can join
  [key: string]: any;
}

interface User {
  id: string;
  email: string;
  user_metadata: { full_name?: string, name?: string };
  [key: string]: any;
}

export default function StudentDashboardClient() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [enrollmentData, setEnrollmentData] = useState<Enrollment | null>(null);
  const [courseData, setCourseData] = useState<Course | null>(null);
  const [groupData, setGroupData] = useState<Group | null>(null);
  const router = useRouter();

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // 1. Fetch User
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData.user) {
        console.error('User fetching error or not logged in:', userError);
        router.push('/login');
        return;
      }

      const currentUser = userData.user as User;
      setUser(currentUser);

      // 2. Fetch Enrollment Data
      // We try to fetch course_id to then fetch the course details
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .select(`payment_status, created_at, course_id, group_id`)
        .eq('user_id', currentUser.id)
        .single();
        
      // 2b. Fetch Profile Data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`full_name`)
        .eq('id', currentUser.id)
        .single();

      if (enrollment) {
          // 3. Fetch Course Data if course_id exists
          if (enrollment.course_id) {
              const { data: course } = await supabase
                  .from('courses')
                  .select('*')
                  .eq('id', enrollment.course_id)
                  .single();
              setCourseData(course);
          }
          // 4. Fetch Group Data if group_id exists
          if (enrollment.group_id) {
            const { data: group } = await supabase
                .from('groups')
                .select('name, schedule')
                .eq('id', enrollment.group_id)
                .single();
            setGroupData(group);
          }
      }

      const mergedEnrollment = enrollment ? { ...enrollment, profiles: profile } : null;

      if (!mergedEnrollment && !enrollmentError) {
        // User logged in but no enrollment.
        router.push('/pago');
        return;
      }

      setEnrollmentData(mergedEnrollment as Enrollment);
      setLoading(false);
    };

    fetchData();
  }, [router, supabase]);


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Cargando tu experiencia...</p>
      </div>
    );
  }

  if (!user || !enrollmentData) {
     // Fallback for empty state or error
     return <div className="p-8 text-center">No se encontraron datos de inscripción.</div>;
  }

  const { payment_status, created_at } = enrollmentData;
  const profile = enrollmentData.profiles;
  const fullName = profile?.full_name || user.user_metadata?.full_name || user.email;
  const firstName = fullName.split(' ')[0];

  // Use real course data or fallback to default
  const displayCourse = courseData || {
      title: 'AppCreatorBR: Desarrollo Full-Stack',
      duration: '12 Semanas',
  };

  const enrollmentDate = new Date(created_at).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  // Format schedule if available
  const formatSchedule = (schedule?: { days: string[]; time: string }) => {
    if (!schedule) return undefined;
    const dayNames: Record<string, string> = {
        mon: "Lun", tue: "Mar", wed: "Mié", thu: "Jue", fri: "Vie", sat: "Sáb", sun: "Dom"
    };
    const days = schedule.days.map((d) => dayNames[d] || d).join(", ");
    return `${days} ${schedule.time}`;
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Hola, {firstName} 👋</h1>
            <p className="text-muted-foreground mt-1">
                Bienvenido a tu panel de control. Aquí comienza tu viaje.
            </p>
        </div>
        <Button variant="outline" asChild>
            <Link href="/student/perfil">Ver Perfil</Link>
        </Button>
      </div>

      {/* Payment Status Check */}
      {payment_status !== 'paid' && (
        <PaymentAlert status={payment_status as 'pending' | 'canceled'} />
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Course & Simulators */}
        <div className="lg:col-span-2 space-y-6">
            <CourseCard
                courseId={displayCourse.id}
                courseName={displayCourse.title}
                enrolledDate={enrollmentDate}
                courseDuration={displayCourse.duration || 'Flexible'}
                progress={5} // Hardcoded progress for now (Fase 1 started)
                groupName={groupData?.name}
                schedule={formatSchedule(groupData?.schedule)}
            />

            {/* Simulators Preview (Teaser for Phase 6) */}
            <Card className="bg-gradient-to-br from-violet-500/10 via-transparent to-cyan-500/10 border-dashed border-2">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Gamepad2 className="h-6 w-6 text-purple-500" />
                        <CardTitle>Simuladores Interactivos</CardTitle>
                    </div>
                    <CardDescription>
                        Practica tus habilidades en entornos reales.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Próximamente disponible: Simulador de Despliegue en Servidores y Configuración de DNS.
                        </p>
                        <Button disabled variant="secondary" className="w-full sm:w-auto">
                            Próximamente
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* Right Column: Next Class & Quick Actions */}
        <div className="space-y-6">
            <NextClassCard 
                scheduleTime={groupData?.schedule?.time} 
                // We could pass a dynamic date here if we had logic to calculate "Next [Day]"
            />
            
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Recursos</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                    <Button variant="ghost" className="justify-start h-auto py-3" asChild>
                        <Link href="/student/materiales">
                            <span className="flex-1 text-left">📚 Documentación</span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start h-auto py-3" asChild>
                        <Link href="https://discord.gg/appcreatorbr" target="_blank">
                            <span className="flex-1 text-left">💬 Comunidad Discord</span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                    </Button>
                    <Button variant="ghost" className="justify-start h-auto py-3" asChild>
                        <Link href="/soporte">
                            <span className="flex-1 text-left">🎫 Soporte Técnico</span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
