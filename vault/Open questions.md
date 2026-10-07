# Open questions

Things discussed but not settled, with the options and any recommendation. When one is settled
it becomes a note in [[Decisions]], and its entry here links there and moves to *Settled*.

## How do we pay for the LLM?

Raised 6 October 2026. Background in [[Vercel AI SDK overview]].

Proposed 6 October 2026: the **AI Gateway free tier**. No cost, fits "host it on Vercel", and the
worst case for a public demo is a `429` rather than a bill. Alternative: a provider key directly,
which bills per token from the first call. Which model is still open - it depends on what the
free tier offers when we build it.

## When is the deadline?

Raised 6 October 2026. The email says "Monday next week" - 2026-10-12 if it arrived the week of
2026-10-05. Needs confirming against the email's date.

## Do we rename the repo?

Raised 6 October 2026. The repo is `proposales-integration`, but the vault is meant for a wider
product where Proposales is one integration. Worth deciding before the GitHub link is sent.

## Settled

- **Where does our catalogue live?** Settled 6 October 2026 - a typed data file for the first
  version; a database only when a feature needs runtime writes. See
  [[010 First version - what we build]].

- **Is Proposales' role in the app big enough?** Settled 6 October 2026 - a simple item list on
  our side, and Proposales does the proposal: the club's adjustments, extras, offer page,
  signature and deposit. See [[009 A simple item list, Proposales does the proposal]].

- **Which idea do we build?** Settled 6 October 2026 - the golf club's website, with group
  booking through Proposales. See [[008 A golf club's website, with group booking through Proposales]].
- **Is our app a bridge from the club's booking system?** Settled 6 October 2026 - no, a website;
  the bridge becomes one feature of it. Same decision.

- **Do we set up a demo venue?** Settled 6 October 2026 - yes, as a golf club. See
  [[006 We're a golf club]].
- **What kind of app are we?** Settled 6 October 2026 - a standalone app that uses Proposales to
  simplify one of its processes. See [[005 A standalone app with Proposales as the engine]].

## Settled questions, with their history

Kept for the reasoning - how we got from the first ideas to the decisions.

### Which idea do we build?

Raised 6 October 2026. Now framed by [[005 A standalone app with Proposales as the engine]]. Candidates in [[Proposales integration ideas]], judged against
[[The brief]] (LLM bonus, no special access, one finished flow).

Proposed 6 October 2026:

1. **Proposal from a conversation** - paste a lead's email, an LLM extracts the event details as
   structured output, and the app creates a *draft* proposal from one of the account's
   templates. Shows the most of the Proposales API (reads templates, writes a draft) and the AI
   SDK. Drafts aren't sent, so the real-data risk is low.
2. **Chat intake** - a chatbot interviews a lead and submits a request for proposal through the
   public inbox. More playful and safer - the inbox needs no API key - but shows less of the API.

Revised 6 October 2026, after checking what the platform already does: **chat intake is
dropped** - their AI-powered Inbox Widget already does it. **Proposal from a conversation
partly overlaps** their Outlook add-in (email → RFP) and needs a sharper angle. Ideas the
platform doesn't advertise, and that involve an LLM: **Proposal coach** (review a proposal and
suggest improvements), **Lost-deal debrief** (patterns in why proposals were rejected or
expired) and **Auto-tagging** into custom `data`. Proposal coach is the safest start - read-only,
one proposal at a time. No recommendation settled yet.

Revised again 6 October 2026, after deciding on a standalone app. The API creates priced drafts
but can't send them (see [[Proposales overview]]), so the best fit turns something messy into a
ready-to-send proposal. Candidates:

1. **Gig quoting** for musicians or DJs - paste a booking request, an LLM picks packages from the
   content library, a priced draft quote appears; the band sends it for signing.
2. **Handshake** - paste an informal deal (selling a bike, renting a cabin weekend), an LLM
   extracts the terms, a draft agreement appears for the seller to send for e-signature.
3. **Offsite or party planner** - describe an event, an LLM structures it, the app sends it as
   an RFP to venues using Proposales (our account, `is_test`, in the demo).
4. **Dinner-party or catering builder** - guests and vibe in, a menu from a caterer's content
   library out, as a priced proposal.

1 and 2 use the most of the API; 3 is safest (inbox, no key) but shows less.

Clarified by the user, 6 October 2026: **we're building something that uses Proposales, not
something inside it.** The candidates above still make the proposal the product (paste in, get a
proposal out). Instead the app is about something else, and Proposales is one step in it - the
way an app uses Stripe for payments without being a payments app. Shape: *the app's core is X →
at one step, Proposales does the heavy lifting.* Examples:

- **Team offsite planner** - core is planning (voting on dates and activities, budget); "book it"
  sends the request to the venue via Proposales, and the proposal's status shows in the planner.
- **Band gig calendar** - core is availability, setlists, tour planning; a confirmed booking
  becomes an offer or contract through Proposales.
- **Wedding or party planner** - core is guests, timeline and to-dos; "book the venue or caterer"
  goes through Proposales.

Best picked from a domain the user cares about - they'll be explaining why the app exists.

Direction set 6 October 2026 (see [[006 We're a golf club]]): our venue is a golf club, and the
integration should make it easy to **book a lot at the club in one go** - a whole golf day for a
group, not item by item. What the app is around that, and whether an LLM has a place in it, is
still open.

Noted 6 October 2026: with the API, *we are the venue* - there's no catalogue of hotels to book
(see *Who it's for* in [[Proposales overview]]). So apps whose user is the seller (the band gig
calendar) fit cleanly; buyer-side apps (the offsite planner) can only send requests into an
inbox, which in the demo is our own account.

Corrected 6 October 2026, after the user pointed it out: Proposales is built for **venues
proposing event and group bookings**, not arbitrary quotes or contracts. That drops the
off-domain ideas - band gig calendar, Handshake, catering builder, gig quoting. What stays: an
app about **planning an event, a group trip or a stay** - team offsite, wedding, sports camp,
conference - whose booking step asks a venue for a proposal through its inbox. A venue joins by
giving the app its inbox token, as it would for the website widget. In the demo, our account is
the venue, set up with believable rooms, meeting rooms and packages.

Settled 6 October 2026 by [[008 A golf club's website, with group booking through Proposales]].

### Is our app a bridge from the club's booking system?

Raised 6 October 2026, from the user: a real golf club has its own booking system that knows its
products, prices and availability - so nothing has to live in Proposales; our app sends the
selection along.

Proposed 6 October 2026: **our app as the bridge between a golf club's booking system and
Proposales** - read products, prices and availability from the club's system, let a company put
its golf day together, create a ready draft proposal (not an inbox request - that carries no
product lines; see [[Proposales overview]]). Proposales does this for hotels through its
booking-system integrations ("live availability and pricing from D-EDGE in your proposals"); no
golf booking system is listed, so we'd fill that gap. It also closes our availability gap.

In the demo, our catalogue data stands in for the club's booking system - possibly behind the
same external-API pattern (`app/_lib/<service>/` with mocks only), so a real golf booking system
could be swapped in by writing its client.

To weigh: it makes the app more of a connector than the standalone app of
[[005 A standalone app with Proposales as the engine]]. Not decided.

Settled 6 October 2026 by [[008 A golf club's website, with group booking through Proposales]]: the app is the club's website, and the bridge is one feature of it.

### Is Proposales' role in the app big enough?

Raised by the user, 6 October 2026: with the catalogue and the picker in our app (see
[[007 Our catalogue lives with us]]), Proposales doesn't simplify the bulk booking itself - "it
has simply given us a cool PDF?"

What it does do, after the customer has picked: the club's **review step** (the draft is checked
- availability, price, discount - before it's sent; we have no availability data), a **hosted
offer page** the customer acts on (extras, headcount), a **legally binding e-signature** turning
it into a contract, **deposits**, **versions** when the customer changes their mind, and the
**status** our app reads back. Building that ourselves is the part we'd least want to - the
Stripe pattern. The PDF is the least of it.

But the reviewers might still see it as a thin use of their product. A variant that gives it more
of the booking: our app sends a rough composition ("a golf day for about 24, these pieces"), with
extras marked `optional` and quantities `quantity_editable`, so the detailed choosing happens on
Proposales' offer page rather than in our UI. Not decided.

Leaning 6 October 2026: a short form on our side - package, headcount, date, a few toggles, with
quantities derived - and the details on Proposales' offer page. See *Proposed: a short form, not
a shop* in [[The app]].

Settled 6 October 2026 by [[009 A simple item list, Proposales does the proposal]].

### Where does our catalogue live?

Raised 6 October 2026, by [[007 Our catalogue lives with us]]. The club's products and prices are
ours now - but stored where?

- **A typed data file** in the repo - no infrastructure, versioned with the code, validated with
  zod. Enough while the catalogue is fixed and only we edit it.
- **A database** (e.g. Postgres on Vercel) - needed once the catalogue changes at runtime: an
  admin page, availability, bookings to remember.

Proposed 6 October 2026: start with the data file; move to a database only when a feature needs
data written at runtime.

Settled 6 October 2026 by [[010 First version - what we build]].
