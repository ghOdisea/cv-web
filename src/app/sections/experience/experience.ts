import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { content } from '../../core/i18n/content';
import { Icon } from '../../shared/icon/icon';

export interface Role {
  role: string;
  company: string;
  period: string;
  text: string;
}

/** Collapsible block for experience outside tech (hospitality, industry). */
export interface RoleGroup {
  summary: string;
  hint: string;
  items: Role[];
  earlierTitle?: string;
  earlier?: string;
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
  protected readonly hospitality = content<RoleGroup>('experience.hospitality');
  protected readonly industry = content<RoleGroup>('experience.industry');
}
