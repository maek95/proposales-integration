# First version build

Planned 7 October 2026. **Not started.**

How to build [[010 First version - what we build]]. Everything up to step 5 runs against mocks
(`PROPOSALES_MOCK=true`) - no real Proposales call, no key needed. Each step ends with
`npm run lint` and `npm run build` passing.

## Where things stand

- **Done** - the Next.js app, the shared external-API layer (`app/_lib/external/`), the Proposales
  client with `listCompanies()` (`app/_lib/proposales/`), mocks, error handling, a placeholder
  home page with a hero and a companies section. The rules in `.claude/rules/`, the
  `proposales-endpoint` skill, the `submission-reviewer` agent.
- **Not done** - everything below. The Proposales account is still empty (see
  [[Demo venue setup]]).

## Steps

### 1. The catalogue

The three items as a typed, zod-validated data file in our own code - not under
`app/_lib/proposales/`, since it's our data. Green fee 18 holes (650 SEK, per player), golf cart
(400 SEK, per cart, two players), clubhouse lunch (185 SEK, per person); a short description
each. Prices in whole kronor here - conversion to the smallest unit happens in the Proposales
client.

### 2. `createProposal`, with its fixture

Through the `proposales-endpoint` skill. What the spec says (checked 6 October 2026 - recheck the
spec, it's the source of truth):

- `POST /v3/proposals`, "creates a new proposal series with an editable draft". Required:
  `company_id`, `language`. Useful: `title_md`, `description_md`, `recipient` (`first_name`,
  `last_name`, `email`, `phone`, `company_name`), `blocks`, `data`, `tracking`.
- **Blocks** - `type: "product-block"`, `title`, `description`, `quantity`, `currency`, and the
  unit price in one of the `unit_value_*` fields (with/without discount, with/without tax -
  pick one and record why). **Money in the smallest unit** - 650 kr is `65000`. No `content_id`
  needed.
- **`tracking.created_from_template`** - the template's uuid, from
  `GET /v3/companies/{companyId}/templates`.
- **`data`** - `source: "website"` and our request id.
- **`company_id`** - from `listCompanies()`.
- **Response** - `{ proposal: {...} }`; type only the fields we use (the uuid at least).

### 3. The form

The "Company & group days" section: quantities of the three items, a date, name, email, company.
An indicative total, calculated from the catalogue as the visitor types. Submitting validates
the input with zod on the server, then calls `createProposal` once - a Server Action is the
natural fit (Server Components first; no client-side call to Proposales). On failure: the
form's own error state, the visitor's input kept. On success: "the club will email you an offer
shortly".

### 4. The page

A plain page about the club, with the form. Replace the create-next-app placeholders - the hero
copy in `[brackets]`, the companies demo section, unused files in `public/`. The club's name can
stay a placeholder until [[Demo venue setup]] picks one.

### 5. First real draft

Only after [[Demo venue setup]] steps 1-2 (club name, currency, company, template), and with the
user's go-ahead - it writes to the real account. One submit, then check in the Proposales app:
the template link (does it copy content?), how blocks without a library link look, and - sending
to an address the user owns - the customer's email and offer page.

## After the first version

From [[The brief]]: deploy on Vercel (with `PROPOSALES_API_KEY` set there), a README a reviewer
can start from, run the `submission-reviewer` agent, decide whether an LLM has a place, then send
the link and the repo.

## Record as we go

Decisions made while building go in `Decisions/`; findings about the API in the
[[Proposales overview]]. Update this plan's status as steps are done.
