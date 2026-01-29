import { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, BookOpen, Calendar, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: '¡Pago Exitoso! | Academy AppCreatorBR',
  description: 'Tu pago ha sido procesado exitosamente. Ya puedes acceder a tu curso.',
}

export default function PagoExitoPage() {
  return (
    <div className="container relative min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-lg text-center">
        {/* Success Animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-green-500/20 animate-ping" />
          </div>
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-400 to-emerald-500">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Message */}
        <h1 className="text-4xl font-bold mb-4 text-gradient">¡Pago Exitoso!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Tu inscripción ha sido confirmada.<br />
          Ya tienes acceso completo a tu curso.
        </p>

        {/* What's Next Card */}
        <Card className="glass border-white/10 mb-8">
          <CardHeader>
            <CardTitle className="text-lg">¿Qué sigue?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-medium">Explora el Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Accede a tu panel personal para ver tu progreso y materiales
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium">Revisa tu Horario</h3>
                <p className="text-sm text-muted-foreground">
                  Consulta las fechas y horarios de tus clases en vivo
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-medium">Comienza a Aprender</h3>
                <p className="text-sm text-muted-foreground">
                  Accede a los recursos previos y prepárate para tu primera clase
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <Button
          asChild
          className="h-12 px-8 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
        >
          <Link href="/student/dashboard">
            Ir a mi Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>

        {/* Email note */}
        <p className="text-xs text-muted-foreground mt-6">
          Recibirás un recibo de pago y detalles de acceso en tu correo electrónico.
        </p>
      </div>
    </div>
  )
}
