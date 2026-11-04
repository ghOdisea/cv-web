import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { content } from '../../core/i18n/content';

interface Milestone {
  period: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-path',
  imports: [TranslocoDirective],
  templateUrl: './path.html',
  styleUrl: './path.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Path {
  protected readonly milestones = content<Milestone[]>('path.items');
}
