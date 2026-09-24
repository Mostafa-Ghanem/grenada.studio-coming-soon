import { site } from "./data/site.mjs";
import { header, footer, decorations } from "./components.mjs";
import { i18n, L } from "./i18n.mjs";
import fs from "node:fs";
import crypto from "node:crypto";

// Cache-busting version for the shared CSS/JS (Cloudflare caches /assets for a week).
const themeDir = new URL(".", import.meta.url);
const V = crypto.createHash("sha1")
  .update(["base.css", "rtl.css", "site.js", "parallax.css", "parallax.js", "work-filter.js"].map((f) => fs.readFileSync(new URL(f, themeDir))).join(""))
  .digest("hex").slice(0, 8);

function esc(value = "") {
  return String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
}

export function documentLayout({ title, description = site.description, active = "", content, path = "/", intro = false, bodyClass = "", extraHead = "", extraScripts = "" }) {
  const fullTitle = title === site.name ? `${site.name} — Real Estate Marketing & Creative Agency` : `${title} — ${site.name}`;
  const ar = i18n.lang === "ar";
  const enPath = path, arPath = `/ar${path}`;
  const canonical = `https://grenadastudio.com${ar ? arPath : enPath}`;
  const headExtras = extraHead ? `\n  ${extraHead}` : "";
  const scriptExtras = extraScripts ? `\n  ${extraScripts}` : "";
  return `<!doctype html>
<html lang="${L("en", "ar")}"${ar ? ' dir="rtl"' : ""}>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="theme-color" content="#150707" />
  <meta property="og:title" content="${esc(fullTitle)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="${L("en_US", "ar_SA")}" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="en" href="https://grenadastudio.com${enPath}" />
  <link rel="alternate" hreflang="ar-SA" href="https://grenadastudio.com${arPath}" />
  <link rel="alternate" hreflang="x-default" href="https://grenadastudio.com${enPath}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Noto+Kufi+Arabic:wght@400;500;600&${ar ? "family=IBM+Plex+Sans+Arabic:wght@300;400;500;600&" : ""}family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@300;400;500;600&display=swap" />
  <link rel="stylesheet" href="/assets/site${ar ? ".rtl" : ""}.css" />${headExtras}
</head>
<body class="${bodyClass}">
  ${decorations({ intro })}
  <div class="site">
    ${header(active)}
    <main id="main">${content}</main>
    ${footer()}
  </div>
  <script src="/assets/site.js" defer></script>${scriptExtras}
</body>
</html>`.replace(/%%ALT_PATH%%/g, ar ? enPath : arPath)
    .replace(/(\/assets\/(?:site|site\.rtl|parallax|parallax\.rtl|work-filter)\.(?:css|js))"/g, `$1?v=${V}"`);
}
