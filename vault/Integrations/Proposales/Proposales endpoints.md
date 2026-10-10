# Proposales endpoints

Every endpoint in the Proposales API, what we use, and where an LLM could fit. Read from the
[OpenAPI spec](https://docs.proposales.com/openapi.json) (version 2026.09.02) on 10 October 2026,
for [[SHIP-3 Decide on an LLM|SHIP-3]]. Fields and parameters are in the spec - this note holds
what we concluded. What the app calls today, both directions, is the [[API map]].

## The endpoints

| Endpoint | What it does | We use it | LLM angle |
|---|---|---|---|
| `POST /v3/proposals` | Creates a proposal series with an editable draft - title, intro, recipient, blocks, `data`, template link | **yes** - every Send | **Strong.** What we put in a draft can be written or chosen by an LLM: the intro, the lines from a free-text request, optional extras |
| `GET /v3/proposals/{uuid}` | Reads one proposal - status, blocks, recipient, value with and without tax, signatures, PDF link | not yet | **Medium.** An LLM can summarise a proposal or check it ("no terms, intro is generic") - the *proposal coach* idea |
| `PATCH /v3/proposals/{uuid}` | Updates a draft in place - any field, blocks replaced as a whole list | not yet | **Strong.** Lets an LLM improve a draft *after* it's created - e.g. Send creates the draft at once, then the intro is written and patched in, so the visitor never waits on the model |
| `POST /v3/proposals/{uuid}` | Creates the next draft version in the same series | no | Weak. A revised offer after the customer replies - an LLM could draft the changes, but it's the club's job in Proposales |
| `PATCH /v3/proposals/{uuid}/data` | Merges keys into a proposal's `data` | not yet | **Medium.** An LLM classifies a request - company day, customer event, golf society; size; urgency - and the tags go into `data`, searchable below |
| `GET /v3/proposal-search` | Up to 25 proposals, newest first, filtered on any `data` key, recipient email, archived or not | not yet (BE-4 may count drafts with it) | **Medium.** Feed an LLM the latest website requests for a staff digest ("4 requests this week, 58 players, two want June 12"), or rejected and expired ones for a *lost-deal debrief* |
| `GET /v3/content` | The content library - products and videos, title and description per language | no | Medium. An LLM could write or translate product descriptions - but our products come from the golf booking system, not the library |
| `POST` / `PUT` / `DELETE /v3/content` | Creates, updates, archives content items | no | Medium, same as above - the *brochure to catalogue* idea. Content has no price through the API |
| `GET /v3/companies` | The companies the key's user belongs to | helper kept, not called | None |
| `GET /v3/companies/{id}/templates` | A company's proposal templates | by hand, to find our template | None |
| `GET /v1/attachments` | Files the user can attach - id, filename, date only | no | None - the API gives filenames, not the files |
| `POST /v1/inbox/{token}` | Creates a request for proposal from contact details, dates and a free-text message, with the company's inbox token - no API key | no | Weak for us. An LLM turning a message into an RFP overlaps Proposales' own AI inbox widget, and an RFP carries no priced lines ([[Proposales overview]]) |

Outside the REST API: **webhooks** (a proposal's status changed) and the **editor and data
widgets** need the connection powerup, which Proposales customer success turns on - out of
reach before the deadline. A webhook would allow "the customer signed - draft a thank-you, block
the tee times".

## What this means for SHIP-3

- The strongest places for an LLM are **writing into a draft** (`POST /v3/proposals`, then
  `PATCH` on the same draft) - it puts the model's work inside Proposales, where the club
  reviews it before anything reaches a customer.
- **`PATCH` changes option B** in SHIP-3: the intro doesn't have to delay Send. Create the draft
  as now, answer the visitor, then write the intro and patch it in. If the model fails, the draft
  keeps its fixed line - nothing for the visitor to see.
- **Reading back** (`GET`, `proposal-search`) opens staff-side features - a digest of website
  requests, a coach for a draft. They need a page for the club's staff, which the site doesn't
  have, so they're further away.
- **`data` + search** make a classifier cheap: tag each request on Send, find them by tag later.
- **Already done by Proposales, so not ours to build:** translating a proposal (automatic
  translation in the app) and turning inbox messages into requests (the AI inbox widget).
