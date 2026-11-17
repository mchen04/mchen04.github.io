import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
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

const SITE = 'https://michaelluochen.com';
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([a-zA-Z:-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const local = (url) => {
  const path = url.split('?')[0].split('#')[0].replace(SITE, '');
  return path.startsWith('/') ? join(root, path.endsWith('/') ? path + 'index.html' : path) : null;
};
const isFile = (url) => {
  const path = local(url);
  return !!path && existsSync(path) && statSync(path).isFile();
};

function metadata(url, list) {
  const file = join(root, url === '/' ? 'index.html' : url.slice(1) + 'index.html');
  const html = readFileSync(file, 'utf8');
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => attrs(m[0]));
  const links = [...html.matchAll(/<link\b[^>]*>/g)].map((m) => attrs(m[0]));
  const find = (tags, key, value) => tags.find((tag) => tag[key] === value) || {};
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const description = find(metas, 'name', 'description').content || '';
  const canonical = find(links, 'rel', 'canonical').href;
  const ogUrl = find(metas, 'property', 'og:url').content;
  const image = find(metas, 'property', 'og:image').content;
  const problems = [];
  if (title.length > 65) problems.push(`title is ${title.length} characters`);
  if (description.length < 50 || description.length > 170) problems.push(`description is ${description.length} characters`);
  if (canonical !== SITE + url) problems.push(`canonical ${canonical}`);
  if (ogUrl !== canonical) problems.push(`og:url ${ogUrl}`);
  if (!image) problems.push('no og:image');
  else {
    if (!isFile(image)) problems.push(`og:image missing ${image}`);
    for (const key of ['og:image:width', 'og:image:height', 'og:image:alt']) {
      if (!find(metas, 'property', key).content) problems.push(`no ${key}`);
    }
  }
  let blocks;
  try {
    blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  } catch (error) {
    problems.push(`bad json-ld ${error.message}`);
    blocks = [];
  }
  const nodes = blocks.flatMap((block) => block['@graph'] || [block]);
  const posting = nodes.find((node) => node['@type'] === 'BlogPosting');
  if (url.startsWith('/writing/') && posting) {
    for (const key of ['headline', 'description', 'datePublished', 'image', 'mainEntityOfPage']) {
      if (!posting[key]) problems.push(`BlogPosting has no ${key}`);
    }
    if (!(posting.author || {}).id && !(posting.author || {})['@id']) problems.push('BlogPosting has no author @id');
    if (posting.image && !isFile(posting.image)) problems.push(`BlogPosting image missing ${posting.image}`);
  }
  for (const href of html.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    if (!isFile(href[1])) problems.push(`broken reference ${href[1]}`);
  }
  for (const tag of html.matchAll(/<img\b[^>]*>/g)) {
    const image = attrs(tag[0]);
    if (!image.alt && image.alt !== '') problems.push('image without alt');
    if (!image.width || !image.height) problems.push(`image without dimensions ${tag[0].slice(0, 60)}`);
  }
  if (list) problems.forEach((problem) => list.push(`${url}: ${problem}`));
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
for (const path of list) if (path !== '/404.html') metadata(path, failures);
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((entry) => ({
  loc: (entry[1].match(/<loc>([^<]+)<\/loc>/) || [])[1],
  lastmod: (entry[1].match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1],
}));
for (const path of list) {
  if (path === '/404.html') continue;
  const matches = entries.filter((entry) => entry.loc === SITE + path);
  if (matches.length !== 1) failures.push(`${path}: sitemap entries ${matches.length}`);
  else if (!matches[0].lastmod) failures.push(`${path}: sitemap has no lastmod`);
}
for (const entry of entries) if (!list.includes(entry.loc.replace(SITE, ''))) failures.push(`${entry.loc}: sitemap url without page`);
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
