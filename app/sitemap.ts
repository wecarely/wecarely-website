import type { MetadataRoute } from 'next';

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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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
    ...FILTER_LANDINGS.map((q) => ({
      url: `${SITE_URL}/houston?${q}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
  ];
}
