import Link from 'next/link';

export default function AreaNotFound() {
  return (
    <section>
      <div className="mx-auto max-w-[680px] px-6 lg:px-10 py-24 lg:py-28 text-center">
        <p className="eyebrow mb-5">404 · Area not found</p>
        <h1
          className="font-display text-[var(--ink)] mb-6"
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            lineHeight: 1.1,
            letterSpacing: '-0.005em',
            fontWeight: 400,
          }}
        >
          That neighborhood isn&apos;t in our directory yet.
        </h1>
        <p className="text-[15px] text-[var(--ink-2)] mb-10 leading-relaxed max-w-[60ch] mx-auto">
          We index home care agencies in select metro areas. Head back to the
          city directory to search by ZIP, language, insurance, or service.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-[10px] bg-[var(--ink)] text-white font-medium hover:bg-black/90 transition-colors"
          style={{ fontSize: 14.5 }}
        >
          Back to WeCarely home
        </Link>
      </div>
    </section>
  );
}
