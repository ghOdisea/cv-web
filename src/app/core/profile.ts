import { Lang } from './i18n/languages';

export const PROFILE = {
  linkedin: 'https://www.linkedin.com/in/gonzalo-fourtane-odisea/',
  github: 'https://github.com/ghOdisea',
} as const;

/**
 * CV PDFs per language, served from `public/cv/cv-<lang>.pdf`.
 * Set to `true` once the file is added — the download button only shows for available files.
 */
export const CV_PDF_AVAILABLE: Record<Lang, boolean> = {
  en: false, // PENDING: add public/cv/cv-en.pdf
  es: false, // PENDING: add public/cv/cv-es.pdf
};

export function cvPdfPath(lang: Lang): string {
  return `cv/cv-${lang}.pdf`;
}

// Stored split and reversed so the address never appears as plain text in the static files.
const EMAIL_PARTS = ['com', 'gmail', 'fourtane', 'gonzalo'] as const;

/** Email address, assembled at runtime (anti-scraping). */
export function getEmail(): string {
  const [tld, domain, last, first] = EMAIL_PARTS;
  return `${first}.${last}@${domain}.${tld}`;
}

export function mailtoHref(subject: string): string {
  return `mailto:${getEmail()}?subject=${encodeURIComponent(subject)}`;
}
