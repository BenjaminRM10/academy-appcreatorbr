import { StudentNavbar } from '@/components/student/StudentNavbar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StudentNavbar />
      <main className="flex-1 container py-6 md:py-10">
        {children}
      </main>
    </div>
  );
}
