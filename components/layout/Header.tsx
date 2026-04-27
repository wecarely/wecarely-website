export function Header() {
  return (
    <header className="border-b border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 h-16 flex items-center justify-between">
        <a
          href="/"
          className="font-display text-[20px] leading-none text-[var(--ink)]"
          style={{ fontWeight: 500 }}
        >
          WeCarely
        </a>
        <span className="eyebrow">Houston · TX</span>
      </div>
    </header>
  );
}
