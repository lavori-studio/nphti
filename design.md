# Design — NPHTI (Bright Geometric)

A locked design system for the National Pediatric Hypnosis Training Institute
website. Every page redesign or new page reads this file before emitting code.
Do not regenerate per page — extend or amend this file when the system needs
to grow. On this project, **consistency across pages is the goal, not
variety** — Hallmark's default diversification rule is inverted here (see
`references/verbs/redesign.md` § Multi-page flow and § Single-page flow →
Project-level check).

## Genre
editorial (clinical/nonprofit register — credible, warm, not corporate-SaaS)

## Macrostructure family

One family covers the whole site; there is no marketing/app/content split —
every page is a content page for a training institute.

- **All pages:** eyebrow + Bricolage Grotesque H1 + DM Sans intro paragraph
  → a sequence of `.sec` sections, each opened by a `.sec-head` (eyebrow →
  H2 → 2px ink underline rule) → repeating component archetypes drawn from
  the shared vocabulary below. Pages vary which archetypes they use and in
  what order (a pricing page leans on `.card`/price-table grids, an archive
  page leans on accordions, a donate page leans on `.give-card` grids) — but
  every page uses the same section-head rhythm, the same button voice, and
  the same token set. Variety lives in *content and component choice*, not
  in structure, palette, or type.

## Theme
- `--paper`    `#f1f4fb` — page background
- `--paper-2`  `#e7ecf8` — secondary/inset background (photo placeholders, alt rows)
- `--white`    `#ffffff` — card surfaces
- `--ink`      `#161b38` — primary text, section rules, dark full-bleed bands
- `--mid`      `#5b618c` — secondary/muted text
- `--line`     `#dbe1f4` — hairline borders
- `--purple`   `#424c9a` — primary accent (`t-purple` glyph theme, primary buttons)
- `--teal`     `#3290a4` — secondary accent (`t-teal` glyph theme, eyebrow color)
- `--lavender` `#90a1d7` — tertiary accent (`t-lav` glyph theme)
- `--aqua`     `#4da9bc` — quaternary accent (`t-aqua` glyph theme)
- `--spark`    `#f2b134` — single warm accent, used sparingly (eyebrow dot, corner glyph on banners, alert-banner dot) — never as a fill background

Cards and list items pick one of the four accent hues per instance via a
`.t-purple` / `.t-teal` / `.t-lav` / `.t-aqua` modifier class, which sets a
local `--glyph` custom property consumed by the card's top band, corner
diamond, and link-arrow color. Rotate hues across sibling cards in a grid
rather than repeating one hue.

## Typography
- Display: **Bricolage Grotesque**, weight 600–700, normal style — H1/H2/H3, always roman (no italic headers)
- Body: **DM Sans**, weight 300 body copy / 400–500 UI labels & buttons / 500 eyebrows
- Both loaded via Google Fonts (`Bricolage+Grotesque:opsz,wght@12..96,500;600;700` + `DM+Sans:opsz,wght@9..40,300;400;500`)
- Eyebrow: DM Sans 500, 11px, `letter-spacing:.2em`, uppercase, `color:var(--teal)`, paired with a 7px `--spark` dot
- H1: `clamp(34px,5.6vw,56px)`, weight 700, `line-height:1.04`, `letter-spacing:-.02em`
- H2 (`.sec-head`): `clamp(26px,4.4vw,42px)`, weight 600, `line-height:1`, `letter-spacing:-.015em`
- No gradient text fills, no straight quotes/apostrophes in copy (`&rsquo;` `&ldquo;` `&rdquo;` `&mdash;`)

## Spacing
No formal 4-pt token scale exists yet — spacing is authored with `clamp()`
directly (e.g. `.sec{margin-top:clamp(48px,7vw,90px);}`,
`.wrap{padding:0 clamp(20px,4vw,40px) clamp(48px,6vw,72px);}`). Content
width caps at `max-width:1080px` (`.wrap`), full-bleed bands break out via
`width:100vw;margin-left:calc(50% - 50vw)`. If a future page needs finer
control, promote these clamps into named `--space-*` tokens rather than
inventing new raw values — see Exports → tokens.css for a proposed scale.

## Motion
- Standard transition: `transform .15s–.2s ease, background .15s ease, border-color .15s ease, box-shadow .2s ease` — declared per-property, never `transition: all`
- Card hover: `translateY(-5px)` + shadow lift + border takes the card's accent hue
- Button hover: `translateY(-2px)` + darken fill
- Corner diamond glyph rotates 45°→135° on card hover
- `@media (prefers-reduced-motion: reduce)`: transitions and transforms disabled — required on every page that uses `.card`/`.btn` hover lift

## Microinteractions stance
- No celebratory toasts, no confetti, no bounce/elastic easing anywhere
- `:focus-visible{outline:2px solid var(--purple);outline-offset:3px;border-radius:5px;}` — required globally, same on every page
- Accordions (`<details>`) for FAQ/faculty-bio/season content, not JS-driven expand/collapse

## CTA voice
- Primary (`.btn-solid`): solid `var(--purple)` fill, white text, `border-radius:9px`, `padding:13px 22px`, hover darkens to `#353f85` + lifts
- Secondary (`.btn-outline`): transparent fill, `var(--ink)` text, `1.5px solid var(--line)` border
- In-text link (`.link-arrow`): DM Sans 500 13.5px, `color:var(--glyph)` (accent hue of its containing card), trailing arrow icon that shifts right on hover
- Never a two-line button/nav label at any viewport (shorten copy, not wrap)

## Signature components (shared vocabulary — reuse before inventing new ones)
- **`.card`** — white surface, `border-radius:10px`, `1.5px solid var(--line)`, 8px full-width color band across the top (`.band`/`.b-purple` etc.) — **not** a side stripe. A small rotated-45° diamond glyph sits in the top-right corner and rotates further on hover.
- **`.sec-head`** — eyebrow → H2 → `border-bottom:2px solid var(--ink)` rule, opens every content section.
- **Full-bleed band** (`width:100vw;margin-left:calc(50% - 50vw)`) — dark `var(--ink)` background, used for mission statements, stat bands, and fact bands. Intentional, not an anti-pattern instance, despite matching the literal `100vw` grep.
- **Diamond/square rotated glyph** (`transform:rotate(45deg)`, 2px radius) — the site's one recurring iconographic mark, standing in for bullet points, list markers, and card corner accents. Do not introduce a second icon language (Lucide/Heroicons/emoji) alongside it.
- **Accordion rows** (`<details>` with a colored left border on `summary`) — currently implemented as a 6px `border-left:solid var(--glyph)` "side-stripe," flagged in the 2026-08-14 Hallmark audit as a critical tell reused across 4 pages (training-archive, find-a-provider, webinars, training-resources). **Planned fix, not yet applied:** replace with a hairline all-round border or a small accent square beside the summary label, to match the top-band card language instead of a stripe.
- **Angled photo frame** — `.frame` with a `border-radius`d image, offset color-block "backing" shape behind it via absolute positioning, small rotated `--spark` diamond in one corner. Duotone photo filter is **retired sitewide** (see below) — all photos ship full color.

## Per-page allowances
- All pages MAY use the angled-photo-frame treatment where a real, non-AI-generated photo is available.
- No page may reintroduce the duotone SVG filter (`feColorMatrix`/`feComponentTransfer`) without explicit client sign-off — it was tried and retired across every page that had it; see project history.
- No page may use AI-generated imagery. Photos are client-supplied or sourced from verified-free stock only.

## What pages MUST share
- The token set above (`--purple`/`--teal`/`--lavender`/`--aqua`/`--paper`/`--ink`/`--spark`/etc.) — no per-page palette swaps or inline hex/oklch values.
- Bricolage Grotesque (display) + DM Sans (body) — no third face, no Inter/system-font fallback used as a primary face.
- The `.sec-head` section-opening rhythm (eyebrow → H2 → ink rule).
- The `.btn-solid`/`.btn-outline` CTA voice and the `.card` top-band-not-side-stripe card language.
- The diamond/square rotated-glyph mark as the sole iconographic system.
- The iframe height-reporting contract (see below) — every page's closing script must call `postMessage({nphtiFrameHeight:h}, '*')` on load and after any interaction that changes page height.

## What pages MAY differ on
- Which components they draw from the shared vocabulary, and in what order (accordions vs. price-table cards vs. give-cards vs. map+search).
- Which of the four accent hues (`t-purple`/`t-teal`/`t-lav`/`t-aqua`) leads a given page's card grid.
- Hero layout specifics (two-column image+copy vs. single-column banner) within the angled-photo-frame family.
- Presence/absence of a full-bleed stat/fact/mission band, depending on whether the page has real content for one (never invent a stat to fill the slot — see Hallmark's invented-metrics rule).

## Platform note — nav/footer are NOT in these HTML files
As of the current build, the site's header (logo, primary nav, Training
dropdown) and footer live natively in **Wix**, not in any of these HTML
pages. Every page here is embedded into a Wix page via `<iframe>` below
Wix's own header/footer. New pages should start directly with page content
(hero section down) — do not add header/nav/footer markup to a new HTML
file. See `WIX-HEADER-FOOTER-SPEC.md` for the Wix-side spec (exact colors,
spacing, states, dropdown behavior) and `NPHTI-CONTEXT.md` § "Header & nav —
now Wix-native" for history. Every page must still include the iframe
height-reporting script:

```html
<script>
function reportHeight(){var h=document.body.scrollHeight;if(window.parent){window.parent.postMessage({nphtiFrameHeight:h},'*');}}
window.addEventListener('load',reportHeight);
</script>
```

Call `reportHeight()` again after any interaction that changes page height
(accordion expand, hamburger open, provider-search results changing).

## Exports

### tokens.css
```css
:root {
  --paper:      #f1f4fb;
  --paper-2:    #e7ecf8;
  --white:      #ffffff;
  --ink:        #161b38;
  --mid:        #5b618c;
  --line:       #dbe1f4;
  --purple:     #424c9a;
  --teal:       #3290a4;
  --lavender:   #90a1d7;
  --aqua:       #4da9bc;
  --spark:      #f2b134;

  --font-display: "Bricolage Grotesque", sans-serif;
  --font-body:    "DM Sans", sans-serif;

  --radius-card:  10px;
  --radius-photo: 12px;
  --radius-btn:   9px;

  --ease-out: ease;
  --dur-fast: .15s;
  --dur-med:  .2s;
}
```

### DTCG `tokens.json`
```json
{
  "color": {
    "paper":    { "$value": "#f1f4fb", "$type": "color" },
    "paper-2":  { "$value": "#e7ecf8", "$type": "color" },
    "ink":      { "$value": "#161b38", "$type": "color" },
    "mid":      { "$value": "#5b618c", "$type": "color" },
    "line":     { "$value": "#dbe1f4", "$type": "color" },
    "purple":   { "$value": "#424c9a", "$type": "color" },
    "teal":     { "$value": "#3290a4", "$type": "color" },
    "lavender": { "$value": "#90a1d7", "$type": "color" },
    "aqua":     { "$value": "#4da9bc", "$type": "color" },
    "spark":    { "$value": "#f2b134", "$type": "color" }
  },
  "font": {
    "display": { "$value": "Bricolage Grotesque", "$type": "fontFamily" },
    "body":    { "$value": "DM Sans", "$type": "fontFamily" }
  }
}
```

## Known drift to resolve (from the 2026-08-14 Hallmark audit)
- **Critical:** side-stripe accordions (`border-left:6px solid var(--glyph)`) in `nphti-training-archive-bright-geometric.html`, `nphti-find-a-provider-bright-geometric.html`, `nphti-webinars-bright-geometric.html`, `nphti-training-resources-bright-geometric.html` — should move to the top-band card language documented above.
- **Major:** eyebrow used on nearly every section sitewide (48 instances) — reserve for genuinely ordinal/categorical sections per page, not a default.
- **Minor:** a handful of straight apostrophes/quotes in visible copy (homepage H1, training-resources media list, scholarship-campaign earmark note) — should be curly per the Typography rule above.

No page currently carries a `/* Hallmark · ... */` stamp. Once a page is
brought into compliance with this file, stamp it:
`/* Hallmark · genre: editorial · design-system: design.md · designed-as-app */`
