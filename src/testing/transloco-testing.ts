import { EnvironmentProviders, Injectable, Provider } from '@angular/core';
import { provideTransloco, Translation, TranslocoLoader } from '@jsverse/transloco';
import { of } from 'rxjs';
import en from '../../public/i18n/en.json';
import es from '../../public/i18n/es.json';

const translations: Record<string, Translation> = { en, es };

@Injectable()
class InMemoryLoader implements TranslocoLoader {
  getTranslation(lang: string) {
    return of(translations[lang]);
  }
}

/** Transloco wired to the real EN/ES files, without HTTP. */
export function provideTranslocoTesting(): (Provider | EnvironmentProviders)[] {
  return provideTransloco({
    config: { availableLangs: ['en', 'es'], defaultLang: 'en', reRenderOnLangChange: true },
    loader: InMemoryLoader,
  });
}
