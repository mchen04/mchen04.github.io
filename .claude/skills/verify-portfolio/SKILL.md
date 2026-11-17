---
name: verify-portfolio
description: "Drive Michael Chen's static portfolio in a real automation browser to prove day/night themes, navigation, the writing topic filter, and page metadata. Use when changing portfolio.css, portfolio.js, page heads, or the page template."
---

# Verify the portfolio

The site is plain static HTML served by GitHub Pages. Every page shares `portfolio.css` and `portfolio.js`; there is no build step. Verification means serving the checkout, driving it in agent-browser at phone and desktop widths, and capturing screenshots plus DOM facts.

## Launch

```bash
python3 tools/check/serve.py 4173
```

Run it in the background from the repository root. It serves the working tree with caching off. Ready when `curl -sf http://127.0.0.1:4173/ >/dev/null` exits 0. Teardown: stop the exact PID you started; never kill by process name.

## Doctor

Run these before driving; if any fails, fix the instance instead of trusting results.

```bash
lsof -nP -iTCP:4173 -sTCP:LISTEN
curl -s -o /dev/null -w '%{http_code}\n' http://127.0.0.1:4173/portfolio.js
agent-browser --version
```

The port must be owned by the server this run started, `/portfolio.js` must return `200`, and agent-browser must answer. agent-browser launches its own Chromium profile; never attach it to the user's browser or reuse their windows.

## Drive

All commands are literal. Use the default agent-browser session for this run and close it at the end.

```bash
agent-browser set viewport 390 844
agent-browser set media dark
agent-browser open http://127.0.0.1:4173/
agent-browser eval 'document.documentElement.className'
agent-browser screenshot /path/to/evidence/home-390-night.png
agent-browser storage local set time night
agent-browser storage local clear
agent-browser network route /portfolio.js --abort
agent-browser network unroute /portfolio.js
agent-browser reload
agent-browser close
```

Prefer `eval` facts over reading pixels: `document.documentElement.classList.contains('night')`, `getComputedStyle(document.documentElement).getPropertyValue('--paper')`, `document.querySelector('meta[name="theme-color"]').content`, `document.querySelectorAll('#site-nav a').length`, `document.querySelectorAll('#topic-filter button').length`.

Open a page before touching `storage local`; on `about:blank` the command fails with `Storage error`.

## Evidence

Write proof under `/Users/michaelchen/Work/portfolio-t_9269c20d/evidence/<round>/` (outside the repository). For each feature capture the action and the resulting state: the command, the DOM fact, and a screenshot at 390 and 1440 px. Name files `<feature>-<width>-<theme>.png`. Proof must exercise the real user path (click the switch, reload, navigate) rather than calling internal functions. Keep evidence after cleanup.

## Cleanup

`agent-browser close` closes the automation browser. Stop the server PID this run started. Remove scratch files inside the repository; never remove the evidence directory.

## Helpers

The repository already ships the harness; use it instead of writing new drivers.

- `node tools/check/pages.mjs [base]`: every page at 1440 and 390 px; fails on script errors, failed loads, sideways overflow, missing alt text or image dimensions, a page without exactly one `h1`, a title over 65 characters, a description outside 50–170 characters, a canonical or `og:url` that does not match the page, a missing share image or its dimensions and alt, unparseable JSON-LD, an article `BlogPosting` without headline, description, datePublished, image, mainEntityOfPage or author, a broken static reference, or a sitemap that misses or repeats a page or lacks a `lastmod`.
- `node tools/check/a11y.mjs [base] [paths…]`: axe-core WCAG 2.1 AA on the main pages, day and night, both widths.
- `node tools/check/frames.mjs <out-dir> [base] [--theme day|night] [--width 1440] [--paths /a,/b]`: top and bottom screenshots after fonts and finite animations settle.
- `node tools/check/motion.mjs <out-dir> [base] [--paths …] [--frames 8] [--gap 400]`: numbered banner and footer frames.
- `node tools/check/worlddiff.mjs <baseline-rev>`: fails when a still plate changes shape.

## Feature map

Read [features/README.md](features/README.md) before driving. It indexes the maintained feature files.
