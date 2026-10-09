# First version build

Planned 7 October 2026, reorganised 9 October 2026 as tickets. Builds
[[010 First version - what we build]].

*Changed 9 October 2026, from the user:* the build starts with a **design mockup in Claude
Design**, before any backend. The mockup shows what the visitor sees and clicks; from it we map
every click down to the API, and only then build. The first version of this plan started with
the catalogue and `createProposal`.

## How the board works

Tickets move between the columns below - move the whole `###` section, and add the date to
*Done*. Each ticket says what it is, what it's blocked by, and when it's done. Every code ticket
ends with `npm run lint` and `npm run build` passing. Everything up to INT-1 runs against mocks -
no real Proposales call.

Prefixes: **DES** design, **ACC** the Proposales account (the user, by hand), **BE** server and
integrations, **FE** pages and components, **INT** real integration checks, **SHIP** submission.

## Doing

### FE-2 The group-days form

*Started 9 October 2026.* The form and every state are built (`sections/group-days.tsx`, the
client form `sections/group-day-form.tsx`), and the golf-system-down state is checked with
`GOLF_BOOKING_MOCK=error`. Send goes to a Server Action, `app/_lib/group-days/send-request.ts`,
that only validates for now - field errors come back, but nothing is sent and "Proposales down"
can't happen yet. What's left: BE-3 behind that action, then a run through every state in a
browser. The choices the mockup left open are in *Settled while building* in [[Fairway modern]].

**What:** the form from the mockup, wired to BE-3: quantities, date, contact details, the
indicative total calculated from the golf system's prices as the visitor types, and the sending,
sent and error states. Calls happen only on submit - no API calls while typing.

**Blocked by:** BE-3, FE-1.
**Done when:** every row of the interaction map works against mocks, including both error modes.

## Next

### DES-2 Interaction map

**What:** from the signed-off mockup, a table of every element the visitor sees or clicks:

| Element / event | Data shown or sent | Where it comes from | What happens | API call |
|---|---|---|---|---|

- *Where it comes from* - the golf system (products, prices), our own calculation (the total),
  the visitor (quantities, date, contact), Proposales (nothing until sent).
- *API call* - which client helper, which endpoint, which fields; or "none".

Written as a section in [[The app]]. It defines the BE and FE tickets below precisely - update
them from it.

**Blocked by:** DES-1.
**Done when:** every clickable thing in the mockup has a row, and the BE/FE tickets match it.

### ACC-1 Look at the Buyer Portal

**What:** step 5 of [[Demo venue setup]] - see whether Proposales' Buyer Portal is already a
package configurator. If it is, record what it covers in the [[Proposales overview]] and adjust
DES-1 before building.

**Blocked by:** nothing (the user, in the Proposales app).
**Done when:** the finding is recorded, either way.

## Backlog

### BE-2 `createProposal`, with its fixture

**What:** through the `proposales-endpoint` skill. What the spec said when checked, 6 October
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

**Blocked by:** DES-2.
**Done when:** the helper works against its fixture, with `PROPOSALES_MOCK=true` and `=error`.

### BE-3 The submit action

**What:** what happens when the form is sent - per the interaction map. Most likely a Server
Action: validate the input with zod on the server, turn the picks into blocks using the golf
system's products and prices, call `createProposal` once. Returns success, field errors, or a
service error - never throws to the page.

**Blocked by:** BE-1, BE-2.
**Done when:** every outcome in the interaction map comes back correctly against mocks.

### ACC-2 Set up the club in Proposales

**What:** steps 1-4 of [[Demo venue setup]] - the club's name, currency, the company, one
template.

**Blocked by:** nothing - but only needed before INT-1.
**Done when:** that plan is marked done, and the club's name and currency are in this board.

### INT-1 First real draft

**What:** one real submit, with the user's go-ahead - it writes to the real account. Then, in the
Proposales app: does the template link copy content, how do blocks without a library link look,
and - sending to an address the user owns - the customer's email and offer page. Findings go in
the [[Proposales overview]].

**Blocked by:** FE-2, ACC-2.
**Done when:** the draft looks right in Proposales and the findings are recorded.

### SHIP-1 Deploy on Vercel

**What:** the app on Vercel, `PROPOSALES_API_KEY` set in the project's environment variables, the
mock switches off.

**Blocked by:** INT-1.
**Done when:** the live URL works end to end.

### SHIP-2 A README for reviewers

**What:** replace the create-next-app README: what the app is, why, how to run it (with mocks, no
key needed), and where the thinking is (the vault, the decisions).

**Blocked by:** SHIP-1.
**Done when:** someone opening the repo cold can run it and find the reasoning.

### SHIP-3 Decide on an LLM

**What:** whether and where an LLM has a place - the brief's bonus. A decision note either way.

**Blocked by:** INT-1.
**Done when:** the decision is recorded; if yes, it gets its own tickets.

### SHIP-4 Review and send

**What:** run the `submission-reviewer` agent, fix what it finds, then send the live link and the
repo.

**Blocked by:** SHIP-1, SHIP-2, SHIP-3.
**Done when:** sent.

## Done

### FE-1 The club page

Done 9 October 2026. Header, intro, photo placeholder, footer, the Fairway modern tokens and
Hanken Grotesk; the companies demo section and the create-next-app files in `public/` are gone.
The club's placeholders live in one place, `app/_lib/club.ts`, for [[Demo venue setup]] to fill.
*Changed the same day:* the club and group days are two pages; see *The page, top to bottom* in
[[Fairway modern]].

**What:** the plain club page from the mockup. Replace the create-next-app placeholders - the
hero copy in `[brackets]`, the companies demo section, unused files in `public/`.

**Blocked by:** DES-1.
**Done when:** it matches the mockup at desktop and phone width.

### BE-1 The mocked golf booking system

Done 9 October 2026, ahead of DES-2 - the user asked to build the mockup, and the form needs
products to show. `app/_lib/golf-booking/`: `listProducts()`, fixtures as the data, and
`GOLF_BOOKING_MOCK=error` to simulate it being down. Check it against DES-2's map when that's
written.

**What:** per [[011 The catalogue comes from a mocked golf booking system]] - a client in
`app/_lib/<name>/` following `.claude/rules/external-apis.md`: zod schemas, a helper listing the
club's products, fixtures as the only source. A fictional, generic name. The three products:
green fee 18 holes (650 SEK, per player), golf cart (400 SEK, per cart, two players), clubhouse
lunch (185 SEK, per person), with a short description each. Prices in whole kronor here.

**Blocked by:** DES-2.
**Done when:** the products load through the client, and its error mode works like Proposales'.

### DES-1 Mockup in Claude Design

Done 9 October 2026. Mockup: [Claude Design canvas](https://claude.ai/artifact/KoaxopcEbmGGJmfFZYdJQ8) -
three directions; the user picked **B, Fairway modern**
([[012 The site's look is Fairway modern]]). Build spec for FE-1 and FE-2: [[Fairway modern]].

**What:** a mockup of the site in Claude Design - plain, the setting rather than the product
([[The app]]). Screens:

- The club page - a short intro, and the way into Company & group days.
- The group-days form - green fees, carts and lunch with quantities, a date, name, email and
  company, the indicative total.
- Sending - what the visitor sees while the draft is created.
- Sent - "the club will email you an offer shortly".
- Errors - a field left wrong; Proposales or the golf system unavailable.

Desktop and phone width. The club's name can stay a placeholder.

**Blocked by:** nothing.
**Done when:** the user has signed off the screens, and the mockup's link is in this ticket.

### GROUND-1 Groundwork

Done 6 October 2026. The Next.js app, the shared external-API layer (`app/_lib/external/`), the
Proposales client with `listCompanies()` (`app/_lib/proposales/`), mocks, error handling, a
placeholder page. The rules in `.claude/rules/`, the `proposales-endpoint` skill, the
`submission-reviewer` agent, the vault.
