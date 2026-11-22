import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { readDist, distExists } from './helpers.mjs';

const fixtures = JSON.parse(fs.readFileSync('tests/fixtures/palette-craft.sha256.json', 'utf8'));

test('test_palette_craft_preserved', () => {
  assert.equal(Object.keys(fixtures).length, 5);
  for (const [p, want] of Object.entries(fixtures)) {
    assert.ok(distExists(p), `missing ${p}`);
    const got = crypto.createHash('sha256').update(fs.readFileSync('dist/' + p)).digest('hex');
    assert.equal(got, want, p);
  }
});

test('test_service_worker_kill_switch', () => {
  const sw = readDist('service-worker.js');
  assert.match(sw, /skipWaiting/);
  assert.match(sw, /caches\s*\.keys\(\)/);
  assert.match(sw, /registration\.unregister\(\)/);
});

test('test_sitemap_and_robots', () => {
  assert.ok(distExists('sitemap-index.xml'));
  assert.match(readDist('robots.txt'), /Sitemap: https:\/\/shuvam-koirala\.github\.io\/portfolio\/sitemap-index\.xml/);
});
