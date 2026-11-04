import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type IconName =
  | 'linkedin'
  | 'github'
  | 'mail'
  | 'download'
  | 'copy'
  | 'check'
  | 'chevron'
  | 'lock'
  | 'external';

/** Decorative inline SVG icon (always aria-hidden; label the parent control instead). */
@Component({
  selector: 'app-icon',
  templateUrl: './icon.html',
  styles: `
    :host {
      display: inline-flex;
      flex: none;
    }
    svg {
      width: 1.15em;
      height: 1.15em;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true' },
})
export class Icon {
  readonly name = input.required<IconName>();
}
