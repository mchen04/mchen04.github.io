# Navigation and menu

Every page has a header with the site name, the section links, and a menu button that appears at phone width. The menu opens and closes without leaving the page, and the current section is marked.

## Sub-features

- `nav-links` reaches Home, Work, ML & Research, Projects, Writing, About and Resume from every page.
- `nav-current` marks the current section with `aria-current="page"`.
- `nav-menu` opens and closes the phone-width menu from the header button.
- `nav-escape` closes the open menu with Escape and returns focus to the button.
- `nav-outside` closes the open menu when the user clicks outside the header.

## How to get to it (user POV)

- Use the header links on any page.
- At phone width, choose `Menu` to open the section list.

## Driving it with agent-browser

Preconditions:

- The server is healthy at `http://127.0.0.1:4173`.
- The run exported `AGENT_BROWSER_SESSION=portfolio-verify` before any command.
- The viewport is `390 844` for the menu checks and `1440 900` for the link checks.

- **Links.** Open the home page and count the header links. Run `agent-browser open http://127.0.0.1:4173/`, `agent-browser eval 'document.querySelectorAll("#site-nav a").length'`. The result is `7`.
- **Current section.** Open a section page. Run `agent-browser open http://127.0.0.1:4173/writing/`, `agent-browser eval 'document.querySelector("#site-nav a[aria-current=page]").textContent'`. The result is `Writing`.
- **Open menu.** At phone width, click the button. Run `agent-browser set viewport 390 844`, `agent-browser open http://127.0.0.1:4173/`, `agent-browser click #menu-toggle`, `agent-browser eval 'JSON.stringify({expanded:document.querySelector("#menu-toggle").getAttribute("aria-expanded"),open:document.querySelector(".masthead").classList.contains("nav-open"),visible:getComputedStyle(document.querySelector("#site-nav")).display})'`. `expanded` is `"true"`, `open` is `true`, and `visible` is `block`.
- **Escape.** Press Escape. Run `agent-browser press Escape`, then the same eval. `expanded` is `"false"` and `open` is `false`.
- **Outside click.** Reopen the menu and click the page body. Run `agent-browser click #menu-toggle`, `agent-browser click main`, then the same eval. The menu is closed.
- **Proof.** Screenshot the open menu at 390 px. Run `agent-browser screenshot <evidence>/nav-menu-390-day.png`.

## Gotchas

- The menu button and the mobile menu styles depend on the `js` class on `<html>`; with scripts blocked the links are always visible and the button is hidden.
- The menu only exists below 860 px; at 1440 px `#site-nav` is always visible and `#menu-toggle` is hidden.
- Clicking a link inside the menu navigates and closes it; use the body for the outside-click check.
