# BE-1 The mocked golf booking system

**Status:** Done 9 October 2026
**Done when:** the products load through the client, and its error mode works like Proposales'.

## What

Per [[011 The catalogue comes from a mocked golf booking system]] - a client in
`app/_clients/<name>/` following `.claude/rules/external-apis.md`: zod schemas, a helper listing the
club's products, fixtures as the only source. A fictional, generic name. The three products:
green fee 18 holes (650 SEK, per player), golf cart (400 SEK, per cart, two players), clubhouse
lunch (185 SEK, per person), with a short description each. Prices in whole kronor here.

## Outcome

Done 9 October 2026, while building the site from the mockup - the form needs products to
show. `app/_clients/golf-booking/`: `getProducts()`, fixtures as the data, and
`GOLF_BOOKING_MOCK=error` to simulate it being down.
*Changed 10 October 2026, from the user:* no fallback to the fixtures - they're served only with
`GOLF_BOOKING_MOCK=true`; off, the client fails as not configured. See
[[011 The catalogue comes from a mocked golf booking system]].
