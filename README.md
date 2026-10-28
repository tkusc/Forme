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

The shared header follows the Details.so layout with formé's own branding and links: Lighting, Furniture and Objects beside the wordmark, a centered search pill, and Stories, Designers, About and the menu control on the right. The primary navigation has a moving selection pill for hover and keyboard focus. The bar measures 72px on larger layouts and 56px on phones; below 1120px, all six links remain available through the anchored dropdown.

Search opens the existing formé results in a floating panel, supports the F shortcut, Escape, outside click and keyboard focus containment. The dropdown can be toggled with the hamburger or dismissed with Escape/outside click. Its contents and the collection filter remain unchanged. The menu is non-modal with the page surface inert; filters retain their modal side/bottom sheet. Listeners are scoped to the incoming Swup header and disposed on replacement. Reduced motion removes selection-pill travel.
