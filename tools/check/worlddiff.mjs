import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const argv = process.argv.slice(2);
const extra = [];
let rev = 'HEAD';
for (let i = 0; i < argv.length; i += 1) {
  if (argv[i] === '--allow') extra.push(new RegExp(argv[++i]));
  else rev = argv[i];
}
const root = new URL('../..', import.meta.url).pathname;
const ALLOW = [
  /stroke="#(?:8a6a5a|8d7a9c)" stroke-width="1.4"/,
  /q 12 -6 24 0 v 16 q -12 -6 -24 0 z/,
  /^<path d="M [\d.]+ [\d.]+ L [\d.]+ [\d.]+ L [\d.]+ [\d.]+ Z" fill="#a8574a"\/>$/,
  /fill="#(?:f4dfc6|f6e7d3)"/,
  /^<circle [^/]*fill="#6a6080"/,
  /^<path d="M 1100\.3 294 A 100 100 0 0 1 1299\.7 294"/,
  /^<rect [^/]*width="44" x="1178" y="192"/,
  /^<path d="M 1211 116 L 1211 192"/,
];
const allowed = (shape) => [...ALLOW, ...extra].some((re) => re.test(shape));
const REVIEWED = [
  {
    name: '404 plate redraw',
    commits: ['cf10a0b', '817226e', '8775dce'],
    files: ['world/unwritten-still.svg', 'world/unwritten-night-still.svg'],
    allow: [
      /stroke="#b4893f"/, /stroke="#8d7a74"/, /fill="#a8939a"/, /stop-color="#f2ebe1"/,
      /fill="url\(#fog\)"/, /fill="#d9cbbd"/, /fill="#6d5c5c"/, /fill="#8a6f60"/,
      /stroke="#8d7a9c"/, /stroke="#6a6080"/, /fill="#4b3f62"/, /fill="#8d7a9c"/,
      /stop-color="#231e33"/, /fill="#3a3352"/, /fill="#a596b8"/, /fill="#2a2440"/,
    ],
  },
  {
    name: 'observatory slit',
    commits: ['f353391', '8775dce'],
    files: ['world/observatory-still.svg'],
    allow: [
      /^<path d="M 1100\.3 294 A 100 100 0 0 1 1160\.2 210\.3"/,
      /^<path d="M 1197\.1 202 A 100 100 0 0 1 1299\.7 294"/,
      /^<rect fill="#1a1626" height="61\.5" rx="3" width="36" x="1182" y="204\.5"/,
    ],
  },
];
const isAncestor = (c, r) => { try { execFileSync('git', ['merge-base', '--is-ancestor', c, r], { stdio: 'ignore' }); return true; } catch { return false; } };
const active = REVIEWED.map((r) => ({ ...r, on: r.commits.some((c) => !isAncestor(c, rev) && isAncestor(c, 'HEAD')) }));

const CONTAINERS = new Set(['svg', 'g', 'defs', 'linearGradient', 'radialGradient', 'filter', 'clipPath', 'mask', 'symbol', 'marker', 'pattern']);
const SHAPES = new Set(['path', 'rect', 'circle', 'ellipse', 'line', 'polygon', 'polyline', 'stop', 'feGaussianBlur', 'use', 'text', 'image']);

function attrsOf(raw) {
  const out = [];
  const re = /([a-zA-Z_:][\w:.-]*)="([^"]*)"/g;
  let m;
  while ((m = re.exec(raw))) if (m[1] !== 'class' && m[1] !== 'style') out.push([m[1], m[2]]);
  return out;
}

function record(tag, attrs, inherited) {
  const map = new Map(attrs);
  if (!map.has('fill') && inherited.fill) map.set('fill', inherited.fill);
  if (!map.has('stroke') && inherited.stroke) map.set('stroke', inherited.stroke);
  const body = [...map.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([k, v]) => `${k}="${v}"`).join(' ');
  return `<${tag} ${body}/>`;
}

function canon(d) {
  const tokens = d.match(/[MmLlHhVvCcSsQqTtAaZz]|-?\d*\.?\d+/g) || [];
  const out = [];
  let cmd = '';
  let count = 0;
  for (const token of tokens) {
    if (/[A-Za-z]/.test(token)) {
      cmd = token;
      count = 0;
      out.push(token);
      continue;
    }
    if ((cmd === 'M' || cmd === 'm') && count >= 2) {
      out.push(cmd === 'M' ? 'L' : 'l');
      count = 0;
    }
    out.push(token);
    count += 1;
  }
  return out.join(' ');
}

function shapes(svg) {
  const out = [];
  const stack = [];
  const re = /<(\/?)([a-zA-Z][\w:-]*)([^>]*?)(\/?)>/g;
  let m;
  while ((m = re.exec(svg))) {
    const [, close, tag, raw, self] = m;
    if (tag === 'style') {
      if (!close) {
        const end = svg.indexOf('</style>', re.lastIndex);
        re.lastIndex = end < 0 ? svg.length : end + 8;
      }
      continue;
    }
    if (close) {
      stack.pop();
      continue;
    }
    const attrs = attrsOf(raw);
    const inherited = [...stack].reverse().find((e) => e.container) || {};
    const map = new Map(attrs);
    if (CONTAINERS.has(tag)) {
      if (tag === 'svg') out.push(record(tag, attrs, inherited));
      if (!self) stack.push({ container: true, fill: map.get('fill') || inherited.fill, stroke: map.get('stroke') || inherited.stroke });
      continue;
    }
    if (!self) stack.push({ container: false });
    if (!SHAPES.has(tag)) continue;
    if (tag === 'path' && map.has('d')) {
      for (const d of canon(map.get('d')).match(/M[^M]*/g) || []) {
        const copy = new Map(map);
        copy.set('d', d.trim());
        out.push(record(tag, [...copy], inherited));
      }
    } else out.push(record(tag, attrs, inherited));
  }
  return out;
}

function diff(before, after) {
  const count = (list) => list.reduce((m, s) => m.set(s, (m.get(s) || 0) + 1), new Map());
  const a = count(before);
  const b = count(after);
  const removed = [];
  const added = [];
  for (const [s, c] of a) for (let i = 0; i < c - (b.get(s) || 0); i += 1) removed.push(s);
  for (const [s, c] of b) for (let i = 0; i < c - (a.get(s) || 0); i += 1) added.push(s);
  return { removed, added };
}

function hero(html) {
  const a = html.indexOf('<!-- world:hero -->');
  const b = html.indexOf('<!-- /world:hero -->');
  return a < 0 || b < 0 ? '' : html.slice(a, b);
}

execFileSync('git', ['rev-parse', '--verify', rev]);
const exists = (path) => { try { execFileSync('git', ['cat-file', '-e', `${rev}:${path}`], { stdio: 'ignore' }); return true; } catch { return false; } };
const show = (path) => execFileSync('git', ['show', `${rev}:${path}`], { encoding: 'utf8', maxBuffer: 64 << 20 });
const files = readdirSync(join(root, 'world')).filter((f) => f.endsWith('-still.svg')).sort();
const targets = files.map((f) => { const fresh = !exists(`world/${f}`); return [`world/${f}`, fresh ? '' : show(`world/${f}`), readFileSync(join(root, 'world', f), 'utf8'), fresh]; });
targets.push(['index.html world:hero', hero(show('index.html')), hero(readFileSync(join(root, 'index.html'), 'utf8')), false]);

let bad = 0;
const excused = new Map();
for (const [name, before, after, fresh] of targets) {
  const { removed, added } = diff(shapes(before), shapes(after));
  const blocked = removed.filter((s) => {
    if (allowed(s)) return false;
    for (const r of active) {
      if (r.on && r.files.includes(name) && r.allow.some((re) => re.test(s))) {
        excused.set(r.name, (excused.get(r.name) || 0) + 1);
        return false;
      }
    }
    return true;
  });
  bad += blocked.length;
  const note = removed.length ? ` (${removed.length - blocked.length} allowed)` : '';
  console.log(`${name}  ${fresh ? 'new  ' : ''}removed ${removed.length}${note}  added ${added.length}`);
  for (const s of blocked.slice(0, 3)) console.log(`  ! ${s.slice(0, 180)}`);
}
for (const r of active) if (r.on) console.log(`reviewed: ${r.name} excused ${excused.get(r.name) || 0} shape(s)`);
console.log(`${rev} -> working tree: ${bad} unallowed removed or changed shape(s)`);
process.exit(bad ? 1 : 0);
