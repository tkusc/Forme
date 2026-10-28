import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { createRenderer } from '../scripts/render.mjs';

const { routes, render } = createRenderer();
const baseline = JSON.parse(await readFile(new URL('./content-baseline.json', import.meta.url)));
const output = new URL('../dist/', import.meta.url);
function fileFor(path) { return new URL(path.replace(/^\//, '') + (path === '/' ? '' : '/') + 'index.html', output); }

test('every existing route preserves its complete content during the migration', () => {
  for (const route of [...routes].reverse()) {
    const html = render(route).html;
    assert.equal(createHash('sha256').update(html).digest('hex'), baseline[route], route);
  }
});

test('every route has usable HTML, the two shared containers and an accurate title', async () => {
  for (const route of routes) {
    const page = render(route);
    const html = await readFile(fileFor(page.path), 'utf8');
    assert.equal((html.match(/<header\b/g) || []).length, 1, route);
    assert.equal((html.match(/<main\b/g) || []).length, 1, route);
    assert.equal((html.match(/class="photo-mode"/g) || []).length, 1, route + ' has one shared lighting control');
    assert.match(html.match(/<header\b[\s\S]*?<\/header>/)[0], /class="photo-mode"/);
    assert.match(html, /<header class="header nav transition-swup/);
    assert.match(html, /<main id="swup" class="transition-swup hide-scrollbar/);
    assert.match(html, /<h1\b[^>]*>[^<]+<\/h1>/);
    assert.ok(html.includes('<title>' + page.title.replaceAll('&', '&amp;').replaceAll('<', '&lt;') + '</title>'));
    assert.ok(!html.includes('{{') && !html.includes('<!-- PAGE -->'), route);
  }
});

test('all internal page links and local assets resolve to generated files', async () => {
  const paths = new Set(routes.map(route => render(route).path));
  for (const route of routes) {
    const html = await readFile(fileFor(render(route).path), 'utf8');
    for (const [, link] of html.matchAll(/href="(\/[^"#?]*)/g)) {
      if (link.endsWith('.css') || link.endsWith('.svg')) await access(new URL(link.slice(1), output));
      else assert.ok(paths.has(link), route + ' links to ' + link);
    }
    for (const [, src] of html.matchAll(/src="(\/[^"?]*)/g)) await access(new URL(src.slice(1), output));
  }
});

test('missing URLs have a real prerendered not-found page', async () => {
  const html = await readFile(new URL('404.html', output), 'utf8');
  assert.match(html, /data-route="notfound"/);
  assert.match(html, /This page has moved or never existed/);
});
