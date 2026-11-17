# Page metadata

Every page carries a unique title, a description, a canonical URL, share tags, a theme color, and exactly one `h1`. The metadata is static HTML and must be correct before scripts run.

## Sub-features

- `meta-title` gives each page a unique `<title>`.
- `meta-description` gives each page a non-empty description.
- `meta-canonical` points at the page's own absolute URL.
- `meta-share` provides Open Graph and Twitter tags with an image.
- `meta-h1` gives each page exactly one `h1`.
- `meta-theme` sets `theme-color` to the day background before scripts run.

## How to get to it (user POV)

- Open any page and read the browser tab, the share preview, and the page heading.

## Driving it with agent-browser

Preconditions:

- The server is healthy at `http://127.0.0.1:4173`.

- **Title and description.** Open a page and read them. Run `agent-browser open http://127.0.0.1:4173/projects/hark/`, `agent-browser eval 'JSON.stringify({title:document.title,description:document.querySelector("meta[name=description]").content,canonical:document.querySelector("link[rel=canonical]").href})'`. The title ends with `· Michael Chen`, the description is non-empty, and the canonical is `https://michaelluochen.com/projects/hark/`.
- **Share tags.** Run `agent-browser eval 'JSON.stringify({og:document.querySelector("meta[property=\"og:title\"]").content,twitter:document.querySelector("meta[name=\"twitter:card\"]").content,image:document.querySelector("meta[property=\"og:image\"]").content})'`. All three are present.
- **One heading.** Run `agent-browser eval 'document.querySelectorAll("h1").length'`. The result is `1`.
- **Theme color before scripts.** Block the deferred script and read the meta. Run `agent-browser network route /portfolio.js --abort`, `agent-browser open http://127.0.0.1:4173/projects/hark/`, `agent-browser eval 'document.querySelector("meta[name=theme-color]").content'`. The result is `#f6efe2`, matching the day background the page paints without scripts. Then `agent-browser network unroute /portfolio.js`.
- **Whole site.** Run `node tools/check/pages.mjs http://127.0.0.1:4173`. It reports every page at both widths with no problems.

## Gotchas

- `tools/site/new_case.py` copies `projects/selfie-a-day/index.html` as its template; a head change must land there or new pages drift.
- `tools/site/social.py` rewrites share images from each page's banner; do not hand-edit generated share pictures.
- The canonical URL is absolute and must keep the trailing slash.
- `pages.mjs` also fails on sideways overflow and missing alt text, so a metadata-only change can surface unrelated failures.
