# Grenada Studio Theme Builder

This branch uses a reusable page-type system inspired by a visual theme builder: presentation is centralized, content is separate, and static pages are generated for Cloudflare Pages.

## Edit once, update every page of that type

- `theme/components.mjs` — global Header, Footer, CTA, cards and hero components.
- `theme/layouts.mjs` — global document shell and metadata.
- `theme/pages.mjs` — page-type templates: Services, Case Studies, archives and standard pages.
- `theme/data/services.mjs` — service content only.
- `theme/data/projects.mjs` — case-study content only.
- `theme/base.css` — design tokens, global layout contract and all page-type styling.
- `theme/site.js` — shared interactions, navigation, animation and contact-form behavior.
- `theme/home-main.html` — Home page content preserved from the approved design.

## Build

```bash
npm run build
npm run check
```

The build writes static HTML to the repository root (`/about/`, `/services/.../`, `/work/.../`, etc.) so the existing Cloudflare Pages project can continue serving the repo root without changing Production configuration.

## Typical changes

- Change every service-page hero: edit `serviceHero()` in `theme/components.mjs`.
- Add a CTA to every case study: edit `caseStudyPage()` in `theme/pages.mjs`.
- Change project-card design everywhere: edit `projectCard()` + its rules in `theme/base.css`.
- Add a new service/project: add one data object, then run the build.
