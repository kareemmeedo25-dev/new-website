import { useCallback, useState, type FormEvent } from 'react';
import { Github, Star, GitFork, Search, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useI18n } from '@/context/I18nContext';

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
};

type Status = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export default function GitHubRepos() {
  const { t } = useI18n();
  const [username, setUsername] = useState('');
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<Status>('idle');

  const loadRepos = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      const name = username.trim();
      if (!name) {
        setStatus('idle');
        return;
      }
      setStatus('loading');
      setRepos([]);
      try {
        const res = await fetch(`https://api.github.com/users/${encodeURIComponent(name)}/repos?sort=updated&per_page=100`);
        if (!res.ok) {
          if (res.status === 404) {
            setStatus('empty');
            return;
          }
          throw new Error(`Request failed (${res.status})`);
        }
        const data: Repo[] = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          setStatus('empty');
          return;
        }
        setRepos(data.filter((r) => !r.name.startsWith('.')));
        setStatus('success');
      } catch {
        setStatus('error');
      }
    },
    [username],
  );

  return (
    <section id="github" className="relative py-24 sm:py-32">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow justify-center">
              <span className="h-px w-8 bg-red-500" /> {t('github.eyebrow')}{' '}
              <span className="h-px w-8 bg-red-500" />
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="section-title mt-4">
              {t('github.title1')} <span className="text-gradient-red">{t('github.title2')}</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-secondary">{t('github.subtitle')}</p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <form onSubmit={loadRepos} className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <label htmlFor="github-username" className="sr-only">
                {t('github.usernameLabel')}
              </label>
              <Github className="pointer-events-none absolute left-4 rtl:left-auto rtl:right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                id="github-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('github.usernamePlaceholder')}
                className="w-full rounded-xl border-themed surface-card py-3 pl-11 pr-4 rtl:pl-4 rtl:pr-11 text-base sm:text-sm text-[color:var(--text-primary)] placeholder:text-muted outline-none transition-all focus:ring-2 focus:ring-red-500/40"
              />
            </div>
            <button type="submit" disabled={status === 'loading'} className="btn-red justify-center disabled:opacity-70">
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> {t('github.loading')}
                </>
              ) : (
                <>
                  <Search className="h-4 w-4" /> {t('github.load')}
                </>
              )}
            </button>
          </form>
        </Reveal>

        {/* States */}
        {status === 'idle' && (
          <Reveal delay={250}>
            <p className="mt-10 text-center text-sm text-muted">{t('github.enterUsername')}</p>
          </Reveal>
        )}

        {status === 'error' && (
          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-center text-sm text-red-400">
            <AlertCircle className="mx-auto mb-2 h-5 w-5" />
            {t('github.error')}
          </div>
        )}

        {status === 'empty' && (
          <p className="mt-10 text-center text-sm text-muted">{t('github.empty')}</p>
        )}

        {status === 'success' && repos.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {repos.slice(0, 9).map((repo, i) => (
              <Reveal key={repo.id} delay={i * 60}>
                <div className="group flex h-full flex-col rounded-2xl border-themed surface-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-[color:var(--text-primary)] transition-colors group-hover:text-red-500">
                      {repo.name}
                    </h3>
                    {repo.language && (
                      <span className="shrink-0 rounded-full border-themed px-2.5 py-0.5 text-[11px] font-medium text-muted">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-secondary line-clamp-2">
                    {repo.description || '—'}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" /> {repo.stargazers_count}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <GitFork className="h-3.5 w-3.5" /> {repo.forks_count}
                      </span>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t('github.viewOnGithub')} - ${repo.name}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 transition-colors hover:text-red-400"
                    >
                      {t('github.viewOnGithub')} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
