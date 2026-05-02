'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FILTERS } from '@/lib/constants/filters';

const AXIS_PARAM = {
  language: 'lang',
  insurance: 'ins',
  clinical: 'svc',
} as const;

const SYNONYMS: Record<string, string> = {
  // language
  español: 'spanish',
  espanol: 'spanish',
  hispanic: 'spanish',
  vietnamese: 'vietnamese',
  vi: 'vietnamese',
  chinese: 'chinese',
  mandarin: 'chinese',
  cantonese: 'chinese',
  // insurance
  medicare: 'medicare',
  medicaid: 'medicaid',
  // clinical
  alzheimer: 'dementia',
  alzheimers: 'dementia',
  memory: 'dementia',
  hospice: 'hospice',
  'end of life': 'hospice',
  palliative: 'hospice',
  pt: 'physical-therapy',
  ot: 'occupational-therapy',
  speech: 'speech-therapy',
  'st ': 'speech-therapy',
  hha: 'home-health-aide',
  aide: 'home-health-aide',
  rn: 'skilled-nursing',
  nurse: 'skilled-nursing',
  nursing: 'skilled-nursing',
  companion: 'companion-care',
  personal: 'personal-care',
};

function buildSearchUrl(rawQuery: string, citySlug: string): string {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return `/${citySlug}`;

  const synonymKey = SYNONYMS[q] ?? null;

  const matched =
    FILTERS.find(
      (f) => f.label.toLowerCase() === q || f.key === q || f.key === synonymKey
    ) ?? null;

  if (matched) {
    const param = AXIS_PARAM[matched.axis];
    return `/${citySlug}?${param}=${matched.key}`;
  }

  return `/${citySlug}?q=${encodeURIComponent(rawQuery.trim())}`;
}

/**
 * Hero search bar — single input, city-aware.
 * Pass the current citySlug so search routes to the correct city listing.
 */
export function HeroSearch({ citySlug = 'houston' }: { citySlug?: string }) {
  const router = useRouter();
  const [q, setQ] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(buildSearchUrl(q, citySlug));
  };

  return (
    <form className="hero-search" onSubmit={onSubmit} role="search">
      <div className="hs-field">
        <span className="hs-icon" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Spanish, dementia, Medicaid…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search services"
        />
      </div>
      <button className="hs-submit" type="submit" aria-label="Search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </button>
    </form>
  );
}
