# 004 One shared layer for external APIs

Decided 6 October 2026. Partly replaces [[002 Failing per feature, validating by hand]].

## Context

Decision 002 made each section catch its own failures, but the first implementation had three
problems the user pointed out on review:

- The original network error was replaced by a generic one and never logged - an outage would
  leave no trace of *why*.
- A timeout or a malformed response was raised as `ProposalesError`, though Proposales never
  returned it - it's a failure of our integration, not of Proposales.
- Malformed items in a list were silently skipped: the UI would show a shorter list and nobody
  would know data was missing.

And all of it was written for Proposales alone. The next API - an LLM for the brief's bonus -
would have needed the same analysis again.

## Options

- **Keep per-service clients, fix the three problems in each.** Works, but every service repeats
  timeouts, error mapping, validation and logging - and can get them subtly different.
- **One shared layer every service builds on.** Generic error type, request function, mock
  switch and failure helpers; each service adds only base URL, auth and schemas.
- For validation within the shared layer: **hand-written guards** (per-endpoint code, no
  dependency) or **zod** (declarative schemas, one generic validation step, a new dependency).

## Decision

One shared layer in `app/_clients/http.ts`, with zod.

- **`ExternalApiError`** carries the service and a `kind` - `not-configured`, `unreachable`,
  `timeout`, `rejected`, `invalid-response` - plus the original `cause`. User messages and our
  HTTP status come from the kind, so a new service gets correct messages for free.
- **`requestJson`** does the timeout, error mapping and validation, and logs every failure once
  where it happens - including zod's description of exactly which field didn't match.
- **A mismatch is an error, never trimmed.** If data really can be missing, the schema says so
  explicitly.
- **`attempt()`** for Server Components and **`errorResponse()`** for Route Handlers are the only
  two ways features handle failure.

Zod is worth the dependency here: validation becomes one generic step instead of per-endpoint
code, schemas double as the whitelist of fields we read (zod strips the rest), types come from
the schemas, and the Vercel AI SDK uses zod for structured output anyway.

## Consequences

- Adding an API is writing a schema and a base URL - no failure analysis per service.
- A Proposales response that changes shape fails loudly, with a log line naming the field,
  instead of quietly showing less.
- Every failure path was tested on 6 October 2026: missing key, simulated outage, schema
  mismatch, and the real API.
- One more dependency (`zod`).
