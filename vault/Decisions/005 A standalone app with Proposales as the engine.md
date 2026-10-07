# 005 A standalone app with Proposales as the engine

Decided 6 October 2026.

## Context

The brief allows anything that uses the Proposales API. Checking what the platform already does
(see [[Proposales overview]]) showed that most tools for Proposales' own users - dashboards,
intake forms, CRM and booking hand-offs - are already covered, natively or through Zapier.

## Options

- **A tool for Proposales' own users** (sales teams at venues). The business value is obvious to
  the reviewers, but it's their roadmap's territory, and most of it is taken.
- **Our own app with Proposales as the engine** - an app about something else entirely, where
  Proposales simplifies one of its processes (quoting, getting something signed, contacting a
  venue).

## Decision

Our own app. It stands on its own - its users don't need to know Proposales exists - but one of
its core steps runs through Proposales, doing real work rather than decoration. That keeps us
clear of what the platform already does, and gives the app a "why" that isn't "Proposales, but
again".

## Consequences

- The app needs its own purpose and audience, decided next (see [[Open questions]]).
- In the demo, everything lands in our own Proposales account - the app's "businesses" are all
  us. We say so openly rather than pretend otherwise.
- The API creates drafts but can't send them, so the app's job ends at a ready-to-send proposal,
  plus following its status after someone sends it from Proposales.
