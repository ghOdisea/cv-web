export const LANGS = ['en', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'en';
export const LANG_STORAGE_KEY = 'cv-lang';

/** Labels shown in the language switcher (always in their own language). */
export const LANG_LABELS: Record<Lang, string> = {
  en: 'English',
  es: 'Español',
};

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (LANGS as readonly string[]).includes(value);
}

/**
 * Picks the initial language: stored choice → first supported browser language → default.
 */
export function detectLang(stored: string | null, browserLangs: readonly string[]): Lang {
  if (isLang(stored)) return stored;
  for (const tag of browserLangs) {
    const base = tag.toLowerCase().split('-')[0];
    if (isLang(base)) return base;
  }
  return DEFAULT_LANG;
}
