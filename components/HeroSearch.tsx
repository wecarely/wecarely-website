'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FILTERS } from '@/lib/constants/filters';

const AXIS_PARAM = {
  language: 'lang',
  insurance: 'ins',
  clinical: 'svc',
} as const;

/**
 * Hero search bar.
 *
 * Smart routing on submit:
 *   1. If query matches a known filter (label or key, case-insensitive),
 *      redirect to that filter's URL — e.g. "Spanish" → /houston?lang=spanish
 *   2. Otherwise, redirect to /houston?q=<query> for free-text name/summary match.
 *
 * Common synonyms are mapped before the strict label match.
 */

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

function buildSearchUrl(rawQuery: string): string {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return '/houston';

  // Try synonym → filter key
  const synonymKey = SYNONYMS[q] ?? null;

  // Try exact filter label / key match
  const matched =
    FILTERS.find(
      (f) => f.label.toLowerCase() === q || f.key === q || f.key === synonymKey
    ) ?? null;

  if (matched) {
    const param = AXIS_PARAM[matched.axis];
    return `/houston?${param}=${matched.key}`;
  }

  // Fall back to free-text query
  return `/houston?q=${encodeURIComponent(rawQuery.trim())}`;
}

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [loc, setLoc] = useState('Houston, TX');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(buildSearchUrl(q));
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
      <div className="hs-divider" />
      <div className="hs-field">
        <span className="hs-icon" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </span>
        <input
          type="text"
          value={loc}
          onChange={(e) => setLoc(e.target.value)}
          aria-label="Location"
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
