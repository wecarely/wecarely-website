import type { CityConfig } from './index';

export const PLANO_CONFIG: CityConfig = {
  slug: 'plano',
  name: 'Plano',
  state: 'TX',
  status: 'coming-soon',
  intro:
    'Every Medicare-certified home care agency in Plano — ranked by CMS clinical stars and Google reviews. Plano has one of the largest Chinese and Korean senior communities in the DFW metro, concentrated along the US-75 and Legacy Drive corridors.',
  neighborhoods: [
    {
      slug: 'central-plano',
      name: 'Central Plano',
      zips: ['75023', '75024', '75025'],
      intro:
        'Central Plano spans the Legacy Town Center and Spring Creek corridors — the most established part of the city, with strong access to Medical City Plano and a large Chinese and Korean senior community.',
      alsoKnownAs: ['Legacy', 'Spring Creek', 'Medical City Plano', 'West Plano'],
    },
    {
      slug: 'east-plano',
      name: 'East Plano',
      zips: ['75074', '75075'],
      intro:
        'East Plano borders Richardson along the US-75 corridor, with a dense concentration of Asian-American households and several home care agencies serving Mandarin, Cantonese, and Korean-speaking seniors.',
      alsoKnownAs: ['East Plano', 'US-75 corridor', 'Richardson border'],
    },
  ],
};
