# The app

What we're building, as it stands. The scope of the first version is
[[010 First version - what we build]]; *why* it's this is in the earlier [[Decisions]]. Updated as
the app takes shape.

## In one sentence

The website of a fictional golf club, where a company or group can put together its golf day
and get a ready offer from the club - powered by Proposales.

## What matters

From the user, 6 October 2026: **the golf website is the setting, not the product.** We're not
building the coolest booking interface - we're building a good integration that uses what
Proposales is good at. The site stays plain; the effort goes into:

- **A proper draft** - with recipient, title, description and the items as priced blocks,
  linked to the club's template (`tracking.created_from_template`). Whether that link copies the
  template's content or only records it is to be checked on the first real draft.
- **Our own tracking in Proposales' `data`** - e.g. `source: "website"` and our request id, so
  proposals from the website can be told apart, and found again by a later sync step.
- **Proposales' strengths left to Proposales** - optional extras, editable quantities, the offer
  page, signature and deposit. Nothing of that rebuilt.
- **The integration basics** - mocks, failures contained to the feature, clear errors, low call
  volume (`.claude/rules/external-apis.md`).

## The site

The club's own website, kept plain - a page about the club and the group-days form is enough.
*Changed 9 October 2026:* they're separate pages - a landing page at `/` with a way into each, the club at `/club`, group
days at `/group-days` - so the site reads as a club with a group-days feature, not as a form. The club is **Tallmora GK**,
fictional (see [[Demo venue setup]]).

## The feature: Company & group days

*Renamed 6 October 2026* from "book the whole venue", which overstated it - a full-course booking
is one option among the packages, not the headline. Why a club wants this, and how group days
are sold today: [[Golf clubs' group business]].

1. **Put it together** - the visitor fills in quantities of the basic items (green fees, carts,
   lunch) and a date. Products and prices come from the club's golf booking system - mocked
   ([[011 The catalogue comes from a mocked golf booking system]]).
2. **Send it** - the site creates a draft proposal in the club's Proposales account, every pick a
   block with its price.
3. **The club reviews** - in Proposales: availability, price, any discount - then sends it. The
   site has already told the visitor "the club will email you an offer shortly", and that's all.
4. **The customer decides** - on Proposales' offer page: optional extras, then e-signature and
   any deposit.
5. **Possibly later: sync on signing** - once signed, the tee times are blocked in the club's
   booking system - the golf version of what Proposales' hotel integrations do. Needs webhooks
   (the powerup) or an occasional scheduled check, so it's a stretch goal.

*Corrected 6 October 2026:* this list first had the site showing the customer where their request
stands. The user asked whether venues really do that - they don't: Proposales emails the
customer, the offer page is their status view, and staff work in the Proposales UI. Status
matters between systems (booking system, CRM), not on the website.

## The form: a simple item list

Decided in [[009 A simple item list, Proposales does the proposal]]. The visitor lists what the
day needs from a few basic items - **green fees, carts, lunch** - each with a quantity, plus a
date, sees an indicative total, and sends it. Everything after that happens in Proposales.

*Earlier proposal, 6 October 2026:* packages, headcount and toggles, with quantities derived from
headcount. The user chose the simpler list instead.

## Out of scope

- Individual tee-time booking - that's the club's ordinary booking system.
- Managing the catalogue in Proposales - it comes from the club's golf booking system.

## Still open

- Whether an LLM has a place.
- The club's photos - free Unsplash stock photos for now, listed in `app/_lib/photos.ts`.
