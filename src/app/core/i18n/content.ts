import { Signal } from '@angular/core';
import { translateObjectSignal } from '@jsverse/transloco';

/**
 * Typed signal with structured (non-string) content from the active translation,
 * e.g. arrays of experience entries. Must be called in an injection context.
 */
export function content<T>(key: string): Signal<T> {
  return translateObjectSignal(key) as unknown as Signal<T>;
}
