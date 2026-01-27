# Fase 1: Setup & Base de Datos

## Contexto
Creación de la plataforma "Escuela de Ingeniería y Tecnología 4.0" para academy.appcreatorbr.com. Sistema de cursos mensuales con registro, pagos, área de estudiante, simuladores y certificados.

## Objetivo de esta fase
Establecer la base técnica del proyecto: Next.js configurado con Tailwind/shadcn en modo dark, conectado a Supabase existente, con todas las tablas necesarias creadas.

## Entregables
- [ ] Proyecto Next.js 14 inicializado en `/home/benjaminrm10/repos/academy-appcreatorbr`
- [ ] Tailwind CSS + shadcn/ui configurado (tema dark por defecto)
- [ ] Conexión a Supabase (proyecto BenjaminRodriguez)
- [ ] Tablas nuevas creadas en Supabase (sin borrar existentes)
- [ ] Estructura de carpetas definida
- [ ] Variables de entorno configuradas
- [ ] Repositorio Git inicializado

## Instrucciones detalladas

### 1. Crear proyecto Next.js
```bash
cd /home/benjaminrm10/repos/academy-appcreatorbr
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### 2. Instalar dependencias
```bash
npm install @supabase/supabase-js @supabase/ssr
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install -D @types/node
npx shadcn@latest init
```

Configuración shadcn:
- Style: New York
- Base color: Slate
- CSS variables: Yes

### 3. Configurar tema dark
Modificar `tailwind.config.ts` y `globals.css` para dark mode por defecto.

### 4. Estructura de carpetas
```
src/
├── app/
│   ├── (public)/           # Landing, cursos info
│   ├── (auth)/             # Login, registro
│   ├── (student)/          # Área de estudiante (protegida)
│   ├── (admin)/            # Panel admin (protegido)
│   ├── simuladores/        # Simuladores interactivos
│   ├── api/                # API routes
│   └── layout.tsx
├── components/
│   ├── ui/                 # shadcn components
│   ├── landing/            # Componentes de landing
│   ├── student/            # Componentes área estudiante
│   ├── admin/              # Componentes admin
│   └── simulators/         # Componentes base simuladores
├── lib/
│   ├── supabase/           # Cliente Supabase
│   ├── config/             # Configuración y env
│   ├── utils/              # Utilidades
│   └── types/              # TypeScript types
└── styles/
```

### 5. Variables de entorno (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://izkevbsyeqihydfzkuzt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<obtener de Supabase>
SUPABASE_SERVICE_ROLE_KEY=<obtener de Supabase>
SUPABASE_ENCRYPTION_KEY=f1fb550945c9eae4dd5dc1c58500622421adf0170d357aa96c9847fd5c0443bd
```

### 6. Crear tablas en Supabase
Ejecutar SQL para crear las tablas definidas en PROJECT_DEFINITION.md:
- profiles
- courses
- groups
- enrollments
- payments
- sessions
- attendance
- submissions
- materials
- certificates
- simulators

**IMPORTANTE:** No borrar tablas existentes (app_config, course_registrations, events, etc.)

### 7. Configurar cliente Supabase
Crear `lib/supabase/client.ts` y `lib/supabase/server.ts` para cliente y servidor.

### 8. Inicializar Git
```bash
git init
git add .
git commit -m "feat: initial setup - Next.js 14 + Supabase + shadcn"
```

## Herramientas/MCPs a utilizar
- supabase MCP: Para crear tablas y verificar estructura
- exec: Para comandos de terminal

## Archivos a crear/modificar
- `package.json` (generado por create-next-app)
- `tailwind.config.ts`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/config/env.ts`
- `.env.local`
- `.gitignore`

## Criterios de aceptación
- [ ] `npm run dev` inicia sin errores
- [ ] Página principal muestra tema dark
- [ ] Conexión a Supabase funciona
- [ ] Tablas creadas visibles en Supabase dashboard
- [ ] Git inicializado con primer commit

## Siguiente fase
Fase 2: Branding & Landing - Generación de logo, imágenes y creación de la página principal.

---

## 📝 Registro de Decisiones Técnicas
<!-- Actualizar durante la ejecución -->

| Fecha | Decisión | Razón |
|-------|----------|-------|
| | | |

## ⚠️ Cambios vs Plan Original
<!-- Documentar si algo cambia -->

| Cambio | Por qué | Impacto en siguientes fases |
|--------|---------|----------------------------|
| | | |
