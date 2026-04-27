import en from './en.json';

type TranslationKey = keyof typeof en;

/**
 * Minimal i18n function. Day 7: English only.
 * Day 8+: swap `en` for a locale-aware loader.
 */
export function t(key: TranslationKey, vars?: Record<string, string | number>): string {
  let s: string = en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(`{${k}}`, String(v));
    }
  }
  return s;
}
