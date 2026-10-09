# BE-2 createProposal, with its fixture

**Status:** Todo
**Blocked by:** nothing.
**Done when:** the helper works against its fixture, with `PROPOSALES_MOCK=true` and `=error`.

## What

Through the `proposales-endpoint` skill. What the spec said when checked, 6 October
2026 - recheck it, the spec is the source of truth:

- `POST /v3/proposals`, "creates a new proposal series with an editable draft". Required:
  `company_id`, `language`. Useful: `title_md`, `description_md`, `recipient` (`first_name`,
  `last_name`, `email`, `phone`, `company_name`), `blocks`, `data`, `tracking`.
- **Blocks** - `type: "product-block"`, `title`, `description`, `quantity`, `currency`, and the
  unit price in one of the `unit_value_*` fields (with/without discount, with/without tax - pick
  one and record why). **Money in the smallest unit** - 650 kr is `65000`. No `content_id`
  needed.
- **`tracking.created_from_template`** - the template's uuid, from
  `GET /v3/companies/{companyId}/templates`.
- **`data`** - `source: "website"` and our request id.
- **`company_id`** - from `listCompanies()`.
- **Response** - `{ proposal: {...} }`; type only the fields we use (the uuid at least).
