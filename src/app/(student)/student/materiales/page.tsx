import { Card, CardContent } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';

export default function MaterialesPage() {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Biblioteca de Materiales</h1>
        <p className="text-muted-foreground">Todos los recursos de tus cursos en un solo lugar.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Mock Resources */}
        {[1, 2, 3].map((i) => (
            <Card key={i} className="hover:bg-muted/50 cursor-pointer transition-colors">
                <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-2 bg-blue-500/10 rounded text-blue-500">
                        <FileText className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Guía de Estudio - Semana {i}</h3>
                        <p className="text-xs text-muted-foreground mb-2">PDF • 2.4 MB</p>
                        <span className="text-sm text-cyan-500 flex items-center gap-1">
                            Descargar <Download className="h-3 w-3" />
                        </span>
                    </div>
                </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
