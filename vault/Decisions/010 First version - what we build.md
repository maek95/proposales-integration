# 010 First version - what we build

Decided 6 October 2026. The scope for the first version, pulling together
[[005 A standalone app with Proposales as the engine]] to
[[009 A simple item list, Proposales does the proposal]] and the corrections made along the way.
What the app is, in more detail, is in [[The app]]; how to build it is [[First version build]].

## Context

Over one day of discussion we went from "build anything with the Proposales API" to a concrete
product. Each step is its own decision; this note is the one to build from. The guiding
principle, from the user: **the golf website is the setting, not the product** - the effort goes
into a good integration that uses what Proposales is good at.

## Options

The options for each part were weighed in the earlier decisions - a tool for Proposales users or
our own app (005), which kind of venue (006), whose catalogue (007), a connector or a website
(008), a shop, packages or a simple list (009). Not repeated here.

## Decision

**What it is:** the website of a fictional golf club (name to be picked). One feature - **Company &
group days** - turns a group's request into a ready draft proposal in the club's Proposales
account. Golf clubs sell group days today through an enquiry form and a quote written by hand
([[Golf clubs' group business]]); this replaces the slow part.

**The flow:**

1. **The form** - the visitor fills in quantities of green fees, carts and lunch, a date, and their
   name, email and company. They see an indicative total and send it.
2. **The draft** - the site creates a draft proposal in Proposales: the visitor as recipient, a
   title and description, one priced block per item, linked to the club's template, and our
   tracking in `data` (`source: "website"`, our request id).
3. **The confirmation** - the site says the club will email an offer shortly. Nothing more on our
   side.
4. **Proposales from there** - the club reviews and sends the draft; the customer opens the offer
   page, ticks extras, signs and pays any deposit.

**What it's built on:**

- **The catalogue** - green fee (18 holes), golf cart, clubhouse lunch - as a typed, zod-validated
  data file in our code. A database only when a feature needs data written at runtime. (Settles
  *Where does our catalogue live?* in [[Open questions]].)
- **Proposales** through `app/_lib/proposales/` and the shared layer in `app/_lib/external/`: a
  `createProposal` helper and whatever reads it needs, added with the `proposales-endpoint`
  skill. Prices go in the smallest currency unit.
- **The site** - plain: a page about the club, and the group-days form.
- **The basics** - mocks for every Proposales call (`PROPOSALES_MOCK`), failures contained to the
  form, clear errors, one Proposales call per submit, input validated before anything is sent.

## Out of scope for the first version

- Individual tee-time booking - the club's ordinary booking system.
- A customer-facing status page - the offer page and Proposales' email are the customer's view.
- Syncing signed proposals into a booking system - a stretch goal (needs webhooks or a scheduled
  check).
- Packages, toggles, and the other six catalogue items - can come back if the simple version
  holds up.
- An LLM - the brief counts it as a bonus. Whether and where one fits is a later decision, made
  once the first version works.

## Consequences

- **Building can start now, against mocks.** No real Proposales call is needed until the form
  and the draft work end to end with `PROPOSALES_MOCK=true`.
- **Before the first real draft**, from [[Demo venue setup]]: the club's name, the currency, the
  company renamed (or a second one created) and one template - by hand in the Proposales app.
  The first real write needs the user's go-ahead.
- **To check on the first real draft**: whether the template link copies the template's content,
  how blocks without a content-library link look in the editor, and that sending emails the
  customer.
- Still open, not blocking: how to pay for an LLM if one comes, the deadline, the repo's name.
