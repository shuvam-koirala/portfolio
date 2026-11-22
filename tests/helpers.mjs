import fs from 'node:fs';
import path from 'node:path';

export const BASE = '/portfolio';
const DIST = path.resolve('dist');

export function distExists(p) {
  return fs.existsSync(path.join(DIST, p));
}

export function readDist(p) {
  const full = path.join(DIST, p);
  if (!fs.existsSync(full)) throw new Error(`dist/${p} missing`);
  return fs.readFileSync(full, 'utf8');
}
