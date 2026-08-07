import { documentLayout } from "./layouts.mjs";
import { services } from "./data/services.mjs";
import { getProject } from "./data/projects.mjs";

const selectedProjects = ["shorfat-al-haram", "malqa-taif", "dream-land"].map(getProject).filter(Boolean);
const chapterFrames = [
  { n: "01", label: "Position", title: "Define the market story.", copy: "Audience, offer, context and message hierarchy become one position the project can own.", image: "/assets/hero-office.webp", alt: "Grenada Studio creative office during campaign planning" },
  { n: "02", label: "Build", title: "Create the campaign system.", copy: "Identity, content, landing experiences and sales-support material are built from the same commercial idea.", image: "/assets/malqa.webp", alt: "Malqa Taif real estate campaign identity and marketing materials" },
  { n: "03", label: "Launch", title: "Activate every surface.", copy: "Paid media, social, creators, outdoor and on-ground execution move together instead of as separate handoffs.", image: "/assets/event-coverage.webp", alt: "Grenada Studio on-ground real estate event execution" },
  { n: "04", label: "Optimize", title: "Measure what moves.", copy: "CRO, KPIs, analytics and campaign response feed the next creative and media decision while the launch is still live.", image: "/assets/shorfat.webp", alt: "Shorfat Al Haram integrated real estate campaign work" }
];

const projectScenes = selectedProjects.map((project, index) => `<article class="me-project-scene" data-me-project>
  <a class="me-project-sticky" href="/work/${project.slug}/" aria-label="View ${project.title} case study">
    <figure class="me-project-media"><img src="${project.image}" alt="${project.alt}" width="1319" height="791" loading="lazy"><span class="me-project-number" aria-hidden="true">0${index + 1}</span></figure>
    <div class="me-project-copy"><span class="me-mono">${project.location} / Selected case study</span><h3>${project.title}</h3><div class="me-project-meta"><span>${project.type}</span><span>View case study ↗</span></div></div>
  </a>
</article>`).join("");

const serviceField = services.map((service, index) => `<a class="me-service" href="/services/${service.slug}/" data-me-service style="--me-depth:${(index % 4) + 1}"><span>${service.number}</span><strong>${service.title}</strong><i aria-hidden="true">↗</i></a>`).join("");

export function mobileEditorialHomePage() {
  const content = `<div class="me-page" data-me-page>
    <div class="me-progress" aria-hidden="true"><span></span></div>

    <section class="me-hero" data-me-hero>
      <div class="me-hero-media" aria-hidden="true"><img src="/assets/hero-office.webp" alt="" width="1319" height="791" fetchpriority="high"><div class="me-hero-wash"></div></div>
      <div class="shell me-hero-shell">
        <div class="me-hero-top"><span class="me-mono">Experiment / Mobile Art Direction 03</span><a href="/home-parallax/">View parallax study ↗</a></div>
        <div class="me-hero-copy"><p class="me-overline">Integrated real estate marketing · Egypt & KSA</p><h1 data-me-split="hero">We build <em>demand</em><br>for real estate.</h1><p class="me-hero-note">Strategy, creative, performance and field execution choreographed as one market-moving system.</p></div>
        <div class="me-hero-foot"><span>Scroll / enter the story</span><span class="me-scroll-mark"><i></i></span><span>Grenada Studio / 2026</span></div>
      </div>
    </section>

    <section class="me-manifesto" aria-labelledby="meManifestoTitle">
      <div class="shell"><span class="me-mono">The operating idea</span><h2 id="meManifestoTitle" data-me-split="manifesto"><span>Digital thinking.</span><span>Field execution.</span><span class="accent">One campaign system.</span></h2><p>Real estate does not move through one channel. The story, media, experience and field execution should all know what the project is trying to move.</p></div>
    </section>

    <section class="me-story" id="meStory" aria-labelledby="meStoryTitle">
      <div class="shell me-story-intro"><span class="me-mono">How demand is built</span><h2 id="meStoryTitle">Four chapters.<br><em>One continuous launch.</em></h2><p>Natural scrolling, but the scene holds long enough for the project to evolve in front of you.</p></div>
      <div class="me-story-track" data-me-story-track>
        <div class="me-story-sticky">
          <div class="me-story-rule" aria-hidden="true"><span></span></div>
          ${chapterFrames.map((item, index) => `<article class="me-chapter${index === 0 ? ' is-active' : ''}" data-me-chapter="${index}">
            <figure><img src="${item.image}" alt="${item.alt}" width="1319" height="791" ${index ? 'loading="lazy"' : ''}></figure>
            <div class="me-chapter-shade"></div>
            <div class="me-chapter-copy shell"><div class="me-chapter-index"><b>${item.n}</b><span>04</span></div><div><span class="me-mono">${item.label}</span><h3>${item.title}</h3><p>${item.copy}</p></div></div>
          </article>`).join("")}
        </div>
      </div>
    </section>

    <section class="me-work" aria-labelledby="meWorkTitle">
      <div class="shell me-section-head"><span class="me-mono">Selected work</span><div><h2 id="meWorkTitle">Projects as scenes.<br><em>Not cards.</em></h2><p>Each project gets a full mobile moment, with the image and typography moving at different rates while native scrolling stays in control.</p></div></div>
      <div class="me-projects">${projectScenes}</div>
    </section>

    <section class="me-statement" aria-label="Grenada campaign statement"><div class="shell"><p>We don't just launch campaigns.</p><h2 data-me-split="statement">We build <em>environments</em><br>for demand.</h2></div></section>

    <section class="me-convergence" data-me-convergence aria-labelledby="meConvergenceTitle">
      <div class="me-convergence-track"><div class="me-convergence-sticky shell">
        <div class="me-convergence-head"><span class="me-mono">Field × Digital</span><h2 id="meConvergenceTitle">Different surfaces.<br><em>One campaign.</em></h2></div>
        <div class="me-system-visual">
          <div class="me-system-label me-system-label--field"><span>FIELD</span><small>Physical attention</small></div>
          <div id="meLottie" class="me-lottie" role="img" aria-label="Animated diagram of field and digital campaign signals converging into one campaign system">
            <svg class="me-lottie-fallback" viewBox="0 0 400 400" aria-hidden="true"><circle cx="70" cy="200" r="8"/><circle cx="330" cy="200" r="8"/><circle cx="200" cy="70" r="8"/><circle cx="200" cy="330" r="8"/><path d="M78 200h104M322 200H218M200 78v104M200 322V218"/><circle class="core" cx="200" cy="200" r="34"/></svg>
          </div>
          <div class="me-system-label me-system-label--digital"><span>DIGITAL</span><small>Distributed attention</small></div>
          <div class="me-system-center"><span>ONE</span><b>CAMPAIGN</b></div>
        </div>
        <p class="me-convergence-copy">The experience should still feel like the same project whether someone meets it on a phone, a roadside billboard, a sales deck or the auction floor.</p>
      </div></div>
    </section>

    <section class="me-capabilities" aria-labelledby="meCapabilitiesTitle"><div class="shell"><div class="me-capabilities-head"><span class="me-mono">10 connected capabilities</span><h2 id="meCapabilitiesTitle">The service list becomes an <em>editorial field.</em></h2></div><div class="me-service-field">${serviceField}</div></div></section>

    <section class="me-proof" aria-label="Grenada operating proof"><div class="shell">
      <article data-me-proof><strong>360°</strong><div><span class="me-mono">Integrated execution</span><p>Digital, creative, production and field touchpoints connected around one launch.</p></div></article>
      <article data-me-proof><strong>10</strong><div><span class="me-mono">Core capabilities</span><p>Specialists can enter independently while the project keeps one campaign language.</p></div></article>
      <article data-me-proof><strong class="words">Digital<br><em>+</em> Field</strong><div><span class="me-mono">One operating model</span><p>What happens online and what happens on the ground are treated as one customer journey.</p></div></article>
    </div></section>

    <section class="me-partners" aria-labelledby="mePartnersTitle"><div class="shell"><figure><img src="/assets/partners.webp" alt="Selection of organizations and partners that worked with Grenada Studio" width="1319" height="791" loading="lazy"></figure><div><span class="me-mono">Trusted partnerships</span><h2 id="mePartnersTitle">Chosen by teams with <em>serious assets at stake.</em></h2><p>After the kinetic sections, the motion quiets down. The work and the partners get room to breathe.</p></div></div></section>

    <section class="me-closing"><div class="shell"><span class="me-mono">Ready when the asset is</span><h2>Move the market.<br><em>Not just the feed.</em></h2><p>Bring Grenada in early enough to shape positioning, creative and launch mechanics together.</p><div class="me-closing-actions"><a class="btn btn-primary" href="/contact/">Start a project ↗</a><a class="btn btn-ghost" href="/work/">Explore the work</a></div></div></section>
  </div>`;

  return documentLayout({
    title: "Mobile Editorial Home Study",
    description: "Experimental mobile-first kinetic editorial homepage study for Grenada Studio.",
    path: "/home-mobile-editorial/",
    bodyClass: "mobile-editorial-page",
    content,
    extraHead: `<meta name="robots" content="noindex,nofollow" /><link rel="preload" as="image" href="/assets/hero-office.webp" /><link rel="stylesheet" href="/assets/mobile-editorial.css" />`,
    extraScripts: `<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" defer></script><script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js" defer></script><script src="https://cdn.jsdelivr.net/npm/split-type@0.3.4/umd/index.min.js" defer></script><script src="https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie_light.min.js" defer></script><script src="/assets/mobile-editorial.js" defer></script>`
  });
}
