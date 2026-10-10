# BE-7 Describe your day fills in the form

**Status:** Todo
**Blocked by:** [[FE-3 Headcount first|FE-3]] (the headcount goes into the prompt).
The bigger catalogue is done, in [[SHIP-3 Decide on an LLM, and a bigger catalogue|SHIP-3]].
**Done when:** on the live site, a visitor sets the headcount, describes the day, presses
"Fill in the form", and sees the steppers fill in from the whole catalogue - each one theirs to
change - with real calls capped and mocked calls free.

## What

The LLM feature, per [[014 Headcount first, then describe your day]]. Below the headcount, an
optional text box: *"Half have never played, lunch before, a few beers and something sweet
after, prizes for the longest drive."* One press, one call, and the form fills in.

## The flow

1. The visitor writes, presses **Fill in the form** - an explicit action, never on typing.
2. The browser calls `POST /api/group-days/suggest` with the headcount and the text.
3. The route validates (headcount in range, text at most ~500 characters), reads the catalogue
   with `getProducts()`, and calls the model with the catalogue and the headcount in the prompt.
4. The model answers with structured output: `items` - product id and quantity - and
   `notOnTheList` - wishes it couldn't match ("a vegetarian option", "a photographer").
5. The route checks the answer like anything untrusted: ids must be in the catalogue,
   quantities within `MAX_QUANTITY_PER_PRODUCT`. Returns `items` and `notOnTheList`, no prices.
6. The form sets the steppers to the suggestion and shows what it changed, and lists
   `notOnTheList` with "mention it to the club". The visitor adjusts and sends as today.

## Building it

- **A new client** `app/_clients/ai/`, per `.claude/rules/external-apis.md`: `client.ts`, one
  file for the call (`post-suggested-picks.ts`), an `AI_MOCK` switch (`=true` fixed picks,
  `=error` fails), failures as `ExternalApiError`. Add the call and the route to the [[API map]].
- **The model:** the Vercel AI SDK through the AI Gateway free tier
  ([[Vercel AI SDK overview]]; open question *How do we pay for the LLM?*). Pick the model from
  what the free tier offers when building - prices and models change.
- **Structured output** with a zod schema built from the catalogue: `productId` an enum of our
  ids. The model never sets a price.
- **No embeddings, no tools:** the whole catalogue is in the prompt (014).
- **Caps:** max input length, a max output length, and a per-visitor limit - it's public and
  paid past the free tier. How the limit is kept on serverless is in [[Open questions]]
  (*How do we protect the live site's Send?*); a Vercel firewall rule on this route is the
  simplest. A `429` shows as "busy, try again".
- **Fails per feature:** if the model is down, the text box says so and the steppers still work
  - it's a nice-to-have on a form that works without it.
- **Data:** the text goes to the model because the feature needs it; never logged. No name,
  email or phone is sent - they aren't in the request.
- **Prompt injection:** the text is untrusted. The output can only be ids from our list and
  numbers in range, which the visitor sees before anything is sent - the worst case is odd
  picks on screen.

## Testing

`PROPOSALES_MOCK=true GOLF_BOOKING_MOCK=true AI_MOCK=true npm run dev` for building. Then single
real calls to the model, a few descriptions by hand - never a loop. A real Send only with the
user's go-ahead.
