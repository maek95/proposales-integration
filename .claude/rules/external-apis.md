---
description: How the app talks to any external API (Proposales, an LLM provider, whatever comes next) - one server-only client per service, secrets, request time, never trusting responses, failing per feature, call volume, and mock data.
---

## External APIs

Applies to every third-party service the app calls. What's specific to one service lives in its
own rule file (`proposales.md`).

### One client per service

- **The shared layer is `app/_clients/http.ts`** - one error type (`ExternalApiError`), one
  request function (`requestJson`), the mock switch, and the helpers features use to fail safely
  (`attempt`, `errorResponse`). Every service builds on it; no service re-implements timeouts,
  error mapping, validation or logging.
- **A folder per service** in `app/_clients/<service>/`, split by concern so anything can be found
  from its name:
  - `client.ts` - base URL, auth, the mock switch, response envelope helpers. Internal to the
    folder.
  - `<method>-<thing>.ts` - **one file per call, named for what it does** (`get-products.ts`,
    `post-proposal.ts`), with a helper of the same name (`getProducts`, `postProposal`), its
    zod schemas and the inferred types.
  - `index.ts` - the public surface: `export * from "./<method>-<thing>"` per call, nothing else.
  - `mocks/<method>-<thing>.ts` - the fixture for that call.
  Pages and routes import from `@/app/_clients/<service>`, never from `client.ts`, and never call the
  service's URL themselves.
- **Every call is in the API map**, `vault/Integrations/API map.md` - outbound and inbound. Adding,
  removing or rerouting a call updates it in the same change.
- **Two folders, two directions: `app/api/` is our backend, `app/_clients/` is other systems.**
  - `app/api/` - **inbound**: our own Route Handlers, the URLs the browser calls. A route is the
    whole backend for its request, readable top to bottom: validate the input, check it against
    our data (later a login, our own database, a cap), then call out, then a status code.
  - `app/_clients/` - **outbound**: one folder per other system's API, plus the shared layer.
  - Next to a route, `schema.ts` - its contract: what the browser sends and gets back, shared
    with the form (`app/api/group-days/requests/schema.ts`).
- **The browser reaches our backend only through `app/api/`** - no Server Actions - so every
  entry point is a visible route. Status codes: `201`/`200`, `400` for the visitor's input,
  `502` when a service failed. Logic two routes share goes in a shared helper - not copied,
  and not in a layer of its own until there's a second route.
- **Server only.** Each client keeps `import "server-only"`. Never import one from a
  `"use client"` file - client components call a Route Handler in `app/api/`.
- **Server Components first.** A page's data on load comes from the helpers, called directly in
  its Server Component - never by fetching our own `app/api/` from the server. A Route Handler
  is for what the browser does after the page has loaded: a form submit, data on interaction.

### Secrets

- **Env vars only**, named `<SERVICE>_API_KEY` or similar - never `NEXT_PUBLIC_`, never
  hard-coded, logged or returned in a response. Every var is listed, empty, in `.env.example`.
  On Vercel they're set in the project's environment variables.
- **Never print `.env`.** Redact values if you need to see which vars exist.
- **Request time, not build time.** Read secrets with `requireEnv()` inside the options function
  passed to `requestJson`, which runs after `connection()` - so `next build` works without them.
  Never at module level.

### Requests and responses

- **The service's docs or spec are the source of truth.** Look up paths, parameters and shapes;
  don't guess. When a real response disagrees with the spec, believe the response and note it
  in the service's overview in `vault/Integrations/`.
- **A zod schema per resource**, named `<Thing>Schema` with its type `<Thing>` from `z.infer` -
  never a type written separately. Only the fields the app uses: zod strips everything else, so
  the schema is also the whitelist of what reaches our code.
- **Helpers return the domain value**, not the service's wire format: unwrap envelopes like
  `{ data: [...] }` in the helper, so callers get `Company[]`.
- **Writes take our shape, too.** A helper that sends data takes it in our own terms (whole
  currency units, our field names) and builds the service's format itself, with a zod schema
  for the body checked before every call - mocked or not. A service's format lives in its own
  folder; a second service that wants the same data differently gets its own client, not a
  change to the caller.
- **Only pass on what's needed.** A Route Handler returns the fields its client uses, never the
  whole upstream object - upstream objects carry tokens, IDs and personal data the browser
  shouldn't see.
- **Real accounts.** API keys belong to real accounts. Don't create, update or delete anything
  outside the app's normal flow without the user's go-ahead.

### When the API fails

An external API will eventually be down, slow, or return something we didn't expect. That must
never crash the whole app, and it must never fail silently. The shared layer handles it the same
way for every service - adding an API means writing a schema, not analysing its failure modes.

- **Every failure is an `ExternalApiError`** with the service and a `kind`: `not-configured`
  (our env var is missing), `unreachable`, `timeout`, `rejected` (non-2xx) or
  `invalid-response` (not JSON, or doesn't match the schema). The original error is kept as
  `cause`. No per-service error classes.
- **Never silent.** Every `ExternalApiError` is logged once, where it's created, with the
  service, kind, status and details - including zod's description of exactly which field didn't
  match. Never secrets or personal data.
- **Never trust the response.** Everything is validated against the schema. A response that
  doesn't match is an `invalid-response` error - never trimmed, defaulted or partially shown. If
  a field is genuinely optional upstream, the schema says so (`.nullable()`, `.optional()`);
  that's a decision about the data, not a way to hide a mismatch.
- **Every call has a timeout** (10 seconds by default, `timeoutMs` to change it).
- **Contain the failure to the feature.** A Server Component wraps its call in `attempt()` and
  renders an error state for its own section (`ErrorNotice`); the rest of the page renders.
  `attempt` rethrows Next's control-flow errors and turns anything that isn't an
  `ExternalApiError` into a generic "something went wrong on our side", logged as a bug. Route
  Handlers use `errorResponse(err)`.
- **Messages come from the kind, not the service.** `userMessage` says which service failed and
  how ("Proposales isn't responding right now."), and never includes upstream bodies.
  `httpStatus` maps the kind to our own status - we're a gateway, so upstream failures are
  502/503/504, with 404 and 429 passed through.
- **Critical vs nice-to-have.** If the feature can't work without the API, halt it: show the
  error and disable its actions (no submit button that's bound to fail) until it works again. If
  the API only enriches the page, degrade quietly - hide the extra, keep the rest.
- **Empty is not an error.** An empty list gets its own state ("No companies yet").
- **Test the failure path.** `<SERVICE>_MOCK=error` makes every helper fail; to see a schema
  mismatch, break the schema locally and make one call.

### Call volume

Getting an account throttled or flagged mid-review is the worst outcome, and paid APIs (LLMs)
cost money per call. A missing rate limit in the docs means unknown, not unlimited.

- **No calls in render loops.** No external call in a `useEffect` without a stable dependency
  list, in a polling interval, or on every keystroke. On the client, call on an explicit action
  (a button, a submitted form), debounced where it follows typing.
- **One call per user action.** Don't fan out per item when one call returns them all. If
  fan-out is unavoidable, cap it.
- **When testing, Claude makes single calls.** One `curl` or one page load to verify a change -
  never a loop, a script that calls repeatedly, or a load test.
- **Handle `429`.** Surface it to the user. No automatic retries without a backoff and a cap.
- **Public endpoints that cost money are capped.** Once the app is live on Vercel anyone can
  hit it - an LLM call needs a max output length and a limit on how often one visitor can
  trigger it.

### Mock data

- **Every service has a mock switch**, `mockSwitch(SERVICE, "<SERVICE>_MOCK")`: `=true` makes
  its helpers return fixtures from `app/_clients/<service>/mocks/`; `=error` makes them fail as
  `unreachable`, for testing error states. A helper checks `mocks.serve(fixture)` first and
  returns it if set, then makes the real call - two explicit branches.
  Mocks still call `connection()`, so rendering behaves like a real call. Off by default, so a
  misconfigured deploy fails loudly rather than showing fake data.
- **Never fall back to mock data.** It must always be clear whether a call reached the real API
  or a fixture: fixtures are served only with the switch on. A service with no real API
  connected yet (the golf booking system) fails with `notConnected()` - a logged
  `not-configured` error - when its switch is off.
- **Build UI against mocks.** Use them while iterating and for trying write flows; switch back
  for one final real check.
- **One fixture file per endpoint**, typed with the type inferred from the endpoint's schema,
  so a fixture that drifts from the schema fails `tsc`.
- **Real shape, made-up values.** Take the shape from one real response, then replace every
  value. Fixtures are committed - no real names, emails, phone numbers, tokens or customer
  content.
- **Only the schema's fields**, and realistic enough to design against: a couple of items, varied
  lengths, at least one edge case the UI must handle (an empty list, a missing optional field, a
  long title).
