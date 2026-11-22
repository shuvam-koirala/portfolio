import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readDist } from './helpers.mjs';

const h = () => readDist('index.html');

test('test_section_order', () => {
  const ids = [...h().matchAll(/<section[^>]*id="([^"]+)"/g)].map((m) => m[1]);
  assert.deepEqual(ids, ['hero', 'services', 'why', 'work', 'experience', 'skills', 'contact']);
});

test('test_contact_links', () => {
  assert.ok((h().match(/href="mailto:suvamkoirala08@gmail\.com/g) || []).length >= 2);
  assert.match(h(), /href="https:\/\/www\.linkedin\.com\/in\/shuvam-koirala"/);
  assert.match(h(), /href="https:\/\/github\.com\/shuvam-koirala"/);
});

test('test_hero_copy', () => {
  assert.match(h(), /Tell me about your app/);
  assert.match(h(), /UTC\+5:45/);
});

test('test_payments_featured', () => {
  for (const g of ['eSewa', 'Khalti', 'ConnectIPS', 'MyPay']) assert.match(h(), new RegExp(g));
});

test('test_projects_rendered', () => {
  for (const t of ['Palette Craft', 'MQTT', 'Downloader', 'Flavor', 'MVVM', 'PDF']) assert.match(h(), new RegExp(t, 'i'));
  assert.match(h(), /Coming soon/i);
  assert.match(h(), /src="\/portfolio\/palette-craft\/images\/home\.png"/);
});

test('test_experience_listed', () => {
  for (const c of ['Diyalo Technologies', 'Spell Innovation', 'Enspire Tech', 'PythonMate', 'Tribhuvan University'])
    assert.match(h(), new RegExp(c));
});

test('test_growing_into', () => {
  assert.match(h(), /Currently growing into/i);
  assert.match(h(), />Backend</);
  assert.match(h(), />AI</);
});

test('test_no_forbidden_text', () => {
  for (const bad of ['Bussewa', 'Sarathi', 'HealLive', 'Spell SMS', 'Hajurbuwa', 'Government', '<form'])
    assert.ok(!h().includes(bad), `found ${bad}`);
  assert.doesNotMatch(h(), /\b9[678]\d{8}\b/, 'phone number');
});

test('test_services_two_by_two', () => {
  const css = [...h().matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('') +
    require_css();
  assert.match(css, /\.grid\[data-astro-cid-[^\]]+\]\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*1fr\)/);
});

import fs from 'node:fs';
function require_css() {
  const d = 'dist/_astro';
  return fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith('.css')).map((f) => fs.readFileSync(`${d}/${f}`, 'utf8')).join('') : '';
}
