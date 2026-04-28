import { createServerClient } from './server';
import type { Agency } from '@/lib/types/agency';
import { filterParamsToColumns, type FilterState } from '@/lib/utils/filter-params';

const SELECT_COLUMNS = `
  id, slug, name, city, state, zip, phone, website,
  medicare_star, google_rating, google_reviews_count, trust_score,
  has_spanish, has_vietnamese, has_chinese,
  accepts_medicare, accepts_medicaid,
  has_skilled_nursing, has_home_health_aide, has_personal_care,
  has_companion_care, has_physical_therapy, has_occupational_therapy,
  has_speech_therapy, has_dementia_care, has_hospice,
  ai_summary
`;

interface QueryArgs {
  filters: FilterState;
  query?: string | null;
}

/**
 * Fetch Houston agencies, optionally filtered by user-selected booleans
 * and/or free-text query (substring match against name + ai_summary).
 * Sorted by trust_score DESC.
 */
export async function getHoustonAgencies(args: QueryArgs): Promise<Agency[]> {
  const sb = createServerClient();
  const columns = filterParamsToColumns(args.filters);

  let query = sb
    .from('agencies')
    .select(SELECT_COLUMNS)
    .ilike('city', 'houston')
    .order('trust_score', { ascending: false, nullsFirst: false });

  for (const col of columns) {
    query = query.eq(col, true);
  }

  // Free-text search: name OR ai_summary substring (case-insensitive)
  const q = args.query?.trim();
  if (q) {
    // Sanitize for PostgREST .or() syntax — escape commas
    const safe = q.replace(/[%,]/g, '');
    query = query.or(`name.ilike.%${safe}%,ai_summary.ilike.%${safe}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error('[getHoustonAgencies]', error);
    return [];
  }
  return (data ?? []) as unknown as Agency[];
}
