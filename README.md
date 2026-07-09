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

- `index.html` — the coming-soon page. Email signups POST to your Google
  Apps Script web app (Google Sheet).
- `careers/` — the hiring section:
    - `index.html` — jobs listing with the open-role cards.
    - one page per role (e.g. `senior-video-editor.html`) with an apply form.
    - `careers.css`, `careers.js` — shared styles + behaviour. Applications
      POST to the same Google Sheet (rows tagged Type = application).
- `logo-red.png`, `logo-white.png` — the brand mark, transparent.
- `google-apps-script.gs` — paste this into your Sheet's Apps Script
  (Extensions → Apps Script) so both signups and applications write as rows.
  Applications now include a **CV upload**: the file is saved to a Google Drive
  folder ("Grenada Studio — CVs") and the link goes in the sheet's **CV** column.
  See the comments at the top of that file for the setup.
  - **Important:** after adding the CV feature you must **re-deploy** the Apps
    Script and **re-authorize** it when prompted (it now needs Drive access).
  - CVs stay private by default; set `SHARE_CV = true` in the script to make the
    links openable by anyone who has them.

### Editing jobs
- Add a role: copy one of the `careers/*.html` role pages, rename it, edit the
  title / description / lists and the `data-role` on the `<form>`, then add a
  matching `<a class="job-card">` to `careers/index.html`.
- All applications land in the same sheet; the **Role** column tells them apart.

## Do NOT deploy the bundled file
The `Grenada Studio - Coming Soon.html` self-contained bundle is for offline /
Canva use. Deploying it to Pages can fail with a JSON unpack error because
GitHub may normalise line endings inside the embedded payload.
