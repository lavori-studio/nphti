# NPHTI Website Redesign — Project Context

*Handoff doc. Paste into a new chat to pick up where we left off.*

---

## 1. The project in one paragraph

The **National Pediatric Hypnosis Training Institute (NPHTI)** is a nonprofit that trains licensed health professionals (pediatricians, psychologists, nurses, therapists) in pediatric clinical hypnosis. Its existing site is on **Wix** and looks dated. I (working as "L") am doing a cosmetic redesign — same content and structure, modernized presentation — at a **not-to-exceed $1,000**, hourly, to be **completed within 60 days of the board's decision**.

Three design directions were built as complete faculty pages and presented to the board under neutral labels (Option A / B / C) via a blind-review landing page.

**➡️ THE BOARD SELECTED BRIGHT GEOMETRIC (shown as "Option B"). That is the winning direction. All remaining work rolls it out to the rest of the site.**

The other two directions (Editorial "The Masthead" = Option A, Storybook = Option C) are retired. They can be deleted or kept for reference, but no further work goes into them.

---

## 2. Current status

**Done:**
- Three full faculty pages built, populated with real NPHTI content, mobile-polished.
- Neutral A/B/C landing page (`index.html`) for the blind board review.
- Board proposal drafted (Word doc): overview, rationale, 5-phase scope, 60-day timeline, $1,000 not-to-exceed cost table. *Placeholders left: hourly rate, date, preview link.*
- Board has chosen Bright Geometric.
- **Homepage built** (`nphti-home-bright-geometric.html`): alert banner → hero → free webinar callout → What We Do → mission band → workshop CTA → three-up audience cards (For Health Professionals / Support Our Mission / Find a Provider) → footer.
- **Leadership page built** (`nphti-leadership-bright-geometric.html`): reuses the faculty page's founder-card layout (2-up grid, rounded-square avatar, color-block band, clamp + "Read more" bios) for the 8-member Board of Directors, alphabetical by last name: Bemel (Secretary) · Boucher (Vice President) · Carlson · Keating · Lombard (President) · Meyer · Pendergrast (Treasurer) · Thomson. Officer titles render as a small uppercase line under credentials; members without a title just omit that line. Bios are the live site's text as-is. Photos wired to `faculty/<lastname>.jpg` (board headshots live in the same `faculty/` folder as everyone else, not a separate `board/` folder) with the same jpg→png→initials fallback as faculty — no board headshots exist yet, so all avatars currently render as initials.

**Homepage content decisions made this round:**
- Hero copy uses NPHTI's own existing tagline rather than invented copy: *"The world's premier resource for pediatric clinical hypnosis training"* (H1) + supporting line about "highest quality... training for licensed health professionals."
- "What We Do" pulls NPHTI's real three-part mission from the live `nphti.org/about-us` page (Training Program / Resource Center / Community), paraphrased — not invented pillar copy.
- Workshop levels: **Fundamentals** (not "Foundations") → Intermediate → Advanced.
- Tone pass: removed pushy/urgency phrasing ("space is limited," etc.), switched "kids" → "children" throughout, removed an unverified "since 1994" founding-date claim I'd guessed at.
- Added a **Find a Provider** callout card, linking to the live `nphti.org/find-a-provider` directory (also in the footer).
- Added a board-requested **free webinar callout** section: "Hypno-curious?" + 4 bullet points (bust myths / review evidence / see it in action / preview the Annual Workshops) + audience note (MDs, NPs, PAs, Child Life Specialists, Pediatric Mental Health Providers) + a small photo of a child. Webinar button now links to the real Zoom recording (opens in a new tab).
- Design craft pass: replaced generic icon-grid cards with an editorial diamond-marker list (reusing the site's existing chip/prior-faculty visual language instead of a generic SaaS icon set); mission section is now a full-bleed dark band (same `100vw` negative-margin technique used elsewhere on the site) instead of a rounded CTA box; workshop CTA is a striped card instead of a plain rounded box.

**Photo handling:**
- Photos are referenced **externally** (`images/<filename>.jpg`), never embedded, to keep file size down — same pattern as faculty headshots.
- Homepage currently uses two: a bubbles image in the hero (`images/bubbles-play.jpg`) and a child's photo in the webinar callout (`images/webinar-child.jpg`).
- Default rule going forward: **max 1 photo per page** unless L says otherwise (the homepage is an explicit exception — two photos, both requested).

**Open items:**
- Verify all 26 faculty headshots are present in the `faculty/` folder.
- **Board headshots needed** in the `faculty/` folder (`bemel.jpg`, `boucher.jpg`, `carlson.jpg`, `keating.jpg`, `lombard.jpg`, `meyer.jpg`, `pendergrast.jpg`, `thomson.jpg`) — none exist yet, all avatars fall back to initials.
- Live site currently shows **2026 Annual Workshops registration open, Oct 15–17, in St. Charles, IL** (per nphti.org) — not yet reflected in the homepage copy; flagged but not added since the level of specificity wasn't confirmed as wanted.

---

## 3. Hard constraints — do not violate

These were learned the hard way. Don't regress on them.

- **NO spiral / ripple / concentric / swirl / vortex motifs.** They read as the "swinging watch" hypnosis cliché the client is explicitly escaping. Bright Geometric's shapes are deliberately **angular** — nothing that rotates around a center.
- **NO warm base palette.** The logo is aggressively cool. Warmth is allowed only as a **micro-dose guest accent** (the single marigold `--spark` dot). Never as a foundation.
- **The logo is fixed** — do not restyle or recolor it.
- **No emojis.** Too cartoonish for a clinical-professional audience.
- **Playful ≠ cutesy.** Energy comes from structure, scale, color, and type — not illustration or pastels.
- **Audience:** licensed health professionals. **Credible first, distinctive second.**
- **Tone:** clear, calm, professional — not pushy or salesy. Use "children," not "kids."
- **Photos:** referenced externally, never embedded; max 1 per page unless told otherwise.
- Prefer **NPHTI's own real copy** (mission statements, taglines, program names) over invented marketing language whenever it exists — check `nphti.org` rather than drafting from scratch.
- No small "Design preview · Option X" note line under the header on pages going forward — dropped from the leadership page at L's request; strip it from earlier pages too when next touched.

---

**Confirmed:** `nphti-logo.png` in the repo root is a genuine transparent PNG (RGBA, verified alpha channel — corners fully transparent, only the mark itself is opaque). No re-sourcing needed.

## 4. The winning design system — Bright Geometric

Register: confident, modern, playful-geometric. Built entirely from the logo's cool palette so it never fights the logo.

### Color tokens (exact, from the live file)

```css
:root{
  --purple:#424c9a; --teal:#3290a4; --lavender:#90a1d7; --aqua:#4da9bc;
  --paper:#f1f4fb;    /* cool paper, NOT warm cream */
  --paper-2:#e7ecf8;
  --white:#ffffff;
  --ink:#161b38;      /* deep cool navy */
  --mid:#5b618c;      /* cool grey-purple body */
  --line:#dbe1f4;
  --spark:#f2b134;    /* the single warm guest — micro-dose only */
}
```

The four logo hues (purple / teal / lavender / aqua) are used as **bold blocks** — card top-bands, avatars, glyphs — cycling in that order.

### Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
```

- **Bricolage Grotesque** (500/600/700) — display, headings, names, section titles.
- **DM Sans** (300–500) — body, eyebrows, labels, nav.

### Signature elements

- **Four-hue top band** (`.topband`) — full-bleed 6px strip of purple/teal/lavender/aqua across the very top of the page.
- **Geometric play-shapes** (`.shapes` / `.shapes-mini`) — flat angular polygons, one per logo hue, with gentle drift. On the homepage hero these are now anchored to the corner of the photo frame rather than floating loose behind text.
- **Cards** (`.card`) — radius 10px, 1.5px `--line` border, 8px color-block top band; hover lifts `translateY(-5px)`, border takes the hue, corner diamond glyph rotates 45°→135°.
- **Avatars** (`.avatar`) — rounded squares (28% radius), never circles.
- **Section headers** (`.sec-head`) — eyebrow (+ optional marigold spark dot) → big Bricolage title → 2px ink underline rule.
- **Editorial diamond-marker lists** — used for prior-years faculty and now for the homepage "What We Do" section; preferred over generic icon-in-a-box cards, which read as templated.
- **Full-bleed color bands** — `width:100vw; margin-left:calc(50% - 50vw);` trick, used for the homepage mission section instead of a rounded CTA box.
- **Chips** (`.chip`) — pill outlines with a small diamond, used for keynote speakers.
- **Expandable bios** (`.more`) — long bios clamp with a mask fade and a "Read more" toggle.

### Header & nav

- Logo left, nav right: **About · Training · Resources · Contact · Donate** (Donate is a filled purple button).
- **Below 720px:** links collapse into a **hamburger** (`.nav-toggle`) that opens an in-flow stacked menu and calls `reportHeight()` on open/close.

---

## 5. Technical patterns (carry these to every new page)

### Iframe height contract — REQUIRED
Every page is embedded in Wix via iframe and must self-report its height:

```javascript
function reportHeight(){
  var h=document.documentElement.scrollHeight;
  if(window.parent){window.parent.postMessage({nphtiFrameHeight:h},'*');}
}
window.addEventListener('load',reportHeight);
window.addEventListener('resize',reportHeight);
```
Call `reportHeight()` again after ANY interaction that changes page height (bio expand, hamburger open). On the Wix side, a **Velo `onMessage` handler** reads `nphtiFrameHeight` and sets the iframe height.

### Photos
- Referenced **externally**, never embedded: `images/<name>.jpg` (homepage) or `faculty/<lastname>.jpg` (faculty page).
- Faculty loader tries **`.jpg` → falls back to `.png` → falls back to initials**.
- Filenames lowercase, no accents — GitHub Pages is case-sensitive.

### Other conventions
- Self-contained HTML; fonts via Google Fonts `<link>`; logo referenced as `nphti-logo.png` in the root.
- Accessibility: `prefers-reduced-motion` guards on all animation; `:focus-visible` outlines.
- Faculty data lives in a single `data.py`, rendered into HTML by a `build.py` generator — don't hand-copy content across files.

---

## 6. Content reference

- **Founders (4):** Pamela Kaiser (PhD, CPNP, CNS) · Daniel P. Kohen (MD, FAAP, ABMH) · Karen Olness (MD, FAAP, ABMH) · David Wark (PhD). Shown 2×2, name + credentials + bio only (no role/title lines).
- **Teaching Faculty (22):** alphabetical by last name, expandable bios, no tags.
- **Past Keynote & Guest Speakers (8):** name + credentials only, no years.
- **Prior Years' Teaching Faculty (16):** name + credentials only.
- **Homepage "What We Do"** (from live `nphti.org/about-us`): Training Program (clinical hypnosis skill development for advanced practice pediatric clinicians) / Resource Center (helps parents & professionals find NPHTI-trained clinicians, access current research) / Community (global network of hypnosis-trained child health clinicians).
- **Workshop levels** (from live site): Fundamentals (Introductory) → Utilization & Expanded Clinical Applications (Intermediate) → Individualized Consultation (Advanced, small-group, not offered every year).
- **Find a Provider**: live directory at `nphti.org/find-a-provider`, searchable by name, location, specialty, telehealth availability.
- **Board of Directors (8, alphabetical by last name):** Cheryl Bemel (PhD, LP — Secretary) · Bonnie Boucher (HMCC, CMP — Vice President) · Torie Carlson (PhD — added this round, not yet on the live site) · Adam Keating (MD, FAAP) · Lisa Lombard (PhD — President) · Neil Meyer (no credentials listed) · Robert Pendergrast (MD, MPH — Treasurer) · Linda Thomson (PhD, APRN, ABMH, ABHN). Thomson also appears on the faculty page's Past Keynote & Guest Speakers list — same person, different page, intentional overlap (same pattern as Kaiser appearing as both founder and prior-years faculty).

Note: Kaiser appears both as a founder and in prior-years (intentional). Kuttner and Lombard are current teaching faculty and were removed from the past-speakers list at client request.

---

## 7. Hosting & deployment

- **Demo/review:** GitHub Pages. The board can't tell a GitHub-hosted page from a Wix-embedded one, so Pages is fine for review.
- **Final target:** embedded in **Wix** via iframe.
- All files sit in one flat folder: the HTML pages + `nphti-logo.png` + a `faculty/` subfolder of headshots + an `images/` subfolder for homepage/interior-page photos.
- **Gotcha:** GitHub Pages is case-sensitive and its CDN caches aggressively. After pushing, wait for the green "pages build and deployment" in the Actions tab, then hard-refresh (Android Chrome especially — use an Incognito tab to bypass cache).

---

## 8. How I like to work

- Give me concrete artifacts to react to, not abstract pitches.
- Iterate — I'll send screenshots of what's wrong and we'll fix in passes.
- Don't rebuild what's working; make targeted edits.
- Check the live NPHTI site for real copy before inventing marketing language.

---

## 9. Next up

- Confirm all 26 faculty headshots are present in `faculty/`.
- Get board headshots into the `faculty/` folder (currently all initials fallback).
- Decide whether to add the specific 2026 workshop dates/location (Oct 15–17, St. Charles, IL) to the homepage.
- Build remaining interior pages in Bright Geometric: About, Training, Resources, Contact, Donate. (Leadership is done.)
- Wix embedding: Velo `onMessage` handler for `nphtiFrameHeight`, cross-browser/device QA, launch, handoff notes.
