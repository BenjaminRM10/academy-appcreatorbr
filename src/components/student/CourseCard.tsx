import { Zap, BookOpen, Clock, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface CourseCardProps {
  courseId?: string;
  courseName: string;
  enrolledDate: string;
  courseDuration: string;
  progress?: number;
  groupName?: string;
  schedule?: string;
}

export function CourseCard({ courseId, courseName, enrolledDate, courseDuration, progress = 0, groupName, schedule }: CourseCardProps) {
  return (
    <Card className="h-full flex flex-col border-cyan-500/20 shadow-lg shadow-cyan-500/5 hover:border-cyan-500/40 transition-colors">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl md:text-2xl font-bold line-clamp-1" title={courseName}>
          {courseName}
        </CardTitle>
        <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/50">Activo</Badge>
      </CardHeader>
      <CardContent className="pt-6 flex-grow flex flex-col">
        <CardDescription className="text-sm text-muted-foreground mb-4">
          Tu progreso actual en el programa.
        </CardDescription>
        
        {/* Progress Bar */}
        <div className="mb-6 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>Completado</span>
                <span>{progress}%</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-1000 ease-out" 
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>

        <Separator className="my-auto" />

        <div className="grid gap-4 mt-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-primary/10">
                <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Módulos</span>
              <span className="text-xs text-muted-foreground">Fase 1: Fundamentos</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-primary/10">
                <Clock className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Duración</span>
              <span className="text-xs text-muted-foreground">{courseDuration}</span>
            </div>
          </div>

          {groupName && (
            <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                <span className="text-sm font-medium">Grupo {groupName}</span>
                <span className="text-xs text-muted-foreground">{schedule || 'Horario por definir'}</span>
                </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-full bg-primary/10">
                <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Inscrito desde</span>
              <span className="text-xs text-muted-foreground">{enrolledDate}</span>
            </div>
          </div>
        </div>
      </CardContent>
      {courseId && (
        <CardFooter className="pt-0">
          <Button className="w-full" variant="outline" asChild>
            <Link href={`/student/cursos/${courseId}`}>
              Ver Temario y Detalles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
