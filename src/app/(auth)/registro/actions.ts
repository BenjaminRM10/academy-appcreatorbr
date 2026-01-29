"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { z } from "zod/v4"

const registroSchema = z.object({
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  occupation: z.string().min(2, "La ocupación es requerida"),
  aiUsage: z.string().optional(),
  courseExpectations: z.string().optional(),
  courseId: z.string().uuid("Selecciona un curso"),
  groupId: z.string().uuid("Selecciona un grupo"),
})

export type RegistroFormState = {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string[]>
}

export async function registrarUsuario(
  _prevState: RegistroFormState,
  formData: FormData
): Promise<RegistroFormState> {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return {
      success: false,
      error: "No hay sesión activa. Por favor, inicia sesión nuevamente.",
    }
  }

  // Parse form data
  const rawData = {
    fullName: formData.get("fullName") as string,
    phone: formData.get("phone") as string,
    occupation: formData.get("occupation") as string,
    aiUsage: formData.get("aiUsage") as string,
    courseExpectations: formData.get("courseExpectations") as string,
    courseId: formData.get("courseId") as string,
    groupId: formData.get("groupId") as string,
  }

  // Validate
  const validationResult = registroSchema.safeParse(rawData)
  if (!validationResult.success) {
    const fieldErrors: Record<string, string[]> = {}
    for (const issue of validationResult.error.issues) {
      const path = String(issue.path[0])
      if (!fieldErrors[path]) {
        fieldErrors[path] = []
      }
      fieldErrors[path].push(issue.message)
    }
    return {
      success: false,
      error: "Por favor, corrige los errores en el formulario.",
      fieldErrors,
    }
  }

  const data = validationResult.data

  // Check if profile already exists
  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single()

  if (existingProfile) {
    return {
      success: false,
      error: "Ya tienes un perfil registrado.",
    }
  }

  // Insert profile
  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    full_name: data.fullName,
    phone: data.phone,
    occupation: data.occupation,
    ai_usage: data.aiUsage || null,
    course_expectations: data.courseExpectations || null,
    role: "student",
  })

  if (profileError) {
    console.error("Error creating profile:", profileError)
    return {
      success: false,
      error: `Error al crear el perfil: ${profileError.message}`,
    }
  }

  // Insert enrollment with pending_payment status
  const { error: enrollmentError } = await supabase.from("enrollments").insert({
    user_id: user.id,
    course_id: data.courseId,
    group_id: data.groupId,
    status: "pending_payment",
    progress: 0,
  })

  if (enrollmentError) {
    console.error("Error creating enrollment:", enrollmentError)
    // Try to clean up the profile
    await supabase.from("profiles").delete().eq("id", user.id)
    return {
      success: false,
      error: `Error al crear la inscripción: ${enrollmentError.message}`,
    }
  }

  // Success - redirect to payment page
  redirect("/student/dashboard")
}
