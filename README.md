# formé

The stories behind iconic design. A showroom for the lamps, chairs and objects that shaped design history.

## Structure

- `index.html`: page shell (navigation, sheets, search)
- `assets/styles.css`: design tokens and all styles
- `assets/data.js`: the collection (objects, designers, stories). Add new entries here.
- `assets/app.js`: routing with real URLs, views, search, filter, sheets
- `photos/`: licensed photos, credited on every page
- `netlify.toml`: hosting config (single-page routing, caching)

## URLs

`/` · `/collection/lighting` · `/collection/lighting/ph-5` · `/stories/danish-light` · `/designers/poul-henningsen` · `/about`

## Local preview

```
npx serve -s .
```

## Deploy

Netlify builds every push to `main`. Pull requests get their own preview link.

## Image credits

Photo licences and authors are listed in `assets/app.js` (`PHOTOS`) and shown on each page under "Image credits".
