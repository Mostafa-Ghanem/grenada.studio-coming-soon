const AR=document.documentElement.lang==='ar';

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const intro = document.getElementById('intro');
    if (reduced) intro?.remove(); else setTimeout(()=>intro?.classList.add('done'), 1550);

    const auditHorizontalOverflow=()=>{const vw=document.documentElement.clientWidth,sw=document.documentElement.scrollWidth;const offenders=[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.right>vw+1||r.left<-1});const report={scrollWidth:sw,clientWidth:vw,overflow:sw>vw,offenders:offenders.slice(0,12).map(el=>({tag:el.tagName,cls:el.className,left:Math.round(el.getBoundingClientRect().left),right:Math.round(el.getBoundingClientRect().right)}))};if(sw>vw)console.warn('[layout-audit]',report);else if(new URLSearchParams(location.search).has('layout-audit'))console.info('[layout-audit]',report)};
    addEventListener('load',()=>requestAnimationFrame(auditHorizontalOverflow),{once:true});
    const header = document.getElementById('siteHeader');
    // Solid header after 28px; hide while scrolling down, show again on scroll up.
    let lastY=scrollY;
    const onScroll=()=>{const y=scrollY;header.classList.toggle('scrolled',y>28);if(!document.body.classList.contains('menu-open'))header.classList.toggle('is-hidden',y>lastY&&y>320);document.documentElement.classList.toggle('header-hidden',header.classList.contains('is-hidden'));lastY=y};
    onScroll();addEventListener('scroll',onScroll,{passive:true});
    header.addEventListener('focusin',()=>header.classList.remove('is-hidden'));
    // Desktop mega-menu: also opens on click/tap and closes with Escape or an outside click.
    const mega=header.querySelector('.gh-has-mega');
    mega?.querySelector(':scope>a').addEventListener('click',e=>{if(matchMedia('(hover: none)').matches&&!mega.classList.contains('is-open')){e.preventDefault();mega.classList.add('is-open')}});
    addEventListener('click',e=>{if(mega&&!mega.contains(e.target))mega.classList.remove('is-open')});
    addEventListener('keydown',e=>{if(e.key==='Escape'){mega?.classList.remove('is-open');document.activeElement?.blur?.()}});
    // Mobile menu: services sub-list.
    const sub=header.querySelector('.gh-m-toggle');
    sub?.addEventListener('click',()=>{const open=sub.getAttribute('aria-expanded')!=='true';sub.setAttribute('aria-expanded',String(open));sub.closest('.gh-m-item').classList.toggle('is-open',open)});

    const menuBtn=document.getElementById('menuToggle'),mobileMenu=document.getElementById('mobileMenu');
    function setMenu(open){document.body.classList.toggle('menu-open',open);menuBtn?.setAttribute('aria-expanded',String(open));menuBtn?.setAttribute('aria-label',AR?(open?'إغلاق القائمة':'فتح القائمة'):(open?'Close navigation':'Open navigation'))}
    menuBtn?.addEventListener('click',()=>setMenu(!document.body.classList.contains('menu-open')));
    mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
    addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
    addEventListener('resize',()=>{if(innerWidth>960)setMenu(false)},{passive:true});

    const observer = new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');observer.unobserve(e.target)}}),{threshold:.14,rootMargin:'0px 0px -5%'});
    document.querySelectorAll('[data-reveal]').forEach(el=>observer.observe(el));

    const c=document.getElementById('particles'),ctx=c?.getContext('2d'); let pts=[];
    function resize(){if(!c||!ctx)return;const d=Math.min(devicePixelRatio||1,2);c.width=innerWidth*d;c.height=innerHeight*d;c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';ctx.setTransform(d,0,0,d,0,0);pts=Array.from({length:Math.min(56,Math.floor(innerWidth/26))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.25,vx:(Math.random()-.5)*.08,vy:-Math.random()*.11-.02,a:Math.random()*.2+.05}))}
    function draw(){if(!ctx)return;ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.y<-4)p.y=innerHeight+4;if(p.x<-4)p.x=innerWidth+4;if(p.x>innerWidth+4)p.x=-4;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,150,150,${p.a})`;ctx.fill()}requestAnimationFrame(draw)}
    if(!reduced){resize();draw();addEventListener('resize',resize,{passive:true})}

    let sound=false,audioCtx=null; const sndBtn=document.getElementById('soundToggle');
    function ping(freq=480,dur=.028,vol=.018){if(!sound)return;audioCtx ||= new (window.AudioContext||window.webkitAudioContext)();const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type='sine';o.frequency.value=freq;g.gain.setValueAtTime(vol,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+dur);o.connect(g).connect(audioCtx.destination);o.start();o.stop(audioCtx.currentTime+dur)}
    function syncIcon(){if(!sndBtn)return;sndBtn.querySelectorAll('.sound-wave').forEach(x=>x.style.display=sound?'':'none');sndBtn.querySelectorAll('.sound-off').forEach(x=>x.style.display=sound?'none':'');sndBtn.setAttribute('aria-pressed',String(sound));sndBtn.title=AR?(sound?'الصوت مفعّل':'الصوت مغلق'):(sound?'Sound on':'Sound off')}
    syncIcon();sndBtn?.addEventListener('click',()=>{sound=!sound;syncIcon();ping(620,.045,.025)});document.querySelectorAll('[data-snd]').forEach(el=>el.addEventListener('pointerenter',()=>ping(430,.022,.012)));
  

    document.querySelectorAll('[data-mailto-form]').forEach(form=>form.addEventListener('submit',e=>{
      e.preventDefault();
      if(!form.reportValidity()) return;
      const data=new FormData(form);
      const subject=`${AR?'استفسار عن مشروع':'Project enquiry'} — ${data.get('company')||data.get('name')||'Grenada Studio'}`;
      const body=[
        `Name: ${data.get('name')||''}`,
        `Company: ${data.get('company')||''}`,
        `Email: ${data.get('email')||''}`,
        `Phone: ${data.get('phone')||''}`,
        `Project type: ${data.get('projectType')||''}`,
        '',
        String(data.get('details')||'')
      ].join('\n');
      location.href=`mailto:hello@grenadastudio.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }));
