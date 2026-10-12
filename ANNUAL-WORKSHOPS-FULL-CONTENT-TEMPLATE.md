# Annual Workshops — Full Page Content Template

`nphti-annual-workshops.html` currently (as of the 2027 save-the-date) shows only a hero and a brief "What's New" teaser, since full registration, pricing, and lodging details for the **October 21–23, 2027** workshop at the Q Center aren't finalized yet.

This doc preserves the **full page** as it stood for the 2026 workshop (Oct 15–17, 2026) — every section, in order, with its exact copy — so that once 2027 details are confirmed, rebuilding the full page is a content swap into known structure rather than a redesign. Each section below names its CSS classes (still present in the file's `<style>`, even where the markup using them was removed) and exactly what needs updating vs. what's evergreen.

---

## 1. Hero

**Structure:** `.hero` → `.hero-grid` with eyebrow, `<h1>`, intro `<p>`, `<p class="tagline">`, `.hero-ctas` (two buttons).

```html
<span class="eyebrow"><span class="spark"></span> Training · Annual Workshops</span>
<h1>15th Annual Pediatric Clinical Hypnosis Skills <span class="c">Development Workshops</span></h1>
<p>October 15–17, 2026 · Q Center, St. Charles, IL — a new retreat setting near Chicago.</p>
<p class="tagline">"Helping Children Help Themselves"</p>
<div class="hero-ctas">
  <a class="btn btn-solid" href="https://www.nphti.org/event-details-registration/2026-nphti-annual-workshops" target="_blank" rel="noopener">Register for the Workshop</a>
  <a class="btn btn-outline" href="training/nphti-2026-annual-workshops-program-guide.pdf" target="_blank" rel="noopener">Download the Brochure</a>
</div>
```

**Update for 2027:** ordinal ("15th" → "16th," confirmed by the client for the 2027 workshop), dates, "new retreat setting" → drop once it's no longer new, registration URL, brochure filename/path.
**Evergreen:** the tagline, the general H1 pattern, the two-button shape (register + download brochure).

## 2. Quick Facts band (`.fact-band` / `.fact-grid` / `.fact`)

Full-bleed dark band, 4 facts, hue-cycled (purple/teal/lavender/aqua):

```html
<div class="fact t-purple"><div class="val">Oct 15–17, 2026</div><div class="label">Thursday – Saturday</div></div>
<div class="fact t-teal"><div class="val">Q Center · St. Charles, IL</div><div class="label">New retreat location</div></div>
<div class="fact t-lav"><div class="val">3 Concurrent Levels</div><div class="label">Fundamentals · Utilization · Advanced</div></div>
<div class="fact t-aqua"><div class="val">Earn CEUs / CMEs</div><div class="label">AMA PRA Category 1 CME/CE</div></div>
```

**Update for 2027:** dates, "New retreat location" label (drop — it's a return visit), confirm level count/names haven't changed, confirm CE accreditation language still applies.
**Evergreen:** the 4-fact structure itself.

## 3. What's New This Year (`.sec` / `.dlist`)

```html
<h2>What's New This Year</h2>
<ul class="dlist">
  <li><b>New retreat location</b> — the Q Center, a 95-acre retreat respite in St. Charles, IL, about 40 minutes from Chicago O'Hare, with walking trails, bike paths, and many other amenities.</li>
  <li><b>New Advanced Case-based Masterclass</b> — for clinicians who've completed both Fundamentals and Utilization & Expanded Clinical Applications and want case-based, mentor-led training in a small group (max 10).</li>
  <li><b>New mini-intensives, panel discussions, and large group discussions</b> woven throughout the workshops.</li>
</ul>
```

**Update for 2027:** entirely — this is "what's new" for whichever year is current. The 2027 save-the-date flyer already confirms three new-for-2027 items: new mini-intensives, a new panel discussion, new networking opportunities. Expand each with a real description once available (this is the section currently live on the save-the-date page, in abbreviated form).

## 4. Workshop Levels (`.sec` / `.levels` / `.card.level` / `.price-table`)

Three cards (purple/teal/lavender), each: level badge + "New for [year]"/"Full for [year]" badge where relevant, `<h3>` title, description `<p>`, `.price-table` of `.price-row`s, a `.price-note` (early-bird cutoff + cancellation terms), and a `.link-arrow` to register.

**Fundamentals** (Introductory) — $970 standard / $1,100 after early-bird; $915 / $1,060 MSCH members & U of MN faculty/staff; $750 / $825 grad/resident/fellow. *"For clinicians who haven't yet completed pediatric-specific hypnosis training (20+ hours), or who want to refresh core skills. Foundational skill-building in hypnosis as therapeutic communication for pain, anxiety, chronic functional conditions, and sleep — with over half the workshop spent in small-group practice (6:1 ratio)."*

**Utilization & Expanded Clinical Applications** (Intermediate) — same pricing tiers as Fundamentals. *"For clinicians who've completed a Fundamentals-level pediatric hypnosis training and use clinical hypnosis with patients regularly. Focused on personalized hypnosis goals, Ericksonian utilization principles, and applying skills to more complex medical and mental health issues."*

**Advanced Case-based Masterclass** (max 10 participants) — single fee $970 / $1,100. *"Requires both Fundamentals and Utilization & Expanded Clinical Applications. A case-based, mentor-led format (max 10 participants) covering pain, anxiety, DGBI, habit & elimination disorders, storytelling/metaphors, and neurodiversity. Each participant prepares at least 4 clinical cases."* — was full for 2026 with no waitlist; confirm capacity/availability for 2027 before reusing the "Full" badge pattern.

Price note under all three cards: *"Participants aren't considered registered until registration information is complete, the Acknowledgment & Release Waiver is agreed to, and payment is received. Cancellation policy: full refund (minus a $100 admin fee) until 30 days before the training; no refunds after that date. Questions: TrainWithNPHTI@gmail.com"*

**Update for 2027:** all pricing, the cancellation cutoff date (30 days before the new dates), whether the Advanced Masterclass runs again and its capacity/fullness status.
**Evergreen:** the three-level structure, the eligibility prerequisites between levels, the contact email.

## 5. Eligibility (`.sec` / `.dlist.two-col`)

```html
<h2>Eligibility</h2>
<p>Requires an active clinical license <b>and</b> one of the following:</p>
<ul class="dlist two-col">
  <li>Doctoral degree in Medicine, Psychology, Nursing, or Dentistry</li>
  <li>Masters degree in Social Work, Marriage & Family Therapy, or Clinical/Counseling Psychology</li>
  <li>Masters degree in Nursing or Advanced Practice Registered Nurse (APRN, CPNP, CNS)</li>
  <li>Other advanced-degree clinicians (e.g. Occupational & Physical Therapists, Speech & Language Pathologists)</li>
  <li>Child Life Specialists holding a doctoral, masters, or bachelors degree with CCLS certification</li>
  <li>Music Therapists with MT-BC board certification</li>
  <li>Registered or Board Certified Art Therapists (ATR / ATR-BC)</li>
  <li>Full-time interns, residents, fellows, or graduate students, with a letter from their department confirming current status</li>
</ul>
<p>Relevant clinical pediatric training and experience will also be considered on an individual basis — contact TrainWithNPHTI@gmail.com for more information.</p>
```

**Evergreen:** this whole section — confirm with the client it hasn't changed before reusing verbatim, but nothing here is 2026-specific.

## 6. Location & Lodging (`.sec` / `.loc-banner` / `.loc` / `.pkg`)

```html
<h2>Location & Lodging</h2>
[.loc-banner image: images/Q-center.jpg]
<p>The Q Center is a 95-acre retreat respite in St. Charles, IL — about 40 minutes from Chicago O'Hare and 50 minutes from Midway — with walking trails, bike paths, and many other amenities. St. Charles is a picturesque riverfront city offering restaurants, nightlife, and shopping just outside Chicago.</p>
<address>Q Center<br>1405 North Fifth Avenue<br>St. Charles, Illinois<br>(630) 377-3100 · qcenter.com</address>

<h3>All Attendees Choose a Package</h3>
<p>As an all-inclusive retreat center, every attendee selects either the Overnight or Day Package, in addition to workshop registration.</p>
[.pkg boxes:]
  Overnight Package — Private sleeping room, all meals and refreshments, full access to retreat amenities.
  Day Package — Breakfast, lunch, refreshments, complimentary parking, full access to retreat amenities.
<a class="btn btn-solid" href="https://book.passkey.com/event/51187468/owner/12843352/home">Reserve Your Retreat Package</a>
<p class="price-note">A limited block of overnight packages is available at a discounted rate. Reserve directly with the Q Center by [date] to secure it. Both workshop registration and a package reservation are required to hold your spot.</p>
```

**Update for 2027:** the booking link (`passkey.com` event ID is almost certainly 2026-specific — confirm a new booking link with the Q Center), the reservation deadline date.
**Evergreen:** the Q Center description, address, phone, package descriptions — it's the same venue again.

## 7. Accreditation (`.sec` / `.accred`)

```html
<h2>Accreditation</h2>
<p>Approved by the American Society of Clinical Hypnosis Standards of Training Committee toward Membership and Certification requirements. The ASCH Education & Research Foundation (ASCH-ERF) is accredited by the Accreditation Council for Continuing Medical Education and designates this activity for up to 21 AMA PRA Category 1 Credits™ (Fundamentals & Utilization) and 20 credits (Advanced Case-based Masterclass). Also approved by the National Association of Social Workers for 20 continuing education contact hours, and an approved PACE Program Provider for FAGD/MAGD credit.</p>
```

**Update for 2027:** confirm credit hour counts haven't changed (they're tied to the specific curriculum hours of that year's workshop, so re-verify rather than assume).

## 8. Testimonials (`.sec` / `.quotes` / `.card.quote`)

Three quotes, hue-cycled (purple/teal/lavender), no attribution given on the live site:

> "NPHTI has transformed my daily practice. Hypnosis helps my patients but it also helps me!"

> "NPHTI as an organization and the faculty at the conference have been impactful beyond anything I had expected. It has fundamentally changed how I view my clients as well as how I view myself."

> "I have grown so much as a professional in just three days! I felt so supported and valued by the faculty. This course felt like an apprenticeship. I had the chance to work with experts in the field, who came alongside me and boosted me up with empowerment and helpful suggestions."

**Evergreen:** fully reusable as-is, or swap in newer testimonials if the client has them.

## 9. Program Guide CTA (`.guide-cta`)

```html
<h3>Get the Full Brochure</h3>
<p>Complete day-by-day agendas for all three workshop levels, educational objectives, and the 2026 teaching faculty roster.</p>
<a class="btn btn-solid" href="training/nphti-2026-annual-workshops-program-guide.pdf">Download the Brochure</a>
```

**Update for 2027:** the year reference and the PDF filename/path once a 2027 program guide exists. Note the 2026 brochure now lives on the Training Archive page (`nphti-training-archive.html`) instead, since it's no longer the current year's guide.

## 10. Homepage registration banner & workshop CTA (`nphti-home.html`)

Two spots on the homepage referenced open 2026 registration and were updated/removed alongside the Annual Workshops rewrite — these aren't part of the Annual Workshops page itself, but need to come back in sync with it:

**Top-of-page alert banner (`.alert`) — removed entirely.** It read:

```html
<div class="alert" role="note">
  <span class="dot" aria-hidden="true"></span>
  Registration is open for the 2026 Annual Workshops.
  <a href="nphti-annual-workshops.html">View registration details →</a>
</div>
```

Its CSS (`.alert`, `.alert .dot`, `.alert a`, `.alert a:hover`) was removed too. **Restore this** (banner markup + CSS) once 2027 registration actually opens, swapping in the 2027 dates/link.

**Workshop CTA card (`.workshop`) — updated in place, not removed**, since the homepage should still point visitors at the workshop even while it's save-the-date-only:

```html
<h3><i></i>Save the Date for the 16th Annual Workshop</h3>
<p>October 21–23, 2027 at the Q Center in St. Charles, IL — training offered at three levels for licensed professionals at any stage of their practice.</p>
...
<a class="btn btn-solid" href="nphti-annual-workshops.html">Learn More</a>
```

Was previously: `<h3>Registration is open for the 2026 Annual Workshops.</h3>` / `<p>Training is offered at three levels — Fundamentals, Intermediate, and Advanced — for licensed professionals at any stage of their practice.</p>` / button text "View Workshop Details". **Update for 2027:** swap this copy back to a registration-open framing (restoring the original heading/button-text pattern above, with 2027 dates) once registration opens.

## 11. Training Calendar page (`nphti-training-calendar.html`)

Also updated alongside the rewrite, since it listed the same stale 2026 info:

**Program Links card ("Annual Workshops"):** the description and link text ("Pricing, eligibility & registration") implied live registration/pricing — updated to a save-the-date framing ("2027 details are coming soon — save the date for Oct 21–23" / link text "View the 2027 save-the-date"), matching the voice already used on the adjacent Mid-Year Meetup card. **Restore to a registration-open framing** once 2027 registration opens.

**Upcoming Events list:** removed the `Sep 15, 2026` webinar row (already past) and the `Oct 15–17, 2026` Annual Workshop row (superseded), and added a new row at the chronological end of the list (after `May 18, 2027`):

```html
<div class="cal-row">
  <div class="cal-date">Oct 21&ndash;23, 2027</div>
  <div>
    <span class="cal-badge workshop">Annual Workshop</span>
    <div class="cal-title">16th Annual Pediatric Clinical Hypnosis Skills Development Workshops</div>
    <div class="cal-note">Q Center &middot; St. Charles, IL &mdash; save the date, full details coming soon</div>
  </div>
</div>
```

**Update for 2027:** once registration opens, update the `.cal-note` to real level/pricing info (matching §4's restored content), and keep pruning past-dated rows as each one passes — this list is meant to only ever show what's actually upcoming.

**Footnote:** "for full pricing and eligibility" → "for 2027 save-the-date details". **Restore** once pricing/eligibility are live again.

---

## Rebuild checklist, once 2027 details are confirmed

1. Swap hero copy/dates/links (§1) — the 2027 workshop is confirmed as the 16th Annual.
2. Restore the Quick Facts band (§2) with 2027 values.
3. Replace "What's New" (§3) with real 2027 content — the save-the-date page already has the three flyer bullets as a starting point.
4. Restore Workshop Levels (§4) with 2027 pricing/availability.
5. Restore Eligibility (§5) verbatim unless the client says requirements changed.
6. Restore Location & Lodging (§6) with a fresh booking link and reservation deadline.
7. Restore Accreditation (§7) after confirming credit hours with ASCH/NASW/PACE for the 2027 curriculum.
8. Restore or refresh Testimonials (§8).
9. Build a 2027 program guide PDF, link it in a restored Program Guide CTA (§9), and add it to the Training Archive alongside prior years once 2027 becomes a past year.
10. Bring back the homepage alert banner and update the workshop CTA card's copy/button text (§10) to a registration-open framing, once 2027 registration opens.
11. Update the Training Calendar's program-link card, calendar note, and footnote (§11) back to a registration-open framing.
