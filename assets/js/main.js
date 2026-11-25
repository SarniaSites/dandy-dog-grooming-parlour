/* Dandy Dog Grooming Parlour – small vanilla enhancements */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- header shrink + mobile bar ---------- */
  var header = $('[data-header]');
  var mbar = $('[data-mbar]');
  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (mbar) mbar.classList.toggle('show', y > window.innerHeight * 0.55);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var burger = $('[data-burger]');
  var mnav = $('[data-mnav]');
  function closeMenu() {
    if (!burger) return;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    mnav.classList.remove('open');
  }
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') !== 'true';
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      mnav.classList.toggle('open', open);
    });
    $$('a', mnav).forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* ---------- active section in the nav ---------- */
  var navLinks = $$('[data-nav]');
  if ('IntersectionObserver' in window && navLinks.length) {
    var map = {};
    navLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
          map[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) secObs.observe(s); });
  }

  /* ---------- hero: drops shift a touch with the cursor ---------- */
  var hero = $('[data-hero]');
  if (hero && fine && !reduce) {
    var layers = $$('[data-depth]', hero);
    var raf = null, mx = 0, my = 0;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(function () {
        layers.forEach(function (l) {
          var d = +l.getAttribute('data-depth');
          l.style.translate = (mx * d).toFixed(1) + 'px ' + (my * d).toFixed(1) + 'px';
        });
        raf = null;
      });
    });
  }

  /* ---------- pause ambient loops when offscreen ---------- */
  if ('IntersectionObserver' in window) {
    var loopObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { en.target.classList.toggle('paused', !en.isIntersecting); });
    });
    $$('[data-hero], [data-loop], [data-stage]').forEach(function (el) { loopObs.observe(el); });
  }

  /* ---------- a few reveals (not everything) ---------- */
  var rvs = $$('.rv, .rv-l');
  if ('IntersectionObserver' in window && !reduce) {
    var rvObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); rvObs.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    rvs.forEach(function (el) { rvObs.observe(el); });
  } else rvs.forEach(function (el) { el.classList.add('in'); });

  /* ---------- coat explorer (tabs) ---------- */
  var coats = $('[data-coats]');
  if (coats) {
    var tabs = $$('[role="tab"]', coats);
    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
      if (window.innerWidth < 1024) tab.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduce ? 'auto' : 'smooth' });
    };
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var k = e.key, n = null;
        if (k === 'ArrowDown' || k === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        if (k === 'ArrowUp' || k === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (k === 'Home') n = tabs[0];
        if (k === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  }
  // "Book a ..." buttons pre-fill the form's service
  $$('[data-pick]').forEach(function (b) {
    b.addEventListener('click', function () {
      var s = $('#f-service');
      if (s) s.value = b.getAttribute('data-pick');
    });
  });

  /* ---------- groom sequence: the scottie follows the steps ---------- */
  var stage = $('[data-stage]');
  var steps = $$('[data-steps] [data-step]');
  if (stage && steps.length) {
    var setStep = function (n) {
      stage.setAttribute('data-step', n);
      steps.forEach(function (s) { s.classList.toggle('is-on', +s.getAttribute('data-step') <= n && +s.getAttribute('data-step') === n); });
    };
    var tapped = false;
    var pick = function () {
      if (tapped) return;
      var line = window.innerHeight * 0.55, n = 0;
      steps.forEach(function (s) { if (s.getBoundingClientRect().top < line) n = +s.getAttribute('data-step'); });
      if (+stage.getAttribute('data-step') !== n) setStep(n);
    };
    if (reduce) setStep(4);
    window.addEventListener('scroll', function () { tapped = false; pick(); }, { passive: true });
    pick();
    // tapping a step jumps the drawing to it
    steps.forEach(function (s) {
      s.addEventListener('click', function () { setStep(+s.getAttribute('data-step')); tapped = true; });
    });
  }

  /* ---------- gallery lightbox ---------- */
  var lb = $('[data-lb]');
  var items = $$('[data-gallery] a');
  if (lb && items.length) {
    var img = $('[data-lb-img]', lb), cap = $('[data-lb-cap]', lb);
    var idx = 0, lastFocus = null, sx = null;
    var show = function (i) {
      idx = (i + items.length) % items.length;
      var a = items[idx], th = $('img', a);
      img.style.opacity = '0';
      var src = a.getAttribute('href');
      var tmp = new Image();
      tmp.onload = function () { img.src = src; img.alt = th ? th.alt : ''; img.style.opacity = '1'; };
      tmp.src = src;
      cap.textContent = a.getAttribute('data-caption') || '';
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      $('[data-lb-close]', lb).focus();
    };
    var close = function () {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    items.forEach(function (a, i) {
      a.addEventListener('click', function (e) { e.preventDefault(); open(i); });
    });
    $('[data-lb-close]', lb).addEventListener('click', close);
    $('[data-lb-prev]', lb).addEventListener('click', function () { show(idx - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'Tab') { // keep focus inside
        var f = $$('button', lb), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (sx === null) return;
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 45) show(idx + (dx < 0 ? 1 : -1));
      sx = null;
    });
  }

  /* ---------- form: inline validation + sending state ---------- */
  var form = $('[data-form]');
  if (form) {
    var check = function (el) {
      var f = el.closest('.field');
      if (!f) return true;
      var ok = el.checkValidity() && !(el.required && !el.value.trim());
      f.classList.toggle('invalid', !ok);
      f.classList.toggle('valid', ok && el.value.trim() !== '' && el.tagName !== 'SELECT');
      el.setAttribute('aria-invalid', String(!ok));
      return ok;
    };
    $$('input:not([type=hidden]):not([name=_honey]), select, textarea', form).forEach(function (el) {
      el.addEventListener('blur', function () { if (el.value) check(el); });
      el.addEventListener('input', function () { if (el.closest('.field.invalid')) check(el); });
      el.addEventListener('change', function () { check(el); });
    });
    form.addEventListener('submit', function (e) {
      var fields = $$('[required]', form), bad = null;
      fields.forEach(function (el) { if (!check(el) && !bad) bad = el; });
      if (bad) { e.preventDefault(); bad.focus(); return; }
      var btn = $('[data-submit]', form);
      btn.disabled = true;
      $('[data-label]', btn).textContent = 'Sending…';
      var ic = $('svg', btn); if (ic) ic.outerHTML = '<span class="spinner" aria-hidden="true"></span>';
    });
  }

  var yr = $('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
