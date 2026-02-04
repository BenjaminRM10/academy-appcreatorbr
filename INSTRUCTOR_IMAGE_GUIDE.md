# 📸 Guía para Actualizar la Foto del Instructor

## ✅ Cambios Implementados

Se agregaron dos mejoras clave para aumentar conversión:

1. **Botón flotante de WhatsApp** ✅
   - Posición: Bottom-right (fijo)
   - Número: +52 566 008 1070
   - Mensaje predefinido
   - Tooltip con hover
   - Responsive (mobile/desktop)

2. **Sección "Conoce a tu Instructor"** ✅
   - Posicionada antes de precios (genera confianza)
   - Link a perfil completo: appcreatorbr.com/es/profile
   - Highlights de experiencia
   - Diseño responsive

---

## 🖼️ Cómo Reemplazar la Foto del Instructor

### Opción 1: Usar tu foto real (Recomendado)

1. **Prepara tu imagen:**
   - Formato: JPG o PNG
   - Tamaño recomendado: 800x800px o mayor (cuadrada)
   - Fondo: Profesional o con buena iluminación
   - Peso: Menos de 500KB (usa tinypng.com si es necesario)

2. **Nombre el archivo:**
   ```
   instructor.jpg
   ```

3. **Coloca la imagen en:**
   ```
   /public/instructor.jpg
   ```

4. **Actualiza el componente:**
   Abre: `src/components/landing/InstructorSection.tsx`
   
   Cambia esta línea:
   ```tsx
   src="/instructor-placeholder.svg"
   ```
   
   Por:
   ```tsx
   src="/instructor.jpg"
   ```

### Opción 2: Mantener el placeholder (temporal)

El placeholder actual muestra "BR" (Benjamín Rodríguez) con degradado cyan-purple.

---

## 📱 Dónde Aparece el Botón de WhatsApp

- ✅ Landing page (página principal)
- ✅ Páginas de detalle de curso
- ❌ NO aparece en: Admin, Student Dashboard, Login/Registro (para no distraer)

Si quieres agregarlo en más páginas, importa:
```tsx
import { WhatsAppButton } from "@/components/WhatsAppButton";
```

Y agrégalo antes del cierre del componente:
```tsx
<WhatsAppButton />
```

---

## 🎨 Personalización del Botón de WhatsApp

Archivo: `src/components/WhatsAppButton.tsx`

**Cambiar mensaje predefinido:**
```tsx
const message = "Tu mensaje personalizado aquí";
```

**Cambiar posición:**
```tsx
className="fixed bottom-6 right-6 z-50 group"
//           ↑ abajo   ↑ derecha
```

**Cambiar color:**
```tsx
from-green-500 to-green-600
// Cambia a: from-cyan-500 to-purple-600 (para match con tema)
```

---

## 🚀 Próximos Pasos Sugeridos (Según tu análisis)

### Alta Prioridad:
- [ ] **Testimonios:** Agrega sección con opiniones de alumnos
- [ ] **Video Intro:** Corto video de 30-60s tuyo presentando el curso
- [ ] **Garantía visible:** "Garantía de 7 días - 100% reembolso"

### Media Prioridad:
- [ ] **FAQ Section:** Preguntas frecuentes
- [ ] **Comparación de valor:** "$800/mes = $33/clase (vs $200/clase privada)"
- [ ] **Prueba social:** "Únete a [X] estudiantes activos"

### Baja Prioridad:
- [ ] **Blog/Recursos:** Contenido gratuito para SEO
- [ ] **Reviews de Google/LinkedIn:** Embedar widgets

---

## 🔧 Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar (verifica errores)
npm run build

# Deploy a producción (si usas Vercel)
vercel --prod
```

---

## 📞 Soporte

Si tienes problemas técnicos, contacta al desarrollador o revisa:
- Docs de Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
