import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';
import { content } from '../../core/i18n/content';
import { Icon } from '../../shared/icon/icon';

export interface Role {
  role: string;
  company: string;
  period: string;
  text: string;
}

@Component({
  selector: 'app-experience',
  imports: [TranslocoDirective, NgTemplateOutlet, Icon],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Experience {
  protected readonly tech = content<Role[]>('experience.tech');
  protected readonly hospitality = content<Role[]>('experience.hospitality.items');
}
