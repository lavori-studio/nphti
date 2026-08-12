# Contact Form Spec — Native Wix Forms

This describes the form to build directly in the Wix editor on the Contact page, below the `nphti-contact-bright-geometric.html` iframe (which only carries the hero — eyebrow, heading, intro copy, and the paper-airplane photo). The form itself is intentionally **not** in that HTML file: it uses Wix's native Forms + Automations so submissions email out with zero third-party services or API keys to manage.

I can't build this myself — Wix Forms only exist inside the Wix editor, which this repo has no access to. This doc is the exact spec for whoever builds it there.

---

## 1. Where it lives

On the Contact Wix page: iframe (hero) at the top, native Wix Form directly beneath it, then the sitewide footer. No gap/section divider needed beyond normal Wix page padding — visually it should read as one continuous page, not two stacked blocks.

## 2. Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| Name | Short text | Yes | |
| Email | Email | Yes | Wix validates format automatically |
| Reason for contact | Dropdown | Yes | Options: *Annual Workshops · Webinars · Training Resources / Eligibility · Donations & Support · Press / Media · Other* — lets whoever answers triage at a glance without reading the whole message first |
| Message | Long text / paragraph | Yes | ~6 rows tall |
| Phone | Phone | No | Optional, in case a reply is easier by phone |

Do **not** add a "how did you hear about us" or marketing-consent field — out of scope for a simple contact form and adds friction.

## 3. Spam protection

Turn on Wix's built-in **reCAPTCHA v3** (invisible) on this form. It requires no visible checkbox and won't clash with the page's visual design. Skip anything more aggressive (visible checkbox captcha, math questions) — this form doesn't need it and it only adds friction for legitimate messages.

## 4. Where submissions go

**Recipient: `TrainWithNPHTI@gmail.com`** — the same address already used sitewide for workshop, webinar, and training questions, so everything lands in one inbox. **Confirm this is actually the right inbox for general contact messages** (as opposed to training-specific ones) before wiring it up — if there's a different general inbox, use that instead.

Setup: Wix Automations → trigger **"Form submitted"** (scoped to this specific form) → action **"Send email"** → recipient as above, with the submitted field values inserted into the email body via Wix's dynamic fields (Name, Email, Reason, Message, Phone). Subject line: `New Contact Form Message: {Reason for contact}` — makes the inbox scannable by topic.

## 5. Confirmation state

Use Wix's built-in **inline "Thank You" message** (replaces the form on the page after successful submission) rather than a redirect to a separate page or a lightbox popup. Suggested copy:

> **Message sent!** Thanks for reaching out — we'll get back to you as soon as we can.

Keep it in the same visual language as the rest of the site (Bricolage Grotesque for the heading if Wix's Thank You block supports custom fonts, otherwise plain is fine — this is a low-stakes moment, don't over-invest here).

## 6. Visual styling — match Bright Geometric

Wix's form field styling options are more limited than custom HTML, so match as closely as the editor allows:

| Element | Style |
|---|---|
| Field labels | DM Sans 500, 13px, `--ink` (#161b38) |
| Input / textarea / dropdown | White background, 1.5px solid `--line` (#dbe1f4) border, 9px border-radius, 13px padding. Focus state: border color `--purple` (#424c9a) |
| Placeholder text | `--mid` (#5b618c), same as body copy elsewhere on the site |
| Submit button | Filled: background `--purple` (#424c9a), white text, DM Sans 500 14px, ~13px vertical / 22px horizontal padding, 9px border-radius. Hover: background darkens to `#353f85` — same button as every other CTA sitewide |
| Field gap | ~18–20px vertical spacing between fields |
| Required-field asterisk | `--spark` (#f2b134) if Wix supports custom asterisk color, otherwise default is fine — this is a very minor detail |

Font: DM Sans throughout (already connected to the Wix site per `WIX-HEADER-FOOTER-SPEC.md` §2). Don't introduce a different font for the form.

## 7. Mobile

Wix's native form responsiveness should handle stacking automatically — just verify fields go full-width in a single column below ~600px, matching how every other page on this site stacks to one column on mobile.
