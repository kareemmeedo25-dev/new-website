import Reveal from '@/components/Reveal';
import { Briefcase, Sparkles, Rocket } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';

export default function About() {
  const { t } = useI18n();

  const stats = [
    { value: t('about.stat1Value'), label: t('about.stat1Label') },
    { value: t('about.stat2Value'), label: t('about.stat2Label') },
    { value: t('about.stat3Value'), label: t('about.stat3Label') },
  ];

  const traits = [
    { icon: Sparkles, text: t('about.trait1') },
    { icon: Briefcase, text: t('about.trait2') },
    { icon: Rocket, text: t('about.trait3') },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-px">
        <Reveal>
          <p className="eyebrow">
            <span className="h-px w-8 bg-red-500" /> {t('about.eyebrow')}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="section-title text-balance">
                {t('about.title1')}{' '}
                <span className="text-gradient-red">{t('about.title2')}</span>{' '}
                {t('about.title3')}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-secondary">
                {t('about.paragraph')}
              </p>
            </Reveal>

            <div className="mt-8 space-y-3">
              {traits.map((trait, i) => (
                <Reveal key={trait.text} delay={150 + i * 80}>
                  <div className="flex items-center gap-3 text-secondary">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-500">
                      <trait.icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-[color:var(--text-primary)] sm:text-base">{trait.text}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={200}>
              <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="glass rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-red-glow"
                  >
                    <p className="font-display text-3xl font-extrabold text-gradient-red sm:text-4xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="glass mt-4 rounded-2xl p-6">
                <p className="text-sm leading-relaxed text-secondary">{t('about.quote')}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
