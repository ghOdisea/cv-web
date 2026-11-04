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

  it('renders the hero with external links and the 4 path milestones', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h1')?.textContent).toContain('Gonzalo Fourtané');
    const external = el.querySelectorAll('.hero a[target="_blank"]');
    expect(external.length).toBe(2);
    external.forEach((a) => expect(a.getAttribute('rel')).toBe('noopener noreferrer'));
    expect(el.querySelector('.hero a[href^="mailto:"]')).toBeTruthy();
    expect(el.querySelectorAll('#path .timeline__item').length).toBe(4);
  });
});
