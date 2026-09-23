(() => {
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

  /* ---------- Reveal on scroll ---------- */
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach((el) => io.observe(el));
  } else {
    items.forEach((el) => el.classList.add('in'));
  }

  /* ---------- Contact form ---------- */
  // Google Apps Script web app (Google Sheet webhook) — same endpoint as the
  // coming-soon signup. Apps Script sends no CORS headers, so we POST as
  // text/plain (no preflight) and fall back to a no-cors request.
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbw31fm0F0P16vld-fT0FuSolvqcWWa-fnrF5rBGB3iq5a3EWjvNLvLtApbRW0lWK4ZC/exec';

  const form = document.getElementById('contactForm');
  const msg = document.getElementById('msg');
  const btn = document.getElementById('submitBtn');

  const setMsg = (text, kind) => {
    msg.textContent = text;
    msg.className = 'msg' + (kind ? ' ' + kind : '');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name.trim()) { setMsg('Please enter your name.', 'err'); form.elements.name.focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      setMsg('Please enter a valid email address.', 'err'); form.elements.email.focus(); return;
    }

    btn.disabled = true;
    setMsg('Sending…');
    const payload = JSON.stringify({
      ...data,
      source: 'website-contact',
      ts: new Date().toISOString(),
      ua: navigator.userAgent
    });

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload,
        redirect: 'follow'
      });
      if (!res.ok) throw new Error('Bad status ' + res.status);
    } catch (err) {
      try {
        await fetch(ENDPOINT, {
          method: 'POST', mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: payload
        });
      } catch (e2) {
        setMsg('Could not send. Please email hello@grenadastudio.com.', 'err');
        btn.disabled = false;
        return;
      }
    }
    form.reset();
    setMsg("Thanks — we'll be in touch within two working days.", 'ok');
    btn.disabled = false;
  });
})();
