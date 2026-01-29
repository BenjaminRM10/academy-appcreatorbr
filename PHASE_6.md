# Fase 6: Panel de Administración

## Contexto
Las Fases 1-5 han completado el front-end público, la autenticación de estudiantes, los pagos y el dashboard del estudiante. Ahora, se necesita una herramienta interna para que los administradores gestionen la información y el estado de la academia.

## Objetivo
Crear una zona de acceso restringido para administradores (`/admin/dashboard`) con funcionalidades básicas de gestión de datos y estado.

## Entregables
- [ ] Nuevo rol en `profiles.role`: `admin`.
- [ ] Extensión del middleware para proteger `/admin/*` y verificar el rol `admin`.
- [ ] Layout principal del administrador: `src/app/(admin)/admin/layout.tsx` (con navegación y botón de Logout).
- [ ] Dashboard principal del administrador: `src/app/(admin)/admin/dashboard/page.tsx`.
- [ ] Página de gestión de usuarios: `src/app/(admin)/admin/users/page.tsx` (Tabla con filtros).
- [ ] Funcionalidad para actualizar el estado de pago del estudiante (solo para admins).

## Instrucciones Detalladas

### 1. Rol y Middleware
- La tabla `profiles` ya tiene una columna `role` (TEXT).
- Implementar la lógica en `middleware.ts` para que, si el usuario está autenticado y su ruta es `/admin/*`, se verifique que `profiles.role` sea `'admin'`. Si no lo es, redirigir a `/student/dashboard`.

### 2. Layout del Administrador
- Crear `src/app/(admin)/admin/layout.tsx`.
- Usar un diseño de sidebar minimalista (shadcn/ui Card o Nav) con links a: Dashboard, Usuarios, Cursos, Pagos.

### 3. Dashboard Principal (`/admin/dashboard`)
- Server Component para obtener estadísticas clave:
    - Total de Usuarios Registrados
    - Total de Pagos Pendientes (`enrollments.payment_status = 'pending'`)
    - Total de Pagos Activos (`enrollments.payment_status = 'paid'`)

### 4. Gestión de Usuarios (`/admin/users`)
- **Tabla de Usuarios:** Usar `shadcn/ui` para mostrar una tabla con:
    - Nombre, Email, Teléfono
    - Curso Inscrito (FK)
    - Estado de Pago (`enrollments.payment_status`)
    - **Acción:** Botón para actualizar el estado de pago (e.g., `'paid'` a `'pending'`).

## Herramientas/MCPs a utilizar
- `agent-aider`: Para la lógica de componentes de gestión de datos.

## Archivos a crear/modificar
- `src/middleware.ts` (modificación)
- `src/app/(admin)/admin/layout.tsx`
- `src/app/(admin)/admin/dashboard/page.tsx`
- `src/app/(admin)/admin/users/page.tsx`
- `src/components/admin/UserTable.tsx`
- `src/components/admin/AdminSidebar.tsx`

## Criterios de Aceptación
- [ ] La ruta `/admin/dashboard` solo es accesible para usuarios con rol `admin`.
- [ ] Se muestra una tabla con la lista de usuarios y sus estados de pago.
- [ ] Se muestra un resumen de las métricas clave de la academia.

## Siguiente Fase
Fase 7: Configuración de Clases y Google Calendar (para las clases de Meet).
