# ACC-2 Set up the club in Proposales

**Status:** Todo
**Blocked by:** nothing - but the club should be set up before the site goes live, [[SHIP-1 Deploy on Vercel|SHIP-1]].
**Done when:** that plan is marked done, and the club's name and currency are in this board.

## What

Steps 1-4 of [[Demo venue setup]] - the club's name, currency, the company, one
template.

## Notes

- *9 October 2026:* the API key reaches one company, id `5491`, named after the user's own
  company - checked with `GET /v3/companies`. Drafts from the site go to the company in
  `PROPOSALES_COMPANY_ID` (see [[BE-3 Send to Proposales through our API, code organised by what it does|BE-3]]), so if the club becomes a new
  company rather than a rename, its id replaces `5491` there. Once the template exists, its
  uuid goes in `PROPOSALES_TEMPLATE_UUID`.
- *9 October 2026:* the user created the template "Group day at Golf Club" (`en`, uuid
  `c337f43f-3e7b-4afe-bd77-d852f760f918`, found with `GET /v3/companies/5491/templates`) and set
  it in `PROPOSALES_TEMPLATE_UUID`. Still open from this ticket: the club's name on the company,
  and the currency.
