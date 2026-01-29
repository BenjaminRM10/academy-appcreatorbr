import StudentDashboardClient from './dashboard-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Academy AppCreatorBR',
  description: 'Panel de control del estudiante',
};

// This Server Component acts as a wrapper for the Client Component
// which handles all the interactive and stateful logic.
export default function DashboardPage() {
  return <StudentDashboardClient />;
}
