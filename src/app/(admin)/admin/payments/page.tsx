import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default async function AdminPaymentsPage() {
  const supabase = await createClient();

  // Fetch pending enrollments with user and course info
  const { data: pendingPayments, error } = await supabase
    .from('enrollments')
    .select(`
      id,
      created_at,
      payment_status,
      payment_method,
      user_id,
      course_id,
      courses(name, price)
    `)
    .eq('payment_status', 'pending')
    .order('created_at', { ascending: false });

  // Fetch user profiles separately
  const userIds = pendingPayments?.map(p => p.user_id) || [];
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, phone')
    .in('id', userIds);

  const usersMap = new Map(profiles?.map(p => [p.id, p]) || []);

  return (
    <div className="space-y-8 animate-in fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Pagos</h1>
        <p className="text-muted-foreground">Aprueba pagos manuales y revisa transferencias pendientes.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            Pagos Pendientes ({pendingPayments?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Estudiante</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Curso</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingPayments?.map((payment) => {
                const user = usersMap.get(payment.user_id);
                return (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{user?.full_name || 'Desconocido'}</TableCell>
                    <TableCell>{user?.phone || '-'}</TableCell>
                    <TableCell>{payment.courses?.name || 'Curso'}</TableCell>
                    <TableCell>${(payment.courses?.price || 80000) / 100} MXN</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {payment.payment_method === 'stripe' ? 'Stripe' : 'Transferencia'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(payment.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" asChild>
                        <Link href={`/admin/users`}>
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Aprobar
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {!pendingPayments?.length && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    No hay pagos pendientes 🎉
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
