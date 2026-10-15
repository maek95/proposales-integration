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

- [[FE-6 Type sizes come from globals.css, not from each element]] - headings and text sizes in one place.
- [[FE-5 Send checks the required fields in the browser first, and jumps to the first one missing]] - no API call for a field we know is missing.
- [[BE-8 Describe your day says what it filled in, and lists only real things it couldn't add]] - vague wishes no longer show as missing products.

## Todo

In order - the top one is next.

- [[BE-5 Every line in the Proposales draft shows its price and quantity]] - the first real draft showed no prices.
- [[BE-4 A daily cap on how many drafts the website can create in Proposales]] - at most N drafts a day reach the account, whoever sends. Can wait, per the user.
- [[ACC-1 Check whether Proposales' Buyer Portal already does what our form does]] - the user, in the Proposales app.
- [[ACC-2 Set up the golf club in the Proposales account - company, currency, template]]
- [[SHIP-2 A README that lets a reviewer run the app and find the reasoning]]
- [[SHIP-4 Review the repo against the brief, then send the case in]]

## Done

- [[FE-4 The photos show straight away, and the landing photo runs behind the footer]] - 10 October 2026
- [[BE-7 An LLM fills in the form from the visitor's description of the day]] - 10 October 2026
- [[FE-3 The form asks how many you are before anything else]] - 10 October 2026
- [[SHIP-3 Decide on an LLM, and a bigger catalogue]] - 10 October 2026
- [[SHIP-1 Deploy on Vercel]] - 10 October 2026
- [[BE-3 Send to Proposales through our API, code organised by what it does]] - 10 October 2026
- [[BE-2 createProposal, with its fixture]] - 9 October 2026
- [[DES-2 The site, built from the mockup]] - 9 October 2026
- [[BE-1 The mocked golf booking system]] - 9 October 2026
- [[DES-1 Mockup in Claude Design]] - 9 October 2026
