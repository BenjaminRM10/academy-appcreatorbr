import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default async function HistorialPagosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('created_at, payment_status, status, courses(name, price)')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Historial de Compras</h1>
        <p className="text-muted-foreground">Tus recibos e inscripciones.</p>
      </div>

      <Card>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Concepto</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {enrollments?.map((item: any, i: number) => (
                    <TableRow key={i}>
                        <TableCell>
                            {format(new Date(item.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                        </TableCell>
                        <TableCell>{item.courses?.name || 'Curso Runa Academy'}</TableCell>
                        <TableCell>${(item.courses?.price || 80000) / 100} MXN</TableCell>
                        <TableCell>
                            <Badge variant={item.payment_status === 'paid' ? 'default' : 'secondary'}>
                                {item.payment_status === 'paid' ? 'Pagado' : 'Pendiente'}
                            </Badge>
                        </TableCell>
                    </TableRow>
                ))}
                {!enrollments?.length && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">No hay historial.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
      </Card>
    </div>
  );
}
