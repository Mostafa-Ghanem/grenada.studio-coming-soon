export const projects = [
  {
    slug: "shorfat-al-haram", title: "Shorfat Al Haram", location: "Makkah", type: "914 residential & commercial plots",
    image: "/assets/work/shorfat-site-1.webp", imageM: "/assets/work/shorfat-site-1-m.webp",
    gallery: [["shorfat-site-2","Aerial view of the Shorfat Al Haram plots among the Makkah mountains"],["shorfat-drone","Drone shot of the Shorfat Al Haram masterplan at golden hour"],["shorfat-site-4","Wide aerial of the Shorfat Al Haram site and surrounding districts"],["shorfat-914-post","Shorfat Al Haram social media post announcing 914 plots"]],
    facts: [["914","residential & commercial plots"],["1.3M+ m²","total land area"],["Makkah","location"]], alt: "Aerial drone photograph of the Shorfat Al Haram site in Makkah",
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
    image: "/assets/work/khairat-road.webp", imageM: "/assets/work/khairat-road-m.webp",
    gallery: [["khairat-road-2","Khairat Taibah digital billboard at a Madinah intersection"]],
    facts: [["~2M","campaign views"],["3,207","auction page visits"],["293","auction visitors"],["25","registered bidders"]], alt: "Khairat Taibah auction billboard on a Madinah road",
    services: ["Roadside billboards", "Venue materials", "TV & radio advertising", "Social media", "Live event coverage", "Project booklet"],
    serviceSlugs: ["design", "social-media-management", "media-production", "creative-content"]
  },
  {
    slug: "dream-land", title: "Dream Land", location: "Taif", type: "Hybrid auction · 322 plots",
    image: "/assets/work/dream-3d-25.webp", imageM: "/assets/work/dream-3d-25-m.webp",
    gallery: [["dream-3d-23","3D render of Dream Land villas at sunset"],["dream-3d-26","3D render of the Dream Land central park"],["dream-3d-fx","3D render of Dream Land with its mosque at dusk"]],
    facts: [["322","residential & commercial plots"],["Hybrid","auction format"],["Taif","location"]], alt: "3D render of the Dream Land community in Taif at sunset",
    services: ["Visual identity", "Roadside campaign", "Brochure", "Venue print", "Social media", "Drone filming", "Auction booklet"],
    serviceSlugs: ["brand-identity", "design", "social-media-management", "media-production", "creative-content", "paid-media"]
  },
  {
    slug: "nukhbat-al-taif", title: "Nukhbat Al Taif", location: "Taif", type: "Hybrid auction · 7 lands",
    image: "/assets/work/nukhbat-sign-3.webp", imageM: "/assets/work/nukhbat-sign-3-m.webp",
    gallery: [["nukhbat-sign-1","Nukhbat Al Taif on-site auction sign in Al Hada"],["nukhbat-sign-2","Crew installing a Nukhbat Al Taif on-site sign"]],
    facts: [["7","commercial, agricultural & residential lands"],["Hybrid","auction format"],["Taif","location"]], alt: "Nukhbat Al Taif auction sign installed on site in Taif",
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
