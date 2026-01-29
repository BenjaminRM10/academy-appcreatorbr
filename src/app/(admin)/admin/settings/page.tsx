import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">Gestiona la configuración general de la plataforma.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Información del Curso</CardTitle>
            <CardDescription>Datos básicos del curso actual.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nombre del Curso</Label>
              <Input defaultValue="Ingeniería Asistida por IA (Fundamentos)" disabled />
            </div>
            <div className="space-y-2">
              <Label>Precio (MXN)</Label>
              <Input defaultValue="$800.00" disabled />
            </div>
            <div className="space-y-2">
              <Label>Fecha de Inicio</Label>
              <Input defaultValue="16 de Febrero, 2026" disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Integraciones</CardTitle>
            <CardDescription>Servicios conectados.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Stripe</p>
                <p className="text-sm text-muted-foreground">Pagos con tarjeta</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-green-600">Activo</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Resend</p>
                <p className="text-sm text-muted-foreground">Envío de emails</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-green-600">Activo</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Supabase</p>
                <p className="text-sm text-muted-foreground">Base de datos</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-green-600">Activo</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Estado del Sistema</CardTitle>
            <CardDescription>Información general del despliegue.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Entorno</p>
                <p className="font-medium">Producción</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Versión</p>
                <p className="font-medium">v1.0.0 (MVP)</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Estado</p>
                <p className="font-medium text-green-600">Operativo</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
