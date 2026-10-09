# 012 The site's look is Fairway modern

Decided 9 October 2026.

## Context

DES-1 in [[First version build]] asked for a mockup before any code. Three directions were
mocked up in Claude Design ([canvas](https://claude.ai/artifact/KoaxopcEbmGGJmfFZYdJQ8)), each
with the club page, the group-days form and every state, on desktop and at phone width. Raised in
[[Open questions]] as *Which look for the club's site?*

## Options

- **A - Clubhouse classic** - serif, forest green on off-white, a quiet ruled form. Closest to
  real Swedish club sites; least distinctive.
- **B - Fairway modern** - bold grotesk, rounded cards, a dark summary panel with the total and
  the send button beside the items.
- **C - Scorecard** - the form as a scorecard table. Most character, most to build, and a table
  is awkward at phone width.

## Decision

**B, Fairway modern** - the user's pick. The summary panel puts the indicative total and the
one action side by side, which is the moment the integration is about: the picks becoming a
draft in Proposales. It's built from a few plain pieces (cards, a stepper, a pill button), so it
stays cheap to build - the site is the setting, not the product ([[The app]]).

## Consequences

- The build spec is [[Fairway modern]]: tokens, the page section by section, the states, and
  where each piece goes in the code. FE-1 and FE-2 build from it.
- The mockup's prices and default quantities are samples - the data comes from DES-2 and BE-1.
- A and C stay on the canvas for reference; not built.
