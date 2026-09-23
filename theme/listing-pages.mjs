import { documentLayout } from "./layouts.mjs";
import { services, pillars, getService } from "./data/services.mjs";
import { projects } from "./data/projects.mjs";
import { pageHero, serviceHero, globalCTA, projectImg } from "./components.mjs";

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const img = (base, alt, sizes = "(max-width: 820px) 100vw, 33vw") =>
  `<img src="${base}.webp" srcset="${base}-m.webp 960w, ${base}.webp 2000w" sizes="${sizes}" alt="${alt}" width="1600" height="1000" loading="lazy" decoding="async">`;
const projectsFor = (slug) => projects.filter((p) => p.serviceSlugs.includes(slug));

// Flagship case studies shown first on /work/.
const FEATURED = ["shorfat-al-haram", "dream-land", "khairat-taibah", "nukhbat-al-taif", "osoul-makkah", "ajyad-makkah"];

function workCard(p) {
  const fact = p.facts?.[0];
  return `<a class="wk-card" href="/work/${p.slug}/" data-services="${p.serviceSlugs.join(" ")}">
    <div class="wk-media">${projectImg(p, { sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" })}${fact ? `<span class="wk-fact"><b>${fact[0]}</b> ${fact[1]}</span>` : ""}</div>
    <div class="wk-meta"><span>${p.location}</span>${p.titleAr ? `<span lang="ar" dir="rtl">${p.titleAr}</span>` : ""}</div>
    <h3>${p.title}</h3>
    <ul class="wk-tags">${p.serviceSlugs.slice(0, 3).map((s) => `<li>${getService(s)?.title ?? s}</li>`).join("")}${p.serviceSlugs.length > 3 ? `<li>+${p.serviceSlugs.length - 3}</li>` : ""}</ul>
  </a>`;
}

function serviceTile(s) {
  const n = projectsFor(s.slug).length;
  return `<a class="sv-tile" href="/services/${s.slug}/" data-reveal>
    <div class="sv-media">${img(s.image, "", "(max-width: 820px) 100vw, 40vw")}<span class="sv-num">${s.number}</span></div>
    <div class="sv-body"><div><h3>${s.title}</h3><p lang="ar" dir="rtl" class="sv-ar">${s.titleAr}</p></div><p>${s.summary}</p>
    <div class="sv-foot"><span>${n ? `${n} project${n > 1 ? "s" : ""} on this site` : "Available as a standalone service"}</span><b aria-hidden="true">↗</b></div></div>
  </a>`;
}

export function servicesIndexPage() {
  const hero = pageHero({
    kicker: "Services / 01—10",
    title: "Ten services. <em>Four ways we move a project.</em>",
    summary: "From naming and identity to drone shoots, paid media and the final report, every service can run on its own or as part of one launch team.",
    breadcrumbItems: [{ label: "Services", href: "/services/" }],
    modifier: "services-index-hero"
  });
  const nav = `<nav class="sv-pillnav shell" aria-label="Service groups">${pillars.map((p, i) => `<a href="#${p.key}"><span>0${i + 1}</span>${p.title}</a>`).join("")}</nav>`;
  const groups = pillars.map((p, i) => `<section class="section sv-group" id="${p.key}" aria-labelledby="sv-${p.key}"><div class="shell">
    <div class="sv-group-head" data-reveal><span class="sv-group-num">0${i + 1}</span><div><h2 id="sv-${p.key}">${p.title}</h2><p lang="ar" dir="rtl">${p.titleAr}</p></div><p class="sv-group-copy">${p.copy}</p></div>
    <div class="sv-grid sv-grid--${p.slugs.length > 2 ? "many" : "pair"}">${p.slugs.map((slug) => serviceTile(getService(slug))).join("")}</div>
  </div></section>`).join("");
  return documentLayout({
    title: "Services", active: "services", path: "/services/",
    description: "Grenada Studio services: brand identity, content, outdoor and social design, motion, social media, web, SEO, paid media, performance marketing and media production for real estate.",
    content: hero + nav + groups + globalCTA({ kicker: "Build the right scope", title: "Pick one service, or <em>the whole launch.</em>", text: "Tell us about the asset and the timeline. We will propose the right mix.", button: "Discuss your project" })
  });
}

export function servicePage(slug) {
  const service = getService(slug);
  const list = projectsFor(slug);
  const pillar = pillars.find((p) => p.key === service.pillar);
  const siblings = pillar.slugs.filter((s) => s !== slug).map(getService);
  const hero = serviceHero(service);
  const intro = `<section class="section sv-intro"><div class="shell sv-intro-grid">
    <figure class="sv-intro-media" data-reveal>${img(service.image, `${service.title} — Grenada Studio`, "(max-width: 820px) 100vw, 50vw")}</figure>
    <div data-reveal><div class="kicker">${pillar.title} · <span lang="ar">${service.titleAr}</span></div><p class="sv-intro-text">${service.intro}</p>
    <ol class="sv-caps">${service.capabilities.map((c, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span>${c}</li>`).join("")}</ol></div>
  </div></section>`;
  const work = list.length ? `<section class="section sv-work"><div class="shell">
    <div class="section-head"><div><div class="kicker">In the work</div><h2 class="section-title">${list.length} project${list.length > 1 ? "s" : ""} used this service.</h2></div><a class="btn btn-ghost" href="/work/#${slug}">See them all ${arrow}</a></div>
    <div class="wk-grid">${list.slice(0, 6).map(workCard).join("")}</div>
  </div></section>` : "";
  const more = siblings.length ? `<section class="section sv-more"><div class="shell"><div class="section-head"><div><div class="kicker">Also in ${pillar.title}</div><h2 class="section-title">Pairs well with.</h2></div></div><div class="sv-grid sv-grid--pair">${siblings.map(serviceTile).join("")}</div></div></section>` : "";
  return documentLayout({
    title: service.title, description: service.summary, active: "services", path: `/services/${slug}/`, bodyClass: "service-page",
    content: hero + intro + work + more + globalCTA({ kicker: `Service / ${service.number}`, title: `Need ${service.title.toLowerCase()} for a <em>real project?</em>`, text: "Build the scope around the asset, launch stage and channels that matter.", button: "Start the conversation" })
  });
}

export function workIndexPage() {
  const hero = pageHero({
    kicker: "Work",
    title: "Real projects. <em>Real auctions.</em>",
    summary: "Plots, auctions and destination projects across Saudi Arabia, filmed, designed and launched by Grenada. Filter by the service you need to see it in the field.",
    breadcrumbItems: [{ label: "Work", href: "/work/" }],
    visual: `<div class="page-media-frame">${projectImg(projects[0], { eager: true, sizes: "(max-width: 820px) 100vw, 45vw" })}<span>Shorfat Al Haram / Makkah</span></div>`,
    modifier: "work-index-hero"
  });
  const featured = FEATURED.map((s) => projects.find((p) => p.slug === s)).filter(Boolean);
  const rest = projects.filter((p) => !FEATURED.includes(p.slug)).sort((a, b) => (a.slug === "malqa-taif") - (b.slug === "malqa-taif"));
  const counts = Object.fromEntries(services.map((s) => [s.slug, projectsFor(s.slug).length]));
  const select = `<label class="wk-select"><span>Filter by service</span><select aria-label="Filter projects by service"><option value="all">All projects (${projects.length})</option>${pillars.map((pl) => `<optgroup label="${pl.title}">${pl.slugs.filter((s) => counts[s]).map((s) => `<option value="${s}">${getService(s).title} (${counts[s]})</option>`).join("")}</optgroup>`).join("")}</select></label>`;
  const filters = select + `<div class="wk-filters" role="toolbar" aria-label="Filter projects by service">
    <button type="button" class="is-on" data-filter="all" aria-pressed="true">All <sup>${projects.length}</sup></button>
    ${pillars.map((pl) => `<span class="wk-filter-group" aria-hidden="true">${pl.title}</span>${pl.slugs.filter((s) => counts[s]).map((s) => `<button type="button" data-filter="${s}" aria-pressed="false">${getService(s).title} <sup>${counts[s]}</sup></button>`).join("")}`).join("")}
  </div>`;
  const body = `<section class="section wk-section" id="projects"><div class="shell">
    ${filters}
    <p class="wk-status" role="status" aria-live="polite"></p>
    <h2 class="wk-heading" data-group="featured">Flagship case studies</h2>
    <div class="wk-grid wk-grid--featured">${featured.map(workCard).join("")}</div>
    <h2 class="wk-heading" data-group="archive">Auction campaigns</h2>
    <div class="wk-grid">${rest.map(workCard).join("")}</div>
  </div></section>`;
  return documentLayout({
    title: "Work", active: "work", path: "/work/",
    description: "Grenada Studio real estate marketing and auction campaign case studies, filterable by service.",
    content: hero + body + globalCTA({ kicker: "Next case study", title: "Make the next launch <em>worth showing.</em>", text: "Bring Grenada in early enough to connect the story, campaign system and execution.", button: "Discuss a project" }),
    extraScripts: `<script src="/assets/work-filter.js" defer></script>`
  });
}
