import { initTextReveals, disposeTextReveals } from './text-reveal.js';

/* Browser interactions. Views and content are shared with the static build. */
var { views, state, pathFor, wireImages, FILTERS, passes, optsFor,
  esc, link, dFull, deptOf, visual, plateBg, designerRows } = globalThis.Forme;
var app, nav, sfield, sicon, cancelBtn, q;
var navigate;
var pageEvents, headerEvents;

function render() {
  var y = app.scrollTop;
  var parts = state.route.split(':');
  disposeTextReveals(app);
  app.innerHTML = views[parts[0]](parts[1]);
  initPage(app, false);
  app.scrollTop = y;
}

function go(route, type) {
  var url = pathFor(route);
  if (type) url += '?type=' + encodeURIComponent(type);
  closeSearch(); closeSheets(true);
  if (navigate) navigate(url); else location.assign(url);
}

export function setupOnce(navigateTo) {
  navigate = navigateTo;
  if (setupOnce.done) return;
  setupOnce.done = true;
  setupInteractions();
}

// Persistent overlays and document listeners are mounted exactly once.
var closeSearch, closeSheets, openSearch, renderSearch, renderMenu, showSheet;
function setupInteractions() {
  /* ---------- Search ---------- */
  var spanel = document.getElementById('spanel');
  var sres = document.getElementById('sresults');
  var searchScrim = document.getElementById('searchScrim');
  var searchOpen = false, clearTimer = null, openSheet = null;
  openSearch = function () {
    if (searchOpen) return;
    if (openSheet) closeSheets(true);
    searchOpen = true; clearTimeout(clearTimer);
    nav.classList.remove('hide');
    nav.classList.add('searching'); document.body.classList.add('searching');
    renderSearch();
    spanel.inert = false;
    spanel.classList.add('open', 'stagger');
    searchScrim.classList.add('open');
    nav.querySelector('#openSearch').setAttribute('aria-expanded', 'true');
    nav.querySelectorAll('.navlinks, .brand').forEach(function (el) { el.inert = true; });
    app.inert = true;
    q.disabled = false; q.removeAttribute('aria-hidden');
    q.tabIndex = 0; cancelBtn.tabIndex = 0;
    app.style.overflowY = 'hidden';
    try { q.focus({ preventScroll: true }); } catch (e) { q.focus(); }
  }
  closeSearch = function () {
    if (!searchOpen) return;
    searchOpen = false;
    q.blur();
    nav.classList.remove('searching'); document.body.classList.remove('searching');
    spanel.classList.remove('open');
    spanel.inert = true;
    searchScrim.classList.remove('open');
    nav.querySelector('#openSearch').setAttribute('aria-expanded', 'false');
    nav.querySelectorAll('.navlinks, .brand').forEach(function (el) { el.inert = false; });
    app.inert = !!openSheet;
    q.disabled = true; q.setAttribute('aria-hidden', 'true');
    q.tabIndex = -1; cancelBtn.tabIndex = -1;
    if (!openSheet) app.style.overflowY = '';
    var previousInput = q;
    clearTimer = setTimeout(function () { previousInput.value = ''; spanel.classList.remove('stagger'); }, 300);
    nav.querySelector('#openSearch').focus({ preventScroll: true });
  }
  function hay(o) { return [o.name, dFull(o), o.type, o.era, o.origin, o.materials, o.status, o.manufacturer || '', deptOf(o.dept).label].join(' ').toLowerCase(); }
  renderSearch = function () {
    spanel.querySelector('.search-content').scrollTop = 0;
    var t = q.value.trim().toLowerCase();
    if (!t) {
      sres.innerHTML = renderMenu() + '<div class="sgroup"><div class="label muted">Popular designers</div><div style="margin-top:8px">' +
        ['poul-henningsen', 'charles-and-ray-eames', 'arne-jacobsen', 'alvar-aalto'].map(function (id) { var d = dById[id]; return link('designer:' + id, '<span class="nm">' + esc(d.name) + '</span><span class="meta">' + d.count + '</span>', 'irow'); }).join('') +
        '</div></div><div class="sgroup"><div class="label muted">Browse</div><div class="chips" style="margin-top:12px">' +
        [['lighting', 'Pendant'], ['lighting', 'Desk'], ['furniture', 'Lounge'], ['furniture', 'Chair'], ['objects', 'Vase']].map(function (p) { return '<button class="chip sq" data-dept-type="' + p[0] + '|' + p[1] + '">' + p[1] + '</button>'; }).join('') + '</div></div>' +
        '<div class="sgroup"><div class="label muted">Try</div><div class="chips" style="margin-top:12px">' + ['1950s', 'Denmark', 'Plywood', 'Glass'].map(function (w) { return '<button class="chip sq" data-fill="' + w + '">' + w + '</button>'; }).join('') + '</div></div>';
      return;
    }
    var objs = OBJECTS.filter(function (o) { return hay(o).indexOf(t) > -1; }).sort(function (a, b) { return a.year - b.year; });
    var sts = STORIES.filter(function (s) { return [s.title, s.lede, s.featured.map(function (f) { return oBySlug[f].name + ' ' + dFull(oBySlug[f]); }).join(' ')].join(' ').toLowerCase().indexOf(t) > -1; });
    var des = DESIGNERS.filter(function (d) { return (d.name + ' ' + d.country).toLowerCase().indexOf(t) > -1; });
    if (!objs.length && !sts.length && !des.length) {
      sres.innerHTML = '<div class="sgroup"><p>No results for “' + esc(q.value.trim()) + '”.</p><p class="muted" style="margin-top:8px;font-size:var(--t14)">Try a designer, a material or a decade, for example 1950s.</p><button class="btn sq" style="margin-top:20px" data-fill="">Show suggestions</button></div>';
      return;
    }
    var h = '';
    if (objs.length) h += '<div class="sgroup"><div class="label muted">Objects · ' + objs.length + '</div><div style="margin-top:8px">' + objs.map(function (o) {
      return link('object:' + o.slug, '<span class="sthumb"' + plateBg(o) + '>' + visual(o) + '</span><span style="flex:1;display:flex;flex-direction:column;gap:2px;min-width:0"><span class="serif" style="font-size:var(--t22);line-height:1.1">' + esc(o.name) + '</span><span class="muted" style="font-size:var(--t14)">' + esc(dFull(o)) + ' · ' + esc(o.yearLabel) + '</span></span>', 'srow');
    }).join('') + '</div></div>';
    if (sts.length) h += '<div class="sgroup"><div class="label muted">Stories</div><div style="margin-top:8px">' + sts.map(function (s) {
      return link('story:' + s.slug, '<span class="serif" style="font-size:var(--t22);line-height:1.15">' + esc(s.title) + '</span>', 'srow', ' style="padding:14px 0"');
    }).join('') + '</div></div>';
    if (des.length) h += '<div class="sgroup"><div class="label muted">Designers</div>' + designerRows(des) + '</div>';
    sres.innerHTML = h;
    wireImages(sres);
  }

  /* ---------- Sheets ---------- */
  var scrim = document.getElementById('scrim');
  var filterSheet = document.getElementById('filterSheet');
  var returnFocus = null;
  function focusables(root) { return Array.prototype.filter.call(root.querySelectorAll('a[href],button:not([disabled]),input'), function (x) { return x.offsetParent !== null; }); }
  showSheet = function (el) {
    closeSearch(); returnFocus = document.activeElement; openSheet = el;
    scrim.classList.add('open'); el.classList.add('open');
    app.style.overflowY = 'hidden';
    app.inert = true; nav.inert = true;
    setTimeout(function () { var f = focusables(el)[0]; if (f) { try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); } } }, 80);
  }
  closeSheets = function (navigating) {
    var wasOpen = !!openSheet;
    [filterSheet].forEach(function (s) { s.classList.remove('open'); s.style.transform = ''; });
    scrim.classList.remove('open');
    openSheet = null; if (!searchOpen) app.style.overflowY = '';
    app.inert = false; nav.inert = false;
    if (wasOpen && navigating !== true && returnFocus && returnFocus.focus) { try { returnFocus.focus({ preventScroll: true }); } catch (e) {} }
    returnFocus = null;
  }
  searchScrim.addEventListener('click', function () { closeSearch(); });
  scrim.addEventListener('click', function () { closeSheets(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = openSheet ? focusables(openSheet) : searchOpen ? [q, cancelBtn].concat(focusables(spanel)) : [];
    if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (openSheet) closeSheets(); else if (searchOpen) closeSearch(); }
    if (e.key.toLowerCase() === 'f' && !e.metaKey && !e.ctrlKey && !e.altKey && !e.target.closest('input, textarea, select, [contenteditable]') && !openSheet) { e.preventDefault(); openSearch(); }
  });
  [filterSheet].forEach(function (sheet) {
    var startY = null, dy = 0, t0 = 0;
    sheet.addEventListener('touchstart', function (e) {
      if (!openSheet) return;
      var body = sheet.querySelector('.sheet-body');
      if (e.touches.length > 1 || (body && body.scrollTop > 0 && body.contains(e.target))) { startY = null; return; }
      startY = e.touches[0].clientY; dy = 0; t0 = Date.now(); sheet.classList.add('drag');
    }, { passive: true });
    sheet.addEventListener('touchmove', function (e) {
      if (startY === null) return;
      var raw = e.touches[0].clientY - startY;
      dy = raw > 0 ? raw : raw * 0.2; /* friction when pulled upwards */
      sheet.style.transform = 'translateY(' + dy + 'px)';
    }, { passive: true });
    sheet.addEventListener('touchend', function () {
      if (startY === null) return;
      sheet.classList.remove('drag'); startY = null;
      var v = dy / Math.max(1, Date.now() - t0);
      if (dy > 90 || v > 0.5) closeSheets(); else sheet.style.transform = '';
    });
  });

  renderMenu = function () {
    var cur = state.route.split(':')[0];
    var active = (cur === 'collection' || cur === 'object') ? 'collection:' + state.dept : ({ stories: 'stories', story: 'stories', designers: 'designers', designer: 'designers', about: 'about' })[cur];
    var items = [['collection:lighting', 'Lighting'], ['collection:furniture', 'Furniture'], ['collection:objects', 'Objects'], ['stories', 'Stories'], ['designers', 'Designers'], ['about', 'About']];
    return '<nav class="search-navigation" aria-label="Main navigation">' + items.map(function (m) {
      return link(m[0], '<span class="mslot">' + (active === m[0] ? '<i class="dot"></i>' : '') + '</span>' + m[1], 'menu-link', active === m[0] ? ' aria-current="page"' : '');
    }).join('') + '</nav>';
  }

  var draft = {};
  function renderFilter() {
    var n = OBJECTS.filter(function (o) { return passes(o, draft, state.type); }).length;
    document.getElementById('filterBody').innerHTML = FILTERS.map(function (f) {
      var opts = optsFor(f); if (opts.length < 2) return '';
      return '<fieldset style="border:0;margin:0;padding:20px 0 0;min-width:0"><legend class="label muted" style="padding:0">' + f.label + '</legend><div class="chips" style="margin-top:12px">' + opts.map(function (opt) {
        var cur = draft[f.key] || []; var on = cur.indexOf(opt) > -1;
        var trial = Object.assign({}, draft); trial[f.key] = on ? cur : cur.concat([opt]);
        var dead = !on && !OBJECTS.some(function (o) { return passes(o, trial, state.type); });
        return '<button class="chip sq' + (on ? ' on' : '') + '" data-opt="' + f.key + '|' + esc(opt) + '" aria-pressed="' + on + '"' + (dead ? ' disabled' : '') + '>' + (on ? '<i class="dot"></i>' : '') + esc(opt) + '</button>';
      }).join('') + '</div></fieldset>';
    }).join('');
    document.getElementById('applyFilter').textContent = 'Show ' + n + (n === 1 ? ' object' : ' objects');
  }
  document.getElementById('filterBody').addEventListener('click', function (e) {
    var b = e.target.closest('[data-opt]'); if (!b || b.disabled) return;
    var p = b.dataset.opt.split('|'); var cur = draft[p[0]] || [];
    draft[p[0]] = cur.indexOf(p[1]) > -1 ? cur.filter(function (x) { return x !== p[1]; }) : cur.concat([p[1]]);
    renderFilter();
  });
  document.getElementById('resetFilter').addEventListener('click', function () { draft = {}; renderFilter(); });
  document.getElementById('applyFilter').addEventListener('click', function () { state.sel = draft; state.shown = 8; closeSheets(true); render(); var tb = app.querySelector('.toolbar'); if (tb) app.scrollTo({ top: Math.max(0, tb.getBoundingClientRect().top - app.getBoundingClientRect().top + app.scrollTop - nav.offsetHeight - 8), behavior: reduced() ? 'auto' : 'smooth' }); });

  /* ---------- Delegated clicks ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    var a = t.closest('[data-go]');
    if (a) {
      // Real anchors belong to Swup, including modified clicks and external targets.
      if (a.matches('a[href]')) return;
      e.preventDefault(); go(a.dataset.go); return;
    }
    var tg = t.closest('[data-type-go]');
    if (tg) { go('collection:' + state.dept, tg.dataset.typeGo); return; }
    var dt = t.closest('[data-dept-type]');
    if (dt) { var pp = dt.dataset.deptType.split('|'); go('collection:' + pp[0], pp[1]); return; }
    var fill = t.closest('[data-fill]');
    if (fill) { q.value = fill.dataset.fill; spanel.classList.remove('stagger'); renderSearch(); q.focus(); return; }
    if (!app.contains(t)) return;
    var ty = t.closest('[data-type]');
    if (ty) { state.type = state.type === ty.dataset.type ? null : ty.dataset.type; state.shown = 8; render(); return; }
    var vb = t.closest('[data-view]');
    if (vb) { state.view = vb.dataset.view; try { localStorage.setItem('forme-view', state.view); } catch (err) {} render(); return; }
    if (t.closest('#openFilter')) { draft = JSON.parse(JSON.stringify(state.sel)); renderFilter(); showSheet(filterSheet); return; }
    if (t.closest('#loadMore')) { state.shown += 8; render(); return; }
    if (t.closest('#clearAll')) { state.sel = {}; state.type = null; render(); return; }
    if (t.closest('[data-cleartype]')) { state.type = null; render(); return; }
    var un = t.closest('[data-unsel]');
    if (un) { var p = un.dataset.unsel.split('|'); state.sel[p[0]] = (state.sel[p[0]] || []).filter(function (x) { return x !== p[1]; }); render(); return; }
    var gb = t.closest('[data-gal]');
    if (gb) { var gl = app.querySelector('#gallery'); if (gl) gl.scrollBy({ left: +gb.dataset.gal * gl.clientWidth, behavior: reduced() ? 'auto' : 'smooth' }); return; }
    var fq = t.closest('[data-faq]');
    if (fq) { var i = +fq.dataset.faq; state.faqOpen = state.faqOpen === i ? -1 : i; var y = app.scrollTop; render(); app.scrollTop = y; return; }
  });

  document.addEventListener('keydown', function (e) {
    var gl = app.querySelector('#gallery');
    if (!gl || document.activeElement !== gl || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
    e.preventDefault(); gl.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * gl.clientWidth, behavior: reduced() ? 'auto' : 'smooth' });
  });
  function reduced() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }

}

export function initHeader(scope) {
  headerEvents?.abort();
  headerEvents = new AbortController();
  var options = { signal: headerEvents.signal };
  nav = scope;
  sfield = scope.querySelector('#sfield');
  sicon = scope.querySelector('#sicon');
  cancelBtn = scope.querySelector('#closeSearch');
  q = scope.querySelector('#q');
  scope.querySelector('#openSearch').addEventListener('click', openSearch, options);
  cancelBtn.addEventListener('click', closeSearch, options);
  q.addEventListener('input', function () { document.getElementById('spanel').classList.remove('stagger'); renderSearch(); }, options);
  q.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSearch(); }, options);
}

export function initPage(scope, reset = true, snapshot) {
  pageEvents?.abort();
  pageEvents = new AbortController();
  app = scope;
  if (reset) {
    state.route = scope.dataset.route;
    state.dept = scope.dataset.dept || 'lighting';
    state.type = new URLSearchParams(location.search).get('type');
    state.sel = {}; state.shown = 8; state.faqOpen = 0;
    try { state.view = localStorage.getItem('forme-view') === 'list' ? 'list' : 'grid'; } catch (e) { state.view = 'grid'; }
    if (snapshot && snapshot.route === state.route) Object.assign(state, snapshot);
    if ((state.route.startsWith('collection:') && (snapshot || state.type || state.view === 'list')) || (snapshot && state.route.startsWith('story:'))) {
      var parts = state.route.split(':');
      scope.innerHTML = views[parts[0]](parts[1]);
    }
  }
  scope.addEventListener('scroll', function () {
    // Keep the fixed header above the scrolling page; only Swup transforms it.
    nav.classList.toggle('lined', scope.scrollTop > 4);
  }, { passive: true, signal: pageEvents.signal });
  var hero = scope.querySelector('#gallery img.ph');
  if (hero) { hero.loading = 'eager'; hero.setAttribute('fetchpriority', 'high'); }
  wireImages(scope);
  initTextReveals(scope, document.documentElement.classList.contains('is-changing') ? 0.7 : 0);
  var gallery = scope.querySelector('#gallery');
  if (gallery) gallery.addEventListener('scroll', function () {
    scope.querySelector('#gcount').textContent = (Math.round(gallery.scrollLeft / gallery.clientWidth) + 1) + ' / ' + gallery.children.length;
  }, { passive: true, signal: pageEvents.signal });
}

export function beforeVisit() {
  disposeTextReveals(app, { preserve: true });
  closeSearch(); closeSheets(true);
  nav.classList.remove('hide');
  pageEvents?.abort();
  headerEvents?.abort();
}

export function capturePageState() {
  return JSON.parse(JSON.stringify(state));
}
