import { createClient } from '@/lib/supabase/server'
import { ApproveButton } from './approve-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // DEBUG: Check what user we are
  const { data: { user } } = await supabase.auth.getUser()
  console.log('Admin Dashboard User:', user?.id)

  // Fetch pending verifications
  const { data: enrollments, error } = await supabase
    .from('enrollments')
    .select(`
      id,
      created_at,
      payment_method,
      payment_proof_submitted_at,
      profiles:user_id (
        full_name
      )
    `)
    .eq('payment_proof_status', 'submitted')
    .order('payment_proof_submitted_at', { ascending: false })

  if (error) {
    console.error('Error fetching enrollments:', error)
    return <div>Error loading data: {error.message}</div>
  }

  console.log('Enrollments found:', enrollments?.length)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Verificación de Pagos</h1>
      
      {(!enrollments || enrollments.length === 0) ? (
        <Card className="bg-muted/10 border-white/10">
            <CardContent className="pt-6 text-center text-muted-foreground">
                No hay pagos pendientes de verificación.
                <br/>
                <span className="text-xs">Si acabas de pagar, recarga la página.</span>
            </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
            {enrollments.map((enrollment: any) => (
                <Card key={enrollment.id} className="bg-card border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>
                              {enrollment.profiles ? 
                                `${enrollment.profiles.full_name || ''}`.trim() || 'Sin Nombre'
                                : 'Usuario desconocido'}
                            </CardTitle>
                            <div className="text-sm text-muted-foreground">
                              {enrollment.profiles?.email || 'No email'}
                            </div>
                        </div>
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                            Pendiente
                        </Badge>
                    </CardHeader>
                    <CardContent className="flex justify-between items-center">
                        <div className="text-sm space-y-1">
                            <p>Método: <span className="font-medium capitalize">{enrollment.payment_method?.replace('_', ' ')}</span></p>
                            <p className="text-muted-foreground">Enviado: {enrollment.payment_proof_submitted_at ? new Date(enrollment.payment_proof_submitted_at).toLocaleString() : '-'}</p>
                        </div>
                        <ApproveButton enrollmentId={enrollment.id} />
                    </CardContent>
                </Card>
            ))}
        </div>
      )}
    </div>
  )
}
