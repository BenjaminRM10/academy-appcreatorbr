# Fase 3: Autenticación & Registro

## Contexto
La Landing Page está lista y atrae usuarios. Ahora necesitamos que puedan crear una cuenta y registrarse en la plataforma para luego pagar.

## Objetivo de esta fase
Implementar el sistema de autenticación completo usando Supabase Auth (Google OAuth) y un flujo de registro que capture los datos adicionales del estudiante (Teléfono, Ocupación, Grupo, etc.) en la tabla `profiles`.

## Entregables
- [ ] Autenticación con Google funcional.
- [ ] `middleware.ts` configurado para proteger rutas `/student` y `/admin`.
- [ ] Página `/login` (Redirección a Google).
- [ ] Página `/registro` (Formulario multipaso: Auth Google -> Datos Perfil -> Selección Curso -> Pago).
- [ ] Sincronización automática: Al hacer login, si no existe perfil, redirigir a completar perfil.
- [ ] Tabla `profiles` populada con datos reales.

## Instrucciones detalladas

### 1. Configuración Auth Supabase
- Verificar que Google Provider esté habilitado en Supabase (ya debería estarlo por el proyecto existente, pero verificar en código).
- Crear ruta de callback: `src/app/auth/callback/route.ts` para manejar el intercambio de código por sesión.

### 2. Middleware
- Crear `src/middleware.ts`.
- Usar `@supabase/ssr` para gestionar la sesión.
- Reglas:
    - Si intenta entrar a `/student/*` sin sesión -> Redirigir a `/login`.
    - Si tiene sesión pero no tiene perfil completo -> Redirigir a `/onboarding` (o `/registro`).

### 3. Página de Login (`/login`)
- Diseño simple centrado.
- Botón "Continuar con Google".
- Al éxito, redirigir a `/dashboard` (que el middleware interceptará si falta perfil).

### 4. Flujo de Onboarding (`/registro` o `/onboarding`)
- Si el usuario ya se autenticó pero es nuevo:
- Formulario con shadcn/ui `Form`:
    - Nombre Completo (prellenado de Google si es posible).
    - Teléfono (Input con validación básica).
    - Ocupación/Empresa.
    - Curso de interés (Select).
    - Grupo preferido (Select).
- Al guardar:
    - Insertar en `profiles`.
    - Crear registro en `enrollments` con estado `pending_payment`.
    - Redirigir a `/payment` (Fase 4, por ahora mostrar "Registro completado").

## Herramientas/MCPs a utilizar
- `agent-aider`: Para la lógica de autenticación y formularios.

## Archivos a crear/modificar
- `src/app/auth/callback/route.ts`
- `src/middleware.ts`
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/registro/page.tsx` (o `/onboarding/page.tsx`)
- `src/components/auth/UserAuthForm.tsx`
- `src/lib/supabase/middleware.ts` (helper para el middleware)

## Criterios de aceptación
- [ ] Usuario puede hacer login con Google.
- [ ] Si es nuevo, se le obliga a llenar sus datos.
- [ ] Los datos se guardan correctamente en `profiles` y `enrollments`.
- [ ] Rutas protegidas rebotan a usuarios anónimos.

## Siguiente fase
Fase 4: Pagos - Integración con Stripe y flujo de checkout.
