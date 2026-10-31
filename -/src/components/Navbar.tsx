import { useEffect, useState } from 'react';
import { Menu, X, MessageCircle, Moon, Sun, Languages } from 'lucide-react';
import KALogo from '@/components/KALogo';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/I18nContext';

const linkKeys = [
  { id: 'home', key: 'nav.home' as const },
  { id: 'about', key: 'nav.about' as const },
  { id: 'skills', key: 'nav.skills' as const },
  { id: 'projects', key: 'nav.projects' as const },
  { id: 'services', key: 'nav.services' as const },
  { id: 'terminal', key: 'nav.terminal' as const },
  { id: 'github', key: 'nav.github' as const },
  { id: 'contact', key: 'nav.contact' as const },
] as const;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t, toggleLang, lang } = useI18n();
  const [active, setActive] = useState<string>('home');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const sections = linkKeys
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong border-b border-themed shadow-card' : 'bg-transparent'
      }`}
    >
      <nav className="container-px flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <button
          onClick={() => go('home')}
          className="group flex items-center"
          aria-label="Kareem Ahmed — Home"
        >
          <KALogo size={40} showWordmark={true} />
        </button>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {linkKeys.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="group relative py-1 text-sm font-medium text-secondary transition-colors hover:text-[color:var(--text-primary)]"
              >
                {t(l.key)}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-red-500 transition-all duration-300 ${
                    active === l.id ? 'w-full' : 'w-0 group-hover:w-1/2'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={t('theme.toggle')}
            title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border-themed surface-card text-[color:var(--text-primary)] transition-all active:scale-95 hover:border-red-500/50 hover:text-red-500"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Language toggle */}
          <button
            onClick={toggleLang}
            aria-label={t('lang.toggle')}
            title={t('lang.toggle')}
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border-themed surface-card text-[color:var(--text-primary)] transition-all active:scale-95 hover:border-red-500/50 hover:text-red-500"
          >
            <Languages className="h-4 w-4" />
            <span className="sr-only">{lang === 'en' ? 'AR' : 'EN'}</span>
          </button>

          <button
            onClick={() => go('contact')}
            className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-red-glow sm:inline-flex"
            style={{
              background: 'linear-gradient(135deg, #ff2525, #e00d0d)',
              boxShadow: '0 8px 24px -10px rgba(255,37,37,0.6)',
            }}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{t('nav.letsTalk')}</span>
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border-themed surface-card text-[color:var(--text-primary)] lg:hidden active:scale-95"
            aria-label={t('nav.toggleMenu')}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          open ? 'max-h-[calc(100vh-4.5rem)] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'
        }`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <ul className="container-px flex flex-col gap-1 border-t-themed bg-[color:var(--bg-surface)] py-4 backdrop-blur-xl">
          {linkKeys.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={`flex w-full min-h-[48px] items-center rounded-xl px-4 py-3 text-base font-medium transition-colors active:bg-red-500/10 ${
                  active === l.id
                    ? 'bg-red-500/10 text-red-500 font-semibold'
                    : 'text-secondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-[color:var(--text-primary)]'
                }`}
              >
                {t(l.key)}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => go('contact')}
              className="mt-2 flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white active:scale-98 transition-transform"
              style={{ background: 'linear-gradient(135deg, #ff2525, #e00d0d)' }}
            >
              <MessageCircle className="h-4 w-4" />
              {t('nav.letsTalk')}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
