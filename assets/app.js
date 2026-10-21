/* formé: routing, views, search, sheets. Reads the globals defined in data.js. */
(function () {
  'use strict';
  /* ---------- Illustrations (placeholders until licensed photos are added) ---------- */
  function ring(n, r, cx, cy, fn) { var s = ''; for (var i = 0; i < n; i++) { var a = (i / n) * Math.PI * 2 - Math.PI / 2; s += fn(cx + Math.cos(a) * r, cy + Math.sin(a) * r, i); } return s; }
  var ART = {
    ph5: '<line x1="60" y1="0" x2="60" y2="74" stroke="#2B1A16" stroke-width=".6"/><path d="M42 82 Q60 64 78 82 Z" fill="#FAF6EE"/><path d="M26 98 Q60 72 94 98 Z" fill="#FAF6EE"/><path d="M36 106 Q60 94 84 106 Z" fill="#E3DACB"/>',
    artichoke: '<line x1="60" y1="0" x2="60" y2="50" stroke="#2B1A16" stroke-width=".6"/><path d="M60 52 L72 64 L60 60 L48 64 Z" fill="#B89A6A"/><path d="M60 62 L80 80 L60 74 L40 80 Z" fill="#C4A574"/><path d="M60 76 L86 98 L60 90 L34 98 Z" fill="#B89A6A"/><path d="M60 92 L84 114 L60 106 L36 114 Z" fill="#C4A574"/><path d="M60 106 L74 120 L60 116 L46 120 Z" fill="#A98B5C"/>',
    akari: '<rect x="40" y="34" width="40" height="78" rx="16" fill="#FBF7EF" stroke="#CFC4B3" stroke-width=".8"/><line x1="42" y1="52" x2="78" y2="52" stroke="#E2D8C8"/><line x1="40" y1="68" x2="80" y2="68" stroke="#E2D8C8"/><line x1="40" y1="84" x2="80" y2="84" stroke="#E2D8C8"/><line x1="42" y1="100" x2="78" y2="100" stroke="#E2D8C8"/><line x1="52" y1="112" x2="46" y2="134" stroke="#2B1A16"/><line x1="68" y1="112" x2="74" y2="134" stroke="#2B1A16"/>',
    arco: '<rect x="18" y="138" width="26" height="12" fill="#EFEBE4" stroke="#BFB5A6" stroke-width=".8"/><path d="M31 138 Q26 18 100 58" fill="none" stroke="#8C8A85" stroke-width="1.8"/><path d="M86 62 Q100 44 114 62 Z" fill="#A3A19B"/>',
    murano: '<line x1="60" y1="0" x2="60" y2="70" stroke="#6B5A3E" stroke-width="1.5"/><circle cx="60" cy="96" r="28" fill="#3F4F8F"/><circle cx="50" cy="86" r="4" fill="#E7B54A"/><circle cx="66" cy="84" r="3" fill="#F4EFE6"/><circle cx="72" cy="100" r="4" fill="#E7B54A"/><circle cx="55" cy="104" r="3" fill="#F4EFE6"/><circle cx="62" cy="114" r="3" fill="#E7B54A"/><circle cx="44" cy="98" r="3" fill="#E7B54A"/><circle cx="76" cy="88" r="2.5" fill="#F4EFE6"/>',
    panthella: '<path d="M28 78 Q60 30 92 78 Z" fill="#FAF6EE"/><path d="M56 78 L64 78 L82 132 L38 132 Z" fill="#FAF6EE"/><line x1="36" y1="132" x2="84" y2="132" stroke="#D8CFC2"/>',
    tizio: '<line x1="56" y1="140" x2="40" y2="78" stroke="#1E1A18" stroke-width="1.8"/><line x1="40" y1="78" x2="92" y2="48" stroke="#1E1A18" stroke-width="1.8"/><path d="M86 44 L100 52 L96 60 L82 52 Z" fill="#1E1A18"/><rect x="44" y="138" width="24" height="8" fill="#1E1A18"/><circle cx="40" cy="78" r="2.5" fill="#1E1A18"/>',
    anglepoise: '<rect x="30" y="140" width="34" height="8" fill="#2B2B2B"/><line x1="47" y1="140" x2="40" y2="92" stroke="#2B2B2B" stroke-width="2"/><line x1="40" y1="92" x2="76" y2="58" stroke="#2B2B2B" stroke-width="2"/><line x1="44" y1="132" x2="38" y2="100" stroke="#8C8A85" stroke-width="1"/><path d="M70 52 L94 62 L84 78 Z" fill="#2B2B2B"/><circle cx="40" cy="92" r="3" fill="#2B2B2B"/>',
    tolomeo: '<ellipse cx="44" cy="144" rx="18" ry="4" fill="#9A9894"/><line x1="44" y1="144" x2="40" y2="84" stroke="#9A9894" stroke-width="2"/><line x1="40" y1="84" x2="88" y2="60" stroke="#9A9894" stroke-width="2"/><line x1="40" y1="84" x2="64" y2="96" stroke="#7E7C78" stroke-width=".8"/><path d="M82 58 L98 60 L96 76 Z" fill="#9A9894"/><circle cx="40" cy="84" r="2.5" fill="#7E7C78"/>',
    atollo: '<rect x="46" y="118" width="28" height="26" fill="#2F2F2F"/><path d="M48 118 L72 118 L62 80 L58 80 Z" fill="#2F2F2F"/><path d="M30 76 Q60 34 90 76 Z" fill="#2F2F2F"/>',
    pipistrello: '<path d="M44 146 Q60 128 76 146 Z" fill="#ECE7DE" stroke="#BDB3A4" stroke-width=".8"/><rect x="58" y="74" width="4" height="64" fill="#BDB3A4"/><path d="M24 76 Q30 62 42 66 Q50 54 60 58 Q70 54 78 66 Q90 62 96 76 Q60 86 24 76 Z" fill="#FBF8F2" stroke="#D2C8BA" stroke-width=".8"/>',
    taccia: '<rect x="48" y="96" width="24" height="48" fill="#D9D4CC"/><line x1="54" y1="96" x2="54" y2="144" stroke="#BEB7AD"/><line x1="60" y1="96" x2="60" y2="144" stroke="#BEB7AD"/><line x1="66" y1="96" x2="66" y2="144" stroke="#BEB7AD"/><path d="M22 68 Q60 112 98 68 Z" fill="#F6F4EF" stroke="#CFC8BD" stroke-width=".8"/><rect x="42" y="144" width="36" height="4" fill="#BEB7AD"/>',
    thonet: '<path d="M44 92 L44 40 Q44 22 60 22 Q76 22 76 40 L76 92" fill="none" stroke="#6B4A2E" stroke-width="3"/><path d="M48 44 Q60 34 72 44" fill="none" stroke="#6B4A2E" stroke-width="2"/><ellipse cx="60" cy="92" rx="22" ry="6" fill="#D8C49A" stroke="#6B4A2E" stroke-width="2.5"/><line x1="42" y1="96" x2="36" y2="148" stroke="#6B4A2E" stroke-width="3"/><line x1="78" y1="96" x2="84" y2="148" stroke="#6B4A2E" stroke-width="3"/><line x1="52" y1="98" x2="50" y2="146" stroke="#6B4A2E" stroke-width="2.5"/><line x1="68" y1="98" x2="70" y2="146" stroke="#6B4A2E" stroke-width="2.5"/><ellipse cx="60" cy="124" rx="19" ry="4" fill="none" stroke="#6B4A2E" stroke-width="2"/>',
    wassily: '<path d="M30 142 L30 98 L90 98 L90 142 M30 98 L40 48 L80 48 L90 98 M30 142 L90 142" fill="none" stroke="#A9A9A6" stroke-width="2.5"/><path d="M36 86 L84 86" stroke="#1E1A18" stroke-width="10"/><path d="M42 58 L78 58" stroke="#1E1A18" stroke-width="12"/><path d="M28 108 L46 108 M74 108 L92 108" stroke="#1E1A18" stroke-width="6"/>',
    lc4: '<path d="M20 66 Q40 122 102 104" fill="none" stroke="#1E1A18" stroke-width="11" stroke-linecap="round"/><path d="M22 60 Q42 114 102 96" fill="none" stroke="#A9A9A6" stroke-width="2"/><path d="M38 142 L46 112 M84 142 L76 112 M40 112 L82 112" stroke="#1E1A18" stroke-width="3" fill="none"/>',
    barcelona: '<path d="M28 142 Q56 98 92 60 M36 72 Q68 110 94 142" fill="none" stroke="#B0AEAA" stroke-width="3"/><rect x="38" y="88" width="54" height="15" rx="4" fill="#2A2522"/><rect x="38" y="52" width="18" height="44" rx="4" fill="#2A2522" transform="rotate(-18 47 74)"/>',
    paimio: '<path d="M36 140 Q22 100 40 70 Q50 52 44 36" fill="none" stroke="#C9A877" stroke-width="5"/><path d="M86 140 Q98 104 80 72" fill="none" stroke="#C9A877" stroke-width="5"/><path d="M40 42 Q54 40 56 60 Q60 96 88 104 Q94 106 90 112" fill="none" stroke="#E2C9A0" stroke-width="6" stroke-linecap="round"/><line x1="36" y1="140" x2="86" y2="140" stroke="#C9A877" stroke-width="5"/>',
    noguchitable: '<path d="M40 102 Q34 120 46 138 L56 138 Q50 120 58 104 Z" fill="#3B2A1E"/><path d="M58 104 Q74 118 70 138 L80 138 Q86 118 74 102 Z" fill="#3B2A1E"/><path d="M12 92 Q40 74 80 80 Q112 84 106 96 Q80 106 40 103 Q8 100 12 92 Z" fill="#CFDCDA" fill-opacity=".75" stroke="#AFC0BD"/>',
    wishbone: '<path d="M38 52 Q60 40 82 52" fill="none" stroke="#C49A62" stroke-width="5" stroke-linecap="round"/><path d="M60 47 L60 62 M60 62 L50 92 M60 62 L70 92" stroke="#C49A62" stroke-width="3" fill="none"/><path d="M38 52 L40 146 M82 52 L80 146" stroke="#C49A62" stroke-width="4"/><rect x="36" y="90" width="48" height="8" fill="#D9C79E"/><line x1="48" y1="98" x2="48" y2="146" stroke="#C49A62" stroke-width="3"/><line x1="72" y1="98" x2="72" y2="146" stroke="#C49A62" stroke-width="3"/>',
    butterfly: '<path d="M60 84 Q40 70 22 92 Q30 110 42 112 L50 142 L58 142 L58 92 Z" fill="#B57B48"/><path d="M60 84 Q80 70 98 92 Q90 110 78 112 L70 142 L62 142 L62 92 Z" fill="#9C6638"/><line x1="44" y1="128" x2="76" y2="128" stroke="#C9A24D" stroke-width="2"/>',
    series7: '<path d="M44 40 Q60 30 76 40 L74 70 Q60 76 72 92 L48 92 Q60 76 46 70 Z" fill="#2B2B2B"/><path d="M40 92 L80 92 L82 100 L38 100 Z" fill="#2B2B2B"/><line x1="44" y1="100" x2="40" y2="146" stroke="#9A9894" stroke-width="2"/><line x1="76" y1="100" x2="80" y2="146" stroke="#9A9894" stroke-width="2"/><line x1="52" y1="100" x2="50" y2="146" stroke="#9A9894" stroke-width="2"/><line x1="68" y1="100" x2="70" y2="146" stroke="#9A9894" stroke-width="2"/>',
    eameslounge: '<rect x="28" y="40" width="46" height="36" rx="10" fill="#4A2E1E" transform="rotate(-12 51 58)"/><rect x="34" y="45" width="34" height="27" rx="8" fill="#1E1A18" transform="rotate(-12 51 58)"/><rect x="28" y="78" width="56" height="22" rx="10" fill="#4A2E1E"/><rect x="32" y="80" width="48" height="16" rx="7" fill="#1E1A18"/><path d="M56 100 L56 116 M56 116 L36 126 M56 116 L76 126" stroke="#9A9894" stroke-width="3"/><rect x="88" y="104" width="26" height="14" rx="6" fill="#1E1A18"/><path d="M101 118 L101 126 M101 126 L92 132 M101 126 L110 132" stroke="#9A9894" stroke-width="2.5"/>',
    tulip: '<path d="M42 46 Q60 38 78 46 L80 74 Q60 82 40 74 Z" fill="#FAF8F3" stroke="#D6CFC4"/><path d="M36 70 Q36 100 60 102 Q84 100 84 70 Q80 92 60 94 Q40 92 36 70 Z" fill="#FAF8F3" stroke="#D6CFC4"/><path d="M56 102 Q58 124 48 144 L72 144 Q62 124 64 102 Z" fill="#FAF8F3" stroke="#D6CFC4"/>',
    egg: '<path d="M30 46 Q30 20 60 20 Q90 20 90 46 Q92 80 84 100 L36 100 Q28 80 30 46 Z" fill="#B23A2A"/><path d="M42 60 Q60 52 78 60 L76 96 L44 96 Z" fill="#8E2E1F"/><path d="M60 100 L60 124 M60 124 L36 136 M60 124 L84 136" stroke="#9A9894" stroke-width="3"/>',
    panton: '<path d="M46 26 Q62 20 74 28 L72 80 Q72 92 86 96 L88 100 Q62 102 58 112 Q54 132 76 146 L34 146 Q46 122 50 100 Q46 88 46 70 Z" fill="#C02A1A"/>',
    aaltovase: '<path d="M30 140 Q22 112 34 96 Q24 80 40 66 Q34 50 50 44 Q60 40 66 52 Q84 46 86 64 Q100 74 90 92 Q100 110 88 124 Q92 138 84 140 Z" fill="#9FC6C3" fill-opacity=".85" stroke="#7FAEAA"/>',
    juicysalif: '<line x1="48" y1="90" x2="32" y2="148" stroke="#B2B0AB" stroke-width="3"/><line x1="72" y1="90" x2="88" y2="148" stroke="#B2B0AB" stroke-width="3"/><line x1="60" y1="96" x2="60" y2="148" stroke="#B2B0AB" stroke-width="3"/><path d="M60 26 Q86 38 82 70 Q78 92 60 98 Q42 92 38 70 Q34 38 60 26 Z" fill="#C9C7C2"/><path d="M60 30 L60 94 M50 34 Q46 64 52 92 M70 34 Q74 64 68 92" fill="none" stroke="#B2B0AB" stroke-width="1"/>',
    kubus: '<rect x="28" y="72" width="64" height="64" fill="none" stroke="#1E1A18" stroke-width="3"/><line x1="49" y1="72" x2="49" y2="136" stroke="#1E1A18" stroke-width="2"/><line x1="71" y1="72" x2="71" y2="136" stroke="#1E1A18" stroke-width="2"/><line x1="28" y1="93" x2="92" y2="93" stroke="#1E1A18" stroke-width="2"/><line x1="28" y1="115" x2="92" y2="115" stroke="#1E1A18" stroke-width="2"/>' +
      [34, 50, 66, 82].map(function (x, i) { return '<rect x="' + (x - 2) + '" y="' + (40 + (i % 2) * 6) + '" width="8" height="' + (32 - (i % 2) * 6) + '" fill="#F7F3EA" stroke="#D9D0C2" stroke-width=".6"/><path d="M' + (x + 2) + ' ' + (34 + (i % 2) * 6) + ' q3 4 0 6 q-3 -2 0 -6 Z" fill="#E7B54A"/>'; }).join(''),
    hangitall: (function () { var cols = ['#C02A1A', '#E7B54A', '#3F4F8F', '#2F6B4F', '#E58A9A', '#2B2B2B', '#7FAEAA', '#F2EFE8']; var s = '<rect x="16" y="56" width="88" height="56" fill="none" stroke="#2B2B2B" stroke-width="1.2"/>'; var k = 0; for (var r = 0; r < 3; r++) for (var c = 0; c < 5; c++) { var x = 26 + c * 17 + (r % 2) * 8, y = 66 + r * 18; if (x > 100) continue; s += '<circle cx="' + x + '" cy="' + y + '" r="6" fill="' + cols[k++ % cols.length] + '"/>'; } return s; })(),
    ballclock: '<circle cx="60" cy="80" r="4" fill="#2B2B2B"/><line x1="60" y1="80" x2="60" y2="56" stroke="#2B2B2B" stroke-width="2.5"/><line x1="60" y1="80" x2="76" y2="88" stroke="#2B2B2B" stroke-width="2"/>' +
      ring(12, 42, 60, 80, function (x, y) { return '<line x1="60" y1="80" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="#8C8A85" stroke-width="1"/>'; }) +
      ring(12, 42, 60, 80, function (x, y, i) { return '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="6" fill="' + ['#C02A1A', '#E7B54A', '#3F4F8F', '#2F6B4F'][i % 4] + '"/>'; })
  };
  function art(kind) { return '<svg viewBox="0 0 120 160" aria-hidden="true">' + (ART[kind] || '') + '</svg>'; }
  var PHOTOS = {
 "taccia": {
  "src": "/photos/taccia.jpg",
  "artist": "Azienda Flos",
  "lic": "CC BY-SA 4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Taccia-table-a-pg-castiglioni-flos-F6602004-product-still-life-big.jpg",
  "note": "",
  "fit": "contain",
  "bg": "#FFFFFF"
 },
 "atollo": {
  "src": "/photos/atollo.jpg",
  "artist": "Pava",
  "lic": "CC BY-SA 3.0 it",
  "page": "https://commons.wikimedia.org/wiki/File:%22_11_-_ITALY_-_Atollo_-_Oluce_-_Vico_Magistretti_1977.jpg",
  "note": "",
  "fit": "cover",
  "bg": ""
 },
 "tolomeo": {
  "src": "/photos/tolomeo.jpg",
  "artist": "Sailko",
  "lic": "CC BY-SA 4.0",
  "page": "https://commons.wikimedia.org/wiki/File:Michele_de_lucchi_e_giancarlo_fassina_per_artemide,_lampada_da_tavolo_tolomeo,_1987.jpg",
  "note": "",
  "fit": "cover",
  "bg": ""
 },
 "panton-chair": {
  "src": "/photos/panton-chair.jpg",
  "artist": "Tokumeigakarinoaoshima",
  "lic": "CC0",
  "page": "https://commons.wikimedia.org/wiki/File:Panton_Chair_by_Verner_Panton.JPG",
  "note": "",
  "fit": "cover",
  "bg": ""
 },
 "akari-1a": {
  "src": "/photos/akari-1a.jpg",
  "artist": "Jean-Pierre Dalbéra from Paris, France",
  "lic": "CC BY 2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Akari_light_sculpture_model_10A_by_Isamu_Noguchi.jpg",
  "note": "Photo shows Akari model 10A, a larger lamp from the same series.",
  "fit": "cover",
  "bg": ""
 },
 "wishbone-chair": {
  "src": "/photos/wishbone-chair.jpg",
  "artist": "Robert B. Moffatt",
  "lic": "CC BY-SA 2.0",
  "page": "https://commons.wikimedia.org/wiki/File:Hans_Wegner_Wishbone_Chair.jpg",
  "note": "",
  "fit": "cover",
  "bg": ""
 }
};
  var TONES = ['#EAE4DA', '#E3DCD1', '#DDD5CA'];
  /* Open the page with #slow to delay every photo by 1–2.5 s and watch the skeletons. */
  var SLOW = (function () { try { return location.hash === '#slow'; } catch (e) { return false; } })();
  /* The illustration sits underneath as a fallback: hidden while the photo loads, shown if it fails. */
  function photoTag(slug, fallbackArt) {
    var p = PHOTOS[slug];
    return (fallbackArt ? art(fallbackArt) : '') + '<img class="ph" ' + (SLOW ? 'data-src' : 'src') + '="' + p.src + '" alt="' + esc(altFor(slug)) + '" decoding="async" loading="lazy" style="object-fit:' + p.fit + '">';
  }
  function altFor(slug) { var o = oBySlug[slug]; return o ? o.name + (dFull(o) ? ' by ' + dFull(o) : '') : ''; }
  function visual(o) { return PHOTOS[o.slug] ? photoTag(o.slug, o.art) : art(o.art); }
  function wireImages(root) {
    Array.prototype.forEach.call(root.querySelectorAll('img.ph'), function (im) {
      function done() { im.classList.add('in'); }
      im.addEventListener('load', done);
      im.addEventListener('error', function () { im.classList.add('err'); });
      if (im.getAttribute('data-src')) {
        setTimeout(function () { im.src = im.getAttribute('data-src'); im.removeAttribute('data-src'); }, 1000 + Math.random() * 1500);
      } else if (im.complete && im.naturalWidth) { done(); }
    });
  }
  function plateBg(o) { return PHOTOS[o.slug] && PHOTOS[o.slug].bg ? ' style="background:' + PHOTOS[o.slug].bg + '"' : ''; }
  function creditLine(o) {
    var p = PHOTOS[o.slug];
    if (!p) return esc(o.name) + ': illustration by formé, placeholder until a licensed photo is added';
    return esc(o.name) + ': photo by ' + esc(p.artist) + ', <a class="link" href="' + p.page + '" target="_blank" rel="noopener">' + esc(p.lic) + ', Wikimedia Commons</a>, resized.' + (p.note ? ' ' + esc(p.note) : '');
  }

  /* ---------- Helpers ---------- */
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function dLabel(o) { return o.designerLabel || (o.designer ? dById[o.designer].short : ''); }
  function dFull(o) { return o.designerFull || (o.designer ? dById[o.designer].name : ''); }
  var newest = OBJECTS.slice().sort(function (a, b) { return b.added - a.added; }).slice(0, 4).map(function (o) { return o.slug; });
  function isNew(o) { return newest.indexOf(o.slug) > -1; }
  function deptOf(id) { return DEPTS.filter(function (d) { return d.id === id; })[0] || DEPTS[0]; }
  function pathFor(route) {
    var p = route.split(':'), k = p[0], id = p[1];
    if (k === 'home') return '/';
    if (k === 'collection') return '/collection/' + (id || 'lighting');
    if (k === 'object') { var o = oBySlug[id]; return '/collection/' + (o ? o.dept : 'lighting') + '/' + id; }
    if (k === 'story') return '/stories/' + id;
    if (k === 'designer') return '/designers/' + id;
    if (k === 'page') return '/' + id;
    return '/' + k;
  }
  function routeFor(path) {
    var s = path.replace(/\/+$/, '').split('/').filter(Boolean);
    if (!s.length) return 'home';
    if (s[0] === 'collection') return s[2] ? 'object:' + s[2] : 'collection:' + (s[1] || 'lighting');
    if (s[0] === 'stories') return s[1] ? 'story:' + s[1] : 'stories';
    if (s[0] === 'designers') return s[1] ? 'designer:' + s[1] : 'designers';
    if (s[0] === 'about') return 'about';
    if (['imprint', 'privacy', 'credits'].indexOf(s[0]) > -1) return 'page:' + s[0];
    return 'notfound';
  }
  function link(route, inner, cls, extra) { return '<a href="' + pathFor(route) + '" data-go="' + route + '"' + (cls ? ' class="' + cls + '"' : '') + (extra || '') + '>' + inner + '</a>'; }
  function pad(n) { return String(n).padStart(2, '0'); }

  function secHead(label, route, linkText) {
    return '<div class="sec-head"><h2 class="label" style="font-weight:400">' + label + '</h2>' + (route ? link(route, linkText || 'View all') : '') + '</div>';
  }
  function objCard(o) {
    return link('object:' + o.slug,
      '<div class="plate r45 fade"' + plateBg(o) + '>' + visual(o) + (isNew(o) ? '<span class="badge sq">NEW</span>' : '') + '</div>' +
      '<div class="cap"><div class="label">' + esc(dLabel(o)) + ' · ' + esc(o.yearLabel) + '</div><div class="name">' + esc(o.name) + '</div></div>', 'card');
  }
  function storyPlate(s) {
    var withPhoto = s.featured.filter(function (f) { return PHOTOS[f]; });
    if (withPhoto.length) return '<div class="plate r32 fade">' + photoTag(withPhoto[0], oBySlug[withPhoto[0]].art) + '</div>';
    return '<div class="plate r32 fade" style="background:#E3DCD1"><div class="duo">' + s.featured.map(function (f) { return art(oBySlug[f].art); }).join('') + '</div></div>';
  }
  function storyCard(s, label) {
    return link('story:' + s.slug, storyPlate(s) + '<div class="g"><div class="label muted">' + (label || 'Story') + ' · ' + s.min + ' min</div><div class="title">' + esc(s.title) + '</div></div>', 'scard');
  }
  function follow() {
    return '<section class="sec wrap g"><div class="read" style="display:flex;flex-direction:column;gap:16px;align-items:flex-start">' +
      '<p class="serif" style="font-size:var(--t32);line-height:1.05">New stories every other week.</p>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><a class="btn sq" href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a><a class="btn sq" href="https://www.threads.com/" target="_blank" rel="noopener">Threads</a></div></div></section>';
  }
  function credits(lines) {
    return '<section class="sec wrap g"><div class="credits"><h2 class="label" style="font-weight:400">Image credits</h2>' +
      lines.map(function (l) { return '<div>' + l + '</div>'; }).join('') + '</div></section>';
  }
  function creditsFor(objs) { return objs.map(creditLine); }
  function footer() {
    return '<footer class="foot"><div class="wrap g foot-in"><div class="mark" translate="no">formé</div><p class="serif" style="font-size:var(--t22);line-height:1.25">The stories behind iconic design.</p>' +
      '<div class="links">' + link('collection:lighting', 'Lighting') + link('collection:furniture', 'Furniture') + link('collection:objects', 'Objects') + link('stories', 'Stories') + link('designers', 'Designers') + link('about', 'About') +
      '<a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a><a href="https://www.threads.com/" target="_blank" rel="noopener">Threads</a></div>' +
      '<div class="legal label">' + link('page:imprint', 'Imprint') + link('page:privacy', 'Privacy') + link('page:credits', 'Credits') + '</div></div></footer>';
  }

  /* ---------- State and filtering ---------- */
  var state = { route: 'home', dept: 'lighting', type: null, view: 'grid', shown: 8, sel: {}, faqOpen: 0 };
  try { var sv = localStorage.getItem('forme-view'); if (sv === 'grid' || sv === 'list') state.view = sv; } catch (e) {}

  var FILTERS = [
    { key: 'designer', label: 'Designer', val: function (o) { return o.designer ? dById[o.designer].short : null; } },
    { key: 'era', label: 'Era', val: function (o) { return o.era; } },
    { key: 'material', label: 'Material', val: function (o) { return o.material; } },
    { key: 'origin', label: 'Origin', val: function (o) { return o.origin; } },
    { key: 'status', label: 'Status', val: function (o) { return o.status; } }
  ];
  function inDept() { return OBJECTS.filter(function (o) { return o.dept === state.dept; }); }
  function optsFor(f) {
    var seen = {};
    inDept().forEach(function (o) { var v = f.val(o); (Array.isArray(v) ? v : [v]).forEach(function (x) { if (x) seen[x] = 1; }); });
    return Object.keys(seen).sort();
  }
  function passes(o, sel, type) {
    if (o.dept !== state.dept) return false;
    if (type && o.type !== type) return false;
    return FILTERS.every(function (f) {
      var c = sel[f.key] || []; if (!c.length) return true;
      var v = f.val(o); if (Array.isArray(v)) return v.some(function (x) { return c.indexOf(x) > -1; });
      return c.indexOf(v) > -1;
    });
  }
  function results() { return OBJECTS.slice().sort(function (a, b) { return a.year - b.year; }).filter(function (o) { return passes(o, state.sel, state.type); }); }
  function activeSel() { var out = []; FILTERS.forEach(function (f) { (state.sel[f.key] || []).forEach(function (v) { out.push([f.key, v]); }); }); return out; }

  /* ---------- Views ---------- */
  var views = {};

  views.home = function () {
    var latest = STORIES[0];
    var recent = OBJECTS.slice().sort(function (a, b) { return b.added - a.added; }).slice(0, 4);
    var profiled = DESIGNERS.filter(function (d) { return d.page; });
    var h = '';
    h += '<section class="wrap g" data-st="parallax" style="padding-top:64px;padding-bottom:64px;display:flex;flex-direction:column;gap:24px"><h1 class="serif hero-h1" style="font-size:var(--t64);line-height:.92;letter-spacing:-.03em;text-wrap:balance;max-width:720px">The stories behind iconic design.</h1>' +
      '<p class="muted" style="font-size:var(--t16);line-height:1.6;max-width:330px">A showroom for the lamps, chairs and objects that shaped design history, and the ideas behind them.</p></section>';
    h += '<div class="wrap" style="padding-top:24px">' + link('story:' + latest.slug, '<div style="position:relative">' + storyPlate(latest) + '<span class="badge sq">NEW</span></div><div class="g"><div class="label muted">Latest story · ' + latest.min + ' min</div><div class="title">' + esc(latest.title) + '</div><p class="latest-lede">' + esc(latest.lede) + '</p></div>', 'scard latest') + '</div>';
    h += '<section class="sec wrap"><div class="g">' + secHead('Recently added', 'collection:lighting') + '</div><div class="grid" style="margin-top:24px">' + recent.map(objCard).join('') + '</div></section>';
    h += '<section class="sec wrap g">' + secHead('Collection') + '<div style="margin-top:8px">' + DEPTS.map(function (d, i) {
      var n = OBJECTS.filter(function (o) { return o.dept === d.id; }).length;
      return link('collection:' + d.id, '<span class="no">' + pad(i + 1) + '</span><span class="nm">' + d.label + '</span><span class="meta">' + n + '</span><span aria-hidden="true">→</span>', 'irow');
    }).join('') + '</div></section>';
    h += '<section class="sec wrap"><div class="g">' + secHead('More stories', 'stories') + '</div><div class="story-list two" style="margin-top:24px">' + STORIES.slice(1, 3).map(function (s) { return storyCard(s); }).join('') + '</div></section>';
    h += '<section class="sec wrap g">' + secHead('Designers', 'designers', 'All ' + DESIGNERS.length) + '<div style="margin-top:8px">' + profiled.map(function (d, i) {
      return link('designer:' + d.id, '<span class="no">' + pad(i + 1) + '</span><span class="nm">' + esc(d.name) + '</span><span class="meta">' + d.count + '</span><span aria-hidden="true">→</span>', 'irow');
    }).join('') + '</div></section>';
    h += follow() + credits(creditsFor(recent).concat(creditsFor(STORIES.slice(0, 3).map(function (s) { return oBySlug[s.featured.filter(function (f) { return PHOTOS[f]; })[0] || s.featured[0]]; }))).filter(function (x, i, arr) { return arr.indexOf(x) === i; })) + footer();
    return h;
  };

  function designerRows(list) {
    return '<div style="margin-top:8px">' + list.map(function (d, i) {
      var inner = '<span class="no">' + pad(i + 1) + '</span><span class="nm">' + esc(d.name) + '</span><span class="meta">' + esc(d.country) + '</span>' + (d.page ? '<span aria-hidden="true">→</span>' : '');
      return d.page ? link('designer:' + d.id, inner, 'irow') : '<div class="irow">' + inner + '</div>';
    }).join('') + '</div>';
  }

  views.collection = function (deptId) {
    if (deptId && deptId !== state.dept) { state.dept = deptId; state.type = null; state.sel = {}; state.shown = 8; }
    var dept = deptOf(state.dept);
    var list = results();
    var shown = list.slice(0, state.shown);
    var types = dept.types.map(function (t) {
      var items = OBJECTS.filter(function (o) { return o.dept === dept.id && o.type === t; });
      if (!items.length) return '';
      var on = state.type === t;
      return '<button class="type" data-type="' + t + '" aria-pressed="' + on + '"><div class="plate" style="width:100%">' + art(items[0].art) + '</div><span>' + (on ? '<i class="dot"></i>' : '') + t + ' <span class="muted">' + items.length + '</span></span></button>';
    }).join('');
    var h = '';
    h += '<div class="wrap g" style="padding-top:16px"><div class="dept" role="tablist" aria-label="Collection">' + DEPTS.map(function (d) {
      var on = d.id === dept.id;
      return '<button role="tab" class="label" aria-selected="' + on + '" data-go="collection:' + d.id + '">' + (on ? '<i class="dot"></i>' : '') + d.label + '</button>';
    }).join('') + '</div></div>';
    h += '<section class="wrap g" style="padding-top:48px;display:flex;flex-direction:column;gap:16px"><h1 class="page-title">' + dept.label + '</h1><p class="lede read">' + esc(dept.lede) + '</p></section>';
    h += '<div class="wrap"><nav class="types g" aria-label="' + dept.label + ' types" style="margin-top:48px">' + types + '</nav></div>';
    h += '<div class="wrap g" style="margin-top:48px"><div class="toolbar">' +
      '<button class="icon-btn vbtn' + (state.view === 'grid' ? ' on' : '') + '" data-view="grid" aria-label="Grid view" aria-pressed="' + (state.view === 'grid') + '" style="margin-left:-12px"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><rect x="1.5" y="1.5" width="7" height="7"/><rect x="11.5" y="1.5" width="7" height="7"/><rect x="1.5" y="11.5" width="7" height="7"/><rect x="11.5" y="11.5" width="7" height="7"/></svg></button>' +
      '<button class="icon-btn vbtn' + (state.view === 'list' ? ' on' : '') + '" data-view="list" aria-label="List view" aria-pressed="' + (state.view === 'list') + '"><svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><line x1="1" y1="4" x2="19" y2="4"/><line x1="1" y1="10" x2="19" y2="10"/><line x1="1" y1="16" x2="19" y2="16"/></svg></button>' +
      '<span class="count">' + list.length + (list.length === 1 ? ' object' : ' objects') + ' · by year</span>' +
      '<button class="chip sq" id="openFilter" style="border-color:var(--ink)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="17" x2="21" y2="17"/><circle cx="15" cy="7" r="2.5" fill="#F5F2EC"/><circle cx="8" cy="17" r="2.5" fill="#F5F2EC"/></svg>Filter</button></div>';
    var act = activeSel();
    if (act.length || state.type) {
      h += '<div class="chips" style="margin-top:12px">' + (state.type ? '<button class="chip sq on" data-cleartype="1">' + state.type + ' <span aria-hidden="true">×</span><span class="sr">Remove</span></button>' : '') +
        act.map(function (a) { return '<button class="chip sq on" data-unsel="' + a[0] + '|' + esc(a[1]) + '">' + esc(a[1]) + ' <span aria-hidden="true">×</span><span class="sr">Remove</span></button>'; }).join('') + '</div>';
    }
    h += '</div>';
    if (!list.length) {
      h += '<div class="wrap g" style="padding-top:48px"><p style="font-size:var(--t18)">No objects match these filters.</p><button class="btn sq" style="margin-top:16px" id="clearAll">Clear filters</button></div>';
    } else if (state.view === 'grid') {
      h += '<div class="wrap"><div class="grid" style="margin-top:24px">' + shown.map(objCard).join('') + '</div></div>';
    } else {
      h += '<div class="wrap g" style="margin-top:16px">' + shown.map(function (o, i) {
        return link('object:' + o.slug, '<span class="no">' + pad(i + 1) + '</span><span class="sthumb">' + art(o.art) + '</span><span style="flex:1;display:flex;flex-direction:column;gap:4px;min-width:0"><span class="serif" style="font-size:var(--t22);line-height:1.1">' + esc(o.name) + '</span><span class="meta">' + esc(dFull(o)) + '</span></span><span class="meta">' + esc(o.yearLabel) + '</span>', 'irow', ' style="padding:12px 0"');
      }).join('') + '</div>';
    }
    if (list.length > state.shown) h += '<div class="wrap g" style="padding-top:48px"><button class="btn wide sq" id="loadMore">Load more · ' + (list.length - state.shown) + '</button></div>';
    h += '<section class="sec wrap g"><div class="read">' + secHead('About design ' + dept.label.toLowerCase()) + '<div class="prose" style="margin-top:24px"><p style="font-size:var(--t16)">' + esc(dept.about) + '</p></div></div></section>';
    h += credits(creditsFor(shown)) + footer();
    return h;
  };

  views.object = function (slug) {
    var o = oBySlug[slug]; if (!o) return views.notfound();
    state.dept = o.dept;
    var d = o.designer ? dById[o.designer] : null;
    var dName = dFull(o);
    var designerLink = d && d.page ? link('designer:' + d.id, esc(dName) + ', ' + esc(o.yearLabel) + ' <span aria-hidden="true">→</span>') : '<span>' + esc(dName) + ', ' + esc(o.yearLabel) + '</span>';
    var facts = [['Designer', d && d.page ? link('designer:' + d.id, esc(dName)) : esc(dName)], ['Year', esc(o.yearLabel)]];
    if (o.manufacturer) facts.push(['Manufacturer', esc(o.manufacturer)]);
    if (o.materials) facts.push(['Materials', esc(o.materials)]);
    if (o.dimensions) facts.push(['Dimensions', esc(o.dimensions)]);
    facts.push(['Origin', esc(o.origin)]); facts.push(['Status', esc(o.status)]);
    var related = STORIES.filter(function (s) { return s.featured.indexOf(o.slug) > -1; })[0] || STORIES.filter(function (s) { return s.featured.some(function (f) { return oBySlug[f].dept === o.dept; }); })[0] || STORIES[0];
    var more = OBJECTS.filter(function (x) { return x !== o && x.designer && x.designer === o.designer; });
    if (more.length < 2) more = more.concat(OBJECTS.filter(function (x) { return x !== o && more.indexOf(x) < 0 && x.era === o.era && x.dept === o.dept; }));
    if (more.length < 2) more = more.concat(OBJECTS.filter(function (x) { return x !== o && more.indexOf(x) < 0 && x.dept === o.dept; }));
    more = more.slice(0, 2);
    var dept = deptOf(o.dept);
    var h = '';
    var slides = PHOTOS[o.slug] ? ['<div class="plate fade gslide"' + (PHOTOS[o.slug].bg ? ' style="background:' + PHOTOS[o.slug].bg + '"' : '') + '>' + photoTag(o.slug, o.art) + '</div>', '<div class="plate fade gslide" style="background:' + TONES[1] + '">' + art(o.art) + '</div>']
      : TONES.map(function (t) { return '<div class="plate fade gslide" style="background:' + t + '">' + art(o.art) + '</div>'; });
    state.slides = slides.length;
    h += '<div class="obj-top"><div class="obj-media">';
    h += '<div class="wrap gwrap"><div class="gallery" id="gallery" tabindex="0" role="region" aria-label="Images of ' + esc(o.name) + '">' + slides.join('') + '</div>' +
      (slides.length > 1 ? '<button class="gnav prev sq" data-gal="-1" aria-label="Previous image"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button><button class="gnav next sq" data-gal="1" aria-label="Next image"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>' : '') +
      '<div class="gcount" id="gcount" aria-live="polite">1 / ' + slides.length + '</div></div>';
    h += '</div><div class="obj-body">';
    h += '<section class="wrap g obj-head" style="padding-top:24px;display:flex;flex-direction:column;gap:12px">' +
      '<nav class="label muted" aria-label="Breadcrumb" style="display:flex;gap:8px">' + link('collection:' + dept.id, dept.label) + '<span aria-hidden="true">/</span><button data-type-go="' + o.type + '" class="label">' + esc(o.type) + '</button></nav>' +
      '<h1 class="serif" style="font-size:var(--t64);line-height:.92;letter-spacing:-.03em;text-wrap:balance">' + esc(o.name) + '</h1><div style="font-size:var(--t16)">' + designerLink + '</div></section>';
    h += '<section class="wrap g" style="margin-top:48px"><div class="inshort read"><h2 class="label" style="font-weight:400">In short</h2><p class="lede">' + esc(o.inShort) + '</p></div></section>';
    h += '<section class="sec wrap g"><div class="read">' + secHead('Facts') + '<dl class="facts">' + facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join('') + '</dl></div></section>';
    h += '<article class="sec wrap g"><div class="read"><div class="sec-head"><h2 class="label" style="font-weight:400">The story</h2><span class="label muted">' + Math.max(2, o.story.length + 1) + ' min</span></div>' +
      '<div class="prose" style="margin-top:32px">' + o.story.map(function (p) { return '<h2>' + esc(p[0]) + '</h2><p>' + esc(p[1]) + '</p>'; }).join('') + '</div></div></article>';
    h += '</div></div>';
    h += '<section class="sec wrap"><div class="g">' + secHead('Related story', 'stories') + '</div><div style="margin-top:24px" class="read">' + storyCard(related) + '</div></section>';
    h += '<section class="sec wrap"><div class="g">' + secHead('More from the collection', 'collection:' + dept.id) + '</div><div class="grid" style="margin-top:24px">' + more.map(objCard).join('') + '</div></section>';
    h += follow() + credits(creditsFor([o])) + footer();
    return h;
  };

  views.story = function (slug) {
    var s = sBySlug[slug]; if (!s) return views.notfound();
    var next = STORIES[(STORIES.indexOf(s) + 1) % STORIES.length];
    var h = '';
    h += '<section class="wrap g" style="padding-top:48px"><div class="read" style="display:flex;flex-direction:column;gap:16px">' +
      '<nav class="label muted" aria-label="Breadcrumb" style="display:flex;gap:8px">' + link('stories', 'Stories') + '<span aria-hidden="true">·</span><span>' + s.min + ' min read</span></nav>' +
      '<h1 class="serif" style="font-size:var(--t48);line-height:.98;letter-spacing:-.025em;text-wrap:balance">' + esc(s.title) + '</h1>' +
      '<p class="lede" style="color:var(--ink-soft)">' + esc(s.lede) + '</p><div class="muted" style="font-size:var(--t14)">By formé · ' + esc(s.date) + '</div></div></section>';
    h += '<div class="wrap" data-hero style="margin-top:32px">' + storyPlate(s) + '</div>';
    h += '<section class="wrap g" style="margin-top:48px"><div class="inshort read"><h2 class="label" style="font-weight:400">In short</h2><p class="lede">' + esc(s.inShort) + '</p></div></section>';
    h += '<section class="wrap" style="margin-top:48px"><div class="g" style="display:flex;justify-content:space-between;align-items:baseline"><h2 class="label" style="font-weight:400">Featured in this story</h2><span class="muted" style="font-size:var(--t14)">' + s.featured.length + '</span></div>' +
      '<div class="types g" style="margin-top:16px">' + s.featured.map(function (f) { var o = oBySlug[f];
        return link('object:' + o.slug, '<div class="plate r45" style="width:150px">' + art(o.art) + '</div><div><div class="label muted" style="letter-spacing:.14em">' + esc(dLabel(o)) + ' · ' + esc(o.yearLabel) + '</div><div class="serif" style="font-size:var(--t22);margin-top:4px">' + esc(o.name) + '</div></div>', 'card', ' style="flex:none;width:150px"'); }).join('') + '</div></section>';
    var body = '';
    s.sections.forEach(function (sec, i) {
      body += '<h2>' + esc(sec[0]) + '</h2>' + sec[1].map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
      if (i === 0) body += '<p class="highlight">' + esc(s.highlight) + '</p>';
    });
    h += '<article class="sec wrap g"><div class="read prose">' + body + '</div></article>';
    h += '<section class="sec wrap g"><div class="read">' + secHead('Questions') + '<div style="margin-top:8px">' + s.faq.map(function (f, i) {
      var open = state.faqOpen === i;
      return '<div class="faq-item"><button class="faq-q" data-faq="' + i + '" aria-expanded="' + open + '"><span>' + esc(f[0]) + '</span><span aria-hidden="true" style="font-size:20px;line-height:1">' + (open ? '−' : '+') + '</span></button><p class="faq-a"' + (open ? '' : ' hidden') + '>' + esc(f[1]) + '</p></div>';
    }).join('') + '</div></div></section>';
    h += '<section class="sec wrap"><div class="g">' + secHead('Next story', 'stories', 'All stories') + '</div><div class="read" style="margin-top:24px">' + storyCard(next) + '</div></section>';
    h += follow() + credits(creditsFor(s.featured.map(function (f) { return oBySlug[f]; }))) + footer();
    return h;
  };

  views.designer = function (id) {
    var d = dById[id]; if (!d || !d.page) return views.designers();
    var objs = OBJECTS.filter(function (o) { return o.designer === id; }).sort(function (a, b) { return a.year - b.year; });
    var stories = STORIES.filter(function (s) { return s.featured.some(function (f) { return oBySlug[f].designer === id; }); });
    var h = '';
    h += '<section class="wrap g" style="padding-top:48px;display:flex;flex-direction:column;gap:16px"><nav class="label muted" aria-label="Breadcrumb">' + link('designers', 'Designers') + '</nav>' +
      '<h1 class="serif" style="font-size:var(--t64);line-height:.92;letter-spacing:-.03em;text-wrap:balance">' + esc(d.name) + '</h1><div class="muted">' + esc(d.years) + ' · ' + esc(d.country) + '</div></section>';
    h += '<section class="wrap g" style="margin-top:48px"><div class="inshort read"><h2 class="label" style="font-weight:400">In short</h2><p class="lede">' + esc(d.inShort) + '</p></div></section>';
    h += '<section class="sec wrap"><div class="g"><div class="sec-head"><h2 class="label" style="font-weight:400">Objects</h2><span class="muted" style="font-size:var(--t14)">' + objs.length + '</span></div></div><div class="grid" style="margin-top:24px">' + objs.map(objCard).join('') + '</div></section>';
    h += '<section class="sec wrap g"><div class="read">' + secHead('Facts') + '<dl class="facts">' + [['Lived', d.years], ['Nationality', d.nationality], ['Known for', d.knownFor], ['Worked with', d.collaborators]].map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '</dl></div></section>';
    h += '<article class="sec wrap g"><div class="read">' + secHead('Biography') + '<div class="prose" style="margin-top:24px">' + d.bio.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div></div></article>';
    if (stories.length) h += '<section class="sec wrap"><div class="g"><div class="sec-head"><h2 class="label" style="font-weight:400">In the stories</h2><span class="muted" style="font-size:var(--t14)">' + stories.length + '</span></div></div><div class="read" style="margin-top:24px">' + storyCard(stories[0]) + '</div></section>';
    h += credits(creditsFor(objs)) + footer();
    return h;
  };

  views.stories = function () {
    return '<section class="wrap g" style="padding-top:48px;display:flex;flex-direction:column;gap:16px"><h1 class="page-title">Stories</h1><p class="lede read">Essays on the ideas, materials and people behind iconic design.</p></section>' +
      '<div class="wrap" style="margin-top:48px"><div class="story-list two">' + STORIES.map(function (s) { return storyCard(s); }).join('') + '</div></div>' + follow() + footer();
  };

  views.designers = function () {
    var sorted = DESIGNERS.slice().sort(function (a, b) { return a.sort.localeCompare(b.sort); });
    return '<section class="wrap g" style="padding-top:48px;display:flex;flex-direction:column;gap:16px"><h1 class="page-title">Designers</h1><p class="lede read">The people behind the objects. Profiles appear once a designer has two objects in the collection.</p></section>' +
      '<section class="wrap g" style="margin-top:48px"><div class="read">' + secHead('A–Z · ' + sorted.length) + designerRows(sorted) + '</div></section>' + footer();
  };

  views.about = function () {
    var crit = [['A clear idea', 'Every object answers a question, of light, material or use.'], ['Lasting influence', 'It changed how others designed, or how people lived.'], ['Still meaningful', 'It would feel right in a room today.'], ['A story worth telling', 'If we can’t tell you something new about it, it doesn’t belong here.']];
    return '<section class="wrap g" style="padding-top:48px;display:flex;flex-direction:column;gap:24px"><h1 class="page-title">About</h1><p class="serif read" style="font-size:var(--t32);line-height:1.1;letter-spacing:-.01em;text-wrap:balance">We collect the stories behind iconic design, starting with light.</p></section>' +
      '<article class="sec wrap g"><div class="read">' + secHead('Why stories') + '<div class="prose" style="margin-top:24px"><p>A great object is more than its shape. Behind it is a problem someone wanted to solve, a material someone dared to try, a time that made it possible. formé is a quiet place to discover those stories, one object at a time.</p><p>We don’t sell anything. We show, explain and connect.</p></div></div></article>' +
      '<section class="sec wrap g"><div class="read">' + secHead('How we choose') + '<ol style="margin-top:8px">' + crit.map(function (c, i) {
        return '<li style="display:flex;gap:16px;padding:20px 0;border-bottom:1px solid ' + (i === crit.length - 1 ? 'var(--ink)' : 'var(--line)') + '"><span class="muted" style="width:20px;flex:none;font-size:var(--t11);padding-top:6px">' + pad(i + 1) + '</span><span><span class="serif" style="display:block;font-size:var(--t22)">' + c[0] + '</span><span style="display:block;margin-top:6px;line-height:1.5;color:var(--ink-soft)">' + c[1] + '</span></span></li>';
      }).join('') + '</ol></div></section>' +
      '<article class="sec wrap g"><div class="read">' + secHead('How we work') + '<div class="prose" style="margin-top:24px"><p>Facts come from manufacturers, museums and published sources. Images are used with permission or under open licences, and credited on every page. If you spot a mistake, tell us and we will correct it.</p></div></div></article>' +
      '<section class="sec wrap g"><div class="read" style="display:flex;flex-direction:column;gap:16px">' + secHead('Contact') + '<p class="serif" style="font-size:var(--t32);line-height:1.1;user-select:all">hello@[domain]</p><p class="muted" style="line-height:1.5">Corrections, image permissions and suggestions are welcome.</p></div></section>' + footer();
  };

  views.notfound = function () {
    return '<section class="wrap g" style="padding-top:64px"><div class="read" style="display:flex;flex-direction:column;gap:24px;align-items:flex-start"><div class="label muted">Not found</div><h1 class="serif" style="font-size:var(--t48);line-height:1;letter-spacing:-.02em;text-wrap:balance">This page has moved or never existed.</h1><p class="muted" style="line-height:1.6">Try the collection or search for a designer.</p><div style="display:flex;gap:8px;flex-wrap:wrap">' + link('collection:lighting', 'Open Collection', 'btn fill sq') + link('home', 'Go Home', 'btn sq') + '</div></div></section>' + footer();
  };
  views.page = function (which) {
    var titles = { imprint: 'Imprint', privacy: 'Privacy', credits: 'Credits' };
    var body = which === 'credits'
      ? '<p>All images in this prototype are illustrations by formé and serve as placeholders. Licensed photographs will be credited here and on each page.</p>'
      : '<p>[' + titles[which] + ' text to be added before launch.]</p>';
    return '<section class="wrap g" style="padding-top:48px"><div class="read" style="display:flex;flex-direction:column;gap:24px"><h1 class="page-title">' + titles[which] + '</h1><div class="prose">' + body + '</div></div></section>' + footer();
  };

  /* ---------- Router ---------- */
  var app = document.getElementById('app');
  var nav = document.getElementById('nav');
  function render() {
    var parts = state.route.split(':');
    var fn = views[parts[0]] || views.home;
    app.innerHTML = fn(parts[1]);
    var top = ({ collection: 'collection:' + state.dept, object: 'collection:' + state.dept, story: 'stories', stories: 'stories', designer: 'designers', designers: 'designers', about: 'about' })[parts[0]];
    Array.prototype.forEach.call(document.querySelectorAll('.navlinks a'), function (l) { if (l.getAttribute('data-go') === top) l.setAttribute('aria-current', 'page'); else l.removeAttribute('aria-current'); });
    var t = titleFor(parts);
    document.title = (t ? t + ' · ' : '') + 'formé';
    var hero = app.querySelector('#gallery img.ph');
    if (hero) { hero.loading = 'eager'; hero.setAttribute('fetchpriority', 'high'); }
    wireImages(app);
    structure();
    var g = document.getElementById('gallery');
    if (g) g.addEventListener('scroll', function () {
      var i = Math.round(g.scrollLeft / g.clientWidth) + 1;
      document.getElementById('gcount').textContent = i + ' / ' + state.slides;
    }, { passive: true });
  }
  function titleFor(parts) {
    var p = parts[0], id = parts[1];
    if (p === 'object' && oBySlug[id]) return oBySlug[id].name + (dFull(oBySlug[id]) ? ' by ' + dFull(oBySlug[id]) : '');
    if (p === 'story' && sBySlug[id]) return sBySlug[id].title;
    if (p === 'designer' && dById[id] && dById[id].page) return dById[id].name;
    if (p === 'collection') return deptOf(id || state.dept).label;
    if (p === 'page') return ({ imprint: 'Imprint', privacy: 'Privacy', credits: 'Credits' })[id] || '';
    return ({ stories: 'Stories', designers: 'Designers', about: 'About', notfound: 'Not found' })[p] || '';
  }
  try { history.scrollRestoration = 'manual'; } catch (e) {}
  function go(route, push, y) {
    closeSearch(); closeSheets(true);
    if (push !== false) { try { history.replaceState({ route: state.route, y: window.scrollY }, ''); } catch (e) {} }
    if (route !== state.route) state.faqOpen = 0;
    state.route = route;
    render();
    window.scrollTo(0, y || 0);
    lastY = y || 0;
    updateST();
    if (push !== false) enter();
    nav.classList.remove('hide');
    if (push !== false) { try { history.pushState({ route: route, y: 0 }, '', pathFor(route)); } catch (e) {} }
  }
  window.addEventListener('popstate', function (e) { if (e.state && e.state.route) go(e.state.route, false, e.state.y); });
  state.route = routeFor(location.pathname);
  try { history.replaceState({ route: state.route, y: 0 }, ''); } catch (e) {}

  var lastY = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    nav.classList.toggle('lined', y > 4);
    var dy = y - lastY;
    if (Math.abs(dy) < 6) return;
    if (!searchOpen && !openSheet) nav.classList.toggle('hide', dy > 0 && y > 120);
    lastY = y;
  }, { passive: true });

  /* ---------- Search ---------- */
  var sfield = document.getElementById('sfield');
  var sicon = document.getElementById('sicon');
  var cancelBtn = document.getElementById('closeSearch');
  var q = document.getElementById('q');
  var spanel = document.getElementById('spanel');
  var sres = document.getElementById('sresults');
  var searchOpen = false, clearTimer = null, openSheet = null;
  function measure() { sicon.style.setProperty('--travel', Math.max(0, sfield.clientWidth - 44) + 'px'); }
  measure();
  window.addEventListener('resize', measure);
  function openSearch() {
    if (searchOpen) return;
    searchOpen = true; clearTimeout(clearTimer);
    nav.classList.remove('hide');
    nav.classList.add('searching'); document.body.classList.add('searching');
    renderSearch();
    spanel.classList.add('open', 'stagger');
    q.tabIndex = 0; cancelBtn.tabIndex = 0;
    document.documentElement.style.overflow = 'hidden';
    try { q.focus({ preventScroll: true }); } catch (e) { q.focus(); }
  }
  function closeSearch() {
    if (!searchOpen) return;
    searchOpen = false;
    q.blur();
    nav.classList.remove('searching'); document.body.classList.remove('searching');
    spanel.classList.remove('open', 'stagger');
    q.tabIndex = -1; cancelBtn.tabIndex = -1;
    if (!openSheet) document.documentElement.style.overflow = '';
    clearTimer = setTimeout(function () { q.value = ''; }, 260);
  }
  function hay(o) { return [o.name, dFull(o), o.type, o.era, o.origin, o.materials, o.status, o.manufacturer || '', deptOf(o.dept).label].join(' ').toLowerCase(); }
  function renderSearch() {
    var t = q.value.trim().toLowerCase();
    if (!t) {
      sres.innerHTML = '<div class="sgroup"><div class="label muted">Popular designers</div><div style="margin-top:8px">' +
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
  document.getElementById('openSearch').addEventListener('click', openSearch);
  cancelBtn.addEventListener('click', closeSearch);
  q.addEventListener('input', function () { spanel.classList.remove('stagger'); renderSearch(); });
  q.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeSearch(); });

  /* ---------- Sheets ---------- */
  var scrim = document.getElementById('scrim');
  var menuSheet = document.getElementById('menuSheet');
  var filterSheet = document.getElementById('filterSheet');
  var returnFocus = null;
  function focusables(root) { return Array.prototype.filter.call(root.querySelectorAll('a[href],button:not([disabled]),input'), function (x) { return x.offsetParent !== null; }); }
  function showSheet(el) {
    closeSearch(); returnFocus = document.activeElement; openSheet = el;
    scrim.classList.add('open'); el.classList.add('open');
    document.documentElement.style.overflow = 'hidden';
    app.inert = true; nav.inert = true;
    setTimeout(function () { var f = focusables(el)[0]; if (f) { try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); } } }, 80);
  }
  function closeSheets(navigating) {
    var wasOpen = !!openSheet;
    [menuSheet, filterSheet].forEach(function (s) { s.classList.remove('open'); s.style.transform = ''; });
    scrim.classList.remove('open'); openSheet = null; if (!searchOpen) document.documentElement.style.overflow = '';
    app.inert = false; nav.inert = false;
    if (wasOpen && navigating !== true && returnFocus && returnFocus.focus) { try { returnFocus.focus({ preventScroll: true }); } catch (e) {} }
    returnFocus = null;
  }
  scrim.addEventListener('click', function () { closeSheets(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !openSheet) return;
    var f = focusables(openSheet); if (!f.length) return;
    if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && openSheet) closeSheets(); });
  [menuSheet, filterSheet].forEach(function (sheet) {
    var startY = null, dy = 0, t0 = 0;
    sheet.addEventListener('touchstart', function (e) {
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

  function renderMenu() {
    var cur = state.route.split(':')[0];
    var active = (cur === 'collection' || cur === 'object') ? 'collection:' + state.dept : ({ stories: 'stories', story: 'stories', designers: 'designers', designer: 'designers', about: 'about' })[cur];
    var items = [['collection:lighting', 'Lighting'], ['collection:furniture', 'Furniture'], ['collection:objects', 'Objects'], ['stories', 'Stories'], ['designers', 'Designers'], ['about', 'About']];
    document.getElementById('menuBody').innerHTML = '<div style="margin-top:16px">' + items.map(function (m) {
      return link(m[0], '<span class="mslot">' + (active === m[0] ? '<i class="dot"></i>' : '') + '</span>' + m[1], 'menu-link', active === m[0] ? ' aria-current="page"' : '');
    }).join('') + '</div><div style="margin-top:32px;display:flex;flex-direction:column;gap:16px"><div style="display:flex;gap:8px"><a class="btn sq" href="https://www.instagram.com/" target="_blank" rel="noopener" style="height:44px">Instagram</a><a class="btn sq" href="https://www.threads.com/" target="_blank" rel="noopener" style="height:44px">Threads</a></div><div class="label muted" style="display:flex;gap:16px">' + link('page:imprint', 'Imprint') + link('page:privacy', 'Privacy') + link('page:credits', 'Credits') + '</div></div>';
  }
  document.getElementById('openMenu').addEventListener('click', function () { renderMenu(); showSheet(menuSheet); });

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
  document.getElementById('applyFilter').addEventListener('click', function () { state.sel = draft; state.shown = 8; closeSheets(true); render(); var tb = app.querySelector('.toolbar'); if (tb) window.scrollTo({ top: Math.max(0, tb.getBoundingClientRect().top + window.scrollY - 72), behavior: reduced() ? 'auto' : 'smooth' }); });

  /* ---------- Delegated clicks ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    var a = t.closest('[data-go]');
    if (a) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
      e.preventDefault();
      var route = a.dataset.go;
      var srcPlate = a.querySelector('.plate');
      if (srcPlate && /^(object|story):/.test(route) && !reduced() && !openSheet && !searchOpen) { flyTo(srcPlate, route); return; }
      if (!openSheet && !searchOpen && app.contains(a) && !reduced()) { leaveThen(function () { go(route); }); return; }
      go(route); return;
    }
    var tg = t.closest('[data-type-go]');
    if (tg) { state.type = tg.dataset.typeGo; state.sel = {}; state.shown = 8; go('collection:' + state.dept); return; }
    var dt = t.closest('[data-dept-type]');
    if (dt) { var pp = dt.dataset.deptType.split('|'); state.dept = pp[0]; state.type = pp[1]; state.sel = {}; state.shown = 8; go('collection:' + pp[0]); return; }
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
    if (gb) { var gl = document.getElementById('gallery'); if (gl) gl.scrollBy({ left: +gb.dataset.gal * gl.clientWidth, behavior: reduced() ? 'auto' : 'smooth' }); return; }
    var fq = t.closest('[data-faq]');
    if (fq) { var i = +fq.dataset.faq; state.faqOpen = state.faqOpen === i ? -1 : i; var y = window.scrollY; render(); window.scrollTo(0, y); return; }
  });

  document.addEventListener('keydown', function (e) {
    var gl = document.getElementById('gallery');
    if (!gl || document.activeElement !== gl || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
    e.preventDefault(); gl.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * gl.clientWidth, behavior: reduced() ? 'auto' : 'smooth' });
  });
  function reduced() { try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }

  /* =====================================================================
     Motion standard
     Text:    masked line reveal, 800ms, power2.out, skewY -1deg -> 0, 90ms per line, 120ms per element (realevate)
     Images:  clip reveal from the bottom with inner zoom 1.2 -> 1, 1000ms, power4.out, 80ms stagger
     Hero:    clip from the centre with inner zoom 1.5 -> 1, 1500ms, power4.out (realevate)
     Pages:   card image flies into the hero slot of the next page, 650ms, ease-in-out-quart
              other links: 200ms exit, then the next page enters
     Sections (details.so parallax transition):
              home hero moves 400px slower and darkens to 75% while the page slides over it (phones: holds still)
              footer is uncovered from below: 300px -> 0, overlay 50% -> 0 (phones: no offset)
     Everything is skipped with prefers-reduced-motion.
     ===================================================================== */
  var EASE = {
    power2Out: 'cubic-bezier(.25, .46, .45, .94)',
    power4Out: 'cubic-bezier(.165, .84, .44, 1)',
    inOutQuart: 'cubic-bezier(.77, 0, .175, 1)',
    in: 'cubic-bezier(.55, .055, .675, .19)'
  };
  var ST = { parallaxY: 400, parallaxOpacity: 0.75, revealY: 300, revealOpacity: 0.5, mobile: 768 };
  var stFns = [], stTicking = false, flown = false, io = null;

  function isMobile() { return window.innerWidth <= ST.mobile; }
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function overlayIn(el) {
    var o = el.querySelector(':scope > .st-overlay');
    if (!o) { o = document.createElement('div'); o.className = 'st-overlay'; o.setAttribute('aria-hidden', 'true'); el.appendChild(o); }
    return o;
  }

  /* Layering: [hero] [page body, opaque, slides over the hero] [footer, sticky underneath] */
  function structure() {
    var foot = app.querySelector(':scope > footer.foot');
    var hero = app.querySelector(':scope > [data-st]');
    var heroWrap = null;
    if (hero) { heroWrap = document.createElement('div'); heroWrap.className = 'st-hero'; app.insertBefore(heroWrap, hero); heroWrap.appendChild(hero); }
    var body = document.createElement('div');
    body.className = 'page-body' + (heroWrap ? ' st-cover' : '');
    var n = heroWrap ? heroWrap.nextSibling : app.firstChild;
    while (n && n !== foot) { var nx = n.nextSibling; body.appendChild(n); n = nx; }
    app.insertBefore(body, foot || null);
    stFns = [];
    if (reduced()) return;
    if (heroWrap) {
      var hov = overlayIn(heroWrap);
      var top0 = null;
      stFns.push(function (vh, sy) {
        if (top0 === null) top0 = body.getBoundingClientRect().top + sy;
        var p = clamp(sy / Math.max(1, top0));
        var y = isMobile() ? p * top0 : p * Math.min(ST.parallaxY, top0 * 0.6);
        heroWrap.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
        hov.style.opacity = (p * ST.parallaxOpacity).toFixed(3);
      });
    }
    if (foot) {
      var fov = overlayIn(foot);
      stFns.push(function (vh) {
        var fh = foot.offsetHeight || 1;
        var p = clamp((vh - body.getBoundingClientRect().bottom) / fh);
        var y = isMobile() ? 0 : (1 - p) * ST.revealY;
        foot.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0)';
        fov.style.opacity = ((1 - p) * ST.revealOpacity).toFixed(3);
      });
    }
  }
  function updateST() { var vh = window.innerHeight, sy = window.scrollY; for (var i = 0; i < stFns.length; i++) stFns[i](vh, sy); }
  window.addEventListener('scroll', function () {
    if (stTicking) return; stTicking = true;
    requestAnimationFrame(function () { stTicking = false; updateST(); });
  }, { passive: true });
  window.addEventListener('resize', function () { updateST(); });

  /* Masked line reveal */
  var TEXT_SEL = 'h1, .lede, .scard .title, .prose h2, .highlight';
  function splitLines(el) {
    if (el.getAttribute('data-split') || el.children.length) return false;
    var text = el.textContent.trim(); if (!text) return false;
    el.setAttribute('data-text', text);
    el.innerHTML = text.split(/\s+/).map(function (w) { return '<span class="w">' + esc(w) + '</span>'; }).join(' ');
    var lines = [], cur = null, top = null;
    Array.prototype.forEach.call(el.querySelectorAll('.w'), function (w) {
      var t = w.offsetTop;
      if (top === null || Math.abs(t - top) > 3) { cur = []; lines.push(cur); top = t; }
      cur.push(w.textContent);
    });
    el.innerHTML = lines.map(function (l) { return '<span class="line-mask"><span class="line">' + esc(l.join(' ')) + '</span></span>'; }).join(' ');
    el.setAttribute('data-split', '1');
    el.classList.add('pre');
    return true;
  }
  function unsplit() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-split]'), function (el) {
      if (el.classList.contains('pre')) return;
      el.textContent = el.getAttribute('data-text'); el.removeAttribute('data-split');
    });
  }
  var rsTimer = null;
  window.addEventListener('resize', function () { clearTimeout(rsTimer); rsTimer = setTimeout(unsplit, 150); });
  function playLines(el, delay) {
    var lines = el.querySelectorAll('.line');
    Array.prototype.forEach.call(lines, function (l, i) {
      l.animate([{ transform: 'translate3d(0,110%,0) skewY(-1deg)' }, { transform: 'translate3d(0,0,0) skewY(0deg)' }],
        { duration: 800, delay: delay + i * 90, easing: EASE.power2Out, fill: 'backwards' });
    });
    el.classList.remove('pre');
  }

  /* Image reveals */
  var IMG_SEL = '.card .plate, .scard .plate, .type .plate';
  function inner(plate) { return plate.querySelector(':scope > img.ph') || plate.querySelector(':scope > svg') || plate.querySelector(':scope > .duo'); }
  function playImage(plate, delay) {
    plate.classList.remove('pre-img');
    plate.animate([{ clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], { duration: 1000, delay: delay, easing: EASE.power4Out, fill: 'backwards' });
    var i = inner(plate);
    if (i) i.animate([{ transform: 'scale(1.2)' }, { transform: 'scale(1)' }], { duration: 1200, delay: delay, easing: EASE.power4Out, fill: 'backwards' });
  }
  function playHero(plate) {
    plate.animate([{ clipPath: 'inset(50% 50% 50% 50%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }], { duration: 1500, easing: EASE.power4Out, fill: 'backwards' });
    var i = inner(plate);
    if (i) i.animate([{ transform: 'scale(1.5)' }, { transform: 'scale(1)' }], { duration: 1500, easing: EASE.power4Out, fill: 'backwards' });
  }

  function enter() {
    if (reduced()) { flown = false; return; }
    if (io) io.disconnect();
    var vh = window.innerHeight, now = [], later = [];
    Array.prototype.forEach.call(app.querySelectorAll(TEXT_SEL), function (el) {
      if (el.closest('.foot')) return;
      if (!splitLines(el)) return;
      (el.getBoundingClientRect().top < vh * 0.95 ? now : later).push(el);
    });
    now.forEach(function (el, i) { playLines(el, 60 + i * 120); });
    var heroPlate = app.querySelector('#gallery .plate, [data-hero] .plate');
    if (heroPlate && !flown) playHero(heroPlate);
    flown = false;
    var imgs = Array.prototype.filter.call(app.querySelectorAll(IMG_SEL), function (p) { return p !== heroPlate; });
    imgs.forEach(function (p) { p.classList.add('pre-img'); });
    io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (en) { return en.isIntersecting; }).map(function (en) { return en.target; });
      batch.forEach(function (t, i) {
        io.unobserve(t);
        if (t._plate) playImage(t._plate, i * 80);
        else playLines(t, i * 120);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.12 });
    later.forEach(function (el) { io.observe(el); });
    /* A clipped element never reports as visible, so watch its unclipped parent instead. */
    imgs.forEach(function (p) { var host = p.parentElement; host._plate = p; io.observe(host); });
  }

  /* Page exit for plain links */
  function leaveThen(fn) {
    var anim = app.animate([{ opacity: 1, transform: 'translate3d(0,0,0)' }, { opacity: 0, transform: 'translate3d(0,-12px,0)' }], { duration: 200, easing: EASE.in, fill: 'forwards' });
    anim.onfinish = function () { fn(); anim.cancel(); };
  }

  /* Shared-element flight: the tapped image becomes the hero of the next page */
  function flyTo(srcPlate, route) {
    var r = srcPlate.getBoundingClientRect();
    var ghost = srcPlate.cloneNode(true);
    Array.prototype.forEach.call(ghost.querySelectorAll('.badge'), function (b) { b.remove(); });
    ghost.classList.remove('pre-img', 'fade');
    ghost.classList.add('ghost');
    ghost.style.cssText += ';position:fixed;margin:0;z-index:80;left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;aspect-ratio:auto;';
    var gi = ghost.querySelector('img.ph'); if (gi) gi.classList.add('in');
    document.body.appendChild(ghost);
    flown = true;
    go(route);
    var target = app.querySelector('#gallery .plate, [data-hero] .plate');
    if (!target) { ghost.remove(); return; }
    var t = target.getBoundingClientRect();
    target.style.visibility = 'hidden';
    var anim = ghost.animate([
      { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px' },
      { left: t.left + 'px', top: t.top + 'px', width: t.width + 'px', height: t.height + 'px' }
    ], { duration: 650, easing: EASE.inOutQuart, fill: 'forwards' });
    anim.onfinish = function () {
      target.style.visibility = '';
      ghost.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 160, easing: 'ease-out', fill: 'forwards' }).onfinish = function () { ghost.remove(); };
    };
  }

  render();
  updateST();
  enter();

})();
