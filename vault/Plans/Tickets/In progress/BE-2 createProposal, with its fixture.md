# BE-2 createProposal, with its fixture

**Status:** In progress
**Blocked by:** nothing.
**Done when:** the helper works against its fixture, with `PROPOSALES_MOCK=true` and `=error`.

## What

Through the `proposales-endpoint` skill. What the spec said when checked, 6 October
2026 - recheck it, the spec is the source of truth:

- **Where the format lives** - `createProposal()` takes our own shape (title, recipient, items
  with a price in whole kronor) and builds Proposales' format itself: blocks, öre, the
  `unit_value_*` field. The group-days action never sees Proposales' field names or öre.
- `POST /v3/proposals`, "creates a new proposal series with an editable draft". Required:
  `company_id`, `language`. Useful: `title_md`, `description_md`, `recipient` (`first_name`,
  `last_name`, `email`, `phone`, `company_name`), `blocks`, `data`, `tracking`.
- **Blocks** - `type: "product-block"`, `title`, `description`, `quantity`, `currency`, and the
  unit price in one of the `unit_value_*` fields (with/without discount, with/without tax - pick
  one and record why). **Money in the smallest unit** - 650 kr is `65000`. No `content_id`
  needed. *Rechecked 9 October 2026:* the block fields are as above. Our prices include VAT and
  have no discount, so the likely pick is `unit_value_without_discount_with_tax`.
- **No VAT rate on a block** - only the `package_split` rows inside one carry `vat`. How
  Proposales splits a price into net and VAT (probably the company's tax settings, and
  `tax_options` on the proposal) is checked on the first real draft, INT-1 - green fees and
  lunch may well carry different rates.
- **`tracking.created_from_template`** - the template's uuid, from
  `GET /v3/companies/{companyId}/templates`.
- **`data`** - `source: "website"` and our request id.
- **`company_id`** - from `listCompanies()`.
- **Response** - `{ proposal: { uuid, url } }` (rechecked 9 October 2026) - `url` links to the
  draft; whether it opens the editor or the customer's view is checked in INT-1.
- **The fixture's shape comes from the spec, not a real response** - the rules ask for a real
  one, but a create call can't be observed without writing to the account. Until INT-1 it's our
  reading of the spec; INT-1 compares the real response with it and fixes the fixture if they
  differ. The mock tests our side - building the request, reading the response, the UI states -
  not whether Proposales accepts what we send.

## Progress

*9 October 2026.* `createProposal()` is in `app/_lib/proposales/proposals.ts`, its fixture in
`mocks/proposals.ts`. It takes a `NewProposal` in our terms - whole kronor, one name field - and
builds the request itself: blocks with the price in öre in
`unit_value_without_discount_with_tax`, the name split into first and last, the template in
`tracking`. The request body has its own zod schema and is checked before every call, mocked or
not, so a body built wrong fails in development instead of as a 400 from Proposales. Not set
yet: `tax_options` (see the VAT point above). Lint and build pass; the two mock modes can only
be tried once BE-3 calls it.
