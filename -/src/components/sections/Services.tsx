import Reveal from '@/components/Reveal';
import { services } from '@/lib/services';
import { useI18n } from '@/context/I18nContext';
import {
  CheckCircle2,
  ArrowUpRight,
  Compass,
  Code2,
  Rocket,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export default function Services() {
  const { t, lang } = useI18n();
  const isAr = lang === 'ar';

  const workflowSteps = [
    {
      num: '01',
      icon: Compass,
      title: t('services.step1Title'),
      desc: t('services.step1Desc'),
    },
    {
      num: '02',
      icon: Code2,
      title: t('services.step2Title'),
      desc: t('services.step2Desc'),
    },
    {
      num: '03',
      icon: Rocket,
      title: t('services.step3Title'),
      desc: t('services.step3Desc'),
    },
  ];

  return (
    <section id="services" className="relative py-24 sm:py-32">
      {/* Background ambient lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="absolute left-1/3 top-1/4 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff2525, transparent 65%)' }}
        />
        <div
          className="absolute right-10 bottom-1/4 h-[24rem] w-[24rem] rounded-full opacity-5 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff2525, transparent 65%)' }}
        />
      </div>

      <div className="container-px relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-500">
              <span className="h-px w-6 bg-red-500" />
              <span>{t('services.eyebrow')}</span>
              <span className="h-px w-6 bg-red-500" />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="section-title mt-4">
              {t('services.title1')}{' '}
              <span className="text-gradient-red">{t('services.title2')}</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
              {t('services.subtitle')}
            </p>
          </Reveal>
        </div>

        {/* 6 Modern Service Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            const cardTitle = t(service.titleKey) || service.title;
            const cardDesc = t(service.descKey) || service.description;
            const deliverables = isAr ? service.deliverablesAr : service.deliverables;
            const badge = isAr ? service.badgeAr : service.badge;

            return (
              <Reveal key={service.id} delay={i * 80}>
                <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border-themed surface-card p-6 sm:p-7 shadow-card transition-all duration-500 hover:-translate-y-2 hover:border-red-500/40 hover:shadow-red-glow">
                  {/* Subtle top-corner radial highlight on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: 'radial-gradient(circle, rgba(255,37,37,0.35), transparent 70%)' }}
                  />

                  {/* Upper Content */}
                  <div>
                    {/* Top Row: Icon + Badge + Number */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-red-500 transition-all duration-300 group-hover:bg-red-500 group-hover:text-white group-hover:shadow-md group-hover:shadow-red-500/30">
                        <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="rounded-full border border-themed bg-themed/60 px-2.5 py-0.5 text-[11px] font-medium text-secondary">
                          {badge}
                        </span>
                        <span className="font-mono text-xs font-bold tracking-wider text-red-500/70">
                          {service.number}
                        </span>
                      </div>
                    </div>

                    {/* Service Title */}
                    <h3 className="mt-5 font-display text-lg font-bold text-[color:var(--text-primary)] transition-colors duration-300 group-hover:text-red-500 sm:text-xl">
                      {cardTitle}
                    </h3>

                    {/* Service Description */}
                    <p className="mt-2.5 text-sm leading-relaxed text-secondary">
                      {cardDesc}
                    </p>

                    {/* Key Deliverables */}
                    <div className="mt-5 border-t border-themed pt-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                        {t('services.deliverables')}
                      </p>
                      <ul className="mt-2.5 space-y-2">
                        {deliverables.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="flex items-start gap-2 text-xs leading-relaxed text-secondary"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="mt-6 border-t border-themed pt-4">
                    <button
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className="inline-flex w-full items-center justify-between text-xs font-semibold text-[color:var(--text-primary)] transition-colors duration-300 group-hover:text-red-500"
                    >
                      <span className="tracking-wide">{t('services.inquire')}</span>
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-themed bg-themed/50 transition-all duration-300 group-hover:border-red-500/50 group-hover:bg-red-500/10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5">
                        <ArrowUpRight className={`h-3.5 w-3.5 text-red-500 ${isAr ? 'rotate-[-90deg]' : ''}`} />
                      </span>
                    </button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Workflow / Collaboration Strip */}
        <div className="mt-16 sm:mt-20">
          <Reveal>
            <div className="overflow-hidden rounded-3xl border-themed surface-card p-8 sm:p-10 shadow-card">
              <div className="mx-auto max-w-2xl text-center">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-500">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{t('services.workflowEyebrow')}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold text-[color:var(--text-primary)] sm:text-3xl">
                  {t('services.workflowTitle1')}{' '}
                  <span className="text-gradient-red">{t('services.workflowTitle2')}</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-secondary sm:text-base">
                  {t('services.workflowSubtitle')}
                </p>
              </div>

              {/* 3 Steps */}
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                {workflowSteps.map((step, idx) => {
                  const StepIcon = step.icon;
                  return (
                    <div
                      key={step.num}
                      className="relative rounded-2xl border border-themed bg-themed/40 p-5 transition-all duration-300 hover:border-red-500/30 hover:bg-themed/70"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-500">
                          <StepIcon className="h-5 w-5" />
                        </div>
                        <span className="font-mono text-sm font-bold text-red-500/70">
                          {step.num}
                        </span>
                      </div>

                      <h4 className="mt-4 font-display text-base font-semibold text-[color:var(--text-primary)]">
                        {step.title}
                      </h4>
                      <p className="mt-2 text-xs leading-relaxed text-secondary sm:text-sm">
                        {step.desc}
                      </p>

                      {idx < 2 && (
                        <div
                          aria-hidden
                          className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 rtl:-right-auto rtl:-left-3 rtl:rotate-180"
                        >
                          <span className="block h-2 w-2 rotate-45 border-r border-t border-red-500/40" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Direct Banner CTA */}
              <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-red-500/20 bg-gradient-to-r from-red-500/10 via-red-500/5 to-transparent p-6 sm:flex-row sm:p-7">
                <div className="text-center sm:text-left rtl:sm:text-right">
                  <h4 className="font-display text-lg font-bold text-[color:var(--text-primary)] sm:text-xl">
                    {t('services.ctaTitle')}
                  </h4>
                  <p className="mt-1 text-xs text-secondary sm:text-sm">
                    {t('services.ctaDesc')}
                  </p>
                </div>

                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-red-500/40"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{t('services.ctaButton')}</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
