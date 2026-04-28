import Link from 'next/link';

/**
 * Yelp-style "Explore searches" grid — adapted for WeCarely's single-city
 * structure. Instead of "popular cities", we group by family situation
 * (language, insurance, life-stage) and surface the most useful filter
 * combinations under each.
 *
 * Every link is a deep-link to a pre-filtered listing — every URL is
 * a potential SEO landing page.
 */

interface SearchLink {
  label: string;
  href: string;
}

interface Group {
  title: string;
  subtitle: string;
  searches: SearchLink[];
  seeAllHref: string;
}

const GROUPS: Group[] = [
  {
    title: 'For Spanish-speaking families',
    subtitle: 'Cuidado en español',
    searches: [
      { label: 'Skilled nursing',  href: '/houston?lang=spanish&svc=skilled-nursing' },
      { label: 'Personal care',    href: '/houston?lang=spanish&svc=personal-care' },
      { label: 'Companion care',   href: '/houston?lang=spanish&svc=companion-care' },
      { label: 'Dementia care',    href: '/houston?lang=spanish&svc=dementia' },
      { label: 'Hospice',          href: '/houston?lang=spanish&svc=hospice' },
    ],
    seeAllHref: '/houston?lang=spanish',
  },
  {
    title: 'For Vietnamese families',
    subtitle: 'Chăm sóc bằng tiếng Việt',
    searches: [
      { label: 'Skilled nursing',     href: '/houston?lang=vietnamese&svc=skilled-nursing' },
      { label: 'Home health aide',    href: '/houston?lang=vietnamese&svc=home-health-aide' },
      { label: 'Personal care',       href: '/houston?lang=vietnamese&svc=personal-care' },
      { label: 'Dementia care',       href: '/houston?lang=vietnamese&svc=dementia' },
    ],
    seeAllHref: '/houston?lang=vietnamese',
  },
  {
    title: 'For Chinese families',
    subtitle: '中文照護',
    searches: [
      { label: 'Skilled nursing',  href: '/houston?lang=chinese&svc=skilled-nursing' },
      { label: 'Personal care',    href: '/houston?lang=chinese&svc=personal-care' },
      { label: 'Home health aide', href: '/houston?lang=chinese&svc=home-health-aide' },
      { label: 'Dementia care',    href: '/houston?lang=chinese&svc=dementia' },
    ],
    seeAllHref: '/houston?lang=chinese',
  },
  {
    title: 'After hospital discharge',
    subtitle: 'Skilled care, fast',
    searches: [
      { label: 'Skilled nursing',          href: '/houston?svc=skilled-nursing' },
      { label: 'Physical therapy',         href: '/houston?svc=physical-therapy' },
      { label: 'Occupational therapy',     href: '/houston?svc=occupational-therapy' },
      { label: 'Speech therapy',           href: '/houston?svc=speech-therapy' },
      { label: 'Skilled + Medicare',       href: '/houston?svc=skilled-nursing&ins=medicare' },
    ],
    seeAllHref: '/houston?svc=skilled-nursing',
  },
  {
    title: 'For families on Medicaid',
    subtitle: 'Coverage that fits',
    searches: [
      { label: 'Personal care',           href: '/houston?ins=medicaid&svc=personal-care' },
      { label: 'Home health aide',        href: '/houston?ins=medicaid&svc=home-health-aide' },
      { label: 'Companion care',          href: '/houston?ins=medicaid&svc=companion-care' },
      { label: 'Spanish + Medicaid',      href: '/houston?ins=medicaid&lang=spanish' },
    ],
    seeAllHref: '/houston?ins=medicaid',
  },
  {
    title: 'For dementia and end-of-life care',
    subtitle: 'Specialized support',
    searches: [
      { label: 'Dementia care',         href: '/houston?svc=dementia' },
      { label: 'Hospice',               href: '/houston?svc=hospice' },
      { label: 'Dementia + Spanish',    href: '/houston?svc=dementia&lang=spanish' },
      { label: 'Hospice + Medicare',    href: '/houston?svc=hospice&ins=medicare' },
    ],
    seeAllHref: '/houston?svc=dementia',
  },
];

export function ExploreSearches() {
  return (
    <section className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 lg:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="eyebrow mb-3">Explore</p>
          <h2
            className="font-display text-[var(--ink)]"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            What Houston families search for.
          </h2>
          <p className="mt-3 text-[15px] text-[var(--ink-2)]">
            Common combinations of language, insurance, and clinical need —
            each one a direct path into the directory.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <Link
                href={g.seeAllHref}
                className="group inline-block mb-1"
              >
                <h3
                  className="font-display text-[var(--ink)] group-hover:text-[var(--accent-on)] transition-colors leading-tight"
                  style={{ fontSize: 19, fontWeight: 500 }}
                >
                  {g.title}
                </h3>
              </Link>
              <p className="text-[12.5px] text-[var(--ink-3)] mb-4 italic font-display">
                {g.subtitle}
              </p>

              <ul className="space-y-1.5">
                {g.searches.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="text-[14px] text-[var(--ink-2)] hover:text-[var(--ink)] underline-offset-3 hover:underline inline-flex items-baseline gap-1.5"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
                <li className="pt-1">
                  <Link
                    href={g.seeAllHref}
                    className="text-[12.5px] font-medium text-[var(--ink)] underline-offset-3 hover:underline inline-flex items-center gap-1"
                  >
                    See all
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
