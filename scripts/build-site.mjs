import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { services } from "../theme/data/services.mjs";
import { projects } from "../theme/data/projects.mjs";
import { servicesIndexPage, servicePage, workIndexPage } from "../theme/listing-pages.mjs";
import { aboutPage, caseStudyPage, approachPage, contactPage, notFoundPage } from "../theme/pages.mjs";
import { homePage } from "../theme/home-page.mjs";
import { i18n } from "../theme/i18n.mjs";
import { translateHtml } from "../theme/i18n-ar.mjs";
import rtlcss from "rtlcss";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const sleepSync = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
const write = (p, value) => {
  const target = path.join(root, p);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const expected = Buffer.byteLength(value);
  let size = -1;
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const fd = fs.openSync(target, "w");
    try {
      fs.writeFileSync(fd, value);
      fs.fsyncSync(fd);
    } finally {
      fs.closeSync(fd);
    }
    for (let verify = 0; verify < 8; verify += 1) {
      try {
        size = fs.statSync(target).size;
        if (size === expected && size > 0) break;
      } catch (error) {
        if (error?.code !== "ENOENT") throw error;
      }
      sleepSync(25 + verify * 15);
    }
    if (size === expected && size > 0) break;
    sleepSync(60 * attempt);
    if (attempt === 5) throw new Error(`Generated file size mismatch: ${p} expected=${expected} actual=${size}`);
  }
  console.log(`generated ${p} (${size} byter)`);
};

const pages = () => [
  ["index.html", homePage()],
  ["about/index.html", aboutPage()],
  ["services/index.html", servicesIndexPage()],
  ...services.map((service) => [`services/${service.slug}/index.html`, servicePage(service.slug)]),
  ["work/index.html", workIndexPage()],
  ...projects.map((project) => [`work/${project.slug}/index.html`, caseStudyPage(project.slug)]),
  ["approach/index.html", approachPage()],
  ["contact/index.html", contactPage()],
  ["404.html", notFoundPage()]
];

// House style: no full stop at the end of a line of copy (headings, paragraphs, labels).
// A "." that closes a text run (followed by a closing tag or <br>) is dropped; decimals, "..." and "Co." stay.
const stripStops = (html) => {
  const keep = [];
  html = html.replace(/<(script|style|title)\b[\s\S]*?<\/\1>/g, (m) => `<!--s${keep.push(m) - 1}-->`);
  html = html.replace(/(>[^<>]*?[^\d\s.<>])\.(\s*)(?=<\/(?!a>)|<br|<em|<span)/g, (m, a, ws, off, all) => (/\bCo$/.test(a) ? m : a + (/^\s*<(em|span class="hw")/.test(all.slice(off + m.length, off + m.length + 30)) && /<h[1-3]|<h[1-3][^>]*>[^]*$/.test(all.slice(Math.max(0, off - 400), off)) && !/<\/h[1-3]>/.test(all.slice(Math.max(0, off - 400), off).split(/<h[1-3]/).pop()) ? "<br>" : ws)));
  return html.replace(/<!--s(\d+)-->/g, (m, i) => keep[i]);
};

i18n.lang = "en";
for (const [file, html] of pages()) write(file, stripStops(html));

// Arabic (Saudi) edition under /ar/: same templates, translated copy, RTL stylesheet.
i18n.lang = "ar";
const untranslated = new Map();
for (const [file, html] of pages()) {
  const { html: ar, misses } = translateHtml(html);
  for (const m of misses) untranslated.set(m, file);
  write(`ar/${file}`, stripStops(ar).replace(/↗/g, "↖").replace(/(<a\b(?![^>]*class="gh-lang)[^>]*\shref=")\/(?!assets\/|ar\/)/g, "$1/ar/"));
}
i18n.lang = "en";
write("theme/untranslated.json", JSON.stringify(Object.fromEntries(untranslated), null, 2) + "\n");
if (untranslated.size) console.warn(`\n${untranslated.size} untranslated strings — see theme/untranslated.json`);

write("assets/site.css", read("theme/base.css"));
write("assets/site.js", read("theme/site.js"));
write("assets/parallax.css", read("theme/parallax.css"));
write("assets/site.rtl.css", rtlcss.process(read("theme/base.css")) + "\n" + read("theme/rtl.css"));
write("assets/parallax.rtl.css", rtlcss.process(read("theme/parallax.css")));
write("assets/parallax.js", read("theme/parallax.js"));
write("assets/work-filter.js", read("theme/work-filter.js"));
write("assets/campaign-system.json", read("theme/campaign-system.json"));

const routes = [
  "/", "/about/", "/services/", ...services.map((s) => `/services/${s.slug}/`),
  "/work/", ...projects.map((p) => `/work/${p.slug}/`), "/approach/", "/contact/"
];
const indexableRoutes = [...routes, ...routes.map((r) => `/ar${r}`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexableRoutes.map((route) => `  <url><loc>https://grenadastudio.com${route}</loc></url>`).join("\n")}\n</urlset>\n`;
write("sitemap.xml", sitemap);
write("robots.txt", "User-agent: *\nAllow: /\nSitemap: https://grenadastudio.com/sitemap.xml\n");

const manifest = { generatedAt: new Date().toISOString(), routes };
write("theme/generated-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nGrenada Theme Builder: ${routes.length} public routes generated.`);
