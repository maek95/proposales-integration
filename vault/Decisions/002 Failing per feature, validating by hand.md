# 002 Failing per feature, validating by hand

Decided 6 October 2026.

> **Partly replaced 6 October 2026 by [[004 One shared layer for external APIs]].** Catching per
> section still stands. What changed: one shared `ExternalApiError` instead of a per-service
> error class, zod schemas instead of hand-written guards, and a response that doesn't match is
> now a loud error - before, malformed list items were silently skipped and the original
> network error was thrown away unlogged. Raised by the user on review: that hid failures, and
> every new API would have needed the same analysis again.

## Context

An external API will be down, slow or return something unexpected at some point - and the app
will be reviewed live, on a schedule we don't control. Before this, a Proposales failure crashed
the whole page, and a changed response shape would have flowed into the UI unchecked.

## Options

- **Let errors bubble to a route-level `error.tsx`.** Least code, but one failing section
  replaces the entire page.
- **Catch per section, render an error state there.** A bit more code per feature; the rest of
  the page keeps working.
- For checking response shapes: **zod schemas** (declarative, a new dependency) or
  **hand-written guards** in each helper (no dependency, more verbose per endpoint).

## Decision

Catch per section, with `unstable_rethrow` so Next's own control-flow errors still pass. Every
failure becomes the service's error class, every call has a timeout, and an empty list is shown
differently from an error. A feature that can't work without its API halts with a clear message;
one that only enriches the page degrades quietly. The rules are in
`.claude/rules/external-apis.md`.

Shapes are checked with hand-written guards for now: with one endpoint, a dependency isn't
justified. `PROPOSALES_MOCK=error` simulates an outage so error states can be checked any time.

## Consequences

- A Proposales outage during the review shows a clear message in one section, not a crash.
- Each new helper needs its own guard. If the Vercel AI SDK comes in, it brings zod for
  structured output anyway - at that point, switch the guards to zod schemas and record it here.
