import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { content } from '../../core/i18n/content';

interface SkillGroup {
  /** i18n key under `skills.` for the group title. */
  key: 'm365' | 'backend' | 'devops' | 'methodologies' | 'familiar';
  items: readonly string[];
  /** Still to be confirmed by the owner. */
  pending?: boolean;
}

const SKILL_GROUPS: readonly SkillGroup[] = [
  { key: 'm365', items: ['Exchange Online', 'Entra ID', 'Intune', 'Defender', 'Purview', 'Azure'] },
  {
    key: 'backend',
    items: ['TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'REST APIs', 'Hexagonal Architecture', 'Socket.io'],
  },
  {
    key: 'devops',
    items: ['Docker', 'Git', 'GitHub Actions (CI/CD)', 'Linux', 'PowerShell', 'Bash', 'SMTP'],
  },
  { key: 'methodologies', items: ['Agile (Scrum)'] },
  // PENDING: confirm before publishing ("solo si es cierto").
  { key: 'familiar', items: ['Python', 'Angular', 'Go (intro)'], pending: true },
];

@Component({
  selector: 'app-skills',
  imports: [TranslocoDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Skills {
  protected readonly groups = SKILL_GROUPS;
  protected readonly soft = content<string[]>('skills.softItems');
}
