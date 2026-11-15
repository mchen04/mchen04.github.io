import { execFileSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const base = process.argv[2] || 'http://127.0.0.1:4173';
const root = new URL('../..', import.meta.url).pathname;
function ab(...args) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      return JSON.parse(execFileSync('agent-browser', ['--json', ...args], { encoding: 'utf8' }));
    } catch (error) {
      if (attempt >= 4) throw error;
      execFileSync('sleep', [String(attempt)]);
    }
  }
}

function pages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (name.startsWith('.') || name === 'tools' || name === 'node_modules') return [];
    if (statSync(path).isDirectory()) return pages(path);
    return name.endsWith('.html') ? ['/' + relative(root, path).replace(/index\.html$/, '')] : [];
  });
}

const probe = `JSON.stringify({
  bad: performance.getEntriesByType('resource').filter((e) => e.responseStatus >= 400).map((e) => e.name),
  overflow: Math.max(
    document.documentElement.scrollWidth - document.documentElement.clientWidth,
    document.body.scrollWidth - document.body.clientWidth,
    ...[...document.querySelectorAll('main *')].filter((el) => !el.closest('.world'))
      .map((el) => Math.ceil(el.getBoundingClientRect().right - document.documentElement.clientWidth)),
  ),
  noAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).length,
  h1: document.querySelectorAll('h1').length,
})`;

const failures = [];
const list = pages(root).sort();
const sizes = (process.env.WIDTHS || '1440x900,390x844').split(',').map((size) => size.split('x').map(Number));
for (const [w, h] of sizes) {
  ab('set', 'viewport', String(w), String(h));
  for (const path of list) {
    const before = ab('errors').data.errors.length;
    ab('open', base + path);
    ab('wait', '300');
    const errors = ab('errors').data.errors.slice(before).map((e) => e.text.split('\n')[0]);
    const facts = JSON.parse(ab('eval', probe).data.result);
    const problems = [
      ...errors.map((e) => `script error: ${e}`),
      ...facts.bad.map((u) => `failed load: ${u}`),
      ...(facts.overflow > 0 ? [`scrolls sideways by ${facts.overflow}px`] : []),
      ...(facts.noAlt ? [`${facts.noAlt} image(s) without alt`] : []),
      ...(facts.h1 !== 1 ? [`${facts.h1} h1 elements`] : []),
    ];
    if (problems.length) failures.push(`${w}px ${path}: ${problems.join('; ')}`);
  }
}
console.log(`${list.length} pages × ${sizes.length} widths checked`);
console.log(failures.length ? failures.join('\n') : 'no problems found');
process.exitCode = failures.length ? 1 : 0;
