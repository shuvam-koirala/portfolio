import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { execSync } from 'node:child_process';

// The repo is public: nothing private may be committed (CI checkout has the same files).
test('test_no_private_info_in_repo', () => {
  const files = execSync('git ls-files', { encoding: 'utf8' }).split('\n').filter(Boolean)
    .filter((f) => !/\.(png|jpg|ico|woff2?)$/.test(f) && f !== 'package-lock.json');
  // Built from pieces so this file does not match itself.
  const patterns = [/\b9[678]\d{8}\b/, new RegExp('SD' + 'OC'), new RegExp('/Us' + 'ers/'), new RegExp('books and ' + 'papers')];
  for (const f of files) {
    const text = fs.readFileSync(f, 'utf8');
    for (const re of patterns) assert.doesNotMatch(text, re, `${f} matches ${re}`);
  }
});
