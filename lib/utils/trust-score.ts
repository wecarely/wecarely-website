import type { Agency } from '@/lib/types/agency';

/**
 * Compute trust score for an agency.
 * Priority: pre-computed trust_score > average of (medicare_star, google_rating) > 0
 */
export function computeTrustScore(a: Agency): number {
  if (a.trust_score != null) return a.trust_score;
  const signals = [a.medicare_star, a.google_rating].filter(
    (x): x is number => x != null
  );
  if (signals.length === 0) return 0;
  return signals.reduce((sum, x) => sum + x, 0) / signals.length;
}

/**
 * Sort agencies by trust score, highest first. Pure function — does not mutate input.
 */
export function sortByTrust(list: Agency[]): Agency[] {
  return [...list].sort((a, b) => computeTrustScore(b) - computeTrustScore(a));
}
