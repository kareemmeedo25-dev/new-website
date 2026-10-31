import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import {
  Terminal as TerminalIcon,
  RotateCcw,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  CornerDownLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useI18n } from '@/context/I18nContext';
import { projects } from '@/lib/projects';
import { skills } from '@/lib/skills';
import {
  WHATSAPP_URL,
  EMAIL_ADDRESS,
  PHONE_DISPLAY,
  LOCATION_DISPLAY,
} from '@/lib/contact';

interface OutputLine {
  id: string;
  type: 'command' | 'system' | 'output' | 'error' | 'banner' | 'success';
  content: string | React.ReactNode;
  timestamp?: string;
}

const ASCII_BANNER = `
  ██╗  ██╗ █████╗ ██████╗ ███████╗███████╗███╗   ███╗     █████╗ ██╗  ██╗███╗   ███╗███████╗██████╗ 
  ██║ ██╔╝██╔══██╗██╔══██╗██╔════╝██╔════╝████╗ ████║    ██╔══██╗██║  ██║████╗ ████║██╔════╝██╔══██╗
  █████═╝ ███████║██████╔╝█████╗  █████╗  ██╔████╔██║    ███████║███████║██╔████╔██║█████╗  ██║  ██║
  ██╔═██╗ ██╔══██║██╔══██╗██╔══╝  ██╔══╝  ██║╚██╔╝██║    ██╔══██║██╔══██║██║╚██╔╝██║██╔══╝  ██║  ██║
  ██║ ╚██╗██║  ██║██║  ██║███████╗███████╗██║ ╚═╝ ██║    ██║  ██║██║  ██║██║ ╚═╝ ██║███████╗██████╔╝
  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═════╝ 
`;

const AVAILABLE_COMMANDS = [
  'help',
  'about',
  'whoami',
  'skills',
  'projects',
  'contact',
  'date',
  'clear',
  'echo',
  'banner',
  'sudo hire-me',
  'history',
] as const;

// Levenshtein distance for smart suggestions
function getSuggestion(input: string): string | null {
  const clean = input.trim().toLowerCase();
  if (!clean) return null;

  // Direct alias checks
  if (clean === 'hire' || clean === 'hire-me' || clean === 'sudo') return 'sudo hire-me';
  if (clean === 'project' || clean === 'work') return 'projects';
  if (clean === 'skill' || clean === 'stack' || clean === 'tech') return 'skills';
  if (clean === 'me' || clean === 'bio' || clean === 'info') return 'about';
  if (clean === 'email' || clean === 'phone' || clean === 'whatsapp') return 'contact';
  if (clean === 'cls') return 'clear';
  if (clean === 'time') return 'date';

  // Distance calculation
  let closest = '';
  let minDistance = Infinity;

  for (const cmd of AVAILABLE_COMMANDS) {
    const dist = levenshtein(clean, cmd);
    if (dist < minDistance && dist <= 3) {
      minDistance = dist;
      closest = cmd;
    }
  }

  return closest || null;
}

function levenshtein(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1),
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export default function TerminalSection() {
  const { t } = useI18n();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initial welcome message lines
  const getWelcomeLines = useCallback(
    (): OutputLine[] => [
      {
        id: 'init-banner',
        type: 'banner',
        content: ASCII_BANNER,
      },
      {
        id: 'init-1',
        type: 'system',
        content: (
          <div className="space-y-1 text-xs sm:text-sm text-zinc-400">
            <p>
              <span className="font-semibold text-emerald-400">KareemOS v2.4.0 (x86_64-portfolio-prod)</span>
            </p>
            <p>
              Developer Kareem Ahmed • Full-Stack Web Developer & UI Designer • Cairo, EG
            </p>
            <p className="text-zinc-500">
              Session initialized: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </p>
            <p className="pt-2 text-red-400">
              Type <span className="font-bold text-white underline underline-offset-2">help</span> to view available commands, or click any quick command chip below.
            </p>
          </div>
        ),
      },
    ],
    [],
  );

  const [lines, setLines] = useState<OutputLine[]>(getWelcomeLines);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  const handleReset = () => {
    setLines(getWelcomeLines());
    setHistory([]);
    setHistoryIdx(-1);
    setInputVal('');
    inputRef.current?.focus();
  };

  const handleCopyHistory = () => {
    const text = lines
      .map((l) => (typeof l.content === 'string' ? l.content : ''))
      .filter(Boolean)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Safe command interpreter (no eval, strictly predefined logic)
  const executeCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    // Add to history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    // Command line entry
    const cmdLine: OutputLine = {
      id: `cmd-${Date.now()}`,
      type: 'command',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString(),
    };

    const args = trimmed.split(/\s+/);
    const mainCommand = args[0].toLowerCase();
    const fullNormalized = trimmed.toLowerCase();

    let outputResult: OutputLine | null = null;

    if (mainCommand === 'clear') {
      setLines([]);
      setInputVal('');
      return;
    }

    if (fullNormalized === 'sudo hire-me' || fullNormalized === 'sudo hire') {
      outputResult = {
        id: `out-${Date.now()}`,
        type: 'success',
        content: (
          <div className="space-y-3 rounded-xl border border-red-500/40 bg-red-950/20 p-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="h-4 w-4" />
              <span>[sudo] Authentication successful. Root access granted!</span>
            </div>
            <div className="border-t border-red-500/20 pt-2 space-y-1.5 text-zinc-300">
              <p>
                <span className="text-red-400 font-semibold">Candidate:</span> Kareem Ahmed
              </p>
              <p>
                <span className="text-red-400 font-semibold">Status:</span> Open for Web Development & UI Contracts
              </p>
              <p>
                <span className="text-red-400 font-semibold">Specialization:</span> High-performance React SPAs, Tailwind styling, clean code & responsive UI
              </p>
              <p>
                <span className="text-red-400 font-semibold">Location:</span> Cairo, Egypt (Available globally / remote)
              </p>
            </div>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/50 bg-red-600 px-3.5 py-1.5 font-semibold text-white shadow-md hover:bg-red-500 transition-colors"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href={`mailto:${EMAIL_ADDRESS}?subject=Opportunity%20Discussion`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3.5 py-1.5 font-medium text-white hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        ),
      };
    } else if (mainCommand === 'help') {
      outputResult = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-red-400 font-semibold">Available Shell Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pt-1 text-zinc-300">
              <div>
                <span className="font-bold text-white">about</span> - Developer introduction & philosophy
              </div>
              <div>
                <span className="font-bold text-white">whoami</span> - Display session & identity info
              </div>
              <div>
                <span className="font-bold text-white">skills</span> - Grouped technical skills & tooling
              </div>
              <div>
                <span className="font-bold text-white">projects</span> - Available portfolio projects
              </div>
              <div>
                <span className="font-bold text-white">contact</span> - Phone, email & WhatsApp channels
              </div>
              <div>
                <span className="font-bold text-white">date</span> - Print current date and time
              </div>
              <div>
                <span className="font-bold text-white">banner</span> - Show custom ASCII art banner
              </div>
              <div>
                <span className="font-bold text-white">echo [text]</span> - Print input arguments to stdout
              </div>
              <div>
                <span className="font-bold text-white">sudo hire-me</span> - Creative recruiter unlock
              </div>
              <div>
                <span className="font-bold text-white">history</span> - View entered command history
              </div>
              <div>
                <span className="font-bold text-white">clear</span> - Clear terminal output
              </div>
            </div>
            <p className="text-zinc-500 pt-2 text-[11px]">
              Tip: Press Up/Down arrows to cycle through command history, or press Tab to autocomplete.
            </p>
          </div>
        ),
      };
    } else if (mainCommand === 'about') {
      outputResult = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
            <p className="text-red-400 font-semibold text-sm">About Developer Kareem Ahmed</p>
            <p className="leading-relaxed">
              I am a passionate Full-Stack & Web Developer dedicated to crafting high-performance, modern web applications with clean architecture and meticulous attention to detail.
            </p>
            <p className="leading-relaxed text-zinc-400">
              My engineering philosophy revolves around writing accessible, resilient, and beautifully designed interfaces that turn complex challenges into seamless digital realities.
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-zinc-400">
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-zinc-200">React & TypeScript</span>
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-zinc-200">Modern Architecture</span>
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-zinc-200">Responsive UI</span>
              <span className="rounded bg-zinc-800 px-2 py-0.5 text-zinc-200">Cairo, Egypt</span>
            </div>
          </div>
        ),
      };
    } else if (mainCommand === 'whoami') {
      outputResult = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
            <p>
              <span className="text-zinc-500">Current User:</span>{' '}
              <span className="font-bold text-emerald-400">guest@visitor</span>
            </p>
            <p>
              <span className="text-zinc-500">Host Portfolio:</span>{' '}
              <span className="font-bold text-white">Developer Kareem Ahmed</span>
            </p>
            <p>
              <span className="text-zinc-500">System Role:</span>{' '}
              <span className="text-red-400">Full-Stack Web Developer & UI Designer</span>
            </p>
            <p>
              <span className="text-zinc-500">Permissions:</span>{' '}
              <span className="text-zinc-400">Read-Only Guest (Elevate with &apos;sudo hire-me&apos;)</span>
            </p>
          </div>
        ),
      };
    } else if (mainCommand === 'skills') {
      const frontendSkills = skills.filter((s) => s.category === 'frontend').map((s) => s.name);
      const languageSkills = skills.filter((s) => s.category === 'languages').map((s) => s.name);
      const backendSkills = skills.filter((s) => s.category === 'backend').map((s) => s.name);
      const toolSkills = skills.filter((s) => s.category === 'tools').map((s) => s.name);

      outputResult = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
            <p className="text-red-400 font-semibold">Verified Technical Stack:</p>
            <div className="space-y-2 pl-1">
              <div>
                <span className="font-bold text-white">[Frontend]</span>{' '}
                <span className="text-zinc-300">{frontendSkills.join(', ') || 'React, Tailwind CSS, HTML5, CSS3'}</span>
              </div>
              <div>
                <span className="font-bold text-white">[Languages]</span>{' '}
                <span className="text-zinc-300">{languageSkills.join(', ') || 'TypeScript, JavaScript (ES6+)'}</span>
              </div>
              <div>
                <span className="font-bold text-white">[Backend & Data]</span>{' '}
                <span className="text-zinc-300">
                  {backendSkills.join(', ') || 'Node.js, Express, Supabase (PostgreSQL)'}
                </span>
              </div>
              <div>
                <span className="font-bold text-white">[Tools & Build]</span>{' '}
                <span className="text-zinc-300">{toolSkills.join(', ') || 'Git, GitHub, Vite, REST APIs'}</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-500 pt-1">
              All listed technologies are verified and implemented inside this production codebase.
            </p>
          </div>
        ),
      };
    } else if (mainCommand === 'projects') {
      outputResult = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-3 text-xs sm:text-sm text-zinc-300">
            <p className="text-red-400 font-semibold">Featured Portfolio Showcase:</p>
            <div className="space-y-3">
              {projects.map((p, idx) => (
                <div key={p.id} className="border-l-2 border-red-500/40 pl-3 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">
                      0{idx + 1}. {p.title}
                    </span>
                    {p.isPractice && (
                      <span className="text-[10px] uppercase font-semibold text-red-400 bg-red-950/40 border border-red-500/30 px-1.5 py-0.2 rounded">
                        Demo
                      </span>
                    )}
                  </div>
                  <p className="text-zinc-400 text-[11px] sm:text-xs">{p.tagline}</p>
                  <p className="text-zinc-500 text-[11px]">Stack: {p.tags.join(' • ')}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 pt-1">
              Tip: You can scroll up to the visual Projects section to explore interactive modal previews and details.
            </p>
          </div>
        ),
      };
    } else if (mainCommand === 'contact') {
      outputResult = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 text-xs sm:text-sm text-zinc-300">
            <p className="text-red-400 font-semibold">Direct Communication Channels:</p>
            <div className="space-y-1.5 pl-1">
              <p>
                <span className="text-zinc-500">Email:</span>{' '}
                <a
                  href={`mailto:${EMAIL_ADDRESS}`}
                  className="text-white underline underline-offset-2 hover:text-red-400 transition-colors"
                >
                  {EMAIL_ADDRESS}
                </a>
              </p>
              <p>
                <span className="text-zinc-500">Phone:</span>{' '}
                <span className="text-white font-mono">{PHONE_DISPLAY}</span>
              </p>
              <p>
                <span className="text-zinc-500">Location:</span>{' '}
                <span className="text-white">{LOCATION_DISPLAY} (GMT+2)</span>
              </p>
              <p>
                <span className="text-zinc-500">WhatsApp:</span>{' '}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-400 font-medium underline underline-offset-2 hover:text-emerald-300"
                >
                  <span>Open WhatsApp Direct Chat</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </p>
            </div>
          </div>
        ),
      };
    } else if (mainCommand === 'date') {
      outputResult = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <p className="text-xs sm:text-sm text-zinc-300 font-mono">
            {new Date().toString()}
          </p>
        ),
      };
    } else if (mainCommand === 'echo') {
      const echoText = args.slice(1).join(' ');
      outputResult = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <p className="text-xs sm:text-sm text-zinc-200 font-mono break-words">
            {echoText || '(empty)'}
          </p>
        ),
      };
    } else if (mainCommand === 'banner') {
      outputResult = {
        id: `out-${Date.now()}`,
        type: 'banner',
        content: ASCII_BANNER,
      };
    } else if (mainCommand === 'history') {
      outputResult = {
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1 text-xs sm:text-sm text-zinc-300">
            <p className="text-red-400 font-semibold">Command History ({history.length}):</p>
            {history.length === 0 ? (
              <p className="text-zinc-500 text-xs">No previous commands executed.</p>
            ) : (
              <ol className="list-decimal list-inside space-y-0.5 text-zinc-400 font-mono text-[11px] sm:text-xs">
                {history.map((cmd, i) => (
                  <li key={`${cmd}-${i}`}>
                    <span className="text-zinc-200">{cmd}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        ),
      };
    } else {
      // Unknown command handling with suggestions
      const suggestion = getSuggestion(trimmed);
      outputResult = {
        id: `out-${Date.now()}`,
        type: 'error',
        content: (
          <div className="space-y-1 text-xs sm:text-sm text-red-400">
            <p>
              Command not found: <span className="font-bold text-white">&apos;{trimmed}&apos;</span>
            </p>
            {suggestion ? (
              <p className="text-zinc-300">
                Did you mean{' '}
                <button
                  type="button"
                  onClick={() => runQuickCommand(suggestion)}
                  className="font-bold text-red-400 underline underline-offset-2 hover:text-white transition-colors"
                >
                  {suggestion}
                </button>
                ?
              </p>
            ) : (
              <p className="text-zinc-400">
                Type <span className="font-bold text-white underline">help</span> to view all supported commands.
              </p>
            )}
          </div>
        ),
      };
    }

    setLines((prev) => [...prev, cmdLine, ...(outputResult ? [outputResult] : [])]);
    setInputVal('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(history[nextIdx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= history.length) {
        setHistoryIdx(-1);
        setInputVal('');
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx] ?? '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Tab autocomplete
      const clean = inputVal.trim().toLowerCase();
      if (!clean) return;
      const match = AVAILABLE_COMMANDS.find((cmd) => cmd.startsWith(clean));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const runQuickCommand = (cmd: string) => {
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const quickCommands = [
    'help',
    'about',
    'skills',
    'projects',
    'sudo hire-me',
    'contact',
    'banner',
    'clear',
  ];

  return (
    <section id="terminal" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[34rem] w-[34rem] rounded-full opacity-15 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff2525, transparent 70%)' }}
        />
        <div className="absolute inset-0 grid-bg opacity-25" />
      </div>

      <div className="container-px relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <p className="eyebrow">
              <TerminalIcon className="h-4 w-4" />
              <span>{t('terminal.eyebrow')}</span>
            </p>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="section-title mt-3 text-balance">
              {t('terminal.title1')}{' '}
              <span className="text-gradient-red">{t('terminal.title2')}</span>
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-4 max-w-2xl text-secondary text-balance text-base sm:text-lg">
              {t('terminal.subtitle')}
            </p>
          </Reveal>
        </div>

        {/* Quick Command Suggestion Bar */}
        <Reveal delay={200}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted hidden sm:inline">
              {t('terminal.quickCommands')}:
            </span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => runQuickCommand(cmd)}
                className={`group relative inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 sm:px-2.5 sm:py-1 min-h-[38px] sm:min-h-[auto] text-xs font-mono transition-all duration-200 active:scale-95 ${
                  cmd.includes('sudo')
                    ? 'border-red-500/50 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white shadow-[0_0_15px_-3px_rgba(255,37,37,0.3)]'
                    : 'border-themed bg-ink-surface/80 text-secondary hover:border-red-500/40 hover:text-white'
                }`}
              >
                <ChevronRight className="h-3 w-3 text-red-500 transition-transform group-hover:translate-x-0.5" />
                <span>{cmd}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Main Terminal Window Frame */}
        <Reveal delay={250}>
          <div
            className={`mt-6 mx-auto w-full transition-all duration-300 ${
              isExpanded ? 'max-w-6xl' : 'max-w-4xl'
            }`}
          >
            {/* Outer Glow & Shell */}
            <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-b from-red-500/50 via-white/10 to-transparent shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_-15px_rgba(255,37,37,0.25)]">
              <div
                onClick={focusInput}
                className="relative overflow-hidden rounded-[14.5px] bg-[#09090b] border border-white/5 select-text"
              >
                {/* Window Title Bar */}
                <div className="flex items-center justify-between border-b border-white/10 bg-[#121216] px-4 py-3 select-none">
                  {/* macOS Window Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      title="Reset Terminal (Red)"
                      aria-label="Reset Terminal"
                      className="h-3 w-3 rounded-full bg-[#ff5f56] transition-transform hover:scale-110 active:scale-95"
                    />
                    <button
                      type="button"
                      onClick={() => setLines([])}
                      title="Clear Screen (Amber)"
                      aria-label="Clear Screen"
                      className="h-3 w-3 rounded-full bg-[#ffbd2e] transition-transform hover:scale-110 active:scale-95"
                    />
                    <button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      title={isExpanded ? 'Restore Size (Green)' : 'Expand Window (Green)'}
                      aria-label="Toggle Expand Window"
                      className="h-3 w-3 rounded-full bg-[#27c93f] transition-transform hover:scale-110 active:scale-95"
                    />
                  </div>

                  {/* Terminal Tab Title */}
                  <div className="flex items-center gap-2 text-xs font-mono font-medium text-zinc-300">
                    <TerminalIcon className="h-3.5 w-3.5 text-red-500" />
                    <span>{t('terminal.windowTitle')}</span>
                  </div>

                  {/* Window Actions */}
                  <div className="flex items-center gap-2 text-zinc-400">
                    <button
                      type="button"
                      onClick={handleCopyHistory}
                      title="Copy Terminal History"
                      aria-label="Copy Terminal History"
                      className="p-1 rounded hover:bg-white/10 hover:text-zinc-200 transition-colors"
                    >
                      {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      title="Reset Terminal"
                      aria-label="Reset Terminal"
                      className="p-1 rounded hover:bg-white/10 hover:text-zinc-200 transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsExpanded(!isExpanded)}
                      title={isExpanded ? 'Minimize' : 'Maximize'}
                      aria-label="Toggle Window Size"
                      className="hidden sm:inline-flex p-1 rounded hover:bg-white/10 hover:text-zinc-200 transition-colors"
                    >
                      {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Terminal Content Body */}
                <div
                  className={`overflow-y-auto p-3.5 sm:p-6 font-mono text-xs sm:text-sm text-zinc-200 space-y-3.5 transition-all overscroll-contain ${
                    isExpanded ? 'min-h-[460px] max-h-[700px]' : 'min-h-[300px] sm:min-h-[380px] max-h-[460px] sm:max-h-[500px]'
                  }`}
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#ff2525 #09090b',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  {/* Lines Log */}
                  {lines.map((line) => {
                    if (line.type === 'banner') {
                      return (
                        <div key={line.id} className="overflow-x-auto max-w-full py-1">
                          <pre className="font-mono text-[7.5px] min-[400px]:text-[9px] sm:text-[11px] leading-tight text-red-500 font-bold select-all whitespace-pre">
                            {line.content as string}
                          </pre>
                        </div>
                      );
                    }

                    if (line.type === 'command') {
                      return (
                        <div key={line.id} className="flex items-center gap-2 text-zinc-300">
                          <span className="text-red-500 font-bold shrink-0">kareem@developer:~$</span>
                          <span className="text-white font-semibold break-all">{line.content as string}</span>
                          {line.timestamp && (
                            <span className="text-[10px] text-zinc-600 ml-auto shrink-0 hidden sm:inline">
                              {line.timestamp}
                            </span>
                          )}
                        </div>
                      );
                    }

                    return (
                      <div key={line.id} className="py-0.5">
                        {line.content}
                      </div>
                    );
                  })}

                  {/* Active Prompt Line with Native Mobile Form Execution */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      executeCommand(inputVal);
                    }}
                    className="flex items-center gap-2 pt-1"
                  >
                    <span className="text-red-500 font-bold shrink-0 text-xs sm:text-sm">kareem@developer:~$</span>
                    <div className="relative flex-1 flex items-center">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => {
                          setTimeout(() => {
                            terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                          }, 300);
                        }}
                        autoCapitalize="off"
                        autoCorrect="off"
                        autoComplete="off"
                        spellCheck="false"
                        enterKeyHint="go"
                        aria-label="Terminal Command Input"
                        placeholder="Type a command (try 'help')..."
                        className="w-full bg-transparent font-mono text-base sm:text-sm text-white placeholder-zinc-600 focus:outline-none"
                      />
                      <span className="inline-block w-2 h-4 sm:h-4.5 bg-red-500 animate-pulse ml-0.5" />
                    </div>
                    <button
                      type="submit"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-500/15 border border-red-500/40 text-red-400 active:bg-red-500 active:text-white sm:hidden transition-colors"
                      title="Run Command"
                      aria-label="Run Command"
                    >
                      <CornerDownLeft className="h-4 w-4" />
                    </button>
                  </form>

                  <div ref={terminalEndRef} />
                </div>

                {/* Terminal Footer Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/5 bg-[#0e0e12] px-4 py-2 text-[11px] font-mono text-zinc-500 select-none">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Bash 5.2.15 • UTF-8</span>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-3">
                    <span>{t('terminal.hint')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
