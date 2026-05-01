import type { MetadataRoute } from 'next';
import { getAllSlugsByCity } from '@/lib/supabase/queries';
import { LIVE_CITIES } from '@/lib/cities';
import { listArticles } from '@/lib/blog/articles';

const SITE_URL = 'https://www.wecarely.com';

const FILTER_LANDINGS = [
  'lang=spanish',
  'lang=vietnamese',
  'lang=chinese',
  'ins=medicare',
  'ins=medicaid',
  'svc=skilled-nursing',
  'svc=personal-care',
  'svc=home-health-aide',
  'svc=companion-care',
  'svc=dementia',
  'svc=hospice',
  'svc=physical-therapy',
  'svc=occupational-therapy',
  'svc=speech-therapy',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Fan out per live city: city landing, filter landings, agency detail
  // pages, neighborhood pages. As cities go live this scales automatically.
  const cityEntries = (
    await Promise.all(
      LIVE_CITIES.map(async (city): Promise<MetadataRoute.Sitemap> => {
        const slugs = await getAllSlugsByCity(city.slug);
        return [
          {
            url: `${SITE_URL}/${city.slug}`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
          },
          ...FILTER_LANDINGS.map((q) => ({
            url: `${SITE_URL}/${city.slug}?${q}`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.6,
          })),
          ...slugs.map((slug) => ({
            url: `${SITE_URL}/${city.slug}/${slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          })),
          ...city.neighborhoods.map((n) => ({
            url: `${SITE_URL}/${city.slug}/area/${n.slug}`,
            lastModified: now,
            changeFrequency: 'weekly' as const,
            priority: 0.75,
          })),
        ];
      })
    )
  ).flat();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/for-agencies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...cityEntries,
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...listArticles().map((a) => ({
      url: `${SITE_URL}/blog/${a.slug}`,
      lastModified: new Date(a.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
