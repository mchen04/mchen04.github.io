import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const [base = 'http://127.0.0.1:4173', ...paths] = process.argv.slice(2);
const axePath = join(tmpdir(), 'axe-core-4.10.2.min.js');
if (!existsSync(axePath)) {
  const response = await fetch('https://cdn.jsdelivr.net/npm/axe-core@4.10.2/axe.min.js');
  if (!response.ok) throw new Error(`could not download axe-core: ${response.status}`);
  writeFileSync(axePath, await response.text());
}
const axe = readFileSync(axePath, 'utf8');
const ab = (...args) => JSON.parse(execFileSync('agent-browser', ['--json', ...args], { encoding: 'utf8', maxBuffer: 64 << 20 }));
const pages = ['/', '/work/', '/ml/', '/projects/', '/writing/', '/writing/three-types-agent-work/', '/about/', '/resume/', '/projects/kestrel-tts/', '/404.html'];
const list = paths.length ? paths : pages.flatMap((page) => [`${page}?time=day`, `${page}?time=night`]);

let total = 0;
for (const [w, h] of [[1440, 900], [390, 844]]) {
  ab('set', 'viewport', String(w), String(h));
  for (const path of list) {
    ab('open', base + path);
    ab('wait', '600');
    ab('eval', `${axe};1`);
    const raw = ab('eval', `axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}).then(r=>JSON.stringify(r.violations.map(v=>({id:v.id,impact:v.impact,n:v.nodes.length,t:v.nodes.slice(0,3).map(x=>x.target.join(' '))}))))`).data.result;
    const violations = JSON.parse(raw);
    total += violations.length;
    for (const v of violations) console.log(`${w}px ${path} ${v.impact} ${v.id} ×${v.n} ${v.t.join(' | ')}`);
  }
}
console.log(total ? `${total} violation groups` : 'no axe violations');
process.exitCode = total ? 1 : 0;
