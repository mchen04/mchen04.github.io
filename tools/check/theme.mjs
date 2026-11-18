import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { homedir, tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const rootIndex = process.argv.indexOf('--root');
const root = rootIndex > 0 ? process.argv[rootIndex + 1] : join(dirname(fileURLToPath(import.meta.url)), '..', '..');
function findChrome() {
  if (process.env.CHROME) return process.env.CHROME;
  const relatives = ['chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-mac/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing', 'chrome-linux64/chrome', 'chrome-linux/chrome'];
  for (const base of [join(homedir(), 'Library/Caches/ms-playwright'), join(homedir(), '.cache/ms-playwright')]) {
    if (!existsSync(base)) continue;
    for (const version of readdirSync(base).filter((name) => name.startsWith('chromium-')).sort().reverse()) {
      for (const relative of relatives) {
        const candidate = join(base, version, relative);
        if (existsSync(candidate)) return candidate;
      }
    }
  }
  return null;
}
const chrome = findChrome();
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
    this.handlers = new Map();
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
      } else {
        if (this.handlers.has(message.method)) {
          for (const handler of this.handlers.get(message.method)) handler(message.params);
        }
        if (this.waiters.has(message.method)) {
          const waiter = this.waiters.get(message.method);
          this.waiters.delete(message.method);
          waiter(message.params);
        }
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
  on(method, handler) {
    if (!this.handlers.has(method)) this.handlers.set(method, new Set());
    this.handlers.get(method).add(handler);
    return () => this.handlers.get(method).delete(handler);
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
  if (!chrome) throw new Error('Chrome for Testing not found; set CHROME');
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
    source: "Date.prototype.getHours=function(){var m=/[?&]hour=(\\d+)/.exec(location.search);return m?Number(m[1]):12};addEventListener('pageshow',function(e){window.__persisted=e.persisted});",
  });

  const evaluate = async (expression) => {
    const result = await cdp.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  const facts = () => evaluate(`({
    url: location.pathname + location.search,
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

    await evaluate('localStorage.clear()');
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] });
    await navigate(`${origin}/`);
    const osDark = await facts();
    check(`os-dark-empty-${width}`, osDark.night && !osDark.stored && osDark.meta === osDark.paper, osDark);

    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
    await navigate(`${origin}/?hour=21`);
    const clockNight = await facts();
    check(`clock-night-${width}`, clockNight.night && clockNight.meta === clockNight.paper, clockNight);
    await navigate(`${origin}/?hour=12`);
    const clockDay = await facts();
    check(`clock-day-${width}`, !clockDay.night && clockDay.meta === clockDay.paper, clockDay);

    await evaluate('localStorage.clear()');
    await navigate(`${origin}/?hour=12`);
    const beforeChange = await facts();
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }] });
    const wentDark = await waitFor("document.documentElement.classList.contains('night') && document.querySelector('meta[name=theme-color]').content === getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()", 4000);
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
    const wentLight = await waitFor("!document.documentElement.classList.contains('night') && document.querySelector('meta[name=theme-color]').content === getComputedStyle(document.documentElement).getPropertyValue('--paper').trim()", 4000);
    check(`live-os-change-${width}`, !beforeChange.night && wentDark && wentLight, { beforeChange, wentDark, wentLight });

    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'light' }] });
    let saved;
    let back;
    let reasons;
    const attemptLog = [];
    for (let round = 0; round < 4; round += 1) {
      const attempt = round + 1;
      await navigate(`${origin}/?hour=12&attempt=${attempt}`);
      await evaluate('localStorage.clear()');
      await navigate(`${origin}/?hour=12&attempt=${attempt}`);
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
      for (let press = 0; press < 4; press += 1) {
        if (!(await waitFor(hitTest, 15000))) throw new Error(`switch not hit-testable at ${width}`);
        await sleep(400);
        await click('.time-toggle');
        await sleep(150);
        saved = await facts();
        if (saved.stored === 'night') break;
      }
      if (!saved || saved.stored !== 'night') throw new Error(`switch did not save at ${width}`);
      reasons = [];
      const off = cdp.on('Page.backForwardCacheNotUsed', (params) => {
        for (const reason of params.notRestoredExplanations || []) reasons.push(reason);
      });
      const beforeUrl = await evaluate('location.href');
      await evaluate('history.back()');
      const navigated = await waitFor(`location.href !== ${JSON.stringify(beforeUrl)}`, 5000);
      const restored = navigated && await waitFor('window.__persisted === true', 3000);
      if (!restored) await waitFor("document.readyState === 'complete'", 5000);
      await sleep(200);
      off();
      back = { ...(await facts()), bfcache: restored };
      attemptLog.push({ attempt, restored, reasons });
      if (restored) break;
      if (reasons.some((reason) => reason.type !== 'Circumstantial')) break;
    }
    check(`bfcache-back-follows-saved-${width}`, saved.stored === 'night' && back.bfcache && back.night && back.meta === back.paper && back.pressed === 'true', { saved, back, attempts: attemptLog.length, reasons, attemptLog });
    const reloadLoaded = cdp.once('Page.loadEventFired', 15000).catch(() => {});
    await cdp.send('Page.reload');
    await reloadLoaded;
    const reloaded = await facts();
    check(`reload-persist-${width}`, reloaded.night && reloaded.stored === 'night' && reloaded.pressed === 'true' && reloaded.meta === reloaded.paper, reloaded);
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
