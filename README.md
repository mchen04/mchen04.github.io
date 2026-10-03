# Michael Chen's personal site

A static personal site for Michael Chen, served by GitHub Pages at
[michaelluochen.com](https://michaelluochen.com/).

Every page is plain HTML that works without JavaScript:

- [index.html](index.html): Home. It covers professional work only: introduction,
  selected work (`#shipped`), an open-source contribution (`#upstream`), experience
  and awards (`#about`), recent writing and contact (`#contact`). The old anchors
  `#measured`, `#books`, `#friends` and `#tools` sit beside the Projects & Fun link
  in Contact.
- [work/](work/index.html): Work: Shipped and Leadership. Its old project anchors
  link on to Projects & Fun.
- [projects/](projects/index.html): Projects & Fun, with the public GitHub activity
  chart and the full project sections, plus one page per detailed project under
  `projects/<slug>/`.
- [writing/](writing/index.html): Writing. Articles go in `writing/<slug>/index.html`
  and use the `.article` layout in `site.css`.
- [about/](about/index.html): About.
- [404.html](404.html): served by GitHub Pages for missing addresses.

[site.css](site.css) and [site.js](site.js) are shared by every page. Each page's
`<main>` carries a class (`home`, `page-work`, `page-projects`, `page-case`,
`page-writing`, `page-about`, `page-lost`) for its own treatment; articles are
styled through `.article` so their HTML stays as published.
Local fonts are in [fonts/](fonts/), and page images are in [images/](images/).
[sitemap.xml](sitemap.xml) lists the public pages.

There is no package manifest or build script in this checkout.
