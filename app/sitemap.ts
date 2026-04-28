import type { MetadataRoute } from 'next';
import { getAllHoustonSlugs } from '@/lib/supabase/queries';

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
  const slugs = await getAllHoustonSlugs();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/houston`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/for-agencies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...FILTER_LANDINGS.map((q) => ({
      url: `${SITE_URL}/houston?${q}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...slugs.map((slug) => ({
      url: `${SITE_URL}/houston/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
