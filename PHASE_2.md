# Fase 2: Branding & Landing Page

## Contexto
La infraestructura base (Next.js + Supabase) está lista. Ahora necesitamos darle identidad visual al proyecto y crear la página principal para que los usuarios puedan ver la oferta educativa.

## Objetivo de esta fase
Crear la identidad visual (Logo, imágenes de cursos) y desarrollar una Landing Page de alto impacto (Dark Mode, estilo "Academy 4.0") que presente los cursos y permita la navegación.

## Entregables
- [ ] Logo "Academy AppCreatorBR" (SVG/PNG) en `public/logo.png`
- [ ] 8 Imágenes ilustrativas para los cursos en `public/courses/`
- [ ] Landing page (`src/app/(public)/page.tsx`) completa con:
    - Hero section con propuesta de valor
    - Grid de los 8 cursos (conectado a Supabase o data estática inicial)
    - Sección de "Por qué nosotros"
    - Call to Action (CTA) claro
- [ ] Componentes de UI implementados (`Navbar`, `Footer`, `CourseCard`)
- [ ] Branding aplicado (colores, tipografía Inter/Outfit) en `globals.css`

## Instrucciones detalladas

### 1. Generación de Assets (OpenCode/DALL-E)
- **Logo:** Generar un logo moderno, minimalista, estilo tech/futurista. Colores: Cyan/Azul eléctrico y Púrpura sobre fondo oscuro.
- **Imágenes de Cursos:** Generar 8 imágenes abstractas/tech 3D que representen:
    1. Ingeniería IA
    2. IA Local
    3. Data & APIs
    4. Automatización
    5. IoT
    6. Industrial 4.0
    7. Web Full Stack
    8. Arquitectura Soft
- Guardar en `public/courses/course-[1-8].jpg`.

### 2. Diseño de UI (Tailwind + Shadcn)
- Asegurar que `src/app/globals.css` tenga los colores definidos en `PROJECT_DEFINITION.md`.
- Tipografía: Configurar `Outfit` (titulos) e `Inter` (cuerpo) en `layout.tsx`.

### 3. Componentes
Crear en `src/components/landing/`:
- `Hero.tsx`: Título grande, subtítulo, botones "Ver Cursos" y "Acceso Estudiantes".
- `CourseGrid.tsx`: Mapear los cursos. Usar `Card` de shadcn.
- `FeatureSection.tsx`: Iconos y texto sobre la metodología.
- `Navbar.tsx`: Logo, links, botón de Login (lleva a `/login`).
- `Footer.tsx`: Copyright, links sociales.

### 4. Página Principal (`page.tsx`)
- Ensamblar los componentes.
- Usar `Suspense` si se cargan datos de Supabase, o data estática por ahora si la BD está vacía (aunque ya insertamos el Curso 1, mejor leer de BD).

## Herramientas/MCPs a utilizar
- `google-image-gen`: Para generar logo e imágenes.
- `agent-aider`: Para escribir el código React/Tailwind.

## Archivos a crear/modificar
- `src/app/(public)/page.tsx`
- `src/components/landing/*`
- `public/*`
- `src/app/globals.css`

## Criterios de aceptación
- [ ] Landing page carga rápido y es responsive.
- [ ] Estética "Dark Mode Premium" lograda.
- [ ] Se muestran los 8 cursos (o al menos los placeholders si no están todos en BD).
- [ ] Navbar navega correctamente.

## Siguiente fase
Fase 3: Autenticación & Registro - Login con Google, formulario de perfil y protección de rutas.
