# Writing topic filter

The writing index lists articles and adds a row of topic buttons. Choosing a topic hides the other articles, updates the count, and marks the chosen button. The pinned article is labelled.

## Sub-features

- `filter-buttons` shows All plus one button per topic, each with a count.
- `filter-apply` hides articles that do not carry the chosen topic.
- `filter-status` announces the visible count in `#topic-status`.
- `filter-pressed` marks the active button with `aria-pressed="true"`.
- `filter-pin` labels the pinned article with `Pinned ·`.

## How to get to it (user POV)

- Open Writing from the header and choose a topic button above the article list.

## Driving it with agent-browser

Preconditions:

- The server is healthy at `http://127.0.0.1:4173`.
- The page is `/writing/` and the script has run.

- **Buttons.** Open the index and count the buttons. Run `agent-browser open http://127.0.0.1:4173/writing/`, `agent-browser eval 'document.querySelectorAll("#topic-filter button").length'`. The result is `5` (All plus four topics).
- **Apply a topic.** Click `Fantasy Sports`. Run `agent-browser click '#topic-filter button:nth-child(4)'`, `agent-browser eval 'JSON.stringify({hidden:[...document.querySelectorAll("li[data-slug]")].filter(li=>li.hidden).length,shown:[...document.querySelectorAll("li[data-slug]")].filter(li=>!li.hidden).length,status:document.querySelector("#topic-status").textContent})'`. Only Fantasy Sports articles remain and the status reads `Showing N articles in Fantasy Sports.`
- **Pressed state.** Run `agent-browser eval 'document.querySelector("#topic-filter button[aria-pressed=true]").textContent'`. The result starts with `Fantasy Sports`.
- **Back to All.** Click the first button. Run `agent-browser click '#topic-filter button:nth-child(1)'`, then the count eval. Every article is visible and the status reads `Showing N articles.`
- **Pin.** Run `agent-browser eval 'document.querySelector("li[data-slug=three-types-agent-work] .pin").textContent'`. The result is `Pinned · `.
- **Proof.** Screenshot the filtered list at 390 px. Run `agent-browser screenshot <evidence>/writing-filter-390-day.png`.

## Gotchas

- The filter is built by `portfolio.js`; with scripts blocked `#topic-filter` stays `hidden` and every article shows.
- Button order follows the `topics` array in `#writing-topics`, not the article order.
- The pinned article is moved to the top only while All is selected.
- Counts come from the article list, so adding an article changes the expected numbers.
