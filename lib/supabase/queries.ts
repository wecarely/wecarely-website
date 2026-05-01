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
  citySlug: string;
  filters: FilterState;
  query?: string | null;
}

/**
 * Fetch agencies in a city, optionally filtered by user-selected booleans
 * and/or free-text query (substring match against name + ai_summary).
 * Sorted by trust_score DESC.
 *
 * citySlug is matched case-insensitively against the agencies.city column
 * (DB stores 'HOUSTON', 'DALLAS', etc.; we pass slugs like 'houston').
 */
export async function getAgenciesByCity(args: QueryArgs): Promise<Agency[]> {
  const sb = createServerClient();
  const columns = filterParamsToColumns(args.filters);

  let query = sb
    .from('agencies')
    .select(SELECT_COLUMNS)
    .ilike('city', args.citySlug)
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
    console.error('[getAgenciesByCity]', error);
    return [];
  }
  return (data ?? []) as unknown as Agency[];
}

/**
 * Fetch a single agency by slug within a city. Returns null if not found.
 * Scoping by city avoids cross-city slug collisions.
 */
export async function getAgencyBySlug(citySlug: string, slug: string): Promise<Agency | null> {
  const sb = createServerClient();
  const { data, error } = await sb
    .from('agencies')
    .select(SELECT_COLUMNS)
    .ilike('city', citySlug)
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('[getAgencyBySlug]', error);
    return null;
  }
  return (data ?? null) as unknown as Agency | null;
}

/**
 * Fetch agencies in a city whose ZIP is in the given list. Used by
 * neighborhood landing pages (`/{city}/area/{slug}`) to render an
 * area-filtered listing without query params (clean URL for SEO).
 */
export async function getAgenciesByZips(citySlug: string, zips: string[]): Promise<Agency[]> {
  if (zips.length === 0) return [];
  const sb = createServerClient();
  const { data, error } = await sb
    .from('agencies')
    .select(SELECT_COLUMNS)
    .ilike('city', citySlug)
    .in('zip', zips)
    .order('trust_score', { ascending: false, nullsFirst: false });

  if (error) {
    console.error('[getAgenciesByZips]', error);
    return [];
  }
  return (data ?? []) as unknown as Agency[];
}

/**
 * Fetch active sponsored agencies in a city, ordered by sponsor_priority
 * (1 = top slot, 2 = second, etc.). Used by SponsoredCarousel.
 *
 * Returns 0 to 4 sponsors. Caller pads with placeholder slots up to 4 total.
 */
export async function getSponsoredAgencies(citySlug: string): Promise<Agency[]> {
  const sb = createServerClient();
  const { data, error } = await sb
    .from('agencies')
    .select(SELECT_COLUMNS)
    .ilike('city', citySlug)
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
 * Total agency count for a city (unfiltered). Used by city landing page
 * hero stat ("259 agencies indexed") so the number stays correct as
 * data grows or new cities go live.
 */
export async function getCityAgencyCount(citySlug: string): Promise<number> {
  const sb = createServerClient();
  const { count, error } = await sb
    .from('agencies')
    .select('*', { count: 'exact', head: true })
    .ilike('city', citySlug);

  if (error) {
    console.error('[getCityAgencyCount]', error);
    return 0;
  }
  return count ?? 0;
}

/**
 * Fetch slugs of all agencies in a city. Used by sitemap.ts to generate
 * /{city}/{slug} URLs for every indexed agency.
 */
export async function getAllSlugsByCity(citySlug: string): Promise<string[]> {
  const sb = createServerClient();
  const { data, error } = await sb
    .from('agencies')
    .select('slug')
    .ilike('city', citySlug);

  if (error) {
    console.error('[getAllSlugsByCity]', error);
    return [];
  }
  return (data ?? []).map((r) => r.slug as string).filter(Boolean);
}
