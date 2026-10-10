# First version build

Planned 7 October 2026, reorganised 9 October 2026 as tickets. Builds
[[010 First version - what we build]].

*Changed 9 October 2026, from the user:* the build starts with a **design mockup in Claude
Design**, before any backend. The mockup shows what the visitor sees and clicks; from it we map
every click down to the API, and only then build. The first version of this plan started with
the catalogue and `postProposal`.

## How the board works

Each ticket is a note in `Plans/Tickets/`, named by its id and title (`BE-2 postProposal, with its fixture`),
in the folder for its status: `Todo/`, `In progress/` or `Done/`. The note holds what the ticket
is, what it's blocked by, when it's done, and what happened. This board only lists them, in
order. To move a ticket: move its file to the new folder, move its line here, and update the
*Status* in its note - with the date, when it's done. Ids are linked wherever they're mentioned
in the vault, so a ticket is one click away.

*Changed 9 October 2026, from the user:* the tickets used to be sections of this note, which made
them hard to find. Later that day the status folders came in, and *Next* and *Backlog* became
one *Todo*, in order - the top one is next. Also that day, FE-1 (the club page) and FE-2 (the form) were folded into
[[DES-2 The site, built from the mockup|DES-2]] - they were built together - and what was left of
FE-2 (Send reaching Proposales, clicking through every state) moved into
[[BE-3 Send to Proposales through our API, code organised by what it does|BE-3]]. Later, INT-1 (the first real draft) was merged into BE-3 too:
the first real draft showed prices missing, so fixing the request is part of making Send work.

*Removed 9 October 2026, with the user:* DES-3, an interaction map - every element on the
group-days page, what it shows or sends, where that comes from, and which API call it makes.
It was meant to come before any code, but the form was built first, so the products, prices,
total, fields, validation and states were all settled in [[DES-2 The site, built from the mockup|DES-2]]. The one open row -
how Send becomes a Proposales draft - is what [[BE-2 createProposal, with its fixture|BE-2]] already describes.

Before the board: the groundwork, done 6 October 2026 - the Next.js app, the shared external-API
layer (`app/_clients/http.ts`), the Proposales client with `getCompanies()`, mocks, error
handling, the rules in `.claude/rules/`, the `proposales-endpoint` skill, the
`submission-reviewer` agent and this vault.

Every code ticket ends with `npm run lint` and `npm run build` passing. Everything runs against mocks
until BE-3's first real Send - no real Proposales call before it. Ids count up per prefix, with no leading zero.

Prefixes: **DES** design, **ACC** the Proposales account (the user, by hand), **BE** server and
integrations, **FE** pages and components, **INT** real integration checks, **SHIP** submission.

## In progress

*(nothing)*

## Todo

In order - the top one is next.

- [[BE-4 Daily cap on drafts]] - at most N drafts a day reach the account, whoever sends.
- [[BE-5 Prices and quantities in the draft]] - the first real draft showed no prices.
- [[ACC-1 Look at the Buyer Portal]] - the user, in the Proposales app.
- [[ACC-2 Set up the club in Proposales]]
- [[SHIP-1 Deploy on Vercel]]
- [[SHIP-2 A README for reviewers]]
- [[SHIP-3 Decide on an LLM]]
- [[SHIP-4 Review and send]]

## Done

- [[BE-3 Send to Proposales through our API, code organised by what it does]] - 10 October 2026
- [[BE-2 createProposal, with its fixture]] - 9 October 2026
- [[DES-2 The site, built from the mockup]] - 9 October 2026
- [[BE-1 The mocked golf booking system]] - 9 October 2026
- [[DES-1 Mockup in Claude Design]] - 9 October 2026
