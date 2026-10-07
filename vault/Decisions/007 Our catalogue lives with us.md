# 007 Our catalogue lives with us

Decided 6 October 2026. Partly replaces [[006 We're a golf club]].

## Context

[[006 We're a golf club]] planned to put the club's products into the Proposales content library
and have our app read them from there. Two things argued against it:

- The API returns content **without prices** (see [[Proposales overview]]), so our app couldn't
  show what anything costs from Proposales alone.
- The user asked: if the products are ours, why not build the "pick your golf day" interface
  against our own data? We're the club's own system - the catalogue is naturally ours.

The spec makes it possible: a proposal block doesn't have to come from the content library - the
proposal-block docs say so, "possible only via the API". A block takes its own title,
description, quantity and prices.

## Options

- **Proposales content library as the source** - the club manages products in their dashboard,
  our app reads them. But no prices through the API, so prices would live in our data anyway:
  two sources.
- **Our data as the source** - products, prices, units (and later availability and rules) live
  with us. Proposales gets the result: a draft proposal whose blocks carry everything inline.
  The same pattern as Stripe Checkout with inline line items.

## Decision

Our data is the catalogue. The app builds the golf day against it, then creates a draft proposal
in Proposales with the picks as blocks, prices included. Proposales does what it's for: the offer
page, signature, contract, PDF, deposit and versions, and the status we read back.

## Consequences

- One source for products and prices - no gap where the API lacks them.
- The Proposales setup shrinks to the company name and one template. Filling the content library
  becomes optional - useful only if the club also builds proposals by hand in Proposales.
- Where "our data" lives is open - a typed data file for the demo, a database if the app grows
  into needing one (see [[Open questions]]).
- Blocks without a library link may show differently in the Proposales editor than library
  products - check on the first real draft.
