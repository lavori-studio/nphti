# Find a Provider — Backend Spec (Velo)

The frontend is done — `nphti-find-a-provider-bright-geometric.html` is a real, working map + live keyword search + expandable provider list, fetching from a JSON endpoint you'll expose from your existing Wix CMS Collection via a Velo backend function. This doc is everything you need to build that one function.

The map (Leaflet + OpenStreetMap, with marker clustering) and the search/filter/results UI are already built and tested — no further frontend work needed once your endpoint is live and matches the shape below.

---

## 1. Why a backend function instead of native Wix elements

You already have the provider data in a Wix CMS Collection and add rows there today — that workflow doesn't change. The difference from the native Wix widget: instead of a Wix-rendered map/table, a small backend function exposes that same collection as plain JSON, and the custom frontend (hosted in this repo, iframed into the Wix page) fetches it and renders the map/search/results itself. This gives full design control that matching Wix's native widget styling couldn't reach, while keeping "add a row to the CMS" as the entire update workflow.

## 2. Create the backend function

In the Wix Editor: **Velo → Backend → add `http-functions.js`** (if you don't already have one), and add this function. Adjust the collection name/field keys to match your actual CMS Collection — the field keys below (`name`, `practiceName`, etc.) are guesses at common naming; open your collection's field list in the CMS panel and swap in the real keys.

```js
// backend/http-functions.js
import { ok, serverError } from 'wix-http-functions';
import wixData from 'wix-data';

export async function get_providers(request) {
  try {
    const results = await wixData.query('Providers')   // <-- your collection's ID
      .limit(1000)
      .find();

    const providers = results.items.map(item => ({
      name: item.name || '',
      practiceName: item.practiceName || '',
      areasOfExpertise: item.areasOfExpertise || '',
      offersTelehealth: !!item.offersTelehealth,
      contactEmail: item.contactEmail || '',
      contactPhone: item.contactPhone || '',
      website: item.website || '',
      city: item.city || '',
      state: item.state || '',
      country: item.country || '',
      certifiedToPracticeIn: item.certifiedToPracticeIn || '',
      // If location is a Wix "Address" field, coordinates live at item.location.latitude/longitude.
      // Swap this out if your collection stores lat/lng as separate plain number fields instead.
      lat: item.location && item.location.latitude ? item.location.latitude : null,
      lng: item.location && item.location.longitude ? item.location.longitude : null
    }));

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

**Why `Access-Control-Allow-Origin: *`:** these HTML pages are hosted on GitHub Pages and iframed into the Wix page (see `NPHTI-CONTEXT.md` §7), not served from the nphti.org domain itself — so the browser treats the fetch from inside the iframe as cross-origin, and without this header the browser will silently block the response. `*` is fine here since this endpoint only exposes public directory data (nothing private, no auth) — there's no security downside to allowing any origin to read it.

## 3. Publish and get the URL

Once published, this function is live at:

```
https://www.nphti.org/_functions/providers
```

(Wix's convention: a function named `get_providers` in `http-functions.js` is served at `/_functions/providers` — the `get_` prefix maps to the HTTP method, the rest becomes the path.) That URL is already wired into the frontend as `PROVIDERS_ENDPOINT` at the top of the `<script>` block in `nphti-find-a-provider-bright-geometric.html`. If your site domain differs from `www.nphti.org`, update that one line.

## 4. Test it

Visit `https://www.nphti.org/_functions/providers` directly in a browser once published — you should see raw JSON like:

```json
{
  "providers": [
    {
      "name": "Marjan Y. Tabibzadeh, MD",
      "practiceName": "Marjan Y Tabibzadeh, MD, PLLC",
      "areasOfExpertise": "General Pediatrics / Pediatric Hypnosis",
      "offersTelehealth": true,
      "contactEmail": "Marjanpeds@gmail.com",
      "contactPhone": "",
      "website": "http://www.drtabibzadeh.com/",
      "city": "Manhasset",
      "state": "NY",
      "country": "USA",
      "certifiedToPracticeIn": "New York",
      "lat": 40.786,
      "lng": -73.683
    }
  ]
}
```

If `lat`/`lng` come back `null` for everyone, the field-key guess for the Address field is wrong — check the actual field key in your CMS Collection's field list and adjust the function.

## 5. What the frontend already does with this data

- Renders the map with a teal dot per provider, clustering nearby pins into purple count-circles (verified working, including the cluster-count badge, in local testing)
- Live keyword search filtering by name, practice, location, and areas of expertise — updates both the map and results list as you type
- Each result is a collapsed row (name, practice, location, telehealth badge) that expands to show areas of expertise, contact info, website, and certified-to-practice-in states
- Loading, empty ("no providers are listed yet"), no-results, and fetch-error states are all handled

None of that needs to change — it's driven entirely by whatever the endpoint returns, so once the function is live with real data, the page just works.
