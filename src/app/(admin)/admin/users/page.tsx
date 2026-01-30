import { createClient } from '@/lib/supabase/server';
import { UsersTable } from '@/components/admin/UsersTable';

type UserWithEnrollments = {
  id: string;
  full_name: string;
  phone: string;
  enrollments: Array<{
    status: string;
    payment_status: string;
    courses: { name: string } | null;
  }>;
};

export default async function AdminUsersPage() {
  const supabase = await createClient();

  // Fetch Profiles + Active Enrollment
  // Note: We need a policy to allow Admins to see all profiles.
  // Assuming RLS is set up for admins.
  const { data: users, error } = await supabase
    .from('profiles')
    .select(`
        id, 
        full_name, 
        phone,
        enrollments(status, payment_status, courses(name))
    `)
    .eq('role', 'student') // Only students
    .order('created_at', { ascending: false })
    .returns<UserWithEnrollments[]>();

  if (error) {
      return <div>Error cargando usuarios: {error.message}</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <p className="text-muted-foreground">Administra el acceso y los pagos de los estudiantes.</p>
      </div>

      <UsersTable initialUsers={users || []} />
    </div>
  );
}
