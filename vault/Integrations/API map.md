# API map

Every API call in the app, both directions, in one place. Written 10 October 2026. Kept current:
whoever adds, removes or reroutes a call updates this table in the same change.

The folders follow the direction of the call ([[013 Code is organised by the direction of the call]]):

- **Inbound** - the browser calls our server. Always a Route Handler in `app/api/.../route.ts`,
  so every entry point is visible there - no Server Actions. The route is the whole backend for
  its request: it validates, checks against our data, then calls out. A page's data on load
  doesn't need one: its Server Component calls the helpers directly.
- **Outbound** - our server calls another service's API, in `app/_clients/<service>/`:
  `client.ts` makes the request, one `<resource>.ts` per resource holds the helper. Never
  called from the browser.

## Outbound - we call them

| Service | Endpoint | Helper | Used by | Mock switch |
|---|---|---|---|---|
| Proposales | `GET /v3/companies` | `getCompanies()` - `app/_clients/proposales/get-companies.ts` | nothing in the app - kept for checking the configured company | `PROPOSALES_MOCK` |
| Proposales | `POST /v3/proposals` | `postProposal()` - `app/_clients/proposales/post-proposal.ts` | the Send route | `PROPOSALES_MOCK` |
| The model (Vercel AI Gateway) | `openai/gpt-4.1-mini`, through the AI SDK's `generateText` | `postSuggestedPicks()` - `app/_clients/ai/post-suggested-picks.ts` | the suggest route | `AI_MOCK` |
| Golf booking system | none connected - fails as not configured | `getProducts()` - `app/_clients/golf-booking/get-products.ts` | `/group-days` page, the Send route | `GOLF_BOOKING_MOCK` (must be `true` for prices) |

## Inbound - the browser calls us

| URL / action | Code | Calls | Used by |
|---|---|---|---|
| `POST /api/group-days/requests` - Send on the group-days form | `app/api/group-days/requests/route.ts` | `getProducts()` to check the picks, then `postProposal()` once | `app/group-days/_components/request-form.tsx` |
| `POST /api/group-days/suggest` - Fill in the form, under *Describe your day* | `app/api/group-days/suggest/route.ts` | `getProducts()` for the catalogue, then `postSuggestedPicks()` once - nothing to Proposales | `app/group-days/_components/describe-day.tsx` |

Pages that load data on the server, with no URL of their own: `/group-days`
(`request-section.tsx` → `getProducts()`).

*Removed 10 October 2026, with the user:* `GET /api/proposales/companies`, a Route Handler left
from the groundwork. Nothing used it, and once live it would have shown the account's company
names to anyone, at one Proposales call per visit.

*Changed 10 October 2026, from the user:* Send was a Server Action - an inbound endpoint Next
creates without a file, which made the backend invisible: no `app/api/` folder at all. It's a
Route Handler now, so `app/api/` shows every way into our backend, and a later check - a login,
our own database, a rate limit - goes in the same place, before anything goes out.
