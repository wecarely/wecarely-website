import { createServerClient } from './server';
import type { Agency } from '@/lib/types/agency';
import { filterParamsToColumns, type FilterState } from '@/lib/utils/filter-params';

const SELECT_COLUMNS = `
  id, slug, name, address, city, state, zip, phone, website,
  medicare_star, google_rating, google_reviews_count, trust_score,
  has_spanish, has_vietnamese, has_chinese,
  accepts_medicare, accepts_medicaid,
  has_skilled_nursing, has_home_health_aide, has_personal_care,
  has_companion_care, has_physical_therapy, has_occupational_therapy,
  has_speech_therapy, has_dementia_care, has_hospice,
  ai_summary, google_opening_hours,
  is_sponsored, sponsor_logo_url, sponsor_hours, sponsor_tagline, sponsor_priority
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

/**
 * Fetch a single Houston agency by slug. Returns null if not found.
 * Used by /houston/[slug] detail pages.
 */
export async function getAgencyBySlug(slug: string): Promise<Agency | null> {
  const sb = createServerClient();
  const { data, error } = await sb
    .from('agencies')
    .select(SELECT_COLUMNS)
    .ilike('city', 'houston')
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('[getAgencyBySlug]', error);
    return null;
  }
  return (data ?? null) as unknown as Agency | null;
}

/**
 * Fetch active sponsored agencies in Houston, ordered by sponsor_priority
 * (1 = top slot, 2 = second, etc.). Used by SponsoredCarousel on / and
 * /houston to render real sponsors mixed with placeholder slots.
 *
 * Returns 0 to 4 sponsors. Caller pads with placeholder slots up to 4 total.
 */
export async function getSponsoredAgencies(): Promise<Agency[]> {
  const sb = createServerClient();
  const { data, error } = await sb
    .from('agencies')
    .select(SELECT_COLUMNS)
    .ilike('city', 'houston')
    .eq('is_sponsored', true)
    .order('sponsor_priority', { ascending: true, nullsFirst: false })
    .limit(4);

  if (error) {
    console.error('[getSponsoredAgencies]', error);
    return [];
  }
  return (data ?? []) as unknown as Agency[];
}

/**
 * Fetch slugs of all Houston agencies. Used by sitemap.ts to generate
 * /houston/[slug] URLs for every indexed agency.
 */
export async function getAllHoustonSlugs(): Promise<string[]> {
  const sb = createServerClient();
  const { data, error } = await sb
    .from('agencies')
    .select('slug')
    .ilike('city', 'houston');

  if (error) {
    console.error('[getAllHoustonSlugs]', error);
    return [];
  }
  return (data ?? []).map((r) => r.slug as string).filter(Boolean);
}
