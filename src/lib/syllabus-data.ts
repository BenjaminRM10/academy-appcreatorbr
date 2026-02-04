export type SyllabusWeek = {
  title: string;
  topics: string[];
};

export type CourseSyllabus = {
  id: string; // We'll map this to the course ID from DB or use the course number
  number: number;
  title: string;
  description: string;
  targetAudience: string;
  goal: string;
  weeks: SyllabusWeek[];
};

export const SYLLABUS_DATA: Record<number, CourseSyllabus> = {
  1: {
    id: "course-1",
    number: 1,
    title: "Ingeniería Asistida por IA (Fundamentos)",
    description: "Aprende a usar las herramientas más modernas de IA para crear lo que quieras. Domina Google Antigravity, Claude Code, MCP Servers y crea tu propia aplicación de terminal powered by AI que puede programar Arduino con lenguaje natural.",
    targetAudience: "Cualquier persona que quiera dominar las herramientas de IA más avanzadas para aumentar su productividad y crear proyectos reales. No se requiere experiencia previa en programación.",
    goal: "Convertirte en un creador tecnológico capaz de usar IA para automatizar tareas, crear aplicaciones y aprovechar las herramientas más modernas del mercado.",
    weeks: [
      {
        title: "Semana 1: El Despertar (Setup & Herramientas Base)",
        topics: [
          "NotebookLM: Cómo estudiar y aprender con IA de forma efectiva.",
          "Fundamentos & Diagnóstico: Entender tu PC (CPU/RAM/Disco) con ayuda de IA.",
          "Terminal: Comandos básicos en Linux, Windows y Mac.",
          "Prompting Engineering: Hablarle a la IA como un profesional."
        ]
      },
      {
        title: "Semana 2: Herramientas Modernas de Desarrollo",
        topics: [
          "Google Antigravity & Claude Code: Tu asistente de programación AI-powered.",
          "Git & GitHub: Guardar y versionar tu trabajo en la nube.",
          "Excel con IA: Automatizar análisis y aumentar tu eficiencia con MCP Servers.",
          "Inglés Técnico: Aprender a leer errores y documentación."
        ]
      },
      {
        title: "Semana 3: Programación y APIs",
        topics: [
          "Python Scripting: Lógica básica y automatización de tareas.",
          "APIs de IA (Gemini): Conectar tu código con inteligencia artificial.",
          "MCP Servers: Integrar herramientas y servicios con IA.",
          "Proyecto Inicial: Configurar tu aplicación de terminal."
        ]
      },
      {
        title: "Semana 4: Proyecto Final",
        topics: [
          "Desarrollo del Proyecto: App de Terminal powered by AI.",
          "Caso de uso: Programar Arduino con lenguaje natural.",
          "Sesión de Prompting Avanzado: Optimiza tus resultados.",
          "Presentación Final: Tu Asistente Supremo funcionando."
        ]
      }
    ]
  },
  2: {
    id: "course-2",
    number: 2,
    title: "Despliegue de IA Local (Soberanía Digital)",
    description: "Corre IAs poderosas en tu propia laptop sin internet.",
    targetAudience: "Para quien quiere privacidad total y correr IAs poderosas en su propia laptop.",
    goal: "Montar servidores y LLMs que vivan dentro de tu mochila.",
    weeks: [
      {
        title: "Semana 1: Contenedores (La Base)",
        topics: [
          "Docker Quickstart: Concepto de Contenedores.",
          "Docker Compose: Levantar sistemas complejos.",
          "Persistencia: Guardar datos."
        ]
      },
      {
        title: "Semana 2: LLMs en Casa",
        topics: [
          "Ollama & Modelos: Llama3, Mistral offline.",
          "Modelfiles: Crear personalidad de IA.",
          "Open WebUI: Interfaz tipo ChatGPT privada."
        ]
      },
      {
        title: "Semana 3: Inteligencia Avanzada",
        topics: [
          "RAG (Chat con tus PDFs).",
          "Clawdbot (Agente Local).",
          "Empaquetado: Imagen Docker de tu App."
        ]
      },
      {
        title: "Semana 4: Cierre",
        topics: [
          "Linux Admin Flash.",
          "Redes Privadas.",
          "Proyecto Final: \"Servidor de Inteligencia Empresarial\"."
        ]
      }
    ]
  },
  // ... We can add the rest later, mapping 1-8.
  6: {
    id: "course-6",
    number: 6,
    title: "Automatización Industrial 4.0",
    description: "Hackear (éticamente) la fábrica.",
    targetAudience: "Ingenieros de planta, mantenimiento o integradores.",
    goal: "Conectar PLCs viejos a Dashboards modernos.",
    weeks: [
      {
        title: "Semana 1: El Lenguaje de la Fábrica",
        topics: ["Redes OT vs IT.", "Modbus TCP.", "Python Industrial."]
      },
      {
        title: "Semana 2: Visualización de Planta",
        topics: ["Node-RED Industrial.", "InfluxDB.", "Grafana."]
      },
      {
        title: "Semana 3: IA Preventiva",
        topics: ["Detección de Anomalías.", "OPC UA.", "Ciberseguridad."]
      },
      {
        title: "Semana 4: Cierre",
        topics: ["Manuales Técnicos.", "Integración Total.", "Proyecto Final: \"Supervisor 4.0\"."]
      }
    ]
  },
  7: {
    id: "course-7",
    number: 7,
    title: "Desarrollo Web Full Stack con IA",
    description: "Lanza tus propias Apps o SaaS.",
    targetAudience: "Creativos que quieren lanzar sus propias Apps o SaaS.",
    goal: "Crear aplicaciones web profesionales completas en tiempo récord.",
    weeks: [
      {
        title: "Semana 1: Diseño Generativo",
        topics: ["v0.dev UI.", "Next.js & React.", "Tailwind CSS."]
      },
      {
        title: "Semana 2: Funcionalidad",
        topics: ["Conexión Frontend-Backend.", "UI Components.", "Auth."]
      },
      {
        title: "Semana 3: Experiencia de Usuario",
        topics: ["Estado & Contexto.", "3D Web (Three.js).", "Formularios."]
      },
      {
        title: "Semana 4: Lanzamiento",
        topics: ["PWA.", "SEO & Performance.", "Proyecto Final: \"Tu SaaS Propio\"."]
      }
    ]
  },
  8: {
    id: "course-8",
    number: 8,
    title: "Arquitectura de Software y Negocios",
    description: "Para quien quiere ser CTO o Consultor.",
    targetAudience: "Para quien quiere ser CTO, Consultor o vender proyectos grandes.",
    goal: "Visión estratégica. Diseñar sistemas escalables y cerrar ventas.",
    weeks: [
      {
        title: "Semana 1: Arquitectura",
        topics: ["Diseño de Sistemas.", "Vectores a Escala.", "Fine-Tuning."]
      },
      {
        title: "Semana 2: DevOps y Orquestación",
        topics: ["Sistemas Multi-Agente.", "CI/CD.", "VPS y Linux Real."]
      },
      {
        title: "Semana 3: Negocio Tech",
        topics: ["Dominios y Seguridad.", "Cotizaciones y Contratos.", "Ética y Responsabilidad."]
      },
      {
        title: "Semana 4: La Graduación",
        topics: ["Pitching (Shark Tank).", "Pulido Final.", "Proyecto \"Masterpiece\"."]
      }
    ]
  }
};

export function getSyllabusByCourseId(courseId: string, courseNumber?: number): CourseSyllabus | null {
  // If we have the number (1-8), it's easy
  if (courseNumber && SYLLABUS_DATA[courseNumber]) {
    return SYLLABUS_DATA[courseNumber];
  }

  // Otherwise try to find by ID or similar matching (fallback logic)
  // For now, let's assume courseId might be UUID but we might pass number in a query param or just find matching title?
  // Since we are mocking, let's just return Course 1 if nothing matches strictly, or improve mapping.

  const found = Object.values(SYLLABUS_DATA).find(c => c.id === courseId);
  if (found) return found;

  // Fallback: If the UUID doesn't match our hardcoded IDs, we rely on the caller to pass the course number.
  // Or we just return Course 1 for demo purposes if it looks like a UUID we don't know.
  return SYLLABUS_DATA[1];
}
