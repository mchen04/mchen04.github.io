import { execFileSync } from 'node:child_process';

const script = (timeout) => `(async () => {
  const finite = (a) => a.playState === 'running' && a.effect && a.effect.getComputedTiming().endTime !== Infinity;
  const pending = () => document.getAnimations().filter(finite).length;
  if (document.readyState !== 'complete') await new Promise((r) => addEventListener('load', r, { once: true }));
  await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
  await document.fonts.ready;
  const start = performance.now();
  while (pending() && performance.now() - start < ${timeout}) await new Promise((r) => setTimeout(r, 50));
  return JSON.stringify({ ready: pending() === 0, pending: pending() });
})()`;

export function waitReady(timeout = 8000) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      const raw = execFileSync('agent-browser', ['--json', 'eval', script(timeout)], { encoding: 'utf8', maxBuffer: 16 << 20 });
      return JSON.parse(JSON.parse(raw).data.result);
    } catch (error) {
      if (attempt >= 4) throw error;
      execFileSync('sleep', [String(attempt)]);
    }
  }
}
