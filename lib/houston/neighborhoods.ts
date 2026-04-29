/**
 * Houston neighborhood / area mapping for programmatic SEO.
 *
 * Each entry generates a `/houston/area/{slug}` page listing the agencies
 * located in that neighborhood (matched by ZIP). Targets long-tail
 * geographic queries like "home care in Sharpstown" or "Sugar Land
 * skilled nursing".
 *
 * Curated to ≥4 agencies per area to avoid thin-content SEO penalty.
 * As more cities / ZIPs come online, expand this list.
 */

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

export const HOUSTON_NEIGHBORHOODS: Neighborhood[] = [
  {
    slug: 'sharpstown',
    name: 'Sharpstown',
    zips: ['77036', '77074'],
    intro:
      'Sharpstown is one of the most culturally diverse neighborhoods in Houston, anchored by Chinatown and serving a large Asian and Hispanic community. Over 60 home care agencies operate in the area.',
    alsoKnownAs: ['Chinatown Houston', 'SW Houston'],
  },
  {
    slug: 'westchase',
    name: 'Westchase',
    zips: ['77042', '77077', '77082', '77063'],
    intro:
      'Westchase covers a major business district along Beltway 8 in west Houston, with strong access to the Energy Corridor and major medical centers.',
    alsoKnownAs: ['Briargrove', 'Eldridge'],
  },
  {
    slug: 'cypress',
    name: 'Cypress / Copperfield',
    zips: ['77084', '77095', '77065'],
    intro:
      'Cypress and the Copperfield area sit in northwest Harris County, a fast-growing suburban region with strong demand for in-home senior care.',
    alsoKnownAs: ['Copperfield', 'NW Harris County'],
  },
  {
    slug: 'galleria',
    name: 'Galleria / Uptown',
    zips: ['77056', '77057', '77027'],
    intro:
      'The Galleria and Uptown area is a dense mixed-use district in the heart of Houston, serving Memorial, River Oaks, and West University residents.',
    alsoKnownAs: ['Uptown Houston', 'Tanglewood'],
  },
  {
    slug: 'alief',
    name: 'Alief',
    zips: ['77099', '77083'],
    intro:
      'Alief is a southwest Houston neighborhood with one of the most multilingual communities in the metro, particularly large Vietnamese, Hispanic, and Chinese populations.',
    alsoKnownAs: ['SW Houston', 'Mission Bend'],
  },
  {
    slug: 'memorial-energy-corridor',
    name: 'Memorial / Energy Corridor',
    zips: ['77024', '77079', '77043'],
    intro:
      'The Memorial and Energy Corridor area covers west Houston along I-10, including upscale residential neighborhoods like Memorial Villages and large employer campuses.',
    alsoKnownAs: ['Memorial Villages', 'I-10 West'],
  },
  {
    slug: 'meyerland',
    name: 'Meyerland / Bellaire',
    zips: ['77035', '77081', '77096'],
    intro:
      'Meyerland and Bellaire are inner-loop residential neighborhoods south of the Galleria, known for strong public schools and a tight-knit community.',
    alsoKnownAs: ['Bellaire', 'Braeswood Place'],
  },
  {
    slug: 'stafford-missouri-city',
    name: 'Stafford / Missouri City',
    zips: ['77072', '77489', '77071'],
    intro:
      'Stafford and Missouri City sit in southwest Houston / Fort Bend County, a diverse suburban area serving families across multiple ethnic communities.',
    alsoKnownAs: ['Fort Bend', 'SW Suburbs'],
  },
  {
    slug: 'spring-branch',
    name: 'Spring Branch',
    zips: ['77055', '77080', '77041', '77043'],
    intro:
      'Spring Branch covers a stretch of west Houston between Memorial and the Heights, with a mix of established residential and commercial corridors.',
    alsoKnownAs: ['West Houston'],
  },
  {
    slug: 'northwest-houston',
    name: 'Northwest Houston',
    zips: ['77040', '77092', '77064', '77070'],
    intro:
      'Northwest Houston covers the Beltway 8 / 290 corridor, including Jersey Village and Willowbrook — areas with growing senior populations.',
    alsoKnownAs: ['NW Houston', 'Willowbrook', 'Jersey Village'],
  },
  {
    slug: 'greenspoint',
    name: 'Greenspoint / North Houston',
    zips: ['77060', '77067', '77068'],
    intro:
      'Greenspoint and North Houston cover the FM 1960 / Beltway 8 area in the northern part of the city, near Bush Intercontinental Airport.',
    alsoKnownAs: ['North Houston', 'IAH'],
  },
  {
    slug: 'clear-lake',
    name: 'Clear Lake / Bay Area',
    zips: ['77034', '77058', '77089'],
    intro:
      'Clear Lake and the Bay Area sit in southeast Houston, near NASA Johnson Space Center and Galveston Bay, serving Pasadena, Friendswood, and surrounding communities.',
    alsoKnownAs: ['NASA area', 'Friendswood', 'Pasadena'],
  },
  {
    slug: 'medical-center',
    name: 'Medical Center / Bissonnet',
    zips: ['77030', '77054'],
    intro:
      'The Texas Medical Center area is the largest medical complex in the world. Home care agencies in this zone often coordinate post-discharge care directly with major hospitals.',
    alsoKnownAs: ['TMC', 'Texas Medical Center'],
  },
  {
    slug: 'the-heights',
    name: 'The Heights / Greater Heights',
    zips: ['77008', '77009', '77018'],
    intro:
      'The Heights is a historic inner-loop neighborhood north of downtown, known for craftsman homes, walkable streets, and a strong sense of community.',
    alsoKnownAs: ['Heights', 'Greater Heights', 'Garden Oaks'],
  },
  {
    slug: 'midtown-museum-district',
    name: 'Midtown / Museum District',
    zips: ['77002', '77004', '77006'],
    intro:
      'Midtown and the Museum District anchor the urban core south of downtown, with a dense mix of high-rise residential, hospitals, and Rice University.',
    alsoKnownAs: ['Downtown Houston', 'Rice University area'],
  },
];

/** Look up a neighborhood by slug. Returns null if not found. */
export function findNeighborhood(slug: string): Neighborhood | null {
  return HOUSTON_NEIGHBORHOODS.find((n) => n.slug === slug) ?? null;
}

/** Find the named neighborhood (if any) that includes a given ZIP. */
export function neighborhoodForZip(zip: string | null | undefined): Neighborhood | null {
  if (!zip) return null;
  return (
    HOUSTON_NEIGHBORHOODS.find((n) => n.zips.includes(zip)) ?? null
  );
}
