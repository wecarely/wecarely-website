import { FILTERS } from '@/lib/constants/filters';

export interface FilterState {
  lang: string[];
  ins: string[];
  svc: string[];
}

/**
 * Parse Next.js searchParams into a FilterState.
 * Supports comma-separated values: ?lang=spanish,vietnamese
 */
export function parseFilterParams(params: URLSearchParams): FilterState {
  const get = (key: string): string[] =>
    params.get(key)?.split(',').filter(Boolean) ?? [];
  return {
    lang: get('lang'),
    ins: get('ins'),
    svc: get('svc'),
  };
}

/**
 * Convert active filter keys into actual Supabase column names.
 * Unknown keys are silently dropped.
 */
export function filterParamsToColumns(state: FilterState): string[] {
  const allKeys = [...state.lang, ...state.ins, ...state.svc];
  return allKeys
    .map((key) => FILTERS.find((f) => f.key === key)?.column)
    .filter((c): c is string => Boolean(c));
}
