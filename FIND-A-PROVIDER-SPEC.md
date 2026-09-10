# Find a Provider — Backend Spec (Velo)

The frontend is done — `nphti-find-a-provider.html` is a real, working map + live keyword search + expandable provider list, fetching from a JSON endpoint exposed from the existing Wix CMS Collection via a Velo backend function. This doc is everything needed to build that one function, plus what to retire on the Wix side.

The map (Leaflet + OpenStreetMap, with marker clustering) and the search/filter/results UI are already built and tested — no further frontend work needed once the endpoint is live and matches the shape below. **Field names and the collection ID below are confirmed against the real CMS Collection** (via the existing page code), not guessed.

---

## 1. Why a backend function instead of native Wix elements

The provider data already lives in a Wix CMS Collection (`FindaProvider`) and gets added there today — that workflow doesn't change. The difference: instead of a Wix-rendered repeater/table and a hand-wired map widget, a small backend function exposes that same collection as plain JSON, and the custom frontend (hosted in this repo, iframed into the Wix page) fetches it and renders the map/search/results itself. This gives full design control that matching Wix's native widget styling couldn't reach, while keeping "add a row to the CMS" as the entire update workflow.

## 2. Retire the existing page code and page elements

There's an earlier, native-Wix version of this page already live: page code that queries `FindaProvider` directly and pushes results into a `#repeater5` table and a `#html1` map widget via `postMessage`, wired to a `#input1` search box. That setup predates the custom Bright Geometric page and is **not compatible with it** — `nphti-find-a-provider.html` doesn't listen for `postMessage` at all; it does its own `fetch()` and renders its own map, search box, and results list internally, fully self-contained.

To switch over:

1. **Delete the old page code entirely.** It belongs to the page's own code file, not `backend/http-functions.js` — pasting the new backend function into the same slot won't work; it needs to go in a separate file (see §3).
2. **Remove `#input1`, `#repeater5`, and whatever `#html1` currently embeds from the page design.** Leaving them in place with no code driving them just produces an empty search box and a blank table/map next to (or instead of) the new page.
3. **Add a single HTML iframe/embed element** in their place, with its source set to this repo's hosted `nphti-find-a-provider.html` (typically the GitHub Pages URL for this repo). That one element is the entire Find a Provider page once the backend function below is live — no other page code needed.

## 3. Create the backend function

In the Wix Editor: **Velo → Backend → add `http-functions.js`** (if one doesn't already exist), and add this function.

```js
// backend/http-functions.js
import { ok, serverError } from 'wix-http-functions';
import wixData from 'wix-data';

export async function get_providers(request) {
  try {
    const results = await wixData.query('FindaProvider')   // confirmed collection ID
      .limit(1000)
      .find();

    const providers = results.items
      .filter(item => (item.lastName && item.lastName.trim() !== '') ||
                       (item.practiceName && item.practiceName.trim() !== ''))
      .map(item => {
        // certifiedregions can be an array or a string — normalize either way
        let certified = item.certifiedregions || '';
        if (Array.isArray(certified)) {
          certified = certified.join(', ');
        } else if (typeof certified === 'string') {
          certified = certified.replace(/,(?!\s)/g, ', ');
        }

        // coordinates are nested two levels deep in this collection
        const coords = (item.location && item.location.location) || item.location || {};

        return {
          name: item.lastName || '',              // confirmed: full display name (not just a surname)
          practiceName: item.practiceName || '',
          areasOfExpertise: item.areasOfExpertise || '',
          offersTelehealth: !!item.offersTelehealth,
          contactEmail: '',                        // left blank on purpose — see contactPhone below
          contactPhone: item.contactInformation || '', // shown as plain text, no mailto/reformatting
          website: item.url || '',
          city: item.textLocation || '',            // single pre-formatted string; state/country left blank
          state: '',
          country: '',
          certifiedToPracticeIn: certified,
          lat: coords.latitude || null,
          lng: coords.longitude || null
        };
      });

    return ok({
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: { providers }
    });
  } catch (err) {
    return serverError({
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: { error: 'Unable to load providers' }
    });
  }
}
```

Notes on the mapping choices:
- `contactInformation` may hold an email or a phone number depending on the row — it's mapped to `contactPhone` rather than `contactEmail` specifically because the frontend renders `contactPhone` as plain escaped text, while `contactEmail` gets wrapped in a `mailto:` link. This shows the field exactly as stored, regardless of which it actually is.
- `textLocation` is a single pre-formatted display string (not separate city/state/country fields), so it's mapped to `city` alone with `state`/`country` left blank. The frontend joins `[city, state, country]` with `.filter(Boolean)`, so the empty fields are dropped automatically and the full string displays cleanly with no stray commas.
- `location.location.latitude/longitude` (double-nested) is confirmed from the existing map-loading code — this is a level deeper than a typical Wix Address field.

**Why `Access-Control-Allow-Origin: *`:** these HTML pages are hosted on GitHub Pages and iframed into the Wix page (see `NPHTI-CONTEXT.md` §7), not served from the nphti.org domain itself — so the browser treats the fetch from inside the iframe as cross-origin, and without this header the browser will silently block the response. `*` is fine here since this endpoint only exposes public directory data (nothing private, no auth) — there's no security downside to allowing any origin to read it.

## 4. Publish and get the URL

Once published, this function is live at:

```
https://www.nphti.org/_functions/providers
```

(Wix's convention: a function named `get_providers` in `http-functions.js` is served at `/_functions/providers` — the `get_` prefix maps to the HTTP method, the rest becomes the path.) That URL is already wired into the frontend as `PROVIDERS_ENDPOINT` at the top of the `<script>` block in `nphti-find-a-provider.html`. If the site domain differs from `www.nphti.org`, update that one line.

## 5. Test it

Visit `https://www.nphti.org/_functions/providers` directly in a browser once published — the JSON should look like:

```json
{
  "providers": [
    {
      "name": "Marjan Y. Tabibzadeh, MD",
      "practiceName": "Marjan Y Tabibzadeh, MD, PLLC",
      "areasOfExpertise": "General Pediatrics / Pediatric Hypnosis",
      "offersTelehealth": true,
      "contactEmail": "",
      "contactPhone": "Marjanpeds@gmail.com",
      "website": "http://www.drtabibzadeh.com/",
      "city": "Manhasset, NY, USA",
      "state": "",
      "country": "",
      "certifiedToPracticeIn": "New York",
      "lat": 40.786,
      "lng": -73.683
    }
  ]
}
```

If `lat`/`lng` come back `null` for everyone, the nesting under `location` doesn't match some rows — check the actual field structure in the CMS Collection's field list and adjust.

## 6. What the frontend already does with this data

- Renders the map with a teal dot per provider, clustering nearby pins into purple count-circles (verified working, including the cluster-count badge, in local testing)
- Live keyword search filtering by name, practice, location, and areas of expertise — updates both the map and results list as you type
- Each result is a collapsed row (name, practice, location, telehealth badge) that expands to show areas of expertise, contact info, website, and certified-to-practice-in states
- Loading, empty ("no providers are listed yet"), no-results, and fetch-error states are all handled

None of that needs to change — it's driven entirely by whatever the endpoint returns, so once the function is live with real data, the page just works.
