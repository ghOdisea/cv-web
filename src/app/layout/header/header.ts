import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { LANG_LABELS, LANGS, Lang } from '../../core/i18n/languages';
import { LanguageService } from '../../core/i18n/language.service';
import { NAV_SECTIONS } from '../../core/sections';

@Component({
  selector: 'app-header',
  imports: [TranslocoDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'closeMenu()' },
})
export class Header {
  protected readonly language = inject(LanguageService);
  protected readonly sections = NAV_SECTIONS;
  protected readonly langs = LANGS;
  protected readonly langLabels = LANG_LABELS;
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected setLang(lang: Lang): void {
    void this.language.setLang(lang);
  }
}
