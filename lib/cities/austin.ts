import type { CityConfig } from './index';

export const AUSTIN_CONFIG: CityConfig = {
  slug: 'austin',
  name: 'Austin',
  state: 'TX',
  status: 'coming-soon',
  intro:
    'Every Medicare-certified home care agency in Austin — ranked by CMS clinical stars and Google reviews, filterable by language, insurance, and service type.',
  neighborhoods: [
    {
      slug: 'north-austin',
      name: 'North Austin',
      zips: ['78752', '78753', '78757', '78758', '78759'],
      intro:
        'North Austin spans the North Loop to the Domain corridor, with convenient access to St. David\'s North Austin Medical Center and a wide range of Medicare-certified home care agencies.',
      alsoKnownAs: ['The Domain', 'North Loop', 'Rundberg', 'Allandale'],
    },
    {
      slug: 'south-austin',
      name: 'South Austin',
      zips: ['78704', '78745', '78748', '78749'],
      intro:
        "South Austin — including South Congress, Slaughter Creek, and the South Lamar corridor — has a growing senior population with strong access to St. David's South Austin Medical Center.",
      alsoKnownAs: ['South Congress', 'South Lamar', 'Slaughter Creek', 'Manchaca'],
    },
    {
      slug: 'east-austin',
      name: 'East Austin',
      zips: ['78702', '78721', '78723', '78724', '78725'],
      intro:
        'East Austin encompasses the 183 corridor and the MLK District, with a diverse senior community and access to Dell Seton Medical Center.',
      alsoKnownAs: ['MLK District', 'Govalle', 'Windsor Park', 'Mueller'],
    },
    {
      slug: 'northwest-austin',
      name: 'Northwest Austin / Cedar Park',
      zips: ['78613', '78717', '78726', '78727', '78729', '78750'],
      intro:
        'Northwest Austin and the Cedar Park corridor is one of the fastest-growing areas in the metro, with a concentration of newer home care agencies serving affluent senior households.',
      alsoKnownAs: ['Cedar Park', 'Avery Ranch', 'Four Points', 'Balcones'],
    },
  ],
};
