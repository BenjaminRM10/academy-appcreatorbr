# Fase 4: Pagos con Stripe ✅ COMPLETADO

## Contexto
Los usuarios ya pueden registrarse y quedan con estado `pending_payment` en la tabla `enrollments`. Ahora necesitamos cobrarles $800 MXN por curso.

## Objetivo
Implementar el flujo de pago completo usando Stripe Checkout para cobrar la inscripción al curso.

## Flujo de Usuario
1. Usuario completa registro → `enrollments.payment_status = 'pending'`
2. Se muestra página de pago con botón "Pagar $800 MXN"
3. Usuario es redirigido a Stripe Checkout
4. Pago exitoso → Webhook actualiza `payment_status = 'paid'` y `status = 'active'`
5. Usuario regresa a `/student/dashboard` con acceso completo

## Entregables
- [x] Configuración de Stripe (API keys en `.env.local`)
- [x] `src/app/api/stripe/checkout/route.ts` - Crear sesión de checkout
- [x] `src/app/api/stripe/webhook/route.ts` - Procesar eventos de Stripe
- [x] `src/app/(auth)/pago/page.tsx` - Página de pago post-registro
- [x] `src/app/(auth)/pago/exito/page.tsx` - Página de éxito
- [x] `src/app/(auth)/pago/cancelado/page.tsx` - Página de cancelación
- [x] Actualización del middleware para redirigir usuarios `pending_payment` a `/pago`

## Configuración Stripe
Variables de entorno necesarias en `.env.local`:
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Migración de Base de Datos
Ejecuta en Supabase SQL Editor (`supabase/migrations/20250127_add_stripe_columns.sql`):
```sql
ALTER TABLE enrollments 
ADD COLUMN IF NOT EXISTS stripe_session_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_payment_intent TEXT,
ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_enrollments_stripe_session ON enrollments(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_payment_status ON enrollments(payment_status);
```

## Testing con Stripe CLI
Para probar webhooks localmente:
```bash
# Instalar Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks a localhost
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copiar el webhook secret (whsec_...) al .env.local
```

## Tarjetas de Prueba
- Éxito: `4242 4242 4242 4242`
- Declinada: `4000 0000 0000 0002`
- Requiere autenticación: `4000 0025 0000 3155`

## Archivos Creados
- `src/lib/stripe.ts` - Cliente de Stripe con lazy loading
- `src/app/api/stripe/checkout/route.ts` - Crear sesión de checkout
- `src/app/api/stripe/webhook/route.ts` - Procesar eventos de Stripe
- `src/app/(auth)/pago/page.tsx` - Página de pago (server component)
- `src/app/(auth)/pago/pago-client.tsx` - UI del pago (client component)
- `src/app/(auth)/pago/exito/page.tsx` - Página de éxito
- `src/app/(auth)/pago/cancelado/page.tsx` - Página de cancelación
- `src/lib/supabase/middleware.ts` - Actualizado con redirección a /pago

## Dependencias Instaladas
```bash
npm install stripe @stripe/stripe-js
```

## Criterios de Aceptación
- [x] Usuario puede pagar con tarjeta de crédito/débito
- [x] Webhook actualiza correctamente el estado en la base de datos
- [x] Usuario con pago confirmado puede acceder al dashboard
- [x] Usuario sin pago es redirigido a la página de pago

## Siguiente Fase
Fase 5: Dashboard del Estudiante - Mostrar cursos, progreso, próximas clases.
