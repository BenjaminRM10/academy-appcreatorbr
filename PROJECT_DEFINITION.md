# PROJECT_DEFINITION.md - Escuela de Ingeniería y Tecnología 4.0

**Proyecto:** Academy AppCreatorBR  
**Dominio:** `academy.appcreatorbr.com`  
**Fecha de creación:** 2026-01-26  
**Fecha de lanzamiento:** 2026-02-16 (inicio del Curso 1)  
**Estado:** En desarrollo

---

## 🎯 Objetivo Principal

Plataforma web para la **Escuela de Ingeniería y Tecnología 4.0**, donde estudiantes y profesionistas de Saltillo, Coahuila pueden:
- Ver información de los 8 cursos modulares
- Registrarse e inscribirse a un curso
- Pagar su inscripción (Stripe o SPEI)
- Acceder a su área de estudiante con materiales, proyectos y certificados

---

## 👥 Usuarios Objetivo

- **Primario:** Estudiantes universitarios y profesionistas de Saltillo, Coahuila
- **Secundario:** Cualquier persona de México interesada en tecnología e IA
- **Capacidad:** Máximo 20 estudiantes por grupo (4 grupos = 80 estudiantes por curso)

---

## 🧑‍💼 Roles de Usuario

| Rol | Descripción | Permisos |
|-----|-------------|----------|
| **Visitante** | Usuario no registrado | Ver landing, info de cursos |
| **Estudiante** | Usuario registrado y pagado | Área de estudiante, materiales, proyectos, certificados |
| **Estudiante Pendiente** | Registrado pero no ha pagado | Ver instrucciones de pago, sin acceso a contenido |
| **Admin/Instructor** | Benja | Panel admin, monitoreo de progreso, gestión de estudiantes |

---

## 📚 Cursos Disponibles

| # | Curso | Estado | Fecha Inicio |
|---|-------|--------|--------------|
| 1 | Ingeniería Asistida por IA (Fundamentos) | **Activo** | 16 Feb 2026 |
| 2 | Despliegue de IA Local | Próximamente | TBD |
| 3 | Ingeniería de Datos y APIs | Próximamente | TBD |
| 4 | Automatización y Agentes | Próximamente | TBD |
| 5 | Internet de las Cosas (IoT) | Próximamente | TBD |
| 6 | Automatización Industrial 4.0 | Próximamente | TBD |
| 7 | Desarrollo Web Full Stack con IA | Próximamente | TBD |
| 8 | Arquitectura de Software y Negocios | Próximamente | TBD |

**Precio:** $800 MXN por curso (mensual)

---

## 📅 Horarios (4 Grupos)

| Grupo | Días | Horario |
|-------|------|---------|
| **Grupo A** | Lunes, Miércoles, Viernes | 9:00 - 11:00 AM |
| **Grupo B** | Lunes, Miércoles, Viernes | 7:00 - 9:00 PM |
| **Grupo C** | Martes, Jueves, Sábado | 9:00 - 11:00 AM |
| **Grupo D** | Martes, Jueves, Sábado | 7:00 - 9:00 PM |

- **Modalidad:** Online vía Google Meet
- **Duración por curso:** 4 semanas (12 clases)
- **Duración por clase:** 2 horas
- **Capacidad por grupo:** 20 estudiantes

---

## 💳 Métodos de Pago

| Método | Proveedor | Implementación |
|--------|-----------|----------------|
| **Tarjeta** | Stripe | Checkout integrado |
| **SPEI** | Conekta | CLABE única + webhook |

### Flujo de pago:
1. Estudiante se registra → Estado: `pending_payment`
2. Recibe email con instrucciones de pago
3. Paga con tarjeta o SPEI
4. Webhook confirma pago → Estado: `active`
5. Recibe email de confirmación con acceso

---

## 📧 Emails Automatizados

| Trigger | Email | Contenido |
|---------|-------|-----------|
| Registro completado | Confirmación de registro | Instrucciones de pago, advertencia de que no está activo hasta pagar |
| Pago confirmado | Confirmación de pago | Bienvenida, acceso al área de estudiante, horario de clases |
| 24h antes de clase | Recordatorio | Fecha, hora, link de Meet |
| 1h antes de clase | Link de Meet | Acceso directo a la sesión |
| Curso completado | Certificado disponible | Link para ver/descargar certificado |

---

## 📅 Integración Google Calendar

- **Objetivo:** Bloquear automáticamente los horarios de Benja cuando hay clases
- **Credenciales:** OAuth existente (agregar nuevo Redirect URI)
- **Funcionamiento:**
  - Al crear un grupo de clase → Se crean eventos recurrentes en el calendario
  - Los 4 grupos tienen horarios fijos predefinidos

---

## 🎓 Área de Estudiante

### Funcionalidades:
1. **Dashboard:** Vista general del progreso
2. **Clases:** Lista de sesiones con:
   - Fecha y hora
   - Link de Meet (si está activa)
   - Link a grabación (Google Drive, agregado manualmente por admin)
3. **Materiales:** PDFs, links, recursos del curso
4. **Proyectos:** Subir entregas (archivos o links)
5. **Certificados:** Ver y descargar certificados obtenidos
6. **Simuladores:** Acceso a presentaciones interactivas de cada clase

### Progreso:
- Se marca asistencia (manual por admin o automático si es posible)
- Se marca entrega de proyectos
- Al completar 100% → Se genera certificado automáticamente

---

## 🎮 Simuladores Interactivos

### Concepto
Presentaciones interactivas que el instructor (Benja) usa durante las clases para explicar conceptos. Los estudiantes pueden interactuar con ellas en tiempo real mientras el instructor comparte pantalla.

### Características:
- **Acceso:** Solo estudiantes con pago confirmado del curso
- **Uso en vivo:** Instructor comparte pantalla, estudiantes interactúan simultáneamente
- **Persistencia:** Disponibles después de la clase para repaso
- **Actualización constante:** Se crean nuevos simuladores para cada clase

### Infraestructura requerida:
1. **Ruta dedicada:** `/simuladores/[slug]` o similar
2. **Tabla en Supabase:** `simulators` con metadata
3. **Autenticación:** Verificar que el estudiante pagó el curso correspondiente
4. **Componentes base:** Estructura estándar para crear simuladores consistentes

### Ejemplos de simuladores:
- Terminal interactiva (simular comandos)
- Visualizador de flujos de datos
- Editor de código en vivo
- Diagramas animados
- Quiz interactivos
- Playground de APIs

### Workflow de creación:
Se documentará en `SIMULATOR_TEMPLATE.md` para estandarizar:
- Estructura de archivos
- Componentes reutilizables
- Cómo conectar con el curso/clase
- Testing antes de clase

---

## 🏆 Certificados

### Diseño:
- PDF profesional generado automáticamente
- Incluye: Nombre del estudiante, nombre del curso, fecha, firma de Benja
- Código QR o URL única para verificación

### Acceso:
- Visible en el área de estudiante
- Descargable en PDF
- Link compartible para verificación pública

---

## 👨‍💼 Panel de Admin

### Funcionalidades:
1. **Dashboard:** Estadísticas generales (inscritos, pagos, progreso)
2. **Estudiantes:** Lista, filtrar por curso/grupo, ver progreso individual
3. **Pagos:** Ver transacciones, marcar pagos manuales (SPEI sin webhook)
4. **Clases:** Agregar links de grabación, marcar asistencia
5. **Cursos:** Activar/desactivar cursos, cambiar fechas
6. **Certificados:** Generación manual si es necesario

---

## 📝 Datos de Registro

| Campo | Tipo | Requerido |
|-------|------|-----------|
| Nombre completo | Text | ✅ |
| Email | Email | ✅ |
| Teléfono | Tel | ✅ |
| Ocupación/Empresa | Text | ✅ |
| ¿Cómo usas la IA actualmente? | Textarea | ❌ Opcional |
| ¿Qué esperas del curso? | Textarea | ❌ Opcional |
| Grupo preferido | Select (A/B/C/D) | ✅ |
| Curso | Select | ✅ |

---

## 🎨 Branding

### Colores (Diseño Dark Mode):
- **Fondo principal:** Negro/Gris muy oscuro (#0a0a0a, #121212)
- **Fondo secundario:** Gris oscuro (#1a1a1a, #1e1e1e)
- **Primario:** Azul eléctrico/Cyan (#00d4ff, #0ea5e9)
- **Secundario:** Púrpura/Magenta (#a855f7, #ec4899)
- **Texto:** Blanco (#ffffff) y gris claro (#a1a1aa)
- **Acentos:** Gradientes neón (cyan → púrpura)
- **Estilo:** Tech futurista, glassmorphism sutil, bordes con glow

### Logo:
- Generar con MCP de Google Images
- Estilo: Moderno, tech, profesional
- Debe funcionar en fondo claro y oscuro

### Imágenes:
- Generar ilustraciones profesionales para cada curso
- Estilo consistente
- Máximo 8-10 imágenes totales

---

## 🗄️ Modelo de Datos (Supabase)

### Tablas principales:

```sql
-- Usuarios (extendiendo auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  occupation TEXT NOT NULL,
  ai_usage TEXT, -- Opcional
  course_expectations TEXT, -- Opcional
  role TEXT DEFAULT 'student', -- 'student', 'admin'
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Cursos
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number INTEGER NOT NULL, -- 1-8
  name TEXT NOT NULL,
  description TEXT,
  syllabus JSONB, -- Estructura del curso por semanas
  price INTEGER DEFAULT 80000, -- Centavos
  status TEXT DEFAULT 'upcoming', -- 'active', 'upcoming', 'completed'
  start_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Grupos
CREATE TABLE groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id),
  name TEXT NOT NULL, -- 'A', 'B', 'C', 'D'
  schedule JSONB NOT NULL, -- {days: ['mon','wed','fri'], time: '09:00-11:00'}
  meet_link TEXT,
  max_students INTEGER DEFAULT 20,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Inscripciones
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  course_id UUID REFERENCES courses(id),
  group_id UUID REFERENCES groups(id),
  status TEXT DEFAULT 'pending_payment', -- 'pending_payment', 'active', 'completed', 'cancelled'
  payment_id UUID REFERENCES payments(id),
  progress INTEGER DEFAULT 0, -- 0-100
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Pagos
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  enrollment_id UUID,
  provider TEXT NOT NULL, -- 'stripe', 'conekta_spei'
  provider_payment_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'MXN',
  status TEXT DEFAULT 'pending',
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Clases/Sesiones
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id),
  group_id UUID REFERENCES groups(id),
  week INTEGER NOT NULL, -- 1-4
  session_number INTEGER NOT NULL, -- 1-12
  title TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  meet_link TEXT,
  recording_url TEXT, -- Link a Google Drive
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Asistencia
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id),
  user_id UUID REFERENCES auth.users(id),
  attended BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(session_id, user_id)
);

-- Proyectos/Entregas
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  course_id UUID REFERENCES courses(id),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT,
  link_url TEXT,
  grade TEXT, -- 'approved', 'needs_revision', 'pending'
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Materiales
CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id),
  week INTEGER,
  title TEXT NOT NULL,
  type TEXT, -- 'pdf', 'link', 'video'
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Certificados
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  course_id UUID REFERENCES courses(id),
  enrollment_id UUID REFERENCES enrollments(id),
  certificate_number TEXT UNIQUE NOT NULL,
  issued_at TIMESTAMPTZ DEFAULT now(),
  pdf_url TEXT,
  verification_url TEXT
);

-- Simuladores Interactivos
CREATE TABLE simulators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id),
  session_id UUID REFERENCES sessions(id), -- Opcional, puede ser general del curso
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  component_path TEXT NOT NULL, -- Ruta al componente React (ej: 'terminal-basics')
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## 🔧 Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Frontend** | Next.js 14, React, Tailwind CSS, shadcn/ui |
| **Backend** | Supabase (PostgreSQL, Auth, Storage, Edge Functions) |
| **Pagos** | Stripe (tarjetas), Conekta (SPEI) |
| **Emails** | Resend (ya configurado en app_config) |
| **Calendario** | Google Calendar API |
| **Imágenes** | Google Image Gen MCP |
| **Deployment** | Vercel |
| **DNS** | Cloudflare |
| **Proyecto Supabase** | BenjaminRodriguez (existente) |

---

## 🔐 Secretos Disponibles (app_config - encriptados)

| Key | Estado | Uso |
|-----|--------|-----|
| `GOOGLE_CLIENT_ID` | ✅ Existente | Auth + Calendar |
| `GOOGLE_CLIENT_SECRET` | ✅ Existente | Auth + Calendar |
| `GOOGLE_REFRESH_TOKEN` | ✅ Existente | Calendar API (crear Meet) |
| `STRIPE_SECRET_KEY` | ✅ Existente | Pagos tarjeta |
| `STRIPE_WEBHOOK_SECRET` | ✅ Existente | Verificar webhooks |
| `RESEND_API_KEY` | ✅ Existente | Emails |
| `GEMINI_API_KEY` | ✅ Existente | IA (si se necesita) |
| `TAVILY_API_KEY` | ✅ Existente | Búsqueda |
| `CONEKTA_PRIVATE_KEY` | ❌ Pendiente | SPEI (agregar cuando se configure) |

**Encryption Key:** Se usa `SUPABASE_ENCRYPTION_KEY` en `.env.local` para desencriptar via `get_decrypted_config()` RPC.

---

## 🌐 Dominio

- **URL:** `academy.appcreatorbr.com`
- **DNS:** Cloudflare (CNAME a Vercel)
- **SSL:** Automático via Vercel/Cloudflare

---

## 💰 Estimación de Costos

| Servicio | Tier | Costo Mensual |
|----------|------|---------------|
| Vercel | Pro | $20 USD |
| Supabase | Free (proyecto existente) | $0 |
| Stripe | Pay as you go | 3.6% + $3 MXN por tx |
| Conekta | Pay as you go | ~1.5% por tx |
| Cloudflare | Free | $0 |
| Google Meet | Workspace existente | $0 |
| **Total fijo** | | ~$20 USD/mes |

---

## 📋 Entregables Finales

1. ✅ Landing page profesional con info de cursos (Dark Mode)
2. ✅ Sistema de registro con validación
3. ✅ Integración de pagos (Stripe + SPEI)
4. ✅ Área de estudiante completa
5. ✅ Panel de admin
6. ✅ Sistema de emails automatizados (Resend)
7. ✅ Generación de certificados
8. ✅ Integración con Google Calendar + Meet links
9. ✅ Imágenes y logo generados
10. ✅ Infraestructura para simuladores + `SIMULATOR_TEMPLATE.md`
11. ✅ Desplegado en academy.appcreatorbr.com

---

*Documento creado siguiendo el flujo de `memory/web_app_workflow.md`*
