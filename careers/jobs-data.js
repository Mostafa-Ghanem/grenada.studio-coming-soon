/* ============================================================
   Grenada Studio — Careers — JOBS DATA
   ⭐ To add / edit / remove a job, ONLY edit this file.
   Each job object:
     id        → used in the URL:  job.html?id=<id>   (kebab-case, unique)
     title     → job title shown everywhere
     category  → e.g. "Marketing" / "Creative" / "Sales" (accent tag + eyebrow)
     tags      → extra tags on the card & page (location, type…)
     cardDesc  → short description on the careers listing card
     metaDesc  → <meta name="description"> + og:description for sharing/SEO
     sections  → the page body: {h: heading, p: paragraph} or {h, list: [...]}
     footnoteHtml → small note under the body (HTML allowed, optional)
     link      → the URL field in the form:
                 {label, placeholder, required}  → required:true shows it
                 in the main form; required:false tucks it in "optional"
     extraLabel→ label of the "add optional info" button
     applyEmail→ email shown in the footer of the job page
   ============================================================ */
window.GS_JOBS = [
  {
    id: 'social-media-seo-specialist',
    title: 'Social Media & SEO Specialist',
    category: 'Marketing',
    tags: ['On-site · Cairo', 'Full-time'],
    cardDesc: 'A numbers-driven specialist who leads content and strategy across social platforms and owns SEO to drive measurable traffic and leads.',
    metaDesc: 'Open role: Social Media & SEO Specialist at Grenada Studio, a real estate marketing agency in Cairo. 5 years’ experience in social media management and SEO.',
    sections: [
      { h: 'About the role',
        p: 'We’re hiring a numbers-driven professional who speaks the language of analytics and delivers measurable results. You’ll develop strategies, create innovative ideas, and lead content across our social media platforms — and you’re also responsible for following up on customer inquiries through our various digital channels.' },
      { h: 'What you’ll do',
        list: [
          'Develop social media strategies and lead content across all platforms.',
          'Create innovative ideas and campaigns that grow reach and engagement.',
          'Own SEO — improve search rankings and organic traffic across our sites and clients.',
          'Follow up on customer inquiries through our various digital channels.',
          'Track performance with analytics and turn the numbers into measurable results.',
        ] },
      { h: 'What we’re looking for',
        list: [
          '5 years of experience in Social Media Management as well as Search Engine Optimization (SEO).',
          'Comfortable reading analytics and making decisions from the data.',
          'A Bachelor’s degree in Marketing, Business Administration, Media, Information Technology, or any related field is preferred.',
          'Passionate about digital marketing and delivering measurable results.',
        ] },
      { h: 'Tools — full proficiency required',
        list: [
          'Google Analytics',
          'Google Search Console',
          'Google Tag Manager',
          'SEMrush, Ahrefs, or SimilarWeb',
        ] },
    ],
    footnoteHtml: 'On-site in Cairo · Full-time. If you’re passionate about digital marketing and delivering measurable results, we’d love to hear from you.',
    link: { label: 'LinkedIn profile URL', placeholder: 'linkedin.com/in/you', required: false },
    extraLabel: 'Add phone & LinkedIn (optional)',
    applyEmail: 'careers@grenadastudio.com',
  },

  {
    id: 'video-editor',
    title: 'Video Editor',
    category: 'Creative',
    tags: ['On-site · Cairo', 'Full-time'],
    cardDesc: 'Specialized in real estate content — cinematic editing, motion graphics and camera tracking that make property videos stand out.',
    metaDesc: 'Open role: Video Editor specialized in real estate content at Grenada Studio, Cairo. Cinematic editing, motion graphics and camera tracking.',
    sections: [
      { h: 'About the role',
        p: 'We are looking for a highly skilled Video Editor specialized in real estate content. The ideal candidate has strong experience creating engaging property videos, combining cinematic editing with professional visual storytelling to bring real estate projects to life.' },
      { h: 'Responsibilities',
        list: [
          'Edit high-quality real estate videos — properties, lands and projects.',
          'Create dynamic visual presentations using motion graphics and infographics.',
          'Apply camera tracking techniques to integrate graphics seamlessly into real scenes.',
          'Enhance videos with smooth transitions, color grading and sound design.',
          'Collaborate with the team to deliver visually compelling content that highlights property value.',
        ] },
      { h: 'Requirements',
        list: [
          'Minimum 3 years of experience as a Video Editor in the real estate field.',
          'Strong proficiency in Adobe Premiere Pro and After Effects.',
          'Advanced skills in camera tracking and motion graphics (infographics, overlays).',
          'Ability to create professional, clean visual styles suitable for real estate marketing.',
          'Strong attention to detail and storytelling skills.',
        ] },
      { h: 'Additional requirements',
        list: [
          'Must submit a portfolio including real estate and land projects.',
          'A short video editing task will be required as part of the hiring process.',
        ] },
    ],
    footnoteHtml: 'On-site in Cairo · Full-time. Add your portfolio / reel link when you apply. Prefer email? Send your CV &amp; portfolio to <a href="mailto:job@grenadastudio.com" style="color:var(--red-2);">job@grenadastudio.com</a>. Join us to design impactful visuals that bring real estate projects to life.',
    link: { label: 'Portfolio / reel URL', placeholder: 'Link to your real estate & land reel', required: true },
    extraLabel: 'Add phone number (optional)',
    applyEmail: 'job@grenadastudio.com',
  },

  {
    id: 'sales-representative',
    title: 'Sales Representative',
    category: 'Sales',
    tags: ['On-site · KSA', 'Full-time'],
    cardDesc: 'Connects with potential clients, pitches products or services, and closes business deals.',
    metaDesc: 'Open role: Sales Representative at Grenada Studio, a real estate marketing agency in Cairo.',
    sections: [
      { h: 'About the role',
        p: 'You’ll grow Grenada Studio’s client base — reaching out to real estate developers and brokers, pitching our marketing services, and closing deals. You’re the first person a potential client talks to, and the one who turns interest into signed work.' },
      { h: 'What you’ll do',
        list: [
          'Prospect and connect with potential clients across the real estate sector.',
          'Pitch our services — brand, content, campaigns — and tailor proposals to each client.',
          'Run the full cycle: first call, follow-up, negotiation and close.',
          'Keep the pipeline and CRM clean, and hit monthly targets.',
          'Work with the marketing team to hand off won clients smoothly.',
        ] },
      { h: 'What we’re looking for',
        list: [
          '2+ years in sales or business development, ideally in real estate, media or agency work.',
          'Confident communicator who’s comfortable pitching and negotiating.',
          'Self-driven, organized, and motivated by targets.',
          'Fluent Arabic and good English; a network in real estate is a big plus.',
        ] },
    ],
    footnoteHtml: 'On-site in KSA · Full-time · Base plus commission.',
    link: { label: 'LinkedIn profile URL', placeholder: 'linkedin.com/in/you', required: false },
    extraLabel: 'Add phone & LinkedIn (optional)',
    applyEmail: 'careers@grenadastudio.com',
  },
];
