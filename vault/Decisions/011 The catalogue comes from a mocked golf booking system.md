# 011 The catalogue comes from a mocked golf booking system

Decided 9 October 2026. Partly replaces [[010 First version - what we build]] (where the
catalogue lives).

## Context

010 put the club's catalogue - products and prices - in a typed data file in our own code. The
user wants no hosted database, and pointed out that golf clubs don't build booking themselves:
they integrate with golf booking systems. Checked 9 October 2026: Swedish clubs book through
**Min Golf** (the Swedish Golf Federation's system) or **Sweetspot**, which also does dynamic
green-fee pricing and is now bookable through Min Golf (see [[Golf clubs' group business]]).

## Options

- **A data file in our code** - simplest, but it pretends the club's website owns its prices,
  which real clubs don't.
- **A hosted database** - ruled out by the user: nothing to host.
- **A hosted key-value store** (e.g. Vercel Edge Config) - no database, editable without a
  deploy, but one more service for a demo that doesn't need runtime edits.
- **A mocked golf booking system** - a client in `app/_lib/<service>/` like the Proposales one,
  serving products and prices from its fixtures only.

## Decision

A mocked golf booking system. It sits behind the same external-API pattern
(`.claude/rules/external-apis.md`): a client folder, zod schemas, the mock switch - except it
only ever serves its fixtures, since there's no real system behind it. The fixtures are the
storage: products, units and prices, in the repo, no hosting. A fictional, generic name - not
named after or imitating Min Golf or Sweetspot.

## Consequences

- No database and nothing to host.
- The architecture matches reality: the club's booking system owns products and prices; our site
  composes the request; Proposales makes the offer.
- Swapping in a real golf system later means writing its client - nothing else changes.
- Later features (availability for a date, blocking tee times on signing) have a natural home.
