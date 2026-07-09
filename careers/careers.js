/* ============================================================
   Grenada Studio — Careers — shared behaviour
   Ambient particles, optional sound, load reveal, apply form.
   ============================================================ */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     Dynamic careers engine — everything renders from jobs-data.js
     Add a job there and it appears on the listing + gets its own
     page at job.html?id=<id>. No HTML edits needed.
     ============================================================ */
  const JOBS = window.GS_JOBS || [];

  /* ---------- Listing page: build job cards ---------- */
  const jobsGrid = document.getElementById('jobsGrid');
  if (jobsGrid){
    const frag = document.createDocumentFragment();
    JOBS.forEach((job, i) => {
      const a = document.createElement('a');
      a.className = 'job-card';
      a.href = 'job.html?id=' + encodeURIComponent(job.id);
      a.setAttribute('data-rise', '');
      a.style.setProperty('--d', (0.2 + i * 0.06).toFixed(2) + 's');

      const main = document.createElement('div');
      main.className = 'job-main';

      const h2 = document.createElement('h2');
      h2.className = 'job-title';
      h2.textContent = job.title;

      const desc = document.createElement('p');
      desc.className = 'job-desc';
      desc.textContent = job.cardDesc;

      const meta = document.createElement('div');
      meta.className = 'job-meta';
      const cat = document.createElement('span');
      cat.className = 'tag accent';
      cat.textContent = job.category;
      meta.appendChild(cat);
      (job.tags || []).forEach(t => {
        const s = document.createElement('span');
        s.className = 'tag';
        s.textContent = t;
        meta.appendChild(s);
      });

      main.append(h2, desc, meta);

      const go = document.createElement('span');
      go.className = 'job-go';
      go.setAttribute('aria-hidden', 'true');
      go.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"></path><path d="M8 7h9v9"></path></svg>';

      a.append(main, go);
      frag.appendChild(a);
    });
    jobsGrid.appendChild(frag);
    const count = document.getElementById('roleCount');
    if (count) count.textContent = String(JOBS.length).padStart(2, '0');
  }

  /* ---------- Job page: fill the template from ?id= ---------- */
  if (document.body.dataset.page === 'job'){
    const id = new URLSearchParams(location.search).get('id');
    const job = JOBS.find(j => j.id === id);
    if (!job){
      location.replace('index.html');
      return;
    }

    document.title = job.title + ' — Grenada Studio';
    const setMeta = (sel, val) => { const m = document.querySelector(sel); if (m) m.setAttribute('content', val); };
    setMeta('meta[name="description"]', job.metaDesc);
    setMeta('meta[property="og:title"]', job.title + ' — Grenada Studio');
    setMeta('meta[property="og:description"]', job.metaDesc);

    const eyebrow = document.getElementById('roleEyebrow');
    if (eyebrow) eyebrow.textContent = job.category + ' · Open role';
    const title = document.getElementById('roleTitle');
    if (title) title.textContent = job.title;

    const tags = document.getElementById('roleTags');
    if (tags){
      const cat = document.createElement('span');
      cat.className = 'tag accent';
      cat.textContent = job.category;
      tags.appendChild(cat);
      (job.tags || []).forEach(t => {
        const s = document.createElement('span');
        s.className = 'tag';
        s.textContent = t;
        tags.appendChild(s);
      });
    }

    const body = document.getElementById('roleBody');
    if (body){
      (job.sections || []).forEach(sec => {
        const h = document.createElement('h2');
        h.textContent = sec.h;
        body.appendChild(h);
        if (sec.p){
          const p = document.createElement('p');
          p.textContent = sec.p;
          body.appendChild(p);
        }
        if (sec.list){
          const ul = document.createElement('ul');
          sec.list.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
          });
          body.appendChild(ul);
        }
      });
      if (job.footnoteHtml){
        const note = document.createElement('p');
        note.style.cssText = 'color:var(--ink-mute);font-size:13px;margin-top:24px;';
        note.innerHTML = job.footnoteHtml; // content comes from our own jobs-data.js
        body.appendChild(note);
      }
    }

    const pill = document.getElementById('rolePillName');
    if (pill) pill.textContent = job.title;
    const jobForm = document.getElementById('applyForm');
    if (jobForm) jobForm.dataset.role = job.title;

    // URL field per job — required → shown in the main form, optional → not shown
    // (phone stays behind the "optional" expander to keep the form short)
    const linkField = document.getElementById('linkField');
    const linkInput = document.getElementById('linkedin');
    if (linkField && linkInput && job.link){
      const lbl = document.getElementById('linkLabel');
      if (lbl) lbl.textContent = job.link.label;
      linkInput.placeholder = job.link.placeholder || '';
      if (job.link.required){
        linkField.hidden = false;
        linkInput.setAttribute('required', '');
        const req = document.getElementById('linkReq');
        if (req) req.hidden = false;
      } else {
        // optional → move it into the expander next to the phone field
        const extra = jobForm ? jobForm.querySelector('.apply-extra') : null;
        if (extra){ linkField.hidden = false; extra.appendChild(linkField); }
      }
    }
    const extraLabel = document.getElementById('extraLabel');
    if (extraLabel && job.extraLabel) extraLabel.textContent = job.extraLabel;

    const footerEmail = document.getElementById('footerEmail');
    if (footerEmail && job.applyEmail){
      footerEmail.textContent = job.applyEmail;
      footerEmail.href = 'mailto:' + job.applyEmail;
    }
  }

  /* ---------- Load reveal ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => {
    document.documentElement.classList.add('ready');
  }));

  /* ---------- Particles ---------- */
  const canvas = document.getElementById('particles');
  if (canvas && !reduceMotion){
    const ctx = canvas.getContext('2d');
    let dpr = 1, W = 0, H = 0, particles = [], rafId = 0;
    function spawn(initial){
      return {
        x: Math.random()*W,
        y: initial ? Math.random()*H : H + 20,
        r: Math.random()*1.3 + 0.25,
        vy: -(Math.random()*0.22 + 0.06),
        vx: (Math.random()-0.5)*0.07,
        a: Math.random()*0.45 + 0.12,
        tw: Math.random()*Math.PI*2,
      };
    }
    function resize(){
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W*dpr; canvas.height = H*dpr;
      canvas.style.width = W+'px'; canvas.style.height = H+'px';
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const target = Math.min(56, Math.floor((W*H)/26000));
      particles = new Array(target).fill(0).map(() => spawn(true));
    }
    function tick(){
      ctx.clearRect(0,0,W,H);
      const cx = W*0.5, cy = H*0.3;
      for (const p of particles){
        p.y += p.vy; p.x += p.vx; p.tw += 0.02;
        const tw = (Math.sin(p.tw)+1)*0.5;
        const alpha = p.a*(0.4 + 0.6*tw);
        const dx=(p.x-cx)/W, dy=(p.y-cy)/H, d=Math.sqrt(dx*dx+dy*dy);
        const heat = Math.max(0, 1 - d*1.9);
        const r = Math.round(202 + (255-202)*heat);
        const g = Math.round(32 + (200-32)*(1-heat));
        const b = Math.round(39 + (200-39)*(1-heat));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`; ctx.fill();
        if (p.y < -10 || p.x < -10 || p.x > W+10) Object.assign(p, spawn(false));
      }
      rafId = requestAnimationFrame(tick);
    }
    resize();
    rafId = requestAnimationFrame(tick);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else rafId = requestAnimationFrame(tick);
    });
  }

  /* ---------- Sound (shared, persisted) ---------- */
  let audioCtx = null;
  let soundOn = localStorage.getItem('gs-sound') === 'on';
  const btn = document.getElementById('soundToggle');
  const icon = document.getElementById('soundIcon');
  const ICON_ON = `<path d="M11 5 6 9H3v6h3l5 4z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M18.5 5.5a9 9 0 0 1 0 13"></path>`;
  const ICON_OFF = `<path d="M11 5 6 9H3v6h3l5 4z"></path><path d="M16 9l5 6"></path><path d="M21 9l-5 6"></path>`;

  function paintBtn(){
    if (!btn) return;
    btn.setAttribute('aria-pressed', String(soundOn));
    btn.setAttribute('title', soundOn ? 'Sound on' : 'Sound off');
    if (icon) icon.innerHTML = soundOn ? ICON_ON : ICON_OFF;
  }
  paintBtn();

  function getCtx(){
    if (!audioCtx){
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) audioCtx = new AC();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }
  function tone({ freq=440, dur=0.06, type='sine', gain=0.035, detune=0 } = {}){
    if (!soundOn) return;
    const ac = getCtx(); if (!ac) return;
    const o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.value = freq; o.detune.value = detune;
    const t = ac.currentTime;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ac.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }
  window.gsTone = tone; // expose for form feedback

  if (btn){
    btn.addEventListener('click', () => {
      soundOn = !soundOn;
      localStorage.setItem('gs-sound', soundOn ? 'on' : 'off');
      paintBtn();
      if (soundOn){ tone({freq:660,dur:0.07,gain:0.05}); setTimeout(()=>tone({freq:880,dur:0.1,gain:0.04}),70); }
    });
  }
  document.querySelectorAll('a, button, input, .job-card').forEach(el => {
    el.addEventListener('pointerenter', () => tone({freq:1200,dur:0.04,gain:0.016}), { passive:true });
  });
  document.addEventListener('click', (e) => {
    if (e.target.closest('a, button, .job-card')) tone({freq:520,dur:0.07,gain:0.03,type:'triangle'});
  });
  window.addEventListener('pointerdown', function unlock(){ getCtx(); window.removeEventListener('pointerdown', unlock); }, { once:true });

  /* ---------- Apply form → Google Sheet ---------- */
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbzu8d8FI0j21fuqt5p_Ior9qHi33gwSfFH9VDWPrbv2vpr-pSnGvUKKLC_sMPT20bCl/exec';
  const form = document.getElementById('applyForm');
  if (form){
    const note = document.getElementById('formNote');
    const submitBtn = document.getElementById('applyBtn');
    const done = document.getElementById('applyDone');
    const roleName = form.dataset.role || document.title;

    function setNote(text, kind){
      if (!note) return;
      note.textContent = text;
      note.classList.remove('ok','err');
      if (kind) note.classList.add(kind);
    }

    // Custom file input display
    const cvInputEl = form.querySelector('input[type="file"]');
    const cvDrop = document.getElementById('cvDrop');
    const cvNameEl = document.getElementById('cvName');
    const cvMetaEl = document.getElementById('cvMeta');
    const CV_META_DEFAULT = cvMetaEl ? cvMetaEl.textContent : '';
    function fmtSize(b){
      if (b < 1024) return b + ' B';
      if (b < 1024*1024) return (b/1024).toFixed(0) + ' KB';
      return (b/1024/1024).toFixed(1) + ' MB';
    }
    function paintFile(){
      const f = cvInputEl && cvInputEl.files ? cvInputEl.files[0] : null;
      if (f){
        if (cvNameEl) cvNameEl.textContent = f.name;
        if (cvMetaEl) cvMetaEl.textContent = fmtSize(f.size) + ' · click to change';
        if (cvDrop) cvDrop.classList.add('has-file');
      } else {
        if (cvNameEl) cvNameEl.textContent = 'Choose a file…';
        if (cvMetaEl) cvMetaEl.textContent = CV_META_DEFAULT;
        if (cvDrop) cvDrop.classList.remove('has-file');
      }
    }
    if (cvInputEl) cvInputEl.addEventListener('change', paintFile);
    if (cvDrop){
      cvDrop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' '){ e.preventDefault(); cvInputEl && cvInputEl.click(); }
      });
    }

    /* ----- Optional extra info — kept collapsed to keep the form short ----- */
    const applyExtra = form.querySelector('.apply-extra');
    const addExtraBtn = form.querySelector('[data-toggle-extra]');
    if (addExtraBtn && applyExtra){
      addExtraBtn.addEventListener('click', () => {
        applyExtra.hidden = false;
        addExtraBtn.hidden = true;
        tone({freq:720,dur:0.05,gain:0.03});
      });
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const email = String(fd.get('email')||'').trim();
      const name = String(fd.get('name')||'').trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name){ setNote('Please enter your full name.', 'err'); form.name.focus(); tone({freq:180,dur:0.12,type:'sawtooth',gain:0.03}); return; }
      if (!emailOk){ setNote('Please enter a valid email address.', 'err'); form.email.focus(); tone({freq:180,dur:0.12,type:'sawtooth',gain:0.03}); return; }

      // ----- CV file -----
      const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
      const ALLOWED = /\.(pdf|doc|docx)$/i;
      const cvInput = form.querySelector('input[type="file"]');
      const file = cvInput && cvInput.files ? cvInput.files[0] : null;
      const cvRequired = cvInput && cvInput.hasAttribute('required');

      if (cvRequired && !file){ setNote('Please attach your CV (PDF or Word).', 'err'); cvInput.focus(); tone({freq:180,dur:0.12,type:'sawtooth',gain:0.03}); return; }
      if (file){
        if (!ALLOWED.test(file.name)){ setNote('CV must be a PDF or Word file.', 'err'); tone({freq:180,dur:0.12,type:'sawtooth',gain:0.03}); return; }
        if (file.size > MAX_BYTES){ setNote('CV is too large — max 8 MB.', 'err'); tone({freq:180,dur:0.12,type:'sawtooth',gain:0.03}); return; }
      }

      let cvData = '', cvName = '', cvMime = '';
      if (file){
        try {
          setNote('Reading your CV…');
          cvData = await new Promise((resolve, reject) => {
            const r = new FileReader();
            r.onload = () => resolve(String(r.result).split(',')[1] || '');
            r.onerror = () => reject(r.error);
            r.readAsDataURL(file);
          });
          cvName = file.name;
          cvMime = file.type || 'application/octet-stream';
        } catch (err){
          setNote('Could not read that file. Try another.', 'err');
          tone({freq:180,dur:0.12,type:'sawtooth',gain:0.03});
          return;
        }
      }

      const payload = JSON.stringify({
        type: 'application',
        role: roleName,
        name,
        email,
        phone: String(fd.get('phone')||'').trim(),
        linkedin: String(fd.get('linkedin')||'').trim(),
        cvName, cvMime, cvData,
        source: 'careers',
        ts: new Date().toISOString(),
        ua: navigator.userAgent,
      });

      submitBtn.disabled = true;
      const label = submitBtn.querySelector('.label');
      const old = label ? label.textContent : '';
      if (label) label.textContent = file ? 'Uploading…' : 'Sending…';
      setNote(file ? 'Uploading your application…' : 'Submitting your application…');

      const send = () => fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: payload,
        redirect: 'follow',
      });

      try {
        const res = await send();
        if (!res.ok) throw new Error('bad status');
        succeed();
      } catch (err){
        try { await fetch(ENDPOINT, { method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain;charset=utf-8'}, body: payload }); } catch(e){}
        succeed();
      }

      function succeed(){
        form.reset();
        paintFile();
        if (done) done.classList.add('show');
        setNote('');
        tone({freq:660,dur:0.08,gain:0.05}); setTimeout(()=>tone({freq:990,dur:0.1,gain:0.04}),90);
        submitBtn.disabled = false; if (label) label.textContent = old;
      }
    });
  }

  /* ---------- Share this role (grow traffic + referrals) ---------- */
  const share = document.querySelector('.share');
  if (share){
    const url = location.href;
    const roleEl = document.querySelector('.role-head h1');
    const role = (roleEl ? roleEl.textContent : document.title).trim();
    const title = document.title;
    const text = `We're hiring — ${role} at Grenada Studio. Take a look:`;
    const enc = encodeURIComponent;

    const links = {
      whatsapp: `https://wa.me/?text=${enc(text + ' ' + url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      x: `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      email: `mailto:?subject=${enc(role + ' — Grenada Studio')}&body=${enc(text + '\n\n' + url)}`,
    };
    share.querySelectorAll('a[data-share]').forEach(a => {
      const key = a.dataset.share;
      if (links[key]) a.href = links[key];
    });

    const shareNote = document.getElementById('shareNote');
    let noteTimer = 0;
    function say(msg){
      if (!shareNote) return;
      shareNote.textContent = msg;
      shareNote.classList.add('ok');
      clearTimeout(noteTimer);
      noteTimer = setTimeout(() => { shareNote.textContent = ''; shareNote.classList.remove('ok'); }, 2800);
    }

    // Native share sheet (mobile / supported browsers)
    if (navigator.share){
      share.classList.add('can-native');
      const nativeBtn = share.querySelector('[data-share="native"]');
      if (nativeBtn){
        nativeBtn.addEventListener('click', async () => {
          try { await navigator.share({ title, text, url }); tone({freq:720,dur:0.07,gain:0.04}); say('Thanks for sharing!'); }
          catch(e){ /* user cancelled */ }
        });
      }
    }

    // Copy link
    const copyBtn = share.querySelector('[data-share="copy"]');
    if (copyBtn){
      copyBtn.addEventListener('click', async () => {
        const lbl = copyBtn.querySelector('.copy-label');
        const original = lbl ? lbl.textContent : '';
        try {
          if (navigator.clipboard && navigator.clipboard.writeText){
            await navigator.clipboard.writeText(url);
          } else {
            const ta = document.createElement('textarea');
            ta.value = url; ta.setAttribute('readonly',''); ta.style.position = 'absolute'; ta.style.left = '-9999px';
            document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
          }
          copyBtn.classList.add('copied');
          if (lbl) lbl.textContent = 'Copied!';
          say('Link copied — send it to a friend.');
          tone({freq:880,dur:0.08,gain:0.04});
          setTimeout(() => { copyBtn.classList.remove('copied'); if (lbl) lbl.textContent = original; }, 2000);
        } catch(e){ say('Press Ctrl/Cmd + C to copy the link.'); }
      });
    }

    // Acknowledge social shares (they open in a new tab)
    share.querySelectorAll('a[data-share]').forEach(a => {
      a.addEventListener('click', () => say('Thanks for sharing!'));
    });
  }
})();
