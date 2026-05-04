'use client';

import Link from 'next/link';
import { useState } from 'react';

/**
 * Yelp-style "Categories" tile row — 6 most common filter entry points.
 * State → city two-level selector keeps every tile href in sync.
 */

const STATE_CITIES: Record<string, { slug: string; label: string }[]> = {
  TX: [
    { slug: 'houston',     label: 'Houston'     },
    { slug: 'dallas',      label: 'Dallas'      },
    { slug: 'san-antonio', label: 'San Antonio' },
  ],
  CA: [
    { slug: 'los-angeles', label: 'Los Angeles' },
    { slug: 'glendale-ca', label: 'Glendale'    },
    { slug: 'san-diego',   label: 'San Diego'   },
  ],
};

const TILE_DEFS = [
  { suffix: '?lang=spanish',    key: 'lang=spanish',    label: 'Spanish-speaking', glyph: 'Es' },
  { suffix: '?lang=vietnamese', key: 'lang=vietnamese', label: 'Vietnamese',       glyph: 'Vi' },
  { suffix: '?lang=chinese',    key: 'lang=chinese',    label: 'Chinese',          glyph: '中' },
  { suffix: '?ins=medicaid',    key: 'ins=medicaid',    label: 'Accepts Medicaid', glyph: '$'  },
  { suffix: '?svc=dementia',    key: 'svc=dementia',    label: 'Dementia care',    glyph: '⌬'  },
  { suffix: '?svc=hospice',     key: 'svc=hospice',     label: 'Hospice',          glyph: '✜'  },
];

function trackFilter(filterKey: string, city: string) {
  fetch('/api/track-filter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filter_key: filterKey, city }),
    keepalive: true,
  }).catch(() => {});
}

export function QuickFilters() {
  const [state, setState] = useState<'TX' | 'CA'>('TX');
  const [city, setCity] = useState('houston');

  function switchState(s: 'TX' | 'CA') {
    setState(s);
    setCity(STATE_CITIES[s][0].slug);
  }

  const cities = STATE_CITIES[state];

  return (
    <section className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          {/* Left: eyebrow + state pills + city pills */}
          <div className="flex items-center gap-3 flex-wrap">
            <p className="eyebrow">Popular searches</p>
            <span className="text-[var(--ink-4)]" aria-hidden>·</span>

            {/* State toggle */}
            <div className="flex items-center gap-1" role="group" aria-label="Select state">
              {(['TX', 'CA'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => switchState(s)}
                  aria-pressed={state === s}
                  className="px-2.5 py-0.5 rounded-full text-[11.5px] font-medium transition-all"
                  style={
                    state === s
                      ? { background: 'var(--ink)', color: 'white' }
                      : { background: 'transparent', color: 'var(--ink-3)', border: '1px solid var(--line)' }
                  }
                >
                  {s}
                </button>
              ))}
            </div>

            <span className="text-[var(--ink-4)]" aria-hidden>·</span>

            {/* City pills (change based on state) */}
            <div className="flex items-center gap-1.5" role="group" aria-label="Select city">
              {cities.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCity(c.slug)}
                  aria-pressed={city === c.slug}
                  className="px-2.5 py-0.5 rounded-full text-[11.5px] font-medium transition-all"
                  style={
                    city === c.slug
                      ? { background: 'var(--accent-on)', color: 'white' }
                      : { background: 'transparent', color: 'var(--ink-3)', border: '1px solid var(--line)' }
                  }
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: see-all link (city-aware) */}
          <Link
            href={`/${city}`}
            className="text-[12.5px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline inline-flex items-center gap-1"
          >
            See all filters
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TILE_DEFS.map((t) => (
            <Link
              key={t.suffix}
              href={`/${city}${t.suffix}`}
              onClick={() => trackFilter(t.key, city)}
              className="group flex flex-col items-start gap-3 p-5 rounded-[10px] border border-[var(--line)] bg-white hover:border-[var(--ink-3)] hover:shadow-[0_8px_24px_-12px_rgba(10,10,10,0.08)] transition-all"
            >
              <span
                className="font-display flex items-center justify-center rounded-[8px] shrink-0"
                style={{
                  width: 44,
                  height: 44,
                  fontSize: 18,
                  fontWeight: 500,
                  background: 'rgba(245, 197, 24, 0.15)',
                  color: 'var(--ink)',
                }}
                aria-hidden
              >
                {t.glyph}
              </span>
              <span
                className="font-display text-[var(--ink)] group-hover:text-[var(--accent-on)] leading-tight"
                style={{ fontSize: 15.5, fontWeight: 500 }}
              >
                {t.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
