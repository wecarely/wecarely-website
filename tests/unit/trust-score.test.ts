import { describe, it, expect } from 'vitest';
import { computeTrustScore, sortByTrust } from '@/lib/utils/trust-score';
import type { Agency } from '@/lib/types/agency';

const a = (overrides: Partial<Agency> = {}): Agency => ({
  id: 'x',
  slug: 's',
  name: 'n',
  city: 'Houston',
  state: 'TX',
  zip: null,
  phone: null,
  website: null,
  medicare_star: null,
  google_rating: null,
  google_reviews_count: null,
  trust_score: null,
  has_spanish: false,
  has_vietnamese: false,
  has_chinese: false,
  accepts_medicare: false,
  accepts_medicaid: false,
  has_skilled_nursing: false,
  has_home_health_aide: false,
  has_personal_care: false,
  has_companion_care: false,
  has_physical_therapy: false,
  has_occupational_therapy: false,
  has_speech_therapy: false,
  has_dementia_care: false,
  has_hospice: false,
  ai_summary: null,
  ...overrides,
});

describe('computeTrustScore', () => {
  it('uses trust_score when present', () => {
    expect(computeTrustScore(a({ trust_score: 4.5 }))).toBe(4.5);
  });

  it('falls back to average of medicare_star + google_rating', () => {
    expect(computeTrustScore(a({ medicare_star: 4, google_rating: 5 }))).toBe(4.5);
  });

  it('uses single signal if only one present', () => {
    expect(computeTrustScore(a({ medicare_star: 3 }))).toBe(3);
    expect(computeTrustScore(a({ google_rating: 4 }))).toBe(4);
  });

  it('returns 0 if no signals', () => {
    expect(computeTrustScore(a())).toBe(0);
  });
});

describe('sortByTrust', () => {
  it('sorts highest trust first', () => {
    const list = [a({ id: 'low', trust_score: 2 }), a({ id: 'hi', trust_score: 5 })];
    expect(sortByTrust(list).map((x) => x.id)).toEqual(['hi', 'low']);
  });

  it('does not mutate input array', () => {
    const list = [a({ id: 'a', trust_score: 1 }), a({ id: 'b', trust_score: 5 })];
    sortByTrust(list);
    expect(list.map((x) => x.id)).toEqual(['a', 'b']);
  });
});
