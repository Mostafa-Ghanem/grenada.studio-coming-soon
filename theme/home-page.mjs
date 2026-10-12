import { documentLayout } from "./layouts.mjs";
import { services } from "./data/services.mjs";
import { projects, getProject } from "./data/projects.mjs";
import { site } from "./data/site.mjs";
import { partnerWall, projectImg } from "./components.mjs";
import { L } from "./i18n.mjs";

// Responsive <img> for the licensed photos in /assets/photos (each has a 2200w and a 960w "-m" variant).
const photo = (name, alt, { eager = false, sizes = "100vw", h = 1467 } = {}) =>
  `<img src="/assets/photos/${name}.webp" srcset="/assets/photos/${name}-m.webp 960w, /assets/photos/${name}.webp 2200w" sizes="${sizes}" alt="${alt}" width="2200" height="${h}"${eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"'}>`;

// Wraps each word so the hero headline can be revealed word by word.
const words = (html) => html.split(/(<em>.*?<\/em>|<br>|\s+)/).filter((t) => t && !/^\s+$/.test(t))
  .map((t) => t === "<br>" ? t : `<span class="hw"><span class="hw-in">${t}</span></span>`).join(" ");

export function homePage() {
  const featured = ["shorfat-al-haram", "dream-land", "khairat-taibah", "nukhbat-al-taif"].map(getProject).filter(Boolean);
  const sz = { sizes: "(max-width: 820px) 100vw, 58vw" };
  const storyFrames = [
    { n: "01", label: L("Discover", "نفهم"), title: L("Discover.", "نفهم"), copy: L("We dissect your project, market landscape, and audience to pinpoint the exact value proposition that moves the needle.", "نفهم مشروعك وسوقه وجمهوره، ونحدد ما الذي نريد أن نوصله لهم."), img: photo("strategy", "Strategy session mapping a campaign on a whiteboard", sz) },
    { n: "02", label: L("Build", "نبني"), title: L("Build.", "نبني"), copy: L("We develop everything your brand requires: visual identity, compelling copy, websites, creative assets, and marketing collaterals.", "نبني كل ما يحتاجه المشروع، من الهوية والمحتوى إلى المواقع والتصاميم والمواد التسويقية."), img: photo("film-set", "Studio set lit for a campaign content shoot", sz) },
    { n: "03", label: L("Launch", "نطلق"), title: L("Launch.", "نطلق"), copy: L("We roll out the campaign across optimal touchpoints, from paid performance and social media to on-ground activations and events.", "نطلق الحملة عبر القنوات المناسبة، من الإعلانات والسوشيال ميديا إلى التنفيذ الميداني والفعاليات."), img: photo("billboards", "Illuminated billboards above night traffic", sz) },
    { n: "04", label: L("Optimize", "نطوّر"), title: L("Optimize.", "نطوّر"), copy: L("We continuously track performance, analyze data, and refine every element to maximize ROI.", "نحسّن الأداء ونراجع النتائج باستمرار، ثم نعدّل ما يحتاج إلى تعديل."), img: photo("aerial-villas", "Aerial view of a residential villa community", { ...sz, h: 1237 }) }
  ];

  const hero = `<section class="px-hero" id="top" data-px-hero>
    <div class="px-progress" aria-hidden="true"><span></span></div>
    <div class="px-hero-media" aria-hidden="true"><div class="px-hero-image">${photo("riyadh-night", "", { eager: true })}</div><div class="px-hero-shade"></div><div class="px-hero-gridfx"></div></div>
    <div class="shell px-hero-shell">
      <div class="px-hero-top"><span class="kicker">Real estate marketing · KSA &amp; Egypt</span><span class="px-live"><i></i>Grenada Studio / 2026</span></div>
      <div class="px-hero-copy"><h1 class="px-hero-title">${words(L("Putting you at the <em>forefront.</em><br>Amplifying your reach.", "نضعك في <em>المقدمة</em><br>ونصنع لعلامتك انتشارًا أوسع"))}</h1><p class="px-hero-desc">${L("A full-service digital and creative marketing agency backed by over a decade of expertise in building leading brands and executing high-impact campaigns, with proven authority in real estate marketing and landmark auctions across the Gulf.", "وكالة تسويق رقمي وإبداعي متكاملة، بخبرة تتجاوز 10 سنوات في بناء العلامات وصناعة الحملات، مع خبرة هائلة في القطاع العقاري والمزادات الكبرى في دول الخليج.")}</p><div class="px-hero-actions"><a class="btn btn-primary" href="#work" data-snd data-magnetic>${L("Our portfolio", "سابقة أعمالنا")} <span aria-hidden="true">↗</span></a><a class="btn btn-ghost" href="/contact/" data-snd>${L("Scale your business", "وسّع مشروعك")}</a></div></div>
      <div class="px-hero-foot"><span>Scroll</span><span class="px-scroll-mark" aria-hidden="true"><i></i></span><span class="px-hero-stats"><b data-count="10">10</b>+ years · <b data-count="10">10</b> capabilities · <b>360°</b></span></div>
    </div>
  </section>`;

  const why = `<section class="px-manifesto px-why" aria-labelledby="px-manifesto-title"><div class="shell"><div class="px-manifesto-grid"><div class="kicker">${L("Why Grenada?", "لماذا جرينادا؟")}</div><h2 id="px-manifesto-title"><span class="px-word">${L("A decade of mastery,", "خبرة سنوات،")}</span><span class="px-word px-word-accent">${L("dedicated to your growth.", "لخدمة مشروعك.")}</span></h2><div class="px-why-copy"><p>${L("We bring years of hands-on market experience to your brand, regardless of your sector, delivering marketing built on deep market understanding and aligned directly with your business goals.", "هذه الخبرة نضعها اليوم في خدمة علامتك، مهما كان قطاعها، لنصنع تسويقًا يفهم السوق ويتحرك وفق أهداف مشروعك.")}</p><p>${L("Our team functions as a synchronized engine, uniting diverse specialists around one clear mission: turning marketing into tangible, measurable growth for your business.", "يعمل فريقنا كمنظومة واحدة، تجمع مختلف التخصصات حول هدف واحد: تحويل التسويق إلى نتائج ملموسة يتوسع بها نشاطك.")}</p></div></div></div></section>`;

  const proof = `<section class="px-proof" aria-label="${L("Numbers and partners in success", "أرقام وشركاء نجاح")}"><div class="shell"><div class="kicker px-proof-kicker">${L("Numbers & partners in success", "أرقام وشركاء نجاح")}</div><div class="px-proof-row"><div class="px-proof-num">+<span data-count="10">10</span></div><div><span class="kicker">${L("Years", "سنوات")}</span><p>${L("of digital and on-ground marketing expertise.", "من الخبرة الرقمية والميدانية.")}</p></div></div><div class="px-proof-row"><div class="px-proof-num"><span data-count="35841">35,841</span></div><div><span class="kicker">${L("Units & real estate assets", "قطعة وعقار")}</span><p>${L("marketed, driving deals and sales surpassing hundreds of millions through end-to-end strategic campaigns.", "بمبيعات وصفقات تخطت مئات الملايين عبر حملات متكاملة أدرناها باحترافية.")}</p></div></div><div class="px-proof-row"><div class="px-proof-num">+<span data-count="29">29</span></div><div><span class="kicker">${L("Official entities, banks & leading groups", "جهة رسمية وبنكًا وكيانًا رائدًا")}</span><p>${L("Official entities, leading banks, and premier commercial and real estate groups entrusted us to lead their flagship campaigns.", "جهة رسمية، وبنكًا، وكيانًا تجاريًا وعقاريًا رائدًا وثقوا بنا لإدارة حملاتهم الكبرى.")}</p></div></div></div></section>`;

  const partnersBlock = partnerWall({
    kicker: L("Trusted partnerships", "شركاء النجاح"),
    title: L("Trusted by industry giants <em>for multi-billion deals.</em>", "ثقة أكبر الهيئات <em>لصفقات بمليارات</em>"),
    text: L("Leading banks, top-tier developers, and prominent enterprises across Saudi Arabia and Egypt rely on Grenada to create and execute their major campaigns.", "بنوك، ومطورون، وكيانات رائدة في مصر والسعودية ائتمنت جرينادا على إدارة حملاتها الكبرى."),
    cta: `<div class="shell pw-cta"><p>${L("Ready to lead your market?", "جاهز لتكون في المقدمة؟")}</p><a class="btn btn-primary" href="/contact/" data-snd data-magnetic>${L("Connect with Grenada", "تواصل مع جرينادا")} <span aria-hidden="true">↗</span></a></div>`
  });

  const projectsSection = `<section class="px-work" id="work" aria-labelledby="px-work-title"><div class="shell px-work-intro"><div class="kicker">Selected work</div><h2 id="px-work-title">${L("Our track record <em>speaks.</em>", "هنا تتحدث <em>إنجازاتنا</em>")}</h2><p>${L("Real-world success stories across Makkah, Taif, and Madinah, spanning major property sales, landmark auctions, and mega development projects.", "مشاريع حقيقية في مكة المكرمة والطائف والمدينة المنورة تضمنت حملات بيع وتسويق العقارات، والمزادات والمشاريع الكبرى.")}</p></div><div class="px-work-list">${featured.map((p, i) => `<article class="px-project" data-project-scene><a href="/work/${p.slug}/" class="shell px-project-link" data-cursor="View"><div class="px-project-media">${projectImg(p, { sizes: "(max-width: 820px) 100vw, 90vw" })}<span class="px-project-number" aria-hidden="true">0${i + 1}</span></div><div class="px-project-info"><div><span class="kicker">${p.location} · ${p.type}</span><h3>${p.title}</h3></div><div>${p.facts ? `<dl class="px-project-facts">${p.facts.slice(0, 2).map(([v, k]) => `<div><dt>${v}</dt><dd>${k}</dd></div>`).join("")}</dl>` : ""}<p class="px-project-services">${p.services.slice(0, 5).join(" · ")}</p><span class="px-project-arrow">View case study ↗</span></div></div></a></article>`).join("")}</div><div class="shell px-work-more"><a class="btn btn-ghost" href="/work/" data-snd>All ${projects.length} case studies ↗</a></div></section>`;

  const capabilityField = `<section class="px-capabilities" aria-labelledby="px-capabilities-title"><div class="shell"><div class="px-capabilities-head"><div class="kicker">${L("Our services", "خدماتنا")}</div><div><h2 id="px-capabilities-title">${L("A complete media &amp; digital ecosystem across <em>10 integrated services.</em>", "منظومة رقمية وإعلامية بـ <em>10 خدمات متكاملة</em>")}</h2><p class="px-capabilities-copy">${L("Full-spectrum marketing solutions driving your brand from day one to bottom-line results, available as end-to-end turnkey packages or specialized services.", "حلول تسويقية شاملة تدير علامتك أو مشروعك من البداية وحتى تحقيق النتائج، سواء كباقة كاملة أو خدمات متخصصة.")}</p></div></div><div class="px-capability-field">${services.map((s, i) => `<a class="px-capability" data-depth="${(i % 4) + 1}" href="/services/${s.slug}/"><span>${s.number}</span>${s.title}<i aria-hidden="true">↗</i></a>`).join("")}</div></div></section>`;

  const story = `<section class="px-story" id="approach" aria-labelledby="px-story-title"><div class="shell"><div class="px-story-head"><div><div class="kicker">${L("Our methodology", "منهجية العمل")}</div><h2 id="px-story-title">${L("Four stages.<br><em>One unified team.</em>", "4 مراحل.<br><em>فريق واحد.</em>")}</h2></div><p>${L("We break down our workflow into 4 distinct phases, operating as one unified team to ensure every step powers the next.", "نقسم خط سير العمل إلى 4 مراحل واضحة، ونعمل فيها كفريق واحد حتى تظل كل خطوة مرتبطة بالتي تليها.")}</p></div><div class="px-story-stage"><div class="px-story-visual" aria-hidden="true">${storyFrames.map((f, i) => `<figure class="px-story-frame${i === 0 ? " is-first" : ""}" data-frame="${i}">${f.img}<figcaption><span>${f.n} / ${f.label}</span></figcaption></figure>`).join("")}<div class="px-story-counter"><span class="px-story-now">01</span><i></i><b>04</b></div></div><div class="px-story-copy">${storyFrames.map((f, i) => `<article class="px-story-step${i === 0 ? " is-first" : ""}" data-step="${i}"><span>${f.n}</span><div><h3>${f.title}</h3><p>${f.copy}</p></div></article>`).join("")}</div></div><div class="px-deck"><div class="px-deck-bar" aria-hidden="true"><span class="px-deck-now">01</span><i><b></b></i><span>04</span></div><div class="px-deck-track">${storyFrames.map((f) => `<article class="px-deck-card"><figure>${f.img}</figure><div class="px-deck-body"><span class="px-deck-n">${f.n}</span><h3>${f.title}</h3><p>${f.copy}</p></div></article>`).join("")}</div></div></div></section>`;

  const closing = `<section class="px-closing"><div class="px-closing-media" aria-hidden="true">${photo("hero-riyadh", "", { sizes: "100vw" })}</div><div class="shell"><div class="px-closing-grid"><div class="kicker">${L("Let’s talk", "لنتحدث")}</div><div><h2>${L("We are ready to put you at the forefront.<br><em>Are you?</em>", "نحن جاهزون لنضعك في المقدمة.<br><em>هل أنت جاهز؟</em>")}</h2><div class="px-closing-actions"><a class="btn btn-primary" href="/contact/" data-snd data-magnetic>${L("Talk to Grenada now", "تواصل الآن مع جرينادا")} <span aria-hidden="true">↗</span></a><a class="btn btn-ghost" href="mailto:${site.email}" data-snd>${site.email}</a></div></div></div></div></section>`;

  const dock = `<div class="px-dock"><a class="btn btn-primary" href="/contact/" data-snd>Start a project ↗</a></div>`;

  return documentLayout({
    title: site.name,
    path: "/",
    bodyClass: "parallax-page home-page",
    intro: true,
    content: hero + why + proof + partnersBlock + projectsSection + capabilityField + story + closing + dock,
    extraHead: `<link rel="preload" as="image" href="/assets/photos/riyadh-night-m.webp" media="(max-width: 820px)" /><link rel="preload" as="image" href="/assets/photos/riyadh-night.webp" media="(min-width: 821px)" /><link rel="stylesheet" href="/assets/parallax${L("", ".rtl")}.css" />`,
    extraScripts: `<script src="/assets/vendor/gsap.min.js" defer></script><script src="/assets/vendor/ScrollTrigger.min.js" defer></script><script src="/assets/parallax.js" defer></script>`
  });
}
