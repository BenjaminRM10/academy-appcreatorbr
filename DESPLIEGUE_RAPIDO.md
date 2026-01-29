# 🚀 GUÍA RÁPIDA DE DESPLIEGUE - AcademyBR

## ✅ ESTADO ACTUAL

**App Status:** ✅ Lista para MVP (soft launch)  
**Errores Bloqueantes:** 0  
**Advertencias:** 4 (normales para desarrollo)

---

## 🎯 PASOS PARA DESPLEGAR (30-45 min)

### 1️⃣ Obtener Keys de Stripe LIVE (10 min)

**Ve a:** https://dashboard.stripe.com

1. Toggle "Test mode" → **"Live mode"** (esquina superior derecha)
2. Ve a **Developers → API Keys**
3. Copia:
   - **Publishable key** (`pk_live_...`)
   - **Secret key** (`sk_live_...`) - click "Reveal"
4. Guárdalas en un lugar seguro (las necesitarás en paso 3)

---

### 2️⃣ Configurar DNS - Cloudflare (5 min)

**Opción A - Comando Rápido:**
```bash
flarectl dns create \
  --zone="appcreatorbr.com" \
  --name="academy" \
  --type="CNAME" \
  --content="cname.vercel-dns.com" \
  --proxy
```

**Opción B - Dashboard Manual:**
1. Cloudflare Dashboard → DNS → Add record
2. Type: `CNAME`
3. Name: `academy`
4. Target: `cname.vercel-dns.com`
5. Proxy: ✅ Enabled
6. Save

---

### 3️⃣ Desplegar a Vercel (10 min)

**En Vercel Dashboard:**

1. **Importar proyecto:**
   - New Project → Import Git Repository
   - Selecciona `academy-appcreatorbr`

2. **Configurar Build:**
   ```
   Framework: Next.js
   Build Command: npm run build
   Output Directory: .next
   ```

3. **Agregar Variables de Entorno:**

   Copia estas exactamente (cambia donde dice `TU_VALOR`):

   ```
   # Supabase (copiar de .env.local)
   NEXT_PUBLIC_SUPABASE_URL=https://izkevbsyeqihydfzkuzt.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6a2V2YnN5ZXFpaHlkZnprdXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNTAyNzksImV4cCI6MjA4MzgyNjI3OX0.8TbjzEckAfKa2pdzwWRKDIFYVf0kiN3rjnEJmiu3nk8
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6a2V2YnN5ZXFpaHlkZnprdXp0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODI1MDI3OSwiZXhwIjoyMDgzODI2Mjc5fQ.mEhrHhsbn2s61quvUIHTprpqLMNOXvuPJJcspDUV7LY
   
   # Stripe LIVE (del paso 1)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_TU_VALOR_AQUI
   STRIPE_SECRET_KEY=sk_live_TU_VALOR_AQUI
   STRIPE_WEBHOOK_SECRET=whsec_dejar_vacio_por_ahora
   
   # App URL
   NEXT_PUBLIC_APP_URL=https://academy.appcreatorbr.com
   ```

   **⚠️ IMPORTANTE:**
   - Marca `STRIPE_SECRET_KEY` como **Sensitive** ✅
   - Marca `SUPABASE_SERVICE_ROLE_KEY` como **Sensitive** ✅

4. **Deploy!**

---

### 4️⃣ Agregar Dominio en Vercel (2 min)

1. En tu proyecto → **Settings → Domains**
2. Add domain: `academy.appcreatorbr.com`
3. Si Cloudflare ya está configurado, verificará automáticamente

---

### 5️⃣ Configurar Webhook de Stripe (5 min)

**⚠️ ESPERA A QUE VERCEL TERMINE DE DESPLEGAR ANTES DE ESTE PASO**

1. Ve a: https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. Endpoint URL: `https://academy.appcreatorbr.com/api/stripe/webhook`
4. Events to send:
   - Busca y selecciona: ✅ `checkout.session.completed`
5. Click **Add endpoint**
6. **Reveal** el Signing secret (`whsec_...`)
7. **Copia el secret**
8. Ve a Vercel → tu proyecto → **Settings → Environment Variables**
9. Edita `STRIPE_WEBHOOK_SECRET` y pega el valor
10. **Redeploy:** Deployments → Latest → "..." → Redeploy

---

### 6️⃣ Testing Final (10 min)

**Test completo del flujo:**

1. Ve a `https://academy.appcreatorbr.com`
2. Click "Registrarse"
3. Inicia sesión con Google (o email)
4. Completa el formulario de registro
5. Verifica que te redirija a `/pago`
6. **Usa tarjeta de prueba:**
   ```
   Número: 4242 4242 4242 4242
   Fecha: 12/34
   CVC: 123
   ```
7. Completa el pago
8. Verifica redirección a `/pago/exito`
9. Ve a `/student/dashboard` - debe mostrar curso
10. Ve a `/student/clases` - debe mostrar 4 semanas
11. Click "Ver Clases" en Semana 1
12. Ve a `/student/simuladores/terminal` - prueba el simulador

**Si todo funciona:** ✅ **LISTO PARA PRODUCCIÓN**

---

## 📋 CHECKLIST FINAL

Antes de dar el link a usuarios reales:

- [ ] DNS configurado (academy.appcreatorbr.com apunta a Vercel)
- [ ] Vercel desplegado con variables de entorno LIVE
- [ ] Dominio verificado en Vercel
- [ ] Webhook de Stripe configurado y activo
- [ ] Test completo realizado (registro → pago → dashboard)
- [ ] Precio en DB verificado (80000 centavos = $800 MXN)

---

## 🆘 TROUBLESHOOTING

### "Stripe webhook failed"
→ Verifica que `STRIPE_WEBHOOK_SECRET` esté configurado en Vercel  
→ Redeploy después de agregar la variable

### "No puedo acceder a /student/clases"
→ Verifica en Supabase que `payment_status = 'paid'`  
→ SQL Editor: `SELECT * FROM enrollments WHERE user_id = 'TU_USER_ID';`

### "El dominio no funciona"
→ Espera 5-10 minutos para propagación DNS  
→ Verifica en Cloudflare que el CNAME esté activo

### "Error 500 en checkout"
→ Revisa Vercel Logs (Functions tab)  
→ Probablemente falta STRIPE_SECRET_KEY

---

## 🎉 POST-LAUNCH

**Cuando tengas tus primeros usuarios:**

1. Monitorea Vercel Logs regularmente
2. Revisa Stripe Dashboard para pagos
3. Checa Supabase Table Editor para enrollments
4. Pide feedback a los primeros usuarios

**Mejoras sugeridas (después del MVP):**
- Email de confirmación automático
- Panel admin para aprobar pagos manuales
- Sistema de cupones/descuentos
- Recordatorios de clases

---

**TIEMPO TOTAL:** ~45 minutos  
**DIFICULTAD:** Media  
**RIESGO:** Bajo (todo testeado en desarrollo)

¡Éxito! 🚀
