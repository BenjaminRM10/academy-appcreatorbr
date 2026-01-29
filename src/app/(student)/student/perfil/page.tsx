import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default async function PerfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id)
    .single();

  return (
    <div className="space-y-6 animate-in fade-in max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
        <p className="text-muted-foreground">Gestiona tus datos personales.</p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label>Nombre Completo</Label>
                <Input defaultValue={profile?.full_name} disabled />
            </div>
            <div className="space-y-2">
                <Label>Correo Electrónico</Label>
                <Input defaultValue={user?.email} disabled />
            </div>
            <div className="space-y-2">
                <Label>Teléfono</Label>
                <Input defaultValue={profile?.phone} disabled />
            </div>
            <div className="pt-4">
                <Button variant="outline">Solicitar Cambio de Datos</Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
