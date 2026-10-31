import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Twitter,
  ArrowDown,
  Mail,
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  Code2,
  Terminal as TerminalIcon,
  Cpu,
} from 'lucide-react';
import KALogo from '@/components/KALogo';
import Reveal from '@/components/Reveal';
import { useI18n } from '@/context/I18nContext';
import { WHATSAPP_URL, EMAIL_ADDRESS } from '@/lib/contact';

const socials = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'Email', href: `mailto:${EMAIL_ADDRESS}`, icon: Mail },
];

const heroPhoto =
  '/assets/aistudio/WhatsApp_Image_2026-10-24_at_9.13.04_PM_61d57dcf.jpeg';

export default function Hero() {
  const { t, lang, dir } = useI18n();
  const heroRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    // Disable mouse parallax calculations on touch devices to ensure silky smooth native scrolling and battery efficiency
    if (e.pointerType === 'touch') return;
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    }
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
    setIsHovering(false);
  }, []);

  const handlePointerEnter = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;
    setIsHovering(true);
  }, []);

  // Reset pointer on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400 && (mousePos.x !== 0 || mousePos.y !== 0)) {
        setMousePos({ x: 0, y: 0 });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mousePos]);

  const capabilities = [
    {
      number: '01',
      title: t('hero.cap1Title'),
      desc: t('hero.cap1Desc'),
    },
    {
      number: '02',
      title: t('hero.cap2Title'),
      desc: t('hero.cap2Desc'),
    },
    {
      number: '03',
      title: t('hero.cap3Title'),
      desc: t('hero.cap3Desc'),
    },
    {
      number: '04',
      title: t('hero.cap4Title'),
      desc: t('hero.cap4Desc'),
    },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Parallax transform calculations (clamped and weighted)
  const nameTiltX = mousePos.y * -14;
  const nameTiltY = mousePos.x * 16;
  const portraitTiltX = mousePos.y * -8;
  const portraitTiltY = mousePos.x * 10;
  const bgGridX = mousePos.x * -24;
  const bgGridY = mousePos.y * -24;
  const bgAuraX = mousePos.x * -40;
  const bgAuraY = mousePos.y * -40;

  return (
    <section
      id="home"
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      className="relative min-h-screen overflow-hidden pt-24 md:pt-28"
    >
      {/* Futuristic Background: Deep Obsidian, Parallax Cyber Grid & Crimson Ambient Glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Dynamic Parallax Ambient Red Halo 1 */}
        <div
          className="absolute -top-32 -left-32 h-[34rem] w-[34rem] rounded-full opacity-25 blur-3xl transition-transform duration-700 ease-out"
          style={{
            background: 'radial-gradient(circle, #ff2525 0%, rgba(184,8,8,0.4) 45%, transparent 70%)',
            transform: `translate(${bgAuraX}px, ${bgAuraY}px)`,
          }}
        />

        {/* Dynamic Parallax Ambient Red Halo 2 */}
        <div
          className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full opacity-20 blur-3xl transition-transform duration-700 ease-out"
          style={{
            background: 'radial-gradient(circle, #ff2525 0%, rgba(143,8,8,0.3) 50%, transparent 75%)',
            transform: `translate(${bgAuraX * -0.7}px, ${bgAuraY * -0.7}px)`,
          }}
        />

        {/* Layered Cyber Grid with Mouse Parallax */}
        <div
          className="absolute inset-0 cyber-grid opacity-35 transition-transform duration-500 ease-out"
          style={{
            transform: `translate(${bgGridX}px, ${bgGridY}px) scale(1.04)`,
          }}
        />

        {/* Diagonal Cyber Light Laser Sweep */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,37,37,0.15) 0%, transparent 40%, transparent 60%, rgba(255,37,37,0.08) 100%)',
          }}
        />

        {/* Minimal Cyber HUD Frame Marks */}
        <div className="absolute top-28 left-6 sm:left-12 flex items-center gap-2 font-mono text-[10px] tracking-widest text-zinc-600 opacity-60">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">SYS_STATUS: READY // KA-26_PROD</span>
        </div>
        <div className="absolute top-28 right-6 sm:right-12 font-mono text-[10px] tracking-widest text-zinc-600 opacity-60 hidden md:block">
          <span>LAT: 30.0444° N // LON: 31.2357° E</span>
        </div>

        {/* Subtle Specular Particles */}
        <div className="absolute top-1/4 left-1/4 h-1 w-1 rounded-full bg-red-400 shadow-[0_0_8px_#ff2525] animate-ping opacity-60" />
        <div className="absolute top-2/3 right-1/3 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_#ff2525] animate-pulse opacity-70" />
      </div>

      <div className="container-px relative z-10 flex flex-col justify-between">
        {/* Main 2-column Hero Split */}
        <div className="grid grid-cols-1 items-center gap-12 py-10 lg:grid-cols-12 lg:gap-14 lg:py-16">
          {/* Left Column: Futuristic 3D Typography & Identity */}
          <div className="lg:col-span-7">
            {/* Small Professional Role Label */}
            <div
              className="inline-flex items-center gap-2.5 rounded-full border border-red-500/30 bg-red-950/20 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-[0.22em] text-red-400 shadow-[0_0_15px_-3px_rgba(255,37,37,0.3)] backdrop-blur-md"
              style={{ animation: 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both' }}
            >
              <Cpu className="h-3 w-3 text-red-500 animate-pulse" />
              <span>WEB DEVELOPER • CREATIVE DEVELOPER</span>
            </div>

            {/* Main Name 3D Centerpiece: KAREEM AHMED */}
            <div
              className="relative mt-4 mb-2 select-none"
              style={{
                transform: `perspective(1000px) rotateX(${nameTiltX}deg) rotateY(${nameTiltY}deg) translateZ(30px)`,
                transition: isHovering
                  ? 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)'
                  : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transformStyle: 'preserve-3d',
                animation: 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both',
              }}
            >
              {/* Layered Red Light Ambient Bloom Behind Typography */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-12 -inset-y-8 rounded-full opacity-60 blur-3xl transition-opacity duration-500"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(255, 37, 37, 0.45) 0%, rgba(184, 8, 8, 0.15) 55%, transparent 80%)',
                }}
              />

              {/* Dominant Line 1: KAREEM */}
              <h1 className="relative font-display text-[2.75rem] min-[360px]:text-5xl font-black uppercase tracking-tight sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl leading-[0.92] text-depth-3d">
                <span className="relative inline-block bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  K
                </span>
                <span className="relative inline-block bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  A
                </span>
                <span className="relative inline-block text-red-500 drop-shadow-[0_0_35px_rgba(255,37,37,0.85)]">
                  R
                </span>
                <span className="relative inline-block bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  E
                </span>
                <span className="relative inline-block bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  E
                </span>
                <span className="relative inline-block bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  M
                </span>
              </h1>

              {/* Secondary Line 2: AHMED with Cyber Beam */}
              <div className="relative mt-2 flex items-center gap-2.5 sm:gap-5 font-display text-2xl min-[360px]:text-3xl font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.2em] sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl leading-none text-depth-3d">
                <span className="relative inline-block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  AHMED
                </span>
                <span className="h-0.5 sm:h-1 flex-1 max-w-[100px] sm:max-w-[220px] bg-gradient-to-r from-red-500 via-red-500/70 to-transparent rounded-full shadow-[0_0_12px_#ff2525]" />
              </div>

              {/* Arabic Name Callout When Language is Arabic */}
              {lang === 'ar' && (
                <p className="mt-2 text-lg font-bold text-gradient-red sm:text-xl">
                  المطور كريم أحمد
                </p>
              )}
            </div>

            {/* Headline */}
            <p
              className="mt-5 text-xl font-bold tracking-tight text-[color:var(--text-primary)] sm:text-2xl md:text-3xl text-balance"
              style={{ animation: 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.18s both' }}
            >
              {lang === 'ar' ? 'أبني تجارب رقمية تصنع فارقاً حقيقياً.' : 'Building Digital Experiences That Matter.'}
            </p>

            {/* Engaging Personal Introduction */}
            <p
              className="mt-3 max-w-xl text-base leading-relaxed text-secondary sm:text-lg"
              style={{ animation: 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.22s both' }}
            >
              {t('hero.intro')}
            </p>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
              style={{ animation: 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.28s both' }}
            >
              <button
                onClick={() => scrollTo('projects')}
                className="btn-red group whitespace-nowrap min-h-[44px] shadow-[0_10px_30px_-5px_rgba(255,37,37,0.5)]"
              >
                <span>{t('hero.viewWork')}</span>
                <ArrowUpRight
                  className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                    dir === 'rtl' ? 'rotate-[-90deg]' : ''
                  }`}
                />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="btn-ghost group whitespace-nowrap min-h-[44px]"
              >
                <MessageSquare className="h-4 w-4 text-red-500 transition-colors group-hover:text-red-400" />
                <span>{t('hero.contactMe')}</span>
              </button>

              <button
                onClick={() => scrollTo('terminal')}
                className="inline-flex items-center gap-2 rounded-full border border-themed glass px-4 py-3 text-xs sm:text-sm font-mono font-medium text-secondary min-h-[44px] transition-all duration-300 hover:border-red-500/50 hover:text-white hover:-translate-y-0.5"
                title="Launch Interactive Terminal"
              >
                <TerminalIcon className="h-3.5 w-3.5 text-red-500" />
                <span>Launch Shell</span>
              </button>
            </div>

            {/* Follow & Social Links */}
            <div
              className="mt-10 flex items-center gap-4"
              style={{ animation: 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s both' }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted">
                {t('hero.connect')}
              </span>
              <span className="h-px w-8 bg-[color:var(--glass-border)]" />
              <div className="flex items-center gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border-themed surface-card text-secondary transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:text-red-500 hover:shadow-card"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Premium Architectural Portrait Showcase with Parallax Tilt */}
          <div className="lg:col-span-5">
            <div
              className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-[430px] xl:max-w-[460px]"
              style={{
                transform: `perspective(1000px) rotateX(${portraitTiltX}deg) rotateY(${portraitTiltY}deg)`,
                transition: isHovering
                  ? 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)'
                  : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transformStyle: 'preserve-3d',
                animation: 'fade-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s both',
              }}
            >
              {/* Layer 1: Outer Ambient Dynamic Red Back-Glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-8 rounded-full bg-gradient-to-tr from-red-600/35 via-red-500/20 to-transparent blur-3xl opacity-80 animate-pulse motion-reduce:animate-none"
              />

              {/* Layer 2: Secondary Soft Ambient Lighting */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-3 rounded-[32px] bg-red-500/15 blur-xl"
              />

              {/* Layer 3: Architectural SVG Geometric Orbital Rings */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-10 sm:-inset-14 flex items-center justify-center opacity-70"
              >
                <svg
                  viewBox="0 0 500 500"
                  className="h-full w-full animate-[spin_70s_linear_infinite] motion-reduce:animate-none text-red-500/25"
                  fill="none"
                >
                  {/* Outer Dashed Orbit Circle */}
                  <circle
                    cx="250"
                    cy="250"
                    r="230"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="6 10"
                    className="opacity-60"
                  />
                  {/* Inner Precision Arc */}
                  <circle
                    cx="250"
                    cy="250"
                    r="195"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2 12"
                    className="opacity-40"
                  />
                  {/* Cardinal Crosshair Coordinates */}
                  <path
                    d="M250 12 V28 M250 472 V488 M12 250 H28 M472 250 H488"
                    stroke="#ff2525"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="opacity-80"
                  />
                  {/* Orbiting Glowing Nodes */}
                  <circle cx="250" cy="20" r="4" fill="#ff2525" className="filter drop-shadow-[0_0_8px_#ff2525]" />
                  <circle cx="480" cy="250" r="3" fill="#ff4747" className="filter drop-shadow-[0_0_6px_#ff4747]" />
                  <circle cx="80" cy="380" r="3.5" fill="#ff2525" className="filter drop-shadow-[0_0_6px_#ff2525]" />
                </svg>
              </div>

              {/* Layer 4: Precision Corner Tech Markers */}
              <div aria-hidden className="pointer-events-none absolute -top-3 -left-3 h-5 w-5 border-t-2 border-l-2 border-red-500/70" />
              <div aria-hidden className="pointer-events-none absolute -top-3 -right-3 h-5 w-5 border-t-2 border-r-2 border-red-500/70" />
              <div aria-hidden className="pointer-events-none absolute -bottom-3 -left-3 h-5 w-5 border-b-2 border-l-2 border-red-500/70" />
              <div aria-hidden className="pointer-events-none absolute -bottom-3 -right-3 h-5 w-5 border-b-2 border-r-2 border-red-500/70" />

              {/* Layer 5: Ambient Floating Sparkles / Particles */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-4 right-12 h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_#ff2525] animate-ping motion-reduce:animate-none opacity-75"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute bottom-16 -left-4 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_#ff2525] animate-pulse motion-reduce:animate-none opacity-80"
              />

              {/* Layer 6: Main Floating Showcase Frame with Hover Tilt & Glow */}
              <div className="relative group animate-float motion-reduce:animate-none transition-all duration-500 hover:-translate-y-1.5">
                {/* Metallic Gradient Neon Border */}
                <div className="relative rounded-[30px] p-[1.5px] bg-gradient-to-b from-red-500/80 via-red-500/30 to-white/10 shadow-[0_22px_60px_-15px_rgba(0,0,0,0.85),0_0_40px_-10px_rgba(255,37,37,0.35)] transition-all duration-500 group-hover:from-red-500 group-hover:shadow-[0_28px_70px_-10px_rgba(255,37,37,0.55)]">
                  {/* Inner Card Container */}
                  <div className="relative overflow-hidden rounded-[28.5px] bg-ink-base aspect-[4/5] w-full">
                    {/* User's Exact Personal Photo - Real Face Preserved */}
                    <img
                      src={heroPhoto}
                      alt="Developer Kareem Ahmed"
                      className="h-full w-full object-cover object-[center_24%] contrast-[1.04] brightness-[0.98] saturate-[1.03] transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="eager"
                    />

                    {/* Directional Cinematic Scrims */}
                    {/* Top Scrim for Badges */}
                    <div
                      className="absolute inset-x-0 top-0 h-32 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(8,8,8,0.55) 0%, rgba(8,8,8,0.2) 60%, rgba(8,8,8,0) 100%)',
                      }}
                    />

                    {/* Bottom Scrim for Theme Integration */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(0deg, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.65) 45%, rgba(8,8,8,0) 100%)',
                      }}
                    />

                    {/* Radial Edge Vignette to Blend Daylight Into Dark Architecture */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 50px rgba(8,8,8,0.5), inset 0 0 100px rgba(0,0,0,0.3)',
                      }}
                    />

                    {/* Brand Monogram Watermark Stamp with Neon Rim */}
                    <div className="absolute right-4 top-4 rtl:right-auto rtl:left-4 z-20">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-500/40 glass-strong shadow-card transition-all duration-300 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(255,37,37,0.4)]">
                        <KALogo size={30} />
                      </span>
                    </div>

                    {/* Floating Availability Status Pill */}
                    <div className="absolute left-4 top-4 rtl:left-auto rtl:right-4 z-20">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 dark:border-white/10 glass-strong px-3.5 py-1.5 text-xs font-semibold text-[color:var(--text-primary)] shadow-card backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        {t('hero.available')}
                      </span>
                    </div>

                    {/* Floating Side Skill Badge (Depth Accent) */}
                    <div className="absolute left-4 bottom-24 rtl:left-auto rtl:right-4 z-20 hidden sm:inline-flex items-center gap-2 rounded-xl border border-red-500/30 glass-strong px-3 py-1.5 text-xs font-semibold text-[color:var(--text-primary)] shadow-card backdrop-blur-md transition-all duration-300 group-hover:border-red-500/60 group-hover:-translate-y-1">
                      <span className="flex h-5 w-5 items-center justify-center rounded-md bg-red-500/15 text-red-500">
                        <Code2 className="h-3.5 w-3.5" />
                      </span>
                      <span>{lang === 'ar' ? 'كود نظيف • أداء فائق' : 'Clean Code • High Performance'}</span>
                    </div>

                    {/* Bottom Frosted Identity Plate */}
                    <div className="absolute inset-x-3 bottom-3 z-20">
                      <div className="glass-strong rounded-2xl p-4 shadow-card border border-white/10 dark:border-white/10 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-[color:var(--text-primary)] truncate">
                              {lang === 'ar' ? 'كريم أحمد' : 'Kareem Ahmed'}
                            </p>
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                          </div>
                          <p className="text-xs font-medium text-gradient-red truncate">
                            {lang === 'ar' ? 'مطور ويب وواجهات رقمية' : 'Full-Stack Web Developer & UI'}
                          </p>
                        </div>
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl border border-red-500/40 bg-gradient-to-r from-red-600 to-red-500 px-3.5 py-2 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(255,37,37,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_6px_22px_rgba(255,37,37,0.55)]"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span>{t('hero.hireMe')}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Capability Strip */}
        <div className="mt-8 border-t border-themed pt-8 pb-12 sm:mt-12 sm:pt-10">
          <Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {capabilities.map((c, i) => (
                <div
                  key={c.number}
                  className="group rounded-2xl border-themed surface-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-card"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className="font-display text-xs font-bold text-red-500">{c.number}</span>
                  <h3 className="mt-2 text-sm font-bold text-[color:var(--text-primary)] transition-colors group-hover:text-red-500">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-secondary">{c.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Subtle Scroll Down Prompt */}
      <div className="flex justify-center pb-8">
        <button
          onClick={() => scrollTo('about')}
          aria-label={t('hero.scrollHint')}
          className="group flex flex-col items-center gap-1 text-muted transition-colors hover:text-red-500"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">
            {t('hero.scroll')}
          </span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
