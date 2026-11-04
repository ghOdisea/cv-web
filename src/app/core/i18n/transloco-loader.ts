import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);

  getTranslation(lang: string) {
    // Relative URL so it works under any base href (e.g. /cv-web/ on GitHub Pages).
    return this.http.get<Translation>(`i18n/${lang}.json`);
  }
}
