# Michael Chen's personal site

A static personal site for Michael Chen, served by GitHub Pages at
[michaelluochen.com](https://michaelluochen.com/).

Every page provides its content and links as plain HTML. The navigation has six
links in this order: Home, Work, ML & Research, Projects & Fun, Writing, About.
With JavaScript, a Menu button controls navigation at widths up to 860px. Without
JavaScript, the links stay visible. Theme switching, topic filters and the live
activity chart require JavaScript; the cached activity table remains readable.

- [index.html](index.html): Home. It covers professional work only: introduction,
  selected work (`#shipped`), a short open-source contribution summary (`#upstream`)
  that links to ML & Research, experience and awards (`#about`), recent writing and
  contact (`#contact`). The old anchors `#measured`, `#books`, `#friends` and `#tools`
  sit beside the Projects & Fun link in Contact.
- [work/](work/index.html): Work: Shipped and Leadership. Its old anchors link on to
  ML & Research and Projects & Fun.
- [ml/](ml/index.html): ML & Research. Kestrel, the mlx-audio fix, Vireo TTS, the
  Ornith REAP-192 build, the decision-head experiment and PHiLIP, each with machine,
  licence, limits and source links. Kestrel and PHiLIP keep their detail pages at
  `projects/kestrel-tts/` and `projects/philip/`, with breadcrumbs under ML & Research.
- [projects/](projects/index.html): Projects & Fun: the public GitHub activity chart,
  the audiobook setup, apps for friends, personal tools and contributions to friends'
  projects, plus `projects/audiobook-stack/`. `#measured` points to ML & Research.
- [writing/](writing/index.html): Writing. Articles go in `writing/<slug>/index.html`
  and use the `.article` layout in `site.css`.
- [about/](about/index.html): About.
- [404.html](404.html): served by GitHub Pages for missing addresses.

## Writing and the publishing helper

Two marked blocks define the publishing integration in this checkout:
`<!-- pwe:archive -->` in `writing/index.html` contains the full archive, newest
first. `<!-- pwe:recent-writing -->` in `index.html` contains three recent articles
across all topics. Preserve each opening marker, closing marker and entry metadata.
The publishing helper and its templates are outside this repository; their current
implementation is not documented here.

Topics come from a fixed set: Books & Web Fiction, Tech & Building, Fantasy Sports
and Miscellaneous. An article's primary topic is the bold label in its archive entry.
Secondary topics go in the `writing-topics` JSON under the archive block, keyed by
slug. `site.js` builds the topic filter from both, showing only topics that have
articles. The JSON also names a pinned article: All shows it first with a Pinned
label. Topic views restore the archive order. Without JavaScript, the whole archive
stays in its original order and no filter buttons appear.

When adding an article, preserve the six-link navigation, shared files, local font
preloads, canonical URL and structured data. Update the marked lists and sitemap
as needed. Check those facts against the resulting HTML, not an external template.

## Shared files

[site.css](site.css) and [site.js](site.js) are shared by every page. Main elements
use page classes such as `home`, `page-work`, `page-ml`, `page-projects`,
`page-case`, `page-writing`, `page-about` and `page-lost`. Writing detail pages
use an `.article` element inside their main element.

The stylesheet contains successive design layers. Later declarations can override
earlier defaults; check media queries, themes and interaction states before removal.
The script applies the saved theme early, then initializes page behavior when the
DOM is ready. Projects and Writing features check for their page elements.

Local fonts are in [fonts/](fonts/), and page images are in [images/](images/).
Every page preloads Newsreader and PlexMono. Bricolage remains available through
its CSS declaration, without a preload. Keep authored assets even when a current
page does not request them.

[sitemap.xml](sitemap.xml) lists the 15 public page addresses; it excludes the 404
page. [robots.txt](robots.txt) points crawlers to that sitemap. [CNAME](CNAME)
sets the custom domain.

## Local checks

There is no package manifest, build step or repository test runner. Serve the
checkout root so absolute asset paths work:

```sh
python3 -m http.server 18774 --bind 127.0.0.1
```

Open `http://127.0.0.1:18774/`. Stop your preview server with Ctrl-C when finished.
Check JavaScript syntax from the checkout root:

```sh
node --check site.js
```

For shared-file changes, check every page on desktop and phone widths. Check theme
switching, menu keyboard focus and Escape, the 860px navigation boundary, and
in-page links. Check Writing filters and pinned order, plus Projects chart and
table states with live, empty and failed API responses. Check the no-JavaScript
fallback and confirm that local links, images and fonts load. Syntax checks alone
do not establish visual or behavioral correctness.
