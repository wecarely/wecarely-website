export function Header() {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 h-16 flex items-center justify-between">
        <a
          href="/"
          className="font-display text-[22px] tracking-[-0.02em] leading-none text-[var(--ink)]"
          style={{ fontVariationSettings: '"opsz" 32, "SOFT" 0', fontWeight: 500 }}
        >
          WeCarely
        </a>
        <span className="text-[13px] text-[var(--ink-2)] hidden sm:inline">
          Houston · TX
        </span>
      </div>
    </header>
  );
}
