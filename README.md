# Grenada Studio — Full Website 2026

Static, Cloudflare Pages-ready website built from the Grenada Studio 2026 company profile.

No build step on Cloudflare — the generated HTML is committed. Publish repo root.

## Editing

Edit sources in `theme/` (see THEME-BUILDER.md), then:

```bash
npm run build   # regenerates HTML + copies theme/*.css|js into assets/
npm run check   # structure, missing assets, source/runtime drift
```

- Home page: `theme/home-page.mjs` + `theme/parallax.css` / `theme/parallax.js` (GSAP, self-hosted in `assets/vendor/`).
- Partner wall: `theme/data/partners.mjs`.
- Photos: `assets/photos/` (Pexels licence, 2200w + 960w `-m` variants).
- Project images in `assets/*.webp` are Grenada's own campaign work.
