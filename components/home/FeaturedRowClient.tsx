'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LetterTile } from '@/components/agency/LetterTile';
import { StarRating } from '@/components/agency/StarRating';

interface Agency {
  id: string | number;
  name: string;
  city: string | null;
  slug: string;
  medicare_star: number | null;
  google_rating: number | null;
  google_reviews_count: number | null;
}

export interface CityEntry {
  slug: string;
  name: string;
  top: Agency[];
}

/**
 * Client island for FeaturedRow — handles the Houston | Dallas tab toggle.
 * Data is fetched server-side in FeaturedRow.tsx and passed here as props.
 */
export function FeaturedRowClient({ cities }: { cities: CityEntry[] }) {
  const [activeSlug, setActiveSlug] = useState(cities[0]?.slug ?? 'houston');
  const active = cities.find((c) => c.slug === activeSlug) ?? cities[0];

  if (!active) return null;

  return (
    <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          {/* Left: eyebrow + city pills */}
          <div className="flex items-center gap-3 flex-wrap">
            <p className="eyebrow">Top rated</p>
            <span className="text-[var(--ink-4)]" aria-hidden>
              ·
            </span>
            <span className="font-mono text-[12.5px] text-[var(--ink-3)]">
              by trust score
            </span>
            <div
              className="flex items-center gap-1.5 ml-1"
              role="group"
              aria-label="Select city"
            >
              {cities.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setActiveSlug(c.slug)}
                  aria-pressed={c.slug === activeSlug}
                  className="px-2.5 py-0.5 rounded-full text-[11.5px] font-medium transition-all"
                  style={
                    c.slug === activeSlug
                      ? { background: 'var(--ink)', color: 'white' }
                      : {
                          background: 'transparent',
                          color: 'var(--ink-3)',
                          border: '1px solid var(--line)',
                        }
                  }
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right: see-all link (city-aware) */}
          <Link
            href={`/${active.slug}`}
            className="text-[12.5px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline inline-flex items-center gap-1"
          >
            See all
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {active.top.map((a, i) => (
            <Link
              key={a.id}
              href={`/${(a.city ?? active.slug).toLowerCase()}/${a.slug}`}
              className="group block bg-white border border-[var(--line)] rounded-[10px] p-5 hover:border-[var(--ink-3)] hover:shadow-[0_8px_24px_-12px_rgba(10,10,10,0.08)] transition-all"
            >
              <div className="flex items-start gap-3 mb-3">
                <LetterTile name={a.name} size={48} fontSize={20} />
                <span className="font-mono text-[11px] text-[var(--ink-3)] tabular-nums mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <h4
                className="font-display text-[var(--ink)] leading-tight mb-2 group-hover:text-[var(--accent-on)] transition-colors"
                style={{ fontSize: 16, fontWeight: 500 }}
              >
                {a.name}
              </h4>

              {(a.medicare_star != null || a.google_rating != null) && (
                <div className="space-y-1">
                  {a.medicare_star != null && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-[14px] tabular-nums font-medium">
                        {a.medicare_star.toFixed(1)}
                      </span>
                      <StarRating value={a.medicare_star} size={11} />
                      <span className="eyebrow">CMS</span>
                    </div>
                  )}
                  {a.google_rating != null && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-[14px] tabular-nums font-medium">
                        {a.google_rating.toFixed(1)}
                      </span>
                      <StarRating value={a.google_rating} size={11} />
                      <span className="eyebrow">Google</span>
                      {a.google_reviews_count != null &&
                        a.google_reviews_count > 0 && (
                          <span className="font-mono text-[10.5px] text-[var(--ink-3)]">
                            · {a.google_reviews_count}
                          </span>
                        )}
                    </div>
                  )}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
