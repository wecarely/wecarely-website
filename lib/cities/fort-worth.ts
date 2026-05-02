import type { CityConfig } from './index';

export const FORT_WORTH_CONFIG: CityConfig = {
  slug: 'fort-worth',
  name: 'Fort Worth',
  state: 'TX',
  status: 'live',
  intro:
    'Every Medicare-certified home care agency in Fort Worth — ranked by CMS clinical stars and Google reviews, filterable by language, insurance, and service type.',
  neighborhoods: [
    {
      slug: 'north-fort-worth',
      name: 'North Fort Worth',
      zips: ['76106', '76131', '76137', '76148', '76179'],
      intro:
        'North Fort Worth — including the Alliance corridor and Fossil Creek — is a high-growth residential area with strong access to Medical City Alliance and a range of home care agencies.',
      alsoKnownAs: ['Alliance', 'Fossil Creek', 'Saginaw', 'Keller adjacent'],
    },
    {
      slug: 'south-fort-worth',
      name: 'South Fort Worth',
      zips: ['76104', '76110', '76115', '76119', '76123'],
      intro:
        'South Fort Worth spans the Polytechnic Heights and Wedgwood neighborhoods, with a large Hispanic senior community and strong demand for bilingual home care services.',
      alsoKnownAs: ['Poly', 'Wedgwood', 'Stop Six', 'Southside'],
    },
    {
      slug: 'west-fort-worth',
      name: 'West Fort Worth',
      zips: ['76107', '76108', '76116', '76126', '76132'],
      intro:
        'West Fort Worth — including the Cultural District, Ridglea, and Hulen Street corridor — is home to established senior communities with access to Harris Methodist Hospital.',
      alsoKnownAs: ['Cultural District', 'Ridglea', 'Hulen', 'Westover Hills'],
    },
  ],
};
