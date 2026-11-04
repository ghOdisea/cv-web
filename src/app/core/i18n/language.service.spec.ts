import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@jsverse/transloco';
import { provideTranslocoTesting } from '../../../testing/transloco-testing';
import { LANG_STORAGE_KEY } from './languages';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  function setup(): LanguageService {
    TestBed.configureTestingModule({ providers: [provideTranslocoTesting()] });
    return TestBed.inject(LanguageService);
  }

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = '';
  });

  afterEach(() => vi.restoreAllMocks());

  it('uses the stored language on init', async () => {
    localStorage.setItem(LANG_STORAGE_KEY, 'es');
    const service = setup();
    await service.init();

    expect(service.lang()).toBe('es');
    expect(TestBed.inject(TranslocoService).getActiveLang()).toBe('es');
    expect(document.documentElement.lang).toBe('es');
  });

  it('defaults to the browser language when nothing is stored', async () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['es-AR', 'en']);
    const service = setup();
    await service.init();

    expect(service.lang()).toBe('es');
  });

  it('falls back to English for unsupported browser languages', async () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['de-DE']);
    const service = setup();
    await service.init();

    expect(service.lang()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });

  it('switches language, persists it and updates <html lang> and title', async () => {
    vi.spyOn(navigator, 'languages', 'get').mockReturnValue(['en-US']);
    const service = setup();
    await service.init();

    await service.setLang('es');

    expect(service.lang()).toBe('es');
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('es');
    expect(document.documentElement.lang).toBe('es');
    expect(TestBed.inject(Title).getTitle()).toContain('Back End Developer');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toContain(
      'especializado',
    );
  });

  it('does not persist the automatically detected language', async () => {
    const service = setup();
    await service.init();

    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBeNull();
  });
});
