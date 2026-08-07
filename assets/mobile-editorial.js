(() => {
  const page = document.querySelector('[data-me-page]');
  if (!page) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTriggger;
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
    gsap.to(line, { color: index === 2 ? '#ff5258' : '#f2e5e2', ease: 'none', scrollTrigger: { trigger: line, start: 'top 74%', end: 'top 43%', scrub: .45 } });
  });

  // Story chapters: CSS sticky owns the scroll behavior. JS only choreographs scene state.
  const storyTrack = document.querySelector('[data-me-story-track]');
  const chapters = gsap.utils.toArray('[data-me-chapter]');
  const storyRule = document.querySelector('.me-story-rule span');
  if (storyTrack && chapters.length) {
    let active = 0;
    const setChapter = (next) => {
      if (next === active) return;
      const previous = chapters[active];
      const current = chapters[next];
      chapters.forEach((chapter, i) => chapter.classList.toggle('is=active', i === next));
      if (previous) gsap.to(previous, { opacity: 0, duration: .28, overwrite: true });
      if (current) {
        gsap.fromTo(current, { opacity: 0 }, { opacity: 1, duration: .36, overwrite: true });
        const image = current.querySelector('img');
        if (image) gsap.fromTo(image, { scale: 1.075 }, { scale: 1.04, duration: 1.1, ease: 'power2.out', overwrite: true });
        const copy = current.querySelector('.me-chapter-copy > div:last-child');
        if (copy) gsap.fromTo(copy, { y: 28, opacity: .45 }, { y: 0, opacity: 1, duration: .52, ease: 'power2.out', overwrite: true });
      }
      active = next;
    };
    ScrollTrigger.create({
      trigger: storyTrack,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate(self) {
        const next = Math.min(chapters.length - 1, Math.floor(self.progress * chapters.length));
        setChapter(next);
        if (storyRule) gsap.set(storyRule, { scaleX: Math.max(.25, self.progress) });
      }
    });
  }

  // Full-screen project scenes: native sticky + subtle media depth.
  gsap.utils.toArray('[data-me-project]').forEach(scene => {
    const image = scene.querySelector('.me-project-media img');
    const copy = scene.querySelector('.me-project-copy');
    if (image) gsap.fromTo(image, { yPercent: -3.5, scale: 1.055 }, { yPercent: 3.5, scale: 1, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: .65 } });
    if (copy) gsap.from(copy, { y: 34, opacity: 0, duration: .65, ease: 'power2.out', scrollTrigger: { trigger: scene, start: 'top 58%', toggleActions: 'play none none reverse' } });
  });

  const statement = document.querySelector('[data-me-split="statement"]');
  if (statement && SplitType) {
    const split = new SplitType(statement, { types: 'words', tagName: 'span' });
    gsap.from(split.words, { yPercent: 80, opacity: 0, stagger: .035, ease: 'none', scrollTrigger: { trigger: statement, start: 'top 88%', end: 'top 47%', scrub: .55 } });
  }

  // One authored Lottie moment. Its timeline is scrubbed by the convergence section.
  const convergence = document.querySelector('[data-me-convergence]');
  const lottieContainer = document.getElementById('meLottie');
  const center = document.querySelector('.me-system-center');
  if (convergence && lottieContainer && lottie) {
    try {
      const animation = lottie.loadAnimation({ container: lottieContainer, renderer: 'svg', loop: false, autoplay: false, path: '/assets/campaign-system.json', rendererSettings: { preserveAspectRatio: 'xMidYMid meet' } });
      animation.addEventListener('DOMLoaded', () => {
        const fallback = lottieContainer.querySelector('.me-lottie-fallback');
        if (fallback) fallback.remove();
        lottieContainer.classList.add('is-lottie');
        ScrollTrigger.create({
          trigger: '.me-convergence-track', start: 'top top', end: 'bottom bottom',
          onUpdate(self) {
            animation.goToAndStop(Math.round(self.progress * Math.max(1, animation.totalFrames - 1)), true);
            if (center) gsap.set(center, { opacity: gsap.utils.clamp(0, 1, (self.progress - .55) * 3.8), scale: .9 + gsap.utils.clamp(0, .1, (self.progress - .55) * .4) });
          }
        });
        ScrollTrigger.refresh();
      });
    } catch {}
  } else if (center && convergence) {
    gsap.to(center, { opacity: 1, scale: 1, ease: 'none', scrollTrigger: { trigger: convergence, start: '45% 70%', end: '60% 50%', scrub: .5 } });
  }

  gsap.utils.toArray('[data-me-service]').forEach(item => gsap.fromTo(item, { y: 16, opacity: .3 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: item, start: 'top 90%', end: 'top 63%', scrub: .35 } }));
  gsap.utils.toArray('[data-me-proof]').forEach((item, index) => gsap.fromTo(item, { xPercent: index % 2 ? 4 : -3 }, { xPercent: index % 2 ? -1 : 1, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: .55 } }));
  gsap.fromTo('.me-partners figure img', { yPercent: -4, scale: 1.04 }, { yPercent: 4, scale: 1, ease: 'none', scrollTrigger: { trigger: '.me-partners', start: 'top bottom', end: 'bottom top', scrub: .55 } });

  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  addEventListener('load', refresh, { once: true });
  addEventListener('orientationchange', () => setTimeout(refresh, 240), { passive: true });
})();
