import Link from 'next/link';

/**
 * Yelp-style "Categories" tile row — but for WeCarely's filter axes.
 * 6 most common entry points (popular searches).
 * Each tile is a deep link to a pre-filtered listing.
 */

const TILES = [
  { href: '/houston?lang=spanish',     label: 'Spanish-speaking',  glyph: 'Es' },
  { href: '/houston?lang=vietnamese',  label: 'Vietnamese',        glyph: 'Vi' },
  { href: '/houston?lang=chinese',     label: 'Chinese',           glyph: '中' },
  { href: '/houston?ins=medicaid',     label: 'Accepts Medicaid',  glyph: '$' },
  { href: '/houston?svc=dementia',     label: 'Dementia care',     glyph: '⌬' },
  { href: '/houston?svc=hospice',      label: 'Hospice',           glyph: '✜' },
];

export function QuickFilters() {
  return (
    <section className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-12 lg:py-16">
        <div className="flex items-baseline justify-between mb-6">
          <p className="eyebrow">Popular searches</p>
          <Link
            href="/houston"
            className="text-[12.5px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline inline-flex items-center gap-1"
          >
            See all filters
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TILES.map((t) => (
            <Link
              key={t.href}
              href={t.href}
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
