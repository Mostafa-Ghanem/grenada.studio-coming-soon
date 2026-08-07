import { site } from "./data/site.mjs";
import { header, footer, decorations } from "./components.mjs";

function esc(value = "") {
  return String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
}

export function documentLayout({ title, description = site.description, active = "", content, path = "/", intro = false, bodyClass = "" }) {
  const fullTitle = title === site.name ? `${site.name} — Real Estate Marketing & Creative Agency` : `${title} — ${site.name}`;
  const canonical = `https://grenadastudio.com${path}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="theme-color" content="#150707" />
  <meta property="og:title" content="${esc(fullTitle)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="${canonical}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@300;400;500;600&display=swap" />
  <link rel="stylesheet" href="/assets/site.css" />
</head>
<body class="${bodyClass}">
  ${decorations({ intro })}
  <div class="site">
    ${header(active)}
    <main id="main">${content}</main>
    ${footer()}
  </div>
  <script src="/assets/site.js" defer></script>
</body>
</html>`;
}
