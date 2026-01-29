'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentAlert } from '@/components/student/PaymentAlert';
import { NextClassCard } from '@/components/student/NextClassCard';
import { CourseCard } from '@/components/student/CourseCard';

// Define the expected data types (simplified)
interface Profile { full_name: string }

interface Enrollment {
  payment_status: 'pending' | 'paid' | 'canceled';
  created_at: string;
  profiles: Profile | null;
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
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .select(`payment_status, created_at`)
        .eq('user_id', currentUser.id)
        .single();
        
      // 2b. Fetch Profile Data (separately to avoid schema cache issues)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`full_name`)
        .eq('id', currentUser.id)
        .single();

      if (enrollmentError || profileError) {
        console.error('Data fetching error (enrollment or profile):', enrollmentError?.message || profileError?.message);
        // Continue even with error, to allow redirection logic to handle no enrollments
      }

      const mergedEnrollment = enrollment ? { ...enrollment, profiles: profile } : null;

      if (!mergedEnrollment) {
        // User is logged in but has no enrollment record. Redirect to payment/onboarding.
        console.log('User has no enrollment, redirecting to /pago.');
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
        <div className="text-center">
          <p className="text-xl font-medium text-gray-400">Cargando tu dashboard...</p>
        </div>
      </div>
    );
  }

  // If loading is false, and user/enrollmentData is missing, it means
  // the redirects in useEffect failed or returned too quickly.
  if (!user || !enrollmentData) {
    return <p>Error interno: No se pudieron cargar los datos.</p>;
  }

  const { payment_status, created_at } = enrollmentData;
  const profile = enrollmentData.profiles;
  const fullName = profile?.full_name || user.user_metadata?.full_name || user.email;
  const firstName = fullName.split(' ')[0];

  const mockCourse = {
      name: 'AppCreatorBR: Desarrollo Full-Stack',
      duration: '3 meses (200 horas)',
  };

  const enrollmentDate = new Date(created_at).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Welcome Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold tracking-tight">
            ¡Bienvenido(a), {firstName}! 👋
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Este es tu panel de control de AppCreatorBR Academy. Aquí encontrarás todo sobre tu curso y los siguientes pasos.
          </p>
        </CardContent>
      </Card>

      {/* Payment Status Check & Alert */}
      {payment_status !== 'paid' && (
        <PaymentAlert status={payment_status as 'pending' | 'canceled'} />
      )}

      {/* Main Grid: Course Info and Next Class */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CourseCard
            courseName={mockCourse.name}
            enrolledDate={enrollmentDate}
            courseDuration={mockCourse.duration}
          />
        </div>

        <NextClassCard />
      </div>

      {/* Quick Resources Placeholder */}
      <section className="space-y-4 pt-4">
        <h2 className="text-2xl font-semibold">Recursos Rápidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-4 text-center hover:bg-muted/50 transition cursor-pointer">
            <CardTitle className="text-lg">Comunidad</CardTitle>
            <p className="text-sm text-muted-foreground">Accede al Discord</p>
          </Card>
          <Card className="p-4 text-center hover:bg-muted/50 transition cursor-pointer">
            <CardTitle className="text-lg">Soporte</CardTitle>
            <p className="text-sm text-muted-foreground">Abrir un ticket</p>
          </Card>
          <Card className="p-4 text-center hover:bg-muted/50 transition cursor-pointer">
            <CardTitle className="text-lg">Certificado</CardTitle>
            <p className="text-sm text-muted-foreground">Emitir al finalizar</p>
          </Card>
        </div>
      </section>
    </div>
  );
}