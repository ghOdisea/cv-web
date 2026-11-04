import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { content } from '../../core/i18n/content';

@Component({
  selector: 'app-transferable',
  imports: [TranslocoDirective],
  templateUrl: './transferable.html',
  styleUrl: './transferable.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Transferable {
  /** Each row: [hospitality, tech]. */
  protected readonly rows = content<[string, string][]>('transferable.rows');
}
