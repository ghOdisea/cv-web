import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import { provideTranslocoTesting } from '../../../testing/transloco-testing';
import { PROFILE } from '../../core/profile';
import { Contact } from './contact';

const EMAIL = 'gonzalo.fourtane@gmail.com';

describe('Contact', () => {
  let fixture: ComponentFixture<Contact>;
  let el: HTMLElement;
  let writeText: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });

    await TestBed.configureTestingModule({
      imports: [Contact],
      providers: [provideTranslocoTesting()],
    }).compileComponents();
    await firstValueFrom(TestBed.inject(TranslocoService).load('en'));

    fixture = TestBed.createComponent(Contact);
    await fixture.whenStable();
    el = fixture.nativeElement as HTMLElement;
  });

  afterEach(() => vi.useRealTimers());

  it('shows the email with a mailto link and a prefilled subject', () => {
    const link = el.querySelector<HTMLAnchorElement>('.contact__address')!;
    expect(link.textContent?.trim()).toBe(EMAIL);
    expect(link.getAttribute('href')).toBe(
      `mailto:${EMAIL}?subject=${encodeURIComponent('Contact from your CV website')}`,
    );
  });

  it('updates the mailto subject when the language changes', async () => {
    const transloco = TestBed.inject(TranslocoService);
    await firstValueFrom(transloco.load('es'));
    transloco.setActiveLang('es');
    await fixture.whenStable();

    const href = el.querySelector('.contact__address')!.getAttribute('href')!;
    expect(decodeURIComponent(href)).toContain('Contacto desde tu web CV');
  });

  it('opens LinkedIn and GitHub safely in a new tab with accessible labels', () => {
    const links = Array.from(el.querySelectorAll<HTMLAnchorElement>('.contact__social a'));
    expect(links.map((a) => a.getAttribute('href'))).toEqual([PROFILE.linkedin, PROFILE.github]);
    for (const a of links) {
      expect(a.target).toBe('_blank');
      expect(a.rel).toBe('noopener noreferrer');
      expect(a.getAttribute('aria-label')).toBeTruthy();
    }
  });

  it('copies the email and announces it', async () => {
    el.querySelector<HTMLButtonElement>('.contact__email-actions button')!.click();
    await fixture.whenStable();

    expect(writeText).toHaveBeenCalledWith(EMAIL);
    expect(el.querySelector('[role="status"]')?.textContent).toContain('Email copied');
  });

  it('announces a failure when the clipboard is unavailable', async () => {
    writeText.mockRejectedValue(new Error('denied'));
    await fixture.componentInstance.copyEmail();
    await fixture.whenStable();

    expect(el.querySelector('[role="status"]')?.textContent).toContain('Could not copy');
  });

  it('clears the status message after a few seconds', async () => {
    vi.useFakeTimers();
    await fixture.componentInstance.copyEmail();
    vi.advanceTimersByTime(3000);
    await fixture.whenStable();

    expect(el.querySelector('[role="status"]')?.textContent?.trim()).toBe('');
  });
});
