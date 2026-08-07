import fs from "node:fs";
import path from "node:path";
import { services } from "../theme/data/services.mjs";
import { projects } from "../theme/data/projects.mjs";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const files = [
  "index.html", "home-parallax/index.html", "about/index.html", "services/index.html", "work/index.html", "approach/index.html", "contact/index.html",
  ...services.map((s) => `services/${s.slug}/index.html`),
  ...projects.map((p) => `work/${p.slug}/index.html`)
];
let failed = false;
for (const rel of files) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) { console.error(`missing ${rel}`); failed = true; continue; }
  const html = fs.readFileSync(p, "utf8");
  const checks = [
    ["doctype", /^<!doctype html>/i.test(html)],
    ["main", /<main id="main">/.test(html)],
    ["single h1", (html.match(/<h1\b/g) || []).length === 1],
    ["shared css", /href="\/assets\/site\.css"/.test(html)],
    ["shared js", /src="\/assets\/site\.js"/.test(html)],
    ["viewport", /width=device-width/.test(html)]
  ];
  for (const [label, ok] of checks) if (!ok) { console.error(`${rel}: ${label} failed`); failed = true; }
}
const parallaxHtml = fs.readFileSync(path.join(root, "home-parallax/index.html"), "utf8");
if (!/href="\/assets\/parallax\.css"/.test(parallaxHtml)) { console.error("parallax stylesheet missing"); failed = true; }
if (!/src="\/assets\/parallax\.js"/.test(parallaxHtml)) { console.error("parallax script missing"); failed = true; }
if (!/ScrollTrigger\.min\.js/.test(parallaxHtml)) { console.error("ScrollTrigger dependency missing"); failed = true; }
if (!/name="robots" content="noindex,nofollow"/.test(parallaxHtml)) { console.error("experimental page must stay noindex"); failed = true; }
const css = fs.readFileSync(path.join(root, "assets/site.css"), "utf8");
if (/transition\s*:\s*all\b/i.test(css)) { console.error("assets/site.css: transition: all found"); failed = true; }
if (/user-scalable\s*=\s*no|maximum-scale\s*=\s*1/i.test(files.map(f=>fs.readFileSync(path.join(root,f),'utf8')).join('\n'))) { console.error("zoom disabling viewport found"); failed = true; }
if (failed) process.exit(1);
console.log(`check passed: ${files.length} pages, ${services.length} services, ${projects.length} case studies`);
