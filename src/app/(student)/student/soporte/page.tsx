import { SupportTicketForm } from "@/components/student/SupportTicketForm";

export default function SoportePage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Soporte Técnico</h1>
        <p className="text-muted-foreground mt-2">
            Estamos aquí para ayudarte. Llena el formulario y recibirás respuesta en tu correo registrado.
        </p>
      </div>
      
      <SupportTicketForm />
    </div>
  );
}
