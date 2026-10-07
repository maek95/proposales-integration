# 009 A simple item list, Proposales does the proposal

Decided 6 October 2026.

## Context

The "Company & group days" feature ([[The app]]) needs some way for a visitor to say what their
day needs. Two designs had been discussed: a detailed shop picking exact amounts of everything,
and a package form with toggles and quantities derived from headcount (see *Settled questions*
in [[Open questions]]).

## Options

- **A detailed shop** - every product with its own picker. Flexible, but clumsy for the customer
  and the most UI to build.
- **Packages and toggles** - pick a package, headcount and extras; quantities derived. Less to
  fill in, but more logic, and packages to design.
- **A short list of the basic items** - green fees, carts, lunch - each with a quantity. The
  least UI and logic; anything beyond that is handled in the proposal.

## Decision

The short list, from the user: list the specific, easy items - green fees, carts, lunch - and keep
it simple. The visitor fills in quantities and a date, sees an indicative total, and sends it.
The site creates the draft proposal in Proposales; everything after that - the club's
adjustments, extras, the offer page, signature, deposit - is Proposales'.

## Consequences

- The catalogue shrinks to a handful of basic items (see [[Demo venue setup]]).
- Our UI stays small; the interesting work after sending happens in Proposales.
- More items or packages can be added later if the simple version holds up.
