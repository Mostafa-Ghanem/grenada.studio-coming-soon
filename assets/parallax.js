
(() => {
  const page = document.querySelector('.parallax-page [data-px-hero]');
  if (!page) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 820px)');
  const root = document.documentElement;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  const revealNative = () => {
    const nodes = document.querySelectorAll('.px-project, .px-capability, .px-proof-row, .px-closing-grid');
    const obs = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.classList.add('px-in');
        obs.unobserve(entry.target);
      }
    }, { threshold: .12, rootMargin: '0px 0px -8%' });
    nodes.forEach((node) => obs.observe(node));
  };
  revealNative();

  if (!gsap || !ScrollTrigger || reduce.matches) {
    root.classList.add('px-motion-reduced');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  root.classList.add('px-gsap');
  const mm = gsap.matchMedia();

  gsap.to('.px-progress span', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: true }
  });

  const heroTl = gsap.timeline({
    scrollTrigger: { trigger: '.px-hero', start: 'top top', end: 'bottom top', scrub: .7 }
  });
  heroTl.to('.px-hero-image', { yPercent: 13, scale: 1.10, ease: 'none' }, 0)
        .to('.px-hero-gridfx', { yPercent: 7, ease: 'none' }, 0)
        .to('.px-hero-copy', { yPercent: -18, opacity: .28, ease: 'none' }, 0)
        .to('.px-hero-foot', { yPercent: -35, opacity: 0, ease: 'none' }, 0);

  const words = gsap.utils.toArray('.px-word');
  words.forEach((word, index) => gsap.to(word, {
    color: index === words.length - 1 ? '#ff5258' : '#f2e5e2',
    ease: 'none',
    scrollTrigger: { trigger: word, start: 'top 72%', end: 'top 43%', scrub: .55 }
  }));

  mm.add('(min-width: 821px)', () => {
    const steps = gsap.utils.toArray('.px-story-step');
    const frames = gsap.utils.toArray('.px-story-frame');
    gsap.set(steps, { opacity: .28 });
    gsap.set(frames, { autoAlpha: 0, scale: 1.035 });
    gsap.set(steps[0], { opacity: 1 });
    gsap.set(frames[0], { autoAlpha: 1, scale: 1 });

    const story = gsap.timeline({
      scrollTrigger: {
        trigger: '.px-story-stage',
        start: 'top 12%',
        end: '+=260%',
        pin: true,
        scrub: .75,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    steps.forEach((step, i) => {
      const label = `stage${i}`;
      story.addLabel(label, i);
      if (i > 0) {
        story.to(steps[i - 1], { opacity: .22, y: -12, duration: .28 }, label)
             .to(frames[i - 1], { autoAlpha: 0, scale: .985, duration: .32 }, label)
             .fromTo(frames[i], { autoAlpha: 0, scale: 1.045, yPercent: 3 }, { autoAlpha: 1, scale: 1, yPercent: 0, duration: .42 }, label + '+=.05')
             .to(step, { opacity: 1, y: 0, duration: .35 }, label + '+=.08');
      }
    });
    gsap.to('.px-story-counter i', {
      '--px-story-progress': 1,
      scrollTrigger: { trigger: '.px-story-stage', start: 'top 12%', end: '+=260%', scrub: true }
    });

    gsap.utils.toArray('.px-project').forEach((scene) => {
      const image = scene.querySelector('.px-project-media img');
      const number = scene.querySelector('.px-project-number');
      const info = scene.querySelector('.px-project-info');
      gsap.fromTo(image, { yPercent: -8, scale: 1.065 }, { yPercent: 8, scale: 1, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: .8 } });
      gsap.from(number, { y: 60, opacity: 0, ease: 'none', scrollTrigger: { trigger: scene, start: 'top 68%', end: 'top 38%', scrub: .55 } });
      gsap.from(info, { y: 42, opacity: 0, duration: .7, scrollTrigger: { trigger: scene, start: 'top 56%', toggleActions: 'play none none reverse' } });
    });

    gsap.fromTo('.px-plane-field', { xPercent: -7, yPercent: 3 }, { xPercent: 5, yPercent: -3, ease: 'none', scrollTrigger: { trigger: '.px-convergence-stage', start: 'top bottom', end: 'bottom top', scrub: .8 } });
    gsap.fromTo('.px-plane-digital', { xPercent: 7, yPercent: -3 }, { xPercent: -5, yPercent: 3, ease: 'none', scrollTrigger: { trigger: '.px-convergence-stage', start: 'top bottom', end: 'bottom top', scrub: .8 } });
    gsap.fromTo('.px-convergence-word', { scale: .84, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.px-convergence-stage', start: 'top 68%', end: 'center 48%', scrub: .6 } });

    gsap.utils.toArray('.px-capability').forEach((item) => {
      const depth = Number(item.dataset.depth || 1);
      gsap.fromTo(item, { y: 18 + depth * 13, opacity: .22 }, { y: -(depth * 9), opacity: 1, ease: 'none', scrollTrigger: { trigger: item, start: 'top 88%', end: 'bottom 34%', scrub: .65 } });
    });

    gsap.utils.toArray('[data-px-proof]').forEach((item, i) => gsap.fromTo(item, { xPercent: i % 2 ? 7 : -5 }, { xPercent: i % 2 ? -3 : 3, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: .7 } }));
    gsap.fromTo('.px-partners-media img', { yPercent: -6, scale: 1.04 }, { yPercent: 6, scale: 1, ease: 'none', scrollTrigger: { trigger: '.px-partners', start: 'top bottom', end: 'bottom top', scrub: .8 } });
  });

  mm.add('(max-width: 820px)', () => {
    gsap.utils.toArray('.px-story-step').forEach((step) => gsap.from(step, { y: 30, opacity: 0, duration: .55, scrollTrigger: { trigger: step, start: 'top 84%', toggleActions: 'play none none none' } }));
    gsap.utils.toArray('.px-story-frame').forEach((frame) => gsap.fromTo(frame.querySelector('img'), { yPercent: -4, scale: 1.04 }, { yPercent: 4, scale: 1, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: .6 } }));
    gsap.utils.toArray('.px-project').forEach((scene) => {
      const image = scene.querySelector('.px-project-media img');
      gsap.fromTo(imae, { yPercent: -4, scale: 1.035 }, { yPercent: 4, scale: 1, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: .55 } });
    });
    gsap.utils.toArray('.px-capability').forEach((item) => gsap.from(item, { y: 22, opacity: 0, duration: .45, scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none none' } }));
  });

  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  addEventListener('load', refresh, { once: true });
  addEventListener('orientationchange', () => setTimeout(refresh, 240), { passive: true });
})();
