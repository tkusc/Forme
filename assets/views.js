/* formé: routing, views, search, sheets. Reads the globals defined in data.js. */
(function () {
  'use strict';
  /* ---------- Illustrations (network-error fallbacks only) ---------- */
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
  "anglepoise-1227": {
    "src": "/photos/studio/anglepoise-1227.jpg",
    "source": "zenkki.co.uk",
    "page": "https://www.zenkki.co.uk/products/anglepoise-original",
    "original": "https://www.zenkki.co.uk/cdn/shop/products/original-1227-desk-lamp-jet-black-2_6_white.jpg?v=1755860470",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/anglepoise-1227.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/anglepoise-1227.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/anglepoise-1227.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/anglepoise-1227.jpg",
        "source": "zenkki.co.uk",
        "page": "https://www.zenkki.co.uk/products/anglepoise-original",
        "original": "https://www.zenkki.co.uk/cdn/shop/products/original-1227-desk-lamp-jet-black-2_6_white.jpg?v=1755860470",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/anglepoise-1227.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/anglepoise-1227.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/anglepoise-1227.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/anglepoise-1227-2.jpg",
        "source": "gnr8.jp",
        "page": "https://www.gnr8.jp/products/anglepoise-original-1227",
        "original": "https://www.gnr8.jp/cdn/shop/products/3dba323164d68884448e9f9b0beb705a_1024x1024.jpg?v=1597405442",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/anglepoise-1227-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/anglepoise-1227-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/anglepoise-1227-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "ph-artichoke": {
    "src": "/photos/studio/ph-artichoke.jpg",
    "source": "finnishdesignshop.com",
    "page": "https://www.finnishdesignshop.com/en-ch/product/ph-artichoke-480-mm-copper",
    "original": "https://media.fds.fi/product_image/2000/1194LouisPoulsen_19_TH.jpg",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/ph-artichoke.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/ph-artichoke.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/ph-artichoke.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/ph-artichoke.jpg",
        "source": "finnishdesignshop.com",
        "page": "https://www.finnishdesignshop.com/en-ch/product/ph-artichoke-480-mm-copper",
        "original": "https://media.fds.fi/product_image/2000/1194LouisPoulsen_19_TH.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/ph-artichoke.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/ph-artichoke.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/ph-artichoke.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/ph-artichoke-2.jpg",
        "source": "danishdesignstore.com",
        "page": "https://www.danishdesignstore.com/products/ph-artichoke-lamp-by-poul-henningsen-louis-poulsen",
        "original": "https://www.danishdesignstore.com/cdn/shop/files/PH_Artichoke_Copper_US_480_02A_2_5_90145_Product_Image_louis_poulsen.jpg?v=1724306931",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/ph-artichoke-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/ph-artichoke-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/ph-artichoke-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "arco": {
    "src": "/photos/studio/arco.jpg",
    "source": "jamesbondlifestyle.com",
    "page": "https://www.jamesbondlifestyle.com/product/flos-arco-floor-lamp",
    "original": "https://www.jamesbondlifestyle.com/sites/default/files/styles/fancybox_popup/public/images/product/ac085-flos-arco-floor-lamp.jpg?itok=B_4RsW1T",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/arco.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/arco.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/arco.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/arco.jpg",
        "source": "jamesbondlifestyle.com",
        "page": "https://www.jamesbondlifestyle.com/product/flos-arco-floor-lamp",
        "original": "https://www.jamesbondlifestyle.com/sites/default/files/styles/fancybox_popup/public/images/product/ac085-flos-arco-floor-lamp.jpg?itok=B_4RsW1T",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/arco.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/arco.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/arco.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/arco-2.jpg",
        "source": "nest.co.uk",
        "page": "https://www.nest.co.uk/product/flos-arco-floor-lamp",
        "original": "https://dm4c9mjc2jvtf.cloudfront.net/product-media/1YBS/1200/900/Flos-Arco-Floor-Lamp-Lifestyle-1.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/arco-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/arco-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/arco-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "tizio": {
    "src": "/photos/studio/tizio.jpg",
    "source": "italianfurniture.com",
    "page": "https://italianfurniture.com/products/adjustable-arm-table-lamp-artemide-tizio",
    "original": "https://italianfurniture.com/cdn/shop/files/ARTA009218.png?v=1756989951&width=2048",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/tizio.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/tizio.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/tizio.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/tizio.jpg",
        "source": "italianfurniture.com",
        "page": "https://italianfurniture.com/products/adjustable-arm-table-lamp-artemide-tizio",
        "original": "https://italianfurniture.com/cdn/shop/files/ARTA009218.png?v=1756989951&width=2048",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/tizio.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/tizio.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tizio.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/tizio-2.jpg",
        "source": "madeindesign.co.uk",
        "page": "https://www.madeindesign.co.uk/prod-tizio-table-lamp-metal-black-richard-sapper-1972-artemide-refa009010.html",
        "original": "https://media.madeindesign.com/cdn-cgi/image/fit%3Dscale-down%2Cbackground%3Dwhite%2Cformat%3Dauto%2Cquality%3D80%2Cheight%3D2000%2Cwidth%3D2000/nuxeo/products/3/4/lampe-de-table-tizio-black-artemide_madeindesign_119947_original.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/tizio-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/tizio-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tizio-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "thonet-no-14": {
    "src": "/photos/studio/thonet-no-14.jpg",
    "source": "smow.de",
    "page": "https://www.smow.de/thonet/kaffeehausstuehle/214-214-m-stuhl-ohne-armlehnen-buche-gebeizt-nussbaumfarbig-rohrgeflecht-mit-stuetzgewebe-unter-sitzflaeche.html",
    "original": "https://www.smow.de/pics/w3840/3b546528/th-045-000/thonet-214-ohne-armlehnen-buche-gebeizt-nussbaumfarbig-geflecht-gestuetzt.jpg",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/thonet-no-14.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/thonet-no-14.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/thonet-no-14.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/thonet-no-14.jpg",
        "source": "smow.de",
        "page": "https://www.smow.de/thonet/kaffeehausstuehle/214-214-m-stuhl-ohne-armlehnen-buche-gebeizt-nussbaumfarbig-rohrgeflecht-mit-stuetzgewebe-unter-sitzflaeche.html",
        "original": "https://www.smow.de/pics/w3840/3b546528/th-045-000/thonet-214-ohne-armlehnen-buche-gebeizt-nussbaumfarbig-geflecht-gestuetzt.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/thonet-no-14.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/thonet-no-14.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/thonet-no-14.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/thonet-no-14-2.jpg",
        "source": "designcollectors.com",
        "page": "https://www.designcollectors.com/en/thonet/thonet-design-team/home/2812-thonet-214-black",
        "original": "https://www.designcollectors.com/17890/thonet-214-black.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/thonet-no-14-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/thonet-no-14-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/thonet-no-14-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "wassily-chair": {
    "src": "/photos/studio/wassily-chair.jpg",
    "source": "en.smow.ch",
    "page": "https://en.smow.ch/marcel-breuer/wassily-chair-cattle-hide-light-brown.html",
    "original": "https://en.smow.ch/pics/w3840/20251001161505/MtZtCeQogtv6/knoll-intl-wassily-varianten-leder-schwarz-03.jpg",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/wassily-chair.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/wassily-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/wassily-chair.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/wassily-chair.jpg",
        "source": "en.smow.ch",
        "page": "https://en.smow.ch/marcel-breuer/wassily-chair-cattle-hide-light-brown.html",
        "original": "https://en.smow.ch/pics/w3840/20251001161505/MtZtCeQogtv6/knoll-intl-wassily-varianten-leder-schwarz-03.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/wassily-chair.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/wassily-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/wassily-chair.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/wassily-chair-2.jpg",
        "source": "used-design.com",
        "page": "https://www.used-design.com/angebot/132107/knoll-international-wassily-chair-leder-sessel-schwarz-bauhaus-vintage",
        "original": "https://d246b83yaxkr1n.cloudfront.net/1280x1280xfitNC/4a486562-b623-44e3-a356-c1abec1fb79c.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/wassily-chair-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/wassily-chair-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/wassily-chair-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "lc4": {
    "src": "/photos/studio/lc4.jpg",
    "source": "silvera.fr",
    "page": "https://www.silvera.fr/eshop/fauteuil-chaise-longue-lc4-cassina-5428-548-noir.html",
    "original": "https://www.silvera.fr/media/cache/sylius_shop_product_original/product_15009_7122_chaise-longue-lc4.jpg",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/lc4.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/lc4.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/lc4.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/lc4.jpg",
        "source": "silvera.fr",
        "page": "https://www.silvera.fr/eshop/fauteuil-chaise-longue-lc4-cassina-5428-548-noir.html",
        "original": "https://www.silvera.fr/media/cache/sylius_shop_product_original/product_15009_7122_chaise-longue-lc4.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/lc4.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/lc4.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/lc4.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/lc4-2.jpg",
        "source": "bukowskis.com",
        "page": "https://www.bukowskis.com/sv/lots/1138806-le-corbusier-vilstol-lc4-cassina",
        "original": "https://d2mpxrrcad19ou.cloudfront.net/item_images/1138806/11552272_fullsize.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/lc4-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/lc4-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/lc4-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "barcelona-chair": {
    "src": "/photos/studio/barcelona-chair.jpg",
    "source": "amoble.fr",
    "page": "https://www.amoble.fr/fr/sejour/canapes-et-fauteuils/chaises-longues/knoll-fauteuil-barcelona.3.174.136.gp.19130.uw",
    "original": "https://www.amoble.fr/files/archivio2_1_Files/Foto/184005.JPG",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/barcelona-chair.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/barcelona-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/barcelona-chair.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/barcelona-chair.jpg",
        "source": "amoble.fr",
        "page": "https://www.amoble.fr/fr/sejour/canapes-et-fauteuils/chaises-longues/knoll-fauteuil-barcelona.3.174.136.gp.19130.uw",
        "original": "https://www.amoble.fr/files/archivio2_1_Files/Foto/184005.JPG",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/barcelona-chair.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/barcelona-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/barcelona-chair.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "paimio-chair": {
    "src": "/photos/studio/paimio-chair.jpg",
    "source": "artek.fi",
    "page": "https://www.artek.fi/en/products/armchair-41-paimio",
    "original": "https://res.cloudinary.com/artek/image/upload/w_1200/v1587981606/products/armchair-41-paimio/Armchair-41-Paimio-black-lacquer-1842999.jpg",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/paimio-chair.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/paimio-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/paimio-chair.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/paimio-chair.jpg",
        "source": "artek.fi",
        "page": "https://www.artek.fi/en/products/armchair-41-paimio",
        "original": "https://res.cloudinary.com/artek/image/upload/w_1200/v1587981606/products/armchair-41-paimio/Armchair-41-Paimio-black-lacquer-1842999.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/paimio-chair.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/paimio-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/paimio-chair.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/paimio-chair-2.jpg",
        "source": "designpublic.com",
        "page": "https://www.designpublic.com/products/artek-41-armchair-paimio",
        "original": "https://www.designpublic.com/cdn/shop/files/Artek_armchair_41_black_2_photo_Juha_Nenonen_JPG.jpg?v=1770410784&width=1200",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/paimio-chair-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/paimio-chair-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/paimio-chair-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "noguchi-table": {
    "src": "/photos/studio/noguchi-table.jpg",
    "source": "innes.co.uk",
    "page": "https://www.innes.co.uk/products/vitra-noguchi-glass-coffee-table",
    "original": "https://www.innes.co.uk/cdn/shop/files/Vitra_Noguchi_Coffee_Table_Walnut.jpg?v=1716564488",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/noguchi-table.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/noguchi-table.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/noguchi-table.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/noguchi-table.jpg",
        "source": "innes.co.uk",
        "page": "https://www.innes.co.uk/products/vitra-noguchi-glass-coffee-table",
        "original": "https://www.innes.co.uk/cdn/shop/files/Vitra_Noguchi_Coffee_Table_Walnut.jpg?v=1716564488",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/noguchi-table.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/noguchi-table.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/noguchi-table.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/noguchi-table-2.jpg",
        "source": "blou-paris.fr",
        "page": "https://www.blou-paris.fr/table-basse/vitra/4842-table-basse-coffee-table-noguchi.html",
        "original": "https://www.blou-paris.fr/20262-large_default/table-basse-coffee-table-noguchi.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/noguchi-table-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/noguchi-table-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/noguchi-table-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "butterfly-stool": {
    "src": "/photos/studio/butterfly-stool.jpg",
    "source": "think-furniture.com",
    "page": "https://www.think-furniture.com/vitra-butterfly-stool/",
    "original": "https://cdn11.bigcommerce.com/s-0193a/images/stencil/original/products/605/7672/vitra_butterfly_stool_Yanagi_m__14341.1426523203.jpg?c=2",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/butterfly-stool.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/butterfly-stool.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/butterfly-stool.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/butterfly-stool.jpg",
        "source": "think-furniture.com",
        "page": "https://www.think-furniture.com/vitra-butterfly-stool/",
        "original": "https://cdn11.bigcommerce.com/s-0193a/images/stencil/original/products/605/7672/vitra_butterfly_stool_Yanagi_m__14341.1426523203.jpg?c=2",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/butterfly-stool.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/butterfly-stool.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/butterfly-stool.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "series-7": {
    "src": "/photos/studio/series-7.jpg",
    "source": "paletteandparlor.com",
    "page": "https://www.paletteandparlor.com/products/series-7-chair",
    "original": "https://www.paletteandparlor.com/cdn/shop/products/arne-jacobsen-series-7-chair-walnut-fritz-hansen_807x.jpg?v=1547093222",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/series-7.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/series-7.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/series-7.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/series-7.jpg",
        "source": "paletteandparlor.com",
        "page": "https://www.paletteandparlor.com/products/series-7-chair",
        "original": "https://www.paletteandparlor.com/cdn/shop/products/arne-jacobsen-series-7-chair-walnut-fritz-hansen_807x.jpg?v=1547093222",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/series-7.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/series-7.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/series-7.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/series-7-2.jpg",
        "source": "battenhome.co",
        "page": "https://www.battenhome.co/products/fritz-hansen-series-7-chair-lacquered",
        "original": "https://www.battenhome.co/cdn/shop/files/4_4b7d03c4-a172-4415-8c93-dbd4c6962319.png?v=1694125545&width=1080",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/series-7-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/series-7-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/series-7-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "eames-lounge-chair": {
    "src": "/photos/studio/eames-lounge-chair.jpg",
    "source": "1stdibs.com",
    "page": "https://www.1stdibs.com/furniture/seating/lounge-chairs/eames-lounge-chair-ottoman-1950s/id-f_49312972/",
    "original": "https://a.1stdibscdn.com/classic-eames-swiveling-lounge-chair-ottoman-for-sale/f_106262/f_468349321758923172548/f_46834932_1758923173060_bg_processed.jpg?auto=webp&disable=upscale&quality=60&width=640",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/eames-lounge-chair.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/eames-lounge-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/eames-lounge-chair.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/eames-lounge-chair.jpg",
        "source": "1stdibs.com",
        "page": "https://www.1stdibs.com/furniture/seating/lounge-chairs/eames-lounge-chair-ottoman-1950s/id-f_49312972/",
        "original": "https://a.1stdibscdn.com/classic-eames-swiveling-lounge-chair-ottoman-for-sale/f_106262/f_468349321758923172548/f_46834932_1758923173060_bg_processed.jpg?auto=webp&disable=upscale&quality=60&width=640",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/eames-lounge-chair.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/eames-lounge-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/eames-lounge-chair.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/eames-lounge-chair-2.jpg",
        "source": "rifyo.com",
        "page": "https://rifyo.com/products/herman-miller-eames-lounge-chair-ottoman",
        "original": "https://rifyo.com/cdn/shop/products/eames-lounge-chair-and-ottoman-product-cover.jpg?v=1678953385&width=640",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/eames-lounge-chair-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/eames-lounge-chair-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/eames-lounge-chair-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "tulip-chair": {
    "src": "/photos/studio/tulip-chair.jpg",
    "source": "trdst.com",
    "page": "https://trdst.com/products/knoll-saarinen-tulip-side-chair-with-fabric-seat-cushion-category-g",
    "original": "https://trdst.com/cdn/shop/files/W-KNO_7230_100506147_caviar_a.jpg?v=1725332739&width=1946",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/tulip-chair.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/tulip-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/tulip-chair.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/tulip-chair.jpg",
        "source": "trdst.com",
        "page": "https://trdst.com/products/knoll-saarinen-tulip-side-chair-with-fabric-seat-cushion-category-g",
        "original": "https://trdst.com/cdn/shop/files/W-KNO_7230_100506147_caviar_a.jpg?v=1725332739&width=1946",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/tulip-chair.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/tulip-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tulip-chair.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/tulip-chair-2.jpg",
        "source": "chaplins.co.uk",
        "page": "https://chaplins.co.uk/shop/knoll-saarinen-tulip-dining-set-white-137.html",
        "original": "https://cdn11.bigcommerce.com/s-hi9nbuups9/images/stencil/1280x1280/products/18091/100076/6a814ffd69ecefef1e8cd67c2585ac7a60a94331_chaplins_knoll_tulip_dining_chair_3_3_1__86554.1718723717.jpg?c=1",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/tulip-chair-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/tulip-chair-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tulip-chair-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "egg-chair": {
    "src": "/photos/studio/egg-chair.jpg",
    "source": "think-furniture.com",
    "page": "https://think-furniture.com/fritz-hansen-egg-chair/",
    "original": "https://cdn11.bigcommerce.com/s-0193a/images/stencil/original/products/2036/12011/5943_Egg_-_Leather__walnut___20260.1507041556.jpg?c=2",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/egg-chair.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/egg-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/egg-chair.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/egg-chair.jpg",
        "source": "think-furniture.com",
        "page": "https://think-furniture.com/fritz-hansen-egg-chair/",
        "original": "https://cdn11.bigcommerce.com/s-0193a/images/stencil/original/products/2036/12011/5943_Egg_-_Leather__walnut___20260.1507041556.jpg?c=2",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/egg-chair.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/egg-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/egg-chair.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/egg-chair-2.jpg",
        "source": "smow.fr",
        "page": "https://www.smow.fr/arne-jacobsen/fauteuil-egg-oeuf.html",
        "original": "https://www.smow.fr/pics/w3840/20251001121919/3JjXpSMpu7c4/fritz-hansen-egg-chair-lifestyle-smow-09.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/egg-chair-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/egg-chair-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/egg-chair-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "aalto-vase": {
    "src": "/photos/studio/aalto-vase.jpg",
    "source": "morandinstore.com",
    "page": "https://www.morandinstore.com/collections/oggettistica/products/iittala-vaso-alvar-aalto-160-mm-trasparente",
    "original": "https://www.morandinstore.com/cdn/shop/products/Aalto_vase_160mm_clear-2048x2048_1024x.jpg?v=1690476538",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/aalto-vase.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/aalto-vase.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/aalto-vase.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/aalto-vase.jpg",
        "source": "morandinstore.com",
        "page": "https://www.morandinstore.com/collections/oggettistica/products/iittala-vaso-alvar-aalto-160-mm-trasparente",
        "original": "https://www.morandinstore.com/cdn/shop/products/Aalto_vase_160mm_clear-2048x2048_1024x.jpg?v=1690476538",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/aalto-vase.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/aalto-vase.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/aalto-vase.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/aalto-vase-2.jpg",
        "source": "norwaydesigns.no",
        "page": "https://www.norwaydesigns.no/en/products/iittala-aalto-vase-160mm-klar",
        "original": "https://www.norwaydesigns.no/cdn/shop/files/Iittala_aaltovase_03.jpg?v=1716821580&width=480",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/aalto-vase-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/aalto-vase-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/aalto-vase-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "ball-clock": {
    "src": "/photos/studio/ball-clock.jpg",
    "source": "paletteandparlor.com",
    "page": "https://www.paletteandparlor.com/products/george-nelson-ball-clock",
    "original": "https://www.paletteandparlor.com/cdn/shop/products/george-nelson-ball-clock-natural-wood-vitra_700x.jpg?v=1468873980",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/ball-clock.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/ball-clock.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/ball-clock.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/ball-clock.jpg",
        "source": "paletteandparlor.com",
        "page": "https://www.paletteandparlor.com/products/george-nelson-ball-clock",
        "original": "https://www.paletteandparlor.com/cdn/shop/products/george-nelson-ball-clock-natural-wood-vitra_700x.jpg?v=1468873980",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/ball-clock.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/ball-clock.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/ball-clock.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/ball-clock-2.jpg",
        "source": "theconranshop.com.kw",
        "page": "https://www.theconranshop.com.kw/products/ball-clock-diameter-330-mm-natural",
        "original": "https://www.theconranshop.com.kw/cdn/shop/files/TCS123187_0.jpg?v=1708453827",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/ball-clock-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/ball-clock-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/ball-clock-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "hang-it-all": {
    "src": "/photos/studio/hang-it-all.jpg",
    "source": "einrichten-design.fr",
    "page": "https://www.einrichten-design.fr/fr_fr/eames-hang-it-all-portemanteau-multicolore-vitra.html",
    "original": "https://www.einrichten-design.fr/media/42/cb/48/1754317589/Vitra-Eames-Hang-it-all-Garderobe-mehrfarbig002_%281%29.jpg",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/hang-it-all.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/hang-it-all.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/hang-it-all.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/hang-it-all.jpg",
        "source": "einrichten-design.fr",
        "page": "https://www.einrichten-design.fr/fr_fr/eames-hang-it-all-portemanteau-multicolore-vitra.html",
        "original": "https://www.einrichten-design.fr/media/42/cb/48/1754317589/Vitra-Eames-Hang-it-all-Garderobe-mehrfarbig002_%281%29.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/hang-it-all.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/hang-it-all.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/hang-it-all.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/hang-it-all-2.jpg",
        "source": "nest.co.uk",
        "page": "https://www.nest.co.uk/product/vitra-hang-it-all-coat-rack",
        "original": "https://dm4c9mjc2jvtf.cloudfront.net/product-media/1QKP/1200/900/Vitra-Hang-It-All-lifestyle.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/hang-it-all-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/hang-it-all-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/hang-it-all-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "juicy-salif": {
    "src": "/photos/studio/juicy-salif.jpg",
    "source": "courthouseinteriors.com",
    "page": "https://courthouseinteriors.com/products/juicy-salif-citrus-squeezer-alessi?variant=39933879320705",
    "original": "https://courthouseinteriors.com/cdn/shop/files/Juicy-Salif-Citrus-Squeezer-Alessi-1.jpg?v=1727812018",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/juicy-salif.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/juicy-salif.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/juicy-salif.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/juicy-salif.jpg",
        "source": "courthouseinteriors.com",
        "page": "https://courthouseinteriors.com/products/juicy-salif-citrus-squeezer-alessi?variant=39933879320705",
        "original": "https://courthouseinteriors.com/cdn/shop/files/Juicy-Salif-Citrus-Squeezer-Alessi-1.jpg?v=1727812018",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/juicy-salif.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/juicy-salif.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/juicy-salif.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/juicy-salif-2.jpg",
        "source": "us.alessi.com",
        "page": "https://us.alessi.com/collections/kitchen-tools",
        "original": "https://us.alessi.com/cdn/shop/products/01_PSJS_aaf8c62d-b352-4aa9-b63a-2a52c9ae15aa.jpg?v=1652871135&width=1066",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/juicy-salif-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/juicy-salif-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/juicy-salif-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "ph-5": {
    "src": "/photos/studio/ph-5.jpg",
    "source": "louispoulsen.com",
    "page": "https://www.louispoulsen.com/en/catalog/professional/decorative-lighting/pendants/ph-5?v=90293-5741099870-01",
    "original": "https://dam.louispoulsen.dk/DigizuiteCore/LegacyService/api/assetstream/7642/50422.webp?doneby=ImageResizerUtil&fit=crop&height=2000&quality=90&timestamp=2026-03-17T15%253a05%253a46.1948086&width=2000",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/ph-5.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/ph-5.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/ph-5.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/ph-5.jpg",
        "source": "louispoulsen.com",
        "page": "https://www.louispoulsen.com/en/catalog/professional/decorative-lighting/pendants/ph-5?v=90293-5741099870-01",
        "original": "https://dam.louispoulsen.dk/DigizuiteCore/LegacyService/api/assetstream/7642/50422.webp?doneby=ImageResizerUtil&fit=crop&height=2000&quality=90&timestamp=2026-03-17T15%253a05%253a46.1948086&width=2000",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/ph-5.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/ph-5.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/ph-5.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/ph-5-2.jpg",
        "source": "skandium.com",
        "page": "https://www.skandium.com/products/louis-poulsen-ph-5-pendant-lamp",
        "original": "https://www.skandium.com/cdn/shop/products/2c6ffc22ad30d0b4e252f42fa8569998.jpg?v=1708223805&width=1920",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/ph-5-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/ph-5-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/ph-5-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "akari-1a": {
    "src": "/photos/studio/akari-1a.jpg",
    "source": "utilitydesign.co.uk",
    "page": "https://www.utilitydesign.co.uk/vitra-akari-1a-table-lamp",
    "original": "https://www.utilitydesign.co.uk/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/a/k/akari-1a_0.jpg",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/akari-1a.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/akari-1a.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/akari-1a.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/akari-1a.jpg",
        "source": "utilitydesign.co.uk",
        "page": "https://www.utilitydesign.co.uk/vitra-akari-1a-table-lamp",
        "original": "https://www.utilitydesign.co.uk/media/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/a/k/akari-1a_0.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/akari-1a.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/akari-1a.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/akari-1a.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/akari-1a-2.jpg",
        "source": "auctionet.com",
        "page": "https://auctionet.com/en/2586656-isamu-noguchi-table-lamp-akari-1a",
        "original": "https://images.auctionet.com/thumbs/large_item_2586656_c18e01bf89.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/akari-1a-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/akari-1a-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/akari-1a-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "kubus": {
    "src": "/photos/studio/kubus.jpg",
    "source": "us.audocph.com",
    "page": "https://us.audocph.com/products/kubus-4",
    "original": "https://us.audocph.com/cdn/shop/files/4817649_Kubus_4_Ivory_Angle.jpg?v=1696611973&width=1946",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/kubus.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/kubus.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/kubus.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/kubus.jpg",
        "source": "us.audocph.com",
        "page": "https://us.audocph.com/products/kubus-4",
        "original": "https://us.audocph.com/cdn/shop/files/4817649_Kubus_4_Ivory_Angle.jpg?v=1696611973&width=1946",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/kubus.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/kubus.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/kubus.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/kubus-2.jpg",
        "source": "us.audocph.com",
        "page": "https://us.audocph.com/products/kubus-4-white",
        "original": "https://us.audocph.com/cdn/shop/products/10104_pack_1_cc3f9601-bd4c-49e6-bcfa-ded890608860.jpg?v=1708992457&width=1445",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/kubus-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/kubus-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/kubus-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "murano-globe": {
    "src": "/photos/studio/murano-globe.jpg",
    "source": "pamono.de",
    "page": "https://www.pamono.de/weisse-murano-haengelampe-von-vetri-murano-italien-1970er",
    "original": "https://cdn20.pamono.com/p/z/1/5/1545342_uyz2uchrqx/weisse-murano-haengelampe-von-vetri-murano-italien-1970er-1.jpg",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "note": "Vintage Murano globe, 1970s; the photograph shows a white patterned glass variant.",
    "originalSrc": "/photos/murano-globe.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/murano-globe.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/murano-globe.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/murano-globe.jpg",
        "source": "pamono.de",
        "page": "https://www.pamono.de/weisse-murano-haengelampe-von-vetri-murano-italien-1970er",
        "original": "https://cdn20.pamono.com/p/z/1/5/1545342_uyz2uchrqx/weisse-murano-haengelampe-von-vetri-murano-italien-1970er-1.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "note": "Vintage Murano globe, 1970s; the photograph shows a white patterned glass variant.",
        "originalSrc": "/photos/murano-globe.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/murano-globe.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/murano-globe.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "pipistrello": {
    "src": "/photos/studio/pipistrello-2.jpg",
    "source": "rarify.co",
    "page": "https://rarify.co/products/pipistrello-table-lamp-large-gae-aulenti-martinelli-luce-620-us-bi",
    "original": "https://rarify.co/cdn/shop/files/620_NE-web_1.jpg?v=1751513514",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/pipistrello-2.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/pipistrello-2.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/pipistrello-2.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/pipistrello-2.jpg",
        "source": "rarify.co",
        "page": "https://rarify.co/products/pipistrello-table-lamp-large-gae-aulenti-martinelli-luce-620-us-bi",
        "original": "https://rarify.co/cdn/shop/files/620_NE-web_1.jpg?v=1751513514",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/pipistrello-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/pipistrello-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/pipistrello-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/pipistrello.jpg",
        "source": "designitch.com",
        "page": "https://designitch.com/products/pipistrello-table-lamp-black",
        "original": "https://designitch.com/cdn/shop/products/PipistrelloTableLamp-Black-Lif2.jpg?v=1651049993&width=2000",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/pipistrello.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/pipistrello.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/pipistrello.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "taccia": {
    "src": "/photos/studio/taccia-archive.jpg",
    "artist": "Azienda Flos",
    "lic": "CC BY-SA 4.0",
    "page": "https://commons.wikimedia.org/wiki/File:Taccia-table-a-pg-castiglioni-flos-F6602004-product-still-life-big.jpg",
    "note": "",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "source": "Wikimedia Commons",
    "originalSrc": "/photos/taccia-archive.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/taccia-archive.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/taccia-archive.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/taccia-archive.jpg",
        "artist": "Azienda Flos",
        "lic": "CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Taccia-table-a-pg-castiglioni-flos-F6602004-product-still-life-big.jpg",
        "note": "",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "source": "Wikimedia Commons",
        "originalSrc": "/photos/taccia-archive.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/taccia-archive.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/taccia-archive.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/taccia.jpg",
        "source": "ddcnyc.com",
        "page": "https://www.ddcnyc.com/product/taccia/",
        "original": "https://www.ddcnyc.com/wp-content/uploads/2024/11/Flos_Taccia_Table_Lamp_Lighting_005.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/taccia.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/taccia.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/taccia.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "atollo": {
    "src": "/photos/studio/atollo.jpg",
    "source": "wohn-cultur.de",
    "page": "https://www.wohn-cultur.de/product_info.php?products_id=1846",
    "original": "https://www.wohn-cultur.de/images/product_images/popup_images/1846_2.jpg",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/atollo.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/atollo.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/atollo.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/atollo.jpg",
        "source": "wohn-cultur.de",
        "page": "https://www.wohn-cultur.de/product_info.php?products_id=1846",
        "original": "https://www.wohn-cultur.de/images/product_images/popup_images/1846_2.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/atollo.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/atollo.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/atollo.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/atollo-2.jpg",
        "source": "wohn-cultur.de",
        "page": "https://www.wohn-cultur.de/product_info.php?products_id=1846",
        "original": "https://www.wohn-cultur.de/images/product_images/popup_images/1846_1.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/atollo-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/atollo-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/atollo-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/atollo-archive.jpg",
        "artist": "Pava",
        "lic": "CC BY-SA 3.0 it",
        "page": "https://commons.wikimedia.org/wiki/File:%22_11_-_ITALY_-_Atollo_-_Oluce_-_Vico_Magistretti_1977.jpg",
        "note": "",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "source": "Wikimedia Commons",
        "originalSrc": "/photos/atollo-archive.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/atollo-archive.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/atollo-archive.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "tolomeo": {
    "src": "/photos/studio/tolomeo.jpg",
    "source": "blennemann.de",
    "page": "https://blennemann.de/artemide-schreibtischlampe-tolomeo-tavolo-mit-fuss-in-alu/",
    "original": "https://blennemann.de/media/a7/88/53/1725267663/Schreibtischlampe-Tolomeo-Tavolo-mit-Fuss-in-Alu-070800902-005.jpeg?width=3000",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/tolomeo.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/tolomeo.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/tolomeo.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/tolomeo.jpg",
        "source": "blennemann.de",
        "page": "https://blennemann.de/artemide-schreibtischlampe-tolomeo-tavolo-mit-fuss-in-alu/",
        "original": "https://blennemann.de/media/a7/88/53/1725267663/Schreibtischlampe-Tolomeo-Tavolo-mit-Fuss-in-Alu-070800902-005.jpeg?width=3000",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/tolomeo.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/tolomeo.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tolomeo.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/tolomeo-archive.jpg",
        "artist": "Sailko",
        "lic": "CC BY-SA 4.0",
        "page": "https://commons.wikimedia.org/wiki/File:Michele_de_lucchi_e_giancarlo_fassina_per_artemide,_lampada_da_tavolo_tolomeo,_1987.jpg",
        "note": "",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "source": "Wikimedia Commons",
        "originalSrc": "/photos/tolomeo-archive.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/tolomeo-archive.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tolomeo-archive.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "wishbone-chair": {
    "src": "/photos/studio/wishbone-chair.jpg",
    "source": "skandium.com",
    "page": "https://www.skandium.com/products/ch24-wishbone-chair-oak",
    "original": "https://www.skandium.com/cdn/shop/products/83b8d1f0052d42a7ab43e2ffeba602e3.jpg?v=1708211754&width=1200",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/wishbone-chair.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/wishbone-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/wishbone-chair.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/wishbone-chair.jpg",
        "source": "skandium.com",
        "page": "https://www.skandium.com/products/ch24-wishbone-chair-oak",
        "original": "https://www.skandium.com/cdn/shop/products/83b8d1f0052d42a7ab43e2ffeba602e3.jpg?v=1708211754&width=1200",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/wishbone-chair.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/wishbone-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/wishbone-chair.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/wishbone-chair-archive.jpg",
        "artist": "Robert B. Moffatt",
        "lic": "CC BY-SA 2.0",
        "page": "https://commons.wikimedia.org/wiki/File:Hans_Wegner_Wishbone_Chair.jpg",
        "note": "",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "source": "Wikimedia Commons",
        "originalSrc": "/photos/wishbone-chair-archive.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/wishbone-chair-archive.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/wishbone-chair-archive.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "panton-chair": {
    "src": "/photos/studio/panton-chair.jpg",
    "source": "danishdesignstore.com",
    "page": "https://www.danishdesignstore.com/products/vitra-new-panton-chair",
    "original": "https://www.danishdesignstore.com/cdn/shop/files/3350061_Panton-Chair_F_v_fullbleed_1440x_5f618cbc-2439-425e-a3b7-1a3e290c3e0a.jpg?v=1772808792&width=1200",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/panton-chair.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/panton-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/panton-chair.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/panton-chair.jpg",
        "source": "danishdesignstore.com",
        "page": "https://www.danishdesignstore.com/products/vitra-new-panton-chair",
        "original": "https://www.danishdesignstore.com/cdn/shop/files/3350061_Panton-Chair_F_v_fullbleed_1440x_5f618cbc-2439-425e-a3b7-1a3e290c3e0a.jpg?v=1772808792&width=1200",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/panton-chair.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/panton-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/panton-chair.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/panton-chair-archive.jpg",
        "artist": "Tokumeigakarinoaoshima",
        "lic": "CC0",
        "page": "https://commons.wikimedia.org/wiki/File:Panton_Chair_by_Verner_Panton.JPG",
        "note": "",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "source": "Wikimedia Commons",
        "originalSrc": "/photos/panton-chair-archive.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/panton-chair-archive.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/panton-chair-archive.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  },
  "panthella": {
    "src": "/photos/studio/panthella.jpg",
    "source": "architare.shop",
    "page": "https://architare.shop/en-en/products/louis-poulsen-panthella-400-tischleuchte",
    "original": "https://architare.shop/cdn/shop/files/Panthella400opalweiss.webp?v=1729605835&width=2048",
    "fit": "cover",
    "bg": "#C9C0B3",
    "width": 1122,
    "height": 1402,
    "rights": "Unverified; reference photograph for the preview.",
    "originalSrc": "/photos/panthella.jpg",
    "aiEdit": {
      "tool": "built-in image_gen",
      "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
      "styleReference": "/photos/studio/ph-5.jpg"
    },
    "nightSrc": "/photos/night/panthella.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/panthella.jpg",
      "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
      "styleReference": "/photos/night/ph-5.jpg"
    },
    "images": [
      {
        "src": "/photos/studio/panthella.jpg",
        "source": "architare.shop",
        "page": "https://architare.shop/en-en/products/louis-poulsen-panthella-400-tischleuchte",
        "original": "https://architare.shop/cdn/shop/files/Panthella400opalweiss.webp?v=1729605835&width=2048",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/panthella.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/panthella.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/panthella.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      },
      {
        "src": "/photos/studio/panthella-2.jpg",
        "source": "einrichten-design.de",
        "page": "https://www.einrichten-design.de/de/panthella-tischleuchte-louis-poulsen.html",
        "original": "https://www.einrichten-design.de/thumbnail/9a/e9/e3/1597947733/Louis%20Poulsen%20Panthella%20Table%20Tischleuchte%205744163415324fb_1920x1920.jpg",
        "fit": "cover",
        "bg": "#C9C0B3",
        "width": 1122,
        "height": 1402,
        "rights": "Unverified; reference photograph for the preview.",
        "originalSrc": "/photos/panthella-2.jpg",
        "aiEdit": {
          "tool": "built-in image_gen",
          "treatment": "Background and lighting harmonized to a cinematic editorial studio style",
          "styleReference": "/photos/studio/ph-5.jpg"
        },
        "nightSrc": "/photos/night/panthella-2.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/panthella-2.jpg",
          "treatment": "Matching cozy nighttime exposure; lamp on or warm external practical light",
          "styleReference": "/photos/night/ph-5.jpg"
        }
      }
    ]
  }
};
  var TONES = ['#EAE4DA', '#E3DCD1', '#DDD5CA'];
  /* Open the page with #slow to delay every photo by 1–2.5 s and watch the skeletons. */
  var SLOW = (function () { try { return location.hash === '#slow'; } catch (e) { return false; } })();
  /* The illustration sits underneath as a fallback: hidden while the photo loads, shown if it fails. */
  function photoTag(slug, fallbackArt, index) {
    var p = PHOTOS[slug].images[index || 0];
    var shared = ' width="' + p.width + '" height="' + p.height + '" decoding="async" loading="lazy" style="object-fit:' + p.fit + '">';
    return (fallbackArt ? art(fallbackArt) : '') + '<img class="ph ph-day" ' + (SLOW ? 'data-src' : 'src') + '="' + p.src + '" alt="' + esc(altFor(slug) + (p.note ? '. ' + p.note : '')) + '"' + shared +
      '<img class="ph ph-night" ' + (SLOW ? 'data-src' : 'src') + '="' + (p.nightSrc || p.src) + '" alt="" aria-hidden="true"' + shared;
  }
  function altFor(slug) { var o = oBySlug[slug]; return o ? o.name + (dFull(o) ? ' by ' + dFull(o) : '') : ''; }
  function visual(o) { return PHOTOS[o.slug] ? photoTag(o.slug, o.art) : art(o.art); }
  var photoMode = 'day';
  try { photoMode = localStorage.getItem('forme-photo-mode') === 'night' ? 'night' : 'day'; } catch (e) {}
  function applyPhotoMode(root) {
    document.documentElement.dataset.photoMode = photoMode;
    Array.prototype.forEach.call(root.querySelectorAll('button[data-photo-mode]'), function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.photoMode === photoMode));
    });
  }
  function setPhotoMode(mode) {
    photoMode = mode === 'night' ? 'night' : 'day';
    try { localStorage.setItem('forme-photo-mode', photoMode); } catch (e) {}
    applyPhotoMode(document);
  }
  function wireImages(root) {
    Array.prototype.forEach.call(root.querySelectorAll('img.ph'), function (im) {
      function done() { im.classList.add('in'); }
      im.addEventListener('load', done);
      im.addEventListener('error', function () { im.classList.add('err'); });
      if (im.getAttribute('data-src')) {
        setTimeout(function () { im.src = im.getAttribute('data-src'); im.removeAttribute('data-src'); }, 1000 + Math.random() * 1500);
      } else if (im.complete && im.naturalWidth) { done(); }
    });
    applyPhotoMode(root);
  }
  function plateBg(o) { return PHOTOS[o.slug] && PHOTOS[o.slug].bg ? ' style="background:' + PHOTOS[o.slug].bg + '"' : ''; }
  function creditLine(o) {
    return esc(o.name) + ': ' + PHOTOS[o.slug].images.map(function (p, i) {
      var label = p.artist ? 'photo by ' + p.artist + ' · ' + p.lic : p.source;
      return '<a class="link" href="' + esc(p.page) + '" target="_blank" rel="noopener">' + esc(label) + '</a>' + (p.note ? ' (' + esc(p.note) + ')' : '');
    }).join('; ') + '. Day and night lighting harmonized with AI.';
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
  function pillContent(label) {
    return '<div class="inner">' + esc(label) + '</div><div class="circle" aria-hidden="true"><span>→</span></div>';
  }
  function pad(n) { return String(n).padStart(2, '0'); }

  function secHead(label, route, linkText, lighting) {
    return '<div class="sec-head"><h2 class="label" style="font-weight:400">' + label + '</h2>' + '<div class="sec-actions">' + (route ? link(route, linkText || 'View all') : '') + '</div></div>';
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
    h += '<section class="wrap g home-intro"><h1 data-reveal-01="words" class="serif hero-h1">The stories behind iconic design.</h1>' +
      '<p class="muted home-description">A showroom for the lamps, chairs and objects that shaped design history, and the ideas behind them.</p></section>';
    h += '<section class="sec wrap home-recent"><div class="g">' + secHead('Recently added', 'collection:lighting', 'View all', true) + '</div><div class="grid home-gallery">' + recent.map(objCard).join('') + '</div></section>';
    h += '<div class="wrap home-feature">' + link('story:' + latest.slug, '<div class="home-feature-image" style="position:relative">' + storyPlate(latest) + '<span class="badge sq">NEW</span></div><div class="g"><div class="label muted">Latest story · ' + latest.min + ' min</div><div class="title">' + esc(latest.title) + '</div><p class="latest-lede">' + esc(latest.lede) + '</p></div>', 'scard latest') + '</div>';
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
      return '<button class="type" data-type="' + t + '" aria-pressed="' + on + '"><div class="plate" style="width:100%">' + visual(items[0]) + '</div><span>' + (on ? '<i class="dot"></i>' : '') + t + ' <span class="muted">' + items.length + '</span></span></button>';
    }).join('');
    var h = '';
    h += '<div class="wrap g" style="padding-top:16px"><div class="dept" role="tablist" aria-label="Collection">' + DEPTS.map(function (d) {
      var on = d.id === dept.id;
      return '<button role="tab" class="label" aria-selected="' + on + '" data-go="collection:' + d.id + '">' + (on ? '<i class="dot"></i>' : '') + d.label + '</button>';
    }).join('') + '</div></div>';
    h += '<section class="wrap g" style="padding-top:48px;display:flex;flex-direction:column;gap:16px"><h1 data-reveal-01="words" class="page-title">' + dept.label + '</h1><p class="lede read">' + esc(dept.lede) + '</p></section>';
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
        return link('object:' + o.slug, '<span class="no">' + pad(i + 1) + '</span><span class="sthumb">' + visual(o) + '</span><span style="flex:1;display:flex;flex-direction:column;gap:4px;min-width:0"><span class="serif" style="font-size:var(--t22);line-height:1.1">' + esc(o.name) + '</span><span class="meta">' + esc(dFull(o)) + '</span></span><span class="meta">' + esc(o.yearLabel) + '</span>', 'irow', ' style="padding:12px 0"');
      }).join('') + '</div>';
    }
    if (list.length > state.shown) h += '<div class="wrap g" style="padding-top:48px"><button class="button-02 wide" id="loadMore">' + pillContent('Load more · ' + (list.length - state.shown)) + '</button></div>';
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
    var slides = PHOTOS[o.slug].images.map(function (p, index) {
      return '<div class="plate fade gslide" style="background:' + (p.bg || '#FFFFFF') + '">' + photoTag(o.slug, o.art, index) + '</div>';
    });
    state.slides = slides.length;
    h += '<div class="obj-top"><div class="obj-media">';
    h += '<div class="wrap gwrap"><div class="gallery" id="gallery" tabindex="0" role="region" aria-label="Images of ' + esc(o.name) + '">' + slides.join('') + '</div>' +
      (slides.length > 1 ? '<button class="gnav prev sq" data-gal="-1" aria-label="Previous image"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button><button class="gnav next sq" data-gal="1" aria-label="Next image"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button>' : '') +
      '<div class="gcount" id="gcount" aria-live="polite">1 / ' + slides.length + '</div></div>';
    h += '</div><div class="obj-body">';
    h += '<section class="wrap g obj-head" style="padding-top:24px;display:flex;flex-direction:column;gap:12px">' +
      '<nav class="label muted" aria-label="Breadcrumb" style="display:flex;gap:8px">' + link('collection:' + dept.id, dept.label) + '<span aria-hidden="true">/</span><button data-type-go="' + o.type + '" class="label">' + esc(o.type) + '</button></nav>' +
      '<h1 data-reveal-01="words" class="serif" style="font-size:var(--t64);line-height:.92;letter-spacing:-.03em;text-wrap:balance">' + esc(o.name) + '</h1><div style="font-size:var(--t16)">' + designerLink + '</div></section>';
    h += '<section class="wrap g" style="margin-top:48px"><div class="inshort read"><h2 class="label" style="font-weight:400">In short</h2><p class="lede">' + esc(o.inShort) + '</p></div></section>';
    h += '<section class="sec wrap g"><div class="read">' + secHead('Facts') + '<dl class="facts">' + facts.map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + f[1] + '</dd></div>'; }).join('') + '</dl></div></section>';
    h += '<article class="sec wrap g"><div class="read"><div class="sec-head"><h2 class="label" style="font-weight:400">The story</h2><span class="label muted">' + Math.max(2, o.story.length + 1) + ' min</span></div>' +
      '<div class="prose" style="margin-top:32px">' + o.story.map(function (p) { return '<h2 data-reveal-01="lines" data-scroll>' + esc(p[0]) + '</h2><p>' + esc(p[1]) + '</p>'; }).join('') + '</div></div></article>';
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
      '<h1 data-reveal-01="words" class="serif" style="font-size:var(--t48);line-height:.98;letter-spacing:-.025em;text-wrap:balance">' + esc(s.title) + '</h1>' +
      '<p class="lede" style="color:var(--ink-soft)">' + esc(s.lede) + '</p><div class="muted" style="font-size:var(--t14)">By formé · ' + esc(s.date) + '</div></div></section>';
    h += '<div class="wrap" style="margin-top:32px">' + storyPlate(s) + '</div>';
    h += '<section class="wrap g" style="margin-top:48px"><div class="inshort read"><h2 class="label" style="font-weight:400">In short</h2><p class="lede">' + esc(s.inShort) + '</p></div></section>';
    h += '<section class="wrap" style="margin-top:48px"><div class="g" style="display:flex;justify-content:space-between;align-items:baseline"><h2 class="label" style="font-weight:400">Featured in this story</h2><span class="muted" style="font-size:var(--t14)">' + s.featured.length + '</span></div>' +
      '<div class="types g" style="margin-top:16px">' + s.featured.map(function (f) { var o = oBySlug[f];
        return link('object:' + o.slug, '<div class="plate r45" style="width:150px">' + visual(o) + '</div><div><div class="label muted" style="letter-spacing:.14em">' + esc(dLabel(o)) + ' · ' + esc(o.yearLabel) + '</div><div class="serif" style="font-size:var(--t22);margin-top:4px">' + esc(o.name) + '</div></div>', 'card', ' style="flex:none;width:150px"'); }).join('') + '</div></section>';
    var body = '';
    s.sections.forEach(function (sec, i) {
      body += '<h2 data-reveal-01="lines" data-scroll>' + esc(sec[0]) + '</h2>' + sec[1].map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
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
      '<h1 data-reveal-01="words" class="serif" style="font-size:var(--t64);line-height:.92;letter-spacing:-.03em;text-wrap:balance">' + esc(d.name) + '</h1><div class="muted">' + esc(d.years) + ' · ' + esc(d.country) + '</div></section>';
    h += '<section class="wrap g" style="margin-top:48px"><div class="inshort read"><h2 class="label" style="font-weight:400">In short</h2><p class="lede">' + esc(d.inShort) + '</p></div></section>';
    h += '<section class="sec wrap"><div class="g"><div class="sec-head"><h2 class="label" style="font-weight:400">Objects</h2><span class="muted" style="font-size:var(--t14)">' + objs.length + '</span></div></div><div class="grid" style="margin-top:24px">' + objs.map(objCard).join('') + '</div></section>';
    h += '<section class="sec wrap g"><div class="read">' + secHead('Facts') + '<dl class="facts">' + [['Lived', d.years], ['Nationality', d.nationality], ['Known for', d.knownFor], ['Worked with', d.collaborators]].map(function (f) { return '<div><dt>' + f[0] + '</dt><dd>' + esc(f[1]) + '</dd></div>'; }).join('') + '</dl></div></section>';
    h += '<article class="sec wrap g"><div class="read">' + secHead('Biography') + '<div class="prose" style="margin-top:24px">' + d.bio.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div></div></article>';
    if (stories.length) h += '<section class="sec wrap"><div class="g"><div class="sec-head"><h2 class="label" style="font-weight:400">In the stories</h2><span class="muted" style="font-size:var(--t14)">' + stories.length + '</span></div></div><div class="read" style="margin-top:24px">' + storyCard(stories[0]) + '</div></section>';
    h += credits(creditsFor(objs)) + footer();
    return h;
  };

  views.stories = function () {
    return '<section class="wrap g" style="padding-top:48px;display:flex;flex-direction:column;gap:16px"><h1 data-reveal-01="words" class="page-title">Stories</h1><p class="lede read">Essays on the ideas, materials and people behind iconic design.</p></section>' +
      '<div class="wrap" style="margin-top:48px"><div class="story-list two">' + STORIES.map(function (s) { return storyCard(s); }).join('') + '</div></div>' + follow() + footer();
  };

  views.designers = function () {
    var sorted = DESIGNERS.slice().sort(function (a, b) { return a.sort.localeCompare(b.sort); });
    return '<section class="wrap g" style="padding-top:48px;display:flex;flex-direction:column;gap:16px"><h1 data-reveal-01="words" class="page-title">Designers</h1><p class="lede read">The people behind the objects. Profiles appear once a designer has two objects in the collection.</p></section>' +
      '<section class="wrap g" style="margin-top:48px"><div class="read">' + secHead('A–Z · ' + sorted.length) + designerRows(sorted) + '</div></section>' + footer();
  };

  views.about = function () {
    var crit = [['A clear idea', 'Every object answers a question, of light, material or use.'], ['Lasting influence', 'It changed how others designed, or how people lived.'], ['Still meaningful', 'It would feel right in a room today.'], ['A story worth telling', 'If we can’t tell you something new about it, it doesn’t belong here.']];
    return '<section class="wrap g" style="padding-top:48px;display:flex;flex-direction:column;gap:24px"><h1 data-reveal-01="words" class="page-title">About</h1><p class="serif read" style="font-size:var(--t32);line-height:1.1;letter-spacing:-.01em;text-wrap:balance">We collect the stories behind iconic design, starting with light.</p></section>' +
      '<article class="sec wrap g"><div class="read">' + secHead('Why stories') + '<div class="prose" style="margin-top:24px"><p>A great object is more than its shape. Behind it is a problem someone wanted to solve, a material someone dared to try, a time that made it possible. formé is a quiet place to discover those stories, one object at a time.</p><p>We don’t sell anything. We show, explain and connect.</p></div></div></article>' +
      '<section class="sec wrap g"><div class="read">' + secHead('How we choose') + '<ol style="margin-top:8px">' + crit.map(function (c, i) {
        return '<li style="display:flex;gap:16px;padding:20px 0;border-bottom:1px solid ' + (i === crit.length - 1 ? 'var(--ink)' : 'var(--line)') + '"><span class="muted" style="width:20px;flex:none;font-size:var(--t11);padding-top:6px">' + pad(i + 1) + '</span><span><span class="serif" style="display:block;font-size:var(--t22)">' + c[0] + '</span><span style="display:block;margin-top:6px;line-height:1.5;color:var(--ink-soft)">' + c[1] + '</span></span></li>';
      }).join('') + '</ol></div></section>' +
      '<article class="sec wrap g"><div class="read">' + secHead('How we work') + '<div class="prose" style="margin-top:24px"><p>Facts come from manufacturers, museums and published sources. Image sources are documented on every page and in the image credits. If you spot a mistake, tell us and we will correct it.</p></div></div></article>' +
      '<section class="sec wrap g"><div class="read" style="display:flex;flex-direction:column;gap:16px">' + secHead('Contact') + '<p class="serif" style="font-size:var(--t32);line-height:1.1;user-select:all">hello@[domain]</p><p class="muted" style="line-height:1.5">Corrections, image permissions and suggestions are welcome.</p></div></section>' + footer();
  };

  views.notfound = function () {
    return '<section class="wrap g" style="padding-top:64px"><div class="read" style="display:flex;flex-direction:column;gap:24px;align-items:flex-start"><div class="label muted">Not found</div><h1 data-reveal-01="words" class="serif" style="font-size:var(--t48);line-height:1;letter-spacing:-.02em;text-wrap:balance">This page has moved or never existed.</h1><p class="muted" style="line-height:1.6">Try the collection or search for a designer.</p><div style="display:flex;gap:8px;flex-wrap:wrap">' + link('collection:lighting', pillContent('Open Collection'), 'button-02') + link('home', 'Go Home', 'btn sq') + '</div></div></section>' + footer();
  };
  views.page = function (which) {
    var titles = { imprint: 'Imprint', privacy: 'Privacy', credits: 'Credits' };
    var body = which === 'credits'
      ? '<p>Product and archive photographs are credited to their source pages below and alongside the objects. Displayed studio images have AI-edited backgrounds and lighting; original source photographs are retained in the archive. Source links document provenance; they do not imply permission or a licence. Preview image rights are recorded in the photo manifest.</p><div class="credits">' + creditsFor(OBJECTS).map(function (line) { return '<div>' + line + '</div>'; }).join('') + '</div>'
      : '<p>[' + titles[which] + ' text to be added before launch.]</p>';
    return '<section class="wrap g" style="padding-top:48px"><div class="read" style="display:flex;flex-direction:column;gap:24px"><h1 data-reveal-01="words" class="page-title">' + titles[which] + '</h1><div class="prose">' + body + '</div></div></section>' + footer();
  };

  function titleFor(parts) {
    var p = parts[0], id = parts[1];
    if (p === 'object' && oBySlug[id]) return oBySlug[id].name + (dFull(oBySlug[id]) ? ' by ' + dFull(oBySlug[id]) : '');
    if (p === 'story' && sBySlug[id]) return sBySlug[id].title;
    if (p === 'designer' && dById[id] && dById[id].page) return dById[id].name;
    if (p === 'collection') return deptOf(id || state.dept).label;
    if (p === 'page') return ({ imprint: 'Imprint', privacy: 'Privacy', credits: 'Credits' })[id] || '';
    return ({ stories: 'Stories', designers: 'Designers', about: 'About', notfound: 'Not found' })[p] || '';
  }
  globalThis.Forme = { views, state, pathFor, routeFor, titleFor, wireImages, setPhotoMode,
    FILTERS, passes, optsFor, esc, link, dFull, deptOf, visual,
    plateBg, designerRows };
})();
