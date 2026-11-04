import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideTransloco } from '@jsverse/transloco';
import { DEFAULT_LANG, LANGS } from './core/i18n/languages';
import { LanguageService } from './core/i18n/language.service';
import { TranslocoHttpLoader } from './core/i18n/transloco-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch()),
    provideTransloco({
      config: {
        availableLangs: [...LANGS],
        defaultLang: DEFAULT_LANG,
        fallbackLang: DEFAULT_LANG,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        missingHandler: { useFallbackTranslation: true },
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(() => inject(LanguageService).init()),
  ],
};
