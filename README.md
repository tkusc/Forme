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
