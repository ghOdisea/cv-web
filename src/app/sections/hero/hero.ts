import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { LanguageService } from '../../core/i18n/language.service';
import { CV_PDF_AVAILABLE, cvPdfPath, mailtoHref, OPEN_TO_WORK, PROFILE } from '../../core/profile';
import { Icon } from '../../shared/icon/icon';
import { content } from '../../core/i18n/content';

@Component({
  selector: 'app-hero',
  imports: [TranslocoDirective, Icon],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Hero {
  private readonly language = inject(LanguageService);
  private readonly subject = content<string>('contact.emailSubject');

  protected readonly profile = PROFILE;
  protected readonly openToWork = OPEN_TO_WORK;
  protected readonly mailto = computed(() => mailtoHref(this.subject()));
  protected readonly cvPdf = computed(() => {
    const lang = this.language.lang();
    return CV_PDF_AVAILABLE[lang] ? cvPdfPath(lang) : null;
  });
}
