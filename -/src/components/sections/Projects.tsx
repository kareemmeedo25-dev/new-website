import { useState } from 'react';
import { ExternalLink, Code2, Clock, Eye, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { projects, type Project } from '@/lib/projects';
import { useI18n } from '@/context/I18nContext';

type Props = {
  onOpenProject: (project: Project) => void;
};

type FilterCategory = 'all' | 'ecommerce' | 'web' | 'dashboard';

export default function Projects({ onOpenProject }: Props) {
  const { t } = useI18n();
  const [filter, setFilter] = useState<FilterCategory>('all');
  // Track currently active preview screenshot per project ID
  const [activeThumb, setActiveThumb] = useState<Record<string, string>>({});

  const featured = projects[0];
  const regularProjects = projects.slice(1);

  const filteredProjects = regularProjects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'ecommerce') return p.id.includes('fashion') || p.tags.includes('Stripe');
    if (filter === 'web') return p.id.includes('restaurant');
    if (filter === 'dashboard') return p.id.includes('analytics') || p.tags.includes('Recharts');
    return true;
  });

  const getPreviewImage = (p: Project) => activeThumb[p.id] || p.image;

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      {/* Background ambient lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/3 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff2525, transparent 65%)' }}
        />
      </div>

      <div className="container-px relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-500">
              <span className="h-px w-6 bg-red-500" />
              <span>{t('projects.eyebrow')}</span>
              <span className="h-px w-6 bg-red-500" />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="section-title mt-4 text-balance">
              {t('projects.title1')} <span className="text-gradient-red">{t('projects.title2')}</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-4 text-base text-secondary sm:text-lg">
              {t('projects.subtitle')}
            </p>
          </Reveal>

          {/* Interactive Filter Controls */}
          <Reveal delay={200}>
            <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border-themed surface-card p-1.5 shadow-card">
              <button
                onClick={() => setFilter('all')}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'text-secondary hover:text-[color:var(--text-primary)]'
                }`}
              >
                {t('projects.filterAll')} ({projects.length})
              </button>
              <button
                onClick={() => setFilter('ecommerce')}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  filter === 'ecommerce'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'text-secondary hover:text-[color:var(--text-primary)]'
                }`}
              >
                {t('projects.filterEcommerce')}
              </button>
              <button
                onClick={() => setFilter('web')}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  filter === 'web'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'text-secondary hover:text-[color:var(--text-primary)]'
                }`}
              >
                {t('projects.filterWeb')}
              </button>
              <button
                onClick={() => setFilter('dashboard')}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  filter === 'dashboard'
                    ? 'bg-red-500 text-white shadow-md'
                    : 'text-secondary hover:text-[color:var(--text-primary)]'
                }`}
              >
                {t('projects.filterDashboard')}
              </button>
            </div>
          </Reveal>
        </div>

        {/* 1. FEATURED PROJECT SHOWCASE (when 'all' or 'ecommerce' is active) */}
        {(filter === 'all' || filter === 'ecommerce') && (
          <Reveal delay={250}>
            <div className="mt-14">
              <div className="group relative overflow-hidden rounded-3xl border-themed surface-card shadow-card transition-all duration-500 hover:border-red-500/40">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Column: Visual Showcase & Screenshot Gallery */}
                  <div className="relative flex flex-col justify-between overflow-hidden bg-ink-base lg:col-span-7">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <img
                        src={getPreviewImage(featured)}
                        alt={`${featured.title} showcase`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Featured Badge */}
                      <div className="absolute left-4 top-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/20 px-3 py-1 text-xs font-bold text-red-400 backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                          {t('projects.flagship')}
                        </span>
                        {featured.isPractice && (
                          <span className="rounded-full border-themed glass-strong px-2.5 py-1 text-[11px] font-semibold text-muted backdrop-blur-md">
                            {t('projects.practiceBadge')}
                          </span>
                        )}
                      </div>

                      {/* Title overlay on mobile image */}
                      <div className="absolute inset-x-4 bottom-4 lg:hidden">
                        <h3 className="font-display text-xl font-bold text-white">
                          {featured.title}
                        </h3>
                        <p className="text-xs text-white/80">{featured.tagline}</p>
                      </div>
                    </div>

                    {/* Screenshot Selector Strip */}
                    <div className="border-t border-themed bg-surface/90 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted">
                          <Layers className="h-3.5 w-3.5 text-red-500" /> {t('projects.previewShots')}
                        </span>
                        <div className="flex items-center gap-2">
                          {featured.screenshots.map((shot, idx) => {
                            const isSelected = (activeThumb[featured.id] || featured.image) === shot;
                            return (
                              <button
                                key={shot}
                                onClick={() => setActiveThumb((prev) => ({ ...prev, [featured.id]: shot }))}
                                aria-label={`View screenshot ${idx + 1}`}
                                className={`relative h-11 w-16 overflow-hidden rounded-lg border transition-all ${
                                  isSelected
                                    ? 'border-red-500 ring-2 ring-red-500/40 scale-105'
                                    : 'border-themed opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img
                                  src={shot}
                                  alt={`Thumbnail ${idx + 1}`}
                                  className="h-full w-full object-cover"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Project Story, Stack & Actions */}
                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-10">
                    <div>
                      <div className="hidden lg:block">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
                          E-Commerce Architecture
                        </span>
                        <h3 className="mt-2 font-display text-2xl font-bold text-[color:var(--text-primary)] sm:text-3xl">
                          {featured.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-red-500 dark:text-red-400">
                          {featured.tagline}
                        </p>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-secondary sm:text-base">
                        {featured.description}
                      </p>

                      {/* Key Features Bullet List */}
                      <div className="mt-6 space-y-2.5">
                        {featured.features.slice(0, 3).map((f) => (
                          <div key={f} className="flex items-start gap-2.5 text-xs text-secondary sm:text-sm">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="mt-7">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                          {t('projects.techUsed')}
                        </p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {featured.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-500 dark:text-red-400"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-themed">
                      <button
                        onClick={() => onOpenProject(featured)}
                        className="btn-red flex-1 sm:flex-none"
                      >
                        <Eye className="h-4 w-4" />
                        <span>{t('projects.viewDetails')}</span>
                      </button>

                      {featured.demoUrl ? (
                        <a
                          href={featured.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost flex-1 sm:flex-none"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>{t('projects.liveDemo')}</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border-themed surface-card px-4 py-2.5 text-xs font-medium text-muted">
                          <Clock className="h-3.5 w-3.5 text-red-500" />
                          <span>{t('projects.stagingDemo')}</span>
                        </span>
                      )}

                      {featured.codeUrl && (
                        <a
                          href={featured.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-ghost flex-1 sm:flex-none"
                        >
                          <Code2 className="h-4 w-4" />
                          <span>{t('projects.sourceCode')}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* 2. SECONDARY PROJECTS GRID */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredProjects.map((p, idx) => {
            const hasLinks = Boolean(p.demoUrl || p.codeUrl);
            const currentImg = getPreviewImage(p);

            return (
              <Reveal key={p.id} delay={idx * 120}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border-themed surface-card shadow-card transition-all duration-500 hover:-translate-y-1 hover:border-red-500/40">
                  {/* Media Frame */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink-base">
                    <img
                      src={currentImg}
                      alt={`${p.title} preview`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute left-3 top-3 flex items-center gap-2">
                      {p.isPractice && (
                        <span className="rounded-full border border-red-500/40 bg-red-500/20 px-2.5 py-1 text-[10px] font-bold text-red-300 backdrop-blur-md">
                          {t('projects.practiceBadge')}
                        </span>
                      )}
                    </div>

                    {/* Thumbnail Switcher Overlay on card top-right */}
                    {p.screenshots.length > 1 && (
                      <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border-themed glass-strong p-1 backdrop-blur-md">
                        {p.screenshots.map((s, sIdx) => {
                          const active = currentImg === s;
                          return (
                            <button
                              key={s}
                              onClick={() => setActiveThumb((prev) => ({ ...prev, [p.id]: s }))}
                              aria-label={`Preview angle ${sIdx + 1}`}
                              className={`h-2.5 w-2.5 rounded-full transition-all ${
                                active ? 'bg-red-500 scale-125' : 'bg-white/40 hover:bg-white/80'
                              }`}
                            />
                          );
                        })}
                      </div>
                    )}

                    {/* Bottom overlay title */}
                    <div className="absolute inset-x-4 bottom-3 flex items-end justify-between">
                      <div>
                        <p className="text-xs font-semibold text-red-400">{p.tagline}</p>
                        <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                          {p.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <p className="text-sm leading-relaxed text-secondary line-clamp-3">
                        {p.description}
                      </p>

                      {/* Tech Tags */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-red-500/20 bg-red-500/5 px-2.5 py-1 text-[11px] font-semibold text-red-500 dark:text-red-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-6 flex items-center justify-between gap-3 border-t border-themed pt-4">
                      <button
                        onClick={() => onOpenProject(p)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 transition-colors hover:text-red-400"
                      >
                        <Eye className="h-4 w-4" />
                        <span>{t('projects.viewDetails')}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>

                      {hasLinks ? (
                        <div className="flex items-center gap-2">
                          {p.demoUrl && (
                            <a
                              href={p.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${t('projects.liveDemo')} - ${p.title}`}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-[color:var(--text-primary)]"
                            >
                              <ExternalLink className="h-3.5 w-3.5" /> Live
                            </a>
                          )}
                          {p.codeUrl && (
                            <a
                              href={p.codeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${t('projects.sourceCode')} - ${p.title}`}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-[color:var(--text-primary)]"
                            >
                              <Code2 className="h-3.5 w-3.5" /> Code
                            </a>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-muted">
                          <Clock className="h-3 w-3 text-red-500" /> {t('projects.stagingDemo')}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Demo Disclaimer / Clarification Note */}
        <Reveal delay={180}>
          <div className="mx-auto mt-12 max-w-xl text-center">
            <p className="text-xs leading-relaxed text-muted">
              {t('projects.demoNote')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
