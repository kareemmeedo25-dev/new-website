import { useEffect, useState } from 'react';
import KALogo from '@/components/KALogo';

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const minDelay = reduce ? 200 : 1400;
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minDelay - elapsed);
      window.setTimeout(() => {
        setDone(true);
        window.setTimeout(() => setHidden(true), 700);
      }, wait);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });

    return () => window.removeEventListener('load', finish);
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden={done}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[color:var(--bg-base)] transition-opacity duration-700 ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative">
        <div className="absolute -inset-8 rounded-full bg-red-500/15 blur-2xl animate-pulse" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-themed surface-card p-3 shadow-card">
          <KALogo size={56} />
          <div className="pointer-events-none absolute -inset-2.5 rounded-full border-2 border-transparent border-t-red-500 animate-spin" />
        </div>
      </div>
      <p className="mt-6 text-xs uppercase tracking-[0.35em] text-muted font-semibold">Kareem Ahmed</p>
    </div>
  );
}
