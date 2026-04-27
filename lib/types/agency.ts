/**
 * Agency type for Day 7 listing page.
 * Only includes fields used by /houston listing — not all 47 schema columns.
 */
export interface Agency {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  zip: string | null;
  phone: string | null;
  website: string | null;

  // Trust signals
  medicare_star: number | null;       // 0-5
  google_rating: number | null;       // 0-5
  google_reviews_count: number | null;
  trust_score: number | null;         // pre-computed in DB

  // Filter booleans — all 14
  has_spanish: boolean;
  has_vietnamese: boolean;
  has_chinese: boolean;
  accepts_medicare: boolean;
  accepts_medicaid: boolean;
  has_skilled_nursing: boolean;
  has_home_health_aide: boolean;
  has_personal_care: boolean;
  has_companion_care: boolean;
  has_physical_therapy: boolean;
  has_occupational_therapy: boolean;
  has_speech_therapy: boolean;
  has_dementia_care: boolean;
  has_hospice: boolean;

  // Card display
  ai_summary: string | null;
}

/**
 * Day 7 props slot.
 * `isSponsored` always false in Day 7, but reserved for Phase 2 (Yelp-like Premium).
 */
export interface AgencyCardProps {
  agency: Agency;
  isSponsored?: boolean;
}
