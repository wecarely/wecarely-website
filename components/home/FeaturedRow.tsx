import { getAgenciesByCity } from '@/lib/supabase/queries';
import { FeaturedRowClient } from './FeaturedRowClient';

/**
 * Yelp-style "Best of" featured row — top 4 agencies by trust score.
 * Server component: fetches Houston + Dallas in parallel, then hands off
 * to FeaturedRowClient for the city-tab toggle UI.
 */
export async function FeaturedRow() {
  const [houstonAgencies, dallasAgencies, laAgencies, miamiAgencies, chicagoAgencies] = await Promise.all([
    getAgenciesByCity({ citySlug: 'houston',     filters: { lang: [], ins: [], svc: [] } }),
    getAgenciesByCity({ citySlug: 'dallas',       filters: { lang: [], ins: [], svc: [] } }),
    getAgenciesByCity({ citySlug: 'los-angeles',  filters: { lang: [], ins: [], svc: [] } }),
    getAgenciesByCity({ citySlug: 'miami',         filters: { lang: [], ins: [], svc: [] } }),
    getAgenciesByCity({ citySlug: 'chicago',       filters: { lang: [], ins: [], svc: [] } }),
  ]);

  const cities = [
    { slug: 'houston',     name: 'Houston',     top: houstonAgencies.slice(0, 4) },
    { slug: 'dallas',      name: 'Dallas',       top: dallasAgencies.slice(0, 4)  },
    { slug: 'los-angeles', name: 'Los Angeles',  top: laAgencies.slice(0, 4)      },
    { slug: 'miami',       name: 'Miami',         top: miamiAgencies.slice(0, 4)   },
    { slug: 'chicago',     name: 'Chicago',       top: chicagoAgencies.slice(0, 4) },
  ].filter((c) => c.top.length > 0);

  if (cities.length === 0) return null;

  return <FeaturedRowClient cities={cities} />;
}
