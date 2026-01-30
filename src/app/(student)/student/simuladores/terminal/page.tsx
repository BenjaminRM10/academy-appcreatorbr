'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, CheckCircle, HelpCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { LEVELS, Level } from '@/lib/simulator-levels';
import type { Terminal } from 'xterm';
import type { FitAddon } from 'xterm-addon-fit';

// --- MOCK FILESYSTEM (In-Memory) ---
const INITIAL_FS_ROOT = {
    type: 'dir',
    children: {
        'documentos': { type: 'dir', children: { 'nota.txt': { type: 'file', content: 'Nota importante' } } },
        'fotos': { type: 'dir', children: {} }
    }
};

export default function TerminalSimulator() {
    const terminalRef = useRef<HTMLDivElement>(null);
    const xtermRef = useRef<Terminal | null>(null);
    
    // Game State
    const [levelIndex, setLevelIndex] = useState(0);
    const [xp, setXp] = useState(0);
    
    // Persistence
    useEffect(() => {
        const savedLevel = localStorage.getItem('terminal_level');
        const savedXp = localStorage.getItem('terminal_xp');
        if (savedLevel) setLevelIndex(parseInt(savedLevel));
        if (savedXp) setXp(parseInt(savedXp));
    }, []);

    useEffect(() => {
        localStorage.setItem('terminal_level', levelIndex.toString());
        localStorage.setItem('terminal_xp', xp.toString());
    }, [levelIndex, xp]);
    
    // Safety check for level
    const currentLevel = LEVELS[levelIndex] || LEVELS[LEVELS.length - 1];

    // Simulation State (Using Refs for synchronous access in event handlers)
    const fsRef = useRef({ root: JSON.parse(JSON.stringify(INITIAL_FS_ROOT)), cwd: '/' });
    const historyRef = useRef<string[]>([]);
    
    // Helper to get current directory object from path string
    const getDirFromPath = (path: string) => {
        if (path === '/') return fsRef.current.root;
        
        const parts = path.split('/').filter(Boolean);
        let current = fsRef.current.root;
        
        for (const part of parts) {
            if (current.children && current.children[part]) {
                current = current.children[part];
            } else {
                return null;
            }
        }
        return current;
    };

    useEffect(() => {
        if (!terminalRef.current) return;

        let term: Terminal | null = null;
        let fitAddon: FitAddon | null = null;

        // Dynamically import xterm only on client
        const initTerminal = async () => {
            const { Terminal } = await import('xterm');
            const { FitAddon } = await import('xterm-addon-fit');
            await import('xterm/css/xterm.css');

            // Initialize xterm
            term = new Terminal({
                cursorBlink: true,
                fontSize: 14,
                fontFamily: '"Fira Code", monospace',
                theme: {
                    background: '#09090b',
                    foreground: '#f4f4f5',
                    cursor: '#22d3ee'
                }
            });

            fitAddon = new FitAddon();
            term.loadAddon(fitAddon);
            term.open(terminalRef.current!);
            
            // Fix for dimensions error: wait for next tick
            setTimeout(() => {
                try {
                    fitAddon!.fit();
                } catch (e) { console.error(e); }
            }, 100);

            xtermRef.current = term;

            // Welcome Message
            term.writeln('\x1b[1;36m~ Runa Academy Terminal v2.0 ~\x1b[0m');
            term.writeln('Sistema listo. Escribe "help" para ver comandos.');
            term.writeln('');
            prompt(term);

            let currentLine = '';

            term.onData(e => {
            switch (e) {
                case '\r': // Enter
                    term.write('\r\n');
                    handleCommand(currentLine.trim(), term);
                    currentLine = '';
                    break;
                case '\u007F': // Backspace
                    if (currentLine.length > 0) {
                        term.write('\b \b');
                        currentLine = currentLine.substring(0, currentLine.length - 1);
                    }
                    break;
                case '\t': // Tab (Autocomplete)
                    // Simple autocomplete logic
                    const parts = currentLine.split(' ');
                    const lastWord = parts[parts.length - 1];
                    if (lastWord) {
                        const currentDirObj = getDirFromPath(fsRef.current.cwd);
                        if (currentDirObj) {
                            const matches = Object.keys(currentDirObj.children).filter(name => name.startsWith(lastWord));
                            if (matches.length === 1) {
                                const completion = matches[0].substring(lastWord.length);
                                term.write(completion);
                                currentLine += completion;
                            }
                        }
                    }
                    break;
                default: // Type character
                    if (e >= String.fromCharCode(0x20)) {
                        currentLine += e;
                        term.write(e);
                    }
            }
        });

            const handleResize = () => {
                try { fitAddon!.fit(); } catch(e) {}
            };
            window.addEventListener('resize', handleResize);

            return () => {
                term?.dispose();
                window.removeEventListener('resize', handleResize);
            };
        };

        initTerminal().then(cleanup => {
            // Store cleanup function for useEffect cleanup
            if (cleanup) {
                return cleanup;
            }
        });

        return () => {
            // Cleanup will be handled by the async init
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- COMMAND HANDLER ---
    const handleCommand = (cmd: string, term: Terminal) => {
        if (!cmd) {
            prompt(term);
            return;
        }

        // Simple parser that handles basic quotes
        // This is a naive parser for the prototype
        const args = cmd.match(/(?:[^\s"]+|"[^"]*")+/g)?.map(a => a.replace(/"/g, '')) || [];
        const command = args[0];
        const arg1 = args[1];
        const arg2 = args[2];

        // Update History
        historyRef.current = [...historyRef.current, cmd];

        // Access current FS state
        const fs = fsRef.current;
        const currentDirObj = getDirFromPath(fs.cwd);

        switch (command) {
            case 'help':
                term.writeln('Comandos: ls, cd, mkdir, touch, cp, mv, rm, echo, cat, pwd, clear, whoami, history');
                break;
            case 'clear':
                term.clear();
                break;
            case 'ls':
                if (currentDirObj && currentDirObj.children) {
                    const showHidden = arg1 === '-a' || arg1 === '-la';
                    const items = Object.keys(currentDirObj.children).filter(name => showHidden || !name.startsWith('.')).map(name => {
                        const isDir = currentDirObj.children[name].type === 'dir';
                        return isDir ? `\x1b[1;34m${name}\x1b[0m` : name;
                    });
                    term.writeln(items.join('  '));
                }
                break;
            case 'pwd':
                term.writeln(fs.cwd);
                break;
            case 'mkdir':
                if (arg1) {
                    if (currentDirObj) {
                        currentDirObj.children[arg1] = { type: 'dir', children: {} };
                        term.writeln(''); // Success
                    }
                } else {
                    term.writeln('Uso: mkdir <nombre>');
                }
                break;
            case 'rmdir':
                if (arg1 && currentDirObj?.children[arg1]?.type === 'dir') {
                    delete currentDirObj.children[arg1];
                    term.writeln('');
                } else {
                    term.writeln('Directorio no encontrado o no es directorio');
                }
                break;
            case 'touch':
                if (arg1) {
                    if (currentDirObj) {
                        currentDirObj.children[arg1] = { type: 'file', content: '' };
                        term.writeln('');
                    }
                } else {
                    term.writeln('Uso: touch <archivo>');
                }
                break;
            case 'rm':
                // Supports rm file and rm -r dir (simplified)
                const target = arg1 === '-r' ? arg2 : arg1;
                if (target && currentDirObj?.children[target]) {
                    delete currentDirObj.children[target];
                    term.writeln('');
                } else {
                    term.writeln(`rm: no se puede borrar '${target}': No existe`);
                }
                break;
            case 'cp':
                if (arg1 && arg2 && currentDirObj?.children[arg1]) {
                    // Deep copy for simulation
                    const source = currentDirObj.children[arg1];
                    currentDirObj.children[arg2] = JSON.parse(JSON.stringify(source));
                    term.writeln('');
                } else {
                    term.writeln('Uso: cp <origen> <destino>');
                }
                break;
            case 'mv':
                if (arg1 && arg2 && currentDirObj?.children[arg1]) {
                    const source = currentDirObj.children[arg1];
                    currentDirObj.children[arg2] = source;
                    delete currentDirObj.children[arg1];
                    term.writeln('');
                } else {
                    term.writeln('Uso: mv <origen> <destino>');
                }
                break;
            case 'echo':
                // Naive echo implementation: echo "text" > file
                if (arg2 && (arg2 === '>' || arg2 === '>>')) {
                    // Redirect to file
                    const content = arg1;
                    const fileName = args[3];
                    if (fileName && currentDirObj) {
                        currentDirObj.children[fileName] = { type: 'file', content: content };
                        term.writeln('');
                    }
                } else {
                    // Just print
                    term.writeln(arg1 || '');
                }
                break;
            case 'cat':
                if (arg1 && currentDirObj?.children[arg1]?.type === 'file') {
                    term.writeln(currentDirObj.children[arg1].content || '');
                } else {
                    term.writeln(`cat: ${arg1}: No existe el archivo`);
                }
                break;
            case 'whoami':
                term.writeln('student');
                break;
            case 'history':
                historyRef.current.forEach((cmd, i) => term.writeln(`${i + 1}  ${cmd}`));
                break;
            case 'cd':
                if (!arg1) {
                    fs.cwd = '/';
                } else if (arg1 === '..') {
                    if (fs.cwd !== '/') {
                        const parts = fs.cwd.split('/').filter(Boolean);
                        parts.pop();
                        fs.cwd = '/' + parts.join('/');
                    }
                } else {
                    if (currentDirObj && currentDirObj.children[arg1] && currentDirObj.children[arg1].type === 'dir') {
                        fs.cwd = fs.cwd === '/' ? `/${arg1}` : `${fs.cwd}/${arg1}`;
                    } else {
                        term.writeln(`cd: ${arg1}: No existe el directorio`);
                    }
                }
                break;
            default:
                term.writeln(`Comando no encontrado: ${command}`);
        }

        // Check Level Progress Immediately
        checkLevelProgress();
        prompt(term);
    };

    const prompt = (term: Terminal) => {
        const cwd = fsRef.current.cwd === '/' ? '~' : fsRef.current.cwd;
        term.write(`\r\n\x1b[1;32mstudent@academy\x1b[0m:\x1b[1;34m${cwd}\x1b[0m$ `);
    };

    const checkLevelProgress = () => {
        // We use the Ref current state which is always up to date
        // Safety check if level exists
        const currentLvl = LEVELS[levelIndex] || LEVELS[LEVELS.length - 1];
        
        if (currentLvl.check(historyRef.current, fsRef.current)) {
            toast({
                title: "¡Nivel Completado!",
                description: `Has ganado ${currentLvl.xp} XP.`
            });
            setXp(prev => prev + currentLvl.xp);
            
            if (levelIndex < LEVELS.length - 1) {
                // Immediate transition
                setLevelIndex(prev => prev + 1);
            } else {
                toast({ title: "¡Maestro de la Terminal!", description: "Has completado el entrenamiento básico." });
            }
        }
    };

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col lg:flex-row gap-6 animate-in fade-in">
            {/* Left: Terminal Area */}
            <div className="flex-1 flex flex-col bg-zinc-950 rounded-xl border border-white/10 overflow-hidden shadow-2xl relative">
                <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2 font-mono">bash — local</span>
                </div>
                {/* We need a specific height here or flex-1 logic must be robust */}
                <div className="flex-1 p-4 bg-[#09090b]" ref={terminalRef}></div>
            </div>

            {/* Right: Mission Control */}
            <div className="w-full lg:w-[350px] space-y-6">
                <Card className="p-6 border-purple-500/20 bg-gradient-to-b from-purple-500/5 to-transparent">
                    <div className="flex justify-between items-center mb-6">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                            Nivel {currentLevel.id}
                        </Badge>
                        <div className="flex items-center gap-2 text-yellow-500 font-bold">
                            <Trophy className="h-4 w-4" />
                            <span>{xp} XP</span>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">{currentLevel.title}</h2>
                    <p className="text-muted-foreground mb-6">
                        {currentLevel.description}
                    </p>

                    <div className="bg-muted/50 rounded-lg p-4 mb-6 border border-white/5">
                        <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Misión Actual
                        </h3>
                        <p className="text-sm text-cyan-200 font-medium">
                            {currentLevel.task}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <HelpCircle className="h-3 w-3" />
                            <span>Pista:</span>
                        </div>
                        <code className="block bg-black px-3 py-2 rounded border border-white/10 text-xs font-mono text-gray-400">
                            {currentLevel.hint}
                        </code>
                    </div>
                </Card>

                <Card className="p-4 bg-muted/20">
                    <h3 className="font-semibold text-sm mb-2">Progreso</h3>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500"
                            style={{ width: `${((levelIndex) / LEVELS.length) * 100}%` }}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
}
