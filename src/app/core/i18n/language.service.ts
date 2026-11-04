import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import { detectLang, Lang, LANG_STORAGE_KEY } from './languages';

interface MetaTexts {
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly transloco = inject(TranslocoService);
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  private readonly current = signal<Lang>(
    detectLang(this.readStored(), this.document.defaultView?.navigator.languages ?? []),
  );

  /** Active language. */
  readonly lang = this.current.asReadonly();

  /** Loads the initial language before the first render (used as app initializer). */
  init(): Promise<void> {
    return this.use(this.current(), false);
  }

  /** Switches language and remembers the choice. */
  async setLang(lang: Lang): Promise<void> {
    await this.use(lang, true);
  }

  private async use(lang: Lang, persist: boolean): Promise<void> {
    await firstValueFrom(this.transloco.load(lang));
    this.transloco.setActiveLang(lang);
    this.current.set(lang);
    this.document.documentElement.lang = lang;
    this.updateMeta();
    if (persist) this.store(lang);
  }

  private updateMeta(): void {
    const { title, description } = this.transloco.translateObject<MetaTexts>('meta');
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:locale', content: this.current() === 'es' ? 'es_ES' : 'en_US' });
  }

  private readStored(): string | null {
    try {
      return this.document.defaultView?.localStorage.getItem(LANG_STORAGE_KEY) ?? null;
    } catch {
      return null; // storage disabled (privacy mode)
    }
  }

  private store(lang: Lang): void {
    try {
      this.document.defaultView?.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }
}
