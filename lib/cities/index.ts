/**
 * City registry + per-city config — single source of truth for cities
 * WeCarely indexes (or plans to). Every place that asks "is Dallas live?"
 * or "what neighborhoods does Houston have?" reads from here.
 *
 * To launch a new city:
 *   1. Run: python city_pipeline.py --city "City Name"
 *   2. Set the city's CityConfig status → 'live' in its config file
 *   3. git push → Vercel deploys automatically
 */

import { HOUSTON_CONFIG } from './houston';
import { DALLAS_CONFIG } from './dallas';
import { SAN_ANTONIO_CONFIG } from './san-antonio';
import { EL_PASO_CONFIG } from './el-paso';
import { AUSTIN_CONFIG } from './austin';
import { FORT_WORTH_CONFIG } from './fort-worth';
import { GARLAND_CONFIG } from './garland';
import { PLANO_CONFIG } from './plano';
import { RICHARDSON_CONFIG } from './richardson';
import { CARROLLTON_CONFIG } from './carrollton';
import {
  GLENDALE_CA_CONFIG,
  VAN_NUYS_CONFIG,
  BURBANK_CONFIG,
  LOS_ANGELES_CONFIG,
  NORTH_HOLLYWOOD_CONFIG,
  SHERMAN_OAKS_CONFIG,
  PASADENA_CA_CONFIG,
  ENCINO_CONFIG,
  WOODLAND_HILLS_CONFIG,
  NORTHRIDGE_CONFIG,
  SAN_DIEGO_CONFIG,
  FRESNO_CONFIG,
  SACRAMENTO_CONFIG,
  SAN_JOSE_CA_CONFIG,
  SAN_FRANCISCO_CONFIG,
  OAKLAND_CONFIG,
  LONG_BEACH_CONFIG,
  RIVERSIDE_CA_CONFIG,
  SANTA_ANA_CONFIG,
} from './california';
import {
  MIAMI_CONFIG,
  TAMPA_CONFIG,
  JACKSONVILLE_FL_CONFIG,
  ORLANDO_CONFIG,
  BOCA_RATON_CONFIG,
  FORT_MYERS_CONFIG,
  WEST_PALM_BEACH_CONFIG,
  MIAMI_LAKES_CONFIG,
  DORAL_CONFIG,
  CLEARWATER_CONFIG,
  FORT_LAUDERDALE_CONFIG,
  HIALEAH_CONFIG,
  HOLLYWOOD_FL_CONFIG,
  BOYNTON_BEACH_CONFIG,
  SARASOTA_CONFIG,
} from './florida';
import {
  CHICAGO_CONFIG,
  DES_PLAINES_CONFIG,
  SKOKIE_CONFIG,
  LINCOLNWOOD_CONFIG,
  NORTHBROOK_CONFIG,
  LOMBARD_CONFIG,
  TINLEY_PARK_CONFIG,
  ARLINGTON_HEIGHTS_IL_CONFIG,
  SCHAUMBURG_CONFIG,
  NAPERVILLE_CONFIG,
} from './illinois';
import {
  ARLINGTON_CONFIG,
  MESQUITE_CONFIG,
  LAREDO_CONFIG,
  MCALLEN_CONFIG,
  SUGAR_LAND_CONFIG,
  CORPUS_CHRISTI_CONFIG,
  STAFFORD_CONFIG,
  IRVING_CONFIG,
  KATY_CONFIG,
  RICHMOND_CONFIG,
  MISSOURI_CITY_CONFIG,
  GRAND_PRAIRIE_CONFIG,
  BROWNSVILLE_CONFIG,
  TYLER_CONFIG,
  LEWISVILLE_CONFIG,
  BEAUMONT_CONFIG,
  LUBBOCK_CONFIG,
  LONGVIEW_CONFIG,
  EDINBURG_CONFIG,
  WICHITA_FALLS_CONFIG,
  HARLINGEN_CONFIG,
  ALICE_CONFIG,
  SHERMAN_CONFIG,
  ROUND_ROCK_CONFIG,
  LUFKIN_CONFIG,
  AMARILLO_CONFIG,
  WESLACO_CONFIG,
  DUNCANVILLE_CONFIG,
} from './texas-cities';

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

export const CITIES: CityConfig[] = [
  // Live cities
  HOUSTON_CONFIG,
  DALLAS_CONFIG,
  // Texas — major metros
  SAN_ANTONIO_CONFIG,
  EL_PASO_CONFIG,
  AUSTIN_CONFIG,
  FORT_WORTH_CONFIG,
  // Texas — DFW suburbs
  GARLAND_CONFIG,
  PLANO_CONFIG,
  RICHARDSON_CONFIG,
  CARROLLTON_CONFIG,
  ARLINGTON_CONFIG,
  MESQUITE_CONFIG,
  IRVING_CONFIG,
  GRAND_PRAIRIE_CONFIG,
  LEWISVILLE_CONFIG,
  DUNCANVILLE_CONFIG,
  // Texas — Houston suburbs
  SUGAR_LAND_CONFIG,
  STAFFORD_CONFIG,
  KATY_CONFIG,
  RICHMOND_CONFIG,
  MISSOURI_CITY_CONFIG,
  // Texas — South Texas / Rio Grande Valley
  LAREDO_CONFIG,
  MCALLEN_CONFIG,
  BROWNSVILLE_CONFIG,
  EDINBURG_CONFIG,
  HARLINGEN_CONFIG,
  WESLACO_CONFIG,
  ALICE_CONFIG,
  // Texas — other metros
  CORPUS_CHRISTI_CONFIG,
  TYLER_CONFIG,
  BEAUMONT_CONFIG,
  LUBBOCK_CONFIG,
  LONGVIEW_CONFIG,
  WICHITA_FALLS_CONFIG,
  SHERMAN_CONFIG,
  ROUND_ROCK_CONFIG,
  LUFKIN_CONFIG,
  AMARILLO_CONFIG,
  // California — coming soon
  GLENDALE_CA_CONFIG,
  VAN_NUYS_CONFIG,
  BURBANK_CONFIG,
  LOS_ANGELES_CONFIG,
  NORTH_HOLLYWOOD_CONFIG,
  SHERMAN_OAKS_CONFIG,
  PASADENA_CA_CONFIG,
  ENCINO_CONFIG,
  WOODLAND_HILLS_CONFIG,
  NORTHRIDGE_CONFIG,
  SAN_DIEGO_CONFIG,
  FRESNO_CONFIG,
  SACRAMENTO_CONFIG,
  SAN_JOSE_CA_CONFIG,
  SAN_FRANCISCO_CONFIG,
  OAKLAND_CONFIG,
  LONG_BEACH_CONFIG,
  RIVERSIDE_CA_CONFIG,
  SANTA_ANA_CONFIG,
  // Florida
  MIAMI_CONFIG,
  TAMPA_CONFIG,
  JACKSONVILLE_FL_CONFIG,
  ORLANDO_CONFIG,
  BOCA_RATON_CONFIG,
  FORT_MYERS_CONFIG,
  WEST_PALM_BEACH_CONFIG,
  MIAMI_LAKES_CONFIG,
  DORAL_CONFIG,
  CLEARWATER_CONFIG,
  FORT_LAUDERDALE_CONFIG,
  HIALEAH_CONFIG,
  HOLLYWOOD_FL_CONFIG,
  BOYNTON_BEACH_CONFIG,
  SARASOTA_CONFIG,
  // Illinois
  CHICAGO_CONFIG,
  DES_PLAINES_CONFIG,
  SKOKIE_CONFIG,
  LINCOLNWOOD_CONFIG,
  NORTHBROOK_CONFIG,
  LOMBARD_CONFIG,
  TINLEY_PARK_CONFIG,
  ARLINGTON_HEIGHTS_IL_CONFIG,
  SCHAUMBURG_CONFIG,
  NAPERVILLE_CONFIG,
];

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
