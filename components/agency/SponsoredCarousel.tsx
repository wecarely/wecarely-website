/**
 * Sponsored carousel — horizontal scrolling row of Featured agency slots.
 *
 * Day 7 state: 4 placeholder cards saying "Available — reserve this slot".
 *   - Doubles as a permanent sales channel: agencies see the slots exist
 *   - Visitors see "some placements are paid" baseline transparency
 *   - Empty state is honest (no fake agencies)
 *
 * Phase 2: replace SLOTS array with real Sponsored agency cards from DB.
 *
 * Yelp-style: horizontal overflow with scroll-snap on cards, fades on edges,
 * subtle scrollbar. Touch-friendly on mobile.
 */

const SLOTS = [1, 2, 3, 4];

export function SponsoredCarousel() {
  return (
    <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-8">
        {/* Section header */}
        <div className="flex items-baseline justify-between mb-5">
          <div className="flex items-baseline gap-3">
            <span className="eyebrow">Sponsored</span>
            <span className="text-[var(--ink-4)]" aria-hidden>·</span>
            <p
              className="font-display text-[var(--ink)]"
              style={{ fontSize: 18, fontWeight: 500 }}
            >
              Featured agencies
            </p>
          </div>
          <a
            href="mailto:agencies@wecarely.com?subject=Sponsored%20placement%20enquiry"
            className="text-[12.5px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline inline-flex items-center gap-1"
          >
            For agencies
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Horizontal scroller */}
        <div
          className="flex gap-4 overflow-x-auto pb-3 -mx-6 px-6 lg:-mx-10 lg:px-10 snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'var(--ink-4) transparent',
          }}
        >
          {SLOTS.map((i) => (
            <a
              key={i}
              href="mailto:agencies@wecarely.com?subject=Sponsored%20placement%20enquiry%20-%20slot%20${i}"
              className="snap-start shrink-0 w-[280px] bg-white border border-dashed rounded-[10px] p-5 transition-all hover:border-[var(--ink-3)] hover:shadow-[0_8px_24px_-12px_rgba(10,10,10,0.08)] flex flex-col"
              style={{ borderColor: 'var(--ink-4)' }}
            >
              {/* Top row: tile + badge */}
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

              {/* Body */}
              <div className="flex-1">
                <h4
                  className="font-display text-[var(--ink)] leading-tight"
                  style={{ fontSize: 16, fontWeight: 500 }}
                >
                  Slot {i} · Available
                </h4>
                <p className="mt-2 text-[12.5px] leading-[1.55] text-[var(--ink-2)]">
                  Featured visibility for verified Houston home care agencies.
                </p>
              </div>

              {/* CTA */}
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
            </a>
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
