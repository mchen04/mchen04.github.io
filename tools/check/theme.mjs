import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdtempSync, readFileSync, rmSync, statSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const rootIndex = process.argv.indexOf('--root');
const root = rootIndex > 0 ? process.argv[rootIndex + 1] : join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const chrome = process.env.CHROME || '/Users/michaelchen/Library/Caches/ms-playwright/chromium-1254/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon' };
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const server = createServer((request, response) => {
  const url = new URL(request.url, 'http://x');
  let file = join(root, decodeURIComponent(url.pathname));
  try {
    if (statSync(file).isDirectory()) file = join(file, 'index.html');
    const data = readFileSync(file);
    const stream = url.searchParams.has('stream');
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': stream ? 'no-store' : 'max-age=600' });
    if (stream) {
      const text = data.toString();
      const cut = text.indexOf('<main');
      response.write(text.slice(0, cut));
      setTimeout(() => response.end(text.slice(cut)), 5000);
    } else response.end(data);
  } catch {
    response.writeHead(404);
    response.end('no');
  }
});

class CDP {
  constructor(socket) {
    this.socket = socket;
    this.id = 0;
    this.pending = new Map();
    this.waiters = new Map();
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
      } else if (this.waiters.has(message.method)) {
        const waiter = this.waiters.get(message.method);
        this.waiters.delete(message.method);
        waiter(message.params);
      }
    };
  }
  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }
  once(method, timeout = 15000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.waiters.delete(method);
        reject(new Error(`timeout waiting for ${method}`));
      }, timeout);
      this.waiters.set(method, (params) => {
        clearTimeout(timer);
        resolve(params);
      });
    });
  }
}

const results = [];
const check = (name, ok, facts) => {
  results.push({ name, ok });
  console.log(ok ? 'PASS' : 'FAIL', name, JSON.stringify(facts));
};

const profile = mkdtempSync(join(tmpdir(), 'theme-check-'));
let browser;
let cdp;
try {
  if (!existsSync(chrome)) throw new Error(`Chrome for Testing not found at ${chrome}`);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  browser = spawn(chrome, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', '--disable-background-networking', 'about:blank'], { stdio: 'ignore' });
  const portFile = join(profile, 'DevToolsActivePort');
  let port;
  for (let attempt = 0; attempt < 100 && !port; attempt += 1) {
    if (existsSync(portFile)) port = readFileSync(portFile, 'utf8').split('\n')[0].trim();
    else await sleep(100);
  }
  if (!port) throw new Error('Chrome did not open a debugging port');
  const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page = targets.find((target) => target.type === 'page');
  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.onopen = resolve;
    socket.onerror = reject;
  });
  cdp = new CDP(socket);
  await cdp.send('Page.enable');
  await cdp.send('Runtime.enable');
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', {
    source: "Date.prototype.getHours=function(){return 12};addEventListener('pageshow',function(e){window.__persisted=e.persisted});",
  });

  const evaluate = async (expression) => {
    const result = await cdp.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const facts = () => evaluate(`({
    state: document.readyState,
    night: document.documentElement.classList.contains('night'),
    meta: document.querySelector('meta[name="theme-color"]')?.content,
    paper: getComputedStyle(document.documentElement).getPropertyValue('--paper').trim(),
    stored: localStorage.getItem('time'),
    pressed: document.querySelector('.time-toggle')?.getAttribute('aria-pressed') ?? null,
    paints: performance.getEntriesByType('paint').length,
  })`);
  const waitFor = async (expression, timeout = 10000) => {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (await evaluate(expression)) return true;
      await sleep(50);
    }
    return false;
  };
  const navigate = async (url, wait = true) => {
    const loaded = wait ? cdp.once('Page.loadEventFired') : null;
    await cdp.send('Page.navigate', { url });
    if (loaded) await loaded;
  };
  const click = async (selector) => {
    const box = await evaluate(`(() => {
      const element = document.querySelector(${JSON.stringify(selector)});
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
    })()`);
    if (!box) throw new Error(`no element ${selector}`);
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: box.x, y: box.y, button: 'left', clickCount: 1 });
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: box.x, y: box.y, button: 'left', clickCount: 1 });
  };

  for (const width of [390, 1440]) {
    await cdp.send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });

    await navigate(`${origin}/`);
    const streamLoaded = cdp.once('Page.loadEventFired', 15000).catch(() => {});
    navigate(`${origin}/?time=night&stream=${width}`, false);
    const streamReady = await waitFor("document.readyState === 'loading' && document.documentElement.classList.contains('js') && getComputedStyle(document.documentElement).getPropertyValue('--paper').trim() !== '' && performance.getEntriesByType('paint').length > 0", 4500);
    const stream = await facts();
    check(`stream-first-paint-meta-${width}`, streamReady && stream.state === 'loading' && stream.paints > 0 && stream.night && stream.meta === stream.paper, { ...stream, streamReady });
    await streamLoaded;

    for (const [query, night] of [['day', false], ['night', true]]) {
      await navigate(`${origin}/?time=${query}`);
      const loaded = await facts();
      check(`loaded-meta-equals-paper-${query}-${width}`, loaded.night === night && loaded.meta === loaded.paper, loaded);
    }

    await navigate(`${origin}/`);
    await evaluate('localStorage.clear()');
    await navigate(`${origin}/`);
    await evaluate('document.fonts.ready');
    if (width < 860) await click('#menu-toggle');
    const writingLoaded = cdp.once('Page.loadEventFired', 15000).catch(() => {});
    await click('#site-nav a[href="/writing/"]');
    await writingLoaded;
    await evaluate('document.fonts.ready');
    const hitTest = `(() => {
      const toggle = document.querySelector('.time-toggle');
      if (!toggle) return false;
      const rect = toggle.getBoundingClientRect();
      return toggle.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2));
    })()`;
    let saved;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      if (!(await waitFor(hitTest, 15000))) throw new Error(`switch not hit-testable at ${width}`);
      await sleep(400);
      await click('.time-toggle');
      await sleep(150);
      saved = await facts();
      if (saved.stored === 'night') break;
    }
    await evaluate('history.back()');
    const restored = await waitFor('window.__persisted === true', 10000);
    await sleep(200);
    const back = { ...(await facts()), bfcache: restored };
    check(`bfcache-back-follows-saved-${width}`, saved.stored === 'night' && back.bfcache && back.night && back.meta === back.paper && back.pressed === 'true', { saved, back });
    await evaluate('localStorage.clear()');
  }
} finally {
  if (cdp) cdp.socket.close();
  if (browser) {
    browser.kill();
    await new Promise((resolve) => {
      browser.once('exit', resolve);
      setTimeout(resolve, 3000);
    });
  }
  server.close();
  rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}

const failed = results.filter((result) => !result.ok).length;
console.log(`SUMMARY ${results.length - failed}/${results.length} pass`);
process.exitCode = failed ? 1 : 0;
