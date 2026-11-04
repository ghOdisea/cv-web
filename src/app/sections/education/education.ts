import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { content } from '../../core/i18n/content';

interface Course {
  name: string;
  org: string;
  period: string;
}

@Component({
  selector: 'app-education',
  imports: [TranslocoDirective],
  templateUrl: './education.html',
  styleUrl: './education.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Education {
  protected readonly education = content<Course[]>('education.items');
  protected readonly certifications = content<Course[]>('education.certifications');
}
