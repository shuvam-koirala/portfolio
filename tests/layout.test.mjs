import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { readDist } from './helpers.mjs';

function allCss() {
  const dir = 'dist/_astro';
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.css')) : [];
  const external = files.map((f) => readDist('_astro/' + f)).join('\n');
  const inline = [...readDist('index.html').matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
  return external + '\n' + inline;
}

test('test_head_seo', () => {
  const h = readDist('index.html');
  for (const re of [
    /<title>[^<]*Shuvam Koirala/,
    /<meta name="description" content="[^"]{50,}"/,
    /<meta property="og:image" content="https:\/\/[^"]+og\.png"/,
    /<meta name="viewport"/,
    /<link rel="icon"/,
    /<meta name="color-scheme" content="light dark"/,
    /<link rel="canonical" href="https:\/\/shuvam-koirala\.github\.io\/portfolio\/"/,
    /<html lang="en"/,
  ]) assert.match(h, re);
});

test('test_reveal_hidden_only_with_js', () => {
  const css = allCss();
  assert.match(css, /\.reveal/, 'reveal styles exist');
  // A rule whose selector is just ".reveal" must never set opacity:0
  assert.doesNotMatch(css, /(^|[},])\s*\.reveal\s*\{[^}]*opacity:\s*0/);
  assert.match(css, /\.js \.reveal/);
  assert.match(css, /prefers-reduced-motion/);
});

test('test_dark_mode_tokens', () => {
  assert.match(allCss(), /prefers-color-scheme:\s*dark/);
});

test('test_dark_mode_text_gradient_is_light', () => {
  const css = allCss();
  const dark = css.match(/prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{([^}]*)\}/);
  assert.ok(dark, 'dark :root block');
  assert.match(dark[1], /--gradient-text:/, 'dark mode must override the text gradient');
  assert.match(css, /\.gradient-text\s*\{[^}]*var\(--gradient-text\)/);
});
