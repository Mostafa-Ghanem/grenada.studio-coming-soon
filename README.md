# Grenada Studio — Website

Static site for [grenadastudio.com](https://grenadastudio.com), hosted on Cloudflare Pages. No build step.

## Structure

```
index.html        Main one-page site (hero, services, work, process, studio, contact)
404.html          Not-found page (served automatically by Cloudflare Pages)
assets/           styles.css, main.js, logos
_headers          Security + cache headers (Cloudflare Pages)
robots.txt, sitemap.xml
```

## Local preview

```
python3 -m http.server 8000
```

## Deploy

Cloudflare Pages → connect this repo:
- **Framework preset:** None
- **Build command:** *(empty)*
- **Build output directory:** `/`
- **Production branch:** `main`

Every other branch gets its own preview URL automatically.

## Workflow

1. Branch off `main` for each change.
2. Push → check the Cloudflare preview URL.
3. Open a PR → merge to `main` → production deploy.

## Contact form

Submissions POST to a Google Apps Script web app (`ENDPOINT` in `assets/main.js`) that writes to a Google Sheet.
The script must read the extra fields (`name`, `company`, `service`, `message`) — the old coming-soon form only sent `email`.

## To do

- Replace the three placeholder case studies in `#work` with real projects (images go in `assets/`).
