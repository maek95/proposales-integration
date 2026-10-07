# 006 We're a golf club

Decided 6 October 2026.

> **Partly replaced 6 October 2026 by [[007 Our catalogue lives with us]].** Still stands: we're a
> golf club, group business only, no LLM for the catalogue. What changed: the products no longer
> go into the Proposales content library as the source - they live in our own data, and go into
> Proposales inline on each proposal block. The API returns content without prices, and the user
> pointed out that if the products are ours, the picker belongs on our own data.

## Context

With the API we are the venue (see [[Proposales overview]]), and our account is empty. The app
needs a believable venue whose offers it can work with. Proposales suits group and event
purchases - packages of several items, offered and signed - not single units booked instantly.

## Options

- **A conference hotel in the Stockholm archipelago** - the safest fit for Proposales' core
  market (rooms, meeting rooms, packages), but generic.
- **A golf club** - built around its group business: company golf days, golf trips,
  tournaments. Concrete, easy to picture, and a fun demo. Individual tee times don't fit
  Proposales and stay out of scope.
- **How to fill the catalogue**: by hand or by a seed script once, or with an LLM extracting
  products from a brochure (*Brochure to catalogue* in [[Proposales integration ideas]]).

## Decision

A golf club. Its products - green fees, carts, a shotgun tournament setup, a pro clinic, lunch, a
prize dinner, the clubhouse lounge - go into the content library **once, by seed script or by
hand**, and stay fixed. No LLM extraction: filling a venue's catalogue is their business, and
Proposales may well have smarter ways of doing it - our effort goes into the integration
instead.

The integration's direction: make it easy to **book a lot at the golf club in one go** - a whole
golf day for a group, rather than item by item. What exactly the app is, and where an LLM fits
(if anywhere), is still open (see [[Open questions]]).

## Consequences

- The demo venue setup follows [[Demo venue setup]], with a golf club's products.
- Everything about golf is group business; a "book one tee time" feature is out of scope by
  design, not by omission.
