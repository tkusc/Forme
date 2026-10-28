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
  },
  "snoopy": {
    "src": "/photos/studio/snoopy.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/snoopy/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Snoopy-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/snoopy.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/snoopy.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/snoopy.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/snoopy.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/snoopy.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/snoopy/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Snoopy-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/snoopy.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/snoopy.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/snoopy.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/snoopy.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "gatto": {
    "src": "/photos/studio/gatto.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/gatto/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Gatto-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/gatto.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/gatto.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/gatto.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/gatto.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/gatto.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/gatto/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Gatto-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/gatto.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/gatto.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/gatto.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/gatto.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "viscontea": {
    "src": "/photos/studio/viscontea.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/viscontea/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Viscontea-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/viscontea.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/viscontea.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/viscontea.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/viscontea.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/viscontea.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/viscontea/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Viscontea-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/viscontea.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/viscontea.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/viscontea.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/viscontea.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "taraxacum": {
    "src": "/photos/studio/taraxacum.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/taraxacum/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Taraxacum-S-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/taraxacum.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/taraxacum.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/taraxacum.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/taraxacum.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/taraxacum.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/taraxacum/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Taraxacum-S-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/taraxacum.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/taraxacum.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/taraxacum.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/taraxacum.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "toio": {
    "src": "/photos/studio/toio.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/toio/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Toio-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/toio.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/toio.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/toio.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/toio.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/toio.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/toio/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Toio-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/toio.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/toio.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/toio.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/toio.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "parentesi": {
    "src": "/photos/studio/parentesi.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/parentesi/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Parentesi-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/parentesi.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/parentesi.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/parentesi.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/parentesi.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/parentesi.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/parentesi/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Parentesi-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/parentesi.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/parentesi.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/parentesi.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/parentesi.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "lampadina": {
    "src": "/photos/studio/lampadina.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/lampadina/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Lampadina-Flos-Decorative-Thubnail-life_over_grey_I.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/lampadina.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/lampadina.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/lampadina.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/lampadina.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/lampadina.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/lampadina/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Lampadina-Flos-Decorative-Thubnail-life_over_grey_I.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/lampadina.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/lampadina.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/lampadina.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/lampadina.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "2097": {
    "src": "/photos/studio/2097.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/2097/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-2097-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/2097.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/2097.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/2097.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/2097.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/2097.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/2097/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-2097-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/2097.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/2097.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/2097.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/2097.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "biagio": {
    "src": "/photos/studio/biagio.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/biagio/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Biagio-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/biagio.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/biagio.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/biagio.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/biagio.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/biagio.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/biagio/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Biagio-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/biagio.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/biagio.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/biagio.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/biagio.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "chiara": {
    "src": "/photos/studio/chiara.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/chiara/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Chiara-Table-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/chiara.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/chiara.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/chiara.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/chiara.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/chiara.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/chiara/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Chiara-Table-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/chiara.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/chiara.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/chiara.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/chiara.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "glo-ball": {
    "src": "/photos/studio/glo-ball.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/glo-ball/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Glo-Ball-CW-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/glo-ball.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/glo-ball.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/glo-ball.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/glo-ball.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/glo-ball.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/glo-ball/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Glo-Ball-CW-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/glo-ball.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/glo-ball.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/glo-ball.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/glo-ball.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "mayday": {
    "src": "/photos/studio/mayday.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/mayday/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-May-day-Flos-Outdoor-Thubnail-life_over_grey_I.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/mayday.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/mayday.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/mayday.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/mayday.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/mayday.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/mayday/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-May-day-Flos-Outdoor-Thubnail-life_over_grey_I.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/mayday.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/mayday.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/mayday.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/mayday.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "spun-light": {
    "src": "/photos/studio/spun-light.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/spun-light/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Spun-Light-Table-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/spun-light.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/spun-light.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/spun-light.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/spun-light.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/spun-light.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/spun-light/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Spun-Light-Table-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/spun-light.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/spun-light.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/spun-light.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/spun-light.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "ic-lights": {
    "src": "/photos/studio/ic-lights.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/ic-lights/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-IC-Lights-Wall-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/ic-lights.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/ic-lights.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/ic-lights.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/ic-lights.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/ic-lights.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/ic-lights/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-IC-Lights-Wall-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/ic-lights.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/ic-lights.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/ic-lights.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/ic-lights.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "aim": {
    "src": "/photos/studio/aim.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/aim/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Aim-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/aim.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/aim.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/aim.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/aim.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/aim.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/aim/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Aim-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/aim.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/aim.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/aim.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/aim.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "coordinates": {
    "src": "/photos/studio/coordinates.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/coordinates/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Coordinates-Wall-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/coordinates.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/coordinates.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/coordinates.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/coordinates.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/coordinates.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/coordinates/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Coordinates-Wall-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/coordinates.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/coordinates.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/coordinates.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/coordinates.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "bellhop": {
    "src": "/photos/studio/bellhop.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/bellhop/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Bellhop-Table-Glass-Flos-Decorative-Thubnail-life_over_grey_I.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/bellhop.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/bellhop.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/bellhop.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/bellhop.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/bellhop.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/bellhop/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Bellhop-Table-Glass-Flos-Decorative-Thubnail-life_over_grey_I.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/bellhop.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/bellhop.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/bellhop.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/bellhop.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "arrangements": {
    "src": "/photos/studio/arrangements.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/arrangements/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Arrangements-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/arrangements.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/arrangements.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/arrangements.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/arrangements.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/arrangements.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/arrangements/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Arrangements-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/arrangements.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/arrangements.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/arrangements.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/arrangements.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "ariette": {
    "src": "/photos/studio/ariette.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/ariette/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Ariette-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/ariette.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/ariette.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/ariette.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/ariette.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/ariette.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/ariette/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Ariette-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/ariette.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/ariette.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/ariette.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/ariette.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "tatou": {
    "src": "/photos/studio/tatou.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/tatou/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Tatou-Table-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/tatou.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/tatou.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/tatou.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/tatou.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/tatou.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/tatou/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Tatou-Table-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/tatou.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/tatou.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/tatou.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tatou.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "tight-light": {
    "src": "/photos/studio/tight-light.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/tight-light/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Tight-Light-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/tight-light.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/tight-light.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/tight-light.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/tight-light.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/tight-light.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/tight-light/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Tight-Light-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/tight-light.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/tight-light.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/tight-light.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tight-light.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "tab": {
    "src": "/photos/studio/tab.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/tab/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Tab-Table-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/tab.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/tab.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/tab.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/tab.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/tab.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/tab/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Tab-Table-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/tab.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/tab.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/tab.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tab.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "smithfield": {
    "src": "/photos/studio/smithfield.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/smithfield/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Smithfield-C-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/smithfield.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/smithfield.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/smithfield.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/smithfield.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/smithfield.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/smithfield/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Smithfield-C-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/smithfield.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/smithfield.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/smithfield.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/smithfield.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "wan": {
    "src": "/photos/studio/wan.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/wan/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Wan-Ceiling-Wall-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/wan.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/wan.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/wan.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/wan.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/wan.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/wan/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Wan-Ceiling-Wall-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/wan.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/wan.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/wan.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/wan.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "pochette": {
    "src": "/photos/studio/pochette.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/pochette/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Pochette-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/pochette.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/pochette.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/pochette.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/pochette.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/pochette.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/pochette/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Pochette-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/pochette.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/pochette.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/pochette.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/pochette.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "stylos": {
    "src": "/photos/studio/stylos.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/stylos/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Stylos-Flos-Decorative-Thubnail-life_over_grey_I.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/stylos.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/stylos.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/stylos.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/stylos.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/stylos.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/stylos/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Stylos-Flos-Decorative-Thubnail-life_over_grey_I.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/stylos.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/stylos.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/stylos.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/stylos.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "wirering": {
    "src": "/photos/studio/wirering.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/wirering/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Wirering-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/wirering.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/wirering.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/wirering.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/wirering.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/wirering.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/wirering/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Wirering-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/wirering.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/wirering.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/wirering.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/wirering.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "superloon": {
    "src": "/photos/studio/superloon.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/superloon/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Superloon-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/superloon.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/superloon.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/superloon.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/superloon.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/superloon.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/superloon/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Superloon-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/superloon.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/superloon.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/superloon.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/superloon.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "ok": {
    "src": "/photos/studio/ok.jpg",
    "source": "Flos product reference",
    "page": "https://professional.flos.com/en/global/family/ok/",
    "original": "https://flos-assets.imgix.net/P_Sf_A-Ok-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
    "originalSrc": "/photos/originals/ok.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/ok.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/ok.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/ok.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/ok.jpg",
        "source": "Flos product reference",
        "page": "https://professional.flos.com/en/global/family/ok/",
        "original": "https://flos-assets.imgix.net/P_Sf_A-Ok-Flos-Decorative-Thubnail-life_over_grey.jpg?w=1600&fit=max&fm=jpg",
        "originalSrc": "/photos/originals/ok.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/ok.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/ok.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/ok.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "pendant-light-a330s-golden-bell": {
    "src": "/photos/studio/pendant-light-a330s-golden-bell.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/pendant-light-a330s-golden-bell/",
    "original": "https://res.cloudinary.com/artek/image/upload/s--OFlHzeVG--/f_jpg,w_1600,c_limit/v1729603088/products/pendant-light-a330s-golden-bell/A330S_Golden_Bell_pendant_light_brass-5536671.jpg",
    "originalSrc": "/photos/originals/pendant-light-a330s-golden-bell.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/pendant-light-a330s-golden-bell.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/pendant-light-a330s-golden-bell.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/pendant-light-a330s-golden-bell.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/pendant-light-a330s-golden-bell.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/pendant-light-a330s-golden-bell/",
        "original": "https://res.cloudinary.com/artek/image/upload/s--OFlHzeVG--/f_jpg,w_1600,c_limit/v1729603088/products/pendant-light-a330s-golden-bell/A330S_Golden_Bell_pendant_light_brass-5536671.jpg",
        "originalSrc": "/photos/originals/pendant-light-a330s-golden-bell.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/pendant-light-a330s-golden-bell.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/pendant-light-a330s-golden-bell.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/pendant-light-a330s-golden-bell.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "pendant-light-a331-beehive": {
    "src": "/photos/studio/pendant-light-a331-beehive.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/pendant-light-a331-beehive/",
    "original": "https://res.cloudinary.com/artek/image/upload/s--AxvoiUZu--/f_jpg,w_1600,c_limit/v1729603165/products/pendant-light-a331-beehive/A331_Beehive_pendant_light_white_brass-5537172.jpg",
    "originalSrc": "/photos/originals/pendant-light-a331-beehive.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/pendant-light-a331-beehive.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/pendant-light-a331-beehive.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/pendant-light-a331-beehive.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/pendant-light-a331-beehive.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/pendant-light-a331-beehive/",
        "original": "https://res.cloudinary.com/artek/image/upload/s--AxvoiUZu--/f_jpg,w_1600,c_limit/v1729603165/products/pendant-light-a331-beehive/A331_Beehive_pendant_light_white_brass-5537172.jpg",
        "originalSrc": "/photos/originals/pendant-light-a331-beehive.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/pendant-light-a331-beehive.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/pendant-light-a331-beehive.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/pendant-light-a331-beehive.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "pendant-light-a110-hand-grenade": {
    "src": "/photos/studio/pendant-light-a110-hand-grenade.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/pendant-light-a110-hand-grenade/",
    "original": "https://res.cloudinary.com/artek/image/upload/s--8G6VCbr8--/f_jpg,w_1600,c_limit/v1777298217/products/pendant-light-a110-hand-grenade/A110_Hand_grenade_Pendant_light_white_brass-5516550.jpg",
    "originalSrc": "/photos/originals/pendant-light-a110-hand-grenade.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/pendant-light-a110-hand-grenade.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/pendant-light-a110-hand-grenade.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/pendant-light-a110-hand-grenade.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/pendant-light-a110-hand-grenade.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/pendant-light-a110-hand-grenade/",
        "original": "https://res.cloudinary.com/artek/image/upload/s--8G6VCbr8--/f_jpg,w_1600,c_limit/v1777298217/products/pendant-light-a110-hand-grenade/A110_Hand_grenade_Pendant_light_white_brass-5516550.jpg",
        "originalSrc": "/photos/originals/pendant-light-a110-hand-grenade.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/pendant-light-a110-hand-grenade.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/pendant-light-a110-hand-grenade.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/pendant-light-a110-hand-grenade.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "pendant-light-a333-turnip": {
    "src": "/photos/studio/pendant-light-a333-turnip.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/pendant-light-a333-turnip/",
    "original": "https://res.cloudinary.com/artek/image/upload/s--Pq9XEdOC--/f_jpg,w_1600,c_limit/v1729603203/products/pendant-light-a333-turnip/A333_Turnip_white_brass-5537179.jpg",
    "originalSrc": "/photos/originals/pendant-light-a333-turnip.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/pendant-light-a333-turnip.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/pendant-light-a333-turnip.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/pendant-light-a333-turnip.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/pendant-light-a333-turnip.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/pendant-light-a333-turnip/",
        "original": "https://res.cloudinary.com/artek/image/upload/s--Pq9XEdOC--/f_jpg,w_1600,c_limit/v1729603203/products/pendant-light-a333-turnip/A333_Turnip_white_brass-5537179.jpg",
        "originalSrc": "/photos/originals/pendant-light-a333-turnip.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/pendant-light-a333-turnip.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/pendant-light-a333-turnip.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/pendant-light-a333-turnip.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "floor-light-a805-angel-wing": {
    "src": "/photos/studio/floor-light-a805-angel-wing.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/floor-light-a805-angel-wing/",
    "original": "https://res.cloudinary.com/artek/image/upload/s--OjdY61Dy--/f_jpg,w_1600,c_limit/v1729602174/products/floor-light-a805-angel-wing/Floor-Light-A805-_Angel-Wing_-brass_on_WEB-1977963.jpg",
    "originalSrc": "/photos/originals/floor-light-a805-angel-wing.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/floor-light-a805-angel-wing.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/floor-light-a805-angel-wing.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/floor-light-a805-angel-wing.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/floor-light-a805-angel-wing.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/floor-light-a805-angel-wing/",
        "original": "https://res.cloudinary.com/artek/image/upload/s--OjdY61Dy--/f_jpg,w_1600,c_limit/v1729602174/products/floor-light-a805-angel-wing/Floor-Light-A805-_Angel-Wing_-brass_on_WEB-1977963.jpg",
        "originalSrc": "/photos/originals/floor-light-a805-angel-wing.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/floor-light-a805-angel-wing.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/floor-light-a805-angel-wing.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/floor-light-a805-angel-wing.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "floor-light-a808": {
    "src": "/photos/studio/floor-light-a808.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/floor-light-a808/",
    "original": "https://res.cloudinary.com/artek/image/upload/s--MZLcI3Bd--/f_jpg,w_1600,c_limit/v1729602187/products/floor-light-a808/Floor-Light-A808-brass_WEB-1977964.jpg",
    "originalSrc": "/photos/originals/floor-light-a808.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/floor-light-a808.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/floor-light-a808.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/floor-light-a808.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/floor-light-a808.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/floor-light-a808/",
        "original": "https://res.cloudinary.com/artek/image/upload/s--MZLcI3Bd--/f_jpg,w_1600,c_limit/v1729602187/products/floor-light-a808/Floor-Light-A808-brass_WEB-1977964.jpg",
        "originalSrc": "/photos/originals/floor-light-a808.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/floor-light-a808.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/floor-light-a808.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/floor-light-a808.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "stool-60": {
    "src": "/photos/studio/stool-60.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/stool-60",
    "original": "https://res.cloudinary.com/artek/image/upload/s--D3I6db_e--/f_jpg,w_1600,c_limit/v1729604375/products/stool-60/Stool-60-clear-lacquer_WEB-1977394.jpg",
    "originalSrc": "/photos/originals/stool-60.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/stool-60.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/stool-60.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/stool-60.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/stool-60.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/stool-60",
        "original": "https://res.cloudinary.com/artek/image/upload/s--D3I6db_e--/f_jpg,w_1600,c_limit/v1729604375/products/stool-60/Stool-60-clear-lacquer_WEB-1977394.jpg",
        "originalSrc": "/photos/originals/stool-60.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/stool-60.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/stool-60.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/stool-60.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "karuselli-lounge-chair": {
    "src": "/photos/studio/karuselli-lounge-chair.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/karuselli-lounge-chair",
    "original": "https://res.cloudinary.com/artek/image/upload/s--7di5jidk--/f_jpg,w_1600,c_limit/v1729602479/products/karuselli-lounge-chair/Karuselli-Lounge-Chair-black-leather_WEB-1977277.jpg",
    "originalSrc": "/photos/originals/karuselli-lounge-chair.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/karuselli-lounge-chair.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/karuselli-lounge-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/karuselli-lounge-chair.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/karuselli-lounge-chair.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/karuselli-lounge-chair",
        "original": "https://res.cloudinary.com/artek/image/upload/s--7di5jidk--/f_jpg,w_1600,c_limit/v1729602479/products/karuselli-lounge-chair/Karuselli-Lounge-Chair-black-leather_WEB-1977277.jpg",
        "originalSrc": "/photos/originals/karuselli-lounge-chair.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/karuselli-lounge-chair.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/karuselli-lounge-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/karuselli-lounge-chair.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "armchair-400-tank": {
    "src": "/photos/studio/armchair-400-tank.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/armchair-400-tank",
    "original": "https://res.cloudinary.com/artek/image/upload/s--iDIsq302--/f_jpg,w_1600,c_limit/v1729601514/products/armchair-400-tank/Armchair-400-_Tank_-clear-lacquer-zebra_WEB-1975913.jpg",
    "originalSrc": "/photos/originals/armchair-400-tank.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/armchair-400-tank.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/armchair-400-tank.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/armchair-400-tank.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/armchair-400-tank.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/armchair-400-tank",
        "original": "https://res.cloudinary.com/artek/image/upload/s--iDIsq302--/f_jpg,w_1600,c_limit/v1729601514/products/armchair-400-tank/Armchair-400-_Tank_-clear-lacquer-zebra_WEB-1975913.jpg",
        "originalSrc": "/photos/originals/armchair-400-tank.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/armchair-400-tank.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/armchair-400-tank.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/armchair-400-tank.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "domus-lounge-chair": {
    "src": "/photos/studio/domus-lounge-chair.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/domus-lounge-chair",
    "original": "https://res.cloudinary.com/artek/image/upload/s--F991CHz4--/f_jpg,w_1600,c_limit/v1729602146/products/domus-lounge-chair/Domus-Lounge-Chair-oak-upholstered_WEB-1855920.jpg",
    "originalSrc": "/photos/originals/domus-lounge-chair.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/domus-lounge-chair.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/domus-lounge-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/domus-lounge-chair.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/domus-lounge-chair.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/domus-lounge-chair",
        "original": "https://res.cloudinary.com/artek/image/upload/s--F991CHz4--/f_jpg,w_1600,c_limit/v1729602146/products/domus-lounge-chair/Domus-Lounge-Chair-oak-upholstered_WEB-1855920.jpg",
        "originalSrc": "/photos/originals/domus-lounge-chair.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/domus-lounge-chair.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/domus-lounge-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/domus-lounge-chair.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "domus-chair": {
    "src": "/photos/studio/domus-chair.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/domus-chair",
    "original": "https://res.cloudinary.com/artek/image/upload/s--N4uutMdg--/f_jpg,w_1600,c_limit/v1777297953/products/domus-chair/Domus-Chair-oak-natural-lacquered-upholstered-fabric-Wow-Re-cream-white-6511-leather-piping-Prestige-nougat-cut-out-9719448.jpg",
    "originalSrc": "/photos/originals/domus-chair.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/domus-chair.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/domus-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/domus-chair.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/domus-chair.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/domus-chair",
        "original": "https://res.cloudinary.com/artek/image/upload/s--N4uutMdg--/f_jpg,w_1600,c_limit/v1777297953/products/domus-chair/Domus-Chair-oak-natural-lacquered-upholstered-fabric-Wow-Re-cream-white-6511-leather-piping-Prestige-nougat-cut-out-9719448.jpg",
        "originalSrc": "/photos/originals/domus-chair.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/domus-chair.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/domus-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/domus-chair.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "tea-trolley-901": {
    "src": "/photos/studio/tea-trolley-901.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/tea-trolley-901",
    "original": "https://res.cloudinary.com/artek/image/upload/s--FQP-753o--/f_jpg,w_1600,c_limit/v1729604554/products/tea-trolley-901/Tea-Trolley-901-black-laquered-dark-version-by-Hella-Jongerius_WEB-1843756.jpg",
    "originalSrc": "/photos/originals/tea-trolley-901.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/tea-trolley-901.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/tea-trolley-901.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/tea-trolley-901.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/tea-trolley-901.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/tea-trolley-901",
        "original": "https://res.cloudinary.com/artek/image/upload/s--FQP-753o--/f_jpg,w_1600,c_limit/v1729604554/products/tea-trolley-901/Tea-Trolley-901-black-laquered-dark-version-by-Hella-Jongerius_WEB-1843756.jpg",
        "originalSrc": "/photos/originals/tea-trolley-901.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/tea-trolley-901.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/tea-trolley-901.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tea-trolley-901.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "clothes-tree-160": {
    "src": "/photos/studio/clothes-tree-160.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/clothes-tree-160",
    "original": "https://res.cloudinary.com/artek/image/upload/s--_LC2qXyZ--/f_jpg,w_1600,c_limit/v1729602038/products/clothes-tree-160/Clothes-tree-160-black-lacquer_WEB-1843185.jpg",
    "originalSrc": "/photos/originals/clothes-tree-160.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/clothes-tree-160.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/clothes-tree-160.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/clothes-tree-160.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/clothes-tree-160.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/clothes-tree-160",
        "original": "https://res.cloudinary.com/artek/image/upload/s--_LC2qXyZ--/f_jpg,w_1600,c_limit/v1729602038/products/clothes-tree-160/Clothes-tree-160-black-lacquer_WEB-1843185.jpg",
        "originalSrc": "/photos/originals/clothes-tree-160.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/clothes-tree-160.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/clothes-tree-160.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/clothes-tree-160.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "tea-trolley-900": {
    "src": "/photos/studio/tea-trolley-900.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/tea-trolley-900",
    "original": "https://res.cloudinary.com/artek/image/upload/s--GwvR2BXI--/f_jpg,w_1600,c_limit/v1729604540/products/tea-trolley-900/Tea-Trolley-900-white-tiles_WEB-1975961.jpg",
    "originalSrc": "/photos/originals/tea-trolley-900.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/tea-trolley-900.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/tea-trolley-900.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/tea-trolley-900.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/tea-trolley-900.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/tea-trolley-900",
        "original": "https://res.cloudinary.com/artek/image/upload/s--GwvR2BXI--/f_jpg,w_1600,c_limit/v1729604540/products/tea-trolley-900/Tea-Trolley-900-white-tiles_WEB-1975961.jpg",
        "originalSrc": "/photos/originals/tea-trolley-900.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/tea-trolley-900.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/tea-trolley-900.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tea-trolley-900.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "armchair-402": {
    "src": "/photos/studio/armchair-402.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/armchair-402",
    "original": "https://res.cloudinary.com/artek/image/upload/s--pjbe7BtK--/f_jpg,w_1600,c_limit/v1729601563/products/armchair-402/Armchair-402_birch-honey-stain_seat-fabric-upholstery-Artek-grey-2494508.jpg",
    "originalSrc": "/photos/originals/armchair-402.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/armchair-402.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/armchair-402.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/armchair-402.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/armchair-402.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/armchair-402",
        "original": "https://res.cloudinary.com/artek/image/upload/s--pjbe7BtK--/f_jpg,w_1600,c_limit/v1729601563/products/armchair-402/Armchair-402_birch-honey-stain_seat-fabric-upholstery-Artek-grey-2494508.jpg",
        "originalSrc": "/photos/originals/armchair-402.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/armchair-402.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/armchair-402.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/armchair-402.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "armchair-406": {
    "src": "/photos/studio/armchair-406.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/armchair-406",
    "original": "https://res.cloudinary.com/artek/image/upload/s--MQ6G153G--/f_jpg,w_1600,c_limit/v1729601597/products/armchair-406/Armchair-406-natural-black-brown-webbing_F-2869203.jpg",
    "originalSrc": "/photos/originals/armchair-406.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/armchair-406.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/armchair-406.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/armchair-406.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/armchair-406.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/armchair-406",
        "original": "https://res.cloudinary.com/artek/image/upload/s--MQ6G153G--/f_jpg,w_1600,c_limit/v1729601597/products/armchair-406/Armchair-406-natural-black-brown-webbing_F-2869203.jpg",
        "originalSrc": "/photos/originals/armchair-406.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/armchair-406.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/armchair-406.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/armchair-406.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "rocket-bar-stool": {
    "src": "/photos/studio/rocket-bar-stool.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/rocket-bar-stool",
    "original": "https://res.cloudinary.com/artek/image/upload/s--19dIakzH--/f_jpg,w_1600,c_limit/v1729603646/products/rocket-bar-stool/Rocket-Bar-Stool-white-lacquer-1847587.jpg",
    "originalSrc": "/photos/originals/rocket-bar-stool.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/rocket-bar-stool.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/rocket-bar-stool.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/rocket-bar-stool.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/rocket-bar-stool.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/rocket-bar-stool",
        "original": "https://res.cloudinary.com/artek/image/upload/s--19dIakzH--/f_jpg,w_1600,c_limit/v1729603646/products/rocket-bar-stool/Rocket-Bar-Stool-white-lacquer-1847587.jpg",
        "originalSrc": "/photos/originals/rocket-bar-stool.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/rocket-bar-stool.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/rocket-bar-stool.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/rocket-bar-stool.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "mademoiselle-lounge-chair": {
    "src": "/photos/studio/mademoiselle-lounge-chair.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/mademoiselle-lounge-chair",
    "original": "https://res.cloudinary.com/artek/image/upload/s--JYAvaZMn--/f_jpg,w_1600,c_limit/v1729602876/products/mademoiselle-lounge-chair/Mademoiselle-Lounge-Chair-black-lacquer_WEB-1977279.jpg",
    "originalSrc": "/photos/originals/mademoiselle-lounge-chair.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/mademoiselle-lounge-chair.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/mademoiselle-lounge-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/mademoiselle-lounge-chair.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/mademoiselle-lounge-chair.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/mademoiselle-lounge-chair",
        "original": "https://res.cloudinary.com/artek/image/upload/s--JYAvaZMn--/f_jpg,w_1600,c_limit/v1729602876/products/mademoiselle-lounge-chair/Mademoiselle-Lounge-Chair-black-lacquer_WEB-1977279.jpg",
        "originalSrc": "/photos/originals/mademoiselle-lounge-chair.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/mademoiselle-lounge-chair.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/mademoiselle-lounge-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/mademoiselle-lounge-chair.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "mademoiselle-rocking-chair": {
    "src": "/photos/studio/mademoiselle-rocking-chair.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/mademoiselle-rocking-chair",
    "original": "https://res.cloudinary.com/artek/image/upload/s--c6LOi_Ym--/f_jpg,w_1600,c_limit/v1729602886/products/mademoiselle-rocking-chair/Mademoiselle-Rocking-Chair-white-lacquer_WEB-1842172.jpg",
    "originalSrc": "/photos/originals/mademoiselle-rocking-chair.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/mademoiselle-rocking-chair.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/mademoiselle-rocking-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/mademoiselle-rocking-chair.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/mademoiselle-rocking-chair.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/mademoiselle-rocking-chair",
        "original": "https://res.cloudinary.com/artek/image/upload/s--c6LOi_Ym--/f_jpg,w_1600,c_limit/v1729602886/products/mademoiselle-rocking-chair/Mademoiselle-Rocking-Chair-white-lacquer_WEB-1842172.jpg",
        "originalSrc": "/photos/originals/mademoiselle-rocking-chair.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/mademoiselle-rocking-chair.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/mademoiselle-rocking-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/mademoiselle-rocking-chair.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "chair-66": {
    "src": "/photos/studio/chair-66.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/chair-66",
    "original": "https://res.cloudinary.com/artek/image/upload/s--JQ6Ky2Hw--/f_jpg,w_1600,c_limit/v1729601962/products/chair-66/Chair-66-white-laminate_WEB-1975921.jpg",
    "originalSrc": "/photos/originals/chair-66.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/chair-66.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/chair-66.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/chair-66.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/chair-66.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/chair-66",
        "original": "https://res.cloudinary.com/artek/image/upload/s--JQ6Ky2Hw--/f_jpg,w_1600,c_limit/v1729601962/products/chair-66/Chair-66-white-laminate_WEB-1975921.jpg",
        "originalSrc": "/photos/originals/chair-66.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/chair-66.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/chair-66.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/chair-66.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "chair-69": {
    "src": "/photos/studio/chair-69.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/chair-69",
    "original": "https://res.cloudinary.com/artek/image/upload/s--Xolm6OEY--/f_jpg,w_1600,c_limit/v1729602010/products/chair-69/Chair-69-orange-lacquer-seat-1843296.jpg",
    "originalSrc": "/photos/originals/chair-69.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/chair-69.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/chair-69.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/chair-69.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/chair-69.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/chair-69",
        "original": "https://res.cloudinary.com/artek/image/upload/s--Xolm6OEY--/f_jpg,w_1600,c_limit/v1729602010/products/chair-69/Chair-69-orange-lacquer-seat-1843296.jpg",
        "originalSrc": "/photos/originals/chair-69.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/chair-69.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/chair-69.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/chair-69.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "wall-shelf-112": {
    "src": "/photos/studio/wall-shelf-112.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/wall-shelf-112",
    "original": "https://res.cloudinary.com/artek/image/upload/s--FkfayF24--/f_jpg,w_1600,c_limit/v1729604741/products/wall-shelf-112/Wall-Shelf-112B-black-lacquer_WEB-1975907.jpg",
    "originalSrc": "/photos/originals/wall-shelf-112.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/wall-shelf-112.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/wall-shelf-112.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/wall-shelf-112.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/wall-shelf-112.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/wall-shelf-112",
        "original": "https://res.cloudinary.com/artek/image/upload/s--FkfayF24--/f_jpg,w_1600,c_limit/v1729604741/products/wall-shelf-112/Wall-Shelf-112B-black-lacquer_WEB-1975907.jpg",
        "originalSrc": "/photos/originals/wall-shelf-112.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/wall-shelf-112.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/wall-shelf-112.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/wall-shelf-112.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "kaari-desk": {
    "src": "/photos/studio/kaari-desk.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/kaari-desk",
    "original": "https://res.cloudinary.com/artek/image/upload/s--ooqBS4yX--/f_jpg,w_1600,c_limit/v1729602334/products/kaari-desk/Kaari-Desk-REB005-black-oak-black-Linoleum_WEB-1975929.jpg",
    "originalSrc": "/photos/originals/kaari-desk.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/kaari-desk.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/kaari-desk.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/kaari-desk.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/kaari-desk.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/kaari-desk",
        "original": "https://res.cloudinary.com/artek/image/upload/s--ooqBS4yX--/f_jpg,w_1600,c_limit/v1729602334/products/kaari-desk/Kaari-Desk-REB005-black-oak-black-Linoleum_WEB-1975929.jpg",
        "originalSrc": "/photos/originals/kaari-desk.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/kaari-desk.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/kaari-desk.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/kaari-desk.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "kiki-low-table": {
    "src": "/photos/studio/kiki-low-table.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/kiki-low-table",
    "original": "https://res.cloudinary.com/artek/image/upload/s--8dFom802--/f_jpg,w_1600,c_limit/v1729602638/products/kiki-low-table/Kiki-Low-Table-black_WEB-1851895.jpg",
    "originalSrc": "/photos/originals/kiki-low-table.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/kiki-low-table.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/kiki-low-table.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/kiki-low-table.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/kiki-low-table.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/kiki-low-table",
        "original": "https://res.cloudinary.com/artek/image/upload/s--8dFom802--/f_jpg,w_1600,c_limit/v1729602638/products/kiki-low-table/Kiki-Low-Table-black_WEB-1851895.jpg",
        "originalSrc": "/photos/originals/kiki-low-table.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/kiki-low-table.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/kiki-low-table.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/kiki-low-table.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "kiki-bench": {
    "src": "/photos/studio/kiki-bench.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/kiki-bench",
    "original": "https://res.cloudinary.com/artek/image/upload/s--mWsOtYIL--/f_jpg,w_1600,c_limit/v1729602589/products/kiki-bench/Kiki-Bench-2-Seater-yellow-upholstery_WEB-1975937.jpg",
    "originalSrc": "/photos/originals/kiki-bench.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/kiki-bench.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/kiki-bench.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/kiki-bench.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/kiki-bench.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/kiki-bench",
        "original": "https://res.cloudinary.com/artek/image/upload/s--mWsOtYIL--/f_jpg,w_1600,c_limit/v1729602589/products/kiki-bench/Kiki-Bench-2-Seater-yellow-upholstery_WEB-1975937.jpg",
        "originalSrc": "/photos/originals/kiki-bench.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/kiki-bench.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/kiki-bench.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/kiki-bench.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "kiki-sofa": {
    "src": "/photos/studio/kiki-sofa.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/kiki-sofa",
    "original": "https://res.cloudinary.com/artek/image/upload/s--6W2AlAgP--/f_jpg,w_1600,c_limit/v1729602656/products/kiki-sofa/Kiki_Sofa_3_Seater-5234595.jpg",
    "originalSrc": "/photos/originals/kiki-sofa.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/kiki-sofa.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/kiki-sofa.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/kiki-sofa.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/kiki-sofa.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/kiki-sofa",
        "original": "https://res.cloudinary.com/artek/image/upload/s--6W2AlAgP--/f_jpg,w_1600,c_limit/v1729602656/products/kiki-sofa/Kiki_Sofa_3_Seater-5234595.jpg",
        "originalSrc": "/photos/originals/kiki-sofa.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/kiki-sofa.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/kiki-sofa.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/kiki-sofa.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "kiki-lounge-chair": {
    "src": "/photos/studio/kiki-lounge-chair.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/kiki-lounge-chair",
    "original": "https://res.cloudinary.com/artek/image/upload/s--X_H3AGR6--/f_jpg,w_1600,c_limit/v1729602606/products/kiki-lounge-chair/Kiki_Lounge_Chair-5234613.jpg",
    "originalSrc": "/photos/originals/kiki-lounge-chair.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/kiki-lounge-chair.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/kiki-lounge-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/kiki-lounge-chair.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/kiki-lounge-chair.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/kiki-lounge-chair",
        "original": "https://res.cloudinary.com/artek/image/upload/s--X_H3AGR6--/f_jpg,w_1600,c_limit/v1729602606/products/kiki-lounge-chair/Kiki_Lounge_Chair-5234613.jpg",
        "originalSrc": "/photos/originals/kiki-lounge-chair.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/kiki-lounge-chair.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/kiki-lounge-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/kiki-lounge-chair.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "armchair-401": {
    "src": "/photos/studio/armchair-401.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/armchair-401",
    "original": "https://res.cloudinary.com/artek/image/upload/s--zvHu-P2n--/f_jpg,w_1600,c_limit/v1729601541/products/armchair-401/Armchair-401-HJ-clear-lacquer-1843424.jpg",
    "originalSrc": "/photos/originals/armchair-401.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/armchair-401.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/armchair-401.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/armchair-401.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/armchair-401.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/armchair-401",
        "original": "https://res.cloudinary.com/artek/image/upload/s--zvHu-P2n--/f_jpg,w_1600,c_limit/v1729601541/products/armchair-401/Armchair-401-HJ-clear-lacquer-1843424.jpg",
        "originalSrc": "/photos/originals/armchair-401.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/armchair-401.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/armchair-401.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/armchair-401.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "bench-153a": {
    "src": "/photos/studio/bench-153a.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/bench-153a",
    "original": "https://res.cloudinary.com/artek/image/upload/s--a0ys9Vhy--/f_jpg,w_1600,c_limit/v1729601852/products/bench-153a/Bench-153A-slatted-top-wild-birch-natural-lacquered-2-cut-out-8906012.jpg",
    "originalSrc": "/photos/originals/bench-153a.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/bench-153a.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/bench-153a.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/bench-153a.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/bench-153a.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/bench-153a",
        "original": "https://res.cloudinary.com/artek/image/upload/s--a0ys9Vhy--/f_jpg,w_1600,c_limit/v1729601852/products/bench-153a/Bench-153A-slatted-top-wild-birch-natural-lacquered-2-cut-out-8906012.jpg",
        "originalSrc": "/photos/originals/bench-153a.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/bench-153a.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/bench-153a.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/bench-153a.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "bar-stool-64": {
    "src": "/photos/studio/bar-stool-64.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/bar-stool-64",
    "original": "https://res.cloudinary.com/artek/image/upload/s--65WDQdbz--/f_jpg,w_1600,c_limit/v1729601819/products/bar-stool-64/Bar-Stool-64-black-lacquer_cut_out_WEB-1974338.jpg",
    "originalSrc": "/photos/originals/bar-stool-64.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/bar-stool-64.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/bar-stool-64.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/bar-stool-64.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/bar-stool-64.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/bar-stool-64",
        "original": "https://res.cloudinary.com/artek/image/upload/s--65WDQdbz--/f_jpg,w_1600,c_limit/v1729601819/products/bar-stool-64/Bar-Stool-64-black-lacquer_cut_out_WEB-1974338.jpg",
        "originalSrc": "/photos/originals/bar-stool-64.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/bar-stool-64.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/bar-stool-64.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/bar-stool-64.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "chair-65": {
    "src": "/photos/studio/chair-65.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/chair-65",
    "original": "https://res.cloudinary.com/artek/image/upload/s--KaRxJP-Z--/f_jpg,w_1600,c_limit/v1729601942/products/chair-65/Chair-65-white-lacquer-1903724.jpg",
    "originalSrc": "/photos/originals/chair-65.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/chair-65.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/chair-65.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/chair-65.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/chair-65.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/chair-65",
        "original": "https://res.cloudinary.com/artek/image/upload/s--KaRxJP-Z--/f_jpg,w_1600,c_limit/v1729601942/products/chair-65/Chair-65-white-lacquer-1903724.jpg",
        "originalSrc": "/photos/originals/chair-65.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/chair-65.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/chair-65.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/chair-65.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "chair-68": {
    "src": "/photos/studio/chair-68.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/chair-68",
    "original": "https://res.cloudinary.com/artek/image/upload/s--YhHSHyaA--/f_jpg,w_1600,c_limit/v1729601973/products/chair-68/Chair-68-black-lacquer_WEB-1977267.jpg",
    "originalSrc": "/photos/originals/chair-68.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/chair-68.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/chair-68.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/chair-68.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/chair-68.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/chair-68",
        "original": "https://res.cloudinary.com/artek/image/upload/s--YhHSHyaA--/f_jpg,w_1600,c_limit/v1729601973/products/chair-68/Chair-68-black-lacquer_WEB-1977267.jpg",
        "originalSrc": "/photos/originals/chair-68.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/chair-68.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/chair-68.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/chair-68.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "chair-611": {
    "src": "/photos/studio/chair-611.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/chair-611",
    "original": "https://res.cloudinary.com/artek/image/upload/s--eM8zIuib--/f_jpg,w_1600,c_limit/v1729601931/products/chair-611/Chair-611-clear-lacquered-birchnatural-red-new-webbing_F-2436468.jpg",
    "originalSrc": "/photos/originals/chair-611.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/chair-611.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/chair-611.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/chair-611.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/chair-611.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/chair-611",
        "original": "https://res.cloudinary.com/artek/image/upload/s--eM8zIuib--/f_jpg,w_1600,c_limit/v1729601931/products/chair-611/Chair-611-clear-lacquered-birchnatural-red-new-webbing_F-2436468.jpg",
        "originalSrc": "/photos/originals/chair-611.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/chair-611.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/chair-611.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/chair-611.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "lukki-chair": {
    "src": "/photos/studio/lukki-chair.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/lukki-chair",
    "original": "https://res.cloudinary.com/artek/image/upload/s--6I-vDV3j--/f_jpg,w_1600,c_limit/v1729602861/products/lukki-chair/Lukki-Chair-black-lacquer_WEB-1848536.jpg",
    "originalSrc": "/photos/originals/lukki-chair.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/lukki-chair.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/lukki-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/lukki-chair.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/lukki-chair.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/lukki-chair",
        "original": "https://res.cloudinary.com/artek/image/upload/s--6I-vDV3j--/f_jpg,w_1600,c_limit/v1729602861/products/lukki-chair/Lukki-Chair-black-lacquer_WEB-1848536.jpg",
        "originalSrc": "/photos/originals/lukki-chair.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/lukki-chair.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/lukki-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/lukki-chair.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "rival-chair": {
    "src": "/photos/studio/rival-chair.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/rival-chair",
    "original": "https://res.cloudinary.com/artek/image/upload/s--ma3_lHIx--/f_jpg,w_1600,c_limit/v1729603506/products/rival-chair-kg002/Rival-Chair-KG002-clear-lacquer-front_WEB-1975953.jpg",
    "originalSrc": "/photos/originals/rival-chair.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/rival-chair.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/rival-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/rival-chair.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/rival-chair.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/rival-chair",
        "original": "https://res.cloudinary.com/artek/image/upload/s--ma3_lHIx--/f_jpg,w_1600,c_limit/v1729603506/products/rival-chair-kg002/Rival-Chair-KG002-clear-lacquer-front_WEB-1975953.jpg",
        "originalSrc": "/photos/originals/rival-chair.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/rival-chair.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/rival-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/rival-chair.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "armchair-42": {
    "src": "/photos/studio/armchair-42.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/armchair-42",
    "original": "https://res.cloudinary.com/artek/image/upload/s--Z1fPxVpk--/f_jpg,w_1600,c_limit/v1729601616/products/armchair-42/Armchair-42-black-lacquer_WEB-1975912.jpg",
    "originalSrc": "/photos/originals/armchair-42.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/armchair-42.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/armchair-42.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/armchair-42.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/armchair-42.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/armchair-42",
        "original": "https://res.cloudinary.com/artek/image/upload/s--Z1fPxVpk--/f_jpg,w_1600,c_limit/v1729601616/products/armchair-42/Armchair-42-black-lacquer_WEB-1975912.jpg",
        "originalSrc": "/photos/originals/armchair-42.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/armchair-42.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/armchair-42.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/armchair-42.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "lounge-chair-43": {
    "src": "/photos/studio/lounge-chair-43.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/lounge-chair-43",
    "original": "https://res.cloudinary.com/artek/image/upload/s--8ovzu9Ax--/f_jpg,w_1600,c_limit/v1729602823/products/lounge-chair-43/Lounge-Chair-43-natural-natural-black-webbing_F-2897180.jpg",
    "originalSrc": "/photos/originals/lounge-chair-43.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/lounge-chair-43.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/lounge-chair-43.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/lounge-chair-43.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/lounge-chair-43.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/lounge-chair-43",
        "original": "https://res.cloudinary.com/artek/image/upload/s--8ovzu9Ax--/f_jpg,w_1600,c_limit/v1729602823/products/lounge-chair-43/Lounge-Chair-43-natural-natural-black-webbing_F-2897180.jpg",
        "originalSrc": "/photos/originals/lounge-chair-43.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/lounge-chair-43.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/lounge-chair-43.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/lounge-chair-43.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "day-bed-710": {
    "src": "/photos/studio/day-bed-710.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/day-bed-710",
    "original": "https://res.cloudinary.com/artek/image/upload/s--PzEPaBCt--/f_jpg,w_1600,c_limit/v1729602066/products/day-bed-710/Day-Bed-710-Hallingdal65_750_blue-2494530.jpg",
    "originalSrc": "/photos/originals/day-bed-710.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/day-bed-710.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/day-bed-710.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/day-bed-710.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/day-bed-710.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/day-bed-710",
        "original": "https://res.cloudinary.com/artek/image/upload/s--PzEPaBCt--/f_jpg,w_1600,c_limit/v1729602066/products/day-bed-710/Day-Bed-710-Hallingdal65_750_blue-2494530.jpg",
        "originalSrc": "/photos/originals/day-bed-710.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/day-bed-710.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/day-bed-710.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/day-bed-710.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "side-table-606": {
    "src": "/photos/studio/side-table-606.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/side-table-606",
    "original": "https://res.cloudinary.com/artek/image/upload/s--OxHyfZDx--/f_jpg,w_1600,c_limit/v1729603726/products/side-table-606/Side-Table-606_WEB-1834701.jpg",
    "originalSrc": "/photos/originals/side-table-606.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/side-table-606.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/side-table-606.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/side-table-606.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/side-table-606.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/side-table-606",
        "original": "https://res.cloudinary.com/artek/image/upload/s--OxHyfZDx--/f_jpg,w_1600,c_limit/v1729603726/products/side-table-606/Side-Table-606_WEB-1834701.jpg",
        "originalSrc": "/photos/originals/side-table-606.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/side-table-606.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/side-table-606.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/side-table-606.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "trienna-table": {
    "src": "/photos/studio/trienna-table.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/trienna-table",
    "original": "https://res.cloudinary.com/artek/image/upload/s--Oscoo3O_--/f_jpg,w_1600,c_limit/v1729604617/products/trienna-table/Trienna-Table-oak_WEB-1975963.jpg",
    "originalSrc": "/photos/originals/trienna-table.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/trienna-table.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/trienna-table.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/trienna-table.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/trienna-table.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/trienna-table",
        "original": "https://res.cloudinary.com/artek/image/upload/s--Oscoo3O_--/f_jpg,w_1600,c_limit/v1729604617/products/trienna-table/Trienna-Table-oak_WEB-1975963.jpg",
        "originalSrc": "/photos/originals/trienna-table.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/trienna-table.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/trienna-table.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/trienna-table.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "rope-chair": {
    "src": "/photos/studio/rope-chair.jpg",
    "source": "Artek product reference",
    "page": "https://www.artek.fi/en/products/rope-chair",
    "original": "https://res.cloudinary.com/artek/image/upload/s--zLJz9OCF--/f_jpg,w_1600,c_limit/v1729603694/products/rope-chair/Rope-Chair-light-grey-F-3244048.jpg",
    "originalSrc": "/photos/originals/rope-chair.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/rope-chair.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/rope-chair.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/rope-chair.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/rope-chair.jpg",
        "source": "Artek product reference",
        "page": "https://www.artek.fi/en/products/rope-chair",
        "original": "https://res.cloudinary.com/artek/image/upload/s--zLJz9OCF--/f_jpg,w_1600,c_limit/v1729603694/products/rope-chair/Rope-Chair-light-grey-F-3244048.jpg",
        "originalSrc": "/photos/originals/rope-chair.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/rope-chair.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/rope-chair.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/rope-chair.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "9093-kettle": {
    "src": "/photos/studio/9093-kettle.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/9093-kettle",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01-1_9093.jpg",
    "originalSrc": "/photos/originals/9093-kettle.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/9093-kettle.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/9093-kettle.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/9093-kettle.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/9093-kettle.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/9093-kettle",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01-1_9093.jpg",
        "originalSrc": "/photos/originals/9093-kettle.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/9093-kettle.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/9093-kettle.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/9093-kettle.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "9090-espresso-coffee-maker": {
    "src": "/photos/studio/9090-espresso-coffee-maker.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/9090-espresso-coffee-maker",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_9090.jpg",
    "originalSrc": "/photos/originals/9090-espresso-coffee-maker.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/9090-espresso-coffee-maker.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/9090-espresso-coffee-maker.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/9090-espresso-coffee-maker.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/9090-espresso-coffee-maker.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/9090-espresso-coffee-maker",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_9090.jpg",
        "originalSrc": "/photos/originals/9090-espresso-coffee-maker.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/9090-espresso-coffee-maker.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/9090-espresso-coffee-maker.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/9090-espresso-coffee-maker.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "la-conica-espresso-coffee-maker": {
    "src": "/photos/studio/la-conica-espresso-coffee-maker.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/la-conica-espresso-coffee-maker",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_90002.jpg",
    "originalSrc": "/photos/originals/la-conica-espresso-coffee-maker.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/la-conica-espresso-coffee-maker.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/la-conica-espresso-coffee-maker.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/la-conica-espresso-coffee-maker.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/la-conica-espresso-coffee-maker.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/la-conica-espresso-coffee-maker",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_90002.jpg",
        "originalSrc": "/photos/originals/la-conica-espresso-coffee-maker.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/la-conica-espresso-coffee-maker.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/la-conica-espresso-coffee-maker.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/la-conica-espresso-coffee-maker.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "la-cupola-espresso-coffee-maker": {
    "src": "/photos/studio/la-cupola-espresso-coffee-maker.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/la-cupola-espresso-coffee-maker",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/A9095-01.jpg",
    "originalSrc": "/photos/originals/la-cupola-espresso-coffee-maker.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/la-cupola-espresso-coffee-maker.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/la-cupola-espresso-coffee-maker.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/la-cupola-espresso-coffee-maker.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/la-cupola-espresso-coffee-maker.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/la-cupola-espresso-coffee-maker",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/A9095-01.jpg",
        "originalSrc": "/photos/originals/la-cupola-espresso-coffee-maker.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/la-cupola-espresso-coffee-maker.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/la-cupola-espresso-coffee-maker.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/la-cupola-espresso-coffee-maker.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "anna-g-corkscrew": {
    "src": "/photos/studio/anna-g-corkscrew.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/anna-g-corkscrew",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/Z-01-new_AM01_e0ed2846-78f1-42cd-8d3c-a2cba213afcc.jpg",
    "originalSrc": "/photos/originals/anna-g-corkscrew.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/anna-g-corkscrew.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/anna-g-corkscrew.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/anna-g-corkscrew.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/anna-g-corkscrew.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/anna-g-corkscrew",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/Z-01-new_AM01_e0ed2846-78f1-42cd-8d3c-a2cba213afcc.jpg",
        "originalSrc": "/photos/originals/anna-g-corkscrew.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/anna-g-corkscrew.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/anna-g-corkscrew.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/anna-g-corkscrew.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "alessandro-m-corkscrew": {
    "src": "/photos/studio/alessandro-m-corkscrew.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/alessandro-m-corkscrew",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/files/AAM23-044.jpg",
    "originalSrc": "/photos/originals/alessandro-m-corkscrew.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/alessandro-m-corkscrew.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/alessandro-m-corkscrew.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/alessandro-m-corkscrew.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/alessandro-m-corkscrew.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/alessandro-m-corkscrew",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/files/AAM23-044.jpg",
        "originalSrc": "/photos/originals/alessandro-m-corkscrew.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/alessandro-m-corkscrew.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/alessandro-m-corkscrew.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/alessandro-m-corkscrew.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "nuovo-milano-cutlery-set-24-pieces": {
    "src": "/photos/studio/nuovo-milano-cutlery-set-24-pieces.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/nuovo-milano-cutlery-set-24-pieces",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/M-01_5180S24.jpg",
    "originalSrc": "/photos/originals/nuovo-milano-cutlery-set-24-pieces.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/nuovo-milano-cutlery-set-24-pieces.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/nuovo-milano-cutlery-set-24-pieces.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/nuovo-milano-cutlery-set-24-pieces.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/nuovo-milano-cutlery-set-24-pieces.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/nuovo-milano-cutlery-set-24-pieces",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/M-01_5180S24.jpg",
        "originalSrc": "/photos/originals/nuovo-milano-cutlery-set-24-pieces.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/nuovo-milano-cutlery-set-24-pieces.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/nuovo-milano-cutlery-set-24-pieces.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/nuovo-milano-cutlery-set-24-pieces.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "parmenide-grater-with-cheese-cellar": {
    "src": "/photos/studio/parmenide-grater-with-cheese-cellar.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/parmenide-grater-with-cheese-cellar",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/AARU01-06.jpg",
    "originalSrc": "/photos/originals/parmenide-grater-with-cheese-cellar.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/parmenide-grater-with-cheese-cellar.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/parmenide-grater-with-cheese-cellar.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/parmenide-grater-with-cheese-cellar.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/parmenide-grater-with-cheese-cellar.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/parmenide-grater-with-cheese-cellar",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/AARU01-06.jpg",
        "originalSrc": "/photos/originals/parmenide-grater-with-cheese-cellar.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/parmenide-grater-with-cheese-cellar.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/parmenide-grater-with-cheese-cellar.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/parmenide-grater-with-cheese-cellar.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "plisse-electric-kettle-european-plug": {
    "src": "/photos/studio/plisse-electric-kettle-european-plug.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/plisse-electric-kettle-european-plug",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/MDL06-07_c6edaa27-6f45-4d6f-acdc-af54dfa5f374.jpg",
    "originalSrc": "/photos/originals/plisse-electric-kettle-european-plug.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/plisse-electric-kettle-european-plug.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/plisse-electric-kettle-european-plug.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/plisse-electric-kettle-european-plug.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/plisse-electric-kettle-european-plug.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/plisse-electric-kettle-european-plug",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/MDL06-07_c6edaa27-6f45-4d6f-acdc-af54dfa5f374.jpg",
        "originalSrc": "/photos/originals/plisse-electric-kettle-european-plug.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/plisse-electric-kettle-european-plug.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/plisse-electric-kettle-european-plug.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/plisse-electric-kettle-european-plug.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "pulcina-espresso-coffee-maker-1": {
    "src": "/photos/studio/pulcina-espresso-coffee-maker-1.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/pulcina-espresso-coffee-maker-1",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01-1_MDL02.jpg",
    "originalSrc": "/photos/originals/pulcina-espresso-coffee-maker-1.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/pulcina-espresso-coffee-maker-1.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/pulcina-espresso-coffee-maker-1.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/pulcina-espresso-coffee-maker-1.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/pulcina-espresso-coffee-maker-1.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/pulcina-espresso-coffee-maker-1",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01-1_MDL02.jpg",
        "originalSrc": "/photos/originals/pulcina-espresso-coffee-maker-1.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/pulcina-espresso-coffee-maker-1.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/pulcina-espresso-coffee-maker-1.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/pulcina-espresso-coffee-maker-1.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "caffa-travel-mug": {
    "src": "/photos/studio/caffa-travel-mug.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/caffa-travel-mug",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/GIA24-01.jpg",
    "originalSrc": "/photos/originals/caffa-travel-mug.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/caffa-travel-mug.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/caffa-travel-mug.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/caffa-travel-mug.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/caffa-travel-mug.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/caffa-travel-mug",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/GIA24-01.jpg",
        "originalSrc": "/photos/originals/caffa-travel-mug.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/caffa-travel-mug.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/caffa-travel-mug.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/caffa-travel-mug.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "tonale-small-bowl-4-pieces": {
    "src": "/photos/studio/tonale-small-bowl-4-pieces.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/tonale-small-bowl-4-pieces",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/DC03-54-01-LG.jpg",
    "originalSrc": "/photos/originals/tonale-small-bowl-4-pieces.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/tonale-small-bowl-4-pieces.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/tonale-small-bowl-4-pieces.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/tonale-small-bowl-4-pieces.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/tonale-small-bowl-4-pieces.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/tonale-small-bowl-4-pieces",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/DC03-54-01-LG.jpg",
        "originalSrc": "/photos/originals/tonale-small-bowl-4-pieces.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/tonale-small-bowl-4-pieces.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/tonale-small-bowl-4-pieces.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tonale-small-bowl-4-pieces.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "mediterraneo-fruit-holder": {
    "src": "/photos/studio/mediterraneo-fruit-holder.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/mediterraneo-fruit-holder",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/ESI01-01_df2607f6-ce1b-4732-b9cc-908759cdb2b6.jpg",
    "originalSrc": "/photos/originals/mediterraneo-fruit-holder.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/mediterraneo-fruit-holder.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/mediterraneo-fruit-holder.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/mediterraneo-fruit-holder.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/mediterraneo-fruit-holder.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/mediterraneo-fruit-holder",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/ESI01-01_df2607f6-ce1b-4732-b9cc-908759cdb2b6.jpg",
        "originalSrc": "/photos/originals/mediterraneo-fruit-holder.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/mediterraneo-fruit-holder.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/mediterraneo-fruit-holder.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/mediterraneo-fruit-holder.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "trinity-fruit-holder": {
    "src": "/photos/studio/trinity-fruit-holder.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/trinity-fruit-holder",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/Trinity-SL-frontside-1_ACO03.jpg",
    "originalSrc": "/photos/originals/trinity-fruit-holder.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/trinity-fruit-holder.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/trinity-fruit-holder.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/trinity-fruit-holder.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/trinity-fruit-holder.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/trinity-fruit-holder",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/Trinity-SL-frontside-1_ACO03.jpg",
        "originalSrc": "/photos/originals/trinity-fruit-holder.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/trinity-fruit-holder.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/trinity-fruit-holder.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/trinity-fruit-holder.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "bark-centrepiece": {
    "src": "/photos/studio/bark-centrepiece.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/bark-centrepiece",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_BM01.jpg",
    "originalSrc": "/photos/originals/bark-centrepiece.jpg",
    "width": 1121,
    "height": 1403,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/bark-centrepiece.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/bark-centrepiece.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/bark-centrepiece.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/bark-centrepiece.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/bark-centrepiece",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_BM01.jpg",
        "originalSrc": "/photos/originals/bark-centrepiece.jpg",
        "width": 1121,
        "height": 1403,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/bark-centrepiece.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/bark-centrepiece.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/bark-centrepiece.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "blow-up-citrus-basket": {
    "src": "/photos/studio/blow-up-citrus-basket.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/blow-up-citrus-basket",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_FC03_ccb06a53-fd79-49a5-aff6-cfaa84b8f59a.jpg",
    "originalSrc": "/photos/originals/blow-up-citrus-basket.jpg",
    "width": 1121,
    "height": 1403,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/blow-up-citrus-basket.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/blow-up-citrus-basket.jpg",
    "nightWidth": 1121,
    "nightHeight": 1403,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/blow-up-citrus-basket.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/blow-up-citrus-basket.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/blow-up-citrus-basket",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_FC03_ccb06a53-fd79-49a5-aff6-cfaa84b8f59a.jpg",
        "originalSrc": "/photos/originals/blow-up-citrus-basket.jpg",
        "width": 1121,
        "height": 1403,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/blow-up-citrus-basket.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/blow-up-citrus-basket.jpg",
        "nightWidth": 1121,
        "nightHeight": 1403,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/blow-up-citrus-basket.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "la-stanza-dello-scirocco-wall-clock": {
    "src": "/photos/studio/la-stanza-dello-scirocco-wall-clock.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/la-stanza-dello-scirocco-wall-clock",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01-1-1_MT19.jpg",
    "originalSrc": "/photos/originals/la-stanza-dello-scirocco-wall-clock.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/la-stanza-dello-scirocco-wall-clock.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/la-stanza-dello-scirocco-wall-clock.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/la-stanza-dello-scirocco-wall-clock.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/la-stanza-dello-scirocco-wall-clock.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/la-stanza-dello-scirocco-wall-clock",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01-1-1_MT19.jpg",
        "originalSrc": "/photos/originals/la-stanza-dello-scirocco-wall-clock.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/la-stanza-dello-scirocco-wall-clock.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/la-stanza-dello-scirocco-wall-clock.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/la-stanza-dello-scirocco-wall-clock.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "todo-giant-grater": {
    "src": "/photos/studio/todo-giant-grater.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/todo-giant-grater",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01-1_RS08_28a74b53-cb71-4544-ab40-d920e18ed813.jpg",
    "originalSrc": "/photos/originals/todo-giant-grater.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/todo-giant-grater.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/todo-giant-grater.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/todo-giant-grater.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/todo-giant-grater.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/todo-giant-grater",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01-1_RS08_28a74b53-cb71-4544-ab40-d920e18ed813.jpg",
        "originalSrc": "/photos/originals/todo-giant-grater.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/todo-giant-grater.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/todo-giant-grater.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/todo-giant-grater.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "5070-condiment-set": {
    "src": "/photos/studio/5070-condiment-set.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/5070-condiment-set",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_5070.jpg",
    "originalSrc": "/photos/originals/5070-condiment-set.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/5070-condiment-set.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/5070-condiment-set.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/5070-condiment-set.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/5070-condiment-set.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/5070-condiment-set",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_5070.jpg",
        "originalSrc": "/photos/originals/5070-condiment-set.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/5070-condiment-set.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/5070-condiment-set.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/5070-condiment-set.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "5071-parmesan-cheese-cellar": {
    "src": "/photos/studio/5071-parmesan-cheese-cellar.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/5071-parmesan-cheese-cellar",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_5071.jpg",
    "originalSrc": "/photos/originals/5071-parmesan-cheese-cellar.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/5071-parmesan-cheese-cellar.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/5071-parmesan-cheese-cellar.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/5071-parmesan-cheese-cellar.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/5071-parmesan-cheese-cellar.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/5071-parmesan-cheese-cellar",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_5071.jpg",
        "originalSrc": "/photos/originals/5071-parmesan-cheese-cellar.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/5071-parmesan-cheese-cellar.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/5071-parmesan-cheese-cellar.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/5071-parmesan-cheese-cellar.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "9097-sugar-bowl-with-spoon": {
    "src": "/photos/studio/9097-sugar-bowl-with-spoon.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/9097-sugar-bowl-with-spoon",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_9097.jpg",
    "originalSrc": "/photos/originals/9097-sugar-bowl-with-spoon.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/9097-sugar-bowl-with-spoon.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/9097-sugar-bowl-with-spoon.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/9097-sugar-bowl-with-spoon.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/9097-sugar-bowl-with-spoon.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/9097-sugar-bowl-with-spoon",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_9097.jpg",
        "originalSrc": "/photos/originals/9097-sugar-bowl-with-spoon.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/9097-sugar-bowl-with-spoon.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/9097-sugar-bowl-with-spoon.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/9097-sugar-bowl-with-spoon.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "9098-pepper-mill": {
    "src": "/photos/studio/9098-pepper-mill.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/9098-pepper-mill",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_9098.jpg",
    "originalSrc": "/photos/originals/9098-pepper-mill.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/9098-pepper-mill.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/9098-pepper-mill.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/9098-pepper-mill.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/9098-pepper-mill.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/9098-pepper-mill",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_9098.jpg",
        "originalSrc": "/photos/originals/9098-pepper-mill.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/9098-pepper-mill.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/9098-pepper-mill.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/9098-pepper-mill.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "mami-pitcher": {
    "src": "/photos/studio/mami-pitcher.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/mami-pitcher",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_SG52-3000.jpg",
    "originalSrc": "/photos/originals/mami-pitcher.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/mami-pitcher.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/mami-pitcher.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/mami-pitcher.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/mami-pitcher.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/mami-pitcher",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_SG52-3000.jpg",
        "originalSrc": "/photos/originals/mami-pitcher.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/mami-pitcher.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/mami-pitcher.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/mami-pitcher.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "tigrito-cat-bowl": {
    "src": "/photos/studio/tigrito-cat-bowl.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/tigrito-cat-bowl",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/AMMI09-01.jpg",
    "originalSrc": "/photos/originals/tigrito-cat-bowl.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/tigrito-cat-bowl.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/tigrito-cat-bowl.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/tigrito-cat-bowl.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/tigrito-cat-bowl.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/tigrito-cat-bowl",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/AMMI09-01.jpg",
        "originalSrc": "/photos/originals/tigrito-cat-bowl.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/tigrito-cat-bowl.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/tigrito-cat-bowl.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/tigrito-cat-bowl.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "girotondo-round-tray": {
    "src": "/photos/studio/girotondo-round-tray.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/girotondo-round-tray",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_AKKGT_b3a8c313-2b98-4399-8b62-f175409da743.jpg",
    "originalSrc": "/photos/originals/girotondo-round-tray.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/girotondo-round-tray.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/girotondo-round-tray.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/girotondo-round-tray.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/girotondo-round-tray.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/girotondo-round-tray",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_AKKGT_b3a8c313-2b98-4399-8b62-f175409da743.jpg",
        "originalSrc": "/photos/originals/girotondo-round-tray.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/girotondo-round-tray.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/girotondo-round-tray.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/girotondo-round-tray.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "ossidiana-espresso-coffee-maker": {
    "src": "/photos/studio/ossidiana-espresso-coffee-maker.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/ossidiana-espresso-coffee-maker",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/MT18-01.jpg",
    "originalSrc": "/photos/originals/ossidiana-espresso-coffee-maker.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/ossidiana-espresso-coffee-maker.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/ossidiana-espresso-coffee-maker.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/ossidiana-espresso-coffee-maker.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/ossidiana-espresso-coffee-maker.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/ossidiana-espresso-coffee-maker",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/MT18-01.jpg",
        "originalSrc": "/photos/originals/ossidiana-espresso-coffee-maker.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/ossidiana-espresso-coffee-maker.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/ossidiana-espresso-coffee-maker.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/ossidiana-espresso-coffee-maker.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "moka-espresso-coffee-maker": {
    "src": "/photos/studio/moka-espresso-coffee-maker.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/moka-espresso-coffee-maker",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/DC06-01_2f935f86-4a46-4e4f-82db-d454d6da1c0c.jpg",
    "originalSrc": "/photos/originals/moka-espresso-coffee-maker.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/moka-espresso-coffee-maker.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/moka-espresso-coffee-maker.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/moka-espresso-coffee-maker.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/moka-espresso-coffee-maker.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/moka-espresso-coffee-maker",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/DC06-01_2f935f86-4a46-4e4f-82db-d454d6da1c0c.jpg",
        "originalSrc": "/photos/originals/moka-espresso-coffee-maker.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/moka-espresso-coffee-maker.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/moka-espresso-coffee-maker.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/moka-espresso-coffee-maker.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "sg63-electric-citrus-juicer-european-plug": {
    "src": "/photos/studio/sg63-electric-citrus-juicer-european-plug.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/sg63-electric-citrus-juicer-european-plug",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/SG63-01.jpg",
    "originalSrc": "/photos/originals/sg63-electric-citrus-juicer-european-plug.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/sg63-electric-citrus-juicer-european-plug.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/sg63-electric-citrus-juicer-european-plug.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/sg63-electric-citrus-juicer-european-plug.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/sg63-electric-citrus-juicer-european-plug.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/sg63-electric-citrus-juicer-european-plug",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/SG63-01.jpg",
        "originalSrc": "/photos/originals/sg63-electric-citrus-juicer-european-plug.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/sg63-electric-citrus-juicer-european-plug.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/sg63-electric-citrus-juicer-european-plug.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/sg63-electric-citrus-juicer-european-plug.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "la-bella-tavola-soup-bowl": {
    "src": "/photos/studio/la-bella-tavola-soup-bowl.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/la-bella-tavola-soup-bowl",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/files/01_ES21-2.jpg",
    "originalSrc": "/photos/originals/la-bella-tavola-soup-bowl.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/la-bella-tavola-soup-bowl.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/la-bella-tavola-soup-bowl.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/la-bella-tavola-soup-bowl.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/la-bella-tavola-soup-bowl.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/la-bella-tavola-soup-bowl",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/files/01_ES21-2.jpg",
        "originalSrc": "/photos/originals/la-bella-tavola-soup-bowl.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/la-bella-tavola-soup-bowl.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/la-bella-tavola-soup-bowl.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/la-bella-tavola-soup-bowl.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
        }
      }
    ]
  },
  "bulla-bottle-opener": {
    "src": "/photos/studio/bulla-bottle-opener.jpg",
    "source": "Alessi product reference",
    "page": "https://eu.alessi.com/products/bulla-bottle-opener",
    "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_VS01.jpg",
    "originalSrc": "/photos/originals/bulla-bottle-opener.jpg",
    "width": 1122,
    "height": 1402,
    "fit": "cover",
    "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
    "aiEdit": {
      "tool": "built-in image_gen",
      "source": "/photos/originals/bulla-bottle-opener.jpg",
      "styleReference": "/photos/studio/ph-5.jpg",
      "treatment": "Matching warm greige editorial daylight studio"
    },
    "nightSrc": "/photos/night/bulla-bottle-opener.jpg",
    "nightWidth": 1122,
    "nightHeight": 1402,
    "nightEdit": {
      "tool": "built-in image_gen",
      "daySource": "/photos/studio/bulla-bottle-opener.jpg",
      "styleReference": "/photos/night/ph-5.jpg",
      "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
    },
    "images": [
      {
        "src": "/photos/studio/bulla-bottle-opener.jpg",
        "source": "Alessi product reference",
        "page": "https://eu.alessi.com/products/bulla-bottle-opener",
        "original": "https://cdn.shopify.com/s/files/1/0337/3603/2392/products/01_VS01.jpg",
        "originalSrc": "/photos/originals/bulla-bottle-opener.jpg",
        "width": 1122,
        "height": 1402,
        "fit": "cover",
        "rights": "Manufacturer reference; rights unverified. AI-relit preview photography.",
        "aiEdit": {
          "tool": "built-in image_gen",
          "source": "/photos/originals/bulla-bottle-opener.jpg",
          "styleReference": "/photos/studio/ph-5.jpg",
          "treatment": "Matching warm greige editorial daylight studio"
        },
        "nightSrc": "/photos/night/bulla-bottle-opener.jpg",
        "nightWidth": 1122,
        "nightHeight": 1402,
        "nightEdit": {
          "tool": "built-in image_gen",
          "daySource": "/photos/studio/bulla-bottle-opener.jpg",
          "styleReference": "/photos/night/ph-5.jpg",
          "treatment": "Matching cozy night exposure; lamps on, other objects under warm external lighting"
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

  function secHead(label, route, linkText) {
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
    h += '<section class="sec wrap home-recent"><div class="g">' + secHead('Recently added', 'collection:lighting') + '</div><div class="grid home-gallery">' + recent.map(objCard).join('') + '</div></section>';
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
    if (o.source) facts.push(['Source', '<a class="link" href="' + esc(o.source) + '" target="_blank" rel="noopener">Product archive</a>']);
    if (o.materials) facts.push(['Materials', esc(o.materials)]);
    if (o.dimensions) facts.push(['Dimensions', esc(o.dimensions)]);
    facts.push(['Origin', esc(o.origin)]); facts.push(['Status', esc(o.status)]);
    var related = STORIES.filter(function (s) { return s.featured.indexOf(o.slug) > -1; })[0] || STORIES.filter(function (s) { return s.featured.some(function (f) { return oBySlug[f].dept === o.dept; }); })[0] || (o.expansion ? null : STORIES[0]);
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
    if (related) h += '<section class="sec wrap"><div class="g">' + secHead('Related story', 'stories') + '</div><div style="margin-top:24px" class="read">' + storyCard(related) + '</div></section>';
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
