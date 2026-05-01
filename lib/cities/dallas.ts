import type { CityConfig } from './index';

/**
 * Dallas — currently `coming-soon`. Listing pages will 404 until status
 * flips to `live` AND agencies table has Dallas rows.
 *
 * Neighborhoods stay empty until we have ≥4 agencies per area to avoid
 * thin-content SEO penalty when the area pages launch.
 */
export const DALLAS_CONFIG: CityConfig = {
  slug: 'dallas',
  name: 'Dallas',
  state: 'TX',
  status: 'live',
  intro:
    'Every Medicare-certified home care agency in Dallas — ranked by CMS clinical stars and Google reviews, filterable by language, insurance, and service type.',
  neighborhoods: [],
};
