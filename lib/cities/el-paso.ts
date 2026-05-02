import type { CityConfig } from './index';

export const EL_PASO_CONFIG: CityConfig = {
  slug: 'el-paso',
  name: 'El Paso',
  state: 'TX',
  status: 'live',
  intro:
    "Every Medicare-certified home care agency in El Paso — ranked by CMS clinical stars and Google reviews, filterable by language, insurance, and service type. El Paso's senior population is predominantly Spanish-speaking, making language match a key factor in home care selection.",
  neighborhoods: [
    {
      slug: 'west-el-paso',
      name: 'West El Paso',
      zips: ['79902', '79912', '79922', '79925', '79932'],
      intro:
        'West El Paso — including the Kern Place and Mesa Hills corridors — is home to a large concentration of senior residents and well-established home care agencies along the I-10 West corridor.',
      alsoKnownAs: ['Kern Place', 'Mesa Hills', 'Upper Valley', 'Westside'],
    },
    {
      slug: 'east-el-paso',
      name: 'East El Paso',
      zips: ['79904', '79916', '79930', '79935', '79936'],
      intro:
        'East El Paso spans the Cielo Vista and Montwood corridors east of downtown, with strong access to East El Paso Medical Center and a growing senior population.',
      alsoKnownAs: ['Cielo Vista', 'Montwood', 'Eastside', 'Lomaland'],
    },
    {
      slug: 'central-el-paso',
      name: 'Central El Paso',
      zips: ['79901', '79903', '79905', '79907'],
      intro:
        'Central El Paso — including the downtown core and the Ysleta area along the Rio Grande — is the most densely populated part of the city, with the highest concentration of Spanish-speaking seniors.',
      alsoKnownAs: ['Downtown El Paso', 'Ysleta', 'Lower Valley', 'Central'],
    },
    {
      slug: 'northeast-el-paso',
      name: 'Northeast El Paso',
      zips: ['79906', '79908', '79924', '79934'],
      intro:
        'Northeast El Paso includes the Fort Bliss corridor and the Dyer Street commercial zone, serving a large military veteran and retiree community.',
      alsoKnownAs: ['Fort Bliss corridor', 'Dyer', 'Northeast', 'Cimarron'],
    },
  ],
};
