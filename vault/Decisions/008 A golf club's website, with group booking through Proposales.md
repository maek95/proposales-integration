# 008 A golf club's website, with group booking through Proposales

Decided 6 October 2026.

> **Refined 6 October 2026:** the feature is "Company & group days", not "book the whole venue" -
> golf clubs sell group days as packages, with a full-course booking as one option. The user
> questioned whether a club would want the feature at all; [[Golf clubs' group business]] shows
> it's a standard side business, booked months ahead with a deposit.

## Context

We're a golf club ([[006 We're a golf club]]) whose catalogue lives with us
([[007 Our catalogue lives with us]]). Still open was what the app *is*. The latest proposal - an
app bridging a golf club's booking system and Proposales - risked making it a connector rather
than the standalone app of [[005 A standalone app with Proposales as the engine]].

## Options

- **A connector** between a golf booking system and Proposales - fills a real gap (Proposales
  integrates hotel booking systems, not golf ones), but has no identity of its own.
- **The golf club's own website**, with group booking as one feature - the site stands on its
  own; Proposales powers the "book the whole venue" flow.

## Decision

The golf club's website. At its core it's the club's site; one feature lets a company or group
**put together a whole golf day or venue booking** - green fees, carts, tournament, food, the
clubhouse - and send it. The site creates a **ready draft proposal** in the club's Proposales
account, with every product line and price; the club reviews and sends it; the customer signs.

This is the setup venues already have when they embed Proposales' inquiry widget on their site.
Ours differs: a structured package builder with prices that produces a ready offer, not a
free-text inquiry the staff still have to turn into one.

## Consequences

- The site needs its own identity - a fictional club, its course, its clubhouse - as well as the
  booking feature. See [[The app]].
- Our catalogue data stands in for the club's booking system. It could sit behind the
  external-API pattern so a real golf booking system could be swapped in later.
- Still open: how much of the choosing happens on Proposales' offer page rather than ours, and
  whether an LLM has a place (see [[Open questions]]).
