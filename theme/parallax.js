(() => {
  const hero = document.querySelector('.parallax-page [data-px-hero]');
  if (!hero) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const root = document.documentElement;
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  /* ---------- Count-up numbers (works with or without GSAP) ---------- */
  const fmt = (n) => Math.round(n).toLocaleString('en-US');
  const countUp = (el) => {
    const target = Number(el.dataset.count);
    if (!target || reduce) return;
    const start = performance.now(), dur = 1400;
    const tick = (t) => {
      const k = Math.min(1, (t - start) / dur);
      el.textContent = fmt(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    };
    el.textContent = '0';
    requestAnimationFrame(tick);
  };
  const countObs = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { countUp(e.target); countObs.unobserve(e.target); }
  }), { threshold: .6 });
  document.querySelectorAll('[data-count]').forEach((el) => countObs.observe(el));

  /* ---------- Native reveal fallback ---------- */
  const revealObs = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('px-in'); revealObs.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -8%' });
  document.querySelectorAll('.px-project, .px-capability, .px-proof-row, .px-closing-grid, .pw-head').forEach((n) => revealObs.observe(n));

  /* ---------- Mobile CTA dock: visible after the hero, hidden near the closing CTA ---------- */
  const dock = document.querySelector('.px-dock');
  const closing = document.querySelector('.px-closing');
  if (dock) {
    let pastHero = false, atClose = false;
    const sync = () => dock.classList.toggle('is-on', pastHero && !atClose);
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; sync(); }).observe(hero);
    // Hide the dock while the closing CTA or the footer is on screen.
    const ends = [closing, document.querySelector('footer')].filter(Boolean);
    const seen = new Set();
    const endObs = new IntersectionObserver((entries) => { entries.forEach((e) => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)); atClose = seen.size > 0; sync(); });
    ends.forEach((el) => endObs.observe(el));
  }

  /* ---------- Story step indicator (text counter) ---------- */
  const storyNow = document.querySelector('.px-story-now');
  const setStage = (i) => {
    if (storyNow) storyNow.textContent = String(i + 1).padStart(2, '0');
    document.querySelectorAll('.px-story-step').forEach((s, j) => s.classList.toggle('is-active', j === i));
  };

  if (!gsap || !ScrollTrigger || reduce) {
    root.classList.add('px-motion-reduced');
    document.querySelectorAll('.hw-in').forEach((w) => { w.style.transform = 'none'; });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  root.classList.add('px-gsap');
  const mm = gsap.matchMedia();
  gsap.set('.hw-in', { yPercent: 110 });

  /* ---------- Page progress ---------- */
  gsap.to('.px-progress span', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: true } });

  /* ---------- Hero entrance (after the logo intro) ---------- */
  const intro = document.getElementById('intro');
  const introDelay = intro ? 1.35 : .1;
  gsap.timeline({ delay: introDelay, defaults: { ease: 'power4.out' } })
    .fromTo('.px-hero-image', { scale: 1.18 }, { scale: 1.04, duration: 2.4, ease: 'power2.out' }, 0)
    .fromTo('.hw-in', { yPercent: 110, rotate: 4 }, { yPercent: 0, rotate: 0, duration: 1.2, stagger: .07 }, .1)
    .from('.px-hero-desc, .px-hero-actions, .px-hero-top, .px-hero-foot', { y: 24, opacity: 0, duration: .9, stagger: .08 }, .55);

  /* ---------- Hero scroll-away ---------- */
  gsap.timeline({ scrollTrigger: { trigger: '.px-hero', start: 'top top', end: 'bottom top', scrub: .7 } })
    .to('.px-hero-media', { yPercent: 14, ease: 'none' }, 0)
    .to('.px-hero-copy', { yPercent: -16, opacity: .2, ease: 'none' }, 0)
    .to('.px-hero-foot', { yPercent: -40, opacity: 0, ease: 'none' }, 0);

  /* ---------- Manifesto: words light up as you read ---------- */
  const words = gsap.utils.toArray('.px-word');
  words.forEach((word, i) => gsap.to(word, {
    color: i === words.length - 1 ? '#ff5258' : '#f2e5e2', ease: 'none',
    scrollTrigger: { trigger: word, start: 'top 78%', end: 'top 48%', scrub: .5 }
  }));

  /* ---------- Section headings: masked rise ---------- */
  gsap.utils.toArray('.px-story-head h2, .px-work-intro h2, .px-convergence-head h2, .px-capabilities-head h2, .pw-head h2, .px-closing h2').forEach((h) => {
    gsap.from(h, { yPercent: 30, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 85%' } });
  });

  /* ---------- Story (desktop): pinned, frames swap with scroll ---------- */
  const steps = gsap.utils.toArray('.px-story-step');
  const frames = gsap.utils.toArray('.px-story-frame');
  mm.add('(min-width: 821px)', () => {
    gsap.set(frames, { autoAlpha: 0 });
    gsap.set(frames[0], { autoAlpha: 1 });
    gsap.set(steps, { opacity: .25 });
    gsap.set(steps[0], { opacity: 1 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.px-story-stage', start: 'top 12%', end: `+=${steps.length * 55}%`,
        pin: true, scrub: .5, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (self) => setStage(Math.min(steps.length - 1, Math.round(self.animation.time())))
      }
    });
    steps.forEach((step, i) => {
      if (!i) return;
      const at = i - .5;
      tl.to(frames[i - 1], { autoAlpha: 0, scale: .96, duration: .45 }, at)
        .fromTo(frames[i], { autoAlpha: 0, scale: 1.12, clipPath: 'inset(18% 0% 18% 0% round 22px)' }, { autoAlpha: 1, scale: 1, clipPath: 'inset(0% 0% 0% 0% round 22px)', duration: .55 }, at)
        .to(steps[i - 1], { opacity: .25, duration: .35 }, at)
        .fromTo(step, { opacity: .25 }, { opacity: 1, duration: .35 }, at + .15);
    });
    tl.to({}, { duration: .5 });
    gsap.to('.px-story-counter i', { '--px-story-progress': 1, ease: 'none', scrollTrigger: { trigger: '.px-story-stage', start: 'top 12%', end: `+=${steps.length * 55}%`, scrub: true } });
    return () => gsap.set([...steps, ...frames], { clearProps: 'all' });
  });

  /* ---------- Story (mobile): pinned horizontal deck, next card peeks in from the right ---------- */
  mm.add('(max-width: 820px)', () => {
    const track = document.querySelector('.px-deck-track');
    const cards = gsap.utils.toArray('.px-deck-card');
    const now = document.querySelector('.px-deck-now');
    if (!track || cards.length < 2) return;
    const distance = () => track.scrollWidth - track.parentElement.clientWidth;
    gsap.set(cards.slice(1), { scale: .9, opacity: .55 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.px-deck', start: 'top top+=76', end: () => `+=${distance() * .9}`,
        pin: true, scrub: .35, anticipatePin: 1, invalidateOnRefresh: true,
        snap: { snapTo: 1 / (cards.length - 1), duration: { min: .15, max: .35 }, ease: 'power2.out' },
        onUpdate: (self) => { if (now) now.textContent = String(Math.round(self.progress * (cards.length - 1)) + 1).padStart(2, '0'); }
      }
    });
    tl.to(track, { x: () => -distance(), ease: 'none', duration: cards.length - 1 }, 0)
      .to('.px-deck-bar b', { scaleX: 1, ease: 'none', duration: cards.length - 1 }, 0);
    cards.forEach((card, i) => {
      if (i) tl.to(card, { scale: 1, opacity: 1, ease: 'none', duration: 1 }, i - 1);
      if (i < cards.length - 1) tl.to(card, { scale: .9, opacity: .55, ease: 'none', duration: 1 }, i);
    });
    return () => gsap.set([track, ...cards], { clearProps: 'all' });
  });

  /* ---------- Projects: clip-path unveil + parallax image ---------- */
  gsap.utils.toArray('.px-project').forEach((scene) => {
    const media = scene.querySelector('.px-project-media');
    const image = media.querySelector('img');
    gsap.fromTo(media, { clipPath: 'inset(14% 8% 14% 8% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 22px)', ease: 'none', scrollTrigger: { trigger: scene, start: 'top 95%', end: 'top 30%', scrub: .6 } });
    gsap.fromTo(image, { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: .8 } });
    gsap.from(scene.querySelector('.px-project-number'), { y: 80, opacity: 0, ease: 'none', scrollTrigger: { trigger: scene, start: 'top 70%', end: 'top 35%', scrub: .5 } });
    gsap.from(scene.querySelector('.px-project-info'), { y: 40, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: scene, start: 'top 55%' } });
  });

  /* ---------- Convergence: the two planes slide into each other ---------- */
  mm.add('(min-width: 821px)', () => {
    gsap.fromTo('.px-plane-field', { xPercent: -12, rotate: -3 }, { xPercent: 6, rotate: 0, ease: 'none', scrollTrigger: { trigger: '.px-convergence-stage', start: 'top bottom', end: 'bottom 40%', scrub: .8 } });
    gsap.fromTo('.px-plane-digital', { xPercent: 12, rotate: 3 }, { xPercent: -6, rotate: 0, ease: 'none', scrollTrigger: { trigger: '.px-convergence-stage', start: 'top bottom', end: 'bottom 40%', scrub: .8 } });
    gsap.utils.toArray('.px-capability').forEach((item) => {
      const d = Number(item.dataset.depth || 1);
      gsap.fromTo(item, { y: 18 + d * 13, opacity: .2 }, { y: -(d * 9), opacity: 1, ease: 'none', scrollTrigger: { trigger: item, start: 'top 90%', end: 'bottom 35%', scrub: .6 } });
    });
  });
  mm.add('(max-width: 820px)', () => {
    gsap.utils.toArray('.px-plane').forEach((p, i) => gsap.fromTo(p, { xPercent: i ? 40 : -40, rotate: i ? 6 : -6, opacity: 0 }, { xPercent: 0, rotate: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: p, start: 'top 95%', end: 'top 45%', scrub: .5 } }));
    gsap.utils.toArray('.px-capability').forEach((item, i) => gsap.from(item, { xPercent: i % 2 ? 30 : -30, opacity: 0, ease: 'none', scrollTrigger: { trigger: item, start: 'top 95%', end: 'top 70%', scrub: .5 } }));
  });
  gsap.fromTo('.px-convergence-word', { scale: .7, opacity: 0 }, { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.px-convergence-stage', start: 'top 70%', end: 'center 50%', scrub: .6 } });

  /* ---------- Proof numbers drift ---------- */
  gsap.utils.toArray('.px-proof-num').forEach((item, i) => gsap.fromTo(item, { xPercent: i % 2 ? 8 : -6 }, { xPercent: i % 2 ? -3 : 3, ease: 'none', scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: .7 } }));

  /* ---------- Partner wall: rows fade up once; marquee speed stays constant (CSS) ---------- */
  gsap.from('.pw-row', { opacity: 0, y: 30, stagger: .12, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.pw-rows', start: 'top 88%' } });

  /* ---------- Closing: background zoom ---------- */
  gsap.fromTo('.px-closing-media img', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.px-closing', start: 'top bottom', end: 'bottom bottom', scrub: .8 } });

  /* ---------- Desktop: magnetic buttons + "View" cursor on projects ---------- */
  if (finePointer) {
    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      const x = gsap.quickTo(btn, 'x', { duration: .4, ease: 'power3' }), y = gsap.quickTo(btn, 'y', { duration: .4, ease: 'power3' });
      btn.addEventListener('pointermove', (e) => { const r = btn.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .3); y((e.clientY - r.top - r.height / 2) * .4); });
      btn.addEventListener('pointerleave', () => { x(0); y(0); });
    });
    const cursor = document.createElement('div');
    cursor.className = 'px-cursor'; cursor.setAttribute('aria-hidden', 'true'); cursor.textContent = 'View';
    document.body.appendChild(cursor);
    const cx = gsap.quickTo(cursor, 'x', { duration: .35, ease: 'power3' }), cy = gsap.quickTo(cursor, 'y', { duration: .35, ease: 'power3' });
    addEventListener('pointermove', (e) => { cx(e.clientX); cy(e.clientY); }, { passive: true });
    document.querySelectorAll('[data-cursor]').forEach((el) => {
      el.addEventListener('pointerenter', () => cursor.classList.add('is-on'));
      el.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
    });
  }

  const refresh = () => ScrollTrigger.refresh();
  if (document.fonts?.ready) document.fonts.ready.then(refresh);
  addEventListener('load', refresh, { once: true });
})();
