# Learning Library — Style Spec (Wix Native)

The five Learning Library pages (Landing, Logged-in / "My Webinars," Visitor, Participant / course player, Payment) run entirely on Wix's own course and pricing widgets — not custom HTML like the rest of the site. There's nothing to build in this repo for these; this doc is styling guidance for whoever configures each widget's **Design** panel in the Wix editor, so the Learning Library reads as part of the same site as everything else.

**Visual reference:** a before/after mockup of the landing page, plus the full token/type reference below, is published at [claude.ai/code/artifact/075ff3b6-9690-4bb9-b427-89f3e904046e](https://claude.ai/code/artifact/075ff3b6-9690-4bb9-b427-89f3e904046e).

---

## 1. Rename the landing page

"NPHTI On Demand" → **"NPHTI Learning Library"** — a plain text/title edit in the Wix editor, no styling involved.

## 2. Color tokens (reuse — don't invent new ones)

All six already exist as the sitewide palette (see `NPHTI-CONTEXT.md` §4). Apply them as-is:

| Token | Hex | Use here |
|---|---|---|
| Purple | `#424c9a` | Buttons ("View Details," "Watch Now," "Complete Purchase"), primary links |
| Teal | `#3290a4` | Eyebrows, one hue in the accent cycle |
| Lavender | `#90a1d7` | Card accents on dark grounds |
| Aqua | `#4da9bc` | Card accents, 4th hue in the cycle |
| Paper | `#f1f4fb` | Page background (replaces the current solid teal banner fill) |
| Ink | `#161b38` | Body text color; dark-band backgrounds if used |

The current landing page's solid teal banner is off-palette with the rest of the site, which never uses teal as a full-bleed fill — only as an accent (eyebrows, hue-cycling glyphs, borders). Recommend replacing the banner with the light Paper background instead, matching every other page's hero pattern.

## 3. Typography

Both fonts are already connected to the site's Wix theme (`WIX-HEADER-FOOTER-SPEC.md` §2) — pick them from the existing font list rather than adding anything new:

- **Bricolage Grotesque**, 600–700 — webinar titles, page titles, course names. Replaces the current serif/italic treatment.
- **DM Sans**, 400–500 — descriptions, prices, buttons, labels.

## 4. Cards

Current card styling (white background, thin border, small radius) is already close. Match it exactly to the sitewide card token:

- White surface, `1.5px solid #dbe1f4` border, `10px` border-radius.
- Title in Bricolage Grotesque 600 (not serif italic) — the quotation marks around each webinar title are content, keep those; only the font changes.
- Price in DM Sans 500, `#5b618c`, with the existing thin divider line above it kept as-is.
- Button: solid Purple (`#424c9a`, hover `#353f85`), white text, DM Sans 500, `9px` radius — the same button used for every other CTA on the site. Retire the teal button.

## 5. Page-by-page notes

**Landing** — banner: Paper background, eyebrow (`NATIONAL PEDIATRIC HYPNOSIS TRAINING INSTITUTE`) + Bricolage H1 "NPHTI Learning Library" + DM Sans intro paragraph. Cards: per §4.

**Logged-in ("My Webinars")** — same card as Landing. If Wix shows a "purchased"/"owned" badge, style it as a small teal pill rather than a generic system green, so it reads as part of the same family. "Watch Now" button: solid Purple, not a second accent color.

**Visitor (not logged in)** — fewer fields (title, speaker, price only) — that's fine as content, just carry the same card/type/price styling so it doesn't read as an unstyled stub of the real page. Any "Log in to purchase" prompt: DM Sans, `#5b618c`.

**Participant (course player)** — mostly fixed Wix chrome (sidebar, progress bar, video frame, lock icons) with very few style hooks. What is stylable: the course title (e.g. *"The Broad Application of Breath Training"*) → Bricolage Grotesque 600. If the app exposes one, set the progress-bar/accent color to Purple.

**Payment** — Wix's native checkout is the most locked-down of the five; usually only the button color and site fonts carry through. Confirm the "Pay"/"Complete Purchase" button is Purple, not Wix's default blue.

## 6. What Wix likely won't let you touch

Don't spend time hunting for settings that probably don't exist on these native widgets:

- Per-card hover states (lift, border-color change on hover) — usually all-or-nothing, if exposed at all.
- The lock/checkmark icons and progress-bar shape on the course player — fixed Wix UI.
- Independent styling for "purchased" vs. "not purchased" card states beyond a badge or button label.

Matching color and font on whatever *is* exposed gets this most of the way to feeling like one site, even with these constraints.
