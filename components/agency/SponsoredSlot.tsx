/**
 * Sponsored placement slot — Phase 2 revenue surface.
 *
 * Day 7 state: empty / available, doubles as a sales pitch to agencies.
 * Phase 2: same shape, filled with real Sponsored agency content
 * (data-driven from DB `is_sponsored` flag).
 *
 * Always visible above the organic result list so:
 *   1. Visitors see "some placements are paid" (transparency)
 *   2. Agencies see the slot exists (marketing channel)
 *   3. Slot doesn't appear "out of nowhere" when Phase 2 launches
 */
export function SponsoredSlot() {
  return (
    <article className="result-card group bg-[var(--bg-soft)] border-dashed">
      {/* Col 1 — Index placeholder */}
      <div className="result-index font-mono hidden md:block text-[13px] text-[var(--ink-3)] tabular-nums pt-2">
        ★
      </div>

      {/* Col 2 — Tile placeholder */}
      <div className="relative z-[1] flex items-center justify-center">
        <div
          className="rounded-[10px] border border-dashed flex items-center justify-center"
          style={{
            width: 180,
            height: 180,
            borderColor: 'var(--ink-4)',
            background: 'rgba(245, 197, 24, 0.06)',
          }}
          aria-hidden
        >
          <span
            className="font-display text-[var(--ink-3)]"
            style={{ fontSize: 56, fontWeight: 400 }}
          >
            ✦
          </span>
        </div>
      </div>

      {/* Col 3 — Pitch content */}
      <div className="relative z-[2] min-w-0 flex flex-col justify-center">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3
            className="font-display text-[var(--ink)] leading-[1.15] tracking-[-0.01em]"
            style={{ fontSize: 24, fontWeight: 500 }}
          >
            Featured placements available
          </h3>
          <span
            className="shrink-0 mt-1 inline-flex items-center gap-1 px-2 py-0.5 rounded-[3px] border text-[10.5px] font-mono font-semibold tracking-[0.14em] uppercase"
            style={{
              color: 'var(--ink-2)',
              borderColor: 'var(--line-strong)',
              background: 'var(--bg)',
            }}
          >
            Sponsored
          </span>
        </div>

        <p className="text-[14.5px] leading-[1.6] text-[var(--ink-2)] max-w-[52ch]">
          Premium visibility for verified Houston home care agencies. Sponsored
          placements are{' '}
          <span className="text-[var(--ink)] font-medium">
            clearly labeled
          </span>{' '}
          and{' '}
          <span className="text-[var(--ink)] font-medium">
            do not affect the default trust-based ranking
          </span>
          .
        </p>

        <div className="mt-5 pt-4 border-t border-[var(--line-soft)] flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px]">
          <a
            href="mailto:agencies@wecarely.com?subject=Sponsored%20placement%20enquiry"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[var(--accent)] text-[var(--ink)] font-medium hover:bg-[var(--accent-hover)] transition-colors"
          >
            Reserve this slot
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <span className="font-mono text-[var(--ink-3)]">
            agencies@wecarely.com
          </span>
        </div>
      </div>
    </article>
  );
}
