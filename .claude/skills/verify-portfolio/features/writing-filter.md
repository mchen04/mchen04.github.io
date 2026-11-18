# Writing topic filter

The writing index lists articles and adds a row of topic buttons. Choosing a topic hides the other articles, updates the count, and marks the chosen button. Only topics that at least one article carries get a button. The pinned article is labelled.

## Sub-features

- `filter-buttons` shows All plus one button per topic that at least one article carries as its primary topic or in `also`; a topic with no article is hidden.
- `filter-apply` hides articles that do not carry the chosen topic.
- `filter-status` announces the visible count in `#topic-status`.
- `filter-pressed` marks the active button with `aria-pressed="true"`.
- `filter-pin` labels the pinned article with `Pinned · `.

## How to get to it (user POV)

- Open Writing from the header and choose a topic button above the article list.

## Driving it with agent-browser

Preconditions:

- The server is healthy at `http://127.0.0.1:4173`.
- The run exported `AGENT_BROWSER_SESSION=portfolio-verify` before any command.
- The page is `/writing/` and the script has run.

- **Buttons.** Open the index and compute the expected buttons from the data. Run `agent-browser open http://127.0.0.1:4173/writing/`, then `agent-browser eval 'JSON.stringify((() => { const settings = JSON.parse(document.querySelector("#writing-topics").textContent); const items = [...document.querySelectorAll("li[data-slug]")]; const topics = settings.topics.filter((topic) => items.some((item) => { const primary = item.querySelector(".tag b").textContent.trim(); const also = (settings.also || {})[item.dataset.slug] || []; return primary === topic || also.includes(topic); })); return { buttons: document.querySelectorAll("#topic-filter button").length, labels: [...document.querySelectorAll("#topic-filter button")].map((button) => button.firstChild.textContent), expected: 1 + topics.length, topics }; })())'`. The result must have `buttons === expected` and `labels` equal to All followed by the returned `topics`. With the current content that is 4: All, Books & Web Fiction, Tech & Building, Fantasy Sports; Miscellaneous has no article and is hidden.
- **Apply a topic.** Click the button whose label is `Fantasy Sports`. Run `agent-browser eval '[...document.querySelectorAll("#topic-filter button")].find((button) => button.firstChild.textContent === "Fantasy Sports").click(); 1'`, then `agent-browser eval 'JSON.stringify((() => { const settings = JSON.parse(document.querySelector("#writing-topics").textContent); const items = [...document.querySelectorAll("li[data-slug]")]; const expected = items.filter((item) => { const primary = item.querySelector(".tag b").textContent.trim(); const also = (settings.also || {})[item.dataset.slug] || []; return primary === "Fantasy Sports" || also.includes("Fantasy Sports"); }).length; return { expected, shown: items.filter((item) => !item.hidden).length, status: document.querySelector("#topic-status").textContent }; })())'`. `shown` equals `expected` and `status` reads `Showing N articles in Fantasy Sports.` (`article` when N is 1).
- **Pressed state.** Run `agent-browser eval 'document.querySelector("#topic-filter button[aria-pressed=true]").firstChild.textContent'`. The result is `Fantasy Sports`.
- **Back to All.** Click the button whose label is `All`. Run `agent-browser eval '[...document.querySelectorAll("#topic-filter button")].find((button) => button.firstChild.textContent === "All").click(); 1'`, then the count eval. Every article is visible and the status reads `Showing N articles.`
- **Pin.** Run `agent-browser eval 'document.querySelector("li[data-slug=three-types-agent-work] .pin").textContent'`. The result is `Pinned · `.
- **Proof.** Screenshot the filtered list at 390 px. Run `agent-browser screenshot <evidence>/writing-filter-390-day.png`.

## Gotchas

- The filter is built by `portfolio.js`; with scripts blocked `#topic-filter` stays `hidden` and every article shows.
- Button order follows the `topics` array in `#writing-topics`, and topics no article carries are omitted, so the order and count both come from the data.
- The pinned article is moved to the top only while All is selected.
- Counts come from the article list and the `also` map, so adding an article changes the expected numbers.
