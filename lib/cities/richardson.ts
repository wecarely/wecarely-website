import type { CityConfig } from './index';

export const RICHARDSON_CONFIG: CityConfig = {
  slug: 'richardson',
  name: 'Richardson',
  state: 'TX',
  status: 'coming-soon',
  intro:
    "Every Medicare-certified home care agency in Richardson — ranked by CMS clinical stars and Google reviews. Richardson's Chinatown district and the Telecom Corridor are home to a significant Chinese and Korean senior population, making language-matched home care a key consideration.",
  neighborhoods: [
    {
      slug: 'west-richardson',
      name: 'West Richardson',
      zips: ['75080', '75081'],
      intro:
        "West Richardson spans from the DART Rail station along Campbell Road to the Arapaho corridor — the heart of Richardson's Chinese and Korean community, with the highest concentration of Asian-owned businesses and senior households in the city.",
      alsoKnownAs: ['Chinatown Richardson', 'Campbell Road', 'Arapaho corridor'],
    },
    {
      slug: 'east-richardson',
      name: 'East Richardson',
      zips: ['75082', '75083'],
      intro:
        'East Richardson extends along the George Bush Turnpike to the Plano border, encompassing newer residential developments and a growing multi-cultural senior population.',
      alsoKnownAs: ['Bush Turnpike corridor', 'Eastside Richardson'],
    },
  ],
};
