# Plan de Fases - Academy AppCreatorBR

**Proyecto:** Escuela de Ingeniería y Tecnología 4.0  
**Dominio:** academy.appcreatorbr.com  
**Fecha inicio desarrollo:** 2026-01-26  
**Fecha lanzamiento:** 2026-02-16

---

## Resumen de Fases

| Fase | Nombre | Duración Est. | Dependencias |
|------|--------|---------------|--------------|
| 1 | Setup & Base de Datos | 2-3h | Ninguna |
| 2 | Branding & Landing | 3-4h | Fase 1 |
| 3 | Registro & Auth | 2-3h | Fase 1, 2 |
| 4 | Pagos (Stripe + SPEI) | 3-4h | Fase 3 |
| 5 | Área de Estudiante | 4-5h | Fase 4 |
| 6 | Infraestructura Simuladores | 2-3h | Fase 5 |
| 7 | Panel Admin | 3-4h | Fase 5 |
| 8 | Emails & Calendar | 2-3h | Fase 4 |
| 9 | Certificados | 2-3h | Fase 5 |
| 10 | Testing & Deploy | 2-3h | Todas |

**Total estimado:** 25-35 horas de desarrollo

---

## Detalle por Fase

### Fase 1: Setup & Base de Datos
- Crear proyecto Next.js 14 con App Router
- Configurar Tailwind CSS + shadcn/ui (tema dark)
- Conectar con proyecto Supabase existente (BenjaminRodriguez)
- Crear tablas nuevas (sin borrar existentes)
- Configurar sistema de encriptación (SUPABASE_ENCRYPTION_KEY)
- Estructura de carpetas

### Fase 2: Branding & Landing
- Generar logo con MCP de imágenes
- Definir paleta de colores dark
- Generar imágenes ilustrativas para cursos (máx 8-10)
- Landing page con:
  - Hero section
  - Info de los 8 cursos
  - Horarios y precios
  - CTA de registro
  - Footer

### Fase 3: Registro & Auth
- Supabase Auth con Google OAuth
- Formulario de registro completo
- Validaciones
- Estado `pending_payment` al registrar
- Página de "Esperando pago"

### Fase 4: Pagos (Stripe + SPEI)
- Integración Stripe Checkout
- Integración Conekta para SPEI (agregar API key)
- Webhooks para confirmar pagos
- Edge Functions para manejar webhooks
- Actualizar estado a `active` post-pago

### Fase 5: Área de Estudiante
- Dashboard con progreso
- Lista de clases (con Meet links y grabaciones)
- Sección de materiales
- Subida de proyectos
- Vista de certificados

### Fase 6: Infraestructura Simuladores
- Ruta `/simuladores/[slug]`
- Tabla `simulators` en Supabase
- Componentes base reutilizables
- Verificación de acceso (solo estudiantes pagados)
- `SIMULATOR_TEMPLATE.md` para estandarizar creación
- Un simulador de ejemplo funcional

### Fase 7: Panel Admin
- Dashboard con estadísticas
- Gestión de estudiantes
- Ver/marcar pagos
- Agregar links de grabación
- Marcar asistencia
- Activar/desactivar cursos

### Fase 8: Emails & Calendar
- Integración Resend para emails
- Templates de email:
  - Confirmación de registro
  - Confirmación de pago
  - Recordatorio de clase
  - Link de Meet
- Crear 4 Meet links permanentes
- Integrar con Google Calendar

### Fase 9: Certificados
- Diseño de certificado PDF
- Generación automática con jsPDF o similar
- Código QR de verificación
- URL pública para verificar autenticidad
- Descarga desde área de estudiante

### Fase 10: Testing & Deploy
- Pruebas de flujo completo
- Configurar DNS en Cloudflare
- Deploy a Vercel
- Variables de entorno en Vercel
- Prueba de pagos en producción
- Lighthouse check (90+)

---

*Cada fase tendrá su propio `PHASE_X.md` con prompt autocontenido.*
