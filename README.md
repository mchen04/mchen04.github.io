# Michael Chen's personal site

A static personal site for Michael Chen, served by GitHub Pages at
[michaelluochen.com](https://michaelluochen.com/).

Every page is plain HTML that works without JavaScript. The navigation is the same
on every page, in this order: Home, Work, ML & Research, Projects & Fun, Writing,
About. Up to 860px wide it collapses behind a Menu button so the header stays one row.

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

The publishing helper rewrites two marked blocks and nothing else around them:
`<!-- pwe:archive -->` in `writing/index.html` (the full archive, newest first) and
`<!-- pwe:recent-writing -->` in `index.html` (the three newest articles across all
topics). Keep both markers and their markup as the helper writes them.

Topics come from a fixed set: Books & Web Fiction, Tech & Building, Fantasy Sports
and Miscellaneous. An article's primary topic is the bold label in its archive entry.
Secondary topics go in the `writing-topics` JSON under the archive block, keyed by
slug. `site.js` builds the topic filter from both, showing only topics that have
articles. Without JavaScript the whole list shows.

The helper's own article template still carries the older five-link navigation. A
newly published article needs the ML & Research link added to its nav.

## Shared files

[site.css](site.css) and [site.js](site.js) are shared by every page. Each page's
`<main>` carries a class (`home`, `page-work`, `page-ml`, `page-projects`,
`page-case`, `page-writing`, `page-about`, `page-lost`) for its own treatment;
articles are styled through `.article` so their HTML stays as published.
Local fonts are in [fonts/](fonts/), and page images are in [images/](images/).
[sitemap.xml](sitemap.xml) lists the public pages.

There is no package manifest or build script in this checkout.
