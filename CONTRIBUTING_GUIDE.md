# Guía de Contribución y Estandarización - AcademyBR

Este documento define cómo agregar nuevo contenido (cursos, simuladores) y mantener la base de datos de manera estandarizada.

---

## 1. Agregar Nuevos Cursos

La información de los cursos vive en dos lugares que deben estar sincronizados:

### A. Base de Datos (Supabase)
Tabla: `courses`
- **id:** UUID (Generado autom.)
- **title:** Nombre oficial (ej. "Ingeniería de Datos")
- **number:** Número de secuencia (1-8). Vital para el ordenamiento.
- **description:** Breve descripción para tarjetas.
- **status:** `active` (visible/comprable) o `coming_soon` (bloqueado).

### B. Temario Detallado (Código)
Archivo: `src/lib/syllabus-data.ts`
Aquí vive la estructura de semanas y temas.
1. Abre `src/lib/syllabus-data.ts`.
2. Busca el objeto `SYLLABUS_DATA`.
3. Agrega la entrada correspondiente al número del curso:
   ```typescript
   3: {
     id: "course-3",
     number: 3,
     title: "Ingeniería de Datos",
     weeks: [ ... ]
   }
   ```

---

## 2. Agregar Nuevos Simuladores

Los simuladores son "mini-apps" dentro de `/student/simuladores`.

### Pasos:
1. **Crear la Página:**
   Crea una carpeta en `src/app/(student)/student/simuladores/[nombre-simulador]/page.tsx`.
   
2. **Registrar en el Catálogo:**
   Edita `src/app/(student)/student/simuladores/page.tsx`.
   Agrega el objeto en la constante `SIMULATORS`:
   ```typescript
   {
     id: 'mi-nuevo-simulador',
     title: 'Nombre',
     href: '/student/simuladores/mi-nuevo-simulador',
     locked: false // Cambiar a false cuando esté listo
   }
   ```

3. **Estándar de Diseño:**
   - Usar `xterm.js` si es terminal.
   - Usar `React Flow` si es diagrama.
   - Siempre incluir panel de "Misiones" a la derecha.

---

## 3. Base de Datos y Migraciones

NUNCA modificar la estructura de la BD manualmente en producción.

1. Crear archivo SQL en `supabase/migrations/YYYYMMDD_nombre_cambio.sql`.
2. Escribir el SQL (CREATE TABLE, ALTER TABLE).
3. Aplicar con `supabase db push` (local) o vía Dashboard SQL Editor (prod).

---

*Este archivo debe ser consultado antes de cualquier expansión del plan de estudios.*
