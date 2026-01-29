import { Metadata } from "next"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { RegistroForm } from "./registro-form"

export const metadata: Metadata = {
  title: "Completa tu Registro | Academy AppCreatorBR",
  description: "Completa tu información para inscribirte en el curso.",
}

export default async function RegistroPage() {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/login")
  }

  // Check if user already has a profile
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single()

  if (existingProfile) {
    redirect("/student/dashboard")
  }

  // Fetch available courses
  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .select("id, number, name, status")
    .order("number", { ascending: true })

  if (coursesError) {
    console.error("Error fetching courses:", coursesError)
  }

  // Fetch all groups
  const { data: groups, error: groupsError } = await supabase
    .from("groups")
    .select("id, name, course_id, schedule")
    .order("name", { ascending: true })

  if (groupsError) {
    console.error("Error fetching groups:", groupsError)
  }

  // Get user metadata from Google OAuth
  const userName = user.user_metadata?.full_name || user.user_metadata?.name || ""
  const userEmail = user.email || ""

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-12 text-white dark:border-r lg:flex justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900 to-cyan-950" />
        
        {/* Logo */}
        <div className="absolute top-8 left-12 z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Academy AppCreatorBR
        </div>
        
        {/* Main Content - Centered */}
        <div className="relative z-20">
          <h2 className="text-3xl font-bold mb-4">
            ¡Bienvenido! 🚀
          </h2>
          <p className="text-xl text-zinc-300 mb-10 leading-relaxed">
            Estás a un paso de unirte a la<br />
            <span className="text-cyan-400 font-semibold">Escuela de Ingeniería y Tecnología 4.0</span>
          </p>
          
          <div className="space-y-5">
            <p className="text-base text-zinc-400 font-medium mb-4">Pasos para inscribirte:</p>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-lg">
                1
              </div>
              <span className="text-lg text-zinc-200">Completa tu información</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-lg">
                2
              </div>
              <span className="text-lg text-zinc-200">Selecciona tu curso y horario</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-lg">
                3
              </div>
              <span className="text-lg text-zinc-200">Realiza tu pago de $800 MXN</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400 font-bold text-lg">
                ✓
              </div>
              <span className="text-lg text-zinc-200">¡Comienza a aprender!</span>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Completa tu Registro
            </h1>
            <p className="text-sm text-muted-foreground">
              Hola <span className="font-medium">{userName || userEmail}</span>, 
              ingresa tus datos para inscribirte
            </p>
          </div>
          
          <RegistroForm
            courses={courses || []}
            groups={groups || []}
            userName={userName}
            userEmail={userEmail}
          />

          <p className="px-8 text-center text-xs text-muted-foreground">
            Al registrarte, aceptas nuestros términos y condiciones.
            El acceso al curso se activará después de confirmar tu pago.
          </p>
        </div>
      </div>
    </div>
  )
}
