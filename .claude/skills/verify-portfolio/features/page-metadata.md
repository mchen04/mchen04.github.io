# Page metadata

Every page carries a unique title, a description, a canonical URL, share tags, a theme color, and exactly one `h1`. The metadata is static HTML and must be correct before scripts run.

## Sub-features

- `meta-title` gives each page a unique `<title>`.
- `meta-description` gives each page a non-empty description.
- `meta-author` names Michael Chen as the author of every page.
- `meta-canonical` points at the page's own absolute URL.
- `meta-share` provides Open Graph and Twitter tags with an image.
- `meta-h1` gives each page exactly one `h1`.
- `meta-theme` sets `theme-color` to the day background before scripts run.
- `meta-structured` gives every article a BlogPosting with headline, description, datePublished, image, mainEntityOfPage and the site author, and every project page a CreativeWork built from its own name, description and URL.
- `meta-sitemap` lists every indexable page once with a `lastmod` and never lists `/404.html`.

## How to get to it (user POV)

- Open any page and read the browser tab, the share preview, and the page heading.

## Driving it with agent-browser

Preconditions:

- The server is healthy at `http://127.0.0.1:4173`.
- The run exported `AGENT_BROWSER_SESSION=portfolio-verify` before any command.

- **Title and description.** Open a page and read them. Run `agent-browser open http://127.0.0.1:4173/projects/hark/`, `agent-browser eval 'JSON.stringify({title:document.title,description:document.querySelector("meta[name=description]").content,canonical:document.querySelector("link[rel=canonical]").href})'`. The title ends with `· Michael Chen`, the description is non-empty, and the canonical is `https://michaelluochen.com/projects/hark/`.
- **Share tags.** Run `agent-browser eval 'JSON.stringify({og:document.querySelector("meta[property=\"og:title\"]").content,twitter:document.querySelector("meta[name=\"twitter:card\"]").content,image:document.querySelector("meta[property=\"og:image\"]").content})'`. All three are present.
- **One heading.** Run `agent-browser eval 'document.querySelectorAll("h1").length'`. The result is `1`.
- **Theme color.** Open a page in day and in night and read the meta. Run `agent-browser open 'http://127.0.0.1:4173/projects/hark/?time=day'`, `agent-browser eval 'document.querySelector("meta[name=theme-color]").content'`, then the same with `?time=night`. The results are the computed `--paper`: `#f6efe2` and `#17141f`, matching the painted background.
- **Structured data.** Open an article and read its BlogPosting. Run `agent-browser open http://127.0.0.1:4173/writing/how-much-orchestration/`, `agent-browser eval 'JSON.stringify([...document.querySelectorAll("script[type=\\"application/ld+json\\"]")].map((s) => JSON.parse(s.textContent)).flatMap((b) => b["@graph"] || [b]).find((n) => n["@type"] === "BlogPosting"))'`. It has the headline, description, datePublished, image, mainEntityOfPage and the `#person` author. Open `http://127.0.0.1:4173/projects/hark/` and confirm a `CreativeWork` with that page's name and URL.
- **Whole site.** Run `node tools/check/pages.mjs http://127.0.0.1:4173`. It checks metadata, structured data, static references and the sitemap, then opens every page at both widths and reports no problems.

## Gotchas

- `tools/site/new_case.py` copies `projects/selfie-a-day/index.html` as its template; a head change must land there or new pages drift.
- `tools/site/social.py` rewrites share images from each page's banner; do not hand-edit generated share pictures.
- The canonical URL is absolute and must keep the trailing slash.
- `pages.mjs` also fails on sideways overflow and missing alt text, so a metadata-only change can surface unrelated failures.
- The writing publisher appends sitemap entries without a `lastmod`, and `tools/site/new_case.py` writes only the page, so add the sitemap entry and its `lastmod` yourself.
