'use client';
import { useState } from 'react';

/**
 * Decorative hero search bar (Day 7).
 * Day 8: wire up to actual search (name + ai_summary substring match).
 */
export function HeroSearch() {
  const [q, setQ] = useState('');
  const [loc, setLoc] = useState('Houston, TX');

  return (
    <form
      className="hero-search"
      onSubmit={(e) => e.preventDefault()}
      role="search"
    >
      <div className="hs-field">
        <span className="hs-icon" aria-hidden>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Skilled nursing, dementia care…"
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
