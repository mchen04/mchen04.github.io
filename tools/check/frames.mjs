import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const [out, base = 'http://127.0.0.1:4173'] = process.argv.slice(2);
if (!out) throw new Error('usage: node tools/check/frames.mjs <out-dir> [base]');
mkdirSync(out, { recursive: true });
const root = new URL('../..', import.meta.url).pathname;

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

const list = pages(root).sort();
for (const [w, h] of [[1440, 900], [390, 844]]) {
  ab('set', 'viewport', String(w), String(h));
  for (const path of list) {
    const name = (path.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home') + `-${w}`;
    ab('open', base + path + (path.includes('?') ? '&' : '?') + 'time=day');
    ab('wait', '500');
    ab('screenshot', join(out, `${name}-top.png`));
    ab('eval', 'scrollTo(0,document.documentElement.scrollHeight);1');
    ab('wait', '350');
    ab('screenshot', join(out, `${name}-bottom.png`));
  }
}
console.log(`${list.length} pages captured at top and bottom, two widths`);
