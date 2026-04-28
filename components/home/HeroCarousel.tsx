'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { HeroSearch } from '@/components/HeroSearch';

/**
 * Yelp-style hero carousel: full-bleed background photos that fade
 * between each other every 6s, with hero copy + search bar layered over.
 *
 * Images live in /public/hero/. Add or change them by editing PHOTOS below.
 * Each photo should be a wide landscape (>= 1600x900) for best quality.
 */

interface Photo {
  src: string;
  alt: string;
  /** Optional CSS object-position to keep faces / focal points visible */
  position?: string;
}

const PHOTOS: Photo[] = [
  {
    src: '/hero/01.jpg',
    alt: 'A family reviews medication together at a kitchen table.',
    position: 'center',
  },
  {
    src: '/hero/02.jpg',
    alt: 'A caregiver holds the hands of a woman seated in a wheelchair.',
    position: 'center',
  },
  {
    src: '/hero/03.jpg',
    alt: 'A nurse smiles and reaches toward an elderly patient resting in bed.',
    position: 'center',
  },
  {
    src: '/hero/04.jpg',
    alt: 'A caregiver tidies a home while the resident sits nearby.',
    position: 'center',
  },
];

const ADVANCE_MS = 6000;

interface Props {
  houstonCount: number;
}

export function HeroCarousel({ houstonCount }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHOTOS.length);
    }, ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative isolate overflow-hidden border-b border-[var(--line)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Photo stack */}
      <div className="absolute inset-0 z-0 bg-[var(--ink)]">
        {PHOTOS.map((p, i) => (
          <img
            key={p.src}
            src={p.src}
            alt={p.alt}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1200ms] ease-out"
            style={{
              opacity: i === index ? 1 : 0,
              objectPosition: p.position ?? 'center',
            }}
          />
        ))}
        {/* Dark gradient for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(10,10,10,0.78) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.18) 100%)',
          }}
          aria-hidden
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 pb-20 lg:pt-28 lg:pb-28 min-h-[560px] lg:min-h-[640px] flex flex-col justify-center">
        <span
          className="font-mono uppercase tracking-[0.16em] text-[11px] font-semibold mb-5"
          style={{ color: 'rgba(255,255,255,0.72)' }}
        >
          An honest home care directory
        </span>

        <h1
          className="font-display text-white max-w-[18ch]"
          style={{
            fontSize: 'clamp(40px, 6vw, 80px)',
            lineHeight: 1.04,
            letterSpacing: '-0.005em',
            fontWeight: 400,
            textShadow: '0 2px 24px rgba(0,0,0,0.35)',
          }}
        >
          Home care,{' '}
          <em className="italic" style={{ fontWeight: 400 }}>
            honestly
          </em>{' '}
          compared.
        </h1>

        <p
          className="mt-6 max-w-[58ch] text-[16.5px] leading-[1.6]"
          style={{
            color: 'rgba(255,255,255,0.92)',
            textShadow: '0 1px 12px rgba(0,0,0,0.35)',
          }}
        >
          Every licensed home care agency in your city, sourced from{' '}
          <span className="text-white font-medium">
            CMS Home Health Compare
          </span>{' '}
          and <span className="text-white font-medium">Google reviews</span>.
          Free to browse — no sign-up required.
        </p>

        <div className="mt-8 max-w-[640px]">
          <HeroSearch />
          <p className="mt-3 font-mono text-[11.5px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Try: <em className="not-italic">spanish</em> ·{' '}
            <em className="not-italic">dementia</em> ·{' '}
            <em className="not-italic">medicaid</em>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="font-mono text-[12.5px]" style={{ color: 'rgba(255,255,255,0.78)' }}>
            <span className="font-medium text-white">{houstonCount}</span>{' '}
            agencies indexed in Houston · updated this month
          </span>
          <Link
            href="/houston"
            className="text-[13px] underline underline-offset-3"
            style={{ color: 'rgba(255,255,255,0.85)' }}
          >
            Or browse all →
          </Link>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === index}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === index ? 24 : 8,
              background:
                i === index
                  ? 'rgba(255,255,255,0.95)'
                  : 'rgba(255,255,255,0.45)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
