# Wix Header & Footer Spec — Bright Geometric

*Companion to `NPHTI-CONTEXT.md`. This is the build spec for the site chrome that now lives natively in Wix instead of inside each embedded HTML page.*

---

## 1. Why this doc exists

Each page (`nphti-*-bright-geometric.html`) is embedded into a Wix page via iframe. Originally every page carried its own copy of the header (topband + logo + nav) and footer, baked into the HTML. Since Wix owns the outer page chrome around every iframe, that's duplicated effort and it's what Wix is *for* — so the header and footer have been **stripped out of all four HTML files** and need to be rebuilt as native Wix elements (Header + Footer), applied sitewide.

**What stayed in the HTML:** everything from the hero section down — all page content. **What moved to Wix:** the 4-hue topband strip, the logo, the primary nav (including the Training dropdown), and the footer. **What stayed page-specific:** the homepage's dark "Registration is open" promo banner — that's page content, not site chrome, so it's still inside `nphti-home-bright-geometric.html`, sitting right above the hero.

---

## 2. Design tokens (exact values)

```css
--purple:   #424c9a;
--teal:     #3290a4;
--lavender: #90a1d7;
--aqua:     #4da9bc;
--paper:    #f1f4fb;   /* cool paper — page background, NOT warm cream */
--paper-2:  #e7ecf8;   /* hover/tint background */
--white:    #ffffff;
--ink:      #161b38;   /* deep cool navy — primary text, borders */
--mid:      #5b618c;   /* cool grey-purple — secondary text, inactive nav links */
--line:     #dbe1f4;   /* hairline borders */
--spark:    #f2b134;   /* marigold — micro-dose accent only, never a base color */
```

**Fonts** (Google Fonts, already linked in every HTML page — Wix needs its own font connection):
- **Bricolage Grotesque**, weights 500/600/700 — not used in header/footer chrome itself (nav is DM Sans), but the logo file is an image so no font dependency there. Bricolage Grotesque only matters for content headings, which live inside the iframes.
- **DM Sans**, weights 300–500 — used for the nav links, Donate button, and all footer text.

If Wix's font picker doesn't have Bricolage Grotesque or DM Sans as first-class options, use the Wix "Add Google Font" / custom font upload flow — do not substitute a different sans-serif, since font consistency between the Wix chrome and the iframe content is what makes the seam invisible.

---

## 3. Header

### 3.1 Topband
A flush, full-width 6px strip at the very top of the page, above everything else (above the logo row). Four equal-width segments, left to right:

```
purple (#424c9a) | teal (#3290a4) | lavender (#90a1d7) | aqua (#4da9bc)
```

In Wix: four equal-width rectangle/strip elements stacked horizontally, or a single element with a 4-stop **hard-edged** (no gradient blending) linear-gradient background at 25/50/75% stops. No gradient blend — these are flat color blocks, not a gradient.

### 3.2 Logo + nav row
- **Logo**: `nphti-logo.png` (transparent PNG, already confirmed genuinely transparent — do not recolor or restyle it). Rendered height **80px**, width auto.
- **Row layout**: logo left, nav right, space-between. Row padding: roughly 16–24px top, 14–20px bottom (scales with viewport — use Wix's responsive padding if available, otherwise ~20px top / 16px bottom is a safe fixed value).
- **Bottom border**: 2px solid `--ink` (#161b38), full width of the row.
- Background: `--paper` (#f1f4fb) or transparent over the page background — the page background is `--paper` everywhere, so either works as long as it's not white or warm.

### 3.3 Nav links
Order: **About · Training (dropdown) · Resources (dropdown) · Contact · Donate**

| State | Style |
|---|---|
| Default | DM Sans 500, 13.5px, color `--mid` (#5b618c), no underline |
| Hover | color `--ink` (#161b38) |
| Current page | color `--ink` (#161b38) — same as hover, no underline, no pill/background. Wix's native "current page" nav state should be restyled to match this (many Wix themes default to an underline or bold — override both) |
| Donate (CTA) | filled button: background `--purple` (#424c9a), text white, padding ~9px 18px, border-radius 8px, font-size 13px. Hover: background darkens to `#353f85` |

Gap between nav items: ~14–26px depending on viewport (tighter on smaller desktop widths).

### 3.4 Training dropdown

**This is the one nav item that isn't a flat link.** Training has no landing page — it's purely a menu of four real subpages:

- Mid-Year Meetup
- Annual Workshops
- Webinars
- Training Archive

**Recommended Wix approach:** create these four as actual Wix pages, nested under a "Training" parent in the Wix Pages panel (Page settings → "Show in dropdown menu" / parent-page grouping, or via Wix's Menu Manager if using a Studio site). Wix's native site menu will then automatically render "Training" as a hover/click dropdown containing the four child pages — no custom code needed for the interaction itself.

**Visual target to match** (this is what the custom-built version looked like, now removed from the HTML — replicate as closely as Wix's menu styling options allow):

- Trigger text styled identically to other nav links (DM Sans 500, 13.5px, `--mid` → `--ink` on hover/open), with a small chevron-down icon next to it that flips 180° when the dropdown is open.
- Dropdown panel: white background, 1.5px solid `--line` border, 10px border-radius, drop shadow (`0 18px 44px rgba(22,27,56,.16)`), ~240px minimum width, floats below the trigger, centered under it.
- Each of the four items: ~10px vertical / 12px horizontal padding inside the panel, 7px border-radius on hover (hover background `--paper-2` #e7ecf8), DM Sans 500 13.5px in `--ink`.
- Each item is prefixed with a small 8×8px rotated square ("diamond") in a **cycling hue** — first item purple, second teal, third lavender, fourth aqua (matches the logo's 4-hue cycle used everywhere else on the site). This is the one detail Wix's native dropdown menu likely **cannot do out of the box** (no per-item custom bullet/icon without custom code). Two honest options:
  1. **Skip the diamond markers in Wix** — acceptable simplification; the dropdown still reads as on-brand from color, type, and spacing alone.
  2. **Use Velo (Wix's code layer)** to inject the icons via custom menu markup, if the site has Velo enabled and someone is comfortable maintaining it.
  
  Don't spend a lot of effort chasing pixel-perfect fidelity here — the color/type/spacing match matters far more than the bullet icons.

**Mobile:** below 720px, this should behave as an accordion — tapping "Training" expands the four items in place (indented, same diamond/no-diamond treatment), rather than navigating or overlaying. Wix's native mobile menu should handle this automatically once the pages are nested under "Training" in the page manager; verify it actually accordions rather than just listing all four as flat top-level items in the mobile menu.

### 3.4b Resources dropdown

**Same pattern as Training — Resources also has no landing page of its own.** It's a menu of six items:

- Find a Provider (→ external link, `https://www.nphti.org/find-a-provider` — the live provider directory, not a Bright Geometric page)
- Learn about Hypnosis
- From our Faculty
- NPHTI Listserv
- Other Hypnosis Training
- FAQ

Build and styling notes are identical to §3.4 (trigger chevron, panel dimensions, diamond markers cycling purple → teal → lavender → aqua → purple → teal for the six items, mobile accordion behavior below 720px). The one difference: "Find a Provider" is an external link (opens the existing nphti.org directory), so it shouldn't be nested as a Wix child page the way the other five subpages are — set it as a plain external-link menu item within the Resources dropdown instead.

### 3.5 Mobile hamburger
Below **720px**, the nav collapses into a hamburger menu:
- Icon: 3 horizontal lines (`--ink` colored, 2px stroke), animates into an X on open (top line rotates 45° + shifts down, middle fades out, bottom rotates -45° + shifts up).
- Opens an in-flow stacked menu (not an overlay/drawer) — each link becomes a full-width row, 15px font, `--ink`, with a 1px `--line` top border between rows.
- Donate becomes a full-width filled button at the bottom of the stack, no top border.

This is standard Wix mobile-menu behavior — just make sure the breakpoint (720px), row styling, and hamburger icon match rather than using a Wix default hamburger style.

---

## 4. Footer

*(Currently only exists on the Homepage and About page — Leadership and Faculty pages don't have one in the HTML today. Since the footer is moving to Wix and will be sitewide, it will now appear on every page automatically, which is a net improvement — just noting the source asymmetry so it's not mistaken for something broken.)*

### 4.1 Structure
Top border: 2px solid `--ink`, full width, with generous top padding (~30–42px) before the footer content starts.

Three-column layout (desktop), stacking to one column below **700px**:

| Column | Width ratio | Content |
|---|---|---|
| Brand | 1.3fr | Logo (56px height) + one-line tagline: "Training licensed health professionals in pediatric clinical hypnosis." (13px, `--mid`) |
| Explore | 1fr | Label "EXPLORE" (12px, uppercase, letter-spacing .08em, `--teal`) + links: About, Training, Faculty, Resources |
| Connect | 1fr | Label "CONNECT" (same label style) + links: Find a Provider (→ `https://www.nphti.org/find-a-provider`), Contact, Donate |

Column gap: ~24–40px.

### 4.2 Footer link style
- Default: `--mid` (#5b618c), 13.5px, no underline, ~6px vertical padding per link (stacked list)
- Hover: `--ink` (#161b38)

### 4.3 Bottom bar
Below the three columns: 1px solid `--line` top border, ~20–28px top padding, space-between layout (wraps on narrow), 12px `--mid` text:

```
© 2026 National Pediatric Hypnosis Training Institute.          All rights reserved.
```

---

## 5. What's still page content, not chrome

Don't move these into Wix — they're page-specific, not site-wide:

- **Homepage promo banner** ("Registration is open for the 2026 Annual Workshops...") — dark `--ink` background bar, sits just above the hero on the homepage's iframe content only.
- Every card, section, hero, and CTA button inside each iframe — all untouched, still fully self-contained per-page HTML/CSS.

---

## 6. Known follow-up items (not blocking, but flag for later)

- **Cross-page links inside iframe content still point to sibling HTML filenames** (e.g. the About page's "Meet the Faculty" card links to `nphti-faculty-bright-geometric.html`, the homepage's nav previously linked with `#`). Once each page has a real Wix URL, these need to be remapped to the actual Wix page paths — this wasn't in scope for the header/footer strip and needs a pass once the Wix page structure exists.
- **`reportHeight()` / `nphtiFrameHeight` contract is unchanged** — every page still posts its scroll height to `window.parent` on load/resize (and on interactions like the leadership/faculty bio "Read more" toggle). The Velo `onMessage` handler on the Wix side still needs to read `nphtiFrameHeight` and resize the iframe accordingly, same as before. Removing the header/footer from the iframe content only makes the reported height *shorter* (no more double-counting header/footer height that Wix now also renders) — no contract change needed.
- **Training subpages** (Mid-Year Meetup, Annual Workshops, Webinars, Training Archive) don't exist as HTML yet — the dropdown currently points at `#` placeholders in spirit (moot now that nav lives in Wix, but the corresponding Wix pages need to actually exist before the dropdown has anywhere real to send people).
