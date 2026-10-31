import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      }
      const t = e.target as HTMLElement;
      const interactive = t.closest('a, button, [data-cursor="hover"], input, textarea, label');
      setHovering(Boolean(interactive));
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 h-2 w-2 rounded-full bg-red-500 transition-transform duration-75 ${
          down ? 'scale-50' : 'scale-100'
        }`}
      />
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 rounded-full border border-red-500/70 transition-[width,height,opacity,background-color] duration-200 ${
          hovering
            ? 'h-12 w-12 bg-red-500/10 border-red-400'
            : 'h-8 w-8 bg-transparent'
        } ${down ? 'scale-75' : ''}`}
      />
    </div>
  );
}
