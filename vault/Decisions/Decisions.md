# Decisions

One note per decision that shaped the app - what we picked, what we didn't, and why.
Reviewers grade the thought process (see [[The brief]]), so this is where it lives.

## Adding one

Create `Decisions/NNN Short title.md` (`004 What to build.md`, …), numbered by when it's
written, and add it to the log below. If it settles an entry in [[Open questions]], link it
there. Shape:

```markdown
# NNN Short title

Decided <D Month YYYY>.

## Context
What problem or question prompted this.

## Options
What we considered, with the main trade-off of each.

## Decision
What we chose, and why.

## Consequences
What this makes easier or harder; what we'd revisit with more time.
```

A decision that is later reversed keeps its note: add a dated line saying what changed and
link the decision that replaced it.

## Log

- [[001 Mock data for Proposales calls]] - typed fixtures behind `PROPOSALES_MOCK`, so UI work doesn't spend real calls.
- [[002 Failing per feature, validating by hand]] - an API failure breaks only its own section; response shapes checked without a new dependency.
- [[003 Proposales calls go through the Next server]] - the key never reaches the browser; no separate proxy.
- [[004 One shared layer for external APIs]] - one error type, zod schemas, every failure logged; partly replaces 002.
- [[005 A standalone app with Proposales as the engine]] - not a tool for Proposales users; our own app that uses Proposales to simplify one of its processes.
- [[006 We're a golf club]] - our account becomes a golf club's group business; products filled once, no LLM for it. Partly replaced by 007.
- [[007 Our catalogue lives with us]] - products and prices in our data; Proposales gets them inline on each proposal.
- [[008 A golf club's website, with group booking through Proposales]] - the app is the club's site; "Company & group days" creates a ready draft proposal.
- [[009 A simple item list, Proposales does the proposal]] - green fees, carts, lunch with quantities; everything after sending is Proposales'.
- [[010 First version - what we build]] - **the one to build from**: scope, flow, what it's built on, what's out.
- [[011 The catalogue comes from a mocked golf booking system]] - no database; products and prices from a mock-only golf system client.
- [[012 The site's look is Fairway modern]] - bold grotesk, rounded cards, a dark summary panel with the total and Send; spec in [[Fairway modern]].
- [[013 Code is organised by the direction of the call]] - `api/` our backend (each route the whole request), `_clients/` other systems, `_lib/` plain helpers.
- [[014 Headcount first, then describe your day]] - the LLM decision: ~27 products, a required headcount, then an optional text box an LLM turns into quantities. No embeddings.
