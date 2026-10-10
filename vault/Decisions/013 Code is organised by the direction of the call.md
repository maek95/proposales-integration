# 013 Code is organised by the direction of the call

Decided 10 October 2026, with the user.

## Context

All non-UI code sat in `app/_lib/`: the clients for other systems' APIs, the logic behind the
form's Send, and plain site data like the club's details - nothing in the names said which was
which. Send was a Server Action, so there was no `app/api/` folder either, and the backend
looked like it wasn't there. The user found it hard to see where a call is made, or that the
backend checks our own data before anything goes to Proposales.

## Options

- **Keep `_lib/`, add a map** - a note listing every call ([[API map]]). No moves, but the folders
  still don't say it.
- **Nest inside `_lib/`** - `_lib/clients/` for outbound, `_lib/group-days/` for logic. Fewer
  moves; the backend still isn't a folder of its own.
- **Folders by direction** - `app/api/` inbound, `app/_server/` the backend logic,
  `app/_clients/` outbound, `app/_lib/` plain helpers.

## Decision

Folders by direction. A request reads top to bottom through them: the browser calls
`app/api/group-days/requests/route.ts`; the route hands it to `app/_server/group-days/`, which
validates and checks the picks against our data; only then does `app/_clients/proposales/`
call Proposales. Whether code is reachable from the browser, decides something, or talks to
another system is visible from its folder. Send became a Route Handler for the same reason - so
every entry point is in `app/api/` (see [[API map]]).

## Consequences

- New code has an obvious home: an endpoint in `api/`, a check (a login, a rate limit, our own
  database) in `_server/`, another system in `_clients/`.
- Swapping the golf booking system for our own database changes `_server/` or `_clients/`, not
  the route or the form.
- One more folder level than Next's defaults; a newcomer reads `CLAUDE.md` or
  `.claude/rules/external-apis.md` once to learn it.

*Changed 10 October 2026, from the user:* `_server/` is gone. With the checks in
`_server/group-days/send-request.ts` and a thin route calling them, one Send was spread over too
many files to follow. The route now holds the whole backend for its request, top to bottom -
validate, check our data, call Proposales, status code - so the rule is two folders:
`app/api/` is our backend, `app/_clients/` is other systems. Logic two routes share would go in
a helper in `app/_lib/`, once there's a second route.

*Changed again 10 October 2026, from the user:* files are named for what they do. A client has
one file per call, `<method>-<thing>.ts` with a helper of the same name (`get-products.ts` →
`getProducts`, `post-proposal.ts` → `postProposal`), instead of one per resource
(`products.ts`, `proposals.ts`). And `app/_lib/` is gone - it had become a drawer: the club's
details and photos are site content in `app/_content/`, the date and money helpers (`formatKr`, `formatLongDate`,
`todayInSweden`) are together in `app/_utils/formatters.ts`, and the Send endpoint's schema sits beside its route as `schema.ts`.
