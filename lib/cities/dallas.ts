import type { CityConfig } from './index';

export const DALLAS_CONFIG: CityConfig = {
  slug: 'dallas',
  name: 'Dallas',
  state: 'TX',
  status: 'live',
  intro:
    'Every Medicare-certified home care agency in Dallas — ranked by CMS clinical stars and Google reviews, filterable by language, insurance, and service type.',
  neighborhoods: [
    {
      slug: 'northeast-dallas',
      name: 'Northeast Dallas',
      zips: ['75243', '75238', '75231'],
      intro:
        'Northeast Dallas — including Lake Highlands, Audelia Road, and Forest Hills — is one of the most active home care corridors in the city, with over 45 Medicare-certified agencies concentrated along the LBJ Freeway and Skillman Street corridors.',
      alsoKnownAs: ['Lake Highlands', 'Audelia', 'Forest Hills'],
    },
    {
      slug: 'north-dallas',
      name: 'North Dallas',
      zips: ['75252', '75240', '75251', '75254', '75244'],
      intro:
        'North Dallas stretches from the Galleria corridor up to the Far North Dallas suburbs near Addison and the Dallas North Tollway. The area has strong access to major medical facilities and a wide selection of Medicare-certified home care agencies.',
      alsoKnownAs: ['Galleria Dallas', 'Far North Dallas', 'Addison corridor'],
    },
    {
      slug: 'northwest-dallas',
      name: 'Northwest Dallas',
      zips: ['75247', '75229', '75234', '75220'],
      intro:
        'Northwest Dallas covers the Design District, Love Field, and the Farmers Branch corridor along I-35E. The area offers convenient access to Parkland Hospital and UT Southwestern Medical Center.',
      alsoKnownAs: ['Design District', 'Love Field', 'Farmers Branch', 'Inwood'],
    },
    {
      slug: 'east-dallas',
      name: 'East Dallas',
      zips: ['75228', '75218', '75214'],
      intro:
        'East Dallas includes the White Rock Lake neighborhood, Casa Linda, and Lakewood — established residential areas with a growing population of older adults and strong demand for in-home care services.',
      alsoKnownAs: ['White Rock Lake', 'Casa Linda', 'Lakewood', 'Lakewood Heights'],
    },
  ],
};
