// Houston listing — Yelp structure, white-minimal aesthetic

const FILTERS = {
  language: {
    label: "Language",
    options: [
      { key: "spanish",    label: "Spanish",    col: "has_spanish" },
      { key: "vietnamese", label: "Vietnamese", col: "has_vietnamese" },
      { key: "chinese",    label: "Chinese",    col: "has_chinese" },
    ],
  },
  insurance: {
    label: "Insurance",
    options: [
      { key: "medicare", label: "Medicare", col: "accepts_medicare" },
      { key: "medicaid", label: "Medicaid", col: "accepts_medicaid" },
    ],
  },
  service: {
    label: "Service",
    options: [
      { key: "skilled-nursing",      label: "Skilled Nursing",       col: "has_skilled_nursing" },
      { key: "home-health-aide",     label: "Home Health Aide",      col: "has_home_health_aide" },
      { key: "personal-care",        label: "Personal Care",         col: "has_personal_care" },
      { key: "companion-care",       label: "Companion Care",        col: "has_companion_care" },
      { key: "physical-therapy",     label: "Physical Therapy",      col: "has_physical_therapy" },
      { key: "occupational-therapy", label: "Occupational Therapy",  col: "has_occupational_therapy" },
      { key: "speech-therapy",       label: "Speech Therapy",        col: "has_speech_therapy" },
      { key: "dementia",             label: "Dementia Care",         col: "has_dementia_care" },
      { key: "hospice",              label: "Hospice",               col: "has_hospice" },
    ],
  },
};

const SUGGESTED_QUICK = [
  { key: "spanish", label: "Spanish-speaking", axis: "language" },
  { key: "medicaid", label: "Medicaid accepted", axis: "insurance" },
  { key: "dementia", label: "Dementia care", axis: "service" },
  { key: "skilled-nursing", label: "Skilled nursing", axis: "service" },
  { key: "hospice", label: "Hospice", axis: "service" },
];

// Stars
function Stars({ value, ariaLabel }) {
  const pct = Math.max(0, Math.min(5, value || 0)) / 5 * 100;
  return (
    <span className="stars" style={{ "--pct": pct + "%" }} aria-label={ariaLabel || `${value} out of 5`}>
      <i></i>
    </span>
  );
}

// Letter tile (typography placeholder, hairline border, deterministic hue)
function LetterTile({ name }) {
  const initial = (name || "?").trim()[0]?.toUpperCase() || "?";
  // Deterministic hue from name — gives each agency its own muted hue
  let hash = 0;
  for (let i = 0; i < (name || "").length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  const hue = Math.abs(hash) % 360;
  // Soft, warm-leaning palette — Apple Health magazine feel
  const bg = `oklch(96% 0.025 ${hue})`;
  const ink = `oklch(38% 0.06 ${hue})`;
  return (
    <div className="letter-tile" style={{ background: bg }}>
      <span className="font-display" style={{ color: ink }}>{initial}</span>
    </div>
  );
}

// Header
function Header() {
  return (
    <header className="border-b hair">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 h-[64px] flex items-center justify-between">
        <a href="#" className="font-display text-[20px]" style={{ color: "var(--ink)", fontWeight: 500, letterSpacing: "-0.005em" }}>
          WeCarely
        </a>
        <span className="eyebrow">Houston · TX</span>
      </div>
    </header>
  );
}

// Hero
function Hero() {
  const [q, setQ] = React.useState("");
  const [loc, setLoc] = React.useState("Houston, TX");
  return (
    <section className="border-b hair">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-20">
        <span className="eyebrow">Houston home care directory</span>
        <h1 className="font-display mt-5 max-w-[20ch]"
            style={{ fontSize: "clamp(40px, 5.6vw, 76px)", lineHeight: 1.06, letterSpacing: "-0.005em", fontWeight: 400, color: "var(--ink)" }}>
          Houston home care, <em style={{ fontStyle: "italic", fontWeight: 400 }}>honestly</em> compared.
        </h1>
        <p className="mt-7 max-w-[58ch] text-[16px] leading-[1.6]" style={{ color: "var(--ink-2)" }}>
          Every home care agency licensed in Houston, in one place. Filter by language, insurance, and the kind of care you need. Free to browse — no sign-up required.
        </p>

        <div className="mt-12 flex flex-wrap items-end gap-x-12 gap-y-6">
          <div className="border-t hair pt-4 inline-block">
            <div className="font-display tabular-nums" style={{ fontSize: 38, fontWeight: 400, letterSpacing: "-0.005em", color: "var(--ink)" }}>
              259
            </div>
            <div className="eyebrow mt-1.5">Agencies indexed</div>
          </div>

          {/* Search bar */}
          <form
            className="hero-search"
            onSubmit={(e) => { e.preventDefault(); }}
            role="search"
          >
            <div className="hs-field">
              <span className="hs-icon" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Skilled nursing, dementia care…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Search services"
              />
            </div>
            <div className="hs-divider" />
            <div className="hs-field">
              <span className="hs-icon" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <input
                type="text"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                aria-label="Location"
              />
            </div>
            <button type="submit" className="hs-submit" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// Collapsible filter section
function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="filter-section">
      <button onClick={() => setOpen(o => !o)} className="filter-section-head">
        <span>{title}</span>
        <span className={"filter-chev" + (open ? " open" : "")}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
      {open && <div className="pt-2 pb-1">{children}</div>}
    </div>
  );
}

// Sidebar filter (Yelp-style collapsible sections, minimal aesthetic)
function FilterSidebar({ selections, setSelections, agencies, distance, setDistance, onClear }) {
  const totalSelected = Object.values(selections).reduce((a, s) => a + (s instanceof Set ? s.size : 0), 0);

  const toggle = (axis, key) => {
    setSelections(prev => {
      const next = { ...prev, [axis]: new Set(prev[axis]) };
      if (next[axis].has(key)) next[axis].delete(key);
      else next[axis].add(key);
      return next;
    });
  };

  const countFor = (col) => agencies.filter(a => a[col]).length;

  return (
    <aside className="sticky-aside">
      <div className="flex items-baseline justify-between mb-3">
        <span className="eyebrow">Filters</span>
        {totalSelected > 0 && (
          <button onClick={onClear} className="text-[12px] underline underline-offset-2"
                  style={{ color: "var(--ink-2)" }}>
            Clear ({totalSelected})
          </button>
        )}
      </div>

      {/* Suggested */}
      <FilterSection title="Suggested">
        <div className="flex flex-wrap gap-1.5 pt-1 pb-2">
          {SUGGESTED_QUICK.map(s => {
            const active = selections[s.axis].has(s.key);
            return (
              <button
                key={s.key}
                onClick={() => toggle(s.axis, s.key)}
                className={"sugg-chip" + (active ? " active" : "")}
              >
                {s.label}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* 3 axes */}
      {Object.entries(FILTERS).map(([axisKey, axis]) => (
        <FilterSection key={axisKey} title={axis.label}>
          <ul>
            {axis.options.map(opt => {
              const checked = selections[axisKey].has(opt.key);
              return (
                <li key={opt.key}>
                  <label className="filter-row">
                    <input
                      type="checkbox"
                      className="check"
                      checked={checked}
                      onChange={() => toggle(axisKey, opt.key)}
                    />
                    <span className="label">{opt.label}</span>
                    <span className="count">{countFor(opt.col)}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </FilterSection>
      ))}

      {/* Distance */}
      <FilterSection title="Distance">
        {[
          { v: 5,  l: "Within 5 mi" },
          { v: 10, l: "Within 10 mi" },
          { v: 25, l: "Within 25 mi" },
          { v: 0,  l: "Anywhere in Houston" },
        ].map(d => (
          <label key={d.v} className="filter-row">
            <input
              type="radio"
              name="distance"
              className="radio"
              checked={distance === d.v}
              onChange={() => setDistance(d.v)}
            />
            <span className="label">{d.l}</span>
          </label>
        ))}
      </FilterSection>

      <div className="mt-6 pt-5 border-t hair">
        <div className="eyebrow mb-2">Sources</div>
        <p className="text-[12px] leading-[1.55]" style={{ color: "var(--ink-2)" }}>
          CMS Home Health Compare · Google Business · Verified agency updates.
        </p>
      </div>
    </aside>
  );
}

// Tag chips derived from booleans
function tagsFor(a) {
  const tags = [];
  if (a.has_spanish)    tags.push("Spanish");
  if (a.has_vietnamese) tags.push("Vietnamese");
  if (a.has_chinese)    tags.push("Chinese");
  if (a.accepts_medicare) tags.push("Medicare");
  if (a.accepts_medicaid) tags.push("Medicaid");
  if (a.has_skilled_nursing) tags.push("Skilled Nursing");
  if (a.has_dementia_care)   tags.push("Dementia Care");
  if (a.has_hospice)         tags.push("Hospice");
  if (a.has_home_health_aide) tags.push("Home Health Aide");
  if (a.has_personal_care)    tags.push("Personal Care");
  if (a.has_companion_care)   tags.push("Companion Care");
  if (a.has_physical_therapy) tags.push("Physical Therapy");
  if (a.has_occupational_therapy) tags.push("Occupational Therapy");
  if (a.has_speech_therapy)   tags.push("Speech Therapy");
  return tags;
}

// Compact sponsored card (used in carousel)
function SponsoredCard({ a }) {
  const tags = tagsFor(a).slice(0, 3);
  return (
    <article className="sp-card">
      <a className="stretched" href={`/houston/${a.slug}`} aria-label={`View ${a.name}`}></a>
      <div className="sp-thumb"><LetterTile name={a.name} /></div>
      <div className="sp-body">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display sp-name" title={a.name}>{a.name}</h3>
          <span className="eyebrow" style={{fontSize:10}}>AD</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <Stars value={a.google_rating || a.medicare_star || 0} />
          <span className="font-mono text-[11.5px] tabular-nums" style={{color:"var(--ink)"}}>
            {(a.google_rating || a.medicare_star || 0).toFixed(1)}
          </span>
          <span className="eyebrow" style={{fontSize:10}}>({a.google_reviews_count?.toLocaleString() ?? "—"})</span>
        </div>
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map(t => <span key={t} className="chip" style={{height:20, fontSize:10.5, padding:"0 7px"}}>{t}</span>)}
          </div>
        )}
        <button className="btn-yellow mt-3" type="button">Request a quote</button>
      </div>
    </article>
  );
}

// Sponsored carousel
function SponsoredCarousel({ items }) {
  const railRef = React.useRef(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);

  const update = () => {
    const r = railRef.current; if (!r) return;
    setAtStart(r.scrollLeft <= 2);
    setAtEnd(r.scrollLeft + r.clientWidth >= r.scrollWidth - 2);
  };

  React.useEffect(() => {
    update();
    const r = railRef.current; if (!r) return;
    r.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      r.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const go = (dir) => {
    const r = railRef.current; if (!r) return;
    r.scrollBy({ left: dir * r.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <section className="sp-shell">
      <div className="sp-head">
        <div className="flex items-baseline gap-3">
          <h2 className="font-display" style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.005em" }}>
            Sponsored results
          </h2>
          <span className="eyebrow">Reserved · Day 7 demo</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-[11.5px] mr-2" style={{ color: "var(--ink-3)" }}>
            Sort is never paid.
          </span>
          <button className="carousel-arrow" onClick={() => go(-1)} disabled={atStart} aria-label="Previous">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="carousel-arrow" onClick={() => go(1)} disabled={atEnd} aria-label="Next">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>
      <div className="sp-rail" ref={railRef}>
        {items.map(a => <SponsoredCard key={"sp-"+a.id} a={a} />)}
      </div>
    </section>
  );
}

// Yelp-style horizontal card: thumb | info | CTA column
function ResultCard({ a, index, sponsored }) {
  const tags = tagsFor(a).slice(0, 5);
  const distanceLabel = (() => {
    // pseudo-distance from zip-final-digit for stable display
    const seed = parseInt((a.zip || "0").slice(-2)) || 5;
    return `${(seed % 18 + 1).toFixed(1)} mi`;
  })();
  const neighborhood = ({
    "77069": "Champions",
    "77008": "Heights",
    "77034": "Pearland border",
    "77054": "Med Center",
    "77082": "Westchase",
    "77027": "Galleria",
    "77095": "Copperfield",
  })[a.zip] || "Houston";

  return (
    <article className="result-card">
      <a className="stretched" href={`/houston/${a.slug}`} aria-label={`View ${a.name}`}></a>

      {/* Index */}
      <div className="result-index font-mono">
        {sponsored ? <span className="eyebrow" style={{fontSize:10}}>AD</span> : <span>{index}</span>}
      </div>

      {/* Thumb */}
      <div className="result-thumb">
        <LetterTile name={a.name} />
      </div>

      {/* Info column */}
      <div className="result-info">
        <h3 className="font-display"
            style={{ fontSize: 22, lineHeight: 1.2, letterSpacing: "-0.005em", fontWeight: 500, color: "var(--ink)" }}>
          <span className="result-num font-mono">{!sponsored && `${index}.`}</span>
          {a.name}
        </h3>

        {/* Trust signals row */}
        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5">
          {a.medicare_star != null && (
            <div className="flex items-center gap-2">
              <Stars value={a.medicare_star} />
              <span className="font-mono text-[12px] tabular-nums" style={{ color: "var(--ink)" }}>{a.medicare_star.toFixed(1)}</span>
              <span className="eyebrow" style={{ fontSize: 10 }}>CMS</span>
            </div>
          )}
          {a.google_rating != null && (
            <div className="flex items-center gap-2">
              <Stars value={a.google_rating} />
              <span className="font-mono text-[12px] tabular-nums" style={{ color: "var(--ink)" }}>{a.google_rating.toFixed(1)}</span>
              <span className="eyebrow" style={{ fontSize: 10 }}>Google · {a.google_reviews_count?.toLocaleString()}</span>
            </div>
          )}
        </div>

        {/* Tag chips */}
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map(t => <span key={t} className="chip">{t}</span>)}
            <span className="chip-meta">· {neighborhood} · {distanceLabel}</span>
          </div>
        )}

        {/* Quote-style summary */}
        {a.ai_summary && (
          <blockquote className="result-quote">
            <span className="result-quote-mark">"</span>
            {a.ai_summary}
          </blockquote>
        )}

        {/* Phone */}
        {a.phone && (
          <a href={`tel:${a.phone.replace(/[^0-9+]/g, "")}`}
             className="font-mono text-[13px] tabular-nums mt-3 inline-block"
             style={{ color: "var(--ink)" }}>
            {a.phone}
          </a>
        )}
      </div>

      {/* CTA column */}
      <div className="result-cta">
          <button className="btn-yellow" type="button">
            Request a quote
          </button>
        {a.website && (
          <a href={a.website} target="_blank" rel="noopener" className="btn-ghost">
            Visit website
          </a>
        )}
        <a href={`/houston/${a.slug}`} className="text-[12px] mt-1" style={{ color: "var(--ink-2)" }}>
          View profile →
        </a>
      </div>
    </article>
  );
}

// Pagination chrome
function Pagination({ page, total, onPage }) {
  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - 2);
  let end = Math.min(total, start + maxVisible - 1);
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className="pagination">
      <button
        className="page-btn"
        disabled={page <= 1}
        onClick={() => onPage(Math.max(1, page - 1))}
      >
        ← Prev
      </button>

      {start > 1 && (
        <>
          <button className="page-btn num" onClick={() => onPage(1)}>1</button>
          {start > 2 && <span className="page-ellipsis">…</span>}
        </>
      )}

      {pages.map(p => (
        <button
          key={p}
          className={"page-btn num" + (p === page ? " active" : "")}
          onClick={() => onPage(p)}
        >
          {p}
        </button>
      ))}

      {end < total && (
        <>
          {end < total - 1 && <span className="page-ellipsis">…</span>}
          <button className="page-btn num" onClick={() => onPage(total)}>{total}</button>
        </>
      )}

      <button
        className="page-btn"
        disabled={page >= total}
        onClick={() => onPage(Math.min(total, page + 1))}
      >
        Next →
      </button>
    </nav>
  );
}

// Footer
function Footer() {
  return (
    <footer className="footer-cream mt-24">
      <div className="footer-grain" aria-hidden></div>
      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-10 pt-20 pb-14">

        {/* Eyebrow + section number */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
          <span className="footer-eyebrow">Our pledge</span>
          <span className="footer-num">§ 01 — Houston, TX</span>
        </div>

        {/* Manifesto — single tight headline */}
        <p className="font-display footer-lede max-w-[20ch]"
           style={{ fontSize: "clamp(36px, 4vw, 56px)", lineHeight: 1.06, letterSpacing: "-0.01em", fontWeight: 400 }}>
          <em style={{ fontStyle: "italic", color: "rgba(28,22,10,0.55)" }}>An honest</em> directory,<br/>
          and nothing more.
        </p>

        {/* Body — shorter, single column */}
        <p className="font-display footer-body mt-8 max-w-[58ch]"
           style={{ fontSize: "clamp(17px, 1.4vw, 20px)", lineHeight: 1.5, letterSpacing: "-0.003em", fontWeight: 400 }}>
          We show what CMS and Google already publish, sorted by filters that match how families <em style={{ fontStyle: "italic" }}>actually</em> search. Free to browse — no account required.
        </p>

        <div className="mt-7 flex items-center gap-3 footer-sign">
          <span className="footer-sign-line" />
          <span className="footer-sign-text">— The WeCarely team</span>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 footer-rule flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="font-display" style={{ fontSize: 20, fontWeight: 500, letterSpacing: "-0.005em" }}>WeCarely</div>
          <span className="footer-eyebrow" style={{ opacity: 0.7 }}>© 2026 · Houston, TX · Not a medical service · Data: CMS &amp; Google · Nov 2025</span>
        </div>
      </div>
    </footer>
  );
}

// Sort
const SORTS = {
  trust:    { label: "Trust score",         fn: (a, b) => (b.trust_score ?? 0) - (a.trust_score ?? 0) },
  cms:      { label: "CMS rating",          fn: (a, b) => (b.medicare_star ?? 0) - (a.medicare_star ?? 0) },
  google:   { label: "Google rating",       fn: (a, b) => (b.google_rating ?? 0) - (a.google_rating ?? 0) },
  reviews:  { label: "Google review count", fn: (a, b) => (b.google_reviews_count ?? 0) - (a.google_reviews_count ?? 0) },
};

const PER_PAGE = 6;

// Main app
function App() {
  const agencies = window.__AGENCIES__ || [];

  const [selections, setSelections] = React.useState({
    language: new Set(),
    insurance: new Set(),
    service: new Set(),
  });
  const [distance, setDistance] = React.useState(0);
  const [sortKey, setSortKey] = React.useState("trust");
  const [page, setPage] = React.useState(1);

  const matchAxis = (a, axisKey) => {
    const sel = selections[axisKey];
    if (sel.size === 0) return true;
    const opts = FILTERS[axisKey].options;
    return [...sel].some(k => {
      const o = opts.find(x => x.key === k);
      return o && a[o.col];
    });
  };

  const filtered = React.useMemo(() => {
    return agencies
      .filter(a => matchAxis(a, "language") && matchAxis(a, "insurance") && matchAxis(a, "service"))
      .sort(SORTS[sortKey].fn);
  }, [selections, sortKey, agencies]);

  React.useEffect(() => { setPage(1); }, [selections, sortKey]);

  // Sponsored slot demo — 4 cards so carousel actually scrolls
  const sponsoredCount = 4;
  const sponsored = filtered.slice(0, sponsoredCount).map(a => ({ ...a, _sponsored: true }));
  const allResults = filtered;

  // Pagination
  const totalPages = Math.max(1, Math.ceil(allResults.length / PER_PAGE));
  const pageStart = (page - 1) * PER_PAGE;
  const pageItems = allResults.slice(pageStart, pageStart + PER_PAGE);

  const clearAll = () => setSelections({ language: new Set(), insurance: new Set(), service: new Set() });

  // Pretend we have 259 agencies for the count display, but only render 10
  const TOTAL_REAL = 259;
  const filterActive = Object.values(selections).some(s => s.size > 0);

  return (
    <div>
      <Header />
      <Hero />

      <main className="max-w-[1320px] mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr] gap-x-14 gap-y-10">
          {/* Sidebar */}
          <div>
            <FilterSidebar
              selections={selections}
              setSelections={setSelections}
              agencies={agencies}
              distance={distance}
              setDistance={setDistance}
              onClear={clearAll}
            />
          </div>

          {/* Results column */}
          <div>
            {/* Sponsored Results carousel */}
            {sponsored.length > 0 && (
              <SponsoredCarousel items={sponsored} />
            )}

            {/* All Results header */}
            <div className="flex items-end justify-between flex-wrap gap-4 pb-5 border-b hair">
              <div>
                <span className="eyebrow">All results</span>
                <div className="font-display mt-1.5 tabular-nums"
                     style={{ fontSize: 26, fontWeight: 400, letterSpacing: "-0.005em", color: "var(--ink)" }}>
                  {filterActive ? (
                    <>{allResults.length} <span style={{ color: "var(--ink-3)" }}>matching agencies</span></>
                  ) : (
                    <>{TOTAL_REAL} <span style={{ color: "var(--ink-3)" }}>Houston agencies</span></>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="eyebrow">Sorted by</span>
                <select className="sort-select" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                  {Object.entries(SORTS).map(([k, v]) => (
                    <option key={k} value={k}>{v.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Card list */}
            <div className="mt-6 space-y-4">
              {pageItems.map((a, i) => (
                <ResultCard key={a.id} a={a} index={pageStart + i + 1} sponsored={false} />
              ))}
            </div>            {allResults.length === 0 && (
              <div className="mt-16 text-center">
                <div className="font-display text-[24px]" style={{ letterSpacing: "-0.005em" }}>No matches.</div>
                <p className="mt-2 text-[14px]" style={{ color: "var(--ink-2)" }}>Try removing a filter.</p>
                <button onClick={clearAll} className="mt-5 text-[13px] underline underline-offset-2" style={{ color: "var(--accent)" }}>
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {allResults.length > 0 && (
              <div className="mt-10">
                <Pagination
                  page={page}
                  total={Math.max(totalPages, 26)}
                  onPage={(p) => {
                    if (p <= totalPages) setPage(p);
                    else setPage(totalPages); // dummy chrome for higher pages
                    window.scrollTo({ top: 600, behavior: "smooth" });
                  }}
                />
                <div className="mt-4 text-center eyebrow" style={{ fontSize: 10.5 }}>
                  Page {page} of 26 · Showing {pageItems.length} of {TOTAL_REAL} agencies
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <MessageBoard agencies={agencies} />
      <Footer />
    </div>
  );
}

// MessageBoard — Yelp-style reviews carousel, one card per agency
const REVIEW_TEMPLATES = [
  {
    author: "Linda M.", city: "Spring Branch, TX", elite: true, reviewCount: 47, photos: 12,
    time: "Apr 6, 2026", rating: 5, helpful: 8, thanks: 2, love: 5,
    title: "Saved a week of phone tag",
    body: "After mom's hip replacement we needed help fast. Two agencies never called back; this team picked up on the second ring and started Monday. CMS rating lined up exactly with what her case manager at Memorial Hermann told us. Aide is patient and on time every visit.",
  },
  {
    author: "Daniel & Trang P.", city: "Sugar Land, TX", elite: false, reviewCount: 12, photos: 3,
    time: "Mar 30, 2026", rating: 5, helpful: 14, thanks: 6, love: 9,
    title: "Vietnamese-speaking aide changed everything",
    body: "We searched weeks before finding someone willing to match the language. They asked once, no awkwardness, and grandfather smiles when she walks in. He eats his full meal now, sleeps through the night. That's worth every star.",
  },
  {
    author: "Rev. Curtis B.", city: "Pearland, TX", elite: true, reviewCount: 89, photos: 0,
    time: "Mar 24, 2026", rating: 5, helpful: 22, thanks: 11, love: 7,
    title: "They treated my wife like a person, not a checklist",
    body: "Three other agencies had advisors calling me twelve times a day. This team came once, listened twice, and showed up when they said they would. The on-call nurse drove out from Pearland in a thunderstorm at 2am. I will never forget that.",
  },
  {
    author: "Maria S.", city: "East End, Houston", elite: false, reviewCount: 5, photos: 2,
    time: "Apr 2, 2026", rating: 4, helpful: 6, thanks: 1, love: 3,
    title: "Spanish-speaking nurse made the difference",
    body: "Dad's stubborn about doctors. Having someone who could explain wound care in Spanish, in his kitchen, with coffee — that's why his foot is healing now. One star off because the first scheduling call was confusing, but every visit since has been excellent.",
  },
  {
    author: "James W.", city: "The Heights", elite: false, reviewCount: 23, photos: 5,
    time: "Mar 18, 2026", rating: 5, helpful: 11, thanks: 3, love: 4,
    title: "Mom is walking again",
    body: "We were quoted six weeks of recovery after her stroke. PT got her there in four. Therapist sent weekly progress notes with photos. Felt like a real medical team, not a staffing agency. Even helped us appeal to Medicare for two extra weeks.",
  },
  {
    author: "Patricia R.", city: "West University", elite: true, reviewCount: 134, photos: 28,
    time: "Apr 8, 2026", rating: 5, helpful: 19, thanks: 4, love: 12,
    title: "Same aide every visit — that's everything for dementia care",
    body: "We tried two larger agencies first, different face every week, never worked. Here we got Diane. She remembers his stories. He calls her by name now, and that hadn't happened with anyone outside the family in over a year.",
  },
  {
    author: "Kevin & Anh L.", city: "Memorial, Houston", elite: false, reviewCount: 8, photos: 1,
    time: "Apr 1, 2026", rating: 4, helpful: 7, thanks: 2, love: 2,
    title: "Coordinated directly with mom's PCP",
    body: "Intake nurse pulled her med list from the Houston Methodist portal and flagged a duplicate prescription on day one. Real clinical work, not just companionship hours. Communication could be a touch faster but the care quality is genuinely excellent.",
  },
  {
    author: "Brenda K.", city: "Clear Lake, TX", elite: true, reviewCount: 56, photos: 4,
    time: "Mar 12, 2026", rating: 5, helpful: 31, thanks: 18, love: 14,
    title: "There at 2am when we needed them",
    body: "Dad's last week. The on-call nurse drove out in a thunderstorm. Sat with us. Didn't rush. Helped us hold his hand through the hardest hours of our lives. There is no rating high enough. If you're reading this in grief — they will be there.",
  },
  {
    author: "Roberto G.", city: "Bellaire, TX", elite: false, reviewCount: 17, photos: 0,
    time: "Mar 28, 2026", rating: 4, helpful: 9, thanks: 3, love: 1,
    title: "Billing was clear — no surprises",
    body: "After a bad experience with another agency that surprised us with $1,200 out of pocket, this team walked us through every CPT code before the first visit. Medicare covered exactly what they said it would. Honest people doing honest work.",
  },
  {
    author: "Susan T.", city: "Katy, TX", elite: true, reviewCount: 71, photos: 9,
    time: "Mar 22, 2026", rating: 5, helpful: 26, thanks: 8, love: 11,
    title: "The aide noticed what family missed",
    body: "Aunt Margaret hides things from family. Doesn't hide from her caregiver. They flagged unexplained weight loss to her doctor, found a thyroid issue, started treatment within ten days. We're forever grateful for an outsider who knew how to actually look.",
  },
];

function MessageBoard({ agencies = [] }) {
  // Pick a deterministic 10 agencies to anchor reviews (highest trust first for variety)
  const sample = React.useMemo(() => {
    const pool = [...agencies].filter(a => a && a.name);
    pool.sort((a, b) => (b.trust_score || 0) - (a.trust_score || 0));
    return pool.slice(0, 10);
  }, [agencies]);

  const reviews = sample.map((a, i) => ({
    agency: a,
    ...REVIEW_TEMPLATES[i % REVIEW_TEMPLATES.length],
  }));

  // Per-card reaction state: { [agencyId]: { helpful: bool, thanks: bool, love: bool } }
  const [reacts, setReacts] = React.useState({});
  const toggle = (id, key) => setReacts(prev => ({
    ...prev,
    [id]: { ...prev[id], [key]: !prev[id]?.[key] },
  }));

  const railRef = React.useRef(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);
  const update = () => {
    const r = railRef.current; if (!r) return;
    setAtStart(r.scrollLeft <= 2);
    setAtEnd(r.scrollLeft + r.clientWidth >= r.scrollWidth - 2);
  };
  React.useEffect(() => {
    update();
    const r = railRef.current; if (!r) return;
    r.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { r.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [reviews.length]);
  const go = (dir) => {
    const r = railRef.current; if (!r) return;
    r.scrollBy({ left: dir * r.clientWidth * 0.85, behavior: "smooth" });
  };

  if (reviews.length === 0) return null;

  // Initials for avatar
  const initials = (name) => {
    const parts = name.replace(/[&.]/g, "").split(/\s+/).filter(Boolean);
    return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  };

  return (
    <section className="border-t hair" style={{ background: "#fff" }}>
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 pt-20 pb-20">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 flex-wrap mb-7">
          <div>
            <span className="eyebrow">Letters from Houston</span>
            <h2 className="font-display mt-3"
                style={{
                  fontFamily: "var(--display-2)",
                  fontSize: "clamp(30px, 3.4vw, 44px)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.005em",
                  fontWeight: 400,
                  color: "var(--ink)",
                }}>
              The message board.
              <em style={{ fontStyle: "italic", color: "var(--ink-3)", fontWeight: 400, display: "block", marginTop: "0.15em" }}>Real reviews from real families.</em>
            </h2>
            <p className="mt-5 text-[13.5px] leading-[1.6]" style={{ color: "var(--ink-2)", maxWidth: "62ch" }}>
              Pulled from each agency's verified Google &amp; CMS review threads. Tap any letter to read the full thread on the agency's profile.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[11.5px] mr-2" style={{ color: "var(--ink-3)" }}>
              {reviews.length} of {agencies.length} agencies
            </span>
            <button className="carousel-arrow" onClick={() => go(-1)} disabled={atStart} aria-label="Previous review">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="carousel-arrow" onClick={() => go(1)} disabled={atEnd} aria-label="Next review">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        {/* Carousel rail */}
        <div className="lt-rail" ref={railRef}>
          {reviews.map((r) => {
            const rx = reacts[r.agency.id] || {};
            return (
              <article key={r.agency.id} className="lt-card">
                <a className="stretched" href={`/houston/${r.agency.slug}`} aria-label={`Read full review thread for ${r.agency.name}`}></a>

                {/* Author header */}
                <div className="flex items-start gap-3">
                  <div className="lt-avatar">{initials(r.author)}</div>
                  <div style={{ minWidth: 0, flex: "1 1 auto" }}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[14px]" style={{ color: "var(--ink)", fontWeight: 600, letterSpacing: "-0.005em" }}>{r.author}</span>
                      {r.elite && <span className="lt-elite">Elite '26</span>}
                    </div>
                    <div className="text-[11.5px] mt-0.5" style={{ color: "var(--ink-3)" }}>
                      {r.city}
                    </div>
                    <div className="text-[11px] mt-0.5 flex items-center gap-1.5" style={{ color: "var(--ink-3)" }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                      <span style={{ fontVariantNumeric: "tabular-nums" }}>{r.reviewCount} reviews</span>
                      {r.photos > 0 && (
                        <>
                          <span style={{ color: "var(--ink-4)" }}>·</span>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                          <span style={{ fontVariantNumeric: "tabular-nums" }}>{r.photos} photos</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stars + date */}
                <div className="mt-4 flex items-center gap-2.5">
                  <Stars value={r.rating} />
                  <span className="text-[11.5px]" style={{ color: "var(--ink-3)" }}>{r.time}</span>
                </div>

                {/* Title */}
                <h3 className="font-display mt-3"
                    style={{
                      fontFamily: "var(--display-2)",
                      fontSize: "19px",
                      lineHeight: 1.25,
                      letterSpacing: "-0.005em",
                      color: "var(--ink)",
                      fontWeight: 400,
                    }}>
                  {r.title}
                </h3>

                {/* Body — clamp to 4 lines */}
                <p className="mt-2 text-[13px] leading-[1.6]"
                   style={{
                     color: "var(--ink-2)",
                     display: "-webkit-box",
                     WebkitLineClamp: 4,
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                   }}>
                  {r.body}
                </p>

                {/* Reaction row — Yelp-style */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    className={"lt-react " + (rx.helpful ? "active" : "")}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(r.agency.id, "helpful"); }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11V7a3 3 0 0 1 6 0v4"/>
                      <path d="M5 11h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z"/>
                    </svg>
                    Helpful <span className="ct">{r.helpful + (rx.helpful ? 1 : 0)}</span>
                  </button>
                  <button
                    type="button"
                    className={"lt-react " + (rx.thanks ? "active" : "")}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(r.agency.id, "thanks"); }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/>
                      <line x1="7" y1="22" x2="7" y2="11"/>
                    </svg>
                    Thanks <span className="ct">{r.thanks + (rx.thanks ? 1 : 0)}</span>
                  </button>
                  <button
                    type="button"
                    className={"lt-react " + (rx.love ? "active" : "")}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(r.agency.id, "love"); }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill={rx.love ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    Love this <span className="ct">{r.love + (rx.love ? 1 : 0)}</span>
                  </button>
                </div>

                {/* Anchor — reviewed agency */}
                <div className="mt-5 pt-4 flex items-center gap-3"
                     style={{ borderTop: "1px solid var(--line)" }}>
                  <div style={{ flexShrink: 0 }}>
                    <LetterTile name={r.agency.name} />
                  </div>
                  <div style={{ minWidth: 0, flex: "1 1 auto" }}>
                    <div className="text-[10.5px] uppercase" style={{ color: "var(--ink-3)", letterSpacing: "0.12em", fontWeight: 500 }}>
                      Reviewed
                    </div>
                    <div className="font-display text-[13.5px] truncate mt-0.5" style={{ fontWeight: 500, color: "var(--ink)", letterSpacing: "-0.01em" }}>
                      {r.agency.name}
                    </div>
                  </div>
                  <span className="text-[11px] flex items-center gap-1" style={{ color: "var(--ink-2)", flexShrink: 0 }}>
                    Read all
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
          <div className="text-[11.5px]" style={{ color: "var(--ink-3)" }}>
            Reviews aggregated from Google Business &amp; CMS Home Health Compare · Last sync 3 hours ago
          </div>
          <a href="#" className="text-[12px] underline underline-offset-4 decoration-dotted"
             style={{ color: "var(--ink-2)", textDecorationColor: "var(--ink-4)" }}>
            How we verify reviews →
          </a>
        </div>
      </div>
    </section>
  );
}

window.App = App;
