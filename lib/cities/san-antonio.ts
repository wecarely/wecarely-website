import type { CityConfig } from './index';

export const SAN_ANTONIO_CONFIG: CityConfig = {
  slug: 'san-antonio',
  name: 'San Antonio',
  state: 'TX',
  status: 'coming-soon',
  intro:
    'Every Medicare-certified home care agency in San Antonio — ranked by CMS clinical stars and Google reviews, filterable by language, insurance, and service type.',
  neighborhoods: [
    {
      slug: 'north-san-antonio',
      name: 'North San Antonio',
      zips: ['78230', '78231', '78232', '78233', '78216', '78217'],
      intro:
        'North San Antonio encompasses the Medical Center corridor, Shavano Park, and Stone Oak — home to major healthcare facilities including University Hospital and a dense concentration of Medicare-certified home care agencies.',
      alsoKnownAs: ['Stone Oak', 'Medical Center', 'Shavano Park', 'Thousand Oaks'],
    },
    {
      slug: 'northwest-san-antonio',
      name: 'Northwest San Antonio',
      zips: ['78238', '78240', '78250', '78251', '78252'],
      intro:
        'Northwest San Antonio spans the Leon Valley and Helotes corridor along Loop 410 and Highway 151, with strong access to USAA and the Joint Base San Antonio communities.',
      alsoKnownAs: ['Leon Valley', 'Helotes corridor', 'Highway 151'],
    },
    {
      slug: 'south-san-antonio',
      name: 'South San Antonio',
      zips: ['78211', '78214', '78220', '78221', '78223', '78242'],
      intro:
        'South San Antonio — including Harlandale and Brooks City-Base — is one of the most predominantly Hispanic areas of the city, with the highest concentration of Spanish-speaking seniors and strong demand for bilingual home care services.',
      alsoKnownAs: ['Harlandale', 'Brooks City-Base', 'Palo Alto', 'South Side'],
    },
    {
      slug: 'east-san-antonio',
      name: 'East San Antonio',
      zips: ['78202', '78203', '78208', '78219', '78222'],
      intro:
        'East San Antonio covers the neighborhoods east of downtown, including Highland Hills and Converse corridor — a working-class area with growing senior populations and convenient highway access.',
      alsoKnownAs: ['Highland Hills', 'Converse corridor', 'East Side'],
    },
    {
      slug: 'downtown-san-antonio',
      name: 'Downtown & Inner Loop',
      zips: ['78201', '78204', '78205', '78207', '78210', '78212'],
      intro:
        'Downtown San Antonio and its inner-loop neighborhoods — including Alamo Heights, King William, and Beacon Hill — blend historic residential areas with proximity to major medical centers along the San Antonio River.',
      alsoKnownAs: ['King William', 'Beacon Hill', 'Alamo Heights', 'Lavaca'],
    },
  ],
};
