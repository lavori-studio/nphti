# Find a Provider — Search Bar & Results Design Spec

This describes how to restyle the existing interactive directory (map, keyword search, provider data) to match Bright Geometric, once it's moved onto the Wix page below `nphti-find-a-provider-bright-geometric.html`'s hero. I'm not rebuilding the underlying functionality — the map, search-filtering, and provider data source already exist in your Wix custom code. This is a visual spec for whoever maintains that code.

The current live version (map + "Search" text field + a wide data table with 8 columns) doesn't translate well to the rest of this site's visual language, and 8 columns is too wide to read as a flat table at any reasonable screen size. The recommended layout below replaces the table with **expandable provider rows** — the same accordion pattern already used on the Training Resources and Training Archive pages — so it reads as one system with the rest of the site and works on mobile without horizontal scrolling.

---

## 1. Layout order

Hero (in the iframe) → Search bar → Map → Results list → sitewide footer. All native Wix elements below the iframe, in that order.

## 2. Search bar

Single keyword field — same interaction as today (type a keyword, list/map filter live). Restyle only:

| Property | Value |
|---|---|
| Container | Full width, max content width 1080px (matches page `.wrap`) |
| Input background | White |
| Border | 1.5px solid `--line` (#dbe1f4), 10px border-radius |
| Padding | 14px vertical, 16px left of icon, 44px left-inset for the icon, 16px right |
| Icon | Magnifying glass, 17px, `--mid` (#5b618c), vertically centered, 16px from left edge |
| Placeholder text | "Search by name, location, or area of expertise…" in `--mid`, 75% opacity |
| Font | DM Sans, 14px, `--ink` (#161b38) for typed text |
| Focus state | Border color `--purple` (#424c9a), no box-shadow glow needed |

No separate "Search" button — filtering happens live as today; the icon is decorative, not clickable.

## 3. Map

| Property | Value |
|---|---|
| Container | 1.5px solid `--line` border, 12px border-radius, `overflow: hidden` so the map corners clip cleanly |
| Height | ~340px desktop, can shrink on mobile if Wix's map element requires it |
| Pin color | `--teal` (#3290a4) for individual markers |
| Cluster circles | `--purple` (#424c9a) background, white count text — gives the cluster/pin combo the same two-tone relationship as everything else on the site |
| Zoom controls | Keep Leaflet's default +/− control, just confirm it doesn't clash visually (white background, small border-radius is fine as-is) |

Recolor only what the Leaflet/custom-code marker options expose — don't rebuild the map integration itself.

## 4. Results — expandable provider rows (replaces the 8-column table)

Each provider is a collapsed summary row by default; clicking/tapping expands it to reveal the remaining fields. This is the same interaction pattern as the FAQ and faculty bibliography accordions elsewhere on the site, so it should reuse those components' styling, not invent new ones.

**Collapsed row** shows only what's needed to scan and decide whether to expand:

| Field | Style |
|---|---|
| Name + credentials | Bricolage Grotesque 600, 15px, `--ink` |
| Practice name | DM Sans 400, 12px, `--mid`, directly under the name |
| Location (city, state/country) | DM Sans, 13px, `--mid`, right-aligned before the badge |
| Telehealth badge | Pill, 11px, 600 weight. **Yes**: background `#e3f3f0`, text `#1f6e5f` (muted green — this is the one spot on the site using green, since Yes/No status reads better as green/neutral than forcing it into the purple/teal/lavender/aqua system). **No**: background `--paper-2`, text `--mid`, label "In-person only" rather than a bare "No" |
| Chevron | 15px, `--mid`, rotates 180° open, same as every other accordion on the site |
| Left accent border | 6px, cycling hue per row (purple → teal → lavender → aqua → repeat) — same as the Training Archive season list and Training Resources faculty accordions |

**Expanded body** — two-column grid on desktop (single column under 640px), each field labeled:

| Field | Notes |
|---|---|
| Areas of Expertise | Plain text, wraps naturally — don't force into tag/chip pills, some entries are long comma-separated lists that would produce a huge chip wall |
| Certified to Practice In | Plain text — state/country list |
| Contact | Email as `mailto:` link, phone as plain text if both present, separated by " · " |
| Website | External link, same underlined-purple-link style used sitewide |

Field label style: 10px, uppercase, `--mid` at 80% opacity, 0.06em letter-spacing — matches the "SPEAKER" / "MODERATOR" labels on the Webinars page.

## 5. What NOT to change

- Don't add filter dropdowns (by state, by specialty, etc.) — out of scope, the existing keyword search is the only filter today and this spec doesn't add new functionality.
- Don't paginate — if the full list currently renders in one scrollable page, keep it that way; accordion rows are lightweight enough that 70+ providers won't feel heavy the way a wide table would.
- Don't alter the underlying data fields or the map/search filtering logic — this spec is styling only.

## 6. Mobile

Below 640px: badge and location wrap onto their own line under the name, chevron moves to that same row's end, expanded body drops to a single column. Verify with real data that long names + long practice names don't force awkward line breaks — a few entries in the current dataset have quite long combined name/practice strings (e.g. "Marjan Y. Tabibzadeh, MD" / "Marjan Y Tabibzadeh, MD, PLLC").
