(() => {
  const page = document.querySelector('[data-me-page]');
  if (!page) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const SplitType = window.SplitType;
  const lottie = window.lottie;
  const html = document.documentElement;

  const nativeReveal = () => {
    const nodes = document.querySelectorAll('[data-me-service],[data-me-proof]');
    if (!('IntersectionObserver' in window)) { nodes.forEach(n => n.classList.add('me-in')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('me-in');
      observer.unobserve(entry.target);
    }), { threshold: .14, rootMargin: '0px 0px -7%' });
    nodes.forEach(node => observer.observe(node));
  };
  nativeReveal();

  if (!gsap || !ScrollTrigger || reduce.matches) {
    html.classList.add('me-motion-reduced');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  html.classList.add('me-motion-ready');

  const progress = document.querySelector('.me-progress span');
  if (progress) gsap.to(progress, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: true } });

  // Kinetic title sequence — typography first, not a generic fade-up.
  const heroTitle = document.querySelector('[data-me-split="hero"]');
  if (heroTitle && SplitType) {
    const heroSplit = new SplitType(heroTitle, { types: 'lines,words', tagName: 'span' });
    gsap.from(heroSplit.lines, { yPercent: 115, opacity: 0, duration: 1.05, stagger: .12, ease: 'power3.out', delay: .12 });
    const demand = heroTitle.querySelector('em');
    if (demand) gsap.fromTo(demand, { color: '#f2e5e2' }, { color: '#ff5258', duration: .75, ease: 'power2.out', delay: .7 });
  }
  gsap.from('.me-hero .me-overline,.me-hero-note,.me-hero-foot', { opacity: 0, y: 16, duration: .7, stagger: .1, ease: 'power2.out', delay: .42 });
  gsap.to('.me-hero-media img', { yPercent: 8, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.me-hero', start: 'top top', end: 'bottom top', scrub: .7 } });
  gsap.to('.me-hero-copy', { yPercent: -10, opacity: .42, ease: 'none', scrollTrigger: { trigger: '.me-hero', start: '42% top', end: 'bottom top', scrub: .7 } });

  // Manifesto uses word rhythm, then color as each line crosses the reading zone.
  document.querySelectorAll('.me-manifesto h2 > span').forEach((line, index) => {
    if (SplitType) {
      const split = new SplitType(line, { types: 'words', tagName: 'span' });
      gsap.from(split.words, { y: 24, opacity: .18, stagger: .04, ease: 'none', scrollTrigger: { trigger: line, start: 'top 86%', end: 'top 50%', scrub: .55 } });
    }
    gsap.to(line, { color: index === 2 ? '#ff5258' : '#f2e5e2', ease: 'none', scrollTrigger: { trigger: line, start: 'top 74%', end: 'top 43%, scrub: .45 } });
  });

  // Story chapters: CSS sticky owns the hold; scroll position directly blends the four scenes.
  const storyTrack = document.querySelector('[data-me-story-track]');
  const chapters = gsap.utils.toArray('[data-me-chapter]');
  const storyRule = document.querySelector('.me-story-rule span');
  if (storyTrack && chapters.length) {
    const segment = 1 / chapters.length;
    const fadeWindow = Math.min(0.065, segment * 0.32);
    const renderStory = (progress) => {
      const p = gsap.utils.clamp(0, 1, progress);
      const activeIndex = Math.min(chapters.length - 1, Math.floor(Math.min(0.999999, p) * chapters.length));
      chapters.forEach((chapter, index) => {
        const start = index * segment;
        const end = (index + 1) * segment;
        const enter = index === 0 ? 1 : gsap.utils.clamp(0, 1, (p - (start - fadeWindow / 2)) / fadeWindow);
        const exit = index === chapters.length - 1 ? 1 : 1 - gsap.utils.clamp(0, 1, (p - (end - fadeWindow / 2)) / fadeWindow);
        const visibility = Math.min(enter, exit);
        chapter.classList.toggle('is-active', index === activeIndex);
        gsap.set(chapter, { opacity: visibility, zIndex: index === activeIndex ? 3 : 2 });
        const image = chapter.querySelector('img');
        const copy = chapter.querySelector('.me-chapter-copy > div:last-child');
        if (image) gsap.set(image, { scale: 1.04 + (1 - visibility) 0.035 });
        if (copy) gsap.set(copy, { y: (1 - visibility) * 24 });
      });
      if (storyRule) gsap.set(storyRule, { scaleX: 0.25 + p * 0.75 });
      storyTrack.dataset.meChapter = String(activeIndex + 1);
    };
    renderStory(0);
    ScrollTrigger.create({
      trigger: storyTrack,
      start: 'top top',
      end: 'bottom bottom',
      invalidateOnRefresh: true,
      onUpdate(self) { renderStory(self.progress); },
      onRefresh(self) { renderStory(self.progress); }
    });
  }

  // Full-screen project scenes: native sticky + subtle media depth.
  gsap.utils.toArray('[data-me-project]').forEach(scene => {
    const image = scene.querySelector('.me-project-media img');
    const copy = scene.querySelector('.me-project-copy');
    if (image) gsap.fromTo(image, { yPercent: -3.5, scale: 1.055 }, { yPercent: 3.5, scale: 1, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: 0.65 } });
    if (copy) gsap.from(copy, { y: 34, opacity: 0, duration: 0.65, ease: 'power2.out', scrollTrigger: { trigger: scene, start: 'top 58%', toggleActions: 'play none none reverse' } });
  });

  const statement = document.querySelector('[data-me-split="statement"]');
  if (statement && SplitType) {
    const split = new SplitType(statement, { types: 'words', tagName: 'span' });
    gsap.from(split.words, { yPercent: 80, opacity: 0, stagger: 0.035, ease: 'none', scrollTrigger: { trigger: statement, start: 'top 88%', end: 'top 47%, scrub: 0.55 } });
  }

  // Field × Digital: one sticky scene with three scroll-linked beats — separate, converge, resolve.
  const convergence = document.querySelector('[data-me-convergence]');
  const convergenceTrack = document.querySelector('.me-convergence-track');
  const lottieContainer = document.getElementById('meLottie');
  const center = document.querySelector('.me-system-center');
  const fieldLabel = document.querySelector('.me-system-label--field');
  const digitalLabel = document.querySelector('.me-system-label--digital');
  let convergenceAnimation = null;
  let convergenceProgress = 0;

  const renderConvergence = (progress) => {
    const p = gsap.utils.clamp(0, 1, progress);
    convergenceProgress = p;
    const convergeP = gsap.utils.clamp(0, 1, (p - 0.18) / 0.52);
    const resolveP = gsap.utils.clamp(0, 1, (p - 0.68) / 0.22);
    const phase = p < 0.28 ? 'separate' : p < 0.72 ? 'converge' : 'resolve';
    if (convergence) convergence.dataset.mePhase = phase;
    if (convergenceAnimation) {
      const frameP = gsap.utils.clamp(0, 1, (p - 0.06) / 0.86);
      convergenceAnimation.goToAndStop(Math.round(frameP * Math.max(1, convergenceAnimation.totalFrames - 1)), true);
    }
    if (fieldLabel) gsap.set(fieldLabel, { x: 20 * convergeP, opacity: 1 - 0.48 * resolveP });
    if (digitalLabel) gsap.set(digitalLabel, { x: -20 * convergeP, opacity: 1 - 0.48 * resolveP });
    if (lottieContainer) gsap.tset(lottieContainer, { scale: 0.94 + 0.06 * convergeP, opacity: 0.72 + 0.28 * convergeP });
    if (center) gsap.tset(center, { opacity: resolveP, scale: 0.9 + 0.1 * resolveP });
  };

  if (convergence && convergenceTrack) {
    renderConvergence(0);
    ScrollTriggger.create({
      trigger: convergenceTrack,
      start: 'top top',
      end: 'bottom bottom',
      invalidateOnRefresh: true,
      onUpdate(self) { renderConvergence(self.progress); },
      onRefresh(self) { renderConvergence(self.progress); }
    });
  }

  if (convergence && lottieContainer && lottie) {
    try {
      const animation = lottie.loadAnimation({ container: lottieContainer, renderer: 'svg', loop: false, autoplay: false, path: '/assets/campaign-system.json', rendererSettings: { preserveAspectRatio: 'xMidYMid meet' } });
      animation.addEventListener('DOMLoaded', () => {
        convergenceAnimation = animation;
        const fallback = lottieContainer.querySelector('.me-lottie-fallback');
        if (fallback) fallback.remove();
        lottieContainer.classList.add('is-lottie');
        renderConvergence(convergenceProgress);
        ScrollTriggger.refresh();
      });
    } catch {}
  }

  gsap.utils.toArray('[data-me-service]').forEach(item => gsap.fromTo(item, { y: 16, opacity: 0.3 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 63', scrub: 0.35 } }));
  gsap.utils.toArray('[data-me-proof]').forEach((item, index) => gsap.fromTo(item, { xPercent: index % 2 ? 4 : -3 }, { xPercent: index % 2 ? -1 : 1, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 0.55 } }));
  gsap.fromTo('.me-partners figure img', { yPercent: -4, scale: 1.04 }, { yPercent: 4, scale: 1, ease: 'none', scrollTrigger: { trigger: '.me-partners', start: 'top bottom', end: 'bottom top', scrub: 0.55 } });

  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  addEventListener('load', refresh, { once: true });
  addEventListener('orientationchange', () => setTimeout(refresh, 240), { passive: true });
})();
