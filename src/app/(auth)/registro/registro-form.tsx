"use client"

import * as React from "react"
import { useActionState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod/v4"
import { zodResolver } from "@hookform/resolvers/zod"
import { registrarUsuario, type RegistroFormState } from "./actions"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormDescription,
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
import { cn } from "@/lib/utils"

const formSchema = z.object({
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  phone: z.string().min(10, "El teléfono debe tener al menos 10 dígitos"),
  occupation: z.string().min(2, "La ocupación es requerida"),
  aiUsage: z.string().optional(),
  courseExpectations: z.string().optional(),
  courseId: z.string().min(1, "Selecciona un curso"),
  groupId: z.string().min(1, "Selecciona un grupo"),
})

type FormData = z.infer<typeof formSchema>

interface Course {
  id: string
  number: number
  name: string
  status: string
}

interface Group {
  id: string
  name: string
  course_id: string
  schedule: {
    days: string[]
    time: string
  }
}

interface RegistroFormProps {
  courses: Course[]
  groups: Group[]
  userName?: string
  userEmail?: string
}

export function RegistroForm({
  courses,
  groups,
  userName,
}: RegistroFormProps) {
  const [state, formAction, isPending] = useActionState<RegistroFormState, FormData>(
    async (_prevState, data) => {
      const formData = new FormData()
      formData.append("fullName", data.fullName)
      formData.append("phone", data.phone)
      formData.append("occupation", data.occupation)
      formData.append("aiUsage", data.aiUsage || "")
      formData.append("courseExpectations", data.courseExpectations || "")
      formData.append("courseId", data.courseId)
      formData.append("groupId", data.groupId)
      return registrarUsuario(_prevState, formData)
    },
    { success: false }
  )

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: userName || "",
      phone: "",
      occupation: "",
      aiUsage: "",
      courseExpectations: "",
      courseId: "",
      groupId: "",
    },
  })

  const selectedCourseId = form.watch("courseId")

  // Filter groups by selected course
  const availableGroups = React.useMemo(() => {
    if (!selectedCourseId) return []
    return groups.filter((g) => g.course_id === selectedCourseId)
  }, [selectedCourseId, groups])

  // Reset group when course changes
  React.useEffect(() => {
    form.setValue("groupId", "")
  }, [selectedCourseId, form])

  const onSubmit = (data: FormData) => {
    React.startTransition(() => {
      formAction(data)
    })
  }

  const formatSchedule = (schedule: { days: string[]; time: string }) => {
    const dayNames: Record<string, string> = {
      mon: "Lun",
      tue: "Mar",
      wed: "Mié",
      thu: "Jue",
      fri: "Vie",
      sat: "Sáb",
      sun: "Dom",
    }
    const days = schedule.days.map((d) => dayNames[d] || d).join(", ")
    return `${days} ${schedule.time}`
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {state.error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {state.error}
          </div>
        )}

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl>
                <Input placeholder="Juan Pérez García" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="844 123 4567" {...field} />
              </FormControl>
              <FormDescription>WhatsApp de preferencia</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ocupación / Empresa</FormLabel>
              <FormControl>
                <Input placeholder="Estudiante de Ingeniería / TechCorp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona un curso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem
                      key={course.id}
                      value={course.id}
                      disabled={course.status !== "active"}
                    >
                      <span className={cn(course.status !== "active" && "text-muted-foreground")}>
                        {course.number}. {course.name}
                        {course.status !== "active" && " (Próximamente)"}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="groupId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grupo / Horario</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!selectedCourseId}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        selectedCourseId
                          ? "Selecciona un horario"
                          : "Primero selecciona un curso"
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      Grupo {group.name} - {formatSchedule(group.schedule)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Todas las clases son en línea vía Google Meet
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4 border-t">
          <h3 className="text-sm font-medium mb-4 text-muted-foreground">
            Opcional - Ayúdanos a conocerte mejor
          </h3>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="aiUsage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Cómo usas la IA actualmente?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ChatGPT para tareas, Copilot para código..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseExpectations"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>¿Qué esperas aprender del curso?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Quiero automatizar mi trabajo, aprender a crear apps..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <span className="mr-2 animate-spin">⏳</span>
              Registrando...
            </>
          ) : (
            "Continuar a Pago"
          )}
        </Button>
      </form>
    </Form>
  )
}
