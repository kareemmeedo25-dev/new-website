import { useEffect } from 'react';
import { X, ExternalLink, Code2, CheckCircle2 } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { useI18n } from '@/context/I18nContext';

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const { t } = useI18n();

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="glass-strong relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border-themed shadow-card animate-modal-in"
      >
        {/* Hero image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-3xl">
          <img
            src={project.image}
            alt={`${project.title} cover`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {project.isPractice && (
            <span className="absolute left-4 top-4 rounded-full border border-red-500/40 bg-red-500/15 px-3 py-1 text-xs font-semibold text-red-300 backdrop-blur-md">
              {t('projects.practiceBadge')}
            </span>
          )}
          <button
            onClick={onClose}
            aria-label={t('projectModal.close')}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:border-red-500/60 hover:text-red-400"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-6">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-white/70">{project.tagline}</p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Overview */}
          <section>
            <h3 className="font-display text-lg font-bold text-[color:var(--text-primary)]">
              {t('projectModal.overview')}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-secondary">{project.overview}</p>
          </section>

          {/* Technologies */}
          <section className="mt-8">
            <h3 className="font-display text-lg font-bold text-[color:var(--text-primary)]">
              {t('projectModal.technologies')}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mt-8">
            <h3 className="font-display text-lg font-bold text-[color:var(--text-primary)]">
              {t('projectModal.features')}
            </h3>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-secondary">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Screenshots */}
          {project.screenshots.length > 0 && (
            <section className="mt-8">
              <h3 className="font-display text-lg font-bold text-[color:var(--text-primary)]">
                {t('projectModal.screenshots')}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.screenshots.map((shot, idx) => (
                  <div
                    key={shot}
                    className="overflow-hidden rounded-xl border-themed surface-card"
                  >
                    <img
                      src={shot}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red"
              >
                <ExternalLink className="h-4 w-4" /> {t('projectModal.liveDemo')}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border-themed surface-card px-7 py-3.5 text-sm font-semibold text-muted">
                {t('projects.comingSoon')}
              </span>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Code2 className="h-4 w-4" /> {t('projectModal.sourceCode')}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
