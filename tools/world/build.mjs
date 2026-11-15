import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { heroMarkup } from './hero.mjs';
import { PLATES } from './plates.mjs';
import { nightCss, nightPlate } from './night.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

function splice(file, name, content) {
  const path = join(root, file);
  const html = readFileSync(path, 'utf8');
  const css = file.endsWith('.css');
  const open = css ? `/* world:${name} */` : `<!-- world:${name} -->`;
  const close = css ? `/* /world:${name} */` : `<!-- /world:${name} -->`;
  const start = html.indexOf(open);
  const end = html.indexOf(close);
  if (start < 0 || end < start) throw new Error(`${file} has no ${open} … ${close} block`);
  const inline = !content.includes('<');
  const next = html.slice(0, start + open.length) + (inline ? content : '\n' + content + '\n') + html.slice(end);
  if (next !== html) writeFileSync(path, next);
  return next !== html;
}

const preview = process.argv.indexOf('--preview');
if (preview > 0) {
  const out = process.argv[preview + 1];
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, 'hero.html'), heroMarkup());
  console.log('preview written');
} else {
  console.log(splice('index.html', 'hero', heroMarkup()) ? 'index.html updated' : 'index.html unchanged');
  splice('portfolio.css', 'night', nightCss());
  mkdirSync(join(root, 'world'), { recursive: true });
  for (const [name, draw] of Object.entries(PLATES)) writeFileSync(join(root, 'world', `${name}.svg`), draw());
  for (const name of ['works', 'market', 'library']) writeFileSync(join(root, 'world', `${name}-night.svg`), nightPlate(PLATES[name]()));
  const still = (svg) => svg.replace(/<style>.*?<\/style>/s, '');
  for (const file of readdirSync(join(root, 'world')).filter((f) => f.endsWith('.svg') && !f.endsWith('-still.svg'))) {
    writeFileSync(join(root, 'world', file.replace(/\.svg$/, '-still.svg')), still(readFileSync(join(root, 'world', file), 'utf8')));
  }
  const css = readFileSync(join(root, 'portfolio.css'), 'utf8').replace(/\/\* world:still \*\/[\s\S]*?\/\* \/world:still \*\//, '');
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*url\('?\/world\/[a-z-]+\.svg'?\)[^{}]*)\}/g)]
    .map(([, selector, body]) => `${selector.trim()}{${body.replace(/\/world\/([a-z-]+)\.svg/g, '/world/$1-still.svg')}}`);
  const cards = ['works', 'observatory', 'market', 'library', 'tower']
    .map((name) => `.chapter-list .plate[style*="/world/${name}.svg"]{background-image:url(/world/${name}-still.svg)!important}`);
  splice('portfolio.css', 'still', `@media(prefers-reduced-motion:reduce){\n${[...rules, ...cards].join('\n')}\n}`);
  console.log(`${Object.keys(PLATES).length} plates written`);
}
