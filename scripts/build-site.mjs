import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { services } from "../theme/data/services.mjs";
import { projects } from "../theme/data/projects.mjs";
import { homePage, aboutPage, servicesIndexPage, servicePage, workIndexPage, caseStudyPage, approachPage, contactPage, notFoundPage } from "../theme/pages.mjs";
import { parallaxHomePage } from "../theme/parallax-page.mjs";

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
  console.log(`generated ${p} (${size} bytes)`);
};

const homeMain = read("theme/home-main.html");
write("index.html", homePage(homeMain));
write("home-parallax/index.html", parallaxHomePage());
write("about/index.html", aboutPage());
write("services/index.html", servicesIndexPage());
for (const service of services) write(`services/${service.slug}/index.html`, servicePage(service.slug));
write("work/index.html", workIndexPage());
for (const project of projects) write(`work/${project.slug}/index.html`, caseStudyPage(project.slug));
write("approach/index.html", approachPage());
write("contact/index.html", contactPage());
write("404.html", notFoundPage());
write("assets/site.css", read("theme/base.css"));
write("assets/site.js", read("theme/site.js"));
write("assets/parallax.css", read("theme/parallax.css"));
write("assets/parallax.js", read("theme/parallax.js"));

const routes = [
  "/", "/home-parallax/", "/about/", "/services/", ...services.map((s) => `/services/${s.slug}/`),
  "/work/", ...projects.map((p) => `/work/${p.slug}/`), "/approach/", "/contact/"
];
const indexableRoutes = routes.filter((route) => route !== "/home-parallax/");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexableRoutes.map((route) => `  <url><loc>https://grenadastudio.com${route}</loc></url>`).join("\n")}\n</urlset>\n`;
write("sitemap.xml", sitemap);
write("robots.txt", "User-agent: *\nAllow: /\nSitemap: https://grenadastudio.com/sitemap.xml\n");

const manifest = { generatedAt: new Date().toISOString(), routes };
write("theme/generated-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nGrenada Theme Builder: ${routes.length} public routes generated.`);
