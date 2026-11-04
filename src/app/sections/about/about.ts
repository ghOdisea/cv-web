import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-about',
  imports: [TranslocoDirective],
  template: `
    <section id="about" class="section" aria-labelledby="about-title" *transloco="let t">
      <div class="container">
        <h2 id="about-title" class="section__title">{{ t('about.title') }}</h2>
        <p class="about__text">{{ t('about.text') }}</p>
      </div>
    </section>
  `,
  styles: `
    .about__text {
      max-width: 46rem;
      font-size: var(--fs-lg);
      line-height: 1.75;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
