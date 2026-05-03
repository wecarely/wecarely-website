'use client';

import Link from 'next/link';
import { useState } from 'react';

export interface GridCity {
  slug: string;
  name: string;
  abbr: string;
  count: number;
  live: boolean;
}

export interface GridState {
  name: string;
  abbr: string;
  live: boolean;
  cities: GridCity[];
}

export function CityGrid({ states }: { states: GridState[] }) {
  const defaultState = states.find((s) => s.live)?.abbr ?? states[0].abbr;
  const [active, setActive] = useState(defaultState);
  const current = states.find((s) => s.abbr === active) ?? states[0];

  return (
    <div>
      {/* State tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        {states.map((s) => {
          const isActive = s.abbr === active;
          return (
            <button
              key={s.abbr}
              type="button"
              onClick={() => setActive(s.abbr)}
              aria-pressed={isActive}
              className={[
                'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-[13.5px] font-medium transition-colors',
                isActive
                  ? 'border-[var(--ink)] bg-[var(--ink)] text-white'
                  : 'border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--bg-soft)]',
              ].join(' ')}
            >
              {s.name}
              {!s.live && (
                <span className="text-[10.5px] uppercase tracking-wider opacity-60">
                  soon
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* City grid */}
      {current.live ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {current.cities.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              className="group flex flex-col items-start text-left border border-[var(--line)] rounded-[12px] p-4 hover:border-[var(--ink-3)] hover:shadow-[0_6px_20px_-10px_rgba(10,10,10,0.12)] transition-all bg-white"
            >
              <p className="font-mono text-[10px] text-[var(--ink-3)] mb-1 tracking-[0.08em] uppercase">
                {c.abbr}
              </p>
              <p
                className="font-display text-[var(--ink)] group-hover:text-[var(--accent-on)] transition-colors leading-tight"
                style={{ fontSize: 17, fontWeight: 500 }}
              >
                {c.name}
              </p>
              {c.count > 0 && (
                <p className="font-mono text-[11px] text-[var(--ink-3)] tabular-nums mt-1">
                  {c.count} agencies
                </p>
              )}
              <span className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-medium text-[var(--ink-3)] group-hover:text-[var(--ink)] transition-colors">
                Browse
                <svg
                  width="10" height="10" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.4"
                  strokeLinecap="round" strokeLinejoin="round" aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="border-t border-[var(--line)] pt-10">
          <p
            className="font-display text-[var(--ink)] mb-2"
            style={{ fontSize: 22, fontWeight: 500 }}
          >
            {current.name} is coming soon.
          </p>
          <p className="text-[14.5px] text-[var(--ink-2)] max-w-md">
            We&apos;re expanding to {current.name} next. Want to be first?{' '}
            <a
              href={`mailto:hello@wecarely.com?subject=City%20request%3A%20${encodeURIComponent(current.name)}`}
              className="text-[var(--ink)] underline underline-offset-3"
            >
              Tell us where you need care
            </a>
            .
          </p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 opacity-35 pointer-events-none">
            {current.cities.map((c) => (
              <div
                key={c.slug}
                className="flex flex-col items-start border border-[var(--line)] rounded-[12px] p-4 bg-[var(--bg-soft)]"
              >
                <p className="font-mono text-[10px] text-[var(--ink-3)] mb-1 tracking-[0.08em] uppercase">
                  {c.abbr}
                </p>
                <p
                  className="font-display text-[var(--ink-2)] leading-tight"
                  style={{ fontSize: 17, fontWeight: 500 }}
                >
                  {c.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
