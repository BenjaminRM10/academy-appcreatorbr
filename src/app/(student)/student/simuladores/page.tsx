import { Terminal, Gamepad2, Network, Cpu } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const SIMULATORS = [
  {
    id: 'terminal-challenge',
    title: 'Terminal Master',
    description: 'Domina la línea de comandos. Desde `ls` básico hasta scripts de automatización complejos.',
    icon: Terminal,
    difficulty: 'Progresiva',
    levels: 50,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    href: '/student/simuladores/terminal'
  },
  {
    id: 'api-lab',
    title: 'Laboratorio de APIs',
    description: 'Visualiza y manipula peticiones HTTP. Conecta cables virtuales y entiende REST.',
    icon: Network,
    difficulty: 'Intermedio',
    levels: 12,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    href: '#', // Future
    locked: true
  },
  {
    id: 'docker-ops',
    title: 'Docker Ops',
    description: 'Orquesta contenedores visualmente antes de tocar la consola real.',
    icon: Cpu,
    difficulty: 'Avanzado',
    levels: 20,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    href: '#', // Future
    locked: true
  }
];

export default function SimuladoresPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Gamepad2 className="h-8 w-8 text-purple-500" />
            Arcade de Ingeniería
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
            Simuladores interactivos para practicar sin miedo a romper nada. 
            Completa niveles, gana puntos y conviértete en un experto técnico.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SIMULATORS.map((sim) => (
            <Card key={sim.id} className={`flex flex-col h-full transition-all hover:border-primary/50 ${sim.locked ? 'opacity-70' : ''}`}>
                <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                        <div className={`p-2 rounded-lg ${sim.bgColor}`}>
                            <sim.icon className={`h-6 w-6 ${sim.color}`} />
                        </div>
                        {sim.locked ? (
                            <Badge variant="outline">Próximamente</Badge>
                        ) : (
                            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                                {sim.levels} Niveles
                            </Badge>
                        )}
                    </div>
                    <CardTitle>{sim.title}</CardTitle>
                    <CardDescription>{sim.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">Dificultad:</span> {sim.difficulty}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={sim.locked} asChild={!sim.locked}>
                        {sim.locked ? (
                            <span>En Desarrollo</span>
                        ) : (
                            <Link href={sim.href}>Jugar Ahora</Link>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
