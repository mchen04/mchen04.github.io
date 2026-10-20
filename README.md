# Michael Chen's personal site

A static personal site for Michael Chen, served by GitHub Pages at
[michaelluochen.com](https://michaelluochen.com/).

Every page is plain HTML that works without JavaScript. The navigation is the same
on every page, in this order: Home, Work, ML & Research, Projects & Fun, Writing,
About, Resume. Up to 860px wide it collapses behind a Menu button so the header stays one row.

- [index.html](index.html): Home. It features Zerg and ZTC, Kestrel, and the audiobook stack with source-based visuals before experience and awards (`#about`), recent writing, and contact (`#contact`). The old `#upstream` anchor remains available. The old anchors `#measured`, `#books`, `#friends` and `#tools`
  sit beside the Projects & Fun link in Contact.
- [work/](work/index.html): Work: Shipped and Leadership. Shipped lists Zerg and ZTC, Zergstack, the multi-agent simulation engine, ZergChat, Zergboard, forward-deployed engineering and MOBIVOLT. Its old anchors link on to
  ML & Research and Projects & Fun.
- [ml/](ml/index.html): ML & Research. Kestrel, the mlx-audio fix, Vireo TTS, the
  Ornith REAP-192 build, the decision-head experiment and PHiLIP, each with machine,
  licence, limits and source links. Kestrel and PHiLIP keep their detail pages at
  `projects/kestrel-tts/` and `projects/philip/`, with breadcrumbs under ML & Research.
- [projects/](projects/index.html): Projects & Fun: the public GitHub activity chart,
  the audiobook setup, apps for friends, personal tools and contributions to friends'
  projects, plus `projects/audiobook-stack/`. `#measured` points to ML & Research.
- [writing/](writing/index.html): Writing. Articles go in `writing/<slug>/index.html`
  and use the `.article` layout in `portfolio.css`.
- [about/](about/index.html): About.
- [resume/](resume/index.html): Michael's resume as a web page, with a PDF download (`resume/michael-chen-resume.pdf`). The PDF is built from his LaTeX resume; the public copy leaves out his phone number.
- Every listed project opens its own HTML page under `projects/`; source and live links remain on those pages.
- [404.html](404.html): served by GitHub Pages for missing addresses.

## Writing and the publishing helper

The publishing helper rewrites two marked blocks and nothing else around them:
`<!-- pwe:archive -->` in `writing/index.html` (the full archive, newest first) and
`<!-- pwe:recent-writing -->` in `index.html` (the three newest articles across all
topics). Keep both markers and their markup as the helper writes them.

Topics come from a fixed set: Books & Web Fiction, Tech & Building, Fantasy Sports
and Miscellaneous. An article's primary topic is the bold label in its archive entry.
Secondary topics go in the `writing-topics` JSON under the archive block, keyed by
slug. `portfolio.js` builds the topic filter from both, showing only topics that have
articles. Without JavaScript the whole list shows.

New articles need the shared seven-link header, including ML & Research and Resume, plus `/portfolio.css` and `/portfolio.js`.

## Shared files

[portfolio.css](portfolio.css) and [portfolio.js](portfolio.js) are shared by every page. The prior `site.css` and `site.js` remain available as reference during preview review; pages no longer load them. Each page's
`<main>` carries a class (`home`, `page-work`, `page-ml`, `page-projects`,
`page-case`, `page-writing`, `page-about`, `page-lost`) for its own treatment;
articles are styled through `.article` so their HTML stays as published.
Local fonts are in [fonts/](fonts/), and page images are in [images/](images/).
[sitemap.xml](sitemap.xml) lists the public pages.

There is no package manifest or build script in this checkout.

## Local preview

Run `python3 -m http.server 4317 --bind 0.0.0.0` from this directory. This is a static site with no build step. Before publishing, check desktop and mobile navigation, all project pages, article filters, PDF download, reduced motion, scroll and tab visibility behavior, layout stability, console errors, and local links and assets. Save screenshots and receipts outside product source.

The home orbit pauses permanently after the first scroll, and pauses while the tab is hidden or reduced motion is enabled. Pages and sections display immediately, with ordinary document navigation and no entry or exit transitions. The Projects activity chart uses its clearly dated cached sample with a link to current GitHub activity.

The resume PDF comes from Michael's LaTeX source, not from the page's print layout. When the resume changes, update the page and the PDF together.
