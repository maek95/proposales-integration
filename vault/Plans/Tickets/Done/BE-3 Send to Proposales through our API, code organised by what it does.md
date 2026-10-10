# BE-3 Send to Proposales through our API, code organised by what it does

**Status:** Done 10 October 2026
**Blocked by:** [[BE-2 createProposal, with its fixture|BE-2]].
**Done when:** Send goes browser → our API → our checks → Proposales; each outcome - a draft
created, field errors, a service down - comes back correctly against mocks and in a browser;
one real Send has created a draft in Proposales; and the code is laid out so that path can be
read from the folders and file names.

## What

Two things, done on the same branch: what happens when the group-days form is sent, end to
end - and, on the way, a code layout where every call can be found from its folder and every
file says what it does.

## Outcome

### The path of a Send

1. `app/group-days/_components/request-form.tsx` - the browser posts the picks (product ids and
   quantities only, no prices) and the contact details.
2. `app/api/group-days/requests/route.ts` - `POST /api/group-days/requests`, the whole backend
   for it, top to bottom: validate the input (`schema.ts` beside it), load the products and
   reject an unknown id, take every price from our data, call Proposales once. `201` sent,
   `400` the visitor's input, `502` a service failed.
3. `app/_clients/proposales/post-proposal.ts` - `postProposal()` builds Proposales' format
   (blocks, öre, the template link, our `data`) and sends `POST /v3/proposals`.

The draft gets the title "Golf day for <company>", an intro the customer reads once the club
sends it, the recipient from the form, one block per pick, and `data` (`source: "website"`,
`form`, `request_id`, `preferred_date`) so website requests can be found in Proposales.

### How the code is organised

```
app/
  api/group-days/requests/   route.ts (the backend for Send), schema.ts, limits.ts
  _clients/                  other systems: http.ts, proposales/, golf-booking/
                             - one file per call: get-products.ts, post-proposal.ts, get-companies.ts
  _content/                  site content, no logic: club.ts, photos.ts
  _utils/formatters.ts       money and dates: formatKr, formatLongDate, todayInSweden
  _components/               shared UI
  club/  group-days/  page.tsx
```

The reasoning, and how it got here, is
[[013 Code is organised by the direction of the call]].

### Decided along the way, with the user

- *Send is a Route Handler, not a Server Action* - so `app/api/` shows every way into the
  backend, with status codes that logs and other clients understand; a later check (a login,
  our own database, the daily cap) goes in the route before anything goes out.
- *The route is the whole backend for its request* - first the checks sat in a `_server/`
  layer behind a thin route; one Send was spread over too many files, so they moved into the
  route.
- *Files named for what they do* - one file per call, `<method>-<thing>.ts`, with a helper of the
  same name; `_lib/` split into `_content/`, `_utils/` and the endpoint's own `schema.ts` and
  `limits.ts` (`MAX_QUANTITY_PER_PRODUCT`, shared by the stepper and the route).
- *No fallback to mock data* - the golf booking system's fixtures are served only with
  `GOLF_BOOKING_MOCK=true`; off, it fails as not configured, since no real one is connected.
  [[011 The catalogue comes from a mocked golf booking system]] has the dated change.
- *Which company and template* - `PROPOSALES_COMPANY_ID` and the optional
  `PROPOSALES_TEMPLATE_UUID`, read at request time by `account()` in
  `app/_clients/proposales/client.ts`; zero extra calls per Send. Set by the user: company
  `5491`, the template "Group day at Golf Club" ([[ACC-2 Set up the club in Proposales|ACC-2]]).
- *Every call in one place* - the [[API map]]; the unused `GET /api/proposales/companies` route
  from the groundwork was removed.

### Checked

Lint and build. Against mocks, by curl and in headless Chrome: `201` and "Request sent.";
`400` for a bad email, a date in the past, an unknown product, and a body that isn't JSON; `502`
with "Proposales isn't responding right now" and the input kept. Re-run after each
reorganisation. A stepper bug found on the way - two quick clicks counted as one - fixed.

### The first real Send, 9 October 2026

By the user, with their own email as recipient: Proposales accepted it and created the draft,
linked to the template. But the lines show no prices, and only the green fee shows its
quantity - that fix is [[BE-5 Prices and quantities in the draft|BE-5]]. The contact card on the
proposal is the API key's user, not the recipient: the spec's `creator_email` /
`contact_email`, which we don't set.

*History:* merged with INT-1 (the first real draft) on 9 October 2026, when that draft showed
prices missing; on 10 October the price fix was split back out as BE-5, so this ticket closes
with what the branch delivered.
