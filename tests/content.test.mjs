import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const DIR = 'src/content/projects';

test('test_six_projects', () => {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'));
  assert.equal(files.length, 6);
});

test('test_one_featured_palette_craft', () => {
  const pc = fs.readFileSync(`${DIR}/palette-craft.md`, 'utf8');
  assert.match(pc, /featured:\s*true/);
  assert.match(pc, /status:\s*coming-soon/);
  const others = fs.readdirSync(DIR).filter((f) => f !== 'palette-craft.md');
  for (const f of others) assert.doesNotMatch(fs.readFileSync(`${DIR}/${f}`, 'utf8'), /featured:\s*true/, f);
});
