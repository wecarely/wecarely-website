import type { MetadataRoute } from 'next';
import { getAllSlugsByCity } from '@/lib/supabase/queries';
import { LIVE_CITIES } from '@/lib/cities';
import { listArticles } from '@/lib/blog/articles';

const SITE_URL = 'https://www.wecarely.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Fan out per live city: city landing, agency detail pages, neighborhood pages.
  // Filter-param URLs (?lang=spanish etc.) are intentionally excluded — they share
  // the same canonical as the city page and submitting them would create a
  // canonical-URL conflict with Google. They are discoverable via internal links.
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
