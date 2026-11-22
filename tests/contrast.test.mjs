import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const css = fs.readFileSync('src/styles/global.css', 'utf8');

function lum(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const stops = (decl) => [...decl.matchAll(/#[0-9a-f]{6}/gi)].map((m) => m[0]);
const token = (block, name) => block.match(new RegExp(`${name}:\\s*([^;]+);`))[1];

const light = css.match(/:root\s*\{([^}]*)\}/)[1];
const dark = css.match(/prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{([^}]*)\}/)[1];

test('test_button_text_contrast_aa', () => {
  for (const s of stops(token(light, '--gradient-button'))) assert.ok(ratio(s, '#ffffff') >= 4.5, `${s} vs white`);
  assert.match(css, /\.btn-primary\s*\{[^}]*background:\s*var\(--gradient-button\)/);
});

test('test_headline_gradient_contrast_large_text', () => {
  for (const s of stops(token(light, '--gradient-text'))) assert.ok(ratio(s, token(light, '--bg').trim()) >= 3, `light ${s}`);
  for (const s of stops(token(dark, '--gradient-text'))) assert.ok(ratio(s, token(dark, '--bg').trim()) >= 3, `dark ${s}`);
});
