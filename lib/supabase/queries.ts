import { createServerClient } from './server';
import type { Agency } from '@/lib/types/agency';
import { filterParamsToColumns, type FilterState } from '@/lib/utils/filter-params';

const SELECT_COLUMNS = `
  id, slug, name, city, state, zip, phone, website,
  medicare_star, google_rating, google_reviews_count, trust_score,
  has_spanish, has_vietnamese, has_chinese,
  accepts_medicare, accepts_medicaid,
  has_skilled_nursing, has_dementia_care, has_hospice,
  ai_summary
`;

/**
 * Fetch Houston agencies, optionally filtered by user-selected boolean filters.
 * Sorted by trust_score DESC (nullsFirst: false → null trust_score lands at the bottom).
 */
export async function getHoustonAgencies(filters: FilterState): Promise<Agency[]> {
  const sb = createServerClient();
  const columns = filterParamsToColumns(filters);

  let query = sb
    .from('agencies')
    .select(SELECT_COLUMNS)
    .eq('city', 'Houston')
    .order('trust_score', { ascending: false, nullsFirst: false });

  for (const col of columns) {
    query = query.eq(col, true);
  }

  const { data, error } = await query;
  if (error) {
    console.error('[getHoustonAgencies]', error);
    return [];
  }
  return (data ?? []) as unknown as Agency[];
}
