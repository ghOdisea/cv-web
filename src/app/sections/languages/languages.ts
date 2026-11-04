import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { content } from '../../core/i18n/content';

interface SpokenLanguage {
  name: string;
  level: string;
}

@Component({
  selector: 'app-languages',
  imports: [TranslocoDirective],
  template: `
    <section id="languages" class="section" aria-labelledby="languages-title" *transloco="let t">
      <div class="container">
        <h2 id="languages-title" class="section__title">{{ t('languages.title') }}</h2>
        <dl class="langs">
          @for (l of languages(); track $index) {
            <div class="card lang">
              <dt>{{ l.name }}</dt>
              <dd class="muted">{{ l.level }}</dd>
            </div>
          }
        </dl>
      </div>
    </section>
  `,
  styles: `
    .langs {
      display: grid;
      gap: var(--space-4);
      grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
    }
    .lang {
      padding: var(--space-4) var(--space-6);
    }
    dt {
      font-weight: 700;
    }
    dd {
      font-size: var(--fs-sm);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Languages {
  protected readonly languages = content<SpokenLanguage[]>('languages.items');
}
