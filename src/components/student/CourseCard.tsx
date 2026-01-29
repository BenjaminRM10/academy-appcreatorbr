import { Zap, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface CourseCardProps {
  courseName: string;
  enrolledDate: string;
  courseDuration: string;
}

export function CourseCard({ courseName, enrolledDate, courseDuration }: CourseCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">
          {courseName}
        </CardTitle>
        <Badge className="bg-green-500 hover:bg-green-600">Activo</Badge>
      </CardHeader>
      <CardContent className="pt-6 flex-grow">
        <CardDescription className="text-sm text-muted-foreground mb-4">
          Detalles de tu inscripción en el curso.
        </CardDescription>
        
        <Separator className="my-4" />

        <div className="grid gap-4">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Módulos</span>
              <span className="text-xs text-muted-foreground">3 Módulos de Proyecto (Mock)</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Duración</span>
              <span className="text-xs text-muted-foreground">{courseDuration}</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Zap className="h-5 w-5 text-primary" />
            <div className="flex flex-col">
              <span className="text-sm font-medium">Inscrito desde</span>
              <span className="text-xs text-muted-foreground">{enrolledDate}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
