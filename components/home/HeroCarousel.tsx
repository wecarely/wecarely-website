'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

/**
 * Yelp-style hero carousel — city-aware.
 * A Houston | Dallas toggle updates all CTA links so users land in their city.
 */

interface Slide {
  src: string;
  phrase: string;
  ctaLabel: string;
  filterSuffix: string; // appended to /{city}, e.g. '' | '?lang=spanish'
  attribution: string;
  position?: string;
}

const SLIDES: Slide[] = [
  {
    src: '/hero/01.jpg',
    phrase: 'Family-trusted home care.',
    ctaLabel: 'Browse agencies',
    filterSuffix: '',
    attribution: 'Photo: Gustavo Fring · Pexels',
  },
  {
    src: '/hero/02.jpg',
    phrase: 'Caregivers who speak your language.',
    ctaLabel: 'Spanish-speaking',
    filterSuffix: '?lang=spanish',
    attribution: 'Photo: Ivan Samkov · Pexels',
  },
  {
    src: '/hero/03.jpg',
    phrase: 'Skilled nursing, at home.',
    ctaLabel: 'Skilled nursing',
    filterSuffix: '?svc=skilled-nursing',
    attribution: 'Photo: Jsme MILA · Pexels',
  },
  {
    src: '/hero/04.jpg',
    phrase: 'Personal care that fits your day.',
    ctaLabel: 'Personal care',
    filterSuffix: '?svc=personal-care',
    attribution: 'Photo: Jsme MILA · Pexels',
  },
];

const CITIES = [
  { slug: 'houston', label: 'Houston' },
  { slug: 'dallas',  label: 'Dallas'  },
];

const ADVANCE_MS = 7000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [city, setCity] = useState('houston');
  const ticker = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    ticker.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, ADVANCE_MS);
    return () => {
      if (ticker.current) clearInterval(ticker.current);
    };
  }, [paused]);

  const slide = SLIDES[index];
  const ctaHref = `/${city}${slide.filterSuffix}`;

  return (
    <section
      className="relative isolate overflow-hidden bg-[var(--ink)] border-b border-[var(--line)]"
      style={{ height: 'clamp(560px, 85vh, 820px)' }}
    >
      {/* Photo stack */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.phrase}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1500ms] ease-out"
            style={{
              opacity: i === index ? 1 : 0,
              objectPosition: s.position ?? 'center',
            }}
            loading={i === 0 ? 'eager' : 'lazy'}
            fetchPriority={i === 0 ? 'high' : 'low'}
          />
        ))}
        {/* Dark gradient — left heavier for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.45) 35%, rgba(10,10,10,0.10) 70%, rgba(10,10,10,0.05) 100%)',
          }}
          aria-hidden
        />
      </div>

      {/* Left rail: progress bars + pause + attribution */}
      <div className="absolute left-5 lg:left-8 top-0 bottom-0 z-20 flex flex-col justify-between py-10 lg:py-14 pointer-events-none">
        {/* Progress bars (clickable) */}
        <div className="flex flex-col gap-2 pointer-events-auto" role="tablist">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === index}
              className="w-[3px] rounded-full transition-all overflow-hidden"
              style={{
                height: 36,
                background: 'rgba(255,255,255,0.28)',
              }}
            >
              <span
                className="block w-full origin-top transition-transform"
                style={{
                  height: '100%',
                  background: 'rgba(255,255,255,0.95)',
                  transform: i === index ? 'scaleY(1)' : 'scaleY(0)',
                  transitionDuration: i === index && !paused ? `${ADVANCE_MS}ms` : '300ms',
                  transitionTimingFunction: 'linear',
                }}
              />
            </button>
          ))}
        </div>

        {/* Pause + attribution bottom */}
        <div className="space-y-3 pointer-events-auto">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play' : 'Pause'}
            className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors"
            style={{
              borderColor: 'rgba(255,255,255,0.7)',
              color: 'rgba(255,255,255,0.95)',
            }}
          >
            {paused ? (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            ) : (
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <rect x="6" y="5" width="4" height="14" />
                <rect x="14" y="5" width="4" height="14" />
              </svg>
            )}
          </button>
          <p
            className="font-mono uppercase tracking-[0.14em] text-[10.5px]"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {slide.attribution}
          </p>
        </div>
      </div>

      {/* Center-left: phrase + city toggle + CTA */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="mx-auto max-w-[1320px] w-full px-6 lg:px-10 pl-16 lg:pl-24">
          {/* Eyebrow */}
          <p
            className="font-mono uppercase tracking-[0.16em] text-[11px] font-semibold mb-5"
            style={{ color: 'rgba(255,255,255,0.78)' }}
          >
            An honest home care directory · Houston &amp; Dallas, TX
          </p>

          <h1
            className="font-display text-white max-w-[14ch]"
            style={{
              fontSize: 'clamp(40px, 6.5vw, 88px)',
              lineHeight: 1.02,
              letterSpacing: '-0.01em',
              fontWeight: 400,
              textShadow: '0 2px 24px rgba(0,0,0,0.35)',
            }}
          >
            {slide.phrase}
          </h1>

          {/* City toggle + CTA */}
          <div className="mt-8 flex flex-col gap-4">
            {/* City pills */}
            <div className="flex items-center gap-2" role="group" aria-label="Select city">
              {CITIES.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCity(c.slug)}
                  aria-pressed={city === c.slug}
                  className="px-3.5 py-1 rounded-full text-[12.5px] font-medium transition-all"
                  style={
                    city === c.slug
                      ? {
                          background: 'rgba(255,255,255,0.95)',
                          color: 'var(--ink)',
                        }
                      : {
                          background: 'rgba(255,255,255,0.15)',
                          color: 'rgba(255,255,255,0.85)',
                          border: '1px solid rgba(255,255,255,0.3)',
                        }
                  }
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Main CTA row */}
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--accent)] text-[var(--ink)] font-medium hover:bg-[var(--accent-hover)] transition-colors"
                style={{ fontSize: 15.5 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="11" cy="11" r="7" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                {slide.ctaLabel}
              </Link>
              <Link
                href="/for-agencies"
                className="inline-flex items-center gap-1.5 text-white/85 hover:text-white underline-offset-4 hover:underline"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  textShadow: '0 1px 8px rgba(0,0,0,0.35)',
                }}
              >
                For agencies
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
