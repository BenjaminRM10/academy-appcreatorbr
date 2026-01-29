import { Metadata } from 'next'
import Link from 'next/link'
import { XCircle, ArrowLeft, RefreshCw, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Pago Cancelado | Academy AppCreatorBR',
  description: 'Tu pago ha sido cancelado. Puedes intentar de nuevo cuando quieras.',
}

export default function PagoCanceladoPage() {
  return (
    <div className="container relative min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-lg text-center">
        {/* Cancel Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20">
            <XCircle className="w-12 h-12 text-amber-400" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-4xl font-bold mb-4">Pago Cancelado</h1>
        <p className="text-xl text-muted-foreground mb-8">
          No te preocupes, tu inscripción sigue reservada.<br />
          Puedes completar el pago cuando estés listo.
        </p>

        {/* Options Card */}
        <Card className="glass border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-lg">¿Qué deseas hacer?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              asChild
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
            >
              <Link href="/pago">
                <RefreshCw className="mr-2 h-5 w-5" />
                Intentar de nuevo
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="w-full h-12 text-lg border-white/10 hover:bg-white/5"
            >
              <Link href="/">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Volver al inicio
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Help section */}
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageCircle className="w-5 h-5 text-cyan-400" />
            <span className="font-medium">¿Necesitas ayuda?</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Si tienes problemas con el pago, contáctanos en{' '}
            <a 
              href="mailto:soporte@appcreatorbr.com" 
              className="text-cyan-400 hover:underline"
            >
              soporte@appcreatorbr.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
