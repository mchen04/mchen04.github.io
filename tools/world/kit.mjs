export function rng(seed) {
  let a = seed >>> 0;
  const next = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  next.range = (lo, hi) => lo + next() * (hi - lo);
  next.int = (lo, hi) => Math.floor(next.range(lo, hi + 1));
  next.pick = (list) => list[Math.floor(next() * list.length)];
  next.chance = (p) => next() < p;
  return next;
}

export const n = (v) => {
  const r = Math.round(v * 10) / 10;
  return Object.is(r, -0) ? '0' : String(r);
};

export const hash = (a, b = 0) => {
  let h = (Math.imul(Math.round(a * 8) | 0, 0x9e3779b1) ^ (Math.round(b * 8) | 0)) >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x21f0aaad) >>> 0;
  h = Math.imul(h ^ (h >>> 15), 0x735a2d97) >>> 0;
  return ((h ^ (h >>> 15)) >>> 0) / 4294967296;
};

export const pts = (list) => list.map(([x, y]) => `${n(x)} ${n(y)}`).join(' ');

export const poly = (list, attrs = '') => `<path d="M${pts(list)}Z"${attrs}/>`;

export const rect = (x, y, w, h, attrs = '') =>
  `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"${attrs}/>`;

export const circle = (cx, cy, r, attrs = '') => `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}"${attrs}/>`;

export const fill = (c, extra = '') => ` fill="${c}"${extra}`;

export const line = (x1, y1, x2, y2, attrs = '') =>
  `<path d="M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}"${attrs}/>`;

export const arc = (cx, cy, r, a0, a1) => {
  const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  const large = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
  return `M${n(x0)} ${n(y0)}A${n(r)} ${n(r)} 0 ${large} 1 ${n(x1)} ${n(y1)}`;
};

export const LIGHTS = {
  gold: {
    sky: ['#f6ecd8', '#f4dfb8', '#f0c48f', '#e8a57c'],
    sun: { core: '#fff8e6', disc: '#fbe6b0', halo: '#ffe2a6', edge: '#f2c27c' },
    water: ['#f1c590', '#e3a27f', '#c98a7f'],
    glint: '#fff3cf',
    cloud: { body: '#fbf0dd', shade: '#f0c9a2', rim: '#fff8ea' },
    ink: '#2a2433',
    layers: {
      far: { body: '#deae95', shade: '#d6a38f', rim: '#f6d6a6', win: '#fbe2ac', lit: 0.12, flag: '#cf9585' },
      mid: { body: '#a3828c', shade: '#937482', rim: '#f8cf8e', win: '#ffdc92', lit: 0.2, flag: '#a8574a' },
      near: { body: '#4b3d55', shade: '#3f334a', rim: '#efb46c', win: '#ffd283', lit: 0.32, flag: '#8e3a2e' },
      front: { body: '#251f2c', shade: '#1c1722', rim: '#e9b066', win: '#ffd283', lit: 0.4 },
    },
    brass: { base: '#b98a45', light: '#f1d38f', dark: '#7d5527', glow: '#ffe6ad' },
    gilt: '#c9a161',
  },
  dusk: {
    sky: ['#1d2340', '#34325a', '#6d4d6e', '#c07a6a'],
    sun: { core: '#f8ecd0', disc: '#efe1c0', halo: '#cfc2a8', edge: '#d8c39b' },
    water: ['#5b4766', '#3a3352', '#262541'],
    glint: '#f6d9a0',
    cloud: { body: '#4c4466', shade: '#3a3453', rim: '#7a73a6' },
    ink: '#14121c',
    layers: {
      far: { body: '#4b3f62', shade: '#45395b', rim: '#8e6c80', win: '#f3c47c', lit: 0.3 },
      mid: { body: '#352d4b', shade: '#2f2843', rim: '#7d5d73', win: '#ffcf7e', lit: 0.45 },
      near: { body: '#231e33', shade: '#1e1a2c', rim: '#5c4560', win: '#ffc670', lit: 0.55 },
      front: { body: '#16131f', shade: '#110f19', rim: '#4b3a4f', win: '#ffc670', lit: 0.6 },
    },
    brass: { base: '#8f6d3e', light: '#e2bf7c', dark: '#4f3820', glow: '#ffd99a' },
    gilt: '#b8935a',
  },
};

function windows(r, x, y, w, h, s, size, dark) {
  const lit = [];
  const unlit = [];
  const flick = [];
  const late = [];
  const cw = size * 2.2;
  const ch = size * 3;
  const cols = Math.max(1, Math.floor((w - size) / cw));
  const rows = Math.max(1, Math.floor((h - size * 1.6) / ch));
  const padX = (w - cols * cw) / 2 + (cw - size) / 2;
  const density = r.range(0.3, 0.85);
  const arched = size >= 5 && r.chance(0.45);
  const hw = size / 2;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      if (!r.chance(density)) continue;
      const on = r.chance(s.lit);
      if (!on && !dark) continue;
      const wx = x + padX + col * cw;
      const wy = y + size * 1.2 + row * ch;
      const d = arched
        ? `M${n(wx)} ${n(wy + size * 1.5)}V${n(wy + hw)}a${n(hw)} ${n(hw)} 0 0 1 ${n(size)} 0V${n(wy + size * 1.5)}z`
        : `M${n(wx)} ${n(wy)}h${n(size)}v${n(size * 1.45)}h${n(-size)}z`;
      if (dark && r.chance(0.07)) flick.push(`<path class="flick" style="animation-delay:${n(-r.range(0, 40))}s;animation-duration:${n(r.range(14, 34))}s" d="${d}"/>`);
      else if (on && dark && s.late && hash(wx, wy) < s.late) late.push(`<path class="pl-on" style="animation-delay:${n(0.4 + hash(wy, wx) * 6.6)}s" d="${d}"/>`);
      else (on ? lit : unlit).push(d);
    }
  }
  return (unlit.length ? `<path d="${unlit.join('')}" fill="${s.shade}"/>` : '') + (lit.length ? `<path d="${lit.join('')}" fill="${s.win}"/>` : '')
    + (flick.length ? `<g fill="${s.win}">${flick.join('')}</g>` : '')
    + (late.length ? `<g fill="${s.win}">${late.join('')}</g>` : '');
}

const ROOFS = ['flat', 'gable', 'gable', 'mansard', 'spire', 'dome', 'cone', 'stepped', 'gable', 'onion', 'gable'];

export function building(r, { x, w, h, base, s, sunX, detail = 1, dark = false, roof = r.pick(ROOFS) }) {
  const top = base - h;
  const lit = x + w / 2 < sunX ? 'right' : 'left';
  const parts = [rect(x, top, w, h, fill(s.body))];
  let crown = top;
  const rim = [];
  const cx = x + w / 2;
  const pennant = (px, py, fw) => `<path class="pl-pennant" style="animation-duration:${n(0.62 + ((Math.abs(px) * 0.37) % 0.7))}s;animation-delay:${n(-((Math.abs(px) * 0.11) % 1.2))}s" d="M${n(px)} ${n(py)}L${n(px + fw)} ${n(py + fw * 0.22)}L${n(px)} ${n(py + fw * 0.44)}Z" fill="${s.flag || '#a8574a'}"/>`;
  if (roof === 'gable') {
    const rh = w * r.range(0.35, 0.6);
    parts.push(poly([[x - 2, top], [cx, top - rh], [x + w + 2, top]], fill(s.body)));
    crown = top - rh;
    rim.push(lit === 'right' ? line(cx, top - rh, x + w + 2, top) : line(x - 2, top, cx, top - rh));
  } else if (roof === 'mansard') {
    const rh = w * 0.32;
    parts.push(poly([[x - 2, top], [x + w * 0.16, top - rh], [x + w * 0.84, top - rh], [x + w + 2, top]], fill(s.shade)));
    crown = top - rh;
    rim.push(line(x + w * 0.16, top - rh, x + w * 0.84, top - rh));
  } else if (roof === 'spire') {
    const rh = w * r.range(1.4, 2.4);
    parts.push(poly([[x + w * 0.08, top], [cx, top - rh], [x + w * 0.92, top]], fill(s.body)));
    parts.push(line(cx, top - rh, cx, top - rh - w * 0.35, ` stroke="${s.body}" stroke-width="${n(Math.max(1, w * 0.05))}"`));
    crown = top - rh;
    rim.push(lit === 'right' ? line(cx, top - rh, x + w * 0.92, top) : line(x + w * 0.08, top, cx, top - rh));
  } else if (roof === 'dome') {
    const rr = w * 0.42;
    parts.push(`<path d="M${n(cx - rr)} ${n(top)}A${n(rr)} ${n(rr * 1.05)} 0 0 1 ${n(cx + rr)} ${n(top)}Z" fill="${s.body}"/>`);
    parts.push(rect(cx - w * 0.04, top - rr * 1.05 - w * 0.22, w * 0.08, w * 0.22, fill(s.body)));
    crown = top - rr;
    rim.push(`<path d="${lit === 'right' ? arc(cx, top, rr, -Math.PI / 2, -0.15) : arc(cx, top, rr, -Math.PI + 0.15, -Math.PI / 2)}"/>`);
  } else if (roof === 'onion') {
    const b = w * 0.36;
    const t = top - w * 0.12;
    parts.push(rect(cx - b * 0.8, t, b * 1.6, w * 0.12, fill(s.body)));
    parts.push(`<path d="M${n(cx - b * 0.8)} ${n(t)}C${n(cx - b * 1.7)} ${n(t - b * 1.1)} ${n(cx - b * 0.3)} ${n(t - b * 1.9)} ${n(cx)} ${n(t - b * 2.7)}C${n(cx + b * 0.3)} ${n(t - b * 1.9)} ${n(cx + b * 1.7)} ${n(t - b * 1.1)} ${n(cx + b * 0.8)} ${n(t)}Z" fill="${s.body}"/>`);
    crown = t - b * 2.7;
    rim.push(`<path d="M${n(cx)} ${n(t - b * 2.7)}C${n(cx + b * 0.3)} ${n(t - b * 1.9)} ${n(cx + b * 1.7)} ${n(t - b * 1.1)} ${n(cx + b * 0.8)} ${n(t)}"/>`);
  } else if (roof === 'cone') {
    const rh = w * 0.9;
    parts.push(poly([[x - 3, top], [cx, top - rh], [x + w + 3, top]], fill(s.shade)));
    crown = top - rh;
    rim.push(lit === 'right' ? line(cx, top - rh, x + w + 3, top) : line(x - 3, top, cx, top - rh));
  } else if (roof === 'stepped') {
    const sh = w * 0.18;
    parts.push(rect(x + w * 0.15, top - sh, w * 0.7, sh, fill(s.body)));
    parts.push(rect(x + w * 0.3, top - sh * 2, w * 0.4, sh, fill(s.body)));
    crown = top - sh * 2;
    rim.push(line(x + w * 0.3, top - sh * 2, x + w * 0.7, top - sh * 2));
  } else {
    parts.push(rect(x - 1.5, top - 3, w + 3, 3, fill(s.shade)));
    if (r.chance(0.5)) parts.push(rect(x + w * r.range(0.15, 0.7), top - w * 0.3, w * 0.1, w * 0.3, fill(s.body)));
  }
  if ((roof === 'spire' || roof === 'onion' || roof === 'cone') && r.chance(0.35)) {
    const mast = Math.max(6, w * 0.45);
    const fw = Math.max(5, w * 0.32);
    parts.push(line(cx, crown, cx, crown - mast, ` stroke="${s.body}" stroke-width="1.2"`));
    parts.push(pennant(cx, crown - mast, fw));
  }
  if ((roof === 'gable' || roof === 'mansard' || roof === 'flat') && r.chance(0.45)) {
    const cw = Math.max(3, w * 0.09);
    const chx = x + w * r.range(0.15, 0.75);
    parts.push(rect(chx, crown + (top - crown) * 0.4 - cw * 1.6, cw, cw * 2.2 + (top - crown) * 0.6, fill(s.body)));
  }
  if (detail > 0 && r.chance(0.8)) parts.push(windows(r, x, top, w, h - detail * 2.5, s, detail, dark));
  const edgeX = lit === 'right' ? x + w - 1 : x;
  parts.push(rect(edgeX, top, 1, h * 0.85, fill(s.rim, ' opacity=".7"')));
  if (rim.length) parts.push(`<g fill="none" stroke="${s.rim}" stroke-width="1.3" opacity=".85">${rim.join('')}</g>`);
  return { svg: parts.join(''), crown };
}

export function skyline(r, { x0, x1, base, hMin, hMax, wMin, wMax, s, sunX, detail = 0, dark = false, roofs, gap = [-4, 2], cap }) {
  const out = [];
  let x = x0;
  while (x < x1) {
    const w = r.range(wMin, wMax);
    let h = r.range(hMin, hMax);
    if (cap) h = Math.min(h, cap(x + w / 2));
    const roof = roofs ? r.pick(roofs) : undefined;
    out.push(building(r, { x, w, h, base, s, sunX, detail, dark, ...(roof ? { roof } : {}) }).svg);
    x += w + r.range(gap[0], gap[1]);
  }
  return out.join('');
}

export function ridge(r, { x0, x1, base, top, rough, step, color }) {
  const list = [[x0, base]];
  let y = top + r.range(-rough, rough);
  for (let x = x0; x <= x1; x += step) {
    y += r.range(-rough, rough) * 0.6;
    y = Math.min(base - 4, Math.max(top - rough, y));
    list.push([x, y]);
  }
  list.push([x1, base]);
  return poly(list, fill(color));
}

let cloudSeq = 0;
export function cloud(r, { x, y, w, h, c, lx = 0 }) {
  cloudSeq += 1;
  const id = `cu${cloudSeq}`;
  const puffs = [];
  const count = Math.max(4, Math.round(w / (h * 0.55)));
  for (let i = 0; i < count; i += 1) {
    const t = (i + 0.5) / count;
    const bell = Math.exp(-((t - r.range(0.4, 0.6)) ** 2) / 0.08);
    const rr = h * (0.28 + 0.52 * bell) * r.range(0.85, 1.12);
    puffs.push([x + w * t, y - rr * r.range(0.35, 0.6), rr]);
  }
  const shape = puffs.map(([px, py, pr]) => circle(px, py, pr)).join('') + rect(x + w * 0.04, y - h * 0.32, w * 0.92, h * 0.32, ` rx="${n(h * 0.16)}"`);
  const rim = puffs.map(([px, py, pr]) => circle(px + lx * pr * 0.1, py - pr * 0.1, pr)).join('');
  return `<defs><clipPath id="${id}">${shape}</clipPath></defs>`
    + `<g fill="${c.rim}">${rim}</g><g fill="${c.body}">${shape}</g>`
    + `<g clip-path="url(#${id})"><ellipse cx="${n(x + w * 0.5)}" cy="${n(y + h * 0.06)}" rx="${n(w * 0.56)}" ry="${n(h * 0.3)}" fill="${c.shade}" opacity=".55"/></g>`;
}

export function gear(cx, cy, r, teeth, attrs) {
  const list = [];
  const inner = r * 0.84;
  for (let i = 0; i < teeth; i += 1) {
    const a = (i / teeth) * Math.PI * 2;
    const da = (Math.PI * 2) / teeth;
    for (const [t, rr] of [[0, inner], [0.18, r], [0.5, r], [0.68, inner]]) {
      const aa = a + da * t;
      list.push([cx + rr * Math.cos(aa), cy + rr * Math.sin(aa)]);
    }
  }
  return poly(list, attrs);
}

export function baluster(x, top, bottom, w, color) {
  const h = bottom - top;
  const cx = x + w / 2;
  const d = [
    `M${n(x + w * 0.12)} ${n(top)}`,
    `H${n(x + w * 0.88)}V${n(top + h * 0.08)}`,
    `C${n(x + w * 0.62)} ${n(top + h * 0.14)} ${n(x + w * 0.6)} ${n(top + h * 0.26)} ${n(x + w * 0.62)} ${n(top + h * 0.3)}`,
    `C${n(x + w * 1.02)} ${n(top + h * 0.5)} ${n(x + w * 1.04)} ${n(top + h * 0.76)} ${n(x + w * 0.74)} ${n(top + h * 0.88)}`,
    `H${n(x + w * 0.9)}V${n(bottom)}H${n(x + w * 0.1)}V${n(top + h * 0.88)}H${n(x + w * 0.26)}`,
    `C${n(x - w * 0.04)} ${n(top + h * 0.76)} ${n(x - w * 0.02)} ${n(top + h * 0.5)} ${n(x + w * 0.38)} ${n(top + h * 0.3)}`,
    `C${n(x + w * 0.4)} ${n(top + h * 0.26)} ${n(x + w * 0.38)} ${n(top + h * 0.14)} ${n(x + w * 0.12)} ${n(top + h * 0.08)}Z`,
  ].join('');
  return `<path d="${d}" fill="${color}"/>${line(cx + w * 0.22, top + h * 0.36, cx + w * 0.3, top + h * 0.8, ' stroke="#e9b066" stroke-width="1.2" opacity=".55"')}`;
}

export function clockTowerShape({ cx, base, k = 1, body, face, gilt, rim, ink = '#2a2433', windows }) {
  const X = (dx) => n(cx + dx * k);
  const Y = (dy) => n(base - dy * k);
  const R = (x0, y0, w, hh) => `<rect x="${X(x0)}" y="${Y(y0 + hh)}" width="${n(w * k)}" height="${n(hh * k)}"/>`;
  const shape = [
    R(-50, 0, 100, 52), R(-42, 52, 84, 148), R(-37, 200, 74, 100), R(-34, 300, 68, 82), R(-44, 382, 88, 64), R(-47, 444, 94, 8),
    R(-32, 452, 64, 60), R(-36, 512, 72, 7),
    `<path d="M${X(-30)} ${Y(518)}L${X(0)} ${Y(640)}L${X(30)} ${Y(518)}Z"/>`,
    `<path d="M${X(-40)} ${Y(518)}L${X(-36)} ${Y(556)}L${X(-32)} ${Y(518)}ZM${X(32)} ${Y(518)}L${X(36)} ${Y(556)}L${X(40)} ${Y(518)}Z"/>`,
    R(-2, 636, 4, 40),
  ].join('');
  const cy = 413;
  const arches = [-21, 3].map((dx) => `<path d="M${X(dx)} ${Y(456)}V${Y(488)}A${n(9 * k)} ${n(9 * k)} 0 0 1 ${X(dx + 18)} ${Y(488)}V${Y(456)}Z"/>`).join('');
  const slits = [[360, 40], [280, 46], [180, 54]].map(([y0, hh]) => `<path d="M${X(-4)} ${Y(y0 - hh)}V${Y(y0 - 4)}A${n(4 * k)} ${n(4 * k)} 0 0 1 ${X(4)} ${Y(y0 - 4)}V${Y(y0 - hh)}Z"/>`).join('');
  return `<g fill="${body}">${shape}</g>`
    + `<g fill="${face}">${arches}</g><g fill="${windows || face}" opacity=".9">${slits}</g>`
    + `<circle cx="${X(0)}" cy="${Y(cy)}" r="${n(27 * k)}" fill="${face}" stroke="${gilt}" stroke-width="${n(3 * k)}"/>`
    + `<path d="M${X(0)} ${Y(cy)}V${Y(cy + 13)}M${X(0)} ${Y(cy)}L${X(14)} ${Y(cy - 6)}" stroke="${ink}" stroke-width="${n(2.4 * k)}" stroke-linecap="round"/>`
    + `<g fill="none" stroke="${rim}" stroke-width="${n(Math.max(1, 1.3 * k))}" opacity=".85"><path d="M${X(-30)} ${Y(518)}L${X(0)} ${Y(640)}L${X(30)} ${Y(518)}M${X(-42)} ${Y(52)}V${Y(200)}M${X(42)} ${Y(52)}V${Y(200)}"/></g>`
    + `<g fill="${gilt}"><circle cx="${X(0)}" cy="${Y(686)}" r="${n(4.5 * k)}"/><rect x="${X(-0.8)}" y="${Y(720)}" width="${n(1.6 * k)}" height="${n(34 * k)}"/></g>`;
}
