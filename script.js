/* =========================================================
   ABHINAY VISUALS — script.js
   Vanilla JS + GSAP/ScrollTrigger + Lenis
   ========================================================= */
(() => {
  'use strict';

  /* ---------- PROJECTS: single source of truth for the work grid ----------
     To publish real work: replace `thumb` (image), and optionally add
     `video` (full clip for the lightbox) and `preview` (short muted hover loop). */
  const PROJECTS = [
    { title: 'Passport to Somewhere', type: 'Reel', cat: 'reel', ratio: '9:16', category: 'Travel', year: '2026', thumb: 'assets/img/work-01.svg', video: '', preview: '',
      desc: 'A fast-paced travel reel built on rhythm: match cuts, speed ramps and a sunset grade that makes you want to book the ticket.' },
    { title: 'New Country, New Chapter', type: 'Promo', cat: 'promo', ratio: '16:9', category: 'Immigration', year: '2026', thumb: 'assets/img/work-02.svg', video: '', preview: '',
      desc: 'A promotional film for an immigration service. Human stories first, clear information second, and trust throughout.' },
    { title: 'Launch Day', type: 'Promo', cat: 'promo', ratio: '16:9', category: 'Product', year: '2025', thumb: 'assets/img/work-03.svg', video: '', preview: '',
      desc: 'A product launch edit with punchy typography, sound design hits and a clean call to action.' },
    { title: 'Bold Type Poster Series', type: 'Design', cat: 'design', ratio: '4:5', category: 'Posters', year: '2025', thumb: 'assets/img/work-04.svg', video: '', preview: '',
      desc: 'A poster series exploring oversized type, one accent colour and a lot of confident negative space.' },
    { title: 'Title Sequence Study', type: 'Motion', cat: 'motion', ratio: '16:9', category: 'Motion graphics', year: '2026', thumb: 'assets/img/work-05.svg', video: '', preview: '',
      desc: 'A kinetic title study in tracking, timing and restraint, built frame by frame.' },
    { title: 'Daily Grind', type: 'Reel', cat: 'reel', ratio: '9:16', category: 'Creator', year: '2025', thumb: 'assets/img/work-06.svg', video: '', preview: '',
      desc: 'A creator reel with a hook in the first second, captions timed to the beat and B-roll that tells the story.' },
    { title: 'Campaign Kit', type: 'Design', cat: 'design', ratio: '4:5', category: 'Social creatives', year: '2026', thumb: 'assets/img/work-07.svg', video: '', preview: '',
      desc: 'A complete social campaign system of posts, stories and ads sharing one visual language.' },
    { title: 'Dreamframes', type: 'Motion', cat: 'motion', ratio: '16:9', category: 'AI-assisted', year: '2026', thumb: 'assets/img/work-08.svg', video: '', preview: '',
      desc: 'AI-assisted visuals directed, curated and finished by hand. Imagination with an editor’s eye.' },
  ];

  /* ---------- helpers ---------- */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isTablet = () => innerWidth <= 1024;
  const isPhone = () => innerWidth <= 640;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const hasLenis = typeof window.Lenis !== 'undefined';
  const ratioCSS = r => r.replace(':', ' / ');
  const pad = (n, l = 2) => String(Math.floor(n)).padStart(l, '0');
  const store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* private mode */ } },
  };
  const debounce = (fn, ms = 200) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

  let lenis = null;

  /* =========================================================
     TEXT UTILITIES
     ========================================================= */
  function splitChars(el) {
    const text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';
    const chars = [];
    text.split(/\s+/).forEach((word, wi) => {
      if (wi) el.append(' ');
      const w = document.createElement('span'); // word wrapper keeps chars from breaking apart
      w.setAttribute('aria-hidden', 'true'); w.style.cssText = 'display:inline-block;white-space:nowrap';
      for (const ch of word) {
        const s = document.createElement('span');
        s.className = 'c'; s.style.display = 'inline-block'; s.textContent = ch;
        w.append(s); chars.push(s);
      }
      el.append(w);
    });
    return chars;
  }

  function splitWords(el) {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(' '); return; }
            const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.append(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
    $$('em .w', el).forEach(w => w.classList.add('is-feel'));
    return $$('.w', el);
  }

  /* Scale an element's font-size so it spans its parent's content width */
  function fitText() {
    $$('.fit').forEach(el => {
      const parent = el.parentElement;
      const cs = getComputedStyle(parent);
      const avail = parent.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const base = el.closest('.hero') ? 125 : 100;
      const prevW = el.style.getPropertyValue('--wdth');
      el.style.setProperty('--wdth', base);
      el.style.fontSize = '100px';
      const w = el.offsetWidth;
      if (w) el.style.fontSize = (100 * avail / w) * 0.995 + 'px';
      if (prevW) el.style.setProperty('--wdth', prevW); else el.style.removeProperty('--wdth');
    });
  }

  /* =========================================================
     WORK GRID (renders in every mode)
     ========================================================= */
  const grid = $('#workGrid');

  function renderWork() {
    grid.innerHTML = PROJECTS.map((p, i) => `
      <a class="card" href="#work" data-i="${i}" data-cat="${p.cat}" data-cursor="play" aria-label="Open project: ${p.title}">
        <div class="card__media frame" style="aspect-ratio:${ratioCSS(p.ratio)}">
          <img src="${p.thumb}" alt="" loading="lazy" decoding="async">
          ${p.preview ? `<video muted loop playsinline preload="none" data-src="${p.preview}"></video>` : ''}
          <span class="card__chip mono">${p.type} · ${p.ratio}</span>
        </div>
        <div class="card__info">
          <h3 class="card__title">${p.title}</h3>
          <span class="card__meta mono">${p.category} · ${p.year}</span>
        </div>
      </a>`).join('');

    // hover previews
    $$('.card', grid).forEach(card => {
      const v = $('video', card); if (!v || !FINE) return;
      let t;
      card.addEventListener('mouseenter', () => {
        t = setTimeout(() => {
          if (!v.src) v.src = v.dataset.src;
          v.play().then(() => card.classList.add('is-previewing')).catch(() => {});
        }, 150);
      });
      card.addEventListener('mouseleave', () => { clearTimeout(t); card.classList.remove('is-previewing'); v.pause(); });
    });
  }

  let currentFilter = 'all';
  function visibleCards() { return $$('.card', grid).filter(c => currentFilter === 'all' || c.dataset.cat === currentFilter); }

  function layoutGrid(animate = false) {
    if (!hasGSAP || RM) return;
    grid.classList.add('is-masonry');
    const W = grid.clientWidth;
    const cols = W < 600 ? 1 : W < 980 ? 2 : 3;
    const gap = parseFloat(getComputedStyle(grid).columnGap) || 24;
    const colW = (W - gap * (cols - 1)) / cols;
    const heights = new Array(cols).fill(0);
    const vis = visibleCards();

    $$('.card', grid).forEach(card => {
      card.style.width = colW + 'px';
      if (!vis.includes(card)) {
        card.style.pointerEvents = 'none'; card.tabIndex = -1;
        gsap.to(card, { autoAlpha: 0, scale: .92, duration: animate ? .4 : 0, ease: 'power2.out' });
      }
    });
    vis.forEach(card => {
      const h = card.offsetHeight;
      const c = heights.indexOf(Math.min(...heights));
      const x = c * (colW + gap), y = heights[c];
      heights[c] += h + gap * 1.6;
      card.style.pointerEvents = ''; card.removeAttribute('tabindex');
      if (animate) gsap.to(card, { x, y, autoAlpha: 1, scale: 1, duration: .9, ease: 'expo.out' });
      else gsap.set(card, { x, y, autoAlpha: 1, scale: 1 });
    });
    grid.style.height = Math.max(...heights) + 'px';
  }

  function filters() {
    $$('.filter').forEach(btn => btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter;
      $$('.filter').forEach(b => { const on = b === btn; b.classList.toggle('is-active', on); b.setAttribute('aria-pressed', on); });
      if (hasGSAP && !RM) {
        layoutGrid(true);
        setTimeout(() => ScrollTrigger.refresh(), 950);
      } else {
        $$('.card', grid).forEach(c => { c.hidden = !(currentFilter === 'all' || c.dataset.cat === currentFilter); });
      }
    }));
  }

  /* =========================================================
     LIGHTBOX
     ========================================================= */
  function lightbox() {
    const lb = $('.lightbox'), media = $('.lightbox__media', lb);
    let index = 0, lastFocus = null, open = false;

    const fill = i => {
      const list = visibleCards().map(c => +c.dataset.i);
      index = (i + list.length) % list.length;
      const p = PROJECTS[list[index]];
      media.innerHTML = p.video
        ? `<video src="${p.video}" controls autoplay playsinline poster="${p.thumb}"></video>`
        : `<img src="${p.thumb}" alt="${p.title}">`;
      $('.lightbox__meta', lb).textContent = `${p.type} · ${p.ratio} · ${p.category} · ${p.year}`;
      $('.lightbox__title', lb).textContent = p.title;
      $('.lightbox__desc', lb).textContent = p.desc;
      $('.lightbox__count', lb).textContent = `${pad(index + 1)} / ${pad(list.length)}`;
      if (hasGSAP && !RM) gsap.fromTo([media, $('.lightbox__info', lb)], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .7, stagger: .08, ease: 'expo.out' });
    };

    const show = i => {
      lastFocus = document.activeElement; open = true;
      const list = visibleCards().map(c => +c.dataset.i);
      fill(list.indexOf(i));
      lb.setAttribute('aria-hidden', 'false');
      lenis && lenis.stop();
      if (hasGSAP && !RM) {
        gsap.set(lb, { visibility: 'visible' });
        gsap.fromTo(lb, { opacity: 0 }, { opacity: 1, duration: .35 });
        gsap.fromTo($$('.lightbox__bar', lb), { height: '50vh' }, { height: '10vh', duration: 1, ease: 'expo.inOut' });
      } else { lb.style.visibility = 'visible'; lb.style.opacity = 1; }
      $('.lightbox__close', lb).focus();
    };

    const hide = () => {
      if (!open) return; open = false;
      lb.setAttribute('aria-hidden', 'true');
      const done = () => { lb.style.visibility = 'hidden'; media.innerHTML = ''; };
      if (hasGSAP && !RM) {
        gsap.to($$('.lightbox__bar', lb), { height: '50vh', duration: .6, ease: 'expo.in' });
        gsap.to(lb, { opacity: 0, duration: .3, delay: .45, onComplete: done });
      } else { lb.style.opacity = 0; done(); }
      lenis && lenis.start();
      lastFocus && lastFocus.focus();
    };

    grid.addEventListener('click', e => {
      const card = e.target.closest('.card'); if (!card) return;
      e.preventDefault(); show(+card.dataset.i);
    });
    $('.lightbox__close', lb).addEventListener('click', hide);
    $('.lb-prev', lb).addEventListener('click', () => fill(index - 1));
    $('.lb-next', lb).addEventListener('click', () => fill(index + 1));
    lb.addEventListener('click', e => { if (e.target === lb) hide(); });
    document.addEventListener('keydown', e => {
      if (!open) return;
      if (e.key === 'Escape') hide();
      if (e.key === 'ArrowRight') fill(index + 1);
      if (e.key === 'ArrowLeft') fill(index - 1);
      if (e.key === 'Tab') { // focus trap
        const f = $$('button, [href], video[controls]', lb).filter(el => el.offsetParent !== null);
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* =========================================================
     SMALL UI: clock, copy, mobile menu, toast
     ========================================================= */
  function toast(msg) {
    const t = $('.toast'); t.textContent = msg; t.classList.add('is-on');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('is-on'), 2200);
  }

  function clock() {
    const el = $('.js-clock'); if (!el) return;
    const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
    const tick = () => { el.textContent = fmt.format(new Date()); };
    tick(); setInterval(tick, 15000);
  }

  function copyEmail() {
    $$('.js-copy').forEach(btn => btn.addEventListener('click', async () => {
      const v = btn.dataset.copy;
      try { await navigator.clipboard.writeText(v); toast('Email copied ✓'); }
      catch (e) { location.href = 'mailto:' + v; }
    }));
  }

  function mobileMenu() {
    const btn = $('.menu-btn'), menu = $('#mobileMenu');
    const set = open => {
      menu.classList.toggle('is-open', open);
      menu.setAttribute('aria-hidden', !open);
      btn.setAttribute('aria-expanded', open);
      btn.textContent = open ? 'CLOSE' : 'MENU';
      if (lenis) open ? lenis.stop() : lenis.start();
      if (open && hasGSAP && !RM) gsap.fromTo($$('nav a', menu), { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: .06, duration: .9, delay: .25, ease: 'expo.out' });
    };
    btn.addEventListener('click', () => set(!menu.classList.contains('is-open')));
    $$('a', menu).forEach(a => a.addEventListener('click', () => set(false)));
  }

  function anchors() {
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.closest('#workGrid')) return;
      const id = a.getAttribute('href');
      const target = id === '#top' ? 0 : $(id);
      if (target === null) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1.8, easing: t => 1 - Math.pow(1 - t, 4) });
      else (target === 0 ? window.scrollTo({ top: 0 }) : target.scrollIntoView());
    });
    $('.rewind').addEventListener('click', () => {
      if (lenis) lenis.scrollTo(0, { duration: 2.6, easing: t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) });
      else window.scrollTo({ top: 0 });
    });
  }

  /* =========================================================
     BOOT — static modes bail out here
     ========================================================= */
  renderWork();
  filters();
  lightbox();
  clock();
  copyEmail();
  mobileMenu();

  if (!hasGSAP || RM) {
    root.classList.add('rm');
    anchors();
    document.fonts && document.fonts.ready.then(fitText);
    addEventListener('resize', debounce(fitText));
    return;
  }

  /* =========================================================
     MOTION MODE
     ========================================================= */
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  gsap.defaults({ ease: 'expo.out' });

  if (hasLenis) {
    lenis = new Lenis({ lerp: .085, smoothWheel: true });
    window.lenis = lenis; // handy for debugging in the console
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  anchors();

  const velocity = () => (lenis ? lenis.velocity : 0);

  /* ---------- VIDEO SCRUB (auto-detects generated videos in /assets/video) ---------- */
  function makeScrub(wrap) {
    const video = $('video', wrap);
    const s = { ready: false, target: 0, cur: 0, mode: 'scrub', video, loaded: false, set(p) { this.target = p; } };
    if (!video || !wrap.dataset.video) return s;
    const sources = [isPhone() && wrap.dataset.videoMobile, wrap.dataset.video].filter(Boolean);
    let i = 0;
    const tryNext = () => { if (i < sources.length) { video.src = sources[i++]; video.load(); } };
    video.addEventListener('error', tryNext);
    video.addEventListener('loadeddata', () => {
      s.ready = true; wrap.classList.add('has-video');
      // iOS needs a play/pause "unlock" before seeking works reliably
      video.play().then(() => { if (s.mode === 'scrub') video.pause(); }).catch(() => {});
    }, { once: true });
    s.load = () => { if (s.loaded) return; s.loaded = true; video.preload = 'auto'; tryNext(); };
    gsap.ticker.add(() => {
      if (!s.ready || s.mode !== 'scrub' || !video.duration) return;
      s.cur += (s.target - s.cur) * .14;
      const t = Math.min(video.duration - .05, s.cur * video.duration);
      if (!video.seeking && Math.abs(video.currentTime - t) > .012) video.currentTime = t;
    });
    return s;
  }

  /* ---------- PRELOADER ---------- */
  function preloader() {
    return new Promise(resolve => {
      const pre = $('.preloader');
      const bars = $$('.letterbox__bar');
      if (store.get('av-seen')) {
        root.classList.add('seen');
        gsap.set(bars, { scaleY: 1 });
        resolve();
        return;
      }
      lenis && lenis.stop();
      const tc = $('.preloader__tc'), pct = $('.preloader__pct span');
      const st = { p: 0 };
      const render = () => {
        const f = Math.round(st.p * 48);
        tc.textContent = `00:00:${pad(Math.floor(f / 24))}:${pad(f % 24)}`;
        pct.textContent = pad(st.p * 100, 3);
      };
      const imgs = $$('.hero .still');
      const loads = imgs.map(img => img.complete ? Promise.resolve() : new Promise(r => { img.onload = img.onerror = r; }));
      const ready = Promise.race([Promise.all([document.fonts.ready, ...loads]), new Promise(r => setTimeout(r, 4000))]);
      const t0 = performance.now();
      gsap.to(st, { p: .82, duration: 1.3, ease: 'power2.out', onUpdate: render });
      ready.then(() => {
        const wait = Math.max(0, 1.3 - (performance.now() - t0) / 1000);
        gsap.to(st, {
          p: 1, duration: .4, delay: wait, ease: 'power1.in', onUpdate: render,
          onComplete: () => {
            store.set('av-seen', '1');
            gsap.timeline()
              .to('.slate__stick--top', { rotate: 0, duration: .16, ease: 'power4.in' })
              .to('.slate', { y: 4, duration: .05, yoyo: true, repeat: 1, ease: 'none' })
              .set(bars, { scaleY: 1 })
              .to(pre, { autoAlpha: 0, duration: .5, ease: 'power2.inOut', delay: .15, onStart: resolve })
              .set(pre, { display: 'none' });
          },
        });
      });
    });
  }

  function intro() {
    lenis && lenis.start();
    const tl = gsap.timeline();
    tl.to('.letterbox__bar', { scaleY: 0, duration: 1.4, ease: 'expo.inOut' }, 0)
      .from('.hero .media', { scale: 1.25, duration: 2.2, ease: 'expo.out' }, 0)
      .from('.hero__line .fit', { yPercent: 60, opacity: 0, duration: 1.6, stagger: .12 }, .3)
      .from(['.hero__meta', '.scroll-cue'], { opacity: 0, y: 12, duration: 1, stagger: .08 }, .8)
      .from(['.header', '.hud', '.scrubber'], { opacity: 0, duration: 1.2, stagger: .08, ease: 'power2.out' }, .9);
    return tl;
  }

  /* ---------- HERO ---------- */
  function hero() {
    const scrub = makeScrub($('#heroMedia'));
    scrub.load && scrub.load();
    const chars = splitChars($('.js-type'));
    const headLines = $$('.hero__headline .line > span');
    gsap.set(chars, { opacity: 0 });
    gsap.set(headLines, { yPercent: 115 });
    gsap.set('.hero__ctas', { opacity: 0, y: 24 });
    gsap.set('.hero .still--a', { scale: 1.22 });
    gsap.set('.hero .still--b', { scale: 1.2 });
    gsap.set('.caret', { opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.hero', start: 'top top', pin: true, scrub: .8, invalidateOnRefresh: true,
        end: () => '+=' + innerHeight * (isPhone() ? 1.6 : 3),
        onUpdate: self => scrub.set(self.progress),
      },
    });
    tl.to('.scroll-cue', { opacity: 0, duration: .05 }, 0)
      .to('.hero__line--1 .fit', { xPercent: -18, '--wdth': 62, duration: .34, ease: 'power2.in' }, 0)
      .to('.hero__line--2 .fit', { xPercent: 18, '--wdth': 62, duration: .34, ease: 'power2.in' }, 0)
      .to('.hero__line .fit', { opacity: 0, duration: .08 }, .28)
      .to('.hero__meta', { opacity: 0, duration: .1 }, .25)
      .to('.hero .still--a', { scale: 1.02, duration: .48 }, 0)
      .to('.hero .still--b', { opacity: 1, duration: .12, ease: 'power1.inOut' }, .38)
      .to('.hero .still--b', { scale: 1, xPercent: -3, duration: .62 }, .38)
      .to('.caret', { opacity: 1, duration: .01 }, .34)
      .to(chars, { opacity: 1, duration: .005, stagger: .2 / chars.length }, .35)
      .to('.hero__role', { opacity: 0, yPercent: -120, duration: .06 }, .62)
      .to(headLines, { yPercent: 0, duration: .12, stagger: .05, ease: 'power3.out' }, .66)
      .to('.hero__ctas', { opacity: 1, y: 0, duration: .08, ease: 'power2.out' }, .86)
      .set({}, {}, 1);
  }

  /* ---------- STATS ---------- */
  function stats() {
    // velocity-reactive marquee
    const track = $('.marquee__track'), group = $('.marquee__group');
    let x = 0, dir = -1;
    const skew = gsap.quickTo(track, 'skewX', { duration: .5, ease: 'power3.out' });
    const setX = gsap.quickSetter(track, 'x', 'px');
    gsap.ticker.add((_, dt) => {
      const w = group.offsetWidth; if (!w) return;
      const v = velocity();
      if (Math.abs(v) > .1) dir = v > 0 ? -1 : 1;
      x += (dir * .6 + dir * Math.min(Math.abs(v), 40) * .5) * (dt / 16.67);
      x = gsap.utils.wrap(-w, 0, x);
      setX(x);
      skew(gsap.utils.clamp(-8, 8, -v * .35));
    });

    // counters
    $$('[data-count]').forEach(el => {
      const target = +el.dataset.count, padTo = +(el.dataset.pad || 1), o = { v: 0 };
      el.textContent = pad(0, padTo);
      ScrollTrigger.create({
        trigger: el, start: 'top 88%', once: true,
        onEnter: () => gsap.to(o, { v: target, duration: 1.8, ease: 'power3.out', onUpdate: () => { el.textContent = pad(o.v, padTo); } }),
      });
    });
    gsap.from('.stat', { y: 40, opacity: 0, duration: 1.2, stagger: .1, scrollTrigger: { trigger: '.stats__grid', start: 'top 88%' } });
  }

  /* ---------- MISSION ---------- */
  function mission() {
    const words = splitWords($('.js-words'));
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.mission', start: 'top top', pin: true, scrub: .6, invalidateOnRefresh: true,
        end: () => '+=' + innerHeight * (isPhone() ? .9 : 1.5),
      },
    });
    tl.to(words, { opacity: 1, duration: .1, stagger: .9 / words.length, ease: 'none' }, 0)
      .fromTo('.mission__text em', { scale: .8, display: 'inline-block', transformOrigin: '50% 70%' }, { scale: 1, duration: .08, ease: 'back.out(3)' }, .9);
  }

  /* ---------- PILLARS ---------- */
  function pillars() {
    const chars = splitChars($('.pillars .js-chars'));
    gsap.from(chars, { yPercent: 100, opacity: 0, duration: 1.2, stagger: .04, scrollTrigger: { trigger: '.pillars', start: 'top 70%' } });

    const mm = gsap.matchMedia();
    mm.add('(min-width: 1025px)', () => {
      const track = $('.pillars__track');
      const dist = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '.pillars', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true },
      });
      $$('.pillar:not(.pillar--intro)').forEach(p => {
        gsap.fromTo($('.pillar__num', p), { xPercent: 25 }, { xPercent: -25, ease: 'none', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
        gsap.from($$('.pillar__body > *', p), { x: 80, opacity: 0, duration: 1.2, stagger: .07, scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 70%' } });
        gsap.fromTo($('.pillar__media', p), { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: p, containerAnimation: tween, start: 'left 55%' } });
      });
    });
    mm.add('(max-width: 1024px)', () => {
      $$('.pillar:not(.pillar--intro)').forEach(p => {
        gsap.from($$('.pillar__body > *', p), { y: 40, opacity: 0, duration: 1.1, stagger: .07, scrollTrigger: { trigger: p, start: 'top 75%' } });
        gsap.fromTo($('.pillar__media', p), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, ease: 'expo.inOut', scrollTrigger: { trigger: $('.pillar__media', p), start: 'top 85%' } });
      });
    });
  }

  /* ---------- STORY ---------- */
  function story() {
    const wrap = $('#storyMedia');
    const scrub = makeScrub(wrap);
    const chapters = $$('.chapter'), index = $$('.story__index li');
    let active = 0;
    gsap.set(chapters, { autoAlpha: 0 }); gsap.set(chapters[0], { autoAlpha: 1 });

    const go = i => {
      if (i === active) return;
      const out = chapters[active], inn = chapters[i], d = i > active ? 1 : -1;
      gsap.to(out, { autoAlpha: 0, y: -30 * d, duration: .45, ease: 'power2.in', overwrite: true });
      gsap.fromTo(inn, { autoAlpha: 0, y: 40 * d }, { autoAlpha: 1, y: 0, duration: .9, delay: .2, ease: 'expo.out', overwrite: true });
      gsap.fromTo($$('.chapter__no, .h3, p:last-child', inn), { y: 30 * d, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: .06, delay: .25 });
      index.forEach((li, k) => li.classList.toggle('is-active', k === i));
      active = i;
    };

    ScrollTrigger.create({
      trigger: '.story', start: 'top 80%', once: true, onEnter: () => scrub.load && scrub.load(),
    });

    // DOM "creative process" artboard — the fallback until v2-process.mp4 exists
    const ab = $('.ab'), L = s => $('.ab__' + s, ab);
    gsap.set([L('grid'), L('caption')], { opacity: 0 });
    gsap.set($$('.ab__type span'), { yPercent: 110, opacity: 0 });
    gsap.set(L('photo'), { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(L('shape'), { scale: 0 });
    gsap.set($$('.ab__swatches i'), { scale: 0 });
    gsap.set($$('.ab__timeline i'), { scaleX: 0, transformOrigin: 'left' });
    gsap.set(ab, { scale: .86, opacity: 0 });

    const z = { canvas: 0, grid: 60, photo: 140, shape: 220, type: 300, swatches: 360, timeline: 420, caption: 480 };
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: '.story', start: 'top top', pin: true, scrub: .8, invalidateOnRefresh: true,
        end: () => '+=' + innerHeight * (isPhone() ? 2.4 : 4),
        onUpdate: self => {
          scrub.set(self.progress);
          go(Math.min(3, Math.floor(self.progress * 4.0001)));
          $('.story__progress span').style.transform = `scaleX(${self.progress})`;
        },
      },
    });
    tl.to(ab, { scale: 1, opacity: 1, duration: .08 }, 0)
      .to(L('grid'), { opacity: 1, duration: .05 }, .12)
      .to('.ab__cursor', { opacity: 0, duration: .02 }, .2)
      .to($$('.ab__type span'), { yPercent: 0, opacity: 1, duration: .06, stagger: .018 }, .2)
      .to(L('photo'), { clipPath: 'inset(0 0% 0 0)', duration: .08 }, .28)
      .to(L('shape'), { scale: 1, duration: .06, ease: 'back.out(2)' }, .35)
      .to($$('.ab__swatches i'), { scale: 1, duration: .03, stagger: .01, ease: 'back.out(3)' }, .4)
      .to($$('.ab__timeline i'), { scaleX: 1, duration: .05, stagger: .01 }, .44)
      .to(L('caption'), { opacity: 1, duration: .04 }, .47)
      .to('.ab__timeline b', { left: '100%', duration: .5, ease: 'none' }, .45)
      // explode the design file into 3D layers
      .to(ab, { rotateY: -32, rotateX: 14, scale: .82, duration: .14 }, .52);
    Object.entries(z).forEach(([k, v]) => tl.to(L(k), { z: v, duration: .14 }, .52));
    // compress back
    tl.to(ab, { rotateY: 0, rotateX: 0, scale: 1, duration: .12 }, .72);
    Object.keys(z).forEach(k => tl.to(L(k), { z: 0, duration: .12 }, .72));
    // match cut: the design lands on Abhinay's monitor
    tl.to(ab, { scale: 1.9, opacity: 0, duration: .08, ease: 'power3.in' }, .84)
      .fromTo('.story__final', { opacity: 0, scale: 1.12 }, { opacity: 1, scale: 1, duration: .1 }, .86)
      .set({}, {}, 1);

    // manifesto
    const mLines = $$('.manifesto__text .line > span');
    gsap.fromTo(mLines, { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: .1, scrollTrigger: { trigger: '.manifesto', start: 'top 70%' } });
    gsap.fromTo('.manifesto__portrait', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'power3.inOut', scrollTrigger: { trigger: '.manifesto__portrait', start: 'top 85%', end: 'top 35%', scrub: .8 } });
    gsap.fromTo('.manifesto__portrait img', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.manifesto__portrait', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.fromTo('.manifesto__sig span', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 2.2, ease: 'power2.inOut', scrollTrigger: { trigger: '.manifesto__portrait', start: 'top 40%' } });
  }

  /* ---------- PROCESS ---------- */
  function process() {
    gsap.fromTo($$('.process .h2 .line > span'), { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: .1, scrollTrigger: { trigger: '.process', start: 'top 70%' } });
    const steps = $$('.step');
    const mm = gsap.matchMedia();
    mm.add('(min-width: 641px)', () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.timeline', start: 'top 75%', end: 'bottom 45%', scrub: .6,
          onUpdate: self => steps.forEach((s, i) => s.classList.toggle('is-on', self.progress >= i / steps.length + .02)),
        },
      })
        .to('.timeline__fill', { scaleX: 1, ease: 'none' }, 0)
        .to('.timeline__head', { left: '100%', ease: 'none' }, 0);
    });
    mm.add('(max-width: 640px)', () => {
      steps.forEach(s => ScrollTrigger.create({ trigger: s, start: 'top 75%', onEnter: () => s.classList.add('is-on'), onLeaveBack: () => s.classList.remove('is-on') }));
    });

    gsap.from('.for__card', { y: 60, opacity: 0, duration: 1.2, stagger: .1, scrollTrigger: { trigger: '.for__grid', start: 'top 85%' } });

    if (FINE) $$('.tilt').forEach(card => {
      const rx = gsap.quickTo(card, 'rotateX', { duration: .6, ease: 'power3.out' });
      const ry = gsap.quickTo(card, 'rotateY', { duration: .6, ease: 'power3.out' });
      card.addEventListener('pointermove', e => {
        const r = card.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        ry((px - .5) * 12); rx((.5 - py) * 12);
        card.style.setProperty('--mx', px * 100 + '%'); card.style.setProperty('--my', py * 100 + '%');
      });
      card.addEventListener('pointerleave', () => { rx(0); ry(0); });
    });
  }

  /* ---------- WORK ---------- */
  function work() {
    // wall of screens (fallback until v3-result.mp4 exists)
    const rows = $$('.wall__row');
    rows.forEach((row, r) => {
      const order = PROJECTS.map((_, i) => PROJECTS[(i + r * 3) % PROJECTS.length]);
      row.innerHTML = [...order, ...order].map(p => `<img src="${p.thumb}" alt="" loading="lazy">`).join('');
    });

    const wrap = $('#workMedia');
    const vs = makeScrub(wrap);
    const LOOP_END = 7; // seconds of free-playing showreel before the scrubbed pull-back
    if (vs.video) vs.video.addEventListener('timeupdate', () => {
      if (vs.mode === 'play' && vs.video.currentTime >= LOOP_END) vs.video.currentTime = 0;
    });

    ScrollTrigger.create({ trigger: '.work', start: 'top 150%', once: true, onEnter: () => vs.load && vs.load() });

    gsap.from('.work__title-line', { yPercent: 60, opacity: 0, duration: 1.4, stagger: .1, scrollTrigger: { trigger: '.work__intro', start: 'top 60%' } });

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.work__intro', start: 'top top', pin: true, scrub: .8, invalidateOnRefresh: true,
        end: () => '+=' + innerHeight * (isPhone() ? 1 : 2),
        onUpdate: self => {
          if (!vs.ready) return;
          const p = self.progress, v = vs.video;
          if (p < .7) {
            if (vs.mode !== 'play') { vs.mode = 'play'; v.play().catch(() => {}); }
          } else {
            if (vs.mode !== 'scrub') { vs.mode = 'scrub'; v.pause(); }
            const d = v.duration || 10;
            vs.cur = vs.target = (LOOP_END + (p - .7) / .3 * (d - LOOP_END)) / d;
          }
        },
        onLeave: () => gsap.fromTo('.flash', { opacity: .85 }, { opacity: 0, duration: .35, ease: 'power2.out' }),
      },
    });
    tl.fromTo(rows[0], { xPercent: -8 }, { xPercent: -38 }, 0)
      .fromTo(rows[1], { xPercent: -42 }, { xPercent: -12 }, 0)
      .fromTo(rows[2], { xPercent: -14 }, { xPercent: -44 }, 0)
      .to('.work__title', { scale: .42, duration: .8, ease: 'power2.inOut' }, 0)
      .to('.wall', { opacity: .35, duration: .4 }, .6);

    // grid
    layoutGrid(false);
    ScrollTrigger.batch('.card', {
      start: 'top 90%', once: true,
      onEnter: batch => {
        gsap.fromTo(batch.map(c => $('.card__media', c)), { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.3, stagger: .08, ease: 'expo.inOut' });
        gsap.fromTo(batch.map(c => $('.card__info', c)), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, stagger: .08, delay: .4 });
      },
    });
  }

  /* ---------- CONTACT + FOOTER ---------- */
  function contact() {
    gsap.fromTo($$('.contact__title .line > span'), { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: .1, scrollTrigger: { trigger: '.contact', start: 'top 65%' } });
    gsap.from(['.btn-giant', '.contact__link', '.availability'], { y: 40, opacity: 0, duration: 1.2, stagger: .08, scrollTrigger: { trigger: '.btn-giant', start: 'top 90%' } });
    // letterbox closes in to frame the final shot
    gsap.timeline({ scrollTrigger: { trigger: '.contact', start: 'top 70%', end: 'bottom 30%', scrub: .6 } })
      .to('.letterbox__bar', { scaleY: .55, duration: .3, ease: 'power2.out' })
      .to('.letterbox__bar', { scaleY: .55, duration: .4 })
      .to('.letterbox__bar', { scaleY: 0, duration: .3, ease: 'power2.in' });

    gsap.fromTo('.footer__mark .fit', { yPercent: 70, '--wdth': 62 }, { yPercent: 0, '--wdth': 100, ease: 'none', scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'bottom bottom', scrub: .6 } });
  }

  /* ---------- LETTERBOX CUTS between major scenes ---------- */
  function cuts() {
    const bars = $$('.letterbox__bar');
    const cut = () => gsap.timeline()
      .to(bars, { scaleY: 1, duration: .22, ease: 'power4.in' })
      .to(bars, { scaleY: 0, duration: .7, ease: 'expo.out', delay: .06 });
    ['.story', '.work'].forEach(s => ScrollTrigger.create({ trigger: s, start: 'top 55%', onEnter: cut }));
  }

  /* ---------- HUD: timecode, scenes, nav state, scrubber ---------- */
  function hud() {
    const tcs = $$('.js-tc'), sceneEl = $('.hud__scene'), nameEl = $('.hud__name');
    const header = $('.header'), head = $('.scrubber__head'), trackEl = $('.scrubber__track');
    const TOTAL = 144 * 24; // the page "runs" 00:02:24:00 at 24fps
    const navMap = { work: 'work', services: 'services', process: 'services', story: 'story', contact: 'contact' };
    const secs = $$('main section[id]'); // not `>`: pinned sections get wrapped in .pin-spacer
    let starts = [], curScene = -1;

    const onScroll = () => {
      const y = lenis ? lenis.scroll : scrollY;
      const max = lenis ? lenis.limit : document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      const f = Math.round(p * TOTAL);
      const txt = `00:${pad(f / 1440)}:${pad((f / 24) % 60)}:${pad(f % 24)}`;
      tcs.forEach(el => { el.textContent = txt; });
      head.style.transform = `translateX(${p * trackEl.clientWidth}px)`;
      $$('.scrubber__seg').forEach(seg => seg.classList.toggle('is-past', +seg.dataset.end <= y));
      const mid = y + innerHeight * .5;
      let cur = 0; starts.forEach((a, i) => { if (mid >= a) cur = i; });
      if (cur !== curScene && secs[cur]) {
        curScene = cur;
        const sec = secs[cur];
        sceneEl.textContent = 'SC.' + sec.dataset.scene;
        nameEl.textContent = sec.dataset.sceneName;
        $$('.nav__link').forEach(a => a.classList.toggle('is-active', a.dataset.section === (navMap[sec.id] || '')));
      }
      if (!$('#mobileMenu').classList.contains('is-open')) {
        const dir = lenis ? lenis.direction : 0;
        header.classList.toggle('is-hidden', dir === 1 && y > 240);
      }
    };
    lenis ? lenis.on('scroll', onScroll) : addEventListener('scroll', onScroll, { passive: true });

    // scrubber "clips" — built after every refresh because pins change the page length
    const build = () => {
      const pos = el => { const p = el.parentElement.classList.contains('pin-spacer') ? el.parentElement : el; return p.getBoundingClientRect().top + (lenis ? lenis.scroll : scrollY); };
      starts = secs.map(pos); curScene = -1;
      const endAll = document.documentElement.scrollHeight;
      trackEl.innerHTML = '';
      secs.forEach((s, i) => {
        const a = starts[i], b = i < secs.length - 1 ? starts[i + 1] : endAll;
        const seg = document.createElement('button');
        seg.className = 'scrubber__seg'; seg.style.flex = Math.max(1, b - a) + ' 1 0';
        seg.dataset.end = b; seg.setAttribute('aria-label', 'Jump to ' + s.dataset.sceneName);
        seg.innerHTML = `<span>SC.${s.dataset.scene} ${s.dataset.sceneName}</span>`;
        seg.addEventListener('click', () => lenis ? lenis.scrollTo(a, { duration: 1.8 }) : scrollTo({ top: a }));
        trackEl.append(seg);
      });
      onScroll();
    };
    ScrollTrigger.addEventListener('refresh', build);
  }

  /* ---------- CURSOR + MAGNETIC ---------- */
  function cursor() {
    if (!FINE) return;
    document.body.classList.add('has-cursor');
    const c = $('.cursor'), dot = $('.cursor__dot'), ring = $('.cursor__ring'), label = $('.cursor__label');
    const dx = gsap.quickTo(dot, 'x', { duration: .08, ease: 'power3' }), dy = gsap.quickTo(dot, 'y', { duration: .08, ease: 'power3' });
    const rx = gsap.quickTo(ring, 'x', { duration: .45, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: .45, ease: 'power3' });
    addEventListener('pointermove', e => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); c.classList.remove('is-hidden'); });
    root.addEventListener('mouseleave', () => c.classList.add('is-hidden'));
    const labels = { play: 'PLAY', view: 'VIEW', scrub: '◀ SCROLL ▶' };
    document.addEventListener('mouseover', e => {
      const t = e.target.closest('[data-cursor], a, button');
      c.classList.remove('is-link', 'is-play', 'is-view', 'is-scrub');
      if (!t) return;
      const kind = t.dataset.cursor;
      if (kind) { c.classList.add('is-' + kind); label.textContent = labels[kind] || ''; }
      else c.classList.add('is-link');
    });
  }

  function magnetic() {
    if (!FINE) return;
    $$('[data-magnetic]').forEach(el => {
      const strength = el.classList.contains('btn-giant') ? .12 : .3;
      const mx = gsap.quickTo(el, 'x', { duration: .6, ease: 'power3.out' }), my = gsap.quickTo(el, 'y', { duration: .6, ease: 'power3.out' });
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        mx(gsap.utils.clamp(-14, 14, (e.clientX - r.left - r.width / 2) * strength));
        my(gsap.utils.clamp(-14, 14, (e.clientY - r.top - r.height / 2) * strength));
      });
      el.addEventListener('pointerleave', () => gsap.to(el, { x: 0, y: 0, duration: 1.1, ease: 'elastic.out(1, .4)' }));
    });
  }

  /* ---------- RUN ---------- */
  fitText();
  hero();
  stats();
  mission();
  pillars();
  story();
  process();
  work();
  contact();
  cuts();
  hud();
  cursor();
  magnetic();

  preloader().then(intro);

  const refresh = () => { fitText(); layoutGrid(false); ScrollTrigger.sort(); ScrollTrigger.refresh(); };
  ScrollTrigger.sort(); ScrollTrigger.refresh();
  document.fonts && document.fonts.ready.then(refresh);
  addEventListener('load', () => ScrollTrigger.refresh());
  let lastW = innerWidth;
  addEventListener('resize', debounce(() => {
    if (innerWidth === lastW && isTablet()) return; // ignore mobile URL-bar height changes
    lastW = innerWidth; refresh();
  }, 250));
})();
