import { detectLang } from './languages';

describe('detectLang', () => {
  it('prefers a valid stored language', () => {
    expect(detectLang('es', ['en-US'])).toBe('es');
  });

  it('ignores an invalid stored value and uses the browser language', () => {
    expect(detectLang('fr', ['es-ES', 'en'])).toBe('es');
  });

  it('uses the first supported browser language', () => {
    expect(detectLang(null, ['de-DE', 'en-GB', 'es'])).toBe('en');
  });

  it('falls back to English', () => {
    expect(detectLang(null, ['de-DE', 'ca'])).toBe('en');
    expect(detectLang(null, [])).toBe('en');
  });
});
