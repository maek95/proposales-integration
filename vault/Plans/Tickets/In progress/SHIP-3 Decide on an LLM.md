# SHIP-3 Decide on an LLM

**Status:** In progress
**Blocked by:** [[BE-3 Send to Proposales through our API, code organised by what it does|BE-3]].
**Done when:** the user has picked an option, the decision is recorded in `Decisions/`, and - if
it's a yes - the feature has its own ticket.

## What

Whether and where an LLM has a place - the brief's bonus ([[The brief]]). Marked very important
by the user, 10 October 2026, with the deadline on 12 October: one small, finished feature
beats a bigger one half done.

## Options

Written 10 October 2026. Each is judged on what a reviewer would see, how much of Proposales it
uses, and what it costs to build by Monday.

### A - "Describe your day" fills in the form

A text box above the steppers: *"We're 16 from Acme, 18 holes, carts for half of us, lunch
after - sometime in early June."* An LLM turns it into picks - product ids and quantities,
plus a date and a company if mentioned - and the form fills in. The visitor checks it,
adjusts, and presses Send as before.

- **What a reviewer sees:** the most visible of the three - type a sentence, watch the steppers
  and the total move.
- **Safe by design:** the LLM only proposes ids and quantities, through structured output with a
  zod schema built from our catalogue. Its answer is validated like anything from the browser,
  never sent anywhere by itself, and every price still comes from our data. The visitor
  confirms before anything reaches Proposales.
- **Proposales:** indirect - better input to the same draft.
- **Build:** a route (`POST /api/group-days/suggest`), an AI client in `app/_clients/ai/` with
  an `AI_MOCK` switch, the text box and "fill in the form" in the UI. About half a day.
- **Overlap:** Proposales' own AI inbox widget turns inquiries into requests for proposal. Ours
  goes further for this case: it maps the text onto the club's priced catalogue.

### B - A personal intro in the proposal

On Send, an LLM writes the proposal's intro (`description_md`) for this group - *"A day on the
course for 16 from Acme: 18 holes, carts, lunch on the terrace afterwards…"* - instead of our
one fixed line. The club reads it before sending, as it does everything in the draft.

- **What a reviewer sees:** nothing on the site; a better-written draft in Proposales.
- **Proposales:** direct - the LLM's text is part of the offer, with the club reviewing it in
  their editor. The human in the loop is Proposales' own draft step.
- **Fails quietly:** if the LLM is down or slow, Send falls back to today's fixed line - a
  nice-to-have that degrades, per `.claude/rules/external-apis.md`.
- **Build:** the AI client, one call in the Send route before `postProposal`. A few hours.
- **Watch:** it must not promise what the club hasn't confirmed (availability, a price) - the
  prompt says so, and the club reviews.

### C - Suggested extras as optional lines

On Send, an LLM picks extras that fit the group - a prize table, range balls, a dinner - from a
few extra products in our catalogue, and they go into the draft as **optional** blocks
(`optional: true`), which the customer can tick on Proposales' offer page.

- **What a reviewer sees:** in the offer page, extras the customer can add - Proposales'
  strongest feature, used for what it's for.
- **Proposales:** the most of the three - optional blocks are exactly what the platform does
  that we said we'd leave to it ([[The app]]).
- **Build:** extra products in the golf booking fixtures, the AI client, the choice in the Send
  route, optional blocks in `postProposal`. A bit more than B - and it depends on
  [[BE-5 Prices and quantities in the draft|BE-5]], since the extras need their prices to show.

### Common to all three

- **Paying:** the AI Gateway free tier through the Vercel AI SDK - no bill, a `429` at worst,
  handled like any service being busy ([[Vercel AI SDK overview]], and the open question *How do
  we pay for the LLM?*). The model is picked when building, from what the free tier offers.
- **Capped:** a max output length on every call, and A's route counts towards the same kind of
  limit as Send (see [[BE-4 Daily cap on drafts|BE-4]]).
- **Data:** what the visitor types goes to the LLM only because the feature needs it (A), or the
  group's picks and company name (B, C) - never email or phone. Nothing logged.
- **Mocked:** `AI_MOCK=true` returns fixed answers, so building and testing spend no credits.

## Recommendation

**A**, if there's time for one thing: it's what a reviewer will try on the live site, and it
shows the safety story the case is graded on - LLM output treated as untrusted input, prices
never from the model. **B** is the cheap add-on if a few hours are left: one call, and it puts
the LLM's work inside Proposales itself. C is the strongest Proposales story but leans on BE-5
and more catalogue work - the one to name in the README as "next".

*Added 10 October 2026:* every Proposales endpoint and its LLM angle is in
[[Proposales endpoints]]. The finding that matters here: `PATCH /v3/proposals/{uuid}` updates a
draft in place, so **B doesn't have to slow Send down** - create the draft as now, answer the
visitor, then write the intro and patch it in; if the model fails, the fixed line stays.

## Handoff

Written 10 October 2026 for the next session. The user is merging branch `BE-3` first.

**Where things stand**

- The site is live on Vercel (deployed by the user, [[SHIP-1 Deploy on Vercel|SHIP-1]]). Send
  creates real drafts in the account - company `5491`, template "Group day at Golf Club" - with
  no daily cap yet ([[BE-4 Daily cap on drafts|BE-4]], parked by the user) and no prices showing
  in the draft ([[BE-5 Prices and quantities in the draft|BE-5]], next after this).
- The path of a Send and the code layout are in
  [[BE-3 Send to Proposales through our API, code organised by what it does|BE-3]]: the form →
  `app/api/group-days/requests/route.ts` (validate, check our products, call out) →
  `app/_clients/proposales/post-proposal.ts`. Conventions in `CLAUDE.md` and `.claude/rules/`.
- Deadline Monday 12 October 2026 ([[The brief]]). One finished feature, not three.

**The next step:** the user picks A, B or C (or several) above. They asked for the endpoint
analysis before choosing - so open by asking, with [[Proposales endpoints]] and the `PATCH`
point above. Once picked: a decision note in `Decisions/` (014), close this ticket, and a new
ticket for the feature.

**Building it, whichever option**

- **A new client** `app/_clients/ai/`, following `.claude/rules/external-apis.md`: `client.ts`,
  one file per call named for what it does (e.g. `post-suggested-picks.ts`), an `AI_MOCK`
  switch with fixtures in `mocks/`, failures as `ExternalApiError` through
  `app/_clients/http.ts`. Add every call to the [[API map]].
- **The model:** the Vercel AI SDK through the AI Gateway free tier ([[Vercel AI SDK overview]];
  open question *How do we pay for the LLM?*). Check the free-tier models and limits when
  building - prices and models change. A `429` is "busy, try again", not a crash.
- **Structured output with zod** - the app already validates everything with zod. For A, the
  schema allows only our product ids (`app/_clients/golf-booking/get-products.ts`) and
  quantities up to `MAX_QUANTITY_PER_PRODUCT`
  (`app/api/group-days/requests/limits.ts`); the model never sets a price.
- **Caps:** a max output length on every call, and a limit on how often one visitor can trigger
  it - it costs per call once past the free tier (`.claude/rules/external-apis.md`, *Call
  volume*).
- **Data:** never send email or phone to the model; only what the feature needs. Nothing logged
  ([[Proposales endpoints]], `.claude/rules/proposales.md`).
- **Where it plugs in:** A - a new route, `POST /api/group-days/suggest`, and a text box in
  `app/group-days/_components/request-form.tsx`. B and C - inside the Send route; for B, after
  `postProposal` with a `PATCH` (a new `patch-proposal.ts` in `app/_clients/proposales/`, via the
  `proposales-endpoint` skill).

**Testing**

- Build against mocks: `PROPOSALES_MOCK=true GOLF_BOOKING_MOCK=true AI_MOCK=true npm run dev`.
  The user's `.env` is set for **real** Proposales calls - force `PROPOSALES_MOCK=true` in any
  test, or a test creates a real draft in the reviewers' account.
- Real calls - to the model or to Proposales - one at a time, never in a loop, and a real Send
  only with the user's go-ahead.
- `npm run lint` and `npm run build` before finishing; the form can be driven in headless Chrome
  over the DevTools protocol (Next ships a `ws` client in `node_modules/next/dist/compiled/ws`).

