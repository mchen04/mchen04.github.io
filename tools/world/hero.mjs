import {
  rng, n, poly, rect, circle, fill, line, arc, LIGHTS, building, skyline, ridge, cloud,
  star8, gear, sunGlyph, crescent, diamond, baluster,
} from './kit.mjs';

export const SCENE = { w: 3200, h: 1000, horizon: 640, shore: 760 };
export const SUN = { x: 1880, y: 500, r: 150 };
export const TOWER = { x: 1800, base: 742, color: '#53405b' };
const LANDMARK = { body: '#614b66', shade: '#523f58', rim: '#ffd9a0', win: '#ffd98a', lit: 0.3 };

const L = LIGHTS.gold;
const svg = (cls, viewBox, body, extra = '') =>
  `<svg class="${cls}" viewBox="${viewBox}" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false"${extra}>${body}</svg>`;

function floatingIsle(r, x, y, w, s) {
  const rock = [[x, y]];
  const steps = 7;
  for (let i = 1; i < steps; i += 1) {
    const t = i / steps;
    rock.push([x + w * t, y + Math.sin(t * Math.PI) * w * r.range(0.45, 0.7)]);
  }
  rock.push([x + w, y]);
  const out = [poly(rock, fill(s.shade))];
  let bx = x + w * 0.12;
  while (bx < x + w * 0.85) {
    const bw = r.range(w * 0.08, w * 0.16);
    out.push(building(r, { x: bx, w: bw, h: r.range(w * 0.08, w * 0.3), base: y + 1, s, sunX: SUN.x, detail: 0, roof: r.pick(['spire', 'dome', 'gable', 'cone']) }).svg);
    bx += bw + r.range(0, 4);
  }
  out.push(line(x + 2, y, x + w - 2, y, ` stroke="${s.rim}" stroke-width="1.2" opacity=".8"`));
  return out.join('');
}

function aqueduct(x0, x1, top, base, span, s) {
  const out = [rect(x0, top, x1 - x0, 10, fill(s.body))];
  let d = `M${n(x0)} ${n(top + 10)}`;
  for (let x = x0; x < x1; x += span) {
    const pier = span * 0.22;
    d += `H${n(x + pier)}V${n(base - span * 0.2)}A${n((span - pier) / 2)} ${n((span - pier) / 2)} 0 0 1 ${n(x + span)} ${n(base - span * 0.2)}`;
  }
  out.push(`<path d="${d}V${n(base)}H${n(x0)}Z" fill="${s.body}"/>`);
  out.push(line(x0, top, x1, top, ` stroke="${s.rim}" stroke-width="1.2" opacity=".7"`));
  return out.join('');
}

function far(r) {
  const s = L.layers.far;
  const out = [];
  out.push(`<defs>
<radialGradient id="sun-disc" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="${L.sun.core}"/><stop offset=".55" stop-color="${L.sun.disc}"/><stop offset="1" stop-color="${L.sun.edge}"/></radialGradient>
<linearGradient id="bay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${L.water[0]}"/><stop offset=".55" stop-color="${L.water[1]}"/><stop offset="1" stop-color="${L.water[2]}"/></linearGradient>
<linearGradient id="haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${L.sky[3]}" stop-opacity="0"/><stop offset="1" stop-color="${L.sky[3]}" stop-opacity=".55"/></linearGradient>
</defs>`);
  const g = L.gilt;
  out.push(`<g fill="none" stroke="${g}" opacity=".55">${circle(SUN.x, SUN.y, 188, ' stroke-width="1.4"')}${circle(SUN.x, SUN.y, 236, ' stroke-width="1" stroke-dasharray="2 7"')}<ellipse cx="${SUN.x}" cy="${SUN.y}" rx="560" ry="150" transform="rotate(-13 ${SUN.x} ${SUN.y})" stroke-width="1" stroke-dasharray="1 6"/><ellipse cx="${SUN.x}" cy="${SUN.y}" rx="820" ry="240" transform="rotate(-13 ${SUN.x} ${SUN.y})" stroke-width=".8" stroke-dasharray="1 9" opacity=".7"/></g>`);
  out.push(`<g fill="${g}" opacity=".8">${circle(SUN.x - 545, SUN.y + 95, 5)}${circle(SUN.x + 420, SUN.y - 152, 7)}${circle(SUN.x + 760, SUN.y - 85, 3.5)}${circle(SUN.x - 700, SUN.y + 236, 4)}</g>`);
  out.push(circle(SUN.x, SUN.y, SUN.r, ' fill="url(#sun-disc)"'));
  out.push(circle(SUN.x, SUN.y, SUN.r + 6, ` fill="none" stroke="${L.sun.halo}" stroke-width="3" opacity=".6"`));
  out.push(`<g class="craters">${[[-52, -40, 26], [38, -62, 14], [60, 18, 30], [-30, 52, 18], [8, 10, 10], [-78, 20, 9]].map(([dx, dy, rr]) => circle(SUN.x + dx, SUN.y + dy, rr)).join('')}</g>`);
  out.push(floatingIsle(r, 1585, 318, 60, s));
  out.push(ridge(r, { x0: 0, x1: 3200, base: SCENE.horizon + 2, top: 585, rough: 16, step: 22, color: '#e8bb9a' }));
  out.push(ridge(r, { x0: 0, x1: 1500, base: SCENE.horizon + 2, top: 612, rough: 10, step: 18, color: s.shade }));
  out.push(ridge(r, { x0: 2300, x1: 3200, base: SCENE.horizon + 2, top: 606, rough: 12, step: 18, color: s.shade }));
  const mesa = [[700, 641], [760, 575], [820, 566], [1040, 562], [1110, 571], [1170, 641]];
  out.push(poly(mesa, fill(s.body)));
  out.push(skyline(r, { x0: 800, x1: 1100, base: 574, hMin: 12, hMax: 46, wMin: 10, wMax: 26, s, sunX: SUN.x, roofs: ['spire', 'spire', 'dome', 'cone', 'gable'], gap: [-3, 3] }));
  out.push(aqueduct(2560, 3000, 584, 641, 44, s));
  out.push(skyline(r, { x0: 0, x1: 700, base: 642, hMin: 8, hMax: 38, wMin: 10, wMax: 26, s, sunX: SUN.x }));
  out.push(skyline(r, { x0: 1170, x1: 1720, base: 642, hMin: 6, hMax: 30, wMin: 10, wMax: 24, s, sunX: SUN.x }));
  out.push(skyline(r, { x0: 2060, x1: 2560, base: 642, hMin: 8, hMax: 36, wMin: 10, wMax: 24, s, sunX: SUN.x }));
  out.push(skyline(r, { x0: 3000, x1: 3200, base: 642, hMin: 8, hMax: 36, wMin: 10, wMax: 24, s, sunX: SUN.x }));
  out.push(rect(0, SCENE.horizon, 3200, 360, ' fill="url(#bay)"'));
  out.push(rect(0, 560, 3200, 82, ' fill="url(#haze)"'));
  const streaks = [];
  for (let y = SCENE.horizon + 6; y < 820; y += r.range(5, 9)) {
    const k = (y - SCENE.horizon) / 180;
    const w = 30 + k * 220 * r.range(0.6, 1.2);
    const off = r.range(-30, 30) * k;
    streaks.push(rect(SUN.x - w / 2 + off, y, w, r.range(1.2, 2.4), ` opacity="${n(r.range(0.25, 0.7))}"`));
  }
  out.push(`<g fill="${L.glint}">${streaks.join('')}</g>`);
  return svg('flat far', '0 0 3200 1000', `<g class="shift">${out.join('')}</g>`);
}

function clockTower(s) {
  const { x: cx, base } = TOWER;
  const rim = '#ffe7b0';
  const shape = [
    rect(cx - 50, base - 52, 100, 52),
    rect(cx - 42, base - 200, 84, 150),
    rect(cx - 37, base - 300, 74, 102),
    rect(cx - 34, base - 382, 68, 84),
    rect(cx - 44, base - 446, 88, 66),
    rect(cx - 47, base - 452, 94, 8),
    rect(cx - 32, base - 512, 64, 62),
    rect(cx - 36, base - 518, 72, 7),
    poly([[cx - 30, base - 518], [cx, base - 640], [cx + 30, base - 518]]),
    rect(cx - 2, base - 676, 4, 40),
    poly([[cx - 40, base - 518], [cx - 36, base - 556], [cx - 32, base - 518]]),
    poly([[cx + 32, base - 518], [cx + 36, base - 556], [cx + 40, base - 518]]),
  ];
  const out = [`<g fill="${TOWER.color}">${shape.join('')}</g>`];
  out.push(star8(cx, base - 692, 11, fill(L.gilt)));
  const g = L.gilt;
  out.push(`<g fill="none" stroke="${g}" stroke-width="1.4">${line(cx - 42, base - 200, cx + 42, base - 200)}${line(cx - 37, base - 300, cx + 37, base - 300)}${line(cx - 50, base - 52, cx + 50, base - 52)}</g>`);
  out.push(crescent(cx - 3, base - 236, 8, g));
  out.push(`<g fill="${g}">${diamond(cx, base - 26, 6, 10, '')}${diamond(cx - 28, base - 26, 4, 7, '')}${diamond(cx + 28, base - 26, 4, 7, '')}</g>`);
  out.push(`<g fill="${L.sun.disc}">`
    + `<path d="M${cx - 21} ${base - 456}V${base - 488}A9 9 0 0 1 ${cx - 3} ${base - 488}V${base - 456}Z"/>`
    + `<path d="M${cx + 3} ${base - 456}V${base - 488}A9 9 0 0 1 ${cx + 21} ${base - 488}V${base - 456}Z"/></g>`);
  out.push(`<g fill="${s.shade}">${rect(cx - 12, base - 480, 24, 3)}</g>`);
  out.push(`<path d="M${cx - 47} ${base - 14}V${base - 30}a7 7 0 0 1 14 0V${base - 14}Z" fill="${L.layers.mid.win}"/><path d="M${cx - 47} ${base - 14}V${base - 30}a7 7 0 0 1 14 0V${base - 14}" fill="none" stroke="${L.gilt}" stroke-width="1.2"/>`);
  out.push(`<g fill="none" stroke="${L.gilt}" stroke-width="1.2"><path d="M${cx - 24} ${base - 453}V${base - 488}A12 12 0 0 1 ${cx} ${base - 488}A12 12 0 0 1 ${cx + 24} ${base - 488}V${base - 453}"/></g>`);
  out.push(`<g fill="${L.gilt}">${Array.from({ length: 9 }, (_, i) => circle(cx - 32 + i * 8, base - 376, 1.6)).join('')}${Array.from({ length: 7 }, (_, i) => circle(cx - 24 + i * 8, base - 296, 1.4)).join('')}</g>`);
  const cy = base - 413;
  const ticks = [];
  for (let i = 0; i < 12; i += 1) {
    const a = (i / 12) * Math.PI * 2;
    ticks.push(line(cx + 19 * Math.cos(a), cy + 19 * Math.sin(a), cx + 23 * Math.cos(a), cy + 23 * Math.sin(a)));
  }
  out.push(circle(cx, cy, 27, ` fill="${L.sun.disc}" stroke="${L.gilt}" stroke-width="3"`));
  out.push(`<g stroke="${s.shade}" stroke-width="1.6">${ticks.join('')}</g>`);
  out.push(`<g stroke="${L.ink}" stroke-linecap="round"><path id="clock-h" d="M${cx} ${cy}V${cy - 13}" stroke-width="3.2"/><path id="clock-m" d="M${cx} ${cy}V${cy - 20}" stroke-width="2"/></g>`);
  out.push(circle(cx, cy, 2.6, fill(L.ink)));
  const slits = [];
  for (const [y, h] of [[base - 360, 40], [base - 280, 46], [base - 180, 54]]) {
    slits.push(`<path d="M${cx - 4} ${y + h}V${y + 4}A4 4 0 0 1 ${cx + 4} ${y + 4}V${y + h}Z"/>`);
  }
  out.push(`<g fill="${s.win}" opacity=".9">${slits.join('')}</g>`);
  out.push(`<g fill="none" stroke="${rim}" stroke-width="1.4" opacity=".9">`
    + line(cx - 42, base - 200, cx - 42, base - 52) + line(cx + 42, base - 200, cx + 42, base - 52)
    + line(cx - 37, base - 300, cx - 37, base - 200) + line(cx + 37, base - 300, cx + 37, base - 200)
    + line(cx - 34, base - 382, cx - 34, base - 300) + line(cx + 34, base - 382, cx + 34, base - 300)
    + line(cx - 47, base - 452, cx + 47, base - 452)
    + line(cx - 30, base - 518, cx, base - 640) + line(cx, base - 640, cx + 30, base - 518)
    + `</g>`);
  return out.join('');
}

function towerReflection() {
  const { x: cx, base } = TOWER;
  return `<defs><linearGradient id="refl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${LANDMARK.shade}" stop-opacity=".42"/><stop offset="1" stop-color="${LANDMARK.shade}" stop-opacity="0"/></linearGradient></defs>`
    + `<path fill="url(#refl)" d="M${cx - 50} ${base}H${cx + 50}V${base + 40}H${cx + 42}V${base + 150}H${cx + 37}V${base + 230}H${cx + 30}L${cx} ${base + 300}L${cx - 30} ${base + 230}H${cx - 37}V${base + 150}H${cx - 42}V${base + 40}H${cx - 50}Z"/>`;
}

function libraryReflection() {
  const base = SCENE.shore + 14;
  const cx = 2170;
  return `<path fill="url(#refl)" d="M2070 ${base}H2270V${base + 50}H2252L${cx} ${base + 76}L2088 ${base + 50}H2070ZM2112 ${base + 76}H2228V${base + 112}H2112ZM${cx - 64} ${base + 112}A64 66 0 0 0 ${cx + 64} ${base + 112}Z"/>`;
}

function foundry(r, s) {
  const out = [];
  const x0 = 1540;
  const base = SCENE.shore;
  out.push(circle(1600, 694, 52, fill(s.shade)));
  out.push(gear(1600, 694, 64, 18, fill(s.shade)));
  out.push(circle(1600, 694, 16, fill(s.body)));
  for (const [cx, top, w] of [[1566, 560, 16], [1612, 586, 14], [1660, 600, 12]]) {
    out.push(rect(cx - w / 2, top, w, base - top, fill(s.body)));
    out.push(rect(cx - w / 2 - 3, top, w + 6, 6, fill(s.body)));
    out.push(rect(cx + w / 2 - 1.5, top + 6, 1.5, base - top - 60, fill(s.rim, ' opacity=".8"')));
  }
  let d = `M${x0} ${base}V${base - 46}`;
  for (let x = x0; x < 1700; x += 32) d += `L${x + 24} ${base - 74}V${base - 46}L${x + 32} ${base - 46}`;
  out.push(`<path d="${d}V${base}Z" fill="${s.body}"/>`);
  out.push(`<g fill="${s.win}">${[0, 1, 2, 3, 4, 5, 6, 7].filter((i) => i % 3 !== 1).map((i) => rect(x0 + 8 + i * 19, base - 34, 6, 9)).join('')}</g>`);
  return out.join('');
}

function causeway(s) {
  const out = [];
  const y = 728;
  let d = `M1688 ${y}H1760V${y + 30}`;
  for (let x = 1760; x > 1688; x -= 24) d += `H${x - 4}A10 10 0 0 0 ${x - 24} ${y + 30}`;
  out.push(`<path d="${d}V${y}Z" fill="${s.body}"/>`);
  out.push(line(1688, y, 1760, y, ` stroke="${s.rim}" stroke-width="1.3"`));
  const isle = [[1730, 744], [1748, 736], [1790, 733], [1834, 735], [1866, 744], [1874, 760], [1722, 760]];
  out.push(poly(isle, fill(s.shade)));
  return out.join('');
}

function library(s) {
  const out = [];
  const cx = 2170;
  const base = SCENE.shore;
  out.push(rect(2098, base - 104, 144, 44, fill(s.shade)));
  out.push(rect(2094, base - 108, 152, 5, fill(s.body)));
  out.push(rect(2070, base - 62, 200, 62, fill(s.body)));
  out.push(rect(2064, base - 66, 212, 5, fill(s.body)));
  out.push(poly([[2060, base - 62], [cx, base - 96], [2280, base - 62]], fill(s.body)));
  out.push(rect(2112, base - 150, 116, 44, fill(s.body)));
  out.push(`<path d="M${cx - 64} ${base - 150}A64 70 0 0 1 ${cx + 64} ${base - 150}Z" fill="${s.body}"/>`);
  out.push(rect(cx - 9, base - 244, 18, 26, fill(s.body)));
  out.push(`<path d="M${cx - 12} ${base - 244}A12 12 0 0 1 ${cx + 12} ${base - 244}Z" fill="${s.body}"/>`);
  out.push(rect(cx - 1.5, base - 278, 3, 24, fill(s.body)));
  const ribs = [-0.75, -0.4, 0, 0.4, 0.75].map((k) => `<path d="M${n(cx + k * 64)} ${base - 150}Q${n(cx + k * 30)} ${base - 210} ${cx} ${base - 220}"/>`).join('');
  out.push(`<g fill="none" stroke="${L.gilt}" stroke-width="1.4" opacity=".9">${ribs}<path d="${arc(cx, base - 150, 64, -Math.PI + 0.05, -0.05)}" transform="translate(0 0) scale(1 1)"/></g>`);
  out.push(`<g fill="${s.shade}">${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => rect(2082 + i * 24, base - 56, 8, 52)).join('')}</g>`);
  out.push(`<g fill="${s.win}">${[0, 1, 2, 3].map((i) => `<path d="M${2126 + i * 26} ${base - 112}V${base - 136}A6 6 0 0 1 ${2138 + i * 26} ${base - 136}V${base - 112}Z"/>`).join('')}</g>`);
  out.push(`<g fill="none" stroke="${L.gilt}" stroke-width="1.2" opacity=".85">${line(2094, base - 108, 2246, base - 108)}${line(2064, base - 66, 2276, base - 66)}</g>`);
  out.push(line(2060, base - 62, cx, base - 96, ` stroke="${s.rim}" stroke-width="1.2" opacity=".8"`));
  return out.join('');
}

function skyObservatory(r, s) {
  const x = 1900;
  const y = 236;
  const w = 130;
  const rock = [[x, y]];
  for (let i = 1; i < 8; i += 1) {
    const t = i / 8;
    rock.push([x + w * t, y + Math.sin(t * Math.PI) * w * r.range(0.5, 0.75)]);
  }
  rock.push([x + w, y]);
  const cx = x + w * 0.5;
  const out = [poly(rock, fill(s.shade))];
  out.push(rect(cx - 30, y - 34, 60, 34, fill(s.body)));
  out.push(`<path d="M${cx - 34} ${y - 32}A34 34 0 0 1 ${cx + 34} ${y - 32}Z" fill="${s.body}"/>`);
  out.push(`<g transform="rotate(-40 ${cx} ${y - 32})">${rect(cx - 6, y - 110, 12, 46, fill('#3b2f45'))}${rect(cx - 8, y - 114, 16, 9, fill(s.body))}${rect(cx + 2.6, y - 104, 1.6, 36, fill(s.rim, ' opacity=".7"'))}${rect(cx - 9, y - 70, 18, 6, fill(L.brass.base, ' rx="1.5"'))}${rect(cx - 9, y - 70, 18, 1.4, fill(L.brass.light))}</g>`);
  out.push(`<path d="${arc(cx, y - 32, 34, -Math.PI + 0.1, -0.1)}" fill="none" stroke="${s.rim}" stroke-width="1.4"/>`);
  out.push(`<g fill="${s.win}">${rect(cx - 18, y - 24, 7, 11)}${rect(cx + 10, y - 24, 7, 11)}</g>`);
  out.push(rect(x + 16, y - 16, 16, 16, fill(s.body)), poly([[x + 14, y - 16], [x + 24, y - 34], [x + 34, y - 16]], fill(s.body)));
  out.push(`<g fill="none" stroke="${s.body}" stroke-width="2.4">${circle(x + w - 18, y - 22, 14)}<ellipse cx="${x + w - 18}" cy="${y - 22}" rx="14" ry="5"/></g>${rect(x + w - 20, y - 8, 4, 8, fill(s.body))}`);
  out.push(line(x + 2, y, x + w - 2, y, ` stroke="${s.rim}" stroke-width="1.3" opacity=".85"`));
  return out.join('');
}

function mid(r) {
  const s = L.layers.mid;
  const out = [];
  out.push(towerReflection());
  out.push(libraryReflection());
  out.push(`<defs><linearGradient id="mirror" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${s.shade}" stop-opacity=".75"/><stop offset="1" stop-color="${s.shade}" stop-opacity="0"/></linearGradient></defs>`);
  out.push(rect(0, SCENE.shore + 12, 1710, 90, ' fill="url(#mirror)"'));
  out.push(rect(2050, SCENE.shore + 12, 1150, 90, ' fill="url(#mirror)"'));
  const ripples = [];
  for (let y = SCENE.shore + 18; y < SCENE.shore + 100; y += 7) {
    for (const [a, b] of [[0, 1700], [2060, 3200]]) {
      let x = a + r.range(0, 60);
      while (x < b) { const w = r.range(30, 140); ripples.push(`M${n(x)} ${n(y)}h${n(w)}v1.4h${n(-w)}z`); x += w + r.range(20, 90); }
    }
  }
  out.push(`<path d="${ripples.join('')}" fill="${L.water[0]}" opacity=".55"/>`);
  const quay = (a, b) => rect(a, SCENE.shore - 2, b - a, 16, fill(s.shade)) + rect(a, SCENE.shore - 2, b - a, 1.6, fill(s.rim, ' opacity=".8"'));
  out.push(quay(-10, 1712), quay(2050, 3210));
  out.push(skyline(r, { x0: -10, x1: 880, base: SCENE.shore, hMin: 50, hMax: 200, wMin: 24, wMax: 60, s, sunX: SUN.x, detail: 3.2 }));
  out.push(skyline(r, { x0: 880, x1: 1540, base: SCENE.shore, hMin: 34, hMax: 104, wMin: 26, wMax: 58, s, sunX: SUN.x, detail: 3.2, roofs: ['gable', 'gable', 'mansard', 'flat', 'cone', 'dome'] }));
  out.push(`<defs><linearGradient id="mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${L.sky[3]}" stop-opacity="0"/><stop offset="1" stop-color="${L.sky[3]}" stop-opacity=".55"/></linearGradient></defs>`);
  out.push(rect(0, 650, 1540, 112, ' fill="url(#mist)"'));
  out.push(foundry(r, s));
  out.push(causeway(s));
  out.push(clockTower(s));
  out.push(library(LANDMARK));
  out.push(skyline(r, { x0: 2272, x1: 2300, base: SCENE.shore, hMin: 50, hMax: 80, wMin: 26, wMax: 30, s, sunX: SUN.x, detail: 3.2 }));
  out.push(skyObservatory(r, LANDMARK));
  out.push(skyline(r, { x0: 2640, x1: 3210, base: SCENE.shore, hMin: 50, hMax: 210, wMin: 24, wMax: 60, s, sunX: SUN.x, detail: 3.2 }));
  out.push(rect(2290, 650, 910, 112, ' fill="url(#mist)"'));
  out.push(`<g class="code-notes"><text class="code-note" x="1752" y="170" text-anchor="end">clockTower(s)</text><text class="code-note" x="1965" y="356" text-anchor="middle">skyObservatory(r, s)</text><text class="code-note" x="2170" y="462" text-anchor="middle">library(s)</text><text class="code-note" x="1532" y="694" text-anchor="end">foundry(r, s)</text><text class="code-note" x="1440" y="792" text-anchor="middle">skyline(r, { x0: 880, x1: 1540 })</text><text class="code-note" x="1930" y="616" text-anchor="start">SUN.r = 150</text><g class="code-note dim"><path d="M1866 52V742M1860 52h12M1860 742h12"/></g><text class="code-note" x="1880" y="400" text-anchor="middle" transform="rotate(-90 1880 400)">h = 690</text></g>`);
  return svg('flat mid', '0 0 3200 1000', `<g class="shift">${out.join('')}</g>`);
}

function lampPost(x, top) {
  const c = '#2c2433';
  return `${rect(x - 2, top - 4, 4, 1004 - top, fill(c))}${rect(x - 5, top - 8, 10, 5, fill(c, ' rx="1.5"'))}${circle(x, top - 11, 3, fill(c))}${rect(x - 4, 990, 8, 10, fill(c))}`;
}

function lanterns(r, x0, x1, y, sag, count, posts = [true, true]) {
  const out = [];
  const d = `M${x0} ${y}Q${(x0 + x1) / 2} ${y + sag * 2} ${x1} ${y}`;
  if (posts[0]) out.push(lampPost(x0, y));
  if (posts[1]) out.push(lampPost(x1, y));
  out.push(`<path d="${d}" fill="none" stroke="#3b3242" stroke-width="1.4"/>`);
  const cords = [];
  const bulbs = [];
  for (let i = 1; i < count; i += 1) {
    const t = i / count;
    const lx = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * ((x0 + x1) / 2) + t * t * x1;
    const ly = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * (y + sag * 2) + t * t * y;
    const c = r.pick(['#ffd283', '#ffb86b', '#f6a36a', '#ffe1a0']);
    cords.push(`M${n(lx)} ${n(ly)}v3`);
    bulbs.push(`<rect x="${n(lx - 2.6)}" y="${n(ly + 2.4)}" width="5.2" height="1.6" fill="#3b3242"/><ellipse cx="${n(lx)}" cy="${n(ly + 8.4)}" rx="4.2" ry="5.4" fill="${c}"/>`);
  }
  out.push(`<path d="${cords.join('')}" stroke="#3b3242" stroke-width="1"/>`, `<g class="bulbs">${bulbs.join('')}</g>`);
  return out.join('');
}

function boat(x, y, s, scale = 1) {
  const k = scale;
  return `<g fill="${s.body}"><path d="M${x} ${y}h${70 * k}l${-10 * k} ${12 * k}h${-50 * k}z"/>`
    + `${rect(x + 33 * k, y - 78 * k, 2.6 * k, 78 * k)}<path d="M${x + 36 * k} ${y - 74 * k}l${30 * k} ${64 * k}h${-30 * k}z" fill="${s.shade}"/><path d="M${x + 33 * k} ${y - 66 * k}l${-24 * k} ${58 * k}h${24 * k}z" fill="${s.shade}"/></g>`
    + line(x + 36 * k, y - 74 * k, x + 66 * k, y - 10 * k, ` stroke="${s.rim}" stroke-width="1.2" opacity=".8"`);
}

function near(r) {
  const s = L.layers.near;
  const out = [];
  out.push(`<defs><linearGradient id="harbor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${L.water[1]}"/><stop offset="1" stop-color="${L.water[2]}"/></linearGradient></defs>`);
  out.push(rect(1580, 860, 560, 140, ' fill="url(#harbor)"'));
  out.push(`<g fill="${L.glint}" opacity=".5">${[0, 1, 2, 3, 4, 5].map((i) => rect(1700 + r.range(-40, 120), 872 + i * 10, r.range(40, 120), 1.6)).join('')}</g>`);
  out.push(skyline(r, { x0: -20, x1: 1540, base: 1000, hMin: 110, hMax: 190, wMin: 60, wMax: 120, s, sunX: SUN.x, detail: 6, dark: true, roofs: ['gable', 'gable', 'mansard', 'flat', 'gable'], gap: [-8, 0] }));
  out.push(rect(1580, 884, 120, 16, fill(s.body)));
  out.push(rect(2020, 884, 140, 16, fill(s.body)));
  out.push(`<g class="bob">${boat(1720, 884, s, 0.9)}</g>`);
  out.push(`<g class="bob b2">${boat(1880, 890, s, 0.7)}</g>`);
  out.push(skyline(r, { x0: 2120, x1: 3220, base: 1000, hMin: 110, hMax: 200, wMin: 60, wMax: 120, s, sunX: SUN.x, detail: 6, dark: true, roofs: ['gable', 'gable', 'mansard', 'flat', 'gable', 'spire'], gap: [-8, 0], cap: (mx) => (mx < 2330 ? 70 : 200) }));
  out.push(lanterns(r, 1040, 1190, 836, 16, 8, [true, false]) + lanterns(r, 1190, 1380, 836, 20, 10));
  out.push(lanterns(r, 2220, 2400, 840, 18, 9));
  return svg('flat near', '0 0 3200 1000', `<g class="shift">${out.join('')}</g>`);
}

function rail() {
  const s = L.layers.front;
  const out = [rect(0, 0, 3200, 16, fill(s.body)), rect(0, 0, 3200, 2.2, fill('#efbf78')), rect(0, 16, 3200, 3, fill(s.shade))];
  for (let i = 0, x = 4; x < 3200; i += 1, x += 38) {
    if (i % 13 === 6) {
      out.push(rect(x - 6, 16, 38, 72, fill(s.body)), rect(x - 2, 24, 30, 56, ` fill="none" stroke="${L.gilt}" stroke-width="1.2"`), diamond(x + 13, 52, 7, 13, fill(L.gilt)));
    } else out.push(baluster(x, 19, 88, 26, s.body));
  }
  out.push(rect(0, 86, 3200, 14, fill(s.body)), rect(0, 86, 3200, 1.6, fill('#d9a35e', ' opacity=".7"')));
  out.push(`<text class="code-note" x="1600" y="12" text-anchor="middle">rail()</text>`);
  return svg('rail', '0 0 3200 100', out.join(''));
}

function pillar() {
  const s = L.layers.front;
  const g = L.gilt;
  const out = [];
  out.push(`<defs><linearGradient id="shaft" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a3242"/><stop offset=".18" stop-color="${s.body}"/><stop offset="1" stop-color="${s.shade}"/></linearGradient>
<radialGradient id="lamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff1c4"/><stop offset=".45" stop-color="#ffd283" stop-opacity=".55"/><stop offset="1" stop-color="#ffd283" stop-opacity="0"/></radialGradient></defs>`);
  out.push(rect(250, 0, 170, 1000, ' fill="url(#shaft)"'));
  out.push(rect(250, 0, 2.4, 1000, fill('#f2c27c', ' opacity=".85"')));
  out.push(rect(232, 70, 188, 18, fill(s.body)), rect(240, 88, 180, 10, fill(s.shade)), rect(232, 70, 188, 2, fill('#f2c27c')));
  out.push(rect(240, 40, 180, 30, fill(s.body)), rect(240, 40, 180, 1.6, fill('#f2c27c', ' opacity=".8"')));
  out.push(`<g fill="none" stroke="${g}" stroke-width="1.6">${rect(276, 124, 118, 760)}${rect(284, 132, 102, 744, ' stroke-width=".8" opacity=".7"')}</g>`);
  out.push(sunGlyph(335, 214, 40, g));
  out.push(crescent(335, 336, 30, g));
  out.push(star8(335, 456, 36, fill(g)));
  out.push(`<g fill="none" stroke="${g}" stroke-width="1.6">${gear(335, 580, 36, 12, '')}${circle(335, 580, 12)}</g>`);
  out.push(`<g fill="${g}">${diamond(335, 690, 10, 18, '')}${diamond(335, 742, 7, 12, '')}${diamond(335, 782, 5, 8, '')}</g>`);
  out.push(`<g stroke="${g}" stroke-width="1" opacity=".75">${[0, 1, 2, 3].map((i) => line(300 + i * 23.3, 812, 300 + i * 23.3, 866)).join('')}</g>`);
  out.push(`<path d="M252 150C204 150 172 156 156 168C146 176 144 188 150 194" fill="none" stroke="${s.body}" stroke-width="9" stroke-linecap="round"/>`);
  out.push(`<path d="M252 150C204 150 172 156 156 168" fill="none" stroke="#e9b066" stroke-width="1.2" opacity=".7"/>`);
  out.push(circle(150, 196, 4, ` fill="none" stroke="${s.body}" stroke-width="2.4"`));
  out.push(`<g class="lamp"><path d="M150 200V262" stroke="#3a3242" stroke-width="2"/>`
    + circle(150, 320, 90, ' fill="url(#lamp)" class="lamp-glow"')
    + `<path d="M132 262H168L174 276H126Z" fill="${s.body}"/>`
    + `<path d="M128 276H172L166 352H134Z" fill="#ffd98f"/>`
    + `<path d="M150 276V352M139 276L142 352M161 276L158 352" stroke="${s.body}" stroke-width="2"/>`
    + `<path d="M124 352H176L168 366H132Z" fill="${s.body}"/>${rect(146, 366, 8, 14, fill(s.body))}`
    + `<path d="M150 296C144 306 145 316 150 322C155 316 156 306 150 296Z" fill="#fff6dc"/></g>`);
  out.push(`<text class="code-note" x="335" y="118" text-anchor="middle">pillar()</text>`);
  return `<svg class="pillar" viewBox="0 0 420 1000" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">${out.join('')}</svg>`;
}

function orrery() {
  const b = L.brass;
  const s = L.layers.front;
  const out = [];
  out.push(`<defs><radialGradient id="orb" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#fff4cf"/><stop offset=".5" stop-color="${b.light}"/><stop offset="1" stop-color="${b.base}"/></radialGradient></defs>`);
  const cx = 150;
  const cy = 158;
  out.push(`<path d="M${cx - 70} 300H${cx + 70}L${cx + 52} 280H${cx - 52}Z" fill="${b.dark}"/>`);
  out.push(`<path d="M${cx - 52} 280H${cx + 52}L${cx + 36} 266H${cx - 36}Z" fill="${b.base}"/>`);
  out.push(rect(cx - 5, 186, 10, 82, fill(b.base)));
  out.push(rect(cx - 2, 186, 2, 82, fill(b.light)));
  out.push(`<g fill="none" stroke="${b.base}" stroke-width="3">${circle(cx, cy, 112)}</g>`);
  out.push(`<g fill="none" stroke="${b.light}" stroke-width="1" opacity=".8">${circle(cx, cy, 108)}</g>`);
  const ticks = [];
  for (let i = 0; i < 48; i += 1) {
    const a = (i / 48) * Math.PI * 2;
    const r0 = i % 4 ? 112 : 118;
    ticks.push(line(cx + r0 * Math.cos(a), cy + r0 * Math.sin(a), cx + 124 * Math.cos(a), cy + 124 * Math.sin(a)));
  }
  out.push(`<g stroke="${b.base}" stroke-width="1.4">${ticks.join('')}</g>`);
  out.push(`<g fill="none" stroke="${b.base}" stroke-width="2"><ellipse cx="${cx}" cy="${cy}" rx="112" ry="30" transform="rotate(-16 ${cx} ${cy})"/><ellipse cx="${cx}" cy="${cy}" rx="78" ry="20" transform="rotate(-16 ${cx} ${cy})" stroke-dasharray="3 4"/><ellipse cx="${cx}" cy="${cy}" rx="46" ry="12" transform="rotate(-16 ${cx} ${cy})"/></g>`);
  out.push(circle(cx, cy, 24, ' fill="url(#orb)"'));
  out.push(circle(cx, cy, 34, ` fill="none" stroke="${b.glow}" stroke-width="2" opacity=".5"`));
  const orbit = (rx, ry) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
  out.push(`<g transform="rotate(-16 ${cx} ${cy})">`
    + `<circle class="planet p1" r="6" fill="${b.light}" style="offset-path:path('${orbit(46, 12)}')"/>`
    + `<circle class="planet p2" r="9" fill="#9fb3c9" style="offset-path:path('${orbit(78, 20)}')"/>`
    + `<circle class="planet p3" r="7" fill="#d98b6a" style="offset-path:path('${orbit(112, 30)}')"/></g>`);
  out.push(star8(cx, cy - 136, 10, fill(b.light)));
  out.push(`<text class="code-note" x="150" y="296" text-anchor="middle">orrery()</text>`);
  return `<svg class="orrery" viewBox="0 0 300 300" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">${out.join('')}</svg>`;
}

function actor(cls, x, y, w, h, body, viewBox = `0 0 ${w} ${h}`) {
  return `<div class="actor ${cls}" style="--x:${n(x)};--y:${n(y)};--w:${n(w)};--h:${n(h)}"><svg viewBox="${viewBox}" aria-hidden="true" focusable="false">${body}</svg></div>`;
}

function clouds(r) {
  const c = L.cloud;
  const list = [
    [1330, 104, 340, 66], [2230, 118, 480, 96], [2580, 344, 340, 62], [520, 120, 440, 84], [3010, 214, 300, 60],
  ];
  return list.map(([x, y, w, h], i) => actor(`cloud c${i + 1}`, x, y - h, w, h * 1.3, cloud(r, { x: 0, y: h * 1.1, w, h, c, lx: Math.sign(SUN.x - (x + w / 2)) }))).join('');
}

function birds() {
  const one = (x, y, k) => `<g class="bird" style="transform-origin:${x}px ${y}px"><path d="M${x - 9 * k} ${y - 3 * k}Q${x - 4 * k} ${y - 5 * k} ${x} ${y}Q${x + 4 * k} ${y - 5 * k} ${x + 9 * k} ${y - 3 * k}Q${x + 4 * k} ${y - 2 * k} ${x} ${y + 1.6 * k}Q${x - 4 * k} ${y - 2 * k} ${x - 9 * k} ${y - 3 * k}Z"/></g>`;
  const body = [one(20, 30, 1.3), one(48, 18, 1.1), one(66, 40, 1), one(92, 24, 0.9), one(110, 46, 0.8), one(134, 34, 0.75)].join('');
  return actor('birds', 1180, 380, 150, 60, `<g fill="#4a3c4f">${body}</g>`);
}

function airship() {
  const s = L.layers.mid;
  const body = `<ellipse cx="60" cy="20" rx="52" ry="17" fill="${s.body}"/><path d="M10 20Q60 6 110 20" fill="none" stroke="${s.rim}" stroke-width="1.4"/>`
    + `<path d="M104 14l14-10v32l-14-10z" fill="${s.shade}"/>${rect(44, 38, 30, 9, fill(s.shade, ' rx="2"'))}`
    + `<path d="M50 36l-4 3M70 36l4 3" stroke="${s.body}" stroke-width="1.4"/>${rect(48, 40, 4, 4, fill(s.win))}${rect(58, 40, 4, 4, fill(s.win))}${rect(68, 40, 4, 4, fill(s.win))}`;
  return actor('airship', 2500, 300, 120, 50, body);
}

function smoke() {
  const puffs = [0, 1, 2, 3].map((i) => `<circle class="puff" style="animation-delay:${-i * 2.4}s" cx="30" cy="120" r="12" fill="#f7e6cf"/>`).join('');
  return [[1566, 560], [1612, 586], [1660, 600]]
    .map(([x, y], i) => actor(`smoke s${i + 1}`, x - 30, y - 128, 60, 130, puffs)).join('');
}

function glints() {
  const r = rng(77);
  const lines = [];
  for (let y = 10; y < 160; y += r.range(6, 11)) {
    const k = y / 160;
    const w = 20 + k * 160 * r.range(0.5, 1.1);
    lines.push(rect(150 - w / 2 + r.range(-20, 20) * k, y, w, 1.8, ` opacity="${n(r.range(0.4, 0.95))}"`));
  }
  return actor('glints', SUN.x - 150, SCENE.horizon, 300, 170, `<g fill="#fff8e4">${lines.join('')}</g>`);
}

function walkers() {
  const figure = (x, h, c) => `<g fill="${c}">${circle(x, 30 - h - 3, 2.6)}<path d="M${x - 2.6} ${30 - h}h5.2l1 ${h * 0.7}h-7.2z"/><g class="stride">${rect(x - 2, 30 - h * 0.3, 1.6, h * 0.3)}${rect(x + 0.4, 30 - h * 0.3, 1.6, h * 0.3)}</g></g>`;
  const party = figure(-8, 16, '#4a3a4a') + figure(-22, 14, '#5a4656') + figure(-40, 15, '#4a3a4a');
  return actor('walkers', 1688, 698, 72, 30, `<g class="party">${party}</g>`);
}

function ferry() {
  const c = L.layers.mid;
  return actor('ferry', 1700, 786, 60, 34,
    `<g class="ferry-boat"><path d="M2 22h56l-6 9H8z" fill="${c.body}"/>${rect(16, 12, 26, 10, fill(c.shade, ' rx="1.5"'))}`
    + `${rect(19, 15, 4, 4, fill(c.win))}${rect(26, 15, 4, 4, fill(c.win))}${rect(33, 15, 4, 4, fill(c.win))}`
    + `${rect(28, 2, 1.6, 10, fill(c.body))}<circle cx="28.8" cy="3" r="2.2" fill="#ffd283"/>`
    + `<path d="M4 33h52" stroke="${L.glint}" stroke-width="1.2" opacity=".7"/></g>`);
}

function motes() {
  const r = rng(321);
  return Array.from({ length: 16 }, (_, i) => {
    const x = SUN.x + r.range(-520, 420);
    const y = SUN.y + r.range(-180, 200);
    return `<div class="mote" style="--x:${n(x)};--y:${n(y)};--d:${n(r.range(14, 26))}s;--t:${n(-r.range(0, 26))}s;--s:${n(r.range(2.2, 4.6))}"></div>`;
  }).join('');
}

function shootingStar() {
  return actor('shooting', 940, 14, 220, 58, '<path d="M0 0L220 58" stroke="url(#meteor)" stroke-width="2.6" stroke-linecap="round"/><defs><linearGradient id="meteor" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff6dc" stop-opacity="0"/><stop offset="1" stop-color="#fff6dc"/></linearGradient></defs>');
}

export function heroMarkup(seed = 7) {
  const r = rng(seed);
  const farSvg = far(r);
  const midSvg = mid(r);
  const nearSvg = near(r);
  const cloudSet = clouds(rng(seed + 11));
  return [
    `<div class="world" aria-hidden="true">`,
    `<div class="layer sky" data-depth="1"><div class="rays"></div><div class="glow"></div></div>`,
    `<div class="layer far" data-depth=".8">${farSvg}${shootingStar()}${cloudSet}${glints()}<div class="ring"></div></div>`,
    `<div class="layer mid" data-depth=".55"><div class="bloom"></div>${motes()}${airship()}${birds()}${midSvg}${smoke()}${walkers()}${ferry()}</div>`,
    `<div class="layer near" data-depth=".3">${nearSvg}</div>`,
    `<div class="layer front" data-depth="0">${rail()}${pillar()}${orrery()}</div>`,
    `<div class="grain"></div>`,
    `</div>`,
  ].join('\n');
}
