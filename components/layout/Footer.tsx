export function Footer() {
  return (
    <footer className="mt-32 border-t border-[var(--ink)] bg-[var(--paper-soft)]">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-10 py-16">
        {/* Manifesto */}
        <p
          className="font-display font-medium leading-[1.25] tracking-[-0.015em] text-[var(--ink)] max-w-2xl"
          style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}
        >
          We don&apos;t sell leads. We don&apos;t share your contact information.
          <span className="text-[var(--ink-2)]"> Our rankings cannot be bought.</span>
        </p>

        <span
          className="block text-[var(--ink-3)] my-12 select-none"
          aria-hidden
          style={{ fontSize: 24 }}
        >
          ⁂
        </span>

        {/* Colophon grid */}
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 text-[13px]">
          <div>
            <dt className="eyebrow mb-2">Data</dt>
            <dd className="text-[var(--ink-2)] leading-relaxed">
              CMS Home Health Compare · Google · Verified updates
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-2">Coverage</dt>
            <dd className="text-[var(--ink-2)] leading-relaxed">Houston, Texas</dd>
          </div>
          <div>
            <dt className="eyebrow mb-2">Languages</dt>
            <dd className="text-[var(--ink-2)] leading-relaxed">
              English · Español · Tiếng Việt · 中文
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-2">For Agencies</dt>
            <dd className="text-[var(--ink-2)] leading-relaxed underline underline-offset-2 decoration-[var(--ink-4)] hover:decoration-[var(--ink)] cursor-default">
              Claim your listing
            </dd>
          </div>
        </dl>

        <div className="mt-16 pt-6 border-t border-[var(--line)] flex justify-between items-baseline text-[12px] text-[var(--ink-3)]">
          <span>© 2026 WeCarely</span>
          <span className="font-display italic" style={{ fontVariationSettings: '"opsz" 14' }}>
            Made in Houston.
          </span>
        </div>
      </div>
    </footer>
  );
}
