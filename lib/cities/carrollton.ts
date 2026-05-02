import type { CityConfig } from './index';

export const CARROLLTON_CONFIG: CityConfig = {
  slug: 'carrollton',
  name: 'Carrollton',
  state: 'TX',
  status: 'coming-soon',
  intro:
    "Every Medicare-certified home care agency in Carrollton — ranked by CMS clinical stars and Google reviews. Carrollton's Old Town and the IH-35E corridor are home to one of the largest Vietnamese-American communities in the DFW metro.",
  neighborhoods: [
    {
      slug: 'central-carrollton',
      name: 'Central Carrollton',
      zips: ['75006', '75007'],
      intro:
        "Central Carrollton — including the Old Town district and the Spring Valley Road corridor — is the cultural center of Carrollton's Vietnamese community, with a concentration of Vietnamese-speaking seniors and bilingual home care agencies.",
      alsoKnownAs: ['Old Town Carrollton', 'Spring Valley', 'Vietnamese community'],
    },
    {
      slug: 'north-carrollton',
      name: 'North Carrollton',
      zips: ['75010'],
      intro:
        'North Carrollton borders Lewisville and the Sam Rayburn Tollway corridor, with newer residential developments and growing senior communities.',
      alsoKnownAs: ['Sam Rayburn corridor', 'Hebron', 'North Carrollton'],
    },
  ],
};
