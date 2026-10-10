# SHIP-3 Decide on an LLM, and a bigger catalogue

**Status:** Done 10 October 2026 - see [[014 Headcount first, then describe your day]]
**Blocked by:** [[BE-3 Send to Proposales through our API, code organised by what it does|BE-3]].
**Done when:** the user has picked an option, the decision is recorded in `Decisions/`, and - if
it's a yes - the feature has its own ticket. *Added 10 October 2026:* and the mocked golf
booking system lists the range a real club sells for group days, grouped in the form - the
catalogue the decision depends on.

## Outcome

Decided 10 October 2026, by the user: **A comes back, made worth it by a real catalogue.** The
club gets ~27 products (below, *The bigger catalogue*), the form asks for the headcount
first as a required select ([[FE-3 The form asks how many you are before anything else|FE-3]]), then offers an optional "describe
your day" box that an LLM turns into quantities across the whole catalogue
([[BE-7 An LLM fills in the form from the visitor's description of the day|BE-7]]). A was ruled out earlier in this ticket
because three products made it a headcount; with 27, prose like "a few beers and something
sweet after" maps onto a dozen lines that no handful of rules gets right. The reasoning is in
[[014 Headcount first, then describe your day]]. Everything below is the discussion that got
there.

The user also asked whether Proposales has an MCP server for the AI's knowledge: it has one,
for its docs only - see [[Proposales overview]].

*Renamed 10 October 2026, from the user:* the ticket was *SHIP-3 Decide on an LLM*. The bigger
catalogue was built here, on this branch, so it's part of this ticket - for a few minutes it was
a separate BE-6, folded in the same day.

### The bigger catalogue

`app/_clients/golf-booking/mocks/get-products.ts` has 27 products in five
categories; the three from [[BE-1 The mocked golf booking system|BE-1]] keep their ids and prices.

| Category | Products |
|---|---|
| On the course | green fee 18 holes, green fee 9 holes, beginner clinic with the pro, range balls, shotgun start, bag drop (free) |
| Hire and shop | golf cart, rental clubs, push trolley, golf balls, logo golf balls in a gift box, golf glove |
| Food | coffee and a bun, clubhouse lunch, halfway snack, sweets for the round, terrace barbecue, three-course dinner, dessert |
| Drinks | soft drink or alcohol-free beer, draught beer, house wine, bubbly for the prize-giving |
| Competition and prizes | competition setup and scoring, longest drive and nearest the pin, prize package, engraved trophy, private room |

- `ProductSchema` has a `category` - the booking system's heading, in its order.
- The form groups the steppers under each category
  (`app/group-days/_components/request-form.tsx`), and a free product shows "Included".
- Edge cases for the UI, per the fixture rule: a 0 kr product, a long name, units other than
  per person ("per group of up to 8", "per box of 12").
- Prices are made up but in the range real clubs charge. VAT now differs between products -
  not in the data yet.

## What

Whether and where an LLM has a place - the brief's bonus ([[The brief]]). Marked very important
by the user, 10 October 2026, with the deadline on 12 October: one small, finished feature
beats a bigger one half done.

**Settled by the user, 10 October 2026:** the LLM lives on the website, in something the
visitor does and watches happen. Nothing LLM-written lands in Proposales on its own - the draft
holds only what the visitor chose, so there's no hidden magic in the club's Proposales
interface. The club reviews a draft built from the visitor's own picks, as today.

## Options

Written 10 October 2026. Each is judged on what a reviewer would see, how much of Proposales it
uses, and what it costs to build by Monday.

### A - "Describe your day" fills in the form

*Ruled out 10 October 2026, by the user:* what the sentence carries - how many people, carts,
lunch - is mostly a headcount, and a headcount field that prefills the steppers does it more
safely and directly than a model guessing from prose (see D). Kept for the reasoning.

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

*Ruled out 10 October 2026* by the rule above - the LLM's work would only show inside
Proposales. Kept for the reasoning. *And, the user, the same day:* it doesn't need an LLM
either. An intro like the one below is a template filled in from the picks - headcount, holes,
carts, lunch, company - so predefined strings in code write it, the same every time and never
promising what the club hasn't confirmed.

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

### C - Suggested extras, on the page

*Ruled out 10 October 2026, by the user:* it doesn't need an LLM. By the time the visitor asks,
the input is already structured - quantities from the steppers - so "16 players → suggest a
prize table" is a rule we could write in a few lines, and do better: predictable, free, no
model to fail. An LLM earns its place where the input is free text, which is A. Kept for the
reasoning.

Once the visitor has put the basics together, they press **"Suggest extras"**. An LLM picks two
or three extras that fit the group - a prize table, range balls, a dinner - from a few extra
products in our catalogue, each with a one-line reason (*"16 on a company day - a prize table
for the longest drive"*). They appear as cards under the form, with their price from our
catalogue and an "Add" button. What the visitor adds joins their list like any other pick and
goes into the draft as an ordinary block. What they don't add is gone - it never reaches
Proposales.

- **What a reviewer sees:** on the site, the LLM reading the group and suggesting what to add,
  with its reasons, and the list and total changing as the visitor adds them.
- **Proposales:** indirect, like A - the same draft, with what the visitor added.
- **Safe by design:** as A - the model only returns product ids from the extras list and a
  short reason; prices come from our catalogue, and the visitor decides.
- **Build:** extra products in the golf booking fixtures, the AI client, a route
  (`POST /api/group-days/extras`), the cards in the form. Send needs no change - an added extra
  is just another pick.

*Changed 10 October 2026, by the user:* C first had the LLM pick the extras **on Send**, behind
the scenes, straight into the draft as optional blocks - nothing on the site. The user pointed
out that this hides the LLM from the visitor: the LLM should be something you see and witness
on the golf website. So the suggestion now happens on the page, on the visitor's click, before
Send. *And, the same day:* the extras not added went in as **optional** blocks
(`optional: true`) for the customer to tick on the offer page. Dropped by the rule above - that
put the LLM's picks into Proposales without the visitor choosing them.

### D - A headcount that prefills the form, no LLM

Proposed by the user, 10 October 2026. A "How many are you?" field at the top of the form. Set
it to 16 and the steppers fill in: 16 green fees, 8 carts (two to a cart), 16 lunches. The
visitor adjusts any of them and sends as before.

- **Why not an LLM:** the visitor states the number directly, and the rest follows from it by
  arithmetic - predictable, instant, free, nothing to fail or to cap. The same test that ruled
  out C.
- **Build:** client-side only, in `app/group-days/_components/request-form.tsx` - a field and
  a rule per product for how its quantity follows from headcount. The Send route doesn't
  change; it still validates whatever the steppers say. An hour or two.
- **History:** headcount-derived quantities were part of the first form proposal, 6 October
  2026, which the user swapped for the simpler item list ([[The app]],
  [[009 A simple item list, Proposales does the proposal]]). D keeps the item list and adds
  headcount only as a shortcut that fills it in.

D is a form improvement, not an LLM feature - it answers C and A, and leaves open whether an
LLM has a place at all (*Recommendation*).

### Common to all three (written before A, B and C were ruled out)

- **Paying:** the AI Gateway free tier through the Vercel AI SDK - no bill, a `429` at worst,
  handled like any service being busy ([[Vercel AI SDK overview]], and the open question *How do
  we pay for the LLM?*). The model is picked when building, from what the free tier offers.
- **Capped:** a max output length on every call, and A's route counts towards the same kind of limit
  as Send (see [[BE-4 A daily cap on how many drafts the website can create in Proposales|BE-4]]).
- **Data:** what the visitor types goes to the LLM only because the feature needs it (A), or the
  group's picks (C) - never email or phone. Nothing logged.
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

*Revised 10 October 2026, after the user's point on C:* **the LLM has to be visible on the
site** - the visitor should see it work. That rules B out (it only shows in
the draft) and turns C into an on-page feature. The recommendation is now **A, then C**: both
are visible, both use the same AI client and the same safety story (ids from our catalogue,
prices never from the model), so C is a second route and a few cards once A exists. B is ruled
out by the rule at the top of this ticket.

*Revised again 10 October 2026:* C is ruled out too - structured input doesn't need an LLM (see
C). **The recommendation is A.** It's the one option where the model does something code
can't: read a sentence and map it onto the catalogue.

*Revised a third time 10 October 2026:* the user ruled out A as well - a headcount does it more
directly (D). That leaves the test every option failed: **an LLM is worth it only for input
code can't read, and this form has none.** What's left:

1. **No LLM, and say why.** Build D, and write the reasoning - four places looked at, each
   better done by a form or hidden inside Proposales - in decision 014 and the README. The brief
   makes an LLM a bonus and grades the thought process; a reasoned no is an answer.
2. **"Ask the club"** - a small question box on the group-days page: *"Can we have a shotgun
   start?"*, *"Is there a dress code?"*. The model answers from the club's own details
   (`app/_content/club.ts`) and the catalogue, both put in the prompt - no embeddings, for the
   reason under *Building it*. Free-text questions are input code can't read, and it's on the
   site, in the visitor's hands. Nothing reaches Proposales. The weak point: it's beside the
   integration, not part of it.

Recommended: **D either way**, then 1 - unless the user wants the bonus on screen, in which
case 2 is the only candidate left that passes the test.

## Research: where an LLM is actually needed

Done 10 October 2026, after the user found that none of A-D needed an LLM. Each of those
failed the same way - the input was already structured, so code did it better. So the search
started from the test, not from the form:

1. **The input is something code can't read** - free text, a question, a photo. Not numbers a
   field could hold.
2. **It's on the website, in the visitor's hands**, and they see it work.
3. **Nothing LLM-written reaches Proposales on its own** (the rule at the top).
4. **Proposales doesn't already do it.** Their Inbox Widget has "agentic inquiry handling" -
   understands requirements, qualifies, checks availability, prepares a draft
   ([[Proposales overview]]). An LLM that takes the inquiry is their product, not ours.
5. **Small enough to finish by Monday.**

Where organisers actually struggle, from club and organiser guides ([[Golf clubs' group business]]):
before booking, **what's included and what costs extra** (carts, competition setup, scorecards),
minimum numbers, deposit and cancellation, dress code, pace of play, buggy rules, where the
prize-giving happens, when the meal is. After the day, **the scoring** - handwritten scorecards,
handicaps, a leaderboard done by hand while everyone waits for the prize-giving.

### E - "Ask the club", before you send

A question box on the group-days page. *"We're 30, half have never played - can we still do a
shotgun start and be done by three?"* *"Is range use included?"* *"What if it rains?"* The model
answers from the club's own terms and the catalogue, both in the prompt (no embeddings - see
*Building*), and says *"that's one for the club - put it in your message"* when the answer
isn't there.

- **The test:** passes all five. Questions are free text, often combining several facts, which
  an FAQ page leaves to the reader. It's on the page before Send. Nothing goes to Proposales.
  Proposales' widget takes the inquiry; this answers the questions that come before it.
- **Why it helps the integration:** the visitor sends a request knowing what's included and
  what it costs, so the draft the club gets needs less back-and-forth before it's sent.
- **Safe by design:** answers only from what's in the prompt, says so when it doesn't know,
  never quotes a price that isn't in the catalogue or promises availability. Max output length,
  a per-visitor limit, `AI_MOCK` for fixed answers.
- **Needs:** the club's terms written as content - deposit, cancellation, dress code, carts,
  weather, pace, the prize-giving room - in `app/_content/` (fictional, like the club). Today
  `club.ts` has only name and contact details.
- **Weak point:** it sits next to the Proposales call, not in it. The strongest answer to that
  is the line above - better requests in.
- **Build:** the AI client, `POST /api/group-days/questions`, the box and the answer in the
  form, the terms content. About half a day.

### F - Scorecards to leaderboard, after the day (playful)

The organiser photographs the group's handwritten scorecards; a vision model reads names,
handicaps and scores per hole, the visitor corrects any misread number, and the site shows the
leaderboard for the prize-giving.

- **The test:** handwriting in a photo is the clearest case of input code can't read, and the
  pain is real - "the presentation is delayed by an hour". On the site, nothing to Proposales.
- **Weak point:** it's about the day itself, not the booking - the furthest from Proposales of
  anything here. The brief allows playful, but a reviewer may ask what it has to do with the
  integration. Also more to build: image upload, a vision model on the free tier (to check),
  scoring rules.

### Looked at and dropped

- **A chat that takes the whole inquiry**, checks availability and fills the basket - test 4:
  it's what Proposales' agentic inbox does.
- **Pasting the internal email thread** ("Anna can't do week 23, the CEO wants dinner") into the
  form - the strongest version of A, since a thread is genuinely messy, but it's A again, and
  close to Proposales' Outlook add-in (email → RFP).
- **An invitation the organiser sends their players**, written from the picks - a template does
  80% of it; the same objection as B.
- **A format advisor** ("16 of us, mixed levels - which competition?") - three questions and a
  rule pick the format.
- **Pairings and the tee sheet** - an assignment problem; code does it exactly, a model
  approximately.

### Recommendation

**E**, with D alongside it. E is the only candidate that passes every test and still connects
to the integration - the request that reaches Proposales is better informed. F is the one to
build if the user would rather have something memorable than something connected. If neither
convinces, *no LLM, and say why* stays a valid answer for decision 014.

## Handoff

Written 10 October 2026 for the next session. The user is merging branch `BE-3` first.

**Where things stand**

- The site is live on Vercel (deployed by the user, [[SHIP-1 Deploy on Vercel|SHIP-1]]). Send
  creates real drafts in the account - company `5491`, template "Group day at Golf Club" - with
  no daily cap yet ([[BE-4 A daily cap on how many drafts the website can create in Proposales|BE-4]], parked by the user) and no prices showing
  in the draft ([[BE-5 Every line in the Proposales draft shows its price and quantity|BE-5]], next after this).
- The path of a Send and the code layout are in
  [[BE-3 Send to Proposales through our API, code organised by what it does|BE-3]]: the form →
  `app/api/group-days/requests/route.ts` (validate, check our products, call out) →
  `app/_clients/proposales/post-proposal.ts`. Conventions in `CLAUDE.md` and `.claude/rules/`.
- Deadline Monday 12 October 2026 ([[The brief]]). One finished feature, not three.

**The next step:** the user picks E, F or no LLM under *Research* - A, B and C are ruled out,
D is a form change either way. They asked for the endpoint
analysis before choosing - so open by asking, with [[Proposales endpoints]] and the `PATCH`
point above. Once picked: a decision note in `Decisions/` (014), close this ticket, and a new
ticket for the feature.

**Building an LLM feature, if there is one** (written for A; the client, model, caps and data
points hold for any option)

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
- **How the model knows our catalogue - no embeddings.** *Settled 10 October 2026,* after the
  user asked whether suggesting products needs the LLM to talk to a database with embeddings.
  It doesn't. The model never reaches our data: the route reads the catalogue with
  `getProducts()` as it already does, puts the few products (id, name, description) in the
  prompt, and gets back ids and quantities checked against a zod enum of those ids. Embeddings
  (retrieval, RAG) are for when the data is too big for the prompt or is free text to search -
  thousands of products, the club's documents. A handful of products fits in a few hundred
  tokens; retrieval would only add a vector store and a way to pick the wrong product. Tool
  calling (the model asks for the catalogue) isn't needed either - we already know it needs
  all of it, so one call does.
- **Caps:** a max output length on every call, and a limit on how often one visitor can trigger
  it - it costs per call once past the free tier (`.claude/rules/external-apis.md`, *Call
  volume*).
- **Data:** never send email or phone to the model; only what the feature needs. Nothing logged
  ([[Proposales endpoints]], `.claude/rules/proposales.md`).
- **Where it plugs in:** A - a new route, `POST /api/group-days/suggest`, and a text box in
  `app/group-days/_components/request-form.tsx`.

**Testing**

- Build against mocks: `PROPOSALES_MOCK=true GOLF_BOOKING_MOCK=true AI_MOCK=true npm run dev`.
  The user's `.env` is set for **real** Proposales calls - force `PROPOSALES_MOCK=true` in any
  test, or a test creates a real draft in the reviewers' account.
- Real calls - to the model or to Proposales - one at a time, never in a loop, and a real Send
  only with the user's go-ahead.
- `npm run lint` and `npm run build` before finishing; the form can be driven in headless Chrome
  over the DevTools protocol (Next ships a `ws` client in `node_modules/next/dist/compiled/ws`).

