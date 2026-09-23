import { documentLayout } from "./layouts.mjs";
import { services } from "./data/services.mjs";
import { projects, getProject } from "./data/projects.mjs";
import { site } from "./data/site.mjs";
import { partnerWall, projectImg } from "./components.mjs";

// Responsive <img> for the licensed photos in /assets/photos (each has a 2200w and a 960w "-m" variant).
const photo = (name, alt, { eager = false, sizes = "100vw", h = 1467 } = {}) =>
  `<img src="/assets/photos/${name}.webp" srcset="/assets/photos/${name}-m.webp 960w, /assets/photos/${name}.webp 2200w" sizes="${sizes}" alt="${alt}" width="2200" height="${h}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;

// Wraps each word so the hero headline can be revealed word by word.
const words = (html) => html.split(/(<em>.*?<\/em>|<br>|\s+)/).filter((t) => t && !/^\s+$/.test(t))
  .map((t) => t === "<br>" ? t : `<span class="hw"><span class="hw-in">${t}</span></span>`).join(" ");

export function homePage() {
  const featured = ["shorfat-al-haram", "dream-land", "khairat-taibah", "nukhbat-al-taif"].map(getProject).filter(Boolean);
  const storyFrames = [
    { n: "01", label: "Position", title: "Define the market story.", copy: "Audience, offer, competitive context and message hierarchy become one position the project can own.", img: photo("strategy", "Strategy session mapping a campaign on a whiteboard", { sizes: "(max-width: 820px) 100vw, 58vw" }) },
    { n: "02", label: "Build", title: "Create the campaign system.", copy: "Identity, content, landing experiences, outdoor and sales material are developed as one visual and verbal language.", img: photo("film-set", "Studio set lit for a campaign content shoot", { sizes: "(max-width: 820px) 100vw, 58vw" }) },
    { n: "03", label: "Launch", title: "Activate every channel.", copy: "Paid media, social, creators, outdoor and event coverage move together instead of as separate handoffs.", img: photo("billboards", "Illuminated billboards above night traffic", { sizes: "(max-width: 820px) 100vw, 58vw" }) },
    { n: "04", label: "Optimize", title: "Measure what moves.", copy: "CRO, KPIs, ROI and reporting feed the next creative and media decision while the campaign is still live.", img: photo("aerial-villas", "Aerial view of a residential villa community", { sizes: "(max-width: 820px) 100vw, 58vw", h: 1237 }) }
  ];

  const hero = `<section class="px-hero" id="top" data-px-hero>
    <div class="px-progress" aria-hidden="true"><span></span></div>
    <div class="px-hero-media" aria-hidden="true"><div class="px-hero-image">${photo("riyadh-night", "", { eager: true })}</div><div class="px-hero-shade"></div><div class="px-hero-gridfx"></div></div>
    <div class="shell px-hero-shell">
      <div class="px-hero-top"><span class="kicker">Real estate marketing · KSA &amp; Egypt</span><span class="px-live"><i></i>Grenada Studio / 2026</span></div>
      <div class="px-hero-copy"><h1 class="px-hero-title">${words("We build <em>demand</em><br>for real estate.")}</h1><p class="px-hero-desc">Strategy, creative, performance and field execution — arranged as one system that moves projects, auctions and launches.</p><div class="px-hero-actions"><a class="btn btn-primary" href="/contact/" data-snd data-magnetic>Start a project <span aria-hidden="true">↗</span></a><a class="btn btn-ghost" href="#work" data-snd>See the work</a></div></div>
      <div class="px-hero-foot"><span>Scroll</span><span class="px-scroll-mark" aria-hidden="true"><i></i></span><span class="px-hero-stats"><b data-count="10">10</b>+ years · <b data-count="10">10</b> capabilities · <b>360°</b></span></div>
    </div>
  </section>`;

  const manifesto = `<section class="px-manifesto" aria-labelledby="px-manifesto-title"><div class="shell"><div class="px-manifesto-grid"><div class="kicker">The difference</div><h2 id="px-manifesto-title"><span class="px-word">Digital thinking.</span><span class="px-word">Field execution.</span><span class="px-word px-word-accent">One campaign system.</span></h2><p>Real estate does not move through one channel. Grenada connects the story, the media, the experience and the field execution around the same commercial objective.</p></div></div></section>`;

  const story = `<section class="px-story" id="approach" aria-labelledby="px-story-title"><div class="shell"><div class="px-story-head"><div><div class="kicker">How demand is built</div><h2 id="px-story-title">Four stages.<br><em>One continuous system.</em></h2></div><p>Each stage changes the same campaign, rather than handing the project to a new supplier.</p></div><div class="px-story-stage"><div class="px-story-visual" aria-hidden="true">${storyFrames.map((f, i) => `<figure class="px-story-frame${i === 0 ? " is-first" : ""}" data-frame="${i}">${f.img}<figcaption><span>${f.n} / ${f.label}</span></figcaption></figure>`).join("")}<div class="px-story-counter"><span class="px-story-now">01</span><i></i><b>04</b></div></div><div class="px-story-copy">${storyFrames.map((f, i) => `<article class="px-story-step${i === 0 ? " is-first" : ""}" data-step="${i}"><span>${f.n}</span><div><div class="kicker">${f.label}</div><h3>${f.title}</h3><p>${f.copy}</p></div></article>`).join("")}</div></div><div class="px-deck"><div class="px-deck-bar" aria-hidden="true"><span class="px-deck-now">01</span><i><b></b></i><span>04</span></div><div class="px-deck-track">${storyFrames.map((f) => `<article class="px-deck-card"><figure>${f.img}</figure><div class="px-deck-body"><span class="px-deck-n">${f.n}</span><div class="kicker">${f.label}</div><h3>${f.title}</h3><p>${f.copy}</p></div></article>`).join("")}</div></div></div></section>`;

  const projectsSection = `<section class="px-work" id="work" aria-labelledby="px-work-title"><div class="shell px-work-intro"><div class="kicker">Selected work</div><h2 id="px-work-title">Proof lives in the <em>launch.</em></h2><p>Real campaigns for plots, auctions and destination projects across Makkah, Taif and Madinah — shot, designed and launched by Grenada.</p></div><div class="px-work-list">${featured.map((p, i) => `<article class="px-project" data-project-scene><a href="/work/${p.slug}/" class="shell px-project-link" data-cursor="View"><div class="px-project-media">${projectImg(p, { sizes: "(max-width: 820px) 100vw, 90vw" })}<span class="px-project-number" aria-hidden="true">0${i + 1}</span></div><div class="px-project-info"><div><span class="kicker">${p.location} · ${p.type}</span><h3>${p.title}</h3></div><div>${p.facts ? `<dl class="px-project-facts">${p.facts.slice(0, 2).map(([v, k]) => `<div><dt>${v}</dt><dd>${k}</dd></div>`).join("")}</dl>` : ""}<p class="px-project-services">${p.services.slice(0, 5).join(" · ")}</p><span class="px-project-arrow">View case study ↗</span></div></div></a></article>`).join("")}</div><div class="shell px-work-more"><a class="btn btn-ghost" href="/work/" data-snd>All ${projects.length} case studies ↗</a></div></section>`;

  const convergence = `<section class="px-convergence" aria-labelledby="px-convergence-title"><div class="shell"><div class="px-convergence-head"><div class="kicker">Field × digital</div><h2 id="px-convergence-title">Different surfaces.<br><em>One campaign.</em></h2></div><div class="px-convergence-stage"><figure class="px-plane px-plane-field">${photo("production", "Camera operator filming a launch on location", { sizes: "(max-width: 820px) 100vw, 50vw" })}<figcaption>FIELD / Physical attention</figcaption></figure><div class="px-convergence-word" aria-hidden="true"><span>ONE</span><b>campaign</b></div><figure class="px-plane px-plane-digital">${photo("billboards", "Digital billboards above a city highway at night", { sizes: "(max-width: 820px) 100vw, 50vw" })}<figcaption>DIGITAL / Distributed attention</figcaption></figure></div><p class="px-convergence-copy">The brand should feel like the same project whether someone meets it on a phone, a roadside billboard, a sales deck or the auction floor.</p></div></section>`;

  const capabilityField = `<section class="px-capabilities" aria-labelledby="px-capabilities-title"><div class="shell"><div class="px-capabilities-head"><div class="kicker">${services.length} connected capabilities</div><h2 id="px-capabilities-title">A service list should feel like a <em>system.</em></h2></div><div class="px-capability-field">${services.map((s, i) => `<a class="px-capability" data-depth="${(i % 4) + 1}" href="/services/${s.slug}/"><span>${s.number}</span>${s.title}<i aria-hidden="true">↗</i></a>`).join("")}</div></div></section>`;

  const unitsMarketed = projects.reduce((sum, p) => sum + (Number((p.type.match(/\d[\d,]*/) || ["0"])[0].replace(/,/g, "")) || 0), 0);
  const proof = `<section class="px-proof" aria-label="Grenada in numbers"><div class="shell"><div class="px-proof-row"><div class="px-proof-num"><span data-count="360">360</span>°</div><div><span class="kicker">Integrated execution</span><p>Digital, creative, production and field touchpoints connected around one launch.</p></div></div><div class="px-proof-row"><div class="px-proof-num"><span data-count="${unitsMarketed}">${unitsMarketed.toLocaleString("en-US")}</span></div><div><span class="kicker">Plots &amp; properties marketed in featured work</span><p>From 7-lot hybrid auctions to 914-plot residential launches.</p></div></div><div class="px-proof-row"><div class="px-proof-num px-proof-words">Digital<br><em>+</em> Field</div><div><span class="kicker">One operating model</span><p>What happens online and what happens on the ground are treated as one customer journey.</p></div></div></div></section>`;

  const closing = `<section class="px-closing"><div class="px-closing-media" aria-hidden="true">${photo("hero-riyadh", "", { sizes: "100vw" })}</div><div class="shell"><div class="px-closing-grid"><div class="kicker">Ready when the asset is</div><div><h2>Move the market.<br><em>Not just the feed.</em></h2><p>Bring Grenada in early enough to shape the position, creative system and launch mechanics together.</p><div class="px-closing-actions"><a class="btn btn-primary" href="/contact/" data-snd data-magnetic>Start a project <span aria-hidden="true">↗</span></a><a class="btn btn-ghost" href="mailto:${site.email}" data-snd>${site.email}</a></div></div></div></div></section>`;

  const dock = `<div class="px-dock"><a class="btn btn-primary" href="/contact/" data-snd>Start a project ↗</a></div>`;

  return documentLayout({
    title: site.name,
    path: "/",
    bodyClass: "parallax-page home-page",
    intro: true,
    content: hero + manifesto + story + projectsSection + convergence + capabilityField + proof + partnerWall() + closing + dock,
    extraHead: `<link rel="preload" as="image" href="/assets/photos/riyadh-night-m.webp" media="(max-width: 820px)" /><link rel="preload" as="image" href="/assets/photos/riyadh-night.webp" media="(min-width: 821px)" /><link rel="stylesheet" href="/assets/parallax.css" />`,
    extraScripts: `<script src="/assets/vendor/gsap.min.js" defer></script><script src="/assets/vendor/ScrollTrigger.min.js" defer></script><script src="/assets/parallax.js" defer></script>`
  });
}
