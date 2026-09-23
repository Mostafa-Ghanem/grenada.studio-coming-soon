import { site } from "./data/site.mjs";
import { partners } from "./data/partners.mjs";

const arrow = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

export function header(active = "") {
  const links = site.nav.map((item) => `<a href="${item.href}"${item.key === active ? ' aria-current="page"' : ''} data-snd>${item.label}</a>`).join("");
  return `<header id="siteHeader">
    <div class="shell nav">
      <a class="brand" href="/" aria-label="Grenada Studio home">
        <img src="/assets/grenada-mark.svg" alt="" width="26" height="28" />
        <span class="brand-text"><b>Grenada</b><span> Studio</span></span>
      </a>
      <nav class="nav-links" aria-label="Primary navigation">${links}</nav>
      <div class="nav-actions">
        <button class="round-btn" id="soundToggle" type="button" aria-pressed="false" aria-label="Toggle interface sounds" title="Sound off">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"></path><path class="sound-wave" d="M15 9.5a4 4 0 0 1 0 5"></path><path class="sound-wave" d="M18 7a8 8 0 0 1 0 10"></path><path class="sound-off" d="M16 9l5 6"></path><path class="sound-off" d="M21 9l-5 6"></path></svg>
        </button>
        <button class="round-btn menu-btn" id="menuToggle" type="button" aria-expanded="false" aria-controls="mobileMenu" aria-label="Open navigation">
          <svg class="menu-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 8h14M5 16h14"/></svg>
          <svg class="menu-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>
        </button>
      </div>
    </div>
    <nav class="mobile-nav" id="mobileMenu" aria-label="Mobile navigation">${links}</nav>
  </header>`;
}

export function footer() {
  return `<footer><div class="shell footer-row"><span>© 2026 Grenada Studio</span><div class="socials" aria-label="Social links"><a href="${site.social.instagram}" target="_blank" rel="noopener">Instagram</a><a href="${site.social.behance}" target="_blank" rel="noopener">Behance</a><a href="${site.social.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div></div></footer>`;
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
  return `<section class="case-hero" id="top"><div class="shell">
    ${breadcrumb([{ label: "Work", href: "/work/" }, { label: project.title, href: `/work/${project.slug}/` }])}
    <div class="case-hero-head" data-reveal><div><div class="kicker">Case study / ${project.location}</div><h1>${project.title}</h1></div><p>${project.type}</p></div>
    <figure class="case-hero-media" data-reveal>${projectImg(project, { eager: true })}<figcaption>${project.location} · ${project.type}</figcaption></figure>
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
