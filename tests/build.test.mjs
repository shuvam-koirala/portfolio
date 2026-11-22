import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readDist, distExists, BASE } from './helpers.mjs';

test('test_index_built', () => assert.ok(distExists('index.html')));

test('test_internal_urls_use_base', () => {
  const html = readDist('index.html');
  const urls = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1]);
  assert.ok(urls.length > 0, 'expected at least one internal url');
  for (const u of urls) {
    if (u.startsWith('//')) continue; // protocol-relative external
    assert.ok(u.startsWith(BASE + '/') || u === BASE, `bad url ${u}`);
  }
});
