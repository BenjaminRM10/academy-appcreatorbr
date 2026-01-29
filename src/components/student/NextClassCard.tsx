import { Calendar, Clock, Link as LinkIcon, CalendarPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getNextClassDate, generateGoogleCalendarUrl } from '@/lib/calendar-utils';

interface NextClassCardProps {
  scheduleTime?: string;
  scheduleDays?: string[]; // ['mon', 'wed']
  meetLink?: string;
  startDate?: string;
}

export function NextClassCard({ scheduleTime, scheduleDays, meetLink, startDate }: NextClassCardProps) {
  
  // 1. Calculate Real Next Class Date
  const nextDate = (scheduleTime && scheduleDays) 
    ? getNextClassDate(
        { days: scheduleDays, time: scheduleTime.split(' - ')[0] || '19:00' },
        startDate
      )
    : null;

  // Fallback if no data or calculation failed
  const displayDateStr = nextDate 
    ? nextDate.toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : 'Por definir';
  
  const displayTime = scheduleTime || 'Horario pendiente';
  const finalMeetLink = meetLink || 'https://meet.google.com/xyz-abc-test'; // Default fallback

  // 2. Generate Google Calendar Link
  const gCalLink = nextDate ? generateGoogleCalendarUrl({
      title: "Clase en Vivo - AcademyBR",
      description: "Clase del curso de Ingeniería. Recuerda tener tu entorno listo.",
      location: finalMeetLink,
      startDate: nextDate,
      durationMinutes: 120 // 2 hours
  }) : '#';

  return (
    <Card className="border-l-4 border-l-cyan-500">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
            <span>Próxima Clase en Vivo</span>
            {nextDate && (
                <Badge variant="outline" className="text-xs font-normal border-cyan-500/30 text-cyan-500 bg-cyan-500/10">
                    En {Math.ceil((nextDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} días
                </Badge>
            )}
        </CardTitle>
        <CardDescription>
          Ingeniería Asistida por IA
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="capitalize">{displayDateStr}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span>{displayTime}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <LinkIcon className="h-4 w-4 text-primary" />
          <Link href={finalMeetLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate max-w-[200px]">
            {finalMeetLink}
          </Link>
        </div>
      </CardContent>
      <div className="p-6 pt-0 flex gap-2">
        <Button asChild className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20">
            <Link href={finalMeetLink} target="_blank" rel="noopener noreferrer">
                Acceder a Sala
            </Link>
        </Button>
        {nextDate && (
            <Button variant="outline" size="icon" asChild title="Agregar a Google Calendar">
                <Link href={gCalLink} target="_blank">
                    <CalendarPlus className="h-4 w-4 text-muted-foreground" />
                </Link>
            </Button>
        )}
      </div>
    </Card>
  );
}

// Helper component for badge
function Badge({ className, variant, children }: any) {
    return <span className={`px-2 py-0.5 rounded text-xs ${className}`}>{children}</span>
}
