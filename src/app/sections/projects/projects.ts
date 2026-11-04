import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { content, isPending } from '../../core/i18n/content';
import { Icon } from '../../shared/icon/icon';

interface Screenshot {
  src: string;
  alt: string;
}

interface CaseStudy {
  name: string;
  meta: string;
  problem: string;
  solution: string;
  tags: string[];
  highlights: string[];
  screenshots: Screenshot[];
  diagram: Record<
    'label' | 'client' | 'clientDetail' | 'api' | 'apiDetail' | 'db' | 'dbDetail' | 'infra',
    string
  > & {
    /** Hexagonal layers, outermost first. */
    layers: string[];
  };
}

interface Project {
  name: string;
  badge: string;
  meta: string;
  text: string;
  tags: string[];
  link: string;
}

@Component({
  selector: 'app-projects',
  imports: [TranslocoDirective, Icon],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Projects {
  protected readonly caseStudy = content<CaseStudy>('projects.eventPlatform');
  protected readonly projects = content<Project[]>('projects.items');
  protected readonly isPending = isPending;
  /** Placeholders shown until real screenshots are added. */
  protected readonly placeholderSlots = [1, 2];
}
