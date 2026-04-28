import Link from 'next/link';
import type { Metadata } from 'next';

const SITE_URL = 'https://www.wecarely.com';
const APPLY_MAILTO =
  'mailto:agencies@wecarely.com?subject=Founding%20Sponsor%20application%20%E2%80%94%20Houston&body=Agency%20name%3A%0AContact%20name%3A%0APhone%3A%0AWebsite%3A%0ACMS%20provider%20number%20(if%20known)%3A%0A%0AWhich%20slot(s)%20you%27re%20interested%20in%3A%0AAnything%20else%20we%20should%20know%3A%0A';

const FOUNDING_PRICE = 99;
const LIST_PRICE = 199;

export const metadata: Metadata = {
  title: 'For agencies — Sponsored placements on WeCarely',
  description:
    'Reach Houston families searching for home care. WeCarely lists every CMS-licensed Houston agency. Sponsored placements are clearly labeled and never affect default ranking. Founding-sponsor rate available now.',
  alternates: { canonical: `${SITE_URL}/for-agencies` },
  openGraph: {
    title: 'For agencies — Sponsored placements on WeCarely',
    description:
      'Reach Houston families searching for home care. Transparent ranking, clearly labeled sponsorships.',
    url: `${SITE_URL}/for-agencies`,
    type: 'website',
    siteName: 'WeCarely',
  },
};

const BENEFITS = [
  {
    n: '01',
    title: 'Featured slot in Houston',
    body: 'Top-of-page Sponsored carousel on the homepage and the /houston listing — the two pages with the most traffic.',
  },
  {
    n: '02',
    title: 'Always clearly labeled',
    body: 'Every sponsored placement carries a visible "Sponsored" tag. Families know what they\'re seeing — and trust the rest of the directory more for it.',
  },
  {
    n: '03',
    title: 'Default ranking unaffected',
    body: 'CMS clinical ratings + Google reviews still drive the natural order. Sponsorship buys visibility, not a higher star rating.',
  },
  {
    n: '04',
    title: 'Detail-page upgrades',
    body: 'Sponsors get a richer detail page: logo, photo, hours, services list, intake notes — the things families ask before they call.',
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Apply',
    body: 'Tell us your agency name and contact. We reply within 1 business day.',
  },
  {
    n: '02',
    title: 'We verify',
    body: 'Cross-check your CMS license and Google Business profile. Sponsorship is only available to verified Houston-licensed agencies.',
  },
  {
    n: '03',
    title: 'Slot goes live',
    body: 'You see your slot live within 48 hours. Cancel anytime.',
  },
];

const FAQ = [
  {
    q: 'Does sponsorship affect my CMS or Google rating shown on WeCarely?',
    a: 'No. We display the public CMS star rating and Google reviews exactly as they are. We never edit, weight, or hide them.',
  },
  {
    q: 'How do families know which agencies are sponsored?',
    a: 'Every sponsored placement carries a visible "Sponsored" label. The directory\'s default order is by trust score (CMS + Google), not by who pays.',
  },
  {
    q: 'How many slots are there?',
    a: 'Four sponsored slots in Houston. We will only add capacity once Houston organic traffic supports it — we don\'t want to dilute visibility.',
  },
  {
    q: 'Can I cancel?',
    a: 'Yes — month-to-month, no contract. Cancel anytime; we\'ll prorate the current month.',
  },
  {
    q: 'Do you accept lead-gen referrals?',
    a: 'No. WeCarely is a directory, not a referral service. Families contact you directly. We don\'t take a cut of placements or admissions.',
  },
];

export default function ForAgenciesPage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-20 pb-16 lg:pt-28 lg:pb-20">
          <span className="eyebrow">For agencies</span>
          <h1
            className="font-display mt-5 text-[var(--ink)] max-w-[22ch]"
            style={{
              fontSize: 'clamp(40px, 5.6vw, 76px)',
              lineHeight: 1.06,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            Reach Houston families{' '}
            <em className="italic" style={{ fontWeight: 400 }}>
              actively
            </em>{' '}
            looking for home care.
          </h1>
          <p
            className="mt-7 text-[var(--ink-2)] max-w-[58ch]"
            style={{ fontSize: 18, lineHeight: 1.55 }}
          >
            WeCarely lists every CMS-licensed Houston home care agency. We rank
            by CMS clinical ratings and Google reviews — not by who pays.
            Sponsorship buys you a clearly labeled featured slot above the fold,
            and nothing else.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={APPLY_MAILTO}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] bg-[var(--ink)] text-white font-medium hover:bg-black/90 transition-colors"
              style={{ fontSize: 15 }}
            >
              Apply for Founding Sponsor
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] border border-[var(--line-strong)] text-[var(--ink)] font-medium hover:border-[var(--ink)] transition-colors"
              style={{ fontSize: 15 }}
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* INTEGRITY PITCH */}
      <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 lg:py-20">
          <p className="eyebrow mb-5">Why list with us</p>
          <h2
            className="font-display text-[var(--ink)] max-w-[24ch] mb-8"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 44px)',
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            We don&apos;t sell ranking.{' '}
            <em className="italic" style={{ fontWeight: 400 }}>
              Families notice.
            </em>
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-[80ch] text-[15.5px] leading-[1.65] text-[var(--ink-2)]">
            <p>
              Most home care directories grade agencies on a hidden formula and
              push paid leads through a call center. Families know — and they
              don&apos;t trust the results.
            </p>
            <p>
              WeCarely&apos;s default order is CMS clinical ratings + Google
              reviews. Sponsored slots are visibly labeled and live above the
              free directory, not inside it. The honesty is the product.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 lg:py-20">
          <p className="eyebrow mb-5">What sponsorship gets you</p>
          <h2
            className="font-display text-[var(--ink)] mb-12 max-w-[24ch]"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            Visibility, never preferential ranking.
          </h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
            {BENEFITS.map((b) => (
              <div key={b.n} className="border-t border-[var(--ink)] pt-5">
                <p className="font-mono text-[12px] tabular-nums text-[var(--ink-3)] mb-3">
                  {b.n}
                </p>
                <h3
                  className="font-display text-[var(--ink)] mb-2.5"
                  style={{ fontSize: 20, fontWeight: 500 }}
                >
                  {b.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-[var(--ink-2)] max-w-[40ch]">
                  {b.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 lg:py-20">
          <p className="eyebrow mb-5">How it works</p>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-8 mt-10">
            {STEPS.map((s) => (
              <div key={s.n}>
                <p className="font-mono text-[12px] tabular-nums text-[var(--ink-3)] mb-3">
                  {s.n}
                </p>
                <h3
                  className="font-display text-[var(--ink)] mb-2.5"
                  style={{ fontSize: 20, fontWeight: 500 }}
                >
                  {s.title}
                </h3>
                <p className="text-[14.5px] leading-[1.6] text-[var(--ink-2)]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-b border-[var(--line)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 lg:py-20">
          <p className="eyebrow mb-5">Pricing</p>
          <h2
            className="font-display text-[var(--ink)] max-w-[24ch] mb-12"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 44px)',
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            Founding-sponsor rate, locked while we grow.
          </h2>

          <div className="grid md:grid-cols-[1.2fr_1fr] gap-x-12 gap-y-8 items-start max-w-[80ch]">
            <div className="border-t border-[var(--ink)] pt-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span
                  className="font-display tabular-nums text-[var(--ink)]"
                  style={{ fontSize: 56, fontWeight: 500, letterSpacing: '-0.01em' }}
                >
                  ${FOUNDING_PRICE}
                </span>
                <span className="font-mono text-[14px] text-[var(--ink-3)]">
                  / month
                </span>
              </div>
              <p
                className="font-mono text-[12.5px] tabular-nums text-[var(--ink-3)] line-through mb-4"
              >
                List ${LIST_PRICE} / month
              </p>
              <p className="text-[14px] text-[var(--ink-2)] leading-[1.55] max-w-[34ch]">
                Founding-sponsor rate locked for the lifetime of your
                subscription, as long as it&apos;s continuous. Available while we
                build out organic traffic in Houston.
              </p>
            </div>

            <ul className="space-y-2.5 text-[14px] text-[var(--ink-2)] pt-1">
              {[
                '4 sponsored slots in Houston (limited)',
                'Sponsored carousel on / and /houston',
                'Detail-page upgrades (logo, photo, hours)',
                'Month-to-month, cancel anytime',
                'No setup fee',
                'Verified-only — CMS license required',
              ].map((feature) => (
                <li key={feature} className="flex items-baseline gap-2.5">
                  <span
                    className="font-mono text-[var(--ink-3)] shrink-0"
                    style={{ fontSize: 11, lineHeight: 1.4 }}
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <a
              href={APPLY_MAILTO}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] bg-[var(--ink)] text-white font-medium hover:bg-black/90 transition-colors"
              style={{ fontSize: 15 }}
            >
              Apply for Founding Sponsor
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
            <p className="mt-3 text-[12.5px] text-[var(--ink-3)]">
              Pricing subject to change after Houston organic traffic exceeds
              5k monthly. Founding sponsors keep their rate.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-[var(--line)] bg-[var(--bg-soft)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 lg:py-20">
          <p className="eyebrow mb-5">FAQ</p>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-[90ch]">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3
                  className="font-display text-[var(--ink)] mb-2.5"
                  style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.3 }}
                >
                  {item.q}
                </h3>
                <p className="text-[14px] leading-[1.6] text-[var(--ink-2)]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section>
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-20 text-center">
          <p className="eyebrow mb-5">Ready?</p>
          <h2
            className="font-display text-[var(--ink)] mb-7 max-w-[20ch] mx-auto"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.005em',
              fontWeight: 400,
            }}
          >
            Four founding sponsor slots in Houston.
          </h2>
          <a
            href={APPLY_MAILTO}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[10px] bg-[var(--ink)] text-white font-medium hover:bg-black/90 transition-colors"
            style={{ fontSize: 15 }}
          >
            Apply now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
