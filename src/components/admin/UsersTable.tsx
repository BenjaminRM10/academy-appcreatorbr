'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  enrollments: {
      status: string;
      payment_status: string;
      courses: { name: string } | null;
  }[];
}

export function UsersTable({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  // Filter Logic
  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone?.includes(searchTerm)
  );

  const handleApprovePayment = async (userId: string) => {
    setLoadingId(userId);
    try {
        // Call API endpoint to handle the secure update
        const response = await fetch('/api/admin/approve-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        });

        if (!response.ok) throw new Error('Error updating payment');

        toast({ title: 'Pago Aprobado', description: 'El usuario ahora tiene acceso.' });
        router.refresh(); // Refresh server data
        
        // Optimistic update
        setUsers(users.map(u => 
            u.id === userId 
            ? { ...u, enrollments: [{ ...u.enrollments[0], payment_status: 'paid' }] } 
            : u
        ));

    } catch (error) {
        toast({ title: 'Error', description: 'No se pudo actualizar.', variant: 'destructive' });
    } finally {
        setLoadingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 max-w-sm">
        <Search className="w-4 h-4 text-muted-foreground" />
        <Input 
            placeholder="Buscar por nombre o teléfono..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Curso</TableHead>
              <TableHead>Estado Pago</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => {
                const enrollment = user.enrollments?.[0]; // Assuming 1 active enrollment for now
                const isPaid = enrollment?.payment_status === 'paid';

                return (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.full_name || 'Sin Nombre'}</TableCell>
                        <TableCell>{user.phone || '-'}</TableCell>
                        <TableCell>{enrollment?.courses?.name || 'Sin Curso'}</TableCell>
                        <TableCell>
                            <Badge variant={isPaid ? 'default' : 'secondary'} className={isPaid ? 'bg-green-600' : 'bg-yellow-500 text-yellow-950'}>
                                {isPaid ? 'Pagado' : 'Pendiente'}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                            {!isPaid && enrollment && (
                                <Button 
                                    size="sm" 
                                    onClick={() => handleApprovePayment(user.id)}
                                    disabled={loadingId === user.id}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                    {loadingId === user.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            <CheckCircle className="mr-1 h-3 w-3" /> Aprobar
                                        </>
                                    )}
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                );
            })}
            {filteredUsers.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        No se encontraron usuarios.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
