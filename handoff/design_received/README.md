# Handoff: WeCarely — Houston Home Care Listing

> A directory + comparison page for licensed home‑care agencies in Houston, TX. The aesthetic is editorial, white‑minimal, serif‑first — closer to a curated guide than a marketplace. It blends Yelp's listing structure with the typography of a print directory.

---

## 1. About the Design Files

The files in `design/` are **design references created in HTML** — interactive prototypes that show intended look, behavior, and copy. They are **not production code to copy directly**. The job is to **recreate these designs in the target codebase**, using whatever framework and patterns make sense there.

The prototype is built with:
- A single `Houston Listing.html` shell that loads Tailwind via CDN, Google Fonts, and an inline `<style>` block of CSS variables + custom utility classes
- `components.jsx` — all React components (single file, 1018 lines, in‑browser Babel)
- `tweaks-panel.jsx` — design‑exploration controls (NOT part of the production UI; can be ignored)
- `agencies.json` + an inline `__AGENCIES__` fixture — sample data for 10 Houston agencies

**You should not ship the in‑browser Babel / Tailwind‑CDN setup.** Use it only as the visual source of truth.

## 2. Fidelity

**High‑fidelity.** Final colors, typography, spacing, and copy are all locked in. Recreate pixel‑close, lifting exact hex values, font stacks, sizes, and grid templates from the prototype.

The one explicit open question is **typography pairing** — see `design/Type Comparison.html`, which presents three serif/sans pairings side‑by‑side. The current shipping pair is **Spectral (display) + Inter Tight (body) + JetBrains Mono (eyebrow/numerals)**. The other two pairings (Tenor Sans + Cormorant; alternative serif combos) are documented in that file for the team to pick from if they want to revisit.

## 3. Target Stack

**Not yet decided — the implementing developer should choose.** Recommended options, in order of fit:

1. **Next.js 14 + Tailwind + TypeScript** — best fit. App Router supports the SSR/SEO this directory needs; Tailwind matches the prototype's utility patterns; per‑agency detail pages slot in cleanly under `app/agencies/[slug]/page.tsx`.
2. **Remix + Tailwind + TypeScript** — also strong if data‑loading patterns are preferred.
3. **Vite + React + Tailwind** — if SEO is not a priority and this will be embedded in a larger app.

Whichever stack you pick, **Tailwind is assumed** — the prototype uses Tailwind utility classes throughout alongside a small set of custom CSS classes (defined in the `<style>` block of the HTML file). Port those custom classes into a global stylesheet or `@layer components`.

## 4. Data Source

- **Production**: Supabase (or equivalent Postgres‑backed API). Schema lives in the agency object — see "Data Model" below.
- **Now (during build)**: use `design/agencies.json` as a fixture. It contains 10 representative records with all fields populated.
- The detail‑page route (`/agencies/[slug]`) is **not yet designed** — only the listing is in scope for this handoff. Stub the link with the slug for now.

---

## 5. Page Structure (top → bottom)

The page is a single scrollable route. Sections, in order:

1. **Header** (sticky‑adjacent, 64px tall) — `WeCarely` wordmark left, location pill `HOUSTON · TX` right, hairline bottom border.
2. **Hero** (~480px tall) — eyebrow + serif H1 + supporting paragraph + 4‑stat strip + search bar.
3. **Sponsored carousel** — 3‑up horizontal rail of "Featured" agencies. Has prev/next chrome.
4. **Main grid** (1320px max‑width, 12‑col): `260px` filter sidebar + flexible results column.
5. **Sort bar** — `259 results` left, sort dropdown right, just above the result list.
6. **Result list** — vertical stack of horizontal `ResultCard`s, paginated (15 per page).
7. **Message Board** — 2‑col Houston‑specific community Q&A + recent reviews. Cream/paper background break.
8. **Footer** — cream/yellow gradient, manifesto line, 4‑col link colophon, fine print.

See `screenshots/` for each section.

---

## 6. Design Tokens

All from the `:root` block of `Houston Listing.html`. Lift these into your token system (Tailwind `theme.extend.colors` + CSS vars).

### Colors

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FFFFFF` | page background |
| `--ink` | `#0A0A0A` | primary text, primary buttons, focus borders |
| `--ink-2` | `#525252` | secondary text, body copy on cards |
| `--ink-3` | `#A3A3A3` | tertiary text, eyebrow labels, counts |
| `--ink-4` | `#D4D4D4` | quaternary text, empty stars |
| `--accent` | `#F5C518` | yellow CTA fill, hover link color, active filter check |
| `--gold` | `#B58430` | filled stars |
| `--line` | `#EAEAEA` | hairlines, card borders |
| `--line-strong` | `#D4D4D4` | hover borders, input borders |

Footer uses a separate cream palette:
- Background gradient `#FBF3DD → #F1E0AC`
- Footer ink `#1C1608`
- Grain texture overlay (subtle SVG noise, ~6% opacity)

### Typography

Three families, loaded via Google Fonts:

```
Spectral         — display serif (300, 400, 500, 600 + 300i, 400i, 500i)
Inter Tight      — body sans (300–700 variable)
JetBrains Mono   — eyebrows, numerals, technical labels (400, 500)
```

CSS vars:
```css
--display: "Spectral", ui-serif, Georgia, serif;
--body:    "Inter Tight", ui-sans-serif, -apple-system, "Segoe UI", sans-serif;
--mono:    "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;
```

Base body: `15px / 1.55, letter-spacing -0.005em`, antialiased, `font-feature-settings: "ss01", "cv11"`.

**Eyebrow style** (`.eyebrow`): mono, 11px, `letter-spacing 0.14em`, uppercase, `--ink-3`.

**Hero H1**: Spectral, ~88px, `line-height 1.02`, `letter-spacing -0.025em`. The word "honestly" is set in **Spectral italic** as a typographic accent inside the otherwise roman headline.

**Section heads**: Spectral 500, ~28–32px, `letter-spacing -0.015em`.

### Spacing & Layout

- Page max‑width: **1320px**, side padding **24px (mobile) / 40px (lg)**.
- Section gaps: 96px between major sections (`mt-24`).
- Card border‑radius: **12px**.
- Hairline rule: 1px `--line`.
- Grid gutter (sidebar ↔ results): 40px.

### Shadows

One shadow token only:
```
0 8px 24px -12px rgba(10,10,10,0.08)
```
Applied on result‑card hover. Everything else is hairline‑only.

---

## 7. Components — Detailed Spec

### 7.1 `Header`

```
[ WeCarely ]──────────────────────────[ HOUSTON · TX ]
```
- 64px tall, hairline bottom border
- Logo: Spectral 500, 18px
- Right pill: mono, 11px, `letter-spacing 0.14em`, uppercase, with a `·` separator

### 7.2 `Hero`

Vertical stack, left‑aligned (max 720px wide for text):

1. **Eyebrow**: `HOUSTON HOME CARE DIRECTORY` (mono, 11px, uppercase, `--ink-3`)
2. **H1**: `Houston home care, *honestly* compared.` — Spectral, 88px, the word "honestly" in italic
3. **Lede**: 16px, `--ink-2`, max 520px wide
4. **Stat strip** — 4 stats inline, separated by 1px verticals:

| Stat | Value | Label |
|---|---|---|
| Agencies indexed | `259` | AGENCIES INDEXED |
| Filter facets | `14` | FILTER FACETS |
| Languages | `2` | LANGUAGES |
| Sign‑up cost | `$0` | TO BROWSE |

  Each stat: large Spectral number (~36px) + mono 11px uppercase label below. Tabular numerals.

5. **Search bar** — single horizontal pill, 56px tall, white, 1px `--line` border, 12px radius. Three regions:
   - Left (~50%): magnifier icon + input (`Skilled nursing, dementia care…`)
   - Middle (~30%): pin icon + input (`Houston, TX`)
   - Right: yellow `bg: --accent` square button with magnifier glyph, 56×56, no radius on the button itself (matches outer pill)

   Vertical hairlines separate the three regions inside the pill.

### 7.3 `SponsoredCarousel` + `SponsoredCard`

- Horizontal scroll rail, 3 cards visible at desktop
- Card: 320×220, white, 1px border, 12px radius, padded 24px
- Inside each card:
  - Tiny `SPONSORED` mono eyebrow top‑right
  - `LetterTile` (80×80) top‑left
  - Agency name (Spectral 500, 18px)
  - Stars + Google rating
  - Up to 3 tag chips (see `tagsFor()` derivation)
  - Phone number (mono, 13px) bottom‑left
- Prev/Next arrow buttons absolutely positioned at left/right edges, 36px circles, hairline border, disabled when at start/end (opacity 0.3)

### 7.4 `FilterSidebar`

260px fixed‑width column, sticky on scroll above 1024px breakpoint.

**Sections, in order, separated by 1px hairlines:**

1. **Suggested** — 5 chip‑style quick filters in a wrap. Chip styling:
   - Inactive: white, 1px `--line`, `--ink-2`, 26px tall, 12px text, fully rounded
   - Active: black bg, white text
2. **Distance** — radio group: `2 mi`, `5 mi`, `10 mi`, `Any` (custom radio: 14px circle, yellow dot when checked)
3. **Language** — checkboxes: Spanish, Vietnamese, Chinese (each with `(N)` count in mono)
4. **Insurance** — Medicare, Medicaid
5. **Service** — Skilled Nursing, Home Health Aide, Personal Care, Companion Care, Physical Therapy, Occupational Therapy, Speech Therapy, Dementia Care, Hospice

Each filter section is **collapsible** — head is Spectral 500, 14px, with a chevron that rotates 180° when open. Hover state: text → `--accent`.

**Custom checkbox**: 14px square, 1px border, `--accent` fill when checked, with a hand‑drawn black tick (`border-width 0 1.5px 1.5px 0`, rotated 45°).

A **`Clear all`** link sits at the top‑right of the sidebar header when ≥1 filter is active. Total selected count is shown next to "Filters".

### 7.5 `ResultCard` (the listing's primary unit)

CSS Grid, 4 columns: `28px | 160px | 1fr | 180px`, gap 22px, padding 22×24, white, 1px `--line`, 12px radius.

```
[ #idx ] [ LetterTile ] [ Header + tags + summary + meta ] [ CTA column ]
```

**Column 1 — Index** (28px wide, top‑aligned)
- Result number, e.g. `01`, in `--ink-3`, 13px, tabular numerals

**Column 2 — Thumb**
- 160×160 `LetterTile`: white card, 1px hairline, 60px Spectral letter (first letter of agency name)
- Background hue is **deterministic from the agency name** — a hash → muted HSL tint at 8% saturation, 96% lightness. Adds subtle differentiation without breaking the white aesthetic.

**Column 3 — Info** (the meat)
- Agency name: Spectral 500, 22px, `--ink`
- Sub‑row: stars (CMS Medicare rating) + `4.5` numeric + `(N reviews)` mono. Then a `·` separator and Google rating in the same pattern.
- Tag row: up to 5 chips derived from booleans (see `tagsFor` in `components.jsx`). Each chip: 24px tall, hairline, 999px radius, 11.5px text.
- AI summary: `--ink-2`, 14px, max 2 lines (use `-webkit-line-clamp: 2`)
- Meta row: ZIP · phone (mono) · "Licensed since YYYY" (mocked in fixture)

**Column 4 — CTA**
- Primary button: `View profile →` — black bg, white text, 12px radius, full‑width of column, 44px tall, 13px Inter Tight 500
- Secondary text link below: `Call now` with phone glyph, mono 12px, dotted underline

**Hover state on the whole card:**
- Border → `--line-strong`
- Shadow → `0 8px 24px -12px rgba(10,10,10,0.08)`
- A `position: absolute; inset: 0` "stretched link" wraps the agency name → makes the entire card clickable while individual buttons inside still work (they're `z-index: 2`).

### 7.6 `Stars`

Custom CSS technique — single inline element, two `★★★★★` strings stacked, foreground clipped by width. Implementation in the `<style>` block. Don't reach for an icon library; the visual is `★`s with a precise gold‑on‑grey treatment.

### 7.7 `Pagination`

Below results, centered.
- Prev / Next as text links with arrows (disabled state: `--ink-4`)
- Page numbers: 5 visible at a time, current page is black‑filled circle, others are hairline circles
- Mono numerals throughout

### 7.8 `MessageBoard` (sectional break)

Background changes to a soft paper tone (`#FAF7F0` or similar — extract from prototype). 2‑column grid:

**Left col — "Houston families ask"**: 4–5 short Q&A items. Each:
- Question in Spectral 500, 16px
- Answer in `--ink-2`, 14px, max 3 lines
- Asked‑date + a "by [first name from Houston]" attribution in mono 11px

**Right col — "Recently reviewed"**: 4 review previews, each linking to an agency. Item:
- Letter tile (40×40)
- "REVIEWED" eyebrow + agency name + truncated 1‑line excerpt
- "Read all →" affordance on hover

Footer of the section: a single small line in `--ink-3`: `Reviews aggregated from Google Business & CMS Home Health Compare · Last sync 3 hours ago` + a dotted‑underline `How we verify reviews →` link on the right.

### 7.9 `Footer`

The most distinctive section visually:

- Full‑bleed cream→honey gradient background (`#FBF3DD → #F1E0AC`), faint SVG grain overlay
- All text in deep umber `#1C1608`
- Top: section number `§ 04` (mono) on the left, eyebrow `THE PROMISE` on the right
- Manifesto: a 2‑line Spectral italic block, ~32px, max 720px:
  > *We index every licensed agency, name the things that matter, and never take a cut from who you choose.*
- 4‑col colophon below (each col: small uppercase head + 4–5 link items in body sans):
  - Directory · Methodology · About · Legal
- Bottom strip: `WeCarely · Indexed in Houston · © 2026` in mono 11px

---

## 8. Interactions & Behavior

### Filter logic
- **Within an axis** (e.g. Service): OR — checking 2 services shows agencies matching either.
- **Across axes**: AND — checking `Spanish` (Language) + `Medicaid` (Insurance) shows agencies matching both.
- Result count updates live next to "259 results".
- "Clear all" removes every selection and resets distance to `Any`.

### Sort
Dropdown options:
1. Trust score (default)
2. Medicare star rating
3. Google rating
4. Distance (ascending)
5. Name A–Z

Sort is computed client‑side over the filtered set.

### Pagination
- 15 results per page
- Jumping to a new page scrolls the result column to the top of the list (NOT the page) — keep header/hero in view if user is mid‑filter.

### Search bar
- Submits via Enter or magnifier button click
- Free‑text query matches against `name + ai_summary` (case‑insensitive substring)
- The location field is currently a placeholder — Houston is hard‑coded; treat it as decorative for v1, but wire it up to be a future ZIP / neighborhood filter.

### Hover/focus
- Cards: border darken + shadow (see §7.5)
- Buttons: 100ms ease, slight darken on black btn (`#1F1F1F`), darker yellow on yellow btn (`#E0B515`)
- Links: color → `--accent` + underline‑offset increases

### Animation
- All transitions are **120–200ms ease**. No spring physics, no fade‑in‑on‑scroll, no parallax. The aesthetic is print‑editorial — restraint matters.

### Empty / loading states
**Not yet designed.** Stub them as:
- Loading: skeleton rows matching `ResultCard` shape (hairline + grey blocks)
- Empty (no filter matches): centered Spectral italic message + "Clear filters" link

---

## 9. State Management

Minimal. Local component state is enough for v1; no global store needed.

```ts
// Filters
selections: {
  language:  Set<string>,     // 'spanish' | 'vietnamese' | 'chinese'
  insurance: Set<string>,     // 'medicare' | 'medicaid'
  service:   Set<string>,     // 9 keys (see FILTERS const)
}
distance: '2' | '5' | '10' | 'any'
quickChips: Set<string>       // mirrors a slice of `selections` for the Suggested row

// View
sort: 'trust' | 'medicare' | 'google' | 'distance' | 'name'
page: number                  // 1‑indexed
query: string                 // search input
location: string              // currently always 'Houston, TX'
```

Derived values (memoize with `useMemo`):
- `filtered` — apply selections + query
- `sorted` — apply sort to `filtered`
- `paged` — slice for current page
- `total` — `filtered.length`

When filters change, **reset `page` to 1**.

---

## 10. Data Model

Each agency record:

```ts
type Agency = {
  id: string;                       // uuid
  slug: string;                     // url‑safe, e.g. "phoenix-family-healthcare-inc-747186"
  name: string;
  city: string;                     // 'HOUSTON'
  state: string;                    // 'TX'
  zip: string;
  phone: string;                    // formatted '(281) 525‑6020'
  website: string | null;

  // Ratings
  medicare_star: number;            // 0–5, 0.5 increments (CMS Home Health Compare)
  google_rating: number;            // 0–5
  google_reviews_count: number;
  trust_score: number;              // 0–10, computed (see Methodology)

  // Languages (booleans)
  has_spanish: boolean;
  has_vietnamese: boolean;
  has_chinese: boolean;

  // Insurance (booleans)
  accepts_medicare: boolean;
  accepts_medicaid: boolean;

  // Services (booleans)
  has_skilled_nursing: boolean;
  has_home_health_aide: boolean;
  has_personal_care: boolean;
  has_companion_care: boolean;
  has_physical_therapy: boolean;
  has_occupational_therapy: boolean;
  has_speech_therapy: boolean;
  has_dementia_care: boolean;
  has_hospice: boolean;

  ai_summary: string;               // 1–2 sentence editorial blurb
};
```

`trust_score` formula (per existing data): a weighted blend of CMS star (60%) + Google rating + log(review count). Production should compute this server‑side at sync time.

---

## 11. Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| **≥1280px** | Full layout as designed. Sidebar 260px sticky. |
| **1024–1279px** | Sidebar 220px, result card columns `24 / 140 / 1fr / 160`. |
| **640–1023px** | Sidebar collapses into a top "Filters" sheet (open via button). Result card stacks: thumb on top‑left, info below; CTA column flows under info as a full‑width row. |
| **<640px** | Hero H1 → 56px. Stat strip wraps to 2×2 grid. Search bar stacks: query / location / button vertically. |

The prototype is desktop‑only — mobile breakpoints are described above but not visually mocked. Use the desktop spec + standard responsive patterns.

---

## 12. Accessibility

- All ratings have `aria-label="X out of 5 stars"`
- Custom checkbox/radio: keep the underlying `<input>` and visually hide it; or use `appearance: none` with proper `:focus-visible` outlines (the prototype uses the latter — add `:focus-visible` rings if missing)
- Result cards use a "stretched link" pattern — the agency name is the actual `<a>`, with `position: absolute; inset: 0` to expand the click target. Inner buttons stay above with `z-index: 2`. Make sure the link has visible focus and the inner buttons don't trap focus.
- Color contrast: `--ink-3` on white is 3.5:1 — **fine for large text and decorative labels, NOT okay for body**. The prototype uses it only for eyebrows, counts, and meta — keep it that way.
- Filter sections collapsible: use `<button aria-expanded>` + `<region>`.

---

## 13. SEO Notes (post‑MVP)

When this lands in Next.js:
- Page title pattern: `Home care agencies in Houston, TX — N licensed providers | WeCarely`
- Meta description: pull from a city‑level template
- Each `ResultCard` should have `itemtype="https://schema.org/MedicalOrganization"` microdata
- Sitemap: `/agencies/[slug]` for every record

Filter combinations should NOT each have their own URL — keep filters in query params (`?lang=spanish&service=skilled-nursing`) and `noindex` non‑canonical combos.

---

## 14. Files in This Bundle

```
design_handoff_houston_listing/
├── README.md                    ← you are here
├── design/
│   ├── Houston Listing.html     ← the main prototype (open this in a browser)
│   ├── components.jsx           ← all React components
│   ├── tweaks-panel.jsx         ← design‑exploration UI (NOT for production)
│   ├── agencies.json            ← fixture data, 10 records
│   └── Type Comparison.html     ← typography decision aid (3 pairings)
└── screenshots/
    ├── 01-hero.png              ← header + hero + search
    ├── 02-results.png           ← sponsored carousel + sort bar + first cards
    ├── 03-cards.png             ← result cards, mid‑scroll
    ├── 04-message-board.png     ← Q&A + recently reviewed
    ├── 05-footer.png            ← cream footer w/ manifesto
    └── 06-type-comparison.png   ← typography decision aid
```

To view the prototype: open `design/Houston Listing.html` directly in a browser. Internet required (Tailwind + fonts via CDN).

---

## 15. Open Questions to Resolve

Things the design intentionally does NOT answer — flag these to product before implementing:

1. **Detail page** (`/agencies/[slug]`) — not designed yet. Stub the link.
2. **Auth state** — current design is logged‑out only. No "Save", "Compare", "Account" affordances.
3. **Real distance calculation** — needs ZIP centroid + agency lat/lng. Prototype shows fake distance labels.
4. **Sponsored slot business rules** — who pays, how slots are filled, "Sponsored" disclosure copy.
5. **Methodology page** — linked from footer but not built.
6. **Mobile filter sheet UX** — described above but not visually mocked.
