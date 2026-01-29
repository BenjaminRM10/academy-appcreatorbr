import { Calendar, Clock, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface NextClassCardProps {
  scheduleTime?: string;
  startDate?: string;
}

export function NextClassCard({ scheduleTime, startDate }: NextClassCardProps) {
  // Fallback data if no props provided
  const displayTime = scheduleTime || '19:00h - 21:00h (CDMX)';
  // Logic to determine "Next Class Date" is complex without a calendar engine.
  // For now, we use the Syllabus start date or a generic message.
  const displayDate = startDate || 'Lunes, 16 de Febrero de 2026';
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próxima Clase en Vivo</CardTitle>
        <CardDescription>
          Semana 1: El Despertar (Setup & OS)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{displayDate}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span>{displayTime}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <LinkIcon className="h-4 w-4 text-primary" />
          <Link href="https://meet.google.com/mock-link-abc-123" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Enlace de la Sala (Google Meet)
          </Link>
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <Button asChild className="w-full">
            <Link href="https://meet.google.com/mock-link-abc-123" target="_blank" rel="noopener noreferrer">
                Acceder a Clase
            </Link>
        </Button>
      </div>
    </Card>
  );
}
