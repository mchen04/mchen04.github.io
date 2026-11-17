# Day and night theme

The site paints a warm day palette or a dark night palette. The choice is forced by `?time=day|night`, otherwise the header switch's remembered choice, otherwise the device's dark mode, otherwise the clock (night from 20:00 to 06:00). The browser chrome color follows the painted theme.

## Sub-features

- `theme-os` follows the device's dark-mode setting when nothing is stored or forced.
- `theme-clock` picks night between 20:00 and 06:00 when the device is light.
- `theme-switch` toggles day and night from the header button.
- `theme-persist` keeps the switch's choice across navigation and reload.
- `theme-force` lets `?time=day` and `?time=night` override everything.
- `theme-first-paint` paints the correct theme before the deferred script runs.
- `theme-color` keeps `meta[name="theme-color"]` equal to the painted background.

## How to get to it (user POV)

- Open any page; the theme follows the device or the clock.
- Choose the sun/moon button in the header to switch.
- Navigate to another page or reload; the switch's choice stays.
- Open a page with `?time=day` or `?time=night` in the address.

## Driving it with agent-browser

Preconditions:

- The server is healthy at `http://127.0.0.1:4173`.
- A page is open, `agent-browser storage local clear` has run, and the page has reloaded.

- **OS dark.** Emulate dark and open the home page. Run `agent-browser set media dark`, `agent-browser open http://127.0.0.1:4173/`, `agent-browser eval 'document.documentElement.classList.contains("night")'`. The result is `true` and the screenshot is dark.
- **OS light.** Emulate light and reload. Run `agent-browser set media light`, `agent-browser reload`, `agent-browser eval 'document.documentElement.classList.contains("night")'`. The result is `false` unless the local clock is between 20:00 and 06:00.
- **Switch.** Click the header button. Run `agent-browser click .time-toggle`, then `agent-browser eval 'document.documentElement.classList.contains("night")'` and `agent-browser eval 'document.querySelector("meta[name=theme-color]").content'`. The class flips and the meta reads `#16131f` for night or `#f6efe2` for day.
- **Persistence.** Navigate and reload. Run `agent-browser open http://127.0.0.1:4173/writing/`, then `agent-browser reload`, then the class check. The chosen theme survives both.
- **Forcing.** Open `http://127.0.0.1:4173/?time=night` and `http://127.0.0.1:4173/?time=day` with a stored opposite value. The class matches the query string, not the stored value.
- **First paint.** Block the deferred script and emulate dark. Run `agent-browser network route /portfolio.js --abort`, `agent-browser open http://127.0.0.1:4173/`, `agent-browser eval 'document.documentElement.classList.contains("night")'`, `agent-browser screenshot <evidence>/first-paint-390-night.png`. The class is `true` and the screenshot is dark, proving the theme decision runs inline in `<head>` and does not wait for the external file. Then `agent-browser network unroute /portfolio.js`.
- **Chrome color.** On every page, compare `meta[name="theme-color"]` with the computed `--paper` token. Run `agent-browser eval 'JSON.stringify({meta:document.querySelector("meta[name=theme-color]").content,paper:getComputedStyle(document.documentElement).getPropertyValue("--paper").trim()})'`. Day is `#f6efe2` and night is `#16131f`; the meta must match the painted theme.

## Gotchas

- The clock rule makes a light-emulated page night between 20:00 and 06:00; use `?time=day` when the test must be deterministic.
- `localStorage` is per origin; clearing it on one page affects every page on the same origin.
- The switch is inserted by `portfolio.js`; if the script is blocked, `.time-toggle` does not exist.
- `agent-browser set media` persists across navigations until changed.
- A stored `time` value outranks the OS setting, so clear storage before testing OS dark.
