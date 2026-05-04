import { getAgenciesByCity } from '@/lib/supabase/queries';
import { FeaturedRowClient } from './FeaturedRowClient';

/**
 * Yelp-style "Best of" featured row — top 4 agencies by trust score.
 * Server component: fetches Houston + Dallas in parallel, then hands off
 * to FeaturedRowClient for the city-tab toggle UI.
 */
export async function FeaturedRow() {
  const [houstonAgencies, dallasAgencies, laAgencies, glendaleAgencies] = await Promise.all([
    getAgenciesByCity({ citySlug: 'houston',     filters: { lang: [], ins: [], svc: [] } }),
    getAgenciesByCity({ citySlug: 'dallas',       filters: { lang: [], ins: [], svc: [] } }),
    getAgenciesByCity({ citySlug: 'los-angeles',  filters: { lang: [], ins: [], svc: [] } }),
    getAgenciesByCity({ citySlug: 'glendale-ca',  filters: { lang: [], ins: [], svc: [] } }),
  ]);

  const cities = [
    { slug: 'houston',     name: 'Houston',     top: houstonAgencies.slice(0, 4) },
    { slug: 'dallas',      name: 'Dallas',       top: dallasAgencies.slice(0, 4)  },
    { slug: 'los-angeles', name: 'Los Angeles',  top: laAgencies.slice(0, 4)      },
    { slug: 'glendale-ca', name: 'Glendale',     top: glendaleAgencies.slice(0, 4)},
  ].filter((c) => c.top.length > 0);

  if (cities.length === 0) return null;

  return <FeaturedRowClient cities={cities} />;
}
