export const projects = [
  {
    slug: "shorfat-al-haram", title: "Shorfat Al Haram", location: "Makkah", type: "914 residential & commercial plots",
    image: "/assets/shorfat.webp", alt: "Shorfat Al Haram campaign work including booklet, landing page and social media designs",
    services: ["Landing page", "Project booklet", "Media coverage", "Social design", "Outdoor", "Brochure", "Advertising videos"],
    serviceSlugs: ["web-development", "creative-content", "design", "media-production", "paid-media", "performance-marketing", "social-media-management"]
  },
  {
    slug: "malqa-taif", title: "Malqa Taif", location: "Taif", type: "149 plots",
    image: "/assets/malqa.webp", alt: "Malqa Taif real estate campaign identity and marketing materials",
    services: ["Landing page", "Company profile", "Influencer videos", "Social media", "Marketing plan", "Outdoor", "Project booklet"],
    serviceSlugs: ["web-development", "creative-content", "social-media-management", "design", "paid-media", "performance-marketing", "seo"]
  },
  {
    slug: "khairat-taibah", title: "Khairat Taibah", location: "Taibah", type: "Hybrid auction · 8 properties",
    image: "/assets/khairat.webp", alt: "Khairat Taibah auction campaign visuals and outdoor advertising",
    services: ["Roadside billboards", "Venue materials", "TV & radio advertising", "Social media", "Live event coverage", "Project booklet"],
    serviceSlugs: ["design", "social-media-management", "media-production", "creative-content"]
  },
  {
    slug: "dream-land", title: "Dream Land", location: "Taif", type: "Hybrid auction · 322 plots",
    image: "/assets/dreamland.webp", alt: "Dream Land auction branding and campaign materials",
    services: ["Visual identity", "Roadside campaign", "Brochure", "Venue print", "Social media", "Drone filming", "Auction booklet"],
    serviceSlugs: ["brand-identity", "design", "social-media-management", "media-production", "creative-content", "paid-media"]
  },
  {
    slug: "nukhbat-al-taif", title: "Nukhbat Al Taif", location: "Taif", type: "Hybrid auction · 7 lands",
    image: "/assets/nukhbat-taif.webp", alt: "Nukhbat Al Taif auction social media and campaign design",
    services: ["Auction booklet", "Live coverage", "Venue materials", "Advertising videos", "Roadside billboards", "Social media"],
    serviceSlugs: ["creative-content", "media-production", "design", "motion-voice-over", "social-media-management", "brand-identity"]
  },
  {
    slug: "osoul-makkah", title: "Osoul Makkah", location: "Makkah", type: "Hybrid auction · 7 properties",
    image: "/assets/osoul-makkah.webp", alt: "Osoul Makkah auction identity, signage and social media design",
    services: ["Visual identity", "Roadside billboards", "Printed brochure", "Venue materials", "Auction booklet", "Social media", "Advertising videos"],
    serviceSlugs: ["brand-identity", "design", "creative-content", "social-media-management", "motion-voice-over"]
  }
];

export const getProject = (slug) => projects.find((item) => item.slug === slug);
