import { ChangeDetectionStrategy, Component, computed, DestroyRef, DOCUMENT, inject, signal } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { content } from '../../core/i18n/content';
import { getEmail, mailtoHref, PROFILE } from '../../core/profile';
import { Icon } from '../../shared/icon/icon';

type CopyState = 'idle' | 'copied' | 'failed';

@Component({
  selector: 'app-contact',
  imports: [TranslocoDirective, Icon],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  private readonly document = inject(DOCUMENT);
  private readonly subject = content<string>('contact.emailSubject');
  private resetTimer?: ReturnType<typeof setTimeout>;

  protected readonly profile = PROFILE;
  /** Built at runtime so the address is not in the static HTML. */
  protected readonly email = getEmail();
  protected readonly mailto = computed(() => mailtoHref(this.subject()));
  protected readonly copyState = signal<CopyState>('idle');
  protected readonly year = new Date().getFullYear();

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.resetTimer));
  }

  async copyEmail(): Promise<void> {
    try {
      await this.document.defaultView!.navigator.clipboard.writeText(this.email);
      this.copyState.set('copied');
    } catch {
      this.copyState.set('failed');
    }
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => this.copyState.set('idle'), 3000);
  }
}
