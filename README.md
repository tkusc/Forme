# formé

The stories behind iconic design. A showroom for the lamps, chairs and objects that shaped design history.

## Development

Requires Node.js 22 or later.

```sh
npm ci
npm run build
npm test
npm run preview
```

The preview serves `dist/` at http://127.0.0.1:8765, including clean route URLs and real 404 responses. Rebuild after source changes.

## Structure

- `templates/layout.html`: shared HTML document, viewport `.app` shell, fixed `header.header.transition-swup`, scrolling `main#swup.transition-swup`, and persistent search/filter/menu overlays.
- `assets/data.js`: collection, designers and stories. Edit content here.
- `assets/views.js`: view functions shared by the static renderer and local collection interactions.
- `assets/app.js`: one-time overlay/document setup and scoped header/page initialization. Page and header listeners are disposed with `AbortController` before reinitialization.
- `assets/navigation.js`: Swup with Head, Preload and Parallel plugins; nested scroll and history restoration; route announcements and focus.
- `assets/styles.css`: brand, responsive layouts and the parallel transition states.
- `scripts/render.mjs`: browser-independent rendering of all content routes.
- `scripts/build.mjs`: builds the local browser bundle and renders 51 content pages plus `404.html` into ignored `dist/`.
- `photos/`: licensed images, credited on each page.
- `tests/`: route, link/asset and content-preservation checks. `content-baseline.json` records the pre-migration view output; update it deliberately when editing content.

## Navigation and scrolling

Every URL returns complete HTML with matching `#swup` and `header` containers. Same-origin anchors work normally without JavaScript. With JavaScript, Swup replaces both containers in parallel and maintains the document head. Scripts and shared styles persist.

`setupOnce()` registers document and persistent overlay listeners once. `initHeader()` and `initPage()` run on initial load and on `content:replace`, using the incoming containers. The old containers are inert during the animation and removed by Parallel Plugin after the visit.

The document stays locked to the viewport; only `#swup` scrolls. Navigation starts at the top, while back/forward visits restore that history entry's nested scroll position and collection/FAQ state. Type shortcuts use real URLs such as `/collection/lighting?type=Pendant`. Hash links target the nested surface. Reduced-motion preferences disable the page animation.

The transition uses the supplied 1.4s cubic-bezier timing, outgoing `translateY(-160px) scale(0.95)`/0.5 opacity, incoming `translateY(50dvh)`/70% clip, and delayed header timing. Solid page and header surfaces prevent content bleed-through.

## Deploy

Netlify runs `npm run build` and publishes `dist/`. Pull requests receive a deploy preview; pushes to `main` publish production. Missing routes serve the generated 404 page, rather than an empty single-page shell.

## Image credits

Photo licences and authors are listed in `assets/views.js` (`PHOTOS`) and shown under “Image credits” on the relevant pages.

## Text Reveal 01

GSAP, SplitText and ScrollTrigger are bundled locally. Primary headings opt in with `data-reveal-01="words"`; article subheadings use `data-reveal-01="lines" data-scroll`. The helper in `assets/text-reveal.js` also supports `chars`, scrubbed scrolling (`data-scroll="scrub"`), replay (`data-once="false"`), and `data-duration`, `data-stagger`, `data-delay` and `data-ease` overrides.

`textReveal01(scope = document, delay = 0, { ignoreManual = false } = {})` preserves the original API and returns a cleanup function. Its `.splits` array exposes SplitText instances for custom timelines. `data-manual` splits without revealing or animating; `ignoreManual: true` opts those elements back into automatic animation.

`initPage()` initializes the incoming page after its markup exists, waiting for `document.fonts.ready`. The helper uses `autoSplit: true`, returned `onSplit()` tweens and default accessible SplitText labels. Scroll triggers explicitly use the containing `#swup`. `visit:end` refreshes trigger geometry after the parallel transition. Before navigation, tweens and triggers are stopped and font/resize observers detached while outgoing text stays visually frozen. Local collection/FAQ rerenders revert and dispose their previous splits first. Pending font work is cancelled when its page is left.

The stylesheet contains the source mask/clipping rules and turns off balanced wrapping only for opted-in elements so SplitText can measure real line breaks. Automatic reveals are skipped for reduced motion, and the shared template provides a `noscript` visibility fallback. No content or demo sections were added.

## Header navigation

The shared header follows the Details.so layout with formé's own branding and links: the wordmark, a centered search pill, and Stories, Designers and About on the right. Department links are available only in the popup. Header width and gutters follow the page's content container (1180px normally, 1600px on the desktop homepage). There is no separate hamburger. Opening Search (or pressing F) expands the pill and opens a separate navigation/search panel underneath with all six destinations, social/legal links and suggestions. Typing replaces suggestions with matching objects, stories and designers.

The search pill morphs in width and position while keeping its full pill radius and border. The detached 560px menu sits below with a visible gap, its own complete border and rounded corners. It fades/slides in independently, without growing or clipping down from the search bar; the close icon and content enter with staggered timing. The bar measures 72px on larger layouts and 56px on phones. Escape, outside click or the integrated close button closes the surface and restores trigger focus. The background page and unrelated header links are inert while open; the keyboard stays within search controls/results. Persistent overlay listeners are installed once, while header listeners are disposed and rebound after Swup replacement. Reduced motion removes morph travel. The collection filter retains its modal sheet.

### Photography

All 30 collection objects now have real, locally hosted photographs. Galleries,
category tiles, list thumbnails, story cards and related-object cards share this
photo catalogue. `photos/sources.json` records every source page, original image
URL, dimensions and known licence or unverified-rights status. Manufacturer and
retailer source links are provenance, not a claim of permission. Existing Commons
credits are retained for alternate archive views. The Murano photo is explicitly
labelled as a white patterned vintage variant; Akari now shows the correct 1A.
JPEGs are capped at 1600px for the newly imported images. Error-only illustrations
remain as a fallback when an image fails to load. Update the content snapshots
when deliberately changing the catalogue's image markup or credits.

All photographic surfaces use centered cover cropping to fill their frame. Pipistrello and Taccia lead
with their quieter studio photographs. Sources and known licence metadata remain
attached when gallery ordering changes.

The popup keeps its Instagram/Threads and legal links in a persistent footer after
all suggestions or search results. Search and filters use separate backdrop
elements with fixed colour and stacking order, so closing search only fades its
backdrop opacity. Entry animations finish before their classes are cleaned up.
The page footer reserves the progressive blur height plus 32px (and safe area)
below its legal row, keeping those links above the blurred viewport edge.

### AI studio photography

Every displayed photograph, including gallery variants, is individually edited
with the built-in image_gen tool. Image 1 supplies the actual product; the edited
PH 5 master supplies only the shared background and lighting reference. The
prompt locks product geometry, materials, finish, colour and viewpoint while
replacing backgrounds with a warm greige seamless studio and soft upper-left
key light, negative fill and grounded shadows. Wall-mounted and suspended
objects retain physically appropriate staging.

Edited JPEGs live in `photos/studio/`; original source JPEGs remain at their
existing paths. `photos/studio/prompts.json` contains the exact prompt for each
asset. `photos/sources.json` retains original attribution, original asset paths
and AI-edit metadata. Page credits identify the AI lighting/background edits.
The baked colour grade is displayed without the earlier CSS multiply tint.

### Day / Night photographs

Each of the 58 daytime studio views has a corresponding cozy nighttime edit in
`photos/night/`, referenced by `nightSrc` and `nightEdit` in the source manifest.
The night edit prompt locks the daytime camera, framing, geometry and pose.
Lighting products are switched on with warm, physically appropriate light;
non-lighting objects receive warm off-camera practical lighting without emitting
light themselves. Daytime files are unchanged. Exact night prompts are saved in
`photos/night/prompts.json`.

Day/Night controls appear in the homepage's recent section, collection toolbar
and object galleries. They switch photographic exposures only, preserving the
active gallery view and scroll position. The preference is stored separately
from per-page navigation state and reapplied to incoming Swup pages, local
rerenders and search results. Gallery/home night counterparts preload for a
smoother first switch. The page colour theme remains unchanged.
