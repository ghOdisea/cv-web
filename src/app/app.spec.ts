import { TestBed } from '@angular/core/testing';
import { TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';
import { provideTranslocoTesting } from '../testing/transloco-testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideTranslocoTesting()],
    }).compileComponents();
    await firstValueFrom(TestBed.inject(TranslocoService).load('en'));
  });

  it('renders the header navigation and main landmark', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('nav')?.getAttribute('aria-label')).toBe('Main navigation');
    expect(el.querySelectorAll('nav a[href^="#"]').length).toBe(7);
    expect(el.querySelector('main#main')).toBeTruthy();
  });

  it('marks the active language in the switcher', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const pressed = (fixture.nativeElement as HTMLElement).querySelector(
      '.lang-switch [aria-pressed="true"]',
    );

    expect(pressed?.textContent?.trim()).toBe('EN');
  });
});

describe('App sections', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideTranslocoTesting()],
    }).compileComponents();
    await firstValueFrom(TestBed.inject(TranslocoService).load('en'));
  });

  it('renders the hero with external links and the 5 path milestones', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h1')?.textContent).toContain('Gonzalo Fourtané');
    const external = el.querySelectorAll('.hero a[target="_blank"]');
    expect(external.length).toBe(2);
    external.forEach((a) => expect(a.getAttribute('rel')).toBe('noopener noreferrer'));
    expect(el.querySelector('.hero a[href^="mailto:"]')).toBeTruthy();
    expect(el.querySelectorAll('#path .timeline__item').length).toBe(5);
  });

  it('renders tech roles, collapsed hospitality and the private case study without code link', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('#experience > .container > .roles > .role').length).toBe(3);
    const [hospitality, industry] = Array.from(
      el.querySelectorAll<HTMLDetailsElement>('#experience details'),
    );
    expect(hospitality.open).toBe(false);
    expect(hospitality.querySelectorAll('.role').length).toBe(3);
    expect(industry.open).toBe(false);
    expect(industry.textContent).toContain('AutoCAD');
    expect(el.querySelector('.hero__status')?.textContent).toContain('Open to work');

    const caseStudy = el.querySelector('#projects .case');
    expect(caseStudy?.textContent).toContain('Event Organization Platform');
    expect(caseStudy?.querySelector('a')).toBeNull();
    expect(el.querySelectorAll('#projects .project').length).toBe(2);
  });

  it('renders transferable skills table and grouped skills', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('#transferable tbody tr').length).toBe(5);
    expect(el.querySelectorAll('#skills .group').length).toBe(6);
    expect(el.querySelector('#skills')?.textContent).toContain('Entra ID');
  });

  it('renders education, certifications and languages', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('#education .item').length).toBe(8);
    expect(el.querySelector('#education .item--cert')?.textContent).toContain('SC-900');
    expect(el.querySelectorAll('#languages .lang').length).toBe(4);
  });
});
