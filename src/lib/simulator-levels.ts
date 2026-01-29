export type Level = {
    id: number;
    title: string;
    description: string;
    task: string;
    hint: string;
    check: (history: string[], fileSystem: any) => boolean;
    xp: number;
};

// Helper to check if file exists
const hasFile = (fs: any, path: string) => {
    // Simplified check for current directory only or simple relative paths
    // For robust check we would need full path resolver, but for game levels we can keep it simpler
    const parts = path.split('/');
    // Check in root for now or improve traversal if needed
    // Assuming check happens in relevant cwd context usually
    return true; // Logic delegated to levels
};

export const LEVELS: Level[] = [
    // --- MODULE 1: NAVIGATION ---
    {
        id: 1,
        title: "Hola Mundo",
        description: "Bienvenido a la terminal. Tu ventana al alma de la computadora. Veamos qué hay aquí.",
        task: "Lista los archivos del directorio actual.",
        hint: "Escribe 'ls' y presiona Enter.",
        check: (h) => h[h.length - 1] === 'ls' || h[h.length - 1] === 'ls -l', // Check LAST command only
        xp: 10
    },
    {
        id: 2,
        title: "¿Dónde estoy?",
        description: "A veces te perderás en el sistema de archivos. Pregúntale a la terminal tu ubicación.",
        task: "Muestra el directorio de trabajo actual (Print Working Directory).",
        hint: "Usa el comando 'pwd'.",
        check: (h) => h[h.length - 1] === 'pwd',
        xp: 10
    },
    {
        id: 3,
        title: "Creando Espacio",
        description: "Organización ante todo. Vamos a crear una carpeta para tus proyectos.",
        task: "Crea un directorio llamado 'proyecto'.",
        hint: "Usa 'mkdir proyecto'.",
        check: (h, fs) => {
            const lastCmd = h[h.length - 1];
            return lastCmd.startsWith('mkdir') && fs.root.children['proyecto']?.type === 'dir';
        },
        xp: 20
    },
    {
        id: 4,
        title: "Entrando al Abismo",
        description: "La carpeta existe, pero sigues afuera. Entra en ella.",
        task: "Cambia tu directorio a 'proyecto'.",
        hint: "Usa 'cd proyecto'.",
        check: (h, fs) => {
            const lastCmd = h[h.length - 1];
            return lastCmd.startsWith('cd') && fs.cwd.endsWith('/proyecto');
        },
        xp: 20
    },
    {
        id: 5,
        title: "El Regreso",
        description: "Ya viste lo que había que ver. Vuelve al directorio anterior (arriba).",
        task: "Sube un nivel en el directorio.",
        hint: "Usa 'cd ..'",
        check: (h, fs) => {
            const lastCmd = h[h.length - 1];
            return lastCmd.includes('..') && fs.cwd === '/';
        },
        xp: 20
    },

    // --- MODULE 2: FILE MANIPULATION ---
    {
        id: 6,
        title: "El Creador",
        description: "Los directorios guardan archivos. Vamos a crear uno vacío.",
        task: "Crea un archivo llamado 'notas.txt'.",
        hint: "Usa 'touch notas.txt'.",
        check: (h, fs) => {
            const lastCmd = h[h.length - 1];
            return lastCmd.startsWith('touch') && !!fs.root.children['notas.txt'];
        },
        xp: 30
    },
    {
        id: 7,
        title: "Duplicación",
        description: "Esas notas son importantes. Haz una copia de seguridad.",
        task: "Copia 'notas.txt' a 'notas_backup.txt'.",
        hint: "Usa 'cp notas.txt notas_backup.txt'.",
        check: (h, fs) => {
            const lastCmd = h[h.length - 1];
            return lastCmd.startsWith('cp') && !!fs.root.children['notas_backup.txt'];
        },
        xp: 30
    },
    {
        id: 8,
        title: "Cambio de Nombre",
        description: "El nombre 'notas.txt' es muy aburrido. Vamos a renombrarlo.",
        task: "Renombra 'notas.txt' a 'ideas.txt'.",
        hint: "Usa 'mv notas.txt ideas.txt'. (Move sirve para mover y renombrar)",
        check: (h, fs) => {
            const lastCmd = h[h.length - 1];
            return lastCmd.startsWith('mv') && !!fs.root.children['ideas.txt'] && !fs.root.children['notas.txt'];
        },
        xp: 35
    },
    {
        id: 9,
        title: "Limpieza",
        description: "Ya no necesitamos el backup. Bórralo.",
        task: "Elimina el archivo 'notas_backup.txt'.",
        hint: "Usa 'rm notas_backup.txt'. ¡Cuidado, no hay papelera de reciclaje!",
        check: (h, fs) => {
            const lastCmd = h[h.length - 1];
            return lastCmd.startsWith('rm') && !fs.root.children['notas_backup.txt'];
        },
        xp: 35
    },
    {
        id: 10,
        title: "Limpieza Profunda",
        description: "La carpeta 'proyecto' que creamos antes ya no nos sirve.",
        task: "Elimina el directorio 'proyecto'.",
        hint: "Usa 'rmdir proyecto' (solo si está vacío) o 'rm -r proyecto'.",
        check: (h, fs) => {
            const lastCmd = h[h.length - 1];
            return (lastCmd.startsWith('rm') || lastCmd.startsWith('rmdir')) && !fs.root.children['proyecto'];
        },
        xp: 40
    },

    // --- MODULE 3: CONTENT & PIPES ---
    {
        id: 11,
        title: "El Eco",
        description: "Haz que la terminal repita lo que dices.",
        task: "Imprime 'Hola Mundo' en la pantalla.",
        hint: "Usa 'echo \"Hola Mundo\"'.",
        check: (h) => {
            const lastCmd = h[h.length - 1];
            return lastCmd.startsWith('echo') && lastCmd.includes('Hola');
        },
        xp: 20
    },
    {
        id: 12,
        title: "Escribiendo Archivos",
        description: "Touch crea archivos vacíos. Echo puede llenarlos.",
        task: "Crea 'saludo.txt' con el contenido 'Hola'.",
        hint: "Usa redirección: 'echo \"Hola\" > saludo.txt'.",
        check: (h, fs) => {
            const lastCmd = h[h.length - 1];
            return lastCmd.includes('>') && fs.root.children['saludo.txt']?.content?.includes('Hola');
        },
        xp: 45
    },
    {
        id: 13,
        title: "Lectura",
        description: "Ahora lee lo que acabas de escribir.",
        task: "Muestra el contenido de 'saludo.txt'.",
        hint: "Usa 'cat saludo.txt' (Concatenate).",
        check: (h) => {
            const lastCmd = h[h.length - 1];
            return lastCmd.startsWith('cat') && lastCmd.includes('saludo');
        },
        xp: 20
    },
    
    // --- MODULE 4: SYSTEM & ADVANCED ---
    {
        id: 14,
        title: "Identidad",
        description: "¿Quién eres en este sistema?",
        task: "Averigua tu nombre de usuario actual.",
        hint: "Usa el comando 'whoami'.",
        check: (h) => h[h.length - 1] === 'whoami',
        xp: 15
    },
    {
        id: 15,
        title: "Historia",
        description: "¿Qué comandos has usado hasta ahora?",
        task: "Muestra el historial de comandos.",
        hint: "Usa 'history'.",
        check: (h) => h[h.length - 1] === 'history',
        xp: 15
    },
    {
        id: 16,
        title: "Limpieza de Pantalla",
        description: "Demasiado texto. Limpia tu área de trabajo.",
        task: "Borra la pantalla de la terminal.",
        hint: "Usa 'clear'.",
        check: (h) => h[h.length - 1] === 'clear',
        xp: 10
    },
    {
        id: 17,
        title: "Archivos Ocultos",
        description: "En Linux, los archivos que empiezan con '.' son ocultos.",
        task: "Crea un archivo oculto llamado '.secreto'.",
        hint: "Usa 'touch .secreto'.",
        check: (h, fs) => {
            const lastCmd = h[h.length - 1];
            return lastCmd.startsWith('touch') && !!fs.root.children['.secreto'];
        },
        xp: 50
    },
    {
        id: 18,
        title: "Ver lo Invisible",
        description: "'ls' normal no muestra ocultos.",
        task: "Lista TODOS los archivos, incluidos los ocultos.",
        hint: "Usa 'ls -a' (All).",
        check: (h) => {
            const lastCmd = h[h.length - 1];
            return lastCmd === 'ls -a' || lastCmd === 'ls -la' || lastCmd === 'ls -al';
        },
        xp: 30
    },
    {
        id: 19,
        title: "Permisos (Simulado)",
        description: "Haz que un archivo sea ejecutable.",
        task: "Dale permisos de ejecución (+x) a 'script.sh' (crealo primero si no existe).",
        hint: "Primero 'touch script.sh', luego 'chmod +x script.sh'.",
        check: (h) => {
            const lastCmd = h[h.length - 1];
            return lastCmd.startsWith('chmod +x') && lastCmd.includes('script.sh');
        },
        xp: 60
    },
    {
        id: 20,
        title: "Graduación Básica",
        description: "Has completado los fundamentos. ¡Eres libre!",
        task: "Ejecuta cualquier comando para celebrar.",
        hint: "¡Felicidades!",
        check: (h) => h.length > 0, // Anything works
        xp: 100
    }
];
