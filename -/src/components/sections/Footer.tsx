import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  ArrowUp,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import KALogo from '@/components/KALogo';
import { useI18n } from '@/context/I18nContext';
import {
  WHATSAPP_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  EMAIL_ADDRESS,
  LOCATION_DISPLAY,
  TIMEZONE_DISPLAY,
} from '@/lib/contact';

const navItems = [
  { id: 'home', key: 'nav.home' as const },
  { id: 'about', key: 'nav.about' as const },
  { id: 'skills', key: 'nav.skills' as const },
  { id: 'projects', key: 'nav.projects' as const },
  { id: 'services', key: 'nav.services' as const },
  { id: 'terminal', key: 'nav.terminal' as const },
  { id: 'github', key: 'nav.github' as const },
  { id: 'contact', key: 'nav.contact' as const },
];

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: Github,
    hoverClass: 'hover:border-zinc-400 hover:text-primary dark:hover:border-white/50',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
    hoverClass: 'hover:border-sky-500 hover:text-sky-500',
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com',
    icon: Twitter,
    hoverClass: 'hover:border-cyan-400 hover:text-cyan-400',
  },
  {
    label: 'Email',
    href: `mailto:${EMAIL_ADDRESS}`,
    icon: Mail,
    hoverClass: 'hover:border-red-500 hover:text-red-500',
  },
  {
    label: 'WhatsApp',
    href: WHATSAPP_URL,
    icon: MessageCircle,
    hoverClass: 'hover:border-emerald-500 hover:text-emerald-500',
  },
];

export default function Footer() {
  const { t, lang, dir } = useI18n();
  const currentYear = new Date().getFullYear();

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t-themed bg-surface/90 backdrop-blur-md">
      {/* Top ambient brand highlight line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container-px py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand & Identity Column */}
          <div className="lg:col-span-5">
            <button
              onClick={() => go('home')}
              className="group inline-flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
              aria-label="Developer Kareem Ahmed — Home"
            >
              <KALogo size={42} showWordmark={true} />
            </button>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-secondary">
              {t('footer.tagline')}
            </p>

            {/* Live Availability Status Pill */}
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border-themed surface-card px-3.5 py-1.5 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-medium text-primary">
                {t('contact.statusBadge')}
              </span>
            </div>

            {/* Direct Quick Actions */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs font-semibold text-emerald-600 transition-all hover:bg-emerald-500 hover:text-white dark:text-emerald-400 dark:hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5 shrink-0" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-flex items-center gap-2 rounded-xl border-themed surface-card px-3.5 py-2 text-xs font-semibold text-secondary transition-all hover:border-red-500/50 hover:text-red-500"
              >
                <Phone className="h-3.5 w-3.5 shrink-0 text-red-500" />
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-muted">
              {t('footer.navigation')}
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-y-2.5 gap-x-4 sm:grid-cols-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    className="group inline-flex items-center gap-1.5 text-sm text-secondary transition-colors hover:text-red-500 focus:outline-none focus-visible:text-red-500"
                  >
                    <span
                      className={`text-xs text-red-500/60 opacity-0 transition-opacity group-hover:opacity-100 ${
                        dir === 'rtl' ? 'rotate-180' : ''
                      }`}
                    >
                      ›
                    </span>
                    <span>{t(item.key)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Social Channels Column */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-muted">
              {t('footer.getTouch')}
            </h3>

            {/* Direct Info List */}
            <div className="mt-5 space-y-3">
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="group flex items-center gap-3 text-sm text-secondary transition-colors hover:text-red-500"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-themed surface-card text-muted transition-colors group-hover:border-red-500/40 group-hover:text-red-500">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <span className="break-all">{EMAIL_ADDRESS}</span>
              </a>

              <a
                href={`tel:${PHONE_TEL}`}
                className="group flex items-center gap-3 text-sm text-secondary transition-colors hover:text-red-500"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-themed surface-card text-muted transition-colors group-hover:border-red-500/40 group-hover:text-red-500">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <span dir="ltr">{PHONE_DISPLAY}</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-secondary">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-themed surface-card text-muted">
                  <MapPin className="h-3.5 w-3.5 text-red-500" />
                </span>
                <span>
                  {LOCATION_DISPLAY} ({TIMEZONE_DISPLAY})
                </span>
              </div>
            </div>

            {/* Verified Social Media Icons */}
            <div className="mt-6">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">
                {t('contact.socialTitle')}
              </span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={`flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border-themed surface-card text-secondary transition-all active:scale-95 hover:-translate-y-1 hover:shadow-md ${s.hoverClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500`}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Divider and Sub-footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t-themed pt-8 sm:flex-row sm:gap-4">
          <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <p className="text-xs text-secondary">
              © {currentYear} {lang === 'ar' ? 'المطور كريم أحمد' : 'Developer Kareem Ahmed'}.{' '}
              <span className="text-muted">{t('footer.allRightsReserved')}</span>
            </p>
            <p className="text-[11px] text-muted">
              {t('footer.craftedWith')}
            </p>
          </div>

          {/* Smooth Back to Top Button */}
          <button
            onClick={scrollTop}
            aria-label={t('footer.backTop')}
            className="group inline-flex items-center gap-2.5 rounded-full border-themed surface-card px-4 py-2.5 min-h-[44px] text-xs font-medium text-secondary transition-all active:scale-95 hover:-translate-y-0.5 hover:border-red-500/60 hover:text-red-500 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <span>{t('footer.backTop')}</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:bg-red-500 group-hover:text-white">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
