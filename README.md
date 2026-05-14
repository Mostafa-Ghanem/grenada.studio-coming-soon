# Grenada Studio — Coming Soon

Static site for Cloudflare Pages.

## Deploy via GitHub

1. Push **this folder's contents** (not the bundled file) to a GitHub repo.
2. Cloudflare Pages → Create project → Connect repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`  (or whichever folder you pushed)
4. Deploy.

## Files

- `index.html` — the page.
- `logo-red.png`, `logo-white.png` — the brand mark, transparent.
- `_worker.js` — optional Pages Function that handles `POST /api/subscribe`.
  - To enable, in the Pages dashboard add a **KV namespace binding** named
    `SUBSCRIBERS`. Optional env vars: `RESEND_API_KEY`, `FROM_ADDRESS`,
    `NOTIFY_ADDRESS` to forward signups by email.
  - Delete this file if you'd rather point the form at Formspree / another
    backend — just edit `ENDPOINT` near the bottom of `index.html`.

## Do NOT deploy the bundled file
The `Grenada Studio - Coming Soon.html` self-contained bundle is for offline /
Canva use. Deploying it to Pages can fail with a JSON unpack error because
GitHub may normalise line endings inside the embedded payload.
