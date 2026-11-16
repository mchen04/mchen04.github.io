import { rng, n, rect, circle, fill, skyline, LIGHTS } from './kit.mjs';

const W = 2400;
const H = 600;
const MOON = { x: 1660, y: 132, r: 44 };
const PEAK = { x: 1200, y: 318 };

function profile(r, anchors, rough, depth) {
  let list = anchors.map(([x, y]) => [x, y]);
  for (let d = 0; d < depth; d += 1) {
    const next = [list[0]];
    for (let i = 1; i < list.length; i += 1) {
      const [x0, y0] = list[i - 1];
      const [x1, y1] = list[i];
      const span = x1 - x0;
      next.push([(x0 + x1) / 2 + r.range(-0.12, 0.12) * span, (y0 + y1) / 2 + r.range(-1, 1) * span * rough], [x1, y1]);
    }
    list = next;
    rough *= 0.55;
  }
  return list;
}

const toPath = (list, base) => `M${n(list[0][0])} ${n(base)}${list.map(([x, y]) => `L${n(x)} ${n(y)}`).join('')}L${n(list[list.length - 1][0])} ${n(base)}Z`;

function moonlit(list, minLen = 6) {
  const segs = [];
  for (let i = 1; i < list.length; i += 1) {
    const [x0, y0] = list[i - 1];
    const [x1, y1] = list[i];
    const mid = (x0 + x1) / 2;
    const facing = mid < MOON.x ? y1 > y0 - 0.5 : y1 < y0 + 0.5;
    if (facing && Math.hypot(x1 - x0, y1 - y0) > minLen * 0.2) segs.push(`M${n(x0)} ${n(y0)}L${n(x1)} ${n(y1)}`);
  }
  return segs.join('');
}

function range(r, id, { anchors, rough, depth, base, top, bottom, rim, rimOpacity, haze, snow }) {
  const list = profile(r, anchors, rough, depth);
  let cap = '';
  if (snow) {
    const ridgeAt = (x) => {
      for (let i = 1; i < list.length; i += 1) if (list[i][0] >= x) {
        const [x0, y0] = list[i - 1];
        const [x1, y1] = list[i];
        return y0 + ((y1 - y0) * (x - x0)) / Math.max(1, x1 - x0);
      }
      return list[list.length - 1][1];
    };
    const edge = [];
    let walk = 0;
    let drift = 0;
    for (let x = -20; x <= W + 20; x += 8) {
      const ry = ridgeAt(x);
      const depth = Math.max(0, snow.y - ry) * 1.3;
      drift = Math.max(-1.6, Math.min(1.6, drift + r.range(-0.7, 0.7)));
      walk = Math.max(-10, Math.min(10, walk + drift));
      edge.push([x, depth <= 0 ? ry - 2 : ry + depth + walk * Math.min(1, depth / 24)]);
    }
    cap = `<defs><clipPath id="${id}-clip"><path d="${toPath(list, base)}"/></clipPath></defs>`
      + `<path clip-path="url(#${id}-clip)" d="M-20 0${edge.map(([x, y]) => `L${n(x)} ${n(y)}`).join('')}L${W + 20} 0Z" fill="${snow.color}" opacity="${snow.opacity}"/>`;
  }
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".7" stop-color="${bottom}"/><stop offset="1" stop-color="${haze || bottom}"/></linearGradient></defs>`
    + `<path d="${toPath(list, base)}" fill="url(#${id})"/>`
    + cap
    + `<path d="${moonlit(list)}" fill="none" stroke="${rim}" stroke-width="1.4" stroke-linecap="round" opacity="${rimOpacity}"/>`;
}

function sky(r) {
  const out = [];
  out.push(`<defs><filter id="obs-blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="38"/></filter>`
    + `<radialGradient id="obs-moonglow"><stop offset="0" stop-color="#f3e6c8" stop-opacity=".34"/><stop offset=".35" stop-color="#d9c6c0" stop-opacity=".12"/><stop offset="1" stop-color="#d9c6c0" stop-opacity="0"/></radialGradient>`
    + `<linearGradient id="obs-afterglow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c47a6e" stop-opacity="0"/><stop offset="1" stop-color="#d58a6e" stop-opacity=".42"/></linearGradient></defs>`);
  out.push(`<g filter="url(#obs-blur)" opacity=".5"><ellipse cx="760" cy="150" rx="900" ry="60" transform="rotate(-14 760 150)" fill="#8d83b8" opacity=".35"/><ellipse cx="640" cy="170" rx="520" ry="34" transform="rotate(-14 640 170)" fill="#c9b8d6" opacity=".25"/></g>`);
  out.push(rect(0, 250, W, 230, ' fill="url(#obs-afterglow)"'));
  const tiers = [[], [], []];
  for (let i = 0; i < 300; i += 1) {
    const band = r.chance(0.35);
    const x = r.range(0, W);
    const y = band ? 150 - (x - 760) * 0.25 + r.range(-70, 70) : r.range(4, 330) ** 1.08 / 1.4;
    if (y < 2 || y > 340) continue;
    if (Math.hypot(x - MOON.x, y - MOON.y) < MOON.r * 2.4) continue;
    const size = r.chance(0.08) ? r.range(1.5, 2.1) : r.range(0.6, 1.3);
    const fade = y > 230 ? 2 : y > 140 ? 1 : 0;
    tiers[Math.min(2, fade + (size < 0.9 ? 1 : 0))].push(circle(x, y, size));
  }
  out.push(`<g fill="#f4ead6">${tiers.map((list, i) => `<g opacity="${[0.95, 0.62, 0.34][i]}">${list.join('')}</g>`).join('')}</g>`);
  out.push(circle(MOON.x, MOON.y, 330, ' fill="url(#obs-moonglow)"'));
  const { x, y, r: mr } = MOON;
  out.push(`<defs><mask id="obs-crescent"><rect width="${W}" height="${H}" fill="#000"/>${circle(x, y, mr, ' fill="#fff"')}${circle(x - mr * 0.42, y - mr * 0.12, mr * 0.96, ' fill="#000"')}</mask>`
    + `<radialGradient id="obs-moonface" cx=".7" cy=".35" r=".8"><stop offset="0" stop-color="#fffaf0"/><stop offset=".6" stop-color="#f3e6c8"/><stop offset="1" stop-color="#d8c7a6"/></radialGradient></defs>`);
  out.push(circle(x, y, mr, ' fill="#3a3658" opacity=".55"'));
  out.push(`<g mask="url(#obs-crescent)">${circle(x, y, mr, ' fill="url(#obs-moonface)"')}<g fill="#cdbb98" opacity=".45">${circle(x + 26, y - 14, 6)}${circle(x + 30, y + 12, 8)}${circle(x + 18, y + 30, 4)}</g></g>`);
  return out.join('');
}

function conifer(x, base, h, color) {
  const w = h * 0.36;
  return `<path d="M${n(x)} ${n(base - h)}L${n(x + w * 0.55)} ${n(base - h * 0.55)}L${n(x + w * 0.32)} ${n(base - h * 0.55)}L${n(x + w)} ${n(base - h * 0.08)}L${n(x + 1.2)} ${n(base - h * 0.08)}V${n(base)}H${n(x - 1.2)}V${n(base - h * 0.08)}L${n(x - w)} ${n(base - h * 0.08)}L${n(x - w * 0.32)} ${n(base - h * 0.55)}L${n(x - w * 0.55)} ${n(base - h * 0.55)}Z" fill="${color}"/>`;
}

function summit(r) {
  const out = [];
  const left = profile(r, [[560, 600], [720, 566], [850, 520], [950, 462], [1010, 410], [1046, 366], [1066, PEAK.y + 22]], 0.09, 4);
  const right = profile(r, [[1334, PEAK.y + 22], [1356, 352], [1392, 384], [1470, 420], [1540, 470], [1650, 528], [1780, 572], [1900, 600]], 0.09, 4);
  const outline = [...left, [1060, PEAK.y + 12], [1340, PEAK.y + 12], ...right];
  out.push(`<defs><linearGradient id="obs-hill" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1d1930"/><stop offset=".45" stop-color="#28223d"/><stop offset=".6" stop-color="#3a3054"/><stop offset="1" stop-color="#2e2745"/></linearGradient>`
    + `<linearGradient id="obs-hill-fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16131f" stop-opacity="0"/><stop offset="1" stop-color="#16131f" stop-opacity=".6"/></linearGradient>`
    + `<clipPath id="obs-hill-clip"><path d="${toPath(outline, H)}"/></clipPath></defs>`);
  out.push(`<path d="${toPath(outline, H)}" fill="url(#obs-hill)"/>`);
  out.push('<g clip-path="url(#obs-hill-clip)">');
  out.push(`<defs><linearGradient id="obs-face" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6b5b8e" stop-opacity=".28"/><stop offset="1" stop-color="#6b5b8e" stop-opacity="0"/></linearGradient><filter id="obs-soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="22"/></filter></defs>`);
  out.push(`<path d="M1334 ${PEAK.y + 22}L1356 352L1392 384L1470 420L1540 470L1650 528L1780 572L1900 600H1420Q1320 470 1334 ${PEAK.y + 22}Z" fill="url(#obs-face)" filter="url(#obs-soft)"/>`);
  const road = 'M960 604Q1150 560 1250 528Q1300 512 1240 494Q1130 470 1120 452Q1112 432 1200 414Q1280 396 1268 380Q1256 364 1186 356Q1150 350 1170 340';
  out.push(`<path d="${road}" fill="none" stroke="#5e4e74" stroke-width="3" stroke-linecap="round" opacity=".75"/>`);
  out.push(`<path d="${road}" fill="none" stroke="#1d1830" stroke-width="1" stroke-linecap="round" opacity=".5" transform="translate(0 2)"/>`);
  const lamps = [[1250, 522], [1126, 446], [1268, 374], [1176, 344]];
  out.push(`<g fill="#ffcf7e" opacity=".25">${lamps.map(([x, y]) => circle(x, y - 5, 5)).join('')}</g><g fill="#ffd994">${lamps.map(([x, y]) => circle(x, y - 5, 1.6)).join('')}</g>`);
  out.push(rect(0, 520, W, 84, ' fill="url(#obs-hill-fade)"'));
  out.push('</g>');
  out.push(`<path d="${moonlit(outline)}" fill="none" stroke="#a594c6" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`);
  const trees = [];
  const groves = [[720, 560], [820, 540], [900, 500], [960, 560], [1480, 470], [1560, 520], [1640, 556], [1720, 580], [1420, 540]];
  for (const [gx, gy] of groves) {
    const count = r.int(5, 11);
    for (let i = 0; i < count; i += 1) {
      const x = gx + r.range(-46, 46);
      const edge = outline.reduce((best, p) => (Math.abs(p[0] - x) < Math.abs(best[0] - x) ? p : best), outline[0]);
      const y = Math.max(gy + r.range(-16, 16), edge[1] + 10);
      if (y > 604) continue;
      trees.push([y, conifer(x, y, r.range(12, 22) * (0.75 + (y - 440) / 400), x < PEAK.x ? '#18142a' : '#211b33')]);
    }
  }
  trees.sort((a, b) => a[0] - b[0]);
  out.push(trees.map(([, t]) => t).join(''));
  return out.join('');
}

function building() {
  const B = LIGHTS.dusk.brass;
  const warm = '#ffcf7e';
  const out = [];
  const cx = PEAK.x;
  const ground = PEAK.y + 2;
  const drum = { x0: cx - 58, x1: cx + 58, top: 236 };
  const dome = { cx, cy: drum.top - 4, r: 64 };
  const phi = -0.16;
  const hw = 13;
  out.push(`<defs>`
    + `<linearGradient id="obs-wall" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#241e36"/><stop offset=".55" stop-color="#3a3052"/><stop offset=".85" stop-color="#57496f"/><stop offset="1" stop-color="#4a3d62"/></linearGradient>`
    + `<radialGradient id="obs-dome" cx=".72" cy=".2" r="1"><stop offset="0" stop-color="#a596bd"/><stop offset=".35" stop-color="#6c5d8a"/><stop offset=".75" stop-color="#3a3052"/><stop offset="1" stop-color="#241e36"/></radialGradient>`
    + `<linearGradient id="obs-slit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2238"/><stop offset=".6" stop-color="#6b4a3e"/><stop offset="1" stop-color="#e7a95f"/></linearGradient>`
    + `<linearGradient id="obs-tube" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6c5d8a"/><stop offset=".45" stop-color="#3a3052"/><stop offset="1" stop-color="#1c1729"/></linearGradient>`
    + `<radialGradient id="obs-spill" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${warm}" stop-opacity=".5"/><stop offset="1" stop-color="${warm}" stop-opacity="0"/></radialGradient>`
    + `</defs>`);
  out.push(circle(cx, 262, 130, ' fill="url(#obs-spill)" opacity=".55"'));
  out.push(`<path d="M${cx - 152} ${ground - 10}H${cx + 152}L${cx + 146} ${ground + 18}H${cx - 146}Z" fill="#2a2340"/>`);
  const courses = [];
  for (let y = ground - 2; y < ground + 18; y += 7) courses.push(`M${cx - 150} ${y}H${cx + 150}`);
  for (let i = 0; i < 26; i += 1) { const y = ground - 2 + (i % 3) * 7; courses.push(`M${cx - 146 + i * 11.6 + (i % 3) * 4} ${y}v7`); }
  out.push(`<path d="${courses.join('')}" stroke="#1d1829" stroke-width="1" opacity=".55"/>`);
  out.push(rect(cx - 152, ground - 10, 304, 1.8, fill('#b8a6d0', ' opacity=".6"')));
  out.push(`<path d="M${cx + 152} ${ground - 10}L${cx + 146} ${ground + 18}" stroke="#9d8cbc" stroke-width="1.2" opacity=".6"/>`);
  const posts = [];
  for (let x = cx - 146; x <= cx + 146; x += 12) posts.push(rect(x, ground - 24, 1.6, 14));
  out.push(`<g fill="#2c2540">${posts.join('')}${rect(cx - 148, ground - 25, 296, 2.4)}</g>`);
  out.push(rect(cx - 132, 268, 68, ground - 10 - 268, fill('#2a2340')), rect(cx - 136, 262, 76, 7, fill('#352c4c')));
  out.push(`<path d="M${cx - 124} 262A26 26 0 0 1 ${cx - 72} 262Z" fill="url(#obs-dome)"/>`);
  out.push(`<path d="M${cx - 98} 236A6 26 0 0 1 ${cx - 92} 262" fill="none" stroke="#1d1829" stroke-width="1.6" opacity=".6"/>`);
  out.push(`<path d="${`M${n(cx - 98 + 26 * Math.cos(-1.2))} ${n(262 + 26 * Math.sin(-1.2))}`}A26 26 0 0 1 ${n(cx - 98 + 26 * Math.cos(-0.15))} ${n(262 + 26 * Math.sin(-0.15))}" fill="none" stroke="#e6dcf2" stroke-width="1.2" opacity=".5"/>`);
  out.push(`<g fill="${warm}">${rect(cx - 122, 280, 9, 14, ' rx="1"')}${rect(cx - 104, 280, 9, 14, ' rx="1"')}${rect(cx - 86, 280, 9, 14, ' rx="1"')}</g>`);
  out.push(rect(cx + 64, 274, 70, ground - 10 - 274, fill('#3d3256')), rect(cx + 60, 268, 78, 7, fill('#4f4268')), rect(cx + 60, 268, 78, 1.4, fill('#b8a6d0', ' opacity=".7"')));
  out.push(`<g fill="${warm}">${rect(cx + 76, 284, 10, 16, ' rx="1"')}${rect(cx + 112, 284, 10, 16, ' rx="1"')}</g>`);
  out.push(rect(cx + 120, 248, 6, 22, fill('#3d3256')));
  out.push(rect(drum.x0, drum.top, drum.x1 - drum.x0, ground - 10 - drum.top, ' fill="url(#obs-wall)"'));
  out.push(rect(drum.x0 - 6, drum.top - 6, drum.x1 - drum.x0 + 12, 8, fill('#4a3d62')), rect(drum.x0 - 6, drum.top - 6, drum.x1 - drum.x0 + 12, 1.4, fill('#c9b7dd', ' opacity=".55"')));
  out.push(rect(drum.x0 - 4, 284, drum.x1 - drum.x0 + 8, 4, fill('#2c2540')));
  const arch = (x, y, w, h) => `<path d="M${n(x)} ${n(y + h)}V${n(y + w / 2)}A${n(w / 2)} ${n(w / 2)} 0 0 1 ${n(x + w)} ${n(y + w / 2)}V${n(y + h)}Z"/>`;
  out.push(`<g fill="${warm}">${arch(cx - 44, 248, 11, 26)}${arch(cx + 33, 248, 11, 26)}${arch(cx - 9, 290, 18, ground - 10 - 290)}</g>`);
  out.push(`<g fill="#ffe2a8" opacity=".55">${rect(cx - 9, ground - 12, 18, 3)}</g>`);
  out.push(`<path d="M${cx + 52} ${drum.top}V${ground - 10}" stroke="#c9b7dd" stroke-width="1.2" opacity=".5"/>`);
  const { cx: dx, cy: dy, r: dr } = dome;
  const domePath = `M${dx - dr} ${dy}A${dr} ${dr} 0 0 1 ${dx + dr} ${dy}Z`;
  const slitPts = (sign) => {
    const list = [];
    for (let i = 0; i <= 12; i += 1) {
      const t = (i / 12) * (Math.PI / 2);
      const x = dx + dr * Math.sin(phi) * Math.cos(t) + sign * hw * Math.cos(phi);
      const y = dy - dr * Math.sin(t);
      list.push([x, y]);
    }
    return list;
  };
  const leftEdge = slitPts(-1);
  const rightEdge = slitPts(1).reverse();
  const slitPath = `M${[...leftEdge, ...rightEdge].map(([x, y]) => `${n(x)} ${n(y)}`).join('L')}Z`;
  out.push(`<defs><clipPath id="obs-dome-clip"><path d="${domePath}"/></clipPath>`
    + `<mask id="obs-tube-mask"><rect width="${W}" height="${H}" fill="#fff"/><path d="${domePath}" fill="#000"/><path d="${slitPath}" fill="#fff"/></mask></defs>`);
  out.push(`<path d="${domePath}" fill="url(#obs-dome)"/>`);
  const ribs = [];
  for (const f of [-1.15, -0.75, -0.38, 0.38, 0.75, 1.15]) {
    const rx = Math.abs(dr * Math.sin(f));
    ribs.push(`M${n(dx + dr * Math.sin(f))} ${dy}A${n(rx)} ${dr} 0 0 ${f < 0 ? 1 : 0} ${dx} ${dy - dr}`);
  }
  out.push(`<path d="${ribs.join('')}" fill="none" stroke="#1d1829" stroke-width="1.1" opacity=".45" clip-path="url(#obs-dome-clip)"/>`);
  out.push(`<path d="M${dx - dr * 0.97} ${dy - 14}A${dr} 18 0 0 0 ${dx + dr * 0.97} ${dy - 14}" fill="none" stroke="#1d1829" stroke-width="1" opacity=".35"/>`);
  out.push(`<g clip-path="url(#obs-dome-clip)"><path d="${slitPath}" fill="url(#obs-slit)"/></g>`);
  const shutter = slitPts(1).map(([x, y]) => [x + 5, y]);
  out.push(`<path d="M${shutter.map(([x, y]) => `${n(x)} ${n(y)}`).join('L')}" fill="none" stroke="#b8a6d0" stroke-width="2.2" opacity=".75" clip-path="url(#obs-dome-clip)"/>`);
  out.push(`<path d="M${leftEdge.map(([x, y]) => `${n(x)} ${n(y)}`).join('L')}" fill="none" stroke="#17131f" stroke-width="2" opacity=".6" clip-path="url(#obs-dome-clip)"/>`);
  out.push(`<path d="${`M${dx + dr * Math.cos(-1.25)} ${dy + dr * Math.sin(-1.25)}`}A${dr} ${dr} 0 0 1 ${n(dx + dr * Math.cos(-0.2))} ${n(dy + dr * Math.sin(-0.2))}" fill="none" stroke="#e6dcf2" stroke-width="1.6" opacity=".55"/>`);
  out.push(rect(dx - dr - 3, dy - 2, dr * 2 + 6, 5, fill('#4a3d62')));
  const pivot = [dx + dr * Math.sin(phi) * 0.95 + 2, dy - 14];
  const angle = -78;
  const tube = `<g transform="translate(${n(pivot[0])} ${n(pivot[1])}) rotate(${angle})">`
    + rect(0, -10, 86, 20, ' fill="url(#obs-tube)" rx="2"')
    + rect(82, -12.5, 22, 25, fill('#2c2540', ' rx="2"'))
    + rect(82, -12.5, 22, 2.8, fill('#8c7cab'))
    + rect(36, -11.5, 8, 23, fill(B.base))
    + rect(36, -11.5, 8, 3, fill(B.light))
    + rect(50, 10.5, 28, 5, fill('#2c2540', ' rx="1.5"'))
    + rect(6, -10, 76, 2, fill('#b8a6d0', ' opacity=".6"'))
    + '</g>';
  out.push(`<g mask="url(#obs-tube-mask)">${tube}</g>`);
  out.push(`<path d="M${cx + 64} ${ground - 10}H${cx + 134}" stroke="#16131f" stroke-width="1" opacity=".5"/>`);
  return out.join('');
}

function foothills(r) {
  const L = LIGHTS.dusk;
  const out = [];
  out.push(skyline(r, { x0: -20, x1: 760, base: 600, hMin: 46, hMax: 128, cap: (mx) => (mx > 620 ? 64 : 140), wMin: 40, wMax: 84, s: L.layers.near, sunX: MOON.x, detail: 4, dark: true, roofs: ['gable', 'gable', 'mansard', 'flat', 'gable', 'stepped'], gap: [-6, 0] }));
  out.push(skyline(r, { x0: 1660, x1: W + 20, base: 600, hMin: 46, hMax: 128, cap: (mx) => (mx < 1800 ? 64 : 140), wMin: 40, wMax: 84, s: L.layers.near, sunX: MOON.x, detail: 4, dark: true, roofs: ['gable', 'gable', 'mansard', 'flat', 'gable', 'stepped'], gap: [-6, 0] }));
  return out.join('');
}

export function observatory() {
  const r = rng(202);
  const L = LIGHTS.dusk;
  const out = [];
  out.push(sky(r));
  out.push(range(r, 'obs-r1', {
    anchors: [[-20, 410], [170, 318], [300, 356], [420, 330], [560, 352], [660, 276], [820, 330], [940, 352], [1080, 318], [1300, 340], [1420, 312], [1540, 262], [1700, 330], [1820, 318], [1900, 292], [1990, 336], [2090, 314], [2160, 280], [2260, 338], [2340, 306], [2420, 350]],
    rough: 0.2, depth: 5, snow: { y: 322, color: '#a493be', opacity: 0.6 }, base: 600, top: '#5c4c74', bottom: '#6f5878', haze: '#8a6a80', rim: '#cbb8dc', rimOpacity: 0.45,
  }));
  out.push(`<defs><linearGradient id="obs-mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a77e8c" stop-opacity="0"/><stop offset=".6" stop-color="#a77e8c" stop-opacity=".38"/><stop offset="1" stop-color="#a77e8c" stop-opacity="0"/></linearGradient></defs>`);
  out.push(`<g class="pl-fog">${rect(-80, 360, W + 160, 90, ' fill="url(#obs-mist)"')}</g>`);
  out.push(range(r, 'obs-r2', {
    anchors: [[-20, 450], [240, 392], [520, 430], [760, 380], [980, 440], [1440, 436], [1640, 384], [1900, 420], [2140, 376], [2420, 430]],
    rough: 0.13, depth: 5, base: 600, top: '#3f3558', bottom: '#4a3d5f', haze: '#6a5170', rim: '#a996c2', rimOpacity: 0.5,
  }));
  const valley = [];
  for (let i = 0; i < 140; i += 1) {
    const x = r.chance(0.5) ? r.range(0, 860) : r.range(1540, W);
    const y = r.range(470, 500);
    valley.push(rect(x, y, r.range(1.6, 3), r.range(1.6, 2.4)));
  }
  out.push(`<g fill="#f3c47c" opacity=".75">${valley.join('')}</g>`);
  out.push(rect(0, 470, W, 40, ' fill="url(#obs-mist)"'));
  out.push(summit(r));
  out.push(building());
  out.push(foothills(r));
  return out.join('');
}
