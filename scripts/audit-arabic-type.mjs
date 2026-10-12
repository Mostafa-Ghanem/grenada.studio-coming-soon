// Arabic typography audit: lists visible text below 14px or in a non-approved family on every /ar/ route.
import fs from "node:fs";
const { chromium } = await import(process.env.PW || "playwright");
const manifest = JSON.parse(fs.readFileSync(new URL("../theme/generated-manifest.json", import.meta.url)));
const routes = (manifest.routes || manifest.pages || manifest).filter?.((r) => typeof r === "string") ?? [];
const arRoutes = (routes.length ? routes : ["/"]).map((r) => "/ar" + (r === "/" ? "/" : r)).filter((r) => !r.includes("404"));
const widths = (process.env.WIDTHS || "390,820,1440").split(",").map(Number);
const MIN = 14, OK = /^"?(IBM Plex Sans Arabic)"?$/;
const b = await chromium.launch();
const issues = new Map();
for (const w of widths) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  for (const r of arRoutes) {
    await p.goto("http://localhost:8765" + r, { waitUntil: "domcontentloaded" });
    const found = await p.evaluate(({ MIN }) => {
      const out = [];
      for (const el of document.querySelectorAll("body *")) {
        if (!el.offsetParent && getComputedStyle(el).position !== "fixed") continue;
        if (el.closest("[aria-hidden=true],.intro,script,style,svg,.gh-mega,.gh-overlay")) continue;
        const own = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim()).map((n) => n.textContent.trim()).join(" ");
        if (!own) continue;
        const cs = getComputedStyle(el); const size = parseFloat(cs.fontSize);
        const fam = cs.fontFamily.split(",")[0].trim();
        const en = !!el.closest('[lang="en"]') || !/[؀-ۿ]/.test(own) && /[A-Za-z]/.test(own);
        const sel = el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : "") + " < " + (el.parentElement?.className || el.parentElement?.tagName || "").toString().split(/\s+/)[0];
        out.push({ sel, size, fam, en, text: own.slice(0, 40) });
      }
      return out;
    }, { MIN });
    for (const f of found) {
      const bad = [];
      if (f.size < MIN) bad.push(`${f.size}px`);
      if (!f.en && !OK.test(f.fam)) bad.push(f.fam);
      if (!bad.length) continue;
      const k = f.sel + " :: " + bad.join(" ");
      if (!issues.has(k)) issues.set(k, { w, r, text: f.text, n: 0 });
      issues.get(k).n++;
    }
  }
  await p.close();
}
await b.close();
for (const [k, v] of [...issues].sort()) console.log(`${k}   [${v.w} ${v.r} ×${v.n}] "${v.text}"`);
console.log(`\n${issues.size} issue groups across ${arRoutes.length} routes × ${widths.length} widths`);
