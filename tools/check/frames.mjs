import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const opts = { base: 'http://127.0.0.1:4173', theme: 'day', motion: 'on', width: 0, paths: null };
const positional = [];
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i += 1) {
  const flag = argv[i];
  if (flag === '--theme') opts.theme = argv[++i];
  else if (flag === '--motion') opts.motion = argv[++i];
  else if (flag === '--reduced') opts.motion = 'reduce';
  else if (flag === '--width') opts.width = Number(argv[++i]);
  else if (flag === '--paths') opts.paths = argv[++i].split(',').filter(Boolean);
  else positional.push(flag);
}
const [out, base] = positional;
if (!out) throw new Error('usage: node tools/check/frames.mjs <out-dir> [base] [--theme day|night] [--motion on|reduce] [--paths /a,/b] [--width 1440]');
if (base) opts.base = base;
if (!['day', 'night'].includes(opts.theme)) throw new Error('--theme must be day or night');
mkdirSync(out, { recursive: true });
const root = new URL('../..', import.meta.url).pathname;
const reduced = opts.motion === 'reduce';
const suffix = `${opts.theme === 'night' ? '-night' : ''}${reduced ? '-reduced' : ''}`;

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

function pages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (name.startsWith('.') || name === 'tools' || name === 'node_modules' || name.startsWith('zz')) return [];
    if (statSync(path).isDirectory()) return pages(path);
    return name.endsWith('.html') ? ['/' + relative(root, path).replace(/index\.html$/, '')] : [];
  });
}

const list = opts.paths || pages(root).sort();
const sizes = opts.width ? [[opts.width, opts.width > 900 ? 900 : 844]] : [[1440, 900], [390, 844]];
if (reduced) ab('set', 'media', opts.theme === 'night' ? 'dark' : 'light', 'reduced-motion');
else ab('set', 'media', opts.theme === 'night' ? 'dark' : 'light');
for (const [w, h] of sizes) {
  ab('set', 'viewport', String(w), String(h));
  for (const path of list) {
    const name = (path.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home') + `-${w}${suffix}`;
    ab('open', opts.base + path + (path.includes('?') ? '&' : '?') + `time=${opts.theme}`);
    ab('wait', '500');
    ab('screenshot', join(out, `${name}-top.png`));
    ab('eval', 'scrollTo(0,document.documentElement.scrollHeight);1');
    ab('wait', '350');
    ab('screenshot', join(out, `${name}-bottom.png`));
  }
}
console.log(`${list.length} pages captured at top and bottom, ${sizes.length} width(s), ${opts.theme}${reduced ? ', reduced motion' : ''}`);
