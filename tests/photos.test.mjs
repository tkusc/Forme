import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import { createRenderer } from '../scripts/render.mjs';

const sources = JSON.parse(await readFile(new URL('../photos/sources.json', import.meta.url)));
const { routes, render } = createRenderer();

test('every object gallery contains only locally hosted photographs with recorded sources', async () => {
  const objects = routes.filter(route => route.startsWith('object:'));
  assert.equal(Object.keys(sources).length, objects.length);
  for (const route of objects) {
    const slug = route.split(':')[1];
    const images = sources[slug];
    assert.ok(images?.length, slug);
    const gallery = render(route).html.match(/<div class="gallery"[\s\S]*?<\/div><\/div>/)[0];
    assert.equal((gallery.match(/<img /g) || []).length, images.length, slug);
    for (const image of images) {
      assert.ok(image.width >= 400 && image.height >= 400, image.src);
      assert.match(image.page, /^https:\/\//);
      assert.equal(image.fit, 'cover', image.src + ' fills its image frame');
      assert.match(image.src, /^\/photos\/studio\//, image.src + ' uses the shared AI studio treatment');
      assert.equal(image.aiEdit?.tool, 'built-in image_gen');
      await readFile(new URL('..' + image.originalSrc, import.meta.url));
      assert.ok(image.lic || image.rights, image.src);
      const bytes = await readFile(new URL('..' + image.src, import.meta.url));
      assert.equal(bytes.readUInt16BE(0), 0xffd8, image.src + ' is a valid JPEG');
    }
  }
});

test('collection type tiles, list thumbnails and story cards use real photos', () => {
  const context = vm.createContext({});
  for (const file of ['assets/data.js', 'assets/views.js']) {
    vm.runInContext(readFileSync(new URL('../' + file, import.meta.url), 'utf8'), context);
  }
  const { Forme } = context;
  for (const dept of ['lighting', 'furniture', 'objects']) {
    Object.assign(Forme.state, { dept, view: 'list', type: null, sel: {}, shown: 100 });
    const html = Forme.views.collection(dept);
    const thumbnails = [...html.matchAll(/<span class="sthumb">([\s\S]*?)<\/span>/g)];
    assert.ok(thumbnails.length > 0, dept);
    for (const [, thumbnail] of thumbnails) assert.match(thumbnail, /<img class="ph"/);
    for (const [, tile] of html.matchAll(/<button class="type"[\s\S]*?<div class="plate"[^>]*>([\s\S]*?)<\/div>/g)) {
      assert.match(tile, /<img class="ph"/);
    }
  }
  for (const route of routes.filter(route => route.startsWith('story:'))) {
    assert.match(render(route).html, /<img class="ph"/);
  }
});
