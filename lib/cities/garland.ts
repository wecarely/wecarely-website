import type { CityConfig } from './index';

export const GARLAND_CONFIG: CityConfig = {
  slug: 'garland',
  name: 'Garland',
  state: 'TX',
  status: 'coming-soon',
  intro:
    'Every Medicare-certified home care agency in Garland — ranked by CMS clinical stars and Google reviews. Garland has one of the largest Vietnamese-American communities in the Dallas–Fort Worth metro, making Vietnamese-speaking home care agencies especially important here.',
  neighborhoods: [
    {
      slug: 'central-garland',
      name: 'Central Garland',
      zips: ['75040', '75041', '75042'],
      intro:
        'Central Garland — anchored by the historic downtown square and the Belt Line Road corridor — is home to a large and established Vietnamese-American senior population with significant demand for bilingual home care.',
      alsoKnownAs: ['Downtown Garland', 'Belt Line', 'Garland Square'],
    },
    {
      slug: 'north-garland',
      name: 'North Garland',
      zips: ['75044', '75046'],
      intro:
        'North Garland encompasses the Firewheel Town Center area and the George Bush Turnpike corridor — a more suburban zone with newer residential developments and a growing senior population.',
      alsoKnownAs: ['Firewheel', 'North Garland', 'Campbell Road corridor'],
    },
    {
      slug: 'south-garland',
      name: 'South Garland',
      zips: ['75043'],
      intro:
        'South Garland along the I-30 corridor bridges Garland with Mesquite and Rowlett, serving a diverse community with a mix of Hispanic and Asian senior households.',
      alsoKnownAs: ['Rowlett adjacent', 'I-30 corridor', 'South Garland'],
    },
  ],
};
