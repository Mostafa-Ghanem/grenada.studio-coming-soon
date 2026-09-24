import fs from "node:fs";
import path from "node:path";
import { services } from "../theme/data/services.mjs";
import { projects } from "../theme/data/projects.mjs";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const files = [
  "index.html", "about/index.html", "services/index.html", "work/index.html", "approach/index.html", "contact/index.html",
  ...services.map((s) => `services/${s.slug}/index.html`),
  ...projects.map((p) => `work/${p.slug}/index.html`)
];
files.push(...files.map((f) => `ar/${f}`));
let failed = false;
for (const rel of files) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) { console.error(`missing ${rel}`); failed = true; continue; }
  const html = fs.readFileSync(p, "utf8");
  const checks = [
    ["doctype", /^<!doctype html>/i.test(html)],
    ["main", /<main id="main">/.test(html)],
    ["single h1", (html.match(/<h1\b/g) || []).length === 1],
    ["shared css", /href="\/assets\/site(\.rtl)?\.css(\?v=\w+)?"/.test(html)],
    ["shared js", /src="\/assets\/site\.js(\?v=\w+)?"/.test(html)],
    ["viewport", /width=device-width/.test(html)]
  ];
  for (const [label, ok] of checks) if (!ok) { console.error(`${rel}: ${label} failed`); failed = true; }
}
for (const rel of files.filter((f) => f.startsWith("ar/"))) {
  const html = fs.readFileSync(path.join(root, rel), "utf8");
  if (!/<html lang="ar" dir="rtl">/.test(html)) { console.error(`${rel}: missing lang="ar" dir="rtl"`); failed = true; }
  if (!/href="\/assets\/site\.rtl\.css/.test(html)) { console.error(`${rel}: missing RTL stylesheet`); failed = true; }
  for (const [, href] of html.matchAll(/<a\b(?![^>]*class="gh-lang)[^>]*\shref="(\/[^"]*)"/g)) {
    if (!href.startsWith("/ar/")) { console.error(`${rel}: link leaves the Arabic site: ${href}`); failed = true; }
  }
}
const untranslated = JSON.parse(fs.readFileSync(path.join(root, "theme/untranslated.json"), "utf8"));
if (Object.keys(untranslated).length) { console.error(`untranslated Arabic strings: ${Object.keys(untranslated).join(" | ")}`); failed = true; }
// Every internal link must resolve to a generated page.
for (const rel of files) {
  const html = fs.readFileSync(path.join(root, rel), "utf8");
  for (const [, href] of html.matchAll(/<a\b[^>]*\shref="(\/(?!assets\/)[^"#?]*)/g)) {
    if (!fs.existsSync(path.join(root, href, "index.html"))) { console.error(`${rel}: broken link ${href}`); failed = true; }
  }
}
const homeHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const [label, re] of [["home stylesheet", /href="\/assets\/parallax\.css(\?v=\w+)?"/], ["home script", /src="\/assets\/parallax\.js(\?v=\w+)?"/], ["self-hosted gsap", /src="\/assets\/vendor\/gsap\.min\.js"/], ["self-hosted ScrollTrigger", /src="\/assets\/vendor\/ScrollTrigger\.min\.js"/]]) {
  if (!re.test(homeHtml)) { console.error(`index.html: ${label} missing`); failed = true; }
}
if (/noindex/.test(homeHtml)) { console.error("index.html must be indexable"); failed = true; }

// Every local asset referenced by a generated page must exist.
for (const rel of files) {
  const html = fs.readFileSync(path.join(root, rel), "utf8");
  for (const [, ref] of html.matchAll(/(?:src|href)="(\/assets\/[^"#?]+)"/g)) {
    if (!fs.existsSync(path.join(root, ref))) { console.error(`${rel}: missing asset ${ref}`); failed = true; }
  }
  for (const [, set] of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const ref of set.split(",").map((x) => x.trim().split(/\s+/)[0])) {
      if (ref.startsWith("/") && !fs.existsSync(path.join(root, ref))) { console.error(`${rel}: missing srcset asset ${ref}`); failed = true; }
    }
  }
}

const driftPairs = [["theme/parallax.js", "assets/parallax.js"], ["theme/parallax.css", "assets/parallax.css"], ["theme/base.css", "assets/site.css"], ["theme/site.js", "assets/site.js"], ["theme/work-filter.js", "assets/work-filter.js"]];
for (const [sourceRel, runtimeRel] of driftPairs) {
  if (!fs.readFileSync(path.join(root, sourceRel)).equals(fs.readFileSync(path.join(root, runtimeRel)))) {
    console.error(`source/runtime drift: ${sourceRel} != ${runtimeRel} (run npm run build)`);
    failed = true;
  }
}

const css = fs.readFileSync(path.join(root, "assets/site.css"), "utf8");
if (/transition\s*:\s*all\b/i.test(css)) { console.error("assets/site.css: transition: all found"); failed = true; }
if (/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/i.test(files.map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n'))) { console.error("zoom disabling viewport found"); failed = true; }
if (failed) process.exit(1);
console.log(`check passed: ${files.length} pages, ${services.length} services, ${projects.length} case studies`);
