# WeCarely — Design Handoff Brief

> **For**: Claude (or any AI design tool / human designer)
> **Goal**: Redesign the Houston home care listing page (`/houston`) with a **white, minimal, premium** aesthetic. We've tried two iterations and the user wants a fresh, more refined visual direction. Real data is included so you can preview with realistic content.

---

## 0. TL;DR — What I want from you

Build a **single self-contained HTML/JSX artifact** that shows the Houston listing page with:

1. **A hero section** that communicates trust (no stock photos, no smiling-elderly clichés)
2. **A left-sidebar filter** with 3 axes (language / insurance / service) — **8 options total, see § 4**
3. **A list of agency cards** (use the 10 real records in `sample-agencies.json`) sorted by `trust_score` desc
4. **A footer** with the trust pledge

**Aesthetic**: White background. Minimal. Premium. Think Apple Health × One Medical × Stripe × Aesop. **NOT**: Caring.com, A Place for Mom, Yelp, Healthgrades — these are the lead-gen-funnel competitors we are explicitly differentiating from.

**Tech**: Self-contained HTML (Tailwind CDN ok) **or** React JSX (we use Next.js 16 + Tailwind 4 + TypeScript). No external state management, no auth, no popups.

---

## 1. Product context

**WeCarely** is a Houston-first home-care agency directory (future US-wide). We're a **trust-first B2B2C** play, not a lead-gen marketplace.

### Positioning statement (decided)

> **For** Houston adult children (45–65) researching home care for an aging parent with specific language, insurance, and clinical needs,
> **that need** to find a trustworthy agency without juggling Medicare.gov's outdated UI, scattered Yelp reviews, and 10 phone calls,
> **WeCarely** is a Houston-focused home care agency directory
> **that** filters agencies by language, insurance, and clinical specialty in one place — combining CMS clinical ratings, Google trust signals, and AI-extracted service details.

### Differentiation

> **Unlike** Medicare.gov (Medicare-only, no language filter, no reviews), **Care.com** (individual caregivers, not agencies), **A Place for Mom** (facilities-focused, aggressive lead-gen), and **Caring.com** (calls you 12 times after one form submission),
> **WeCarely provides** the only directory that combines CMS + Google + Houston-specific filters (Spanish/Vietnamese/Chinese, Medicaid acceptance, dementia/hospice) — **so families shortlist 3 agencies in 10 minutes instead of 10 phone calls**.

---

## 2. Two personas (design for both)

### 🌹 **Daniela Reyes** — 52, Mexican-American

- Office manager at a dental practice. Lives in Spring Branch, Houston.
- Mom (78, Spanish-only, Medicare + Medicaid dual-eligible) had a stroke. Discharge in **3 days**.
- Phone-first (90% mobile). WhatsApp daily. Skeptical of slick websites.
- Needs: Spanish-speaking aide, Medicaid acceptance, fast.
- **Designs for her**: huge mobile tap targets, Spanish chip first, no email gate, share-via-WhatsApp friendly.

### 🌸 **Steven Nguyen** — 47, Vietnamese-American

- Software engineer. Sugar Land, Houston.
- Dad (76, Vietnamese-only, Medicare + private) diagnosed with Alzheimer's.
- Researches **3 months**. Desktop 60%. **Refuses to give phone or email** — got burned by A Place for Mom.
- Reads Reddit r/dementia. Wants data, sources, no advisor calls.
- **Designs for him**: zero CTAs that ask for contact info, transparent data sources, comparison-friendly.

---

## 3. Business model constraints (these are firm)

We're following the **Yelp ad-listing model + Zocdoc transparent lead model**, NOT the Caring.com lead-gen model.

### Always do

- Show **all** 259 agencies (paid or not — this is the trust foundation)
- Default sort = `trust_score` (CMS + Google) — never paid
- Reserve a "Sponsored" slot on each card (Day-7 prop is `isSponsored`, always false until Phase 2)
- Show data provenance: "CMS Home Health Compare + Google + Verified updates"

### Never do

- ❌ "Get matched" / "Talk to an advisor" CTAs
- ❌ Email-gate the directory (must view without signup)
- ❌ Phone-required forms ("Enter phone to see ratings")
- ❌ Aggressive popups / newsletter modals
- ❌ Hero stock photos of smiling elderly people
- ❌ "Featured Agency" / "Editor's Pick" badges (we have no editorial process Day 7)

---

## 4. The data — Filter axes & schema

### 3-axis filter set (exactly these 8 options — `key | label`)

```
LANGUAGE
  spanish        | Spanish
  vietnamese     | Vietnamese
  chinese        | Chinese

INSURANCE
  medicare       | Medicare
  medicaid       | Medicaid

SERVICE
  skilled-nursing | Skilled Nursing
  dementia        | Dementia Care
  hospice         | Hospice
```

### Filter behavior

- Multiple selections within an axis = **OR** (Spanish OR Vietnamese)
- Across axes = **AND** (Spanish AND Medicaid)
- Encode in URL: `?lang=spanish,vietnamese&ins=medicaid&svc=dementia`

### Agency schema (TypeScript)

```ts
interface Agency {
  id: string;
  slug: string;
  name: string;                       // "Phoenix Family Healthcare Inc."
  city: string;                       // "HOUSTON"
  state: string;                      // "TX"
  zip: string | null;                 // "77069"
  phone: string | null;               // "(281) 525-6020"
  website: string | null;

  // Trust signals
  medicare_star: number | null;       // 0-5  (CMS clinical rating)
  google_rating: number | null;       // 0-5  (consumer reviews)
  google_reviews_count: number | null;
  trust_score: number | null;         // pre-computed, sort by this DESC

  // Filter booleans (the 8 above)
  has_spanish: boolean;
  has_vietnamese: boolean;
  has_chinese: boolean;
  accepts_medicare: boolean;
  accepts_medicaid: boolean;
  has_skilled_nursing: boolean;
  has_dementia_care: boolean;
  has_hospice: boolean;

  // Display
  ai_summary: string | null;          // 1-2 sentence agency description
}
```

### Real sample data

See `sample-agencies.json` (10 records, real Houston agencies, sorted by trust_score). Use these for your design preview — no need to generate fake data.

**Note**: Many records have `false` for all language/insurance booleans because the AI extraction step undercounted. **This is a known data-quality issue, not a design problem**. Design assuming the booleans WILL be populated correctly later.

---

## 5. Page anatomy — what to build

### Required sections (in order, top to bottom)

| § | Section | Notes |
|---|---|---|
| 1 | **Header** | Wordmark "WeCarely" + small "Houston · TX" right-side. No nav, no signin, no CTA. |
| 2 | **Hero** | Big serif headline like "Houston home care, honestly compared." Sub-paragraph explaining trust principle. Stat strip: 259 / 14 / 2 / 0 (agencies / trust filters / data sources / **leads sold**). |
| 3 | **Main 2-col layout** | Left sidebar (filter, ~220px). Right: result count + sorted-by indicator + agency cards grid. |
| 4 | **AgencyCard** (most important) | See § 6 below for full anatomy. |
| 5 | **Footer** | Trust pledge ("We don't sell leads…"), 4-column colophon (Data / Coverage / Languages / For agencies). |

### Mobile (< lg / 1024px)

- Sidebar collapses **above** the result list (or to a drawer — your call, but no popup)
- Card grid → 1 column
- Hero stat strip → 2×2

### Desktop (lg+)

- Sidebar sticky on scroll
- Card grid → 1 col @ lg, 2 cols @ xl

---

## 6. AgencyCard — the heart of the design

This is the most important component. **Every card click goes to `/houston/[slug]`** (detail page is Day 8 — your link target can 404 OK).

### Required fields (in order of priority)

1. **Agency name** — primary headline (serif, large)
2. **Trust signals** — CMS rating + Google rating side-by-side, with **5-star visual rendering** (Yelp-style partial-fill stars in gold)
3. **AI summary** — 1-2 line agency description (sans-serif, secondary color)
4. **Tag chips** — derived from booleans: e.g. `Spanish · Medicare · Medicaid · Dementia Care`
5. **Phone number** — `tel:` link, plain text (NOT a "Call Now" button)
6. **Sponsored slot** (always empty Day 7 — but reserve the visual space, see § 3)
7. **Subtle "View →"** action

### Card behavior

- **Whole card clickable** to `/houston/[slug]` — use the "stretched link" pattern (absolute `<Link>` inside `<article>`, inner anchors at z-10 for phone)
- Hover: very subtle border/shadow shift (no big bouncy animations)
- Phone is independently clickable (tel:) without triggering card navigation

### Card visual references (what to look at)

✅ **Inspiration (clean, trust, minimal)**:
- Stripe pricing cards
- Notion gallery items
- Linear feature cards
- One Medical service tiles
- Aesop product cards

❌ **Anti-references (don't look like these)**:
- Yelp business cards (too commercial, ad-heavy)
- A Place for Mom / Caring.com cards (lead-gen funnels)
- Healthgrades cards (generic medical-portal grey)

---

## 7. Visual aesthetic — committing to "white minimal premium"

### Color palette (keep it tight)

```css
--bg:           #FFFFFF;   /* page background — pure white */
--bg-soft:      #FAFAFA;   /* subtle section bg if needed */
--ink:          #0A0A0A;   /* primary text */
--ink-2:        #525252;   /* secondary text */
--ink-3:        #A3A3A3;   /* tertiary, eyebrow labels */
--ink-4:        #D4D4D4;   /* dividers, inactive icons */
--accent:       #1A4D3A;   /* deep forest — single brand color */
--gold:         #B58430;   /* star ratings only */
--line:         #EAEAEA;   /* hairline borders */
```

**Rule**: Every component uses **at most 2 accents**. Forest is the brand. Gold is reserved for stars. No other colors.

### Typography

We currently use:
- **Display**: **Fraunces** (Google Fonts variable serif, axes: opsz, SOFT) — for hero headline + agency names
- **Body**: **Geist** (already in Next.js stack)
- **Mono**: Geist Mono (for tabular numbers like phone, ratings)

You can pick **different fonts** if they're clearly better. Constraints:
- Free / Google Fonts only
- NOT Inter, Roboto, system sans (too generic)
- NOT Space Grotesk (overused)
- The display font should feel premium — Fraunces, Newsreader, Söhne (paid, skip), GT Sectra (paid), Instrument Serif, or you can argue a strong sans like Geist/Hanken Grotesk

### Spacing

- Generous. Default to MORE whitespace than feels right.
- 8px base. Larger jumps (40, 56, 80, 120) for editorial breath.

### Borders / shadow

- **Hairline borders** (1px var(--line)) as primary structure
- **Almost no shadow** at rest
- Maybe a soft hover shadow on cards: `0 8px 24px -12px rgba(10,10,10,0.08)`
- Card radius: 8–12px (modern but not bouncy)

### Motion

- Subtle. Fast (150–200ms). Color/border transitions only.
- NO framer-motion, NO entry animations, NO scroll-driven anything.

---

## 8. The "must-look" details

These are the small things that make it feel premium:

- **Tabular numbers** for ratings, phone, stat strip (`tabular-nums`)
- **Star rating with partial fill** (e.g. 4.5★ shows 4.5 stars filled, 0.5 stars half-gold)
- **Letter-spacing tightening** on large headlines (`-0.025em` ish)
- **Eyebrow labels** in uppercase + 0.14em tracking + 11px font
- **Right-aligned secondary metadata** in headers ("Sorted by trust score")
- **Sticky filter sidebar** on desktop scroll
- **Stretched-link pattern** for clickable cards (whole card click → detail)

---

## 9. What to deliver

**Option A** (preferred — single artifact preview):

A self-contained `index.html` with:
- Tailwind CDN
- Fraunces + Geist via Google Fonts CDN
- The 10 agencies from `sample-agencies.json` inlined as a JS array
- Functional filter sidebar (URL searchParams not required — local state OK for preview)
- Working sort by trust_score
- Mobile + desktop layouts both working

**Option B** (if you prefer JSX):

A single React component file (e.g. `HoustonListingPage.tsx`) that:
- Accepts `agencies: Agency[]` as a prop
- Self-contained Tailwind classes
- Optional: a `mock.json` import or hardcoded demo data

Either way: I should be able to **paste it into a fresh page and see it work**.

---

## 10. Questions you might have, answered up front

**Q: Should I add icons?**
A: Sparingly. Maybe a subtle icon for phone or location, but no decoration icons. No emojis.

**Q: Should I add a search input?**
A: Out of scope for Day 7. Filters only.

**Q: Should I add a map view?**
A: Out of scope for Day 7. List only.

**Q: How many cards do I show in the preview?**
A: All 10 from the sample. They render in a 2-col grid on desktop.

**Q: What about dark mode?**
A: Skip Day 7. White-only.

**Q: Internationalization?**
A: English only Day 7. (Future: Spanish, Vietnamese, Chinese.)

**Q: Should it look like Honor / joinhonor.com?**
A: Honor is a good north star — calm, premium, healthcare-feeling. But Honor uses lots of stock photography of caregivers. **Don't use stock photography.** We have none and want our visual language to be typography-driven.

**Q: Where does "Sponsored" appear in the card?**
A: Top-right of the card, near the agency name. Use `eyebrow` style (small, uppercase, tracked-out, gray). Day 7 it never renders, but reserve the slot.

---

## 11. Files in this handoff

```
handoff/
├── BRIEF.md                    ← this file
└── sample-agencies.json        ← 10 real Houston agencies (top trust score)
```

You don't need anything else. Build a self-contained artifact.

---

## 12. Strategic context (optional reading)

WeCarely's competitive moat is **trust complound interest**. We bet that:

- Caring.com and A Place for Mom have annoyed enough users that there's an opening for a "no-funnel" alternative
- Trust takes years to accumulate but is the only durable advantage
- Year 1 = SEO + brand
- Year 2 = monetize via Yelp-style "Verified" / "Featured" listings (transparent, clearly labeled)
- Year 3+ = B2B (hospital discharge planners, Medicare Advantage plans)

Your design today plants the visual flag for that 5-year story. **Every design decision should answer: "Does this feel like a place I can trust with my mom's care?"** If anything feels like it's trying too hard to convert me, it's wrong.

---

**End of brief.** Build something better than what we have. Surprise us.
