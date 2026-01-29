'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CreditCard, Shield, CheckCircle2, Banknote, Copy, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface PagoClientProps {
  courseName: string
  courseNumber: number
  userName: string
}

export function PagoClient({ courseName, courseNumber, userName }: PagoClientProps) {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'spei'>('stripe')
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeiSubmitted, setIsSpeiSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleStripePayment = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Get current auth session to pass token
      const { data: { session } } = await supabase.auth.getSession()
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { returnUrl: window.location.origin },
      })

      if (error) throw new Error(error.message || 'Error al iniciar el pago')
      if (data?.url) window.location.href = data.url
      
    } catch (err) {
      console.error('Payment error:', err)
      setError(err instanceof Error ? err.message : 'Error al procesar el pago')
      setIsLoading(false)
    }
  }

  const handleSpeiSubmit = async () => {
    setIsLoading(true)
    setError(null)
    try {
        const response = await fetch('/api/payments/manual-submit', { method: 'POST' })
        if (!response.ok) throw new Error('Error al confirmar transferencia')
        setIsSpeiSubmitted(true)
    } catch (err) {
        setError('No se pudo confirmar. Intenta de nuevo.')
    } finally {
        setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // Could add toast here
  }

  if (isSpeiSubmitted) {
      return (
        <div className="container relative min-h-screen flex items-center justify-center py-12">
            <div className="w-full max-w-lg text-center">
                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                 </div>
                 <h1 className="text-3xl font-bold mb-4">¡Confirmación Enviada!</h1>
                 <p className="text-muted-foreground mb-8">
                    Hemos recibido tu confirmación de transferencia. Validaremos el pago manualmente y te notificaremos cuando tu acceso esté activo.
                 </p>
                 <Button onClick={() => window.location.reload()} variant="outline">
                    Verificar Estado
                 </Button>
            </div>
        </div>
      )
  }

  return (
    <div className="container relative min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 mb-4">
            <CreditCard className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Completa tu Inscripción</h1>
          <p className="text-muted-foreground">
            Hola <span className="font-medium text-foreground">{userName}</span>, elige tu método de pago
          </p>
        </div>

        {/* Method Selection */}
        <div className="grid grid-cols-2 gap-2 mb-6 p-1 bg-muted/20 rounded-lg">
            <button
                onClick={() => setPaymentMethod('stripe')}
                className={`flex items-center justify-center gap-2 p-3 rounded-md transition-all ${
                    paymentMethod === 'stripe' 
                    ? 'bg-background shadow text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
            >
                <CreditCard className="w-4 h-4" />
                <span className="font-medium">Tarjeta</span>
            </button>
            <button
                onClick={() => setPaymentMethod('spei')}
                className={`flex items-center justify-center gap-2 p-3 rounded-md transition-all ${
                    paymentMethod === 'spei' 
                    ? 'bg-background shadow text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
            >
                <Banknote className="w-4 h-4" />
                <span className="font-medium">Transferencia</span>
            </button>
        </div>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-lg bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                Curso {courseNumber}
              </span>
            </CardTitle>
            <CardDescription className="text-lg text-foreground">
              {courseName}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex items-baseline justify-between p-4 rounded-lg bg-white/5">
              <span className="text-muted-foreground">Total a pagar</span>
              <div className="text-right">
                <span className="text-3xl font-bold text-gradient">$800</span>
                <span className="text-lg text-muted-foreground ml-1">MXN</span>
              </div>
            </div>

            {paymentMethod === 'stripe' ? (
                // Features list for Stripe
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span>Acceso inmediato automático</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span>Pago seguro con Stripe</span>
                    </div>
                </div>
            ) : (
                // Bank Info for SPEI
                <div className="space-y-4 text-sm">
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 space-y-3">
                        <div className="flex justify-between items-start">
                            <span className="text-muted-foreground">Banco</span>
                            <span className="font-medium text-right">Banorte / STP</span>
                        </div>
                        <div className="flex justify-between items-start">
                            <span className="text-muted-foreground">Beneficiario</span>
                            <span className="font-medium text-right">Alejandro Benjamin<br/>Rodriguez Mares</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-blue-500/20">
                            <span className="text-muted-foreground">CLABE</span>
                            <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-lg">072078013063005060</span>
                                <button onClick={() => copyToClipboard("072078013063005060")} className="text-cyan-400 hover:text-cyan-300">
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 text-xs text-yellow-500 bg-yellow-500/10 p-3 rounded-md">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p>Por favor usa tu <strong>Nombre Completo</strong> en el concepto de pago para identificar tu transferencia.</p>
                    </div>
                </div>
            )}

            {error && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {error}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            {paymentMethod === 'stripe' ? (
                <Button
                    onClick={handleStripePayment}
                    disabled={isLoading}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300"
                >
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Procesando...
                        </>
                    ) : (
                        <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Pagar con Tarjeta
                        </>
                    )}
                </Button>
            ) : (
                <Button
                    onClick={handleSpeiSubmit}
                    disabled={isLoading}
                    className="w-full h-12 text-lg font-semibold bg-white text-black hover:bg-gray-100 transition-all duration-300"
                >
                    {isLoading ? (
                        <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Enviando...
                        </>
                    ) : (
                        <>
                        <CheckCircle2 className="mr-2 h-5 w-5" />
                        Ya realicé la transferencia
                        </>
                    )}
                </Button>
            )}

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>{paymentMethod === 'stripe' ? 'Pago procesado por Stripe' : 'Verificación manual requerida'}</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
