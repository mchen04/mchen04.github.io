# Portfolio verification map

This directory is the maintained source for verifying the user-facing behavior of michaelluochen.com. Read this index before driving the site, then use the matching feature file as the recipe.

## Baseline preconditions

- Serve the checkout with `python3 tools/check/serve.py 4173` from the repository root.
- Run the doctor checks in `../SKILL.md`; the port must belong to this run.
- Start from a clean browser state: open a page, run `agent-browser storage local clear`, then `agent-browser reload`.
- Use agent-browser's own profile. Never attach to the user's browser.
- Never drive an instance this run did not start.

## Driving conventions

- Start every recipe from the baseline state unless its preconditions say otherwise.
- Prefer stable handles: `#menu-toggle`, `#site-nav`, `.time-toggle`, `#topic-filter`, `#topic-status`, `meta[name="theme-color"]`.
- Treat every command as literal. Keep quoted selectors and flags unchanged.
- Check DOM facts with `agent-browser eval` and confirm the visible result with a screenshot.
- Restore browser state (localStorage, emulated media, routes) after a mutation.

## Proof and skip reporting

- Capture the user action and the resulting state, not only the final screen.
- UI proof includes the DOM fact and a screenshot at 390 and 1440 px.
- Record the feature ID and entry point used with every artifact.
- Report an unreachable path with the attempted command and the unmet precondition.
- Do not report a skipped entry point as verified through a different path.

## Feature entry contract

Each feature file starts with an H1 title and one paragraph describing the user-visible behavior. It then uses exactly four H2 sections in this order.

1. `Sub-features` lists short IDs with one line for each behavior.
2. `How to get to it (user POV)` lists every user entry point.
3. `Driving it with agent-browser` starts with `Preconditions:` and uses labeled bullets that pair each user action with an exact command and observable result.
4. `Gotchas` lists traps that can waste or invalidate a verification run.

## Features

- [Day and night theme](./theme.md) covers OS dark mode, the clock, the header switch, persistence, `?time` forcing, first paint, and the browser chrome color.
- [Navigation and menu](./navigation.md) covers the header links and the phone-width menu.
- [Writing topic filter](./writing-filter.md) covers the topic buttons, counts, status text, and pinned entry.
- [Page metadata](./page-metadata.md) covers title, description, canonical, share tags, and one `h1` per page.
