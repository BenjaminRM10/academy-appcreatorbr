import { Calendar, Clock, Link as LinkIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Mock data as the 'classes' table is not yet implemented.
const mockClass = {
  title: 'Introducción a Next.js y Supabase',
  date: 'Viernes, 15 de Agosto',
  time: '19:00h - 21:00h (CDMX)',
  meetLink: 'https://meet.google.com/mock-link-abc-123',
};

export function NextClassCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próxima Clase en Vivo</CardTitle>
        <CardDescription>
          {mockClass.title}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{mockClass.date}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          <span>{mockClass.time}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <LinkIcon className="h-4 w-4 text-primary" />
          <Link href={mockClass.meetLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Enlace de la Sala (Google Meet)
          </Link>
        </div>
      </CardContent>
      <div className="p-6 pt-0">
        <Button asChild className="w-full">
            <Link href={mockClass.meetLink} target="_blank" rel="noopener noreferrer">
                Acceder a Clase
            </Link>
        </Button>
      </div>
    </Card>
  );
}
