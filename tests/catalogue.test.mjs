import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

test('catalogue expansion adds exactly 100 sourced objects across all three departments', () => {
  const context = vm.createContext({});
  vm.runInContext(readFileSync(new URL('../assets/data.js', import.meta.url), 'utf8'), context);
  const {OBJECTS, DEPTS, dById} = context;
  const additions = OBJECTS.filter(object => object.expansion);
  const provenance = JSON.parse(readFileSync(new URL('../data/catalogue-sources.json', import.meta.url), 'utf8'));
  assert.equal(OBJECTS.length, 130);
  assert.equal(additions.length, 100);
  assert.equal(new Set(OBJECTS.map(object => object.slug)).size, 130);
  assert.equal(provenance.length, 100);
  for (const [dept, count] of Object.entries({lighting:35, furniture:35, objects:30})) {
    assert.equal(additions.filter(object => object.dept === dept).length, count);
  }
  for (const object of additions) {
    assert.ok(dById[object.designer]?.name, object.slug + ' has a designer');
    assert.ok(Number.isInteger(object.year) && object.year >= 1850 && object.year <= 2026, object.slug);
    assert.ok(DEPTS.find(dept => dept.id === object.dept).types.includes(object.type), object.slug + ' is filterable');
    assert.ok(object.story.length >= 2 && object.inShort.length > 60, object.slug + ' has editorial content');
    const source = provenance.find(entry => entry.slug === object.slug);
    assert.equal(source.source, object.source);
    assert.match(source.source, /^https:\/\//);
  }
});
