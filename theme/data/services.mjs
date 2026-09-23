export const services = [
  {
    number: "01", slug: "social-media-management", title: "Social Media Management",
    summary: "Platform systems, publishing, community management & reporting built around the project’s commercial narrative.",
    intro: "Grenada manages social presence as part of the wider launch system — connecting platform strategy, content cadence, community response and reporting instead of treating publishing as an isolated task.",
    capabilities: ["Platform strategy & setup", "Publishing plans", "Community management", "Campaign content coordination", "Reporting & optimization", "Instagram, X, Snapchat, TikTok & LinkedIn"],
    relatedProjects: ["shorfat-al-haram", "malqa-taif", "dream-land"]
  },
  {
    number: "02", slug: "creative-content", title: "Creative Content",
    summary: "Campaign copy, scripts and sales-support content designed to make complex real estate offers easier to understand and act on.",
    intro: "Content is developed around the project’s offer, audience and sales journey — from social copy and direct messaging to profiles, project booklets, scripts and technical presentation material.",
    capabilities: ["Social copy", "SMS & WhatsApp content", "Company & project profiles", "Project booklets", "Video concepts & scripts", "Technical marketing files"],
    relatedProjects: ["shorfat-al-haram", "malqa-taif", "osoul-makkah"]
  },
  {
    number: "03", slug: "brand-identity", title: "Brand Identity & Logos",
    summary: "Identity systems that give real estate projects a recognizable market position across digital, print and field execution.",
    intro: "Grenada builds identity as an operating system for the campaign — not just a logo. The visual language is designed to survive the full mix of landing pages, social media, outdoor, print and event applications.",
    capabilities: ["Logo creation", "Visual identity systems", "Digital identity applications", "Printed identity applications", "Campaign art direction", "Real estate positioning support"],
    relatedProjects: ["dream-land", "osoul-makkah", "nukhbat-al-taif"]
  },
  {
    number: "04", slug: "design", title: "Outdoor & Social Design",
    summary: "Connected visual systems for social, roadside, venue and print touchpoints — built to stay recognizable at every scale.",
    intro: "Project communication often moves between a phone screen, a roadside billboard, a venue wall and a printed booklet. Grenada designs those touchpoints as one coherent campaign system.",
    capabilities: ["Social media visual systems", "Roadside billboards", "Campaign signage", "Venue graphics", "Printed campaign materials", "Sales-support design"],
    relatedProjects: ["khairat-taibah", "dream-land", "osoul-makkah"]
  },
  {
    number: "05", slug: "motion-voice-over", title: "Motion & Voice Over",
    summary: "Storyboards, motion graphics, animated plans and voice-over that turn project information into watchable campaign material.",
    intro: "Motion is used where it can clarify the offer, extend campaign reach or make a project easier to remember — from animated plans and launch films to short-form advertising assets.",
    capabilities: ["Storyboards", "Motion graphics", "Animated plans", "Campaign films", "Professional voice-over", "Short-form advertising video"],
    relatedProjects: ["shorfat-al-haram", "nukhbat-al-taif", "osoul-makkah"]
  },
  {
    number: "06", slug: "web-development", title: "Web Design & Development",
    summary: "Fast, responsive landing experiences designed around lead capture, project clarity and campaign performance.",
    intro: "Grenada builds project websites and landing pages as part of the conversion journey. The work connects responsive interface design, lead forms, analytics readiness, performance and campaign consistency.",
    capabilities: ["Responsive interfaces", "Landing pages", "Smart lead forms", "CRM-ready integrations", "Performance optimization", "Security & analytics readiness"],
    relatedProjects: ["shorfat-al-haram", "malqa-taif"]
  },
  {
    number: "07", slug: "seo", title: "SEO",
    summary: "Search foundations that improve discoverability through technical, on-page and authority work tied to actual search intent.",
    intro: "SEO is approached as a continuous visibility system: understand demand, structure pages around intent, remove technical friction and measure the search footprint over time.",
    capabilities: ["Keyword research", "On-page optimization", "Technical SEO", "Off-page authority building", "Search tracking", "Continuous optimization"],
    relatedProjects: ["shorfat-al-haram", "malqa-taif"]
  },
  {
    number: "08", slug: "paid-media", title: "Paid Media",
    summary: "Media planning, campaign launches and daily optimization across search and social platforms.",
    intro: "Paid media is connected to the project’s commercial priorities, creative system and landing experience. Budgets, channel allocation and optimization are managed around measurable campaign objectives.",
    capabilities: ["Google Ads", "Meta Ads", "Snapchat Ads", "TikTok Ads", "Media planning & budget control", "Campaign reporting & optimization"],
    relatedProjects: ["shorfat-al-haram", "malqa-taif", "dream-land"]
  },
  {
    number: "09", slug: "performance-marketing", title: "Performance Marketing",
    summary: "Measurement, CRO and optimization infrastructure that connects campaign activity to business outcomes.",
    intro: "Performance work starts with measurement quality. Grenada connects KPIs, analytics, conversion journeys and CRO so campaign decisions can be made from evidence instead of isolated platform metrics.",
    capabilities: ["CRO", "KPI frameworks", "ROI measurement", "Analytics infrastructure", "Google Analytics integrations", "Continuous performance reporting"],
    relatedProjects: ["shorfat-al-haram", "malqa-taif"]
  },
  {
    number: "10", slug: "media-production", title: "Media Production",
    summary: "Aerial, ground and event production built to capture the project, the place and the campaign in motion.",
    intro: "Grenada combines on-ground production with the wider campaign system — including aerial and ground filming, CGI/3D integration, editing, event coverage and AI-assisted visual production where appropriate.",
    capabilities: ["Aerial filming", "Ground filming", "CGI & 3D integration", "Editing", "Event coverage", "AI-assisted visual production"],
    relatedProjects: ["khairat-taibah", "dream-land", "nukhbat-al-taif"]
  }
];

export const getService = (slug) => services.find((item) => item.slug === slug);

// Pillars group the 10 services on /services/ and on the Work filters.
export const pillars = [
  { key: "brand", title: "Brand & Story", titleAr: "الهوية والمحتوى", copy: "What the project is called, how it looks and what it says.", slugs: ["brand-identity", "creative-content"] },
  { key: "design", title: "Design & Motion", titleAr: "التصميم والموشن", copy: "Every surface the buyer sees, from a story post to a roadside billboard.", slugs: ["design", "motion-voice-over"] },
  { key: "growth", title: "Digital & Growth", titleAr: "الرقمي والأداء", copy: "Platforms, landing pages, media spend and the numbers behind them.", slugs: ["social-media-management", "web-development", "seo", "paid-media", "performance-marketing"] },
  { key: "field", title: "Production & Field", titleAr: "الإنتاج والميدان", copy: "Drone, film and live coverage on the ground and at the auction hall.", slugs: ["media-production"] }
];

// Arabic names (from the company profile) and a representative image per service.
const meta = {
  "social-media-management": { titleAr: "إدارة منصات التواصل الاجتماعي", image: "/assets/photos/billboards" },
  "creative-content": { titleAr: "صناعة المحتوى الإبداعي", image: "/assets/work/shorfat-914-post" },
  "brand-identity": { titleAr: "تصميم الهويات البصرية والشعارات", image: "/assets/work/dream-3d-26" },
  "design": { titleAr: "تصميم اللوحات الخارجية والسوشيال ميديا", image: "/assets/work/khairat-road" },
  "motion-voice-over": { titleAr: "الموشن جرافيك والتعليق الصوتي", image: "/assets/photos/film-set" },
  "web-development": { titleAr: "تصميم وتطوير المواقع الإلكترونية", image: "/assets/photos/strategy" },
  "seo": { titleAr: "تحسين محركات البحث", image: "/assets/photos/riyadh-night" },
  "paid-media": { titleAr: "الإعلانات الممولة", image: "/assets/work/khairat-road-2" },
  "performance-marketing": { titleAr: "إدارة الأداء التسويقي", image: "/assets/photos/architecture" },
  "media-production": { titleAr: "الإنتاج الإعلامي", image: "/assets/work/shorfat-drone" }
};
for (const s of services) {
  Object.assign(s, meta[s.slug]);
  s.pillar = pillars.find((p) => p.slugs.includes(s.slug)).key;
}
