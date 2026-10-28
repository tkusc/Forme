import { mkdir, rm, cp, readFile, writeFile } from 'node:fs/promises';
import { build } from 'esbuild';
import { createRenderer, renderDocument } from './render.mjs';

const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(new URL('assets/', output), { recursive: true });
for (const file of ['assets/styles.css', 'assets/data.js', 'assets/views.js', 'photos', 'favicon.svg']) {
  await cp(new URL('../' + file, import.meta.url), new URL(file, output), { recursive: true });
}
await build({ entryPoints: ['assets/navigation.js'], bundle: true, minify: true,
  outfile: 'dist/assets/app.bundle.js', format: 'iife', target: ['es2020'], legalComments: 'eof' });
const template = await readFile(new URL('../templates/layout.html', import.meta.url), 'utf8');
const { routes, render } = createRenderer();
for (const route of [...routes, 'notfound']) {
  const page = render(route);
  const relative = route === 'notfound' ? '404.html' : page.path.replace(/^\//, '') + (page.path === '/' ? '' : '/') + 'index.html';
  const file = new URL(relative, output);
  await mkdir(new URL('.', file), { recursive: true });
  await writeFile(file, renderDocument(template, page));
}
console.log(`Built ${routes.length} prerendered pages, a 404 page and the local Swup bundle.`);
