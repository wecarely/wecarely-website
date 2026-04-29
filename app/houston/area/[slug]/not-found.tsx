import Link from 'next/link';
import { HOUSTON_NEIGHBORHOODS } from '@/lib/houston/neighborhoods';

export default function AreaNotFound() {
  return (
    <section>
      <div className="mx-auto max-w-[820px] px-6 lg:px-10 py-24 lg:py-28 text-center">
        <p className="eyebrow mb-5">404 · Houston area not found</p>
        <h1
          className="font-display text-[var(--ink)] mb-6"
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            lineHeight: 1.1,
            letterSpacing: '-0.005em',
            fontWeight: 400,
          }}
        >
          That Houston area isn&apos;t in our directory yet.
        </h1>
        <p className="text-[15px] text-[var(--ink-2)] mb-10 leading-relaxed max-w-[60ch] mx-auto">
          We currently index home care agencies across the Houston metro
          areas listed below. If your area isn&apos;t covered, browse the
          full Houston directory to search by ZIP, language, insurance, or
          service.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link
            href="/houston"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] bg-[var(--ink)] text-white font-medium hover:bg-black/90 transition-colors"
            style={{ fontSize: 14.5 }}
          >
            All Houston agencies
          </Link>
        </div>

        <p className="eyebrow mb-4">Areas we cover</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-[14px] text-left">
          {HOUSTON_NEIGHBORHOODS.map((n) => (
            <Link
              key={n.slug}
              href={`/houston/area/${n.slug}`}
              className="text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline"
            >
              {n.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
