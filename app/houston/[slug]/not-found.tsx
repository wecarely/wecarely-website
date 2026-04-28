import Link from 'next/link';

export default function AgencyNotFound() {
  return (
    <section>
      <div className="mx-auto max-w-[680px] px-6 lg:px-10 py-24 lg:py-32 text-center">
        <p className="eyebrow mb-5">404 · Agency not found</p>
        <h1
          className="font-display text-[var(--ink)] mb-6"
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            lineHeight: 1.1,
            letterSpacing: '-0.005em',
            fontWeight: 400,
          }}
        >
          That agency isn&apos;t in our Houston directory.
        </h1>
        <p className="text-[15px] text-[var(--ink-2)] mb-10 leading-relaxed">
          It may have changed names, closed, or never been licensed in Harris
          County. We list every Medicare-certified home care agency from CMS —
          if you think one is missing, let us know.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/houston"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] bg-[var(--ink)] text-white font-medium hover:bg-black/90 transition-colors"
            style={{ fontSize: 14.5 }}
          >
            Browse Houston directory
          </Link>
          <a
            href="mailto:hello@wecarely.com?subject=Missing%20agency"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] border border-[var(--line-strong)] text-[var(--ink)] font-medium hover:border-[var(--ink)] transition-colors"
            style={{ fontSize: 14.5 }}
          >
            Report missing agency
          </a>
        </div>
      </div>
    </section>
  );
}
