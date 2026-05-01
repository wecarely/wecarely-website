'use client';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import type { Agency } from '@/lib/types/agency';
import { LetterTile } from './LetterTile';

/**
 * Sponsored carousel — horizontal scrolling row of Featured agency slots.
 *
 * Renders up to 4 cards. Real sponsors are passed in via the `sponsors` prop
 * (server component fetches via getSponsoredAgencies). Remaining slots are
 * filled with placeholder "Available" cards linking to /for-agencies.
 *
 * Yelp-style: prev/next chevron buttons on the right, scroll-snap on cards,
 * smooth scrolling. Touch-friendly on mobile.
 */

interface Props {
  sponsors: Agency[];
}

const TOTAL_SLOTS = 4;
const CARD_WIDTH = 280 + 16; // card + gap

type GaWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

function trackSponsoredClick(slug: string, position: number) {
  if (typeof window === 'undefined') return;
  const w = window as GaWindow;
  if (typeof w.gtag !== 'function') return;
  w.gtag('event', 'sponsored_click', {
    agency_slug: slug,
    slot_position: position,
  });
}

export function SponsoredCarousel({ sponsors }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    updateButtons();
  }, []);

  // Brand-integrity decision: hide the entire carousel until at least one
  // real sponsor exists. Empty placeholder slots ("Slot 1 · Available")
  // signal "we couldn't sell any" instead of "scarce limited inventory".
  // Once a real sponsor signs up, the section appears with their card +
  // remaining "Available" slots — at which point "Available" reads as
  // genuine scarcity (someone IS already paying for this).
  // (Early return AFTER hooks to satisfy React rules-of-hooks.)
  if (sponsors.length === 0) {
    return null;
  }

  const scroll = (direction: -1 | 1) => {
    scrollRef.current?.scrollBy({
      left: direction * CARD_WIDTH * 2,
      behavior: 'smooth',
    });
  };

  // Pad sponsors to exactly TOTAL_SLOTS — real first, placeholder fillers after
  const realSponsors = sponsors.slice(0, TOTAL_SLOTS);
  const placeholderCount = Math.max(0, TOTAL_SLOTS - realSponsors.length);
  // Numbering placeholder slots so the CTA reads "Slot 3 · Available" naturally
  const placeholderStartNumber = realSponsors.length + 1;

  return (
    <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-8">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-5 gap-4">
          <div className="flex items-baseline gap-3 min-w-0">
            <span className="eyebrow">Sponsored</span>
            <span className="text-[var(--ink-4)]" aria-hidden>·</span>
            <p
              className="font-display text-[var(--ink)] truncate"
              style={{ fontSize: 18, fontWeight: 500 }}
            >
              Featured agencies
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/for-agencies"
              className="text-[12.5px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline inline-flex items-center gap-1"
            >
              For agencies
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <div className="flex items-center gap-1.5 ml-1">
              <button
                type="button"
                onClick={() => scroll(-1)}
                disabled={!canScrollLeft}
                aria-label="Previous featured agencies"
                className="w-9 h-9 rounded-full border bg-white flex items-center justify-center transition-all hover:border-[var(--ink-2)] hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--line-strong)] disabled:hover:shadow-none"
                style={{ borderColor: 'var(--line-strong)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scroll(1)}
                disabled={!canScrollRight}
                aria-label="Next featured agencies"
                className="w-9 h-9 rounded-full border bg-white flex items-center justify-center transition-all hover:border-[var(--ink-2)] hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-[var(--line-strong)] disabled:hover:shadow-none"
                style={{ borderColor: 'var(--line-strong)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal scroller */}
        <div
          ref={scrollRef}
          onScroll={updateButtons}
          className="flex gap-4 overflow-x-auto pb-3 -mx-6 px-6 lg:-mx-10 lg:px-10 snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--ink-4) transparent',
          }}
        >
          {/* Real sponsor cards */}
          {realSponsors.map((agency, idx) => (
            <SponsoredCard
              key={agency.id}
              agency={agency}
              position={idx + 1}
            />
          ))}

          {/* Placeholder slots filling up to 4 */}
          {Array.from({ length: placeholderCount }, (_, i) => placeholderStartNumber + i).map((slotNum) => (
            <Link
              key={`slot-${slotNum}`}
              href={`/for-agencies?slot=${slotNum}#how-it-works`}
              className="snap-start shrink-0 w-[280px] bg-white border border-dashed rounded-[10px] p-5 transition-all hover:border-[var(--ink-3)] hover:shadow-[0_8px_24px_-12px_rgba(10,10,10,0.08)] flex flex-col"
              style={{ borderColor: 'var(--ink-4)' }}
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <div
                  className="rounded-[8px] flex items-center justify-center shrink-0"
                  style={{
                    width: 56,
                    height: 56,
                    background: 'rgba(245, 197, 24, 0.12)',
                    border: '1px dashed var(--ink-4)',
                  }}
                  aria-hidden
                >
                  <span
                    className="font-display text-[var(--ink-3)]"
                    style={{ fontSize: 24, fontWeight: 400 }}
                  >
                    ✦
                  </span>
                </div>
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-[3px] border text-[10px] font-mono font-semibold tracking-[0.14em] uppercase"
                  style={{
                    color: 'var(--ink-2)',
                    borderColor: 'var(--line-strong)',
                    background: 'var(--bg)',
                  }}
                >
                  Sponsored
                </span>
              </div>

              <div className="flex-1">
                <h4
                  className="font-display text-[var(--ink)] leading-tight"
                  style={{ fontSize: 16, fontWeight: 500 }}
                >
                  Slot {slotNum} · Available
                </h4>
                <p className="mt-2 text-[12.5px] leading-[1.55] text-[var(--ink-2)]">
                  Featured visibility for verified Houston home care agencies.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--line-soft)] flex items-center justify-between">
                <span className="text-[12px] font-medium text-[var(--ink)]">
                  Reserve this slot
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[var(--ink-2)]"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust footnote */}
        <p className="mt-3 text-[11px] text-[var(--ink-3)] font-mono">
          Sponsored placements are clearly labeled and do not affect the default
          trust-based ranking.
        </p>
      </div>
    </section>
  );
}

/**
 * Real-sponsor card — renders agency logo (with LetterTile fallback),
 * name, tagline, and a link to the agency detail page. Tracks click
 * via GA4 event for sponsor reporting.
 */
function SponsoredCard({
  agency,
  position,
}: {
  agency: Agency;
  position: number;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const showLogo = !!agency.sponsor_logo_url && !imgFailed;
  const tagline =
    agency.sponsor_tagline ??
    agency.ai_summary ??
    'Featured Houston home care agency.';

  const citySlug = (agency.city ?? 'houston').toLowerCase();

  return (
    <Link
      href={`/${citySlug}/${agency.slug}`}
      onClick={() => trackSponsoredClick(agency.slug, position)}
      className="snap-start shrink-0 w-[280px] bg-white border rounded-[10px] p-5 transition-all hover:border-[var(--ink)] hover:shadow-[0_8px_24px_-10px_rgba(10,10,10,0.12)] flex flex-col"
      style={{ borderColor: 'var(--line-strong)' }}
    >
      {/* Top row: logo or LetterTile + Sponsored badge */}
      <div className="flex items-start justify-between gap-2 mb-4">
        <div
          className="rounded-[8px] flex items-center justify-center shrink-0 overflow-hidden"
          style={{
            width: 56,
            height: 56,
            background: showLogo ? '#fff' : undefined,
          }}
        >
          {showLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={agency.sponsor_logo_url!}
              alt={`${agency.name} logo`}
              width={56}
              height={56}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <LetterTile name={agency.name} size={56} fontSize={22} />
          )}
        </div>
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-[3px] border text-[10px] font-mono font-semibold tracking-[0.14em] uppercase"
          style={{
            color: 'var(--ink-2)',
            borderColor: 'var(--line-strong)',
            background: 'var(--bg)',
          }}
        >
          Sponsored
        </span>
      </div>

      {/* Body */}
      <div className="flex-1">
        <h4
          className="font-display text-[var(--ink)] leading-tight line-clamp-2"
          style={{ fontSize: 16, fontWeight: 500 }}
        >
          {agency.name}
        </h4>
        <p className="mt-2 text-[12.5px] leading-[1.55] text-[var(--ink-2)] line-clamp-3">
          {tagline}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-4 pt-3 border-t border-[var(--line-soft)] flex items-center justify-between">
        <span className="text-[12px] font-medium text-[var(--ink)]">
          View profile
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--ink-2)]"
          aria-hidden
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
