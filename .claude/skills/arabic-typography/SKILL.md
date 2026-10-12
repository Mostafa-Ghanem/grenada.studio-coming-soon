---
name: arabic-typography
description: Rules for Arabic (RTL) web typography on the Grenada Studio site — one font family, a fluid type scale with readable minimums, numerals, line-height and bidi. Use before changing any font, size or text style in the Arabic edition (/ar/), and to audit Arabic pages.
---

# Arabic web typography — Grenada Studio

## 1. One family, many weights
- The Arabic edition uses a **single family: IBM Plex Sans Arabic** (300/400/500/600/700) for headings, body, numbers, labels and buttons. Mixing a Kufi display face with a Naskh/Grotesk body makes numbers and labels in the same block look like two different sites.
- Hierarchy comes from **size and weight**, never from switching family. Headings 700, sub-heads 600, UI/labels 500, body 400.
- Latin brand names inside Arabic text keep `lang="en"` and render in the Latin UI face (Space Grotesk) at the same size.

## 2. Fluid scale with hard minimums
All sizes are `clamp(min, fluid, max)` so text grows and shrinks with the viewport. Arabic needs ~10–15% more size than Latin for the same legibility (smaller x-height, dots and marks).

| Token | Use | Size |
|---|---|---|
| `--ar-xs` | kickers, meta, chips, captions, `dd`, breadcrumbs | `clamp(14px, .2vw + 12.5px, 16px)` |
| `--ar-sm` | secondary text, card text, nav, buttons | `clamp(15px, .3vw + 13px, 18px)` |
| `--ar-body` | paragraphs | `clamp(17px, .4vw + 13.5px, 20px)` |
| `--ar-lead` | intro / hero paragraphs | `clamp(19px, .6vw + 14px, 24px)` |
| `--ar-h3` | card and step titles | `clamp(22px, 1vw + 15px, 32px)` |
| `--ar-h2` | section titles | `clamp(30px, 2.6vw + 16px, 60px)` |
| `--ar-h1` | page heroes | `clamp(36px, 4vw + 14px, 88px)` |
| `--ar-num` | big statistics | `clamp(40px, 3.6vw + 18px, 96px)` |

**Nothing in the Arabic edition renders below 14px.** Audit with the script in §6.

## 3. Line-height and spacing
- Body 1.8–1.9; headings 1.3–1.4 (Arabic ascenders/descenders and dots clip at Latin values like .9).
- `letter-spacing: 0` always — tracking breaks letter joining. No `text-transform`, no italics (use colour or weight for emphasis).
- Measure: 45–70 characters per line (`max-width: 60ch` for body).

## 4. Numbers and mixed direction
- Use Western digits (0–9) consistently, rendered in the same Arabic family so `914` and `مليون` match.
- Wrap numeric phrases that mix symbols (`+1.3`, `~2`) in a bidi isolate; keep stat numbers `direction: ltr; unicode-bidi: isolate` and align them to the start side.

## 5. Weight availability
Load only the weights used (`IBM+Plex+Sans+Arabic:wght@300;400;500;600;700`) with `display=swap`; never let the browser synthesise bold.

## 6. Audit
Run `node scripts/audit-arabic-type.mjs` (local server on :8765). It visits every `/ar/` route at 390/820/1440 and lists any visible text below 14px or rendered in a family other than IBM Plex Sans Arabic / the Latin `lang="en"` face. The build is acceptable only when the audit is empty.
