import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PaymentAlertProps {
  status: 'paid' | 'pending' | 'canceled';
}

export function PaymentAlert({ status }: PaymentAlertProps) {
  if (status === 'paid') {
    return null; // Don't show if status is paid
  }

  const isPending = status === 'pending';
  
  return (
    <Card className="border-red-500 bg-red-50 dark:bg-red-950/20 mb-6">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0" />
          <CardTitle className="text-red-700 dark:text-red-300">
            Atención: Estado del Pago
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-red-600 dark:text-red-400">
          {isPending
            ? 'Tu pago está pendiente de confirmación. El acceso total al curso será liberado tras la compensación.'
            : 'Tu acceso al curso está cancelado o inactivo. Por favor, regulariza tu situación.'
          }
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link href="/pago" passHref>
          <Button variant="destructive">
            {isPending ? 'Verificar Estado del Pago' : 'Ir a la Página de Pago'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
