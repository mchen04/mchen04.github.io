import { rng, n, hash, poly, rect, circle, fill, line, arc, LIGHTS, building, skyline, ridge, cloud, star8, gear, clockTowerShape } from './kit.mjs';

const W = 2400;
const STYLE = '<style>@media (prefers-reduced-motion:no-preference){.pl-drift,.pl-puff,.pl-spin,.pl-rev,.pl-train,.pl-twinkle,.pl-flutter,.pl-bulbs,.pl-fog,.pl-pennant,.pl-on,.flick{transform-box:fill-box;transform-origin:center}.pl-drift{animation:pc 140s linear infinite}.pl-drift:nth-of-type(2n){animation-duration:180s;animation-delay:-70s}.pl-puff{animation:psmoke 7s linear infinite}.pl-spin{animation:ps 60s linear infinite}.pl-rev{animation:ps 30s linear infinite reverse}.pl-mill{transform-box:view-box;animation:ps 24s linear infinite}.pl-train{animation:pt 46s linear infinite}.pl-twinkle{animation:pw 3.8s ease-in-out infinite alternate}.pl-twinkle:nth-of-type(2n){animation-delay:-1.4s}.pl-twinkle:nth-of-type(3n){animation-duration:5.2s}.pl-flutter{animation:pf 15s linear infinite}.pl-kite{transform-box:view-box;animation:pk 6.4s ease-in-out infinite alternate}.pl-tail{transform-box:view-box;animation:ptail 3s ease-in-out infinite alternate}.pl-bulbs{animation:pb 3.4s ease-in-out infinite alternate}.pl-draw{animation:pr 3s linear infinite}.pl-fog{animation:pd 40s ease-in-out infinite alternate}.pl-pennant{transform-origin:0 50%;animation:penn .9s ease-in-out infinite alternate}.pl-on{animation:pn 1.6s ease-out both}.pl-lamp{animation:pn 2.6s ease-out 1.1s both}.flick{animation:pl 24s step-end infinite}@keyframes pd{to{transform:translateX(70px)}}@keyframes pc{0%{transform:translateX(-90px);opacity:0}12%{opacity:1}88%{opacity:1}100%{transform:translateX(90px);opacity:0}}@keyframes psmoke{0%{opacity:0;transform:translate(var(--dx),var(--dy)) scale(.5)}12%{opacity:.7}100%{opacity:0;transform:translate(38px,-70px) scale(2.1)}}@keyframes ps{to{transform:rotate(360deg)}}@keyframes pt{from{transform:translateX(1300px)}to{transform:translateX(-1700px)}}@keyframes pw{from{opacity:.35}to{opacity:1}}@keyframes pf{0%{opacity:0;transform:translate(0,0) rotate(0)}10%{opacity:1}78%{opacity:1}100%{opacity:0;transform:translate(120px,-34px) rotate(230deg)}}@keyframes pk{from{transform:rotate(-.7deg)}to{transform:rotate(.9deg)}}@keyframes ptail{from{transform:rotate(-3.5deg)}to{transform:rotate(4.5deg)}}@keyframes pb{from{opacity:.7}to{opacity:1}}@keyframes pr{to{stroke-dashoffset:-24}}@keyframes pl{0%{opacity:1}46%{opacity:.1}71%{opacity:1}}@keyframes penn{from{transform:skewY(-20deg) scaleX(.82)}to{transform:skewY(22deg) scaleX(1.12)}}@keyframes pn{from{opacity:0}}}</style>';
const H = 600;

function frame(id, stops, body) {
  const grad = stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">${STYLE}<defs><linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1">${grad}</linearGradient></defs>${rect(0, 0, W, H, ` fill="url(#${id}-sky)"`)}${body}</svg>`;
}

function sun(id, x, y, r, core, disc, halo, glow = 0.7) {
  return `<defs><radialGradient id="${id}-glow"><stop offset="0" stop-color="${halo}" stop-opacity="${glow}"/><stop offset="1" stop-color="${halo}" stop-opacity="0"/></radialGradient>`
    + `<radialGradient id="${id}-disc" cx=".4" cy=".38" r=".7"><stop offset="0" stop-color="${core}"/><stop offset="1" stop-color="${disc}"/></radialGradient></defs>`
    + circle(x, y, r * 5, ` fill="url(#${id}-glow)"`) + circle(x, y, r, ` fill="url(#${id}-disc)"`);
}

function stars(r, count, y1, color, gold, y0 = 10) {
  const dots = [];
  for (let i = 0; i < count; i += 1) {
    const x = r.range(0, W);
    const y = y0 + (r.range(10, y1) - 10) * r.range(0.4, 1) * ((y1 - y0) / y1);
    dots.push(`M${n(x)} ${n(y)}h${n(r.range(1.4, 3))}v${n(r.range(1.4, 3))}h${n(-r.range(1.4, 3))}z`);
  }
  const bright = [];
  for (let i = 0; i < 9; i += 1) bright.push(star8(r.range(60, W - 60), r.range(Math.max(30, y0 + 20), y1 * 0.8), r.range(5, 9), fill(gold, ' class="pl-twinkle"')));
  return `<path d="${dots.join('')}" fill="${color}" opacity=".85"/>${bright.join('')}`;
}

function water(id, y, stops, glintX, glint, r) {
  const g = stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('');
  const streaks = [];
  for (let yy = y + 5; yy < H; yy += r.range(5, 9)) {
    const k = (yy - y) / (H - y);
    const w = 24 + k * 200 * r.range(0.6, 1.2);
    streaks.push(`M${n(glintX - w / 2 + r.range(-20, 20) * k)} ${n(yy)}h${n(w)}v1.8h${n(-w)}z`);
  }
  return `<defs><linearGradient id="${id}-water" x1="0" y1="0" x2="0" y2="1">${g}</linearGradient></defs>${rect(0, y, W, H - y, ` fill="url(#${id}-water)"`)}<path d="${streaks.join('')}" fill="${glint}" opacity=".6"/>`;
}

function smokePlume(x, y, color, r) {
  const puffs = [`<defs><filter id="soft${n(x)}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5"/></filter></defs>`];
  const dur = 6.2 + hash(x, y) * 3.2;
  let px = x;
  let py = y;
  let pr = 9;
  for (let i = 0; i < 7; i += 1) {
    const motion = i === 0 ? '' : ` class="pl-puff" style="--dx:${n(x - px)}px;--dy:${n(y - py)}px;animation-duration:${n(dur)}s;animation-delay:${n(-(i / 7) * dur)}s"`;
    puffs.push(circle(px, py, pr, `${motion} opacity="${n(0.75 - i * 0.09)}"`));
    px += r.range(10, 22);
    py -= r.range(12, 20);
    pr *= 1.22;
  }
  return `${puffs.shift()}<g fill="${color}" filter="url(#soft${n(x)})">${puffs.join('')}</g>`;
}

function works() {
  const r = rng(101);
  const L = LIGHTS.gold;
  const far = L.layers.far;
  const mid = L.layers.mid;
  const near = L.layers.near;
  const out = [];
  out.push(sun('w', 760, 230, 70, L.sun.core, L.sun.disc, L.sun.halo));
  out.push(`<g class="pl-drift">${cloud(r, { x: 1860, y: 190, w: 400, h: 78, c: L.cloud, lx: -1 })}</g>`);
  out.push(`<g class="pl-drift">${cloud(r, { x: 200, y: 120, w: 360, h: 70, c: L.cloud, lx: 1 })}</g>`);
  out.push(ridge(r, { x0: 0, x1: W, base: 420, top: 360, rough: 14, step: 24, color: '#e6b998' }));
  out.push(skyline(r, { x0: 0, x1: W, base: 422, hMin: 10, hMax: 50, wMin: 12, wMax: 30, s: far, sunX: 760 }));
  const chimneys = [[870, 230, 26], [950, 270, 22], [1450, 210, 28], [1530, 250, 22], [1650, 280, 20]];
  for (const [x, top, w] of chimneys) out.push(smokePlume(x + w / 2, top, '#c2a09a', r));
  out.push(circle(1200, 380, 150, fill(mid.shade)));
  out.push(`<g class="pl-spin">${gear(1200, 380, 176, 24, fill(mid.shade))}</g>`);
  out.push(`<g class="pl-rev">${gear(1200, 380, 60, 10, fill(mid.body))}</g>`);
  out.push(circle(1200, 380, 18, fill(mid.shade)));
  for (let i = 0; i < 6; i += 1) {
    const a = (i / 6) * Math.PI * 2;
    out.push(line(1200 + 60 * Math.cos(a), 380 + 60 * Math.sin(a), 1200 + 140 * Math.cos(a), 380 + 140 * Math.sin(a), ` stroke="${mid.body}" stroke-width="14"`));
  }
  for (const [x, top, w] of chimneys) {
    out.push(rect(x, top, w, 420 - top, fill(mid.body)), rect(x - 4, top, w + 8, 10, fill(mid.body)), rect(x + w - 2, top + 10, 2, 300 - top, fill(mid.rim, ' opacity=".7"')));
  }
  let d = 'M0 470V420';
  for (let x = 0; x < W;) {
    const tw = r.range(46, 64);
    d += `L${n(x + tw * 0.74)} ${n(420 - r.range(32, 48))}V420L${n(x + tw)} 420`;
    x += tw;
  }
  out.push(`<path d="${d}V470Z" fill="${mid.body}"/>`);
  const lit = [];
  for (let x = 6; x < W; x += r.range(22, 70)) if (r.chance(0.55)) lit.push(`M${n(x)} ${n(r.pick([430, 436, 442]))}h${n(r.pick([8, 10, 12]))}v10h${n(-r.pick([8, 10, 12]))}z`);
  out.push(`<path d="${lit.join('')}" fill="${mid.win}"/>`);
  out.push(rect(0, 452, W, 148, fill('#e7b590')));
  out.push(rect(0, 452, W, 14, fill(near.body)));
  let arches = `M0 466H${W}V600H0Z`;
  for (let x = 0; x < W; x += 90) arches += `M${x + 22} 600V540A34 34 0 0 1 ${x + 90} 540V600Z`;
  out.push(`<path d="${arches}" fill="${near.body}" fill-rule="evenodd"/>`);
  out.push(line(0, 452, W, 452, ` stroke="${near.rim}" stroke-width="2"`));
  const train = [`<path d="M1010 452v-34h70v-14h16v14h20l14 34z" fill="${near.shade}"/>`, rect(1032, 392, 14, 26, fill(near.shade))];
  for (let i = 0; i < 4; i += 1) train.push(rect(1140 + i * 92, 414, 84, 38, fill(near.shade, ' rx="4"')), `<path d="M${1150 + i * 92} 424h64v10h-64z" fill="${near.win}"/>`);
  out.push(`<g class="pl-train">${train.join('')}${smokePlume(1039, 392, '#c9aaa4', r)}</g>`);
  out.push(rect(1500, 120, 10, 332, fill(mid.shade)), rect(1500, 120, 260, 10, fill(mid.shade)), line(1740, 130, 1740, 300, ` stroke="${mid.shade}" stroke-width="2"`), rect(1726, 300, 28, 22, fill(mid.shade)));
  return frame('works', [[0, '#f6ecd8'], [0.5, '#f3d7aa'], [0.7, '#eebd8d'], [1, '#e5a07d']], out.join(''));
}

function observatory() {
  const r = rng(202);
  const L = LIGHTS.dusk;
  const out = [];
  out.push(stars(r, 160, 360, '#f1e6cf', '#e2bf7c'));
  const pts = [[620, 120], [700, 170], [790, 140], [860, 210], [960, 190]];
  out.push(`<path d="M${pts.map(([x, y]) => `${x} ${y}`).join('L')}" fill="none" stroke="#c9a161" stroke-width="1.2" opacity=".55"/>`);
  out.push(`<g fill="#e2bf7c">${pts.map(([x, y]) => circle(x, y, 3.5)).join('')}</g>`);
  const pts2 = [[1600, 90], [1680, 140], [1760, 110], [1820, 170]];
  out.push(`<path d="M${pts2.map(([x, y]) => `${x} ${y}`).join('L')}" fill="none" stroke="#c9a161" stroke-width="1.2" opacity=".55"/>`);
  out.push(`<g fill="#e2bf7c">${pts2.map(([x, y]) => circle(x, y, 3)).join('')}</g>`);
  out.push(`<defs><radialGradient id="moon-glow"><stop offset="0" stop-color="#f4e7c8" stop-opacity=".35"/><stop offset="1" stop-color="#f4e7c8" stop-opacity="0"/></radialGradient></defs>${circle(1880, 150, 220, ' fill="url(#moon-glow)"')}`);
  out.push(`<path d="M1910 92A62 62 0 1 0 1910 208A50 50 0 1 1 1910 92Z" fill="#f4e7c8"/>`);
  out.push(`<g fill="none" stroke="#c9a161" opacity=".5">${circle(1200, 300, 230, ' stroke-width="1" stroke-dasharray="2 8"')}<ellipse cx="1200" cy="300" rx="420" ry="120" transform="rotate(-10 1200 300)" stroke-width=".8" stroke-dasharray="1 7"/></g>`);
  out.push(ridge(r, { x0: 0, x1: W, base: 470, top: 380, rough: 22, step: 30, color: '#3d3456' }));
  out.push(skyline(r, { x0: 0, x1: 900, base: 470, hMin: 20, hMax: 70, wMin: 16, wMax: 34, s: L.layers.far, sunX: 1200, detail: 2.4 }));
  out.push(skyline(r, { x0: 1500, x1: W, base: 470, hMin: 20, hMax: 70, wMin: 16, wMax: 34, s: L.layers.far, sunX: 1200, detail: 2.4 }));
  const s = L.layers.mid;
  out.push(poly([[860, 600], [940, 470], [1060, 400], [1200, 380], [1340, 398], [1460, 460], [1560, 600]], fill(s.body)));
  out.push(`<g transform="rotate(-34 1200 236)">${rect(1186, 100, 28, 150, fill('#2a2440'))}${rect(1180, 94, 40, 18, fill(s.body))}${line(1211, 116, 1211, 200, ` stroke="${L.brass.light}" stroke-width="1.6" opacity=".7"`)}${rect(1178, 200, 44, 9, fill(L.brass.base, ' rx="2"'))}${rect(1178, 200, 44, 2, fill(L.brass.light))}</g>`);
  out.push(rect(1110, 300, 180, 90, fill(s.body)));
  out.push(`<path d="M1100 302A100 100 0 0 1 1300 302Z" fill="${s.body}"/>`);
  out.push(`<path d="${arc(1200, 302, 100, -Math.PI + 0.08, -1.98)}" fill="none" stroke="${L.brass.light}" stroke-width="1.6" opacity=".6"/>`);
  out.push(`<path d="${arc(1200, 302, 100, -1.6, -0.08)}" fill="none" stroke="${L.brass.light}" stroke-width="1.6" opacity=".6"/>`);
  out.push(`<g transform="rotate(-34 1200 236)">${rect(1182, 204.5, 36, 61.5, fill('#1a1626', ' rx="3"'))}${rect(1178, 200, 44, 9, fill(L.brass.base, ' rx="2"'))}${rect(1178, 200, 44, 2, fill(L.brass.light))}</g>`);
  out.push(`<g fill="${s.win}">${[0, 1, 2, 3].map((i) => `<path d="M${1130 + i * 40} 370V338a8 8 0 0 1 16 0V370z"/>`).join('')}</g>`);
  out.push(`<g fill="none" stroke="${L.brass.light}" stroke-width="2.4" opacity=".85">${circle(1420, 400, 34)}<ellipse cx="1420" cy="400" rx="34" ry="12"/><ellipse cx="1420" cy="400" rx="12" ry="34" transform="rotate(28 1420 400)"/></g>${rect(1416, 432, 8, 40, fill(s.body))}`);
  out.push(skyline(r, { x0: -20, x1: 880, base: 600, hMin: 50, hMax: 140, wMin: 40, wMax: 90, s: L.layers.near, sunX: 1200, detail: 4, dark: true }));
  out.push(skyline(r, { x0: 1540, x1: W + 20, base: 600, hMin: 50, hMax: 140, wMin: 40, wMax: 90, s: L.layers.near, sunX: 1200, detail: 4, dark: true }));
  return frame('obs', [[0, '#141a33'], [0.45, '#2b2e52'], [0.75, '#57476b'], [1, '#8f6474']], out.join(''));
}

function kite(x, y, color, [ax, ay], dur, delay) {
  const tail = `M${n(x)} ${n(y + 34)}Q${n(x + 18)} ${n(y + 58)} ${n(x + 40)} ${n(y + 74)}T${n(x + 78)} ${n(y + 122)}`;
  const bows = [[x + 26, y + 57], [x + 52, y + 88], [x + 70, y + 110]]
    .map(([bx, by]) => `M${n(bx - 4)} ${n(by - 3)}l8 6`).join('');
  return `<g class="pl-kite" style="transform-origin:${n(ax)}px ${n(ay)}px;animation-duration:${n(dur)}s;animation-delay:${n(-delay)}s">`
    + line(x, y + 34, ax, ay, ' stroke="#6b5363" stroke-width=".9" opacity=".5"')
    + `<path d="M${x} ${y - 30}L${x + 20} ${y}L${x} ${y + 34}L${x - 20} ${y}Z" fill="${color}"/>`
    + line(x, y - 30, x, y + 34, ' stroke="#00000022"') + line(x - 20, y, x + 20, y, ' stroke="#00000022"')
    + `<g class="pl-tail" style="transform-origin:${n(x)}px ${n(y + 34)}px;animation-duration:${n(2.6 + hash(x, y) * 1.6)}s;animation-delay:${n(-hash(y, x) * 3)}s">`
    + `<path d="${tail}" fill="none" stroke="#6b5363" stroke-width="1.3" opacity=".8"/>`
    + `<path d="${bows}" fill="none" stroke="#6b5363" stroke-width="1.1" opacity=".7"/></g></g>`;
}

function market() {
  const r = rng(303);
  const L = LIGHTS.gold;
  const out = [];
  out.push(sun('m', 1700, 300, 90, L.sun.core, '#fbd99a', '#ffd7a0', 0.8));
  out.push(`<g class="pl-drift">${cloud(r, { x: 300, y: 170, w: 460, h: 90, c: L.cloud, lx: 1 })}</g>`);
  out.push(`<g class="pl-drift">${cloud(r, { x: 1900, y: 120, w: 360, h: 70, c: L.cloud, lx: -1 })}</g>`);
  out.push(kite(980, 150, '#c4553d', [930, 512], 5.8, 0.4));
  out.push(kite(1420, 110, '#3f6f8a', [1368, 508], 7.4, 1.9));
  out.push(kite(780, 196, '#d9a441', [728, 515], 8.6, 3.1));
  out.push(ridge(r, { x0: 0, x1: W, base: 420, top: 370, rough: 12, step: 22, color: '#e9b693' }));
  out.push(skyline(r, { x0: 0, x1: W, base: 422, hMin: 10, hMax: 50, wMin: 12, wMax: 28, s: L.layers.far, sunX: 1700 }));
  out.push(skyline(r, { x0: 0, x1: W, base: 520, hMin: 60, hMax: 170, wMin: 40, wMax: 80, s: L.layers.mid, sunX: 1700, detail: 3.4, roofs: ['gable', 'gable', 'gable', 'mansard', 'spire', 'cone'] }));
  out.push(`<path d="M300 520Q520 400 760 520Z" fill="${L.layers.mid.shade}"/>`);
  const wm = { x: 520, y: 300 };
  out.push(poly([[wm.x - 36, 470], [wm.x - 18, wm.y], [wm.x + 18, wm.y], [wm.x + 36, 470]], fill(L.layers.mid.body)));
  out.push(`<g class="pl-mill" style="transform-origin:${wm.x}px ${wm.y}px"><g transform="rotate(18 ${wm.x} ${wm.y})" fill="${L.layers.mid.shade}">${[0, 90, 180, 270].map((a) => `<g transform="rotate(${a} ${wm.x} ${wm.y})">${rect(wm.x - 3, wm.y - 130, 6, 130)}${rect(wm.x + 3, wm.y - 124, 26, 96)}</g>`).join('')}</g></g>${circle(wm.x, wm.y, 8, fill(L.layers.mid.body))}`);
  const n2 = L.layers.near;
  const strings = [];
  for (const [a, b, y, sag] of [[700, 1040, 430, 26], [1040, 1360, 420, 30], [1360, 1720, 436, 22], [860, 1540, 470, 40]]) {
    for (const px of [a, b]) strings.push(`${rect(px - 3, y - 4, 6, 604 - y, fill('#2c2433'))}${rect(px - 7, y - 9, 14, 6, fill('#2c2433', ' rx="2"'))}${circle(px, y - 13, 4, fill('#2c2433'))}`);
    strings.push(`<path d="M${a} ${y}Q${(a + b) / 2} ${y + sag * 2} ${b} ${y}" fill="none" stroke="#3b3242" stroke-width="1.6"/>`);
    for (let i = 1; i < 12; i += 1) {
      const t = i / 12;
      const lx = (1 - t) * (1 - t) * a + 2 * (1 - t) * t * ((a + b) / 2) + t * t * b;
      const ly = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * (y + sag * 2) + t * t * y;
      strings.push(`<path d="M${n(lx)} ${n(ly)}v4" stroke="#3b3242" stroke-width="1.2"/><rect x="${n(lx - 3.5)}" y="${n(ly + 3)}" width="7" height="2.4" fill="#3b3242"/><ellipse cx="${n(lx)}" cy="${n(ly + 12.5)}" rx="6" ry="8" fill="${r.pick(['#ffd283', '#ffb86b', '#f59a62', '#ffe1a0', '#e8725a'])}"/>`);
    }
  }
  out.push(skyline(r, { x0: -20, x1: 760, base: 600, hMin: 120, hMax: 210, wMin: 70, wMax: 120, s: n2, sunX: 1700, detail: 6, dark: true, roofs: ['gable', 'gable', 'mansard'] }));
  out.push(skyline(r, { x0: 1640, x1: W + 20, base: 600, hMin: 120, hMax: 210, wMin: 70, wMax: 120, s: n2, sunX: 1700, detail: 6, dark: true, roofs: ['gable', 'gable', 'mansard'] }));
  const stalls = [];
  for (let x = 800; x < 1620; x += 130) {
    const c = r.pick(['#a8463a', '#3f6f8a', '#c08a3a', '#6b4f73']);
    stalls.push(rect(x, 540, 110, 60, fill(n2.shade)), `<path d="M${x - 8} 540L${x + 10} 512H${x + 100}L${x + 118} 540Z" fill="${c}"/>`, `<path d="M${x - 8} 540${Array.from({ length: 6 }, () => 'q10 12 21 0').join('')}" fill="${c}"/>`);
  }
  out.push(stalls.join(''));
  out.push(strings.join(''));
  return frame('market', [[0, '#f7e9cf'], [0.5, '#f5d2a0'], [0.75, '#f0b585'], [1, '#e79b78']], out.join(''));
}

function library() {
  const r = rng(404);
  const L = LIGHTS.gold;
  const s = { ...L.layers.mid, body: '#9c8796', shade: '#8d7888', rim: '#f6dcaa' };
  const out = [];
  out.push(sun('l', 600, 150, 60, '#fffaf0', '#fbeccc', '#fff1d6', 0.8));
  out.push(`<g class="pl-drift">${cloud(r, { x: 1300, y: 170, w: 520, h: 90, c: { body: '#fbf4e8', shade: '#efd9c3', rim: '#fff' }, lx: -1 })}</g>`);
  out.push(`<g class="pl-drift">${cloud(r, { x: 1950, y: 260, w: 300, h: 60, c: { body: '#fbf4e8', shade: '#efd9c3', rim: '#fff' }, lx: -1 })}</g>`);
  const pages = [];
  for (let i = 0; i < 9; i += 1) {
    const x = r.range(1500, 2200);
    const y = r.range(60, 300);
    const a = r.range(-30, 30);
    pages.push(`<g class="pl-flutter" style="animation-duration:${n(12 + hash(x, y) * 7)}s;animation-delay:${n(-hash(y, x) * 16)}s"><g transform="rotate(${n(a)} ${n(x)} ${n(y)})"><path d="M${n(x - 12)} ${n(y - 8)}q12 -6 24 0v16q-12 -6 -24 0z" fill="#fbf4e8"/><path d="M${n(x)} ${n(y - 11)}v16" stroke="#c9b49c" stroke-width="1"/></g></g>`);
  }
  out.push(pages.join(''));
  out.push(ridge(r, { x0: 0, x1: W, base: 430, top: 380, rough: 12, step: 24, color: '#e3cfc0' }));
  out.push(skyline(r, { x0: 0, x1: W, base: 432, hMin: 10, hMax: 46, wMin: 12, wMax: 28, s: { ...L.layers.far, body: '#d9c0b4', shade: '#d0b6ab' }, sunX: 600 }));
  const cx = 1200;
  out.push(rect(1060, 290, 280, 72, fill(s.shade)));
  out.push(rect(1052, 286, 296, 7, fill(s.body)));
  out.push(rect(980, 360, 440, 120, fill(s.body)));
  out.push(rect(970, 354, 460, 8, fill(s.body)));
  out.push(poly([[960, 360], [cx, 300], [1440, 360]], fill(s.body)));
  out.push(rect(1080, 230, 240, 58, fill(s.body)));
  out.push(`<path d="M1070 232A130 140 0 0 1 1330 232Z" fill="${s.body}"/>`);
  out.push(rect(cx - 16, 70, 32, 40, fill(s.body)), `<path d="M${cx - 20} 72A20 20 0 0 1 ${cx + 20} 72Z" fill="${s.body}"/>`, rect(cx - 2, 30, 4, 34, fill(s.body)));
  out.push(`<g fill="none" stroke="${s.rim}" stroke-width="1.6" opacity=".8">${[-0.78, -0.4, 0, 0.4, 0.78].map((k) => `<path d="M${n(cx + k * 130)} 232Q${n(cx + k * 60)} 130 ${cx} 112"/>`).join('')}<path d="M960 360L${cx} 300L1440 360"/></g>`);
  out.push(`<g fill="${s.shade}">${Array.from({ length: 11 }, (_, i) => rect(996 + i * 38, 372, 12, 108)).join('')}</g>`);
  out.push(`<g fill="${s.win}">${Array.from({ length: 6 }, (_, i) => `<path d="M${1102 + i * 36} 290V262a9 9 0 0 1 18 0V290z"/>`).join('')}</g>`);
  out.push(poly([[940, 480], [1460, 480], [1500, 520], [900, 520]], fill(s.shade)));
  for (const x of [880, 1460]) out.push(building(r, { x, w: 60, h: 250, base: 480, s, sunX: 600, detail: 4, roof: 'spire' }).svg);
  out.push(skyline(r, { x0: -20, x1: 870, base: 480, hMin: 60, hMax: 180, wMin: 40, wMax: 80, s, sunX: 600, detail: 3.4 }));
  out.push(skyline(r, { x0: 1530, x1: W + 20, base: 480, hMin: 60, hMax: 180, wMin: 40, wMax: 80, s, sunX: 600, detail: 3.4 }));
  out.push(water('lib', 480, [[0, '#e4cdb7'], [1, '#c9a69a']], 600, '#fff6e6', r));
  const n2 = { ...L.layers.near, body: '#6a5868', shade: '#5c4b5b' };
  let br = `M-20 600V520H${W + 20}V600Z`;
  for (let x = -60; x < W; x += 180) br += `M${x + 30} 600V588A75 46 0 0 1 ${x + 180} 588V600Z`;
  out.push(`<path d="${br}" fill="${n2.body}" fill-rule="evenodd"/>`, line(0, 520, W, 520, ` stroke="${n2.rim}" stroke-width="2"`));
  out.push(`<g fill="${n2.body}">${Array.from({ length: Math.ceil(W / 45) + 1 }, (_, i) => rect(i * 45, 500, 6, 20)).join('')}${rect(0, 498, W, 4)}</g>`);
  out.push(`<g fill="#4a3c4f">${[[400, 210], [430, 196], [460, 222], [1900, 330], [1930, 318]].map(([x, y]) => `<path d="M${x - 9} ${y - 3}Q${x - 4} ${y - 5} ${x} ${y}Q${x + 4} ${y - 5} ${x + 9} ${y - 3}Q${x + 4} ${y - 2} ${x} ${y + 1.6}Q${x - 4} ${y - 2} ${x - 9} ${y - 3}Z"/>`).join('')}</g>`);
  return frame('lib', [[0, '#f6efe3'], [0.5, '#f1e1cc'], [0.8, '#e9cbb3'], [1, '#e0b9a2']], out.join(''));
}

function tower(night = false) {
  const r = rng(505);
  const L = night ? LIGHTS.dusk : LIGHTS.gold;
  const out = [];
  if (night) {
    out.push(stars(r, 140, 360, '#f1e6cf', '#e2bf7c'));
    out.push(sun('t', 1240, 330, 110, '#fbf3df', '#efe1c0', '#f4e7c8', 0.35));
  } else out.push(sun('t', 1240, 330, 130, L.sun.core, L.sun.disc, L.sun.halo, 0.9));
  out.push(`<g fill="none" stroke="${L.gilt}" opacity=".55">${circle(1240, 330, 168, ' stroke-width="1.4"')}${circle(1240, 330, 214, ' stroke-width="1" stroke-dasharray="2 7"')}</g>`);
  out.push(`<g class="pl-drift">${cloud(r, { x: 300, y: 160, w: 480, h: 90, c: L.cloud, lx: 1 })}</g>`);
  out.push(`<g class="pl-drift">${cloud(r, { x: 1700, y: 130, w: 420, h: 80, c: L.cloud, lx: -1 })}</g>`);
  out.push(ridge(r, { x0: 0, x1: W, base: 432, top: 392, rough: 12, step: 24, color: night ? '#3d3456' : '#e8bb9a' }));
  out.push(skyline(r, { x0: 0, x1: W, base: 434, hMin: 8, hMax: 40, wMin: 12, wMax: 26, s: L.layers.far, sunX: 1240 }));
  out.push(water('tw', 432, [[0, L.water[0]], [1, L.water[2]]], 1240, L.glint, r));
  const s = L.layers.mid;
  const c = night ? '#2a2440' : '#86677a';
  const cx = 1200;
  const base = 520;
  out.push(poly([[cx - 92, base + 12], [cx - 70, base - 4], [cx - 30, base - 9], [cx + 34, base - 8], [cx + 72, base - 3], [cx + 96, base + 12]], fill(night ? '#1d1a2e' : '#6e5568')));
  out.push(clockTowerShape({ cx, base: base - 6, k: 0.68, body: c, face: night ? '#efe1c0' : L.sun.disc, gilt: L.gilt, rim: night ? '#9a8fc4' : '#ffe7b0', windows: night ? '#ffd27a' : L.sun.disc }));
  out.push(skyline(r, { x0: -20, x1: 980, base: 520, hMin: 40, hMax: 170, wMin: 30, wMax: 70, s, sunX: 1240, detail: 3.2 }));
  out.push(skyline(r, { x0: 1440, x1: W + 20, base: 520, hMin: 40, hMax: 170, wMin: 30, wMax: 70, s, sunX: 1240, detail: 3.2 }));
  out.push(rect(0, 518, 980, 10, fill(s.shade)), rect(1440, 518, 980, 10, fill(s.shade)));
  const n2 = L.layers.near;
  out.push(skyline(r, { x0: -20, x1: 700, base: 600, hMin: 30, hMax: 70, wMin: 60, wMax: 110, s: n2, sunX: 1240, detail: 5, dark: true, roofs: ['gable', 'mansard'] }));
  out.push(skyline(r, { x0: 1700, x1: W + 20, base: 600, hMin: 30, hMax: 70, wMin: 60, wMax: 110, s: n2, sunX: 1240, detail: 5, dark: true, roofs: ['gable', 'mansard'] }));
  return night
    ? frame('towern', [[0, '#151a33'], [0.45, '#2b2e52'], [0.7, '#5a4a6e'], [1, '#3a3352']], out.join(''))
    : frame('tower', [[0, '#f6ecd8'], [0.4, '#f4dcb2'], [0.62, '#f0c48f'], [0.72, '#e8a57c'], [1, '#e8a57c']], out.join(''));
}

function unwritten() {
  const r = rng(606);
  const out = [];
  const g = '#b4893f';
  out.push(ridge(r, { x0: 0, x1: W, base: 440, top: 380, rough: 14, step: 26, color: '#e6ddd0' }));
  const ghost = [];
  let x = 200;
  while (x < 2200) {
    const w = r.range(60, 130);
    const h = r.range(80, 260);
    const roof = r.pick(['gable', 'spire', 'dome', 'flat']);
    const top = 470 - h;
    let d = `M${n(x)} 470V${n(top)}`;
    if (roof === 'gable') d += `L${n(x + w / 2)} ${n(top - w * 0.5)}L${n(x + w)} ${n(top)}`;
    else if (roof === 'spire') d += `L${n(x + w / 2)} ${n(top - w * 1.6)}L${n(x + w)} ${n(top)}`;
    else if (roof === 'dome') d += `A${n(w / 2)} ${n(w / 2)} 0 0 1 ${n(x + w)} ${n(top)}`;
    else d += `H${n(x + w)}`;
    d += 'V470';
    ghost.push(d);
    if (r.chance(0.5)) for (let yy = top + 20; yy < 470; yy += 30) ghost.push(`M${n(x)} ${n(yy)}H${n(x + w)}`);
    x += w + r.range(10, 50);
  }
  out.push(`<path d="${ghost.join('')}" fill="none" stroke="${g}" stroke-width="1.6" stroke-dasharray="6 6" opacity=".6" class="pl-draw"/>`);
  const scaf = [];
  for (let sx = 1050; sx <= 1350; sx += 50) scaf.push(`M${sx} 470V170`);
  for (let sy = 190; sy <= 470; sy += 46) scaf.push(`M1050 ${sy}H1350`);
  for (let sy = 190; sy + 92 <= 470; sy += 92) scaf.push(`M1050 ${sy}L1350 ${sy + 92}`);
  out.push(`<path d="${scaf.join('')}" fill="none" stroke="#8d7a74" stroke-width="3"/>`);
  out.push(rect(1080, 330, 240, 140, fill('#a8939a')), poly([[1080, 330], [1200, 260], [1320, 330]], fill('#a8939a')));
  out.push(`<defs><linearGradient id="fog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2ebe1" stop-opacity="0"/><stop offset=".55" stop-color="#f2ebe1" stop-opacity=".92"/><stop offset="1" stop-color="#f2ebe1"/></linearGradient></defs><g class="pl-fog">${rect(-100, 330, W + 200, 270, ' fill="url(#fog)"')}</g>`);
  out.push(`<path d="M1160 600Q1190 520 1200 470L1206 470Q1214 520 1250 600Z" fill="#d9cbbd"/>`);
  out.push(rect(1290, 520, 6, 60, fill('#6d5c5c')), `<path d="M1268 524h56l10 10-10 10h-56z" fill="#8a6f60"/>`);
  return frame('unw', [[0, '#efe8dd'], [0.6, '#ece2d6'], [1, '#f2ebe1']], out.join(''));
}

function dusk() {
  const r = rng(707);
  const L = LIGHTS.dusk;
  const near = { ...L.layers.near, late: 0.2 };
  const out = [];
  out.push(stars(r, 70, 330, '#f1e6cf', '#e2bf7c', 220));
  out.push(`<path d="M1730 160A40 40 0 1 0 1730 236A32 32 0 1 1 1730 160Z" fill="#f4e7c8"/>`);
  out.push(ridge(r, { x0: 0, x1: W, base: 470, top: 410, rough: 14, step: 24, color: '#5d4b6d' }));
  out.push(skyline(r, { x0: 0, x1: W, base: 472, hMin: 14, hMax: 60, wMin: 14, wMax: 30, s: { ...L.layers.far, body: '#4f4064', shade: '#47395b' }, sunX: 1200, detail: 2.2 }));
  out.push(skyline(r, { x0: 0, x1: W, base: 540, hMin: 50, hMax: 170, wMin: 30, wMax: 70, s: L.layers.mid, sunX: 1200, detail: 3.2 }));
  const cx = 1500;
  out.push(clockTowerShape({ cx, base: 560, k: 0.66, body: L.layers.mid.body, face: '#ffd78f', gilt: '#b8935a', rim: '#7d5d73', windows: '#ffcf7e' }));
  out.push(`<defs><radialGradient id="clock-lamp"><stop offset="0" stop-color="#ffd78f" stop-opacity=".55"/><stop offset="1" stop-color="#ffd78f" stop-opacity="0"/></radialGradient></defs><circle class="pl-lamp" cx="1500" cy="287" r="76" fill="url(#clock-lamp)"/>`);
  out.push(skyline(r, { x0: -20, x1: W + 20, base: 600, hMin: 40, hMax: 90, wMin: 50, wMax: 110, s: near, sunX: 1200, detail: 4.5, dark: true, roofs: ['gable', 'gable', 'mansard', 'flat'] }));
  out.push(rect(0, 586, W, 14, fill('#16131f')));
  return frame('dusk', [[0, '#f6efe2'], [0.08, '#f1d7b6'], [0.2, '#d99a7a'], [0.38, '#8a5e78'], [0.6, '#3d3358'], [1, '#16131f']], out.join(''));
}

export const PLATES = { works, observatory, market, library, tower: () => tower(false), 'tower-night': () => tower(true), unwritten, dusk };
