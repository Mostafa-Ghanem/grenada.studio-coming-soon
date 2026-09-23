import { site } from "./data/site.mjs";
import { partners } from "./data/partners.mjs";
import { pillars, getService } from "./data/services.mjs";
import { getProject } from "./data/projects.mjs";

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

const soundIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"></path><path class="sound-wave" d="M15 9.5a4 4 0 0 1 0 5"></path><path class="sound-wave" d="M18 7a8 8 0 0 1 0 10"></path><path class="sound-off" d="M16 9l5 6"></path><path class="sound-off" d="M21 9l-5 6"></path></svg>`;
const social = [["Instagram", site.social.instagram], ["Behance", site.social.behance], ["LinkedIn", site.social.linkedin]];

export function header(active = "") {
  const link = (item) => `<a href="${item.href}"${item.key === active ? ' aria-current="page"' : ""} data-snd>${item.label}</a>`;
  const servicesMenu = pillars.map((p) => `<div class="gh-mega-col"><span class="gh-mega-kicker">${p.title}</span>${p.slugs.map((slug) => { const s = getService(slug); return `<a href="/services/${slug}/"><b>${s.title}</b><small lang="ar">${s.titleAr}</small></a>`; }).join("")}</div>`).join("");
  const desktop = site.nav.map((item) => item.key === "services"
    ? `<div class="gh-has-mega">${link(item).replace("<a ", '<a aria-haspopup="true" ')}<div class="gh-mega" role="group" aria-label="Services"><div class="gh-mega-inner">${servicesMenu}<a class="gh-mega-all" href="/services/">All 10 services <span aria-hidden="true">↗</span></a></div></div></div>`
    : link(item)).join("");
  const mobile = site.nav.map((item, i) => {
    const a = `<a href="${item.href}"${item.key === active ? ' aria-current="page"' : ""}><span>0${i + 1}</span>${item.label}</a>`;
    if (item.key !== "services") return `<div class="gh-m-item" style="--i:${i}">${a}</div>`;
    return `<div class="gh-m-item" style="--i:${i}"><div class="gh-m-row">${a}<button type="button" class="gh-m-toggle" aria-expanded="false" aria-controls="ghMobileServices" aria-label="Show services"><i></i></button></div><div class="gh-m-sub" id="ghMobileServices">${pillars.map((p) => `<a href="/services/#${p.key}">${p.title}</a>`).join("")}<a href="/services/">All services ↗</a></div></div>`;
  }).join("");
  return `<header id="siteHeader" class="gh">
    <div class="shell gh-bar">
      <a class="gh-brand" href="/" aria-label="Grenada Studio home"><img src="/assets/grenada-mark.svg" alt="" width="30" height="32" /><span><b>Grenada</b> <em>Studio</em></span></a>
      <nav class="gh-nav" aria-label="Primary navigation">${desktop}</nav>
      <div class="gh-actions">
        <button class="gh-icon" id="soundToggle" type="button" aria-pressed="false" aria-label="Toggle interface sounds" title="Sound off">${soundIcon}</button>
        <a class="gh-cta" href="/contact/" data-snd>Start a project <span aria-hidden="true">↗</span></a>
        <button class="gh-icon gh-burger" id="menuToggle" type="button" aria-expanded="false" aria-controls="mobileMenu" aria-label="Open navigation"><i></i><i></i></button>
      </div>
    </div>
    <div class="gh-overlay" id="mobileMenu" aria-label="Mobile navigation">
      <nav class="shell gh-overlay-nav">${mobile}</nav>
      <div class="shell gh-overlay-foot">
        <a class="btn btn-primary" href="/contact/">Start a project ↗</a>
        <a href="mailto:${site.email}">${site.email}</a>
        <div class="gh-overlay-social">${social.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener">${n}</a>`).join("")}</div>
      </div>
    </div>
  </header>`;
}

export function footer() {
  const featured = ["shorfat-al-haram", "dream-land", "khairat-taibah", "nukhbat-al-taif"];
  const year = new Date().getFullYear();
  return `<footer class="gf">
    <div class="shell">
      <div class="gf-cols">
        <div class="gf-col gf-about"><a class="gh-brand" href="/" aria-label="Grenada Studio home"><img src="/assets/grenada-mark.svg" alt="" width="30" height="32" loading="lazy" /><span><b>Grenada</b> Studio</span></a><p>Integrated marketing for real estate, auctions and launches, across Saudi Arabia and Egypt for more than ten years.</p><a class="btn btn-primary gf-btn" href="/contact/" data-snd>Start a project ↗</a></div>
        <nav class="gf-col" aria-label="Services"><h3>Services</h3>${pillars.map((p) => `<a href="/services/#${p.key}">${p.title}</a>`).join("")}<a href="/services/">All services</a></nav>
        <nav class="gf-col" aria-label="Work"><h3>Work</h3>${featured.map(getProject).filter(Boolean).map((p) => `<a href="/work/${p.slug}/">${p.title}</a>`).join("")}<a href="/work/">All projects</a></nav>
        <nav class="gf-col" aria-label="Studio"><h3>Studio</h3>${site.nav.filter((n) => !["services", "work"].includes(n.key)).map((n) => `<a href="${n.href}">${n.label}</a>`).join("")}</nav>
        <div class="gf-col"><h3>Contact</h3><a href="mailto:${site.email}">${site.email}</a><address>${site.address}</address><div class="gf-social">${social.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener" aria-label="${n}">${n}</a>`).join("")}</div></div>
      </div>
      <div class="gf-bottom"><span>© ${year} Grenada Studio. All rights reserved.</span><span>Real estate marketing · KSA &amp; Egypt</span><a href="#top" class="gf-top" aria-label="Back to top">Back to top ↑</a></div>
    </div>
  </footer>`;
}

export function decorations({ intro = false } = {}) {
  return `<a class="skip" href="#main">Skip to content</a>
  <div class="spotlight" aria-hidden="true"></div><div class="grid" aria-hidden="true"></div><canvas id="particles" aria-hidden="true"></canvas><div class="vignette" aria-hidden="true"></div><div class="noise" aria-hidden="true"></div>
  ${intro ? `<div class="intro" id="intro" aria-hidden="true"><div class="intro-core"><img class="intro-mark" src="/assets/grenada-mark.svg" alt="" width="121" height="130"><div class="intro-line"></div></div></div>` : ""}`;
}

// Project image with a mobile variant when one exists.
export function projectImg(project, { sizes = "100vw", eager = false, alt = project.alt } = {}) {
  const set = project.imageM ? ` srcset="${project.imageM} 960w, ${project.image} 2000w" sizes="${sizes}"` : "";
  return `<img src="${project.image}"${set} alt="${alt}" width="1600" height="900"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;
}

// Typographic partner wall: two counter-scrolling rows of partner names (Arabic + English).
export function partnerWall({ title = `Chosen by teams with <em>serious assets at stake.</em>`, headingId = "partners-title" } = {}) {
  const half = Math.ceil(partners.length / 2);
  const row = (items, dir) => {
    const cells = items.map((p) => `<li class="pw-item"><span class="pw-ar" lang="ar" dir="rtl">${p.ar}</span><span class="pw-en">${p.en}</span></li>`).join("");
    return `<div class="pw-row pw-${dir}"><ul class="pw-track">${cells}</ul><ul class="pw-track" aria-hidden="true">${cells}</ul></div>`;
  };
  return `<section class="pw" aria-labelledby="${headingId}"><div class="shell pw-head"><div class="kicker">Trusted partnerships</div><h2 id="${headingId}">${title}</h2><p>Banks, developers, auction operators and institutions have trusted Grenada with launches where the asset — and the reputation — is on the line.</p><div class="pw-count"><b data-count="${partners.length}">${partners.length}</b><span>+ partner<br>organizations</span></div></div><div class="pw-rows">${row(partners.slice(0, half), "left")}${row(partners.slice(half), "right")}</div></section>`;
}

export function breadcrumb(items = []) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a>${items.map((item, index) => `${index < items.length - 1 ? `<span aria-hidden="true">/</span><a href="${item.href}">${item.label}</a>` : `<span aria-hidden="true">/</span><span aria-current="page">${item.label}</span>`}`).join("")}</nav>`;
}

export function pageHero({ kicker, title, summary, breadcrumbItems = [], visual = "", modifier = "" }) {
  return `<section class="page-hero ${modifier}" id="top"><div class="shell">
    ${breadcrumb(breadcrumbItems)}
    <div class="page-hero-grid">
      <div class="page-hero-copy" data-reveal><div class="kicker">${kicker}</div><h1>${title}</h1><p>${summary}</p></div>
      ${visual ? `<div class="page-hero-visual" data-reveal="right">${visual}</div>` : `<div class="page-hero-mark" aria-hidden="true">G</div>`}
    </div>
  </div></section>`;
}

export function serviceHero(service) {
  return `<section class="page-hero service-hero" id="top"><div class="shell">
    ${breadcrumb([{ label: "Services", href: "/services/" }, { label: service.title, href: `/services/${service.slug}/` }])}
    <div class="service-hero-grid">
      <div class="service-hero-index" aria-hidden="true">${service.number}</div>
      <div class="service-hero-copy" data-reveal><div class="kicker">Capability / ${service.number}</div><h1>${service.title}</h1><p>${service.summary}</p><div class="hero-actions"><a class="btn btn-primary" href="/contact/" data-snd>Start a project ${arrow}</a><a class="btn btn-ghost" href="/work/" data-snd>See the work</a></div></div>
    </div>
  </div></section>`;
}

export function caseHero(project) {
  const [kind, when] = project.type.split(" · ");
  return `<section class="case-hero" id="top"><div class="shell">
    ${breadcrumb([{ label: "Work", href: "/work/" }, { label: project.title, href: `/work/${project.slug}/` }])}
    <div class="case-hero-head" data-reveal><div class="kicker">Case study</div><h1>${project.title}</h1>${project.titleAr ? `<p class="case-hero-ar" lang="ar" dir="rtl">${project.titleAr}</p>` : ""}
    <ul class="case-chips"><li>${project.location}</li>${kind ? `<li>${kind}</li>` : ""}${when ? `<li>${when}</li>` : ""}</ul></div>
    <figure class="case-hero-media" data-reveal>${projectImg(project, { eager: true })}</figure>
  </div></section>`;
}

export function globalCTA({ kicker = "Start a conversation", title = "Put your next project <em>in front.</em>", text = "Bring strategy, creative, performance and field execution into one connected project team.", button = "Email Grenada", href = `mailto:${site.email}` } = {}) {
  return `<section class="template-cta"><div class="shell"><div class="contact-card" data-reveal><div class="kicker">${kicker}</div><h2>${title}</h2><p>${text}</p><div class="contact-actions"><a class="btn btn-primary" href="${href}" data-snd>${button} ${arrow}</a><a class="btn btn-ghost" href="/contact/" data-snd>Contact details</a></div></div></div></section>`;
}

export function projectCard(project, index = 0) {
  return `<a class="template-project-card" href="/work/${project.slug}/" data-reveal="${index % 2 ? "right" : "left"}"><div class="template-project-media">${projectImg(project, { sizes: "(max-width: 820px) 100vw, 50vw" })}</div><div class="template-project-meta"><span>${project.location}</span><span>${project.type}</span></div><h3>${project.title}</h3><p>${project.services.join(" · ")}</p></a>`;
}

export function serviceCard(service) {
  return `<a class="template-service-card" href="/services/${service.slug}/" data-reveal><span>${service.number}</span><div><h3>${service.title}</h3><p>${service.summary}</p></div><b aria-hidden="true">↗</b></a>`;
}

export function relatedProjects(items) {
  if (!items.length) return "";
  return `<section class="section template-related"><div class="shell"><div class="section-head"><div><div class="kicker">Related work</div><h2 class="section-title">See the capability in market.</h2></div><p class="section-copy">Projects whose recorded scope includes this capability or adjacent campaign work.</p></div><div class="template-project-grid">${items.map(projectCard).join("")}</div></div></section>`;
}

export function relatedServices(items) {
  if (!items.length) return "";
  return `<section class="section template-related"><div class="shell"><div class="section-head"><div><div class="kicker">Connected capabilities</div><h2 class="section-title">Built to work as one system.</h2></div><p class="section-copy">Real estate launches rarely live inside one discipline. These services connect naturally with this scope.</p></div><div class="template-service-grid">${items.map(serviceCard).join("")}</div></div></section>`;
}
