import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { translations, type TranslationKey, type Language } from '@/lib/i18n';

type I18nContextValue = {
  lang: Language;
  dir: 'ltr' | 'rtl';
  setLang: (l: Language) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = 'kareem-lang';

function getInitialLang(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === 'en' || stored === 'ar') return stored;
  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((l: Language) => setLangState(l), []);
  const toggleLang = useCallback(
    () => setLangState((l) => (l === 'en' ? 'ar' : 'en')),
    [],
  );

  const t = useCallback(
    (key: TranslationKey) => translations[lang][key] ?? translations.en[key] ?? key,
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang, dir: lang === 'ar' ? 'rtl' : 'ltr', setLang, toggleLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
