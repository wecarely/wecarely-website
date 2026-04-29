/**
 * City registry — single source of truth for cities WeCarely indexes
 * (or plans to). Used by:
 *   - Header city dropdown
 *   - ExploreSearches city pill bar on the home page
 *
 * To launch a new city: switch its `status` to 'live' here. The Header
 * dropdown will start linking to /{slug}; ExploreSearches will let users
 * pivot to it. ExploreSearches separately controls the popular-search
 * groups for live cities.
 */

export type CityStatus = 'live' | 'coming-soon';

export interface City {
  slug: string;
  name: string;
  status: CityStatus;
}

export const CITIES: City[] = [
  { slug: 'houston',     name: 'Houston',     status: 'live' },
  { slug: 'dallas',      name: 'Dallas',      status: 'coming-soon' },
  { slug: 'austin',      name: 'Austin',      status: 'coming-soon' },
  { slug: 'san-antonio', name: 'San Antonio', status: 'coming-soon' },
  { slug: 'fort-worth',  name: 'Fort Worth',  status: 'coming-soon' },
  { slug: 'el-paso',     name: 'El Paso',     status: 'coming-soon' },
  { slug: 'arlington',   name: 'Arlington',   status: 'coming-soon' },
];

export const LIVE_CITIES = CITIES.filter((c) => c.status === 'live');
export const COMING_SOON_CITIES = CITIES.filter((c) => c.status === 'coming-soon');
