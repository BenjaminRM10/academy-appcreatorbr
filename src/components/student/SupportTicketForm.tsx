"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send } from "lucide-react"
import { submitSupportTicket } from "@/app/actions/support"

const ticketSchema = z.object({
  category: z.string().min(1, "Selecciona una categoría"),
  subject: z.string().min(5, "El asunto debe ser descriptivo (min 5 letras)"),
  description: z.string().min(20, "Por favor detalla tu problema (min 20 letras)"),
})

type TicketFormData = z.infer<typeof ticketSchema>

export function SupportTicketForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  
  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      category: "",
      subject: "",
      description: "",
    },
  })

  const onSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true)
    try {
      const result = await submitSupportTicket(data)

      if (result.error) {
        throw new Error(result.error)
      }

      toast({
        title: "Ticket Enviado",
        description: "Recibimos tu solicitud. Te responderemos pronto a tu correo.",
      })
      
      form.reset()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "No se pudo enviar el ticket. Intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Abrir Ticket de Soporte</CardTitle>
        <CardDescription>
          ¿Tienes algún problema con la plataforma o tu curso? Cuéntanos y te ayudamos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de problema" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="acceso">Problemas de Acceso / Login</SelectItem>
                      <SelectItem value="contenido">Duda sobre una Clase / Material</SelectItem>
                      <SelectItem value="pagos">Pagos y Facturación</SelectItem>
                      <SelectItem value="tecnico">Error Técnico en la Plataforma</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Asunto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. No puedo ver el video de la clase 3..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción Detallada</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Explica qué pasó, qué navegador usas, etc." 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar Ticket
                </>
              )}
            </Button>

          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
