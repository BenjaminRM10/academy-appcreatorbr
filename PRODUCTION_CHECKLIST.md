# ✅ CHECKLIST DE PRODUCCIÓN - AcademyBR

## 🔴 CRÍTICO - Hacer ANTES del despliegue

### 1. Variables de Entorno (Vercel)

**Crear estas variables en Vercel Dashboard:**

```bash
# Supabase (copiar de .env.local)
NEXT_PUBLIC_SUPABASE_URL=https://izkevbsyeqihydfzkuzt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (⚠️ MANTENER SECRETA)

# Stripe PRODUCCIÓN (cambiar a keys LIVE)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... (⚠️ OBTENER DE STRIPE DASHBOARD)
STRIPE_SECRET_KEY=sk_live_... (⚠️ OBTENER DE STRIPE DASHBOARD - NO COMPARTIR)
STRIPE_WEBHOOK_SECRET=whsec_... (⚠️ SE GENERA DESPUÉS DE CREAR EL WEBHOOK)

# App URL (cambiar a tu dominio)
NEXT_PUBLIC_APP_URL=https://academy.appcreatorbr.com
```

**⚠️ IMPORTANTE:**
- Las keys de Stripe actuales son de TEST (`pk_test_...`)
- Necesitas activar Stripe en modo LIVE y obtener las keys reales
- El STRIPE_WEBHOOK_SECRET se genera cuando crees el webhook en Stripe

---

### 2. Configuración de Stripe (CRÍTICO)

#### 2.1. Activar Modo Live en Stripe
1. Ve a https://dashboard.stripe.com
2. Toggle "Test mode" → "Live mode" (arriba a la derecha)
3. Completa el onboarding si aún no lo has hecho

#### 2.2. Obtener Keys de Producción
```
Dashboard → Developers → API Keys
- Publishable key: pk_live_...
- Secret key: sk_live_... (click "Reveal")
```

#### 2.3. Crear Webhook de Producción
```
Dashboard → Developers → Webhooks → Add endpoint

Endpoint URL: https://academy.appcreatorbr.com/api/stripe/webhook
Events to send:
  ✅ checkout.session.completed

Signing secret: whsec_... (copiar a STRIPE_WEBHOOK_SECRET)
```

#### 2.4. Verificar Precio del Producto
```sql
-- Ejecutar en Supabase SQL Editor
SELECT id, name, price FROM courses WHERE number = 1;

-- El precio debe estar en CENTAVOS (80000 = $800 MXN)
-- Si está mal, actualizar:
UPDATE courses 
SET price = 80000 
WHERE number = 1;
```

---

### 3. Configuración de DNS (Cloudflare)

**Crear subdominio:**
```bash
# Opción 1: CNAME a Vercel
academy.appcreatorbr.com → CNAME → cname.vercel-dns.com

# Opción 2: A record directo
academy.appcreatorbr.com → A → 76.76.21.21 (Vercel IP)
```

**Comandos con flarectl:**
```bash
# Crear CNAME
flarectl dns create \
  --zone="appcreatorbr.com" \
  --name="academy" \
  --type="CNAME" \
  --content="cname.vercel-dns.com" \
  --proxy

# Verificar
flarectl dns list --zone="appcreatorbr.com" | grep academy
```

---

### 4. Verificación de RLS Policies (Supabase)

**Ejecutar en SQL Editor para confirmar que existen:**

```sql
-- Ver todas las policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename;
```

**Policies MÍNIMAS requeridas:**

```sql
-- ENROLLMENTS
CREATE POLICY "Users can view their own enrollments"
ON enrollments FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own enrollments"
ON enrollments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can update enrollments"
ON enrollments FOR UPDATE
TO service_role
USING (true);

-- PROFILES
CREATE POLICY "Users can view their own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- COURSES (lectura pública)
CREATE POLICY "Anyone can view active courses"
ON courses FOR SELECT
USING (status = 'active');

-- GROUPS (lectura pública)
CREATE POLICY "Anyone can view groups"
ON groups FOR SELECT
USING (true);
```

---

### 5. Testing Pre-Producción

**Crear un usuario de prueba COMPLETO:**

1. Registrarse con email de prueba
2. Completar formulario de registro
3. **NO PAGAR** - simular pago pendiente
4. Verificar que `/pago` muestra correctamente
5. Hacer pago de prueba con tarjeta de Stripe
6. Verificar redirección a `/pago/exito`
7. Verificar acceso a `/student/dashboard`
8. Verificar que `/student/clases` muestre el curso
9. Probar simulador `/student/simuladores/terminal`

**Tarjeta de prueba Stripe:**
```
Número: 4242 4242 4242 4242
Fecha: Cualquier fecha futura
CVC: Cualquier 3 dígitos
```

---

### 6. Configuración de Vercel

**En Vercel Dashboard:**

1. **Build Settings:**
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

2. **Environment Variables:**
   - Agregar todas las de arriba
   - Marcar `STRIPE_SECRET_KEY` y `SUPABASE_SERVICE_ROLE_KEY` como "Sensitive"

3. **Domains:**
   - Add domain: `academy.appcreatorbr.com`
   - Verificar DNS

---

## 🟡 IMPORTANTE - Configuraciones Opcionales

### 7. Email de Confirmación (Opcional para MVP)

**Actualizar Supabase Email Templates:**
```
Dashboard → Authentication → Email Templates

Confirm signup:
- Cambiar el link a: https://academy.appcreatorbr.com/auth/confirm
```

### 8. Logs y Monitoreo

**Activar en Vercel:**
- Vercel Analytics (gratis)
- Vercel Speed Insights (gratis)

**Opcional - Sentry para errores:**
```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## 🟢 NICE TO HAVE - Post-Lanzamiento

### 9. SEO Básico

**Actualizar `src/app/layout.tsx`:**
```typescript
export const metadata: Metadata = {
  title: 'AcademyBR | Ingeniería Asistida por IA',
  description: 'Aprende desarrollo Full-Stack con Next.js, Supabase y IA',
  keywords: 'desarrollo web, nextjs, supabase, ia, programación',
  openGraph: {
    title: 'AcademyBR',
    description: 'Aprende desarrollo Full-Stack',
    url: 'https://academy.appcreatorbr.com',
    siteName: 'AcademyBR',
    images: ['/og-image.png'],
  }
}
```

### 10. Seguridad Adicional

**Agregar headers en `next.config.mjs`:**
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}
```

---

## 📋 CHECKLIST FINAL - Antes de Dar Link

- [ ] Variables de entorno en Vercel (LIVE keys de Stripe)
- [ ] Webhook de Stripe configurado y activo
- [ ] DNS configurado (academy.appcreatorbr.com)
- [ ] Dominio verificado en Vercel
- [ ] RLS Policies verificadas en Supabase
- [ ] Test completo del flujo: Registro → Pago → Dashboard → Clases
- [ ] Precio correcto en DB (80000 centavos = $800 MXN)
- [ ] Email templates actualizados (si aplica)
- [ ] `/student/debug` **ELIMINADO o protegido con password**
- [ ] Logs funcionando en Vercel
- [ ] Backup de base de datos hecho

---

## 🚨 PROBLEMAS CONOCIDOS A RESOLVER

### ❌ BLOQUEANTE
1. **Falta STRIPE_WEBHOOK_SECRET en .env.local** (necesario para webhooks)
2. **Keys de Stripe son de TEST** (cambiar a LIVE antes de producción)
3. **`/student/debug` expone datos sensibles** (eliminar o proteger)

### ⚠️ ADVERTENCIA
1. **No hay manejo de errores en checkout** (si Stripe falla, usuario se pierde)
2. **No hay email de confirmación configurado** (opcional pero recomendado)
3. **No hay página 404 personalizada** (nice to have)

### 💡 MEJORAS FUTURAS
1. Dashboard admin (aprobar pagos manuales)
2. Sistema de cupones/descuentos
3. Múltiples métodos de pago
4. Recordatorios de clases por email

---

## 🎯 ORDEN DE EJECUCIÓN RECOMENDADO

1. ✅ Obtener keys LIVE de Stripe
2. ✅ Configurar DNS (academy.appcreatorbr.com)
3. ✅ Desplegar a Vercel con variables de entorno
4. ✅ Crear webhook en Stripe con la URL de producción
5. ✅ Verificar precio en base de datos
6. ✅ Hacer test completo con tarjeta de prueba
7. ✅ **ELIMINAR /student/debug**
8. ✅ Dar link a usuarios

---

**TIEMPO ESTIMADO:** 45-60 minutos

**LISTO PARA:** ✅ MVP / Soft Launch
**NO LISTO PARA:** ❌ Escala masiva (pero funcionará bien para 10-50 usuarios iniciales)
