import { useState } from 'react';
import Reveal from '@/components/Reveal';
import { skills, type SkillCategory } from '@/lib/skills';
import { useI18n } from '@/context/I18nContext';
import { Code, Server, Wrench, Sparkles, Terminal } from 'lucide-react';

const categoryKeys: { id: SkillCategory; key: 'skills.all' | 'skills.frontend' | 'skills.backend' | 'skills.languages' | 'skills.tools'; icon: typeof Code }[] = [
  { id: 'all', key: 'skills.all', icon: Sparkles },
  { id: 'frontend', key: 'skills.frontend', icon: Code },
  { id: 'backend', key: 'skills.backend', icon: Server },
  { id: 'languages', key: 'skills.languages', icon: Terminal },
  { id: 'tools', key: 'skills.tools', icon: Wrench },
];

export default function Skills() {
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const filteredSkills = skills.filter((skill) => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      {/* Background ambient lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute right-1/4 top-1/3 h-[28rem] w-[28rem] rounded-full opacity-10 blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff2525, transparent 65%)' }}
        />
      </div>

      <div className="container-px relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-red-500">
              <span className="h-px w-6 bg-red-500" />
              <span>{t('skills.eyebrow')}</span>
              <span className="h-px w-6 bg-red-500" />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="section-title mt-4 text-balance">
              {t('skills.title1')} <span className="text-gradient-red">{t('skills.title2')}</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-4 text-base text-secondary sm:text-lg">
              {t('skills.subtitle')}
            </p>
          </Reveal>

          {/* Interactive Category Filter Tabs */}
          <Reveal delay={180}>
            <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border-themed surface-card p-1.5 shadow-card">
              {categoryKeys.map((cat) => {
                const isActive = activeCategory === cat.id;
                const count = cat.id === 'all'
                  ? skills.length
                  : skills.filter((s) => s.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-red-500 text-white shadow-md'
                        : 'text-secondary hover:text-[color:var(--text-primary)]'
                    }`}
                  >
                    <cat.icon className="h-3.5 w-3.5" />
                    <span>{t(cat.key)}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-muted'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Skills Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredSkills.map((skill, i) => (
            <Reveal key={skill.id} delay={i * 60}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border-themed surface-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-red-500/40">
                {/* Subtle Brand Glow behind icon */}
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle, ${skill.color}35, transparent 70%)`,
                  }}
                />

                <div>
                  {/* Top Header: Icon & Category Label */}
                  <div className="flex items-center justify-between gap-3">
                    <div
                      className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-themed bg-[color:var(--bg-base)] p-3 shadow-sm transition-transform duration-300 group-hover:scale-110"
                      style={{ color: skill.color }}
                    >
                      <skill.icon className="h-7 w-7 transition-transform group-hover:rotate-3" />
                    </div>

                    <span className="rounded-full border border-themed bg-[color:var(--bg-base)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                      {skill.categoryLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 font-display text-base font-bold text-[color:var(--text-primary)] transition-colors group-hover:text-red-500">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-secondary">
                    {skill.description}
                  </p>
                </div>

                {/* Bottom Active Accent Line */}
                <div className="mt-5 pt-4 border-t border-themed">
                  <div className="flex items-center justify-between text-[11px] font-medium text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                      {t('skills.verified')}
                    </span>
                    <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-red-500 font-semibold">
                      {t('skills.production')}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Technical Standards Callout */}
        <Reveal delay={200}>
          <div className="mt-14 rounded-2xl border-themed surface-card p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-500">
                  <Code className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[color:var(--text-primary)]">
                    {t('skills.standard1Title')}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-secondary">
                    {t('skills.standard1Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-500">
                  <Wrench className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[color:var(--text-primary)]">
                    {t('skills.standard2Title')}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-secondary">
                    {t('skills.standard2Desc')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 text-red-500">
                  <Server className="h-4 w-4" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-[color:var(--text-primary)]">
                    {t('skills.standard3Title')}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-secondary">
                    {t('skills.standard3Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
