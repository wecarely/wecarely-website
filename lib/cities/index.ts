/**
 * City registry + per-city config — single source of truth for cities
 * WeCarely indexes (or plans to). Every place that asks "is Dallas live?"
 * or "what neighborhoods does Houston have?" reads from here.
 *
 * To launch a new city:
 *   1. Add a `lib/cities/<slug>.ts` file exporting a CityConfig
 *   2. Import it below and add to CITIES array
 *   3. Make sure the agencies table has rows where city = <slug>
 *      (case-insensitive — queries use ilike)
 */

import { HOUSTON_CONFIG } from './houston';
import { DALLAS_CONFIG } from './dallas';
import { SAN_ANTONIO_CONFIG } from './san-antonio';

export type CityStatus = 'live' | 'coming-soon';

export interface Neighborhood {
  slug: string;
  /** Display name (used in headlines, metadata, breadcrumbs) */
  name: string;
  /** ZIPs in this area. ZIP→neighborhood is many-to-one. */
  zips: string[];
  /** 1-2 sentence intro shown on the page (also used in meta description). */
  intro: string;
  /** Common alternative search terms this page should rank for. */
  alsoKnownAs?: string[];
}

export interface CityConfig {
  slug: string;
  name: string;
  state: string;
  status: CityStatus;
  /** Free-text intro for landing pages / meta description. */
  intro: string;
  neighborhoods: Neighborhood[];
}

export const CITIES: CityConfig[] = [HOUSTON_CONFIG, DALLAS_CONFIG, SAN_ANTONIO_CONFIG];

export const LIVE_CITIES = CITIES.filter((c) => c.status === 'live');
export const COMING_SOON_CITIES = CITIES.filter((c) => c.status === 'coming-soon');

export function getCityConfig(slug: string): CityConfig | null {
  return CITIES.find((c) => c.slug === slug) ?? null;
}

export function isLiveCity(slug: string): boolean {
  const c = getCityConfig(slug);
  return c?.status === 'live';
}

/** Look up a neighborhood by city slug + neighborhood slug. */
export function findNeighborhood(
  citySlug: string,
  neighborhoodSlug: string
): Neighborhood | null {
  const city = getCityConfig(citySlug);
  return city?.neighborhoods.find((n) => n.slug === neighborhoodSlug) ?? null;
}

/** Find the named neighborhood (if any) that includes a given ZIP for a city. */
export function neighborhoodForZip(
  citySlug: string,
  zip: string | null | undefined
): Neighborhood | null {
  if (!zip) return null;
  const city = getCityConfig(citySlug);
  return city?.neighborhoods.find((n) => n.zips.includes(zip)) ?? null;
}
