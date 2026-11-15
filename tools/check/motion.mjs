import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { waitReady } from './ready.mjs';

const opts = { base: 'http://127.0.0.1:4173', width: 1440, frames: 8, gap: 400, theme: 'day', paths: null };
const positional = [];
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i += 1) {
  const flag = argv[i];
  if (flag === '--width') opts.width = Number(argv[++i]);
  else if (flag === '--frames') opts.frames = Number(argv[++i]);
  else if (flag === '--gap') opts.gap = Number(argv[++i]);
  else if (flag === '--theme') opts.theme = argv[++i];
  else if (flag === '--paths') opts.paths = argv[++i].split(',').filter(Boolean);
  else positional.push(flag);
}
const [out, base] = positional;
if (!out) throw new Error('usage: node tools/check/motion.mjs <out-dir> [base] [--paths /a,/b] [--width 1440] [--theme day|night] [--frames 8] [--gap 400]');
if (base) opts.base = base;
if (!['day', 'night'].includes(opts.theme)) throw new Error('--theme must be day or night');
mkdirSync(out, { recursive: true });
const paths = opts.paths || ['/', '/work/', '/ml/', '/projects/', '/writing/', '/about/', '/resume/', '/404.html'];
const height = opts.width > 900 ? 900 : 844;
const late = [];

function ab(...args) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return execFileSync('agent-browser', args, { encoding: 'utf8' });
    } catch (error) {
      if (attempt >= 4) throw error;
      execFileSync('sleep', [String(attempt)]);
    }
  }
}

function sequence(name, area) {
  for (let i = 1; i <= opts.frames; i += 1) {
    const state = waitReady();
    if (!state.ready) late.push(`${name} ${area} ${String(i).padStart(2, '0')} (${state.pending} pending)`);
    ab('screenshot', join(out, `${name}-${area}-${String(i).padStart(2, '0')}.png`));
    if (i < opts.frames) ab('wait', String(opts.gap));
  }
}

ab('set', 'media', opts.theme === 'night' ? 'dark' : 'light');
ab('set', 'viewport', String(opts.width), String(height));
for (const path of paths) {
  const name = (path.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home') + `-${opts.width}-${opts.theme}`;
  ab('open', opts.base + path + (path.includes('?') ? '&' : '?') + `time=${opts.theme}`);
  ab('eval', 'scrollTo(0,0);1');
  sequence(name, 'banner');
  ab('eval', "document.querySelector('footer').scrollIntoView({block:'start'});1");
  sequence(name, 'footer');
}
console.log(`${paths.length} pages × ${opts.frames} frames at ${opts.width}px, ${opts.theme}`);
if (late.length) console.log(`timed out: ${late.join(', ')}`);
