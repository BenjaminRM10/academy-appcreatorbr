# Fase 5: Dashboard del Estudiante

## Contexto
Las Fases 1-4 han establecido la Landing Page, la Autenticación (Google Auth) y el sistema de Pagos (Stripe). Los usuarios ahora pueden registrarse, pagar, y su estado en `enrollments` se actualiza a `active`. El middleware los redirige a `/student/dashboard`, que actualmente devuelve 404.

## Objetivo
Construir una página de bienvenida funcional y modular para el estudiante, mostrando información relevante sobre su inscripción y sus próximos pasos.

## Entregables
- [ ] Página principal: `src/app/(student)/student/dashboard/page.tsx`
- [ ] Layout principal del estudiante: `src/app/(student)/student/layout.tsx` (con Navbar y posiblemente Sidebar)
- [ ] Componente: Tarjeta de Estado de Pago (Pendiente/Activo).
- [ ] Componente: Próxima Clase (Fecha, Hora, Link de Meet - datos mockeados si no hay tabla `classes`).
- [ ] Componente: Tarjeta del Curso (Nombre, Progreso - datos mockeados si no hay `progress`).

## Instrucciones Detalladas

### 1. Layout del Estudiante
- Crear `src/app/(student)/student/layout.tsx`.
- Incluir un `Navbar` (diferente al de `landing`) para la navegación interna.
- Usar un patrón de layout simple: `Navbar` arriba, `main content` abajo.

### 2. Dashboard (`/student/dashboard`)
- **Verificar Datos:** En el Server Component, buscar el perfil del usuario (`profiles`) y su inscripción (`enrollments`) con el estado `active`.
- **Componentes Modulares:**
    - **Tarjeta de Bienvenida:** Saludo personalizado (e.g., "Hola, [Nombre]").
    - **Alerta de Pago:** Si `enrollments.payment_status` es `pending` (aunque el middleware debería atrapar esto), mostrar una alerta grande para ir a `/pago`.
    - **Próximos Pasos:** Mostrar un bloque claro de lo que el estudiante debe hacer.
    - **Información del Curso:** Mostrar el curso al que está inscrito (usando los datos de la tabla `courses`, si existen, o datos mockeados).

## Herramientas/MCPs a utilizar
- `agent-aider`: Para la estructura y lógica de componentes.

## Archivos a crear/modificar
- `src/app/(student)/student/layout.tsx`
- `src/app/(student)/student/dashboard/page.tsx`
- `src/components/student/StudentNavbar.tsx`
- `src/components/student/CourseCard.tsx`
- `src/components/student/PaymentAlert.tsx`

## Criterios de Aceptación
- [ ] La ruta `/student/dashboard` es accesible para usuarios activos.
- [ ] Se muestra una barra de navegación interna.
- [ ] Se muestra información relevante del usuario y su curso.

## Siguiente Fase
Fase 6: Panel de Administración.
