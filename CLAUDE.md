@AGENTS.md

# Proposales integration

The website of a fictional golf club, where a company or group can put together its golf day and
get a ready offer from the club - powered by the
[Proposales](https://proposales.com) API. Built as a technical case for a job interview; what
the app is and why is in `vault/The app.md`. Next.js 16 (App Router), React 19,
Tailwind CSS v4, hosted on Vercel. Every Proposales call goes through the Next.js server - the
browser never talks to `api.proposales.com` directly.

What the case asks for is in `vault/The brief.md`. In short: an LLM / Vercel AI SDK
is a bonus, and reviewers grade the thought process over polish - so decisions get written down,
not just coded.

## Where we are

Work agreed but not finished is in `vault/Plans/`, each plan with its status and steps. Start a
session there - currently `vault/Plans/First version build.md`, a ticket board (In progress /
Todo / Done) that builds `vault/Decisions/010 First version - what we build.md`. Each ticket is
its own note in `vault/Plans/Tickets/<status>/` (`Todo/SHIP-1 Deploy on Vercel.md`). Pick up from
*In progress*, then the top of *Todo*.

## Layout

- `app/page.tsx` - the landing page; `app/club/` - the club; `app/group-days/` - the group-days
  form. Each route keeps its own pieces in a private `_components/`; `app/layout.tsx` adds the
  header and footer.
- `app/_components/` - shared only: `layout/` (page chrome),
  `ui/` (building blocks reused across sections).
Non-UI code is organised by the direction of the call: `app/api/` is our backend,
`app/_clients/` is other systems.

- `app/api/` - **inbound**: our own Route Handlers, the URLs the browser calls - the only way the
  browser reaches our backend (no Server Actions). Each route is the whole backend for its
  request: validate → check against our data → call out → status code. Every call, both
  directions, is in `vault/Integrations/API map.md`.
- `app/_clients/http.ts` - the shared layer every external API builds on: `ExternalApiError`,
  `requestJson` (timeout, validation, logging), the mock switch, `attempt` and `errorResponse`.
- `app/_clients/<service>/` - **outbound**, one folder per external API we call: `client.ts` (base URL, auth,
  mocks), one file per call named for what it does (`get-products.ts`, `post-proposal.ts`) with
  its schemas, types and helper, `index.ts` re-exporting them, `mocks/` (one fixture per call). Currently `proposales/` and
  `golf-booking/` (the club's booking system - mocked, its fixtures are the data).
- `app/_content/` - site content, no logic: the club's details (`club.ts`), the photos.
- `app/_utils/` - small pure helpers, safe on either side: `formatters.ts` (money, dates, counts).
- `app/globals.css` - Tailwind `@theme` tokens.
- `vault/` - the Obsidian vault for the whole repo: the brief, the product, each integration
  under `Integrations/`, ideas, and the decisions log. `Home.md` says what goes in each note; `.claude/rules/vault.md` says
  when to write to it.
- `.env` - `PROPOSALES_API_KEY`, plus `PROPOSALES_COMPANY_ID` and `PROPOSALES_TEMPLATE_UUID` (where
  drafts go) - gitignored; `.env.example` is the committed template.

## Commands

```
npm run dev      # local dev server (PROPOSALES_MOCK=true npm run dev for fixtures, no key)
                 # GOLF_BOOKING_MOCK=true is needed for prices - no real booking system is
                 # connected; =error shows the "prices aren't available" state
npm run lint
npm run build    # must pass without .env - Proposales calls only happen at request time
```

Skill: `proposales-endpoint` (wire up a new Proposales endpoint).

## Where what we learn goes

When a discussion settles something important - or surfaces a question we can't settle yet - it
gets written down in the repo before the session ends. Not in the global profile at
`~/.claude/CLAUDE.md`, not in assistant memory, not in a note that lives only in one session. It
has to travel with the repo, so another developer gets it too.

Pick the home by what it is:

- **How we work in this repo** - a convention, a constraint, a "never do X" → a rule in
  `.claude/rules/`.
- **A repeatable procedure** - steps we'll follow again → a skill in `.claude/skills/`.
- **What we know, decided, proposed or haven't settled** - a decision and its reasoning, a
  finding about an API, options on the table, an open question → the vault (`vault/`), as
  `.claude/rules/vault.md` describes.

This is not a coding guide. General knowledge (how React works, what an API is) stays out; what
goes in is specific to this repo and was worth discussing. One thing, one home - link between
them rather than writing it twice. Say where it went in one line at the end of the turn.

## Where the rules live

- `external-apis.md` - any third-party API: one server-only client per service, secrets,
  request time, never trusting responses, failing per feature, call volume, mock data.
- `proposales.md` - only what's specific to Proposales: money in the smallest currency unit,
  the inbox token, the interview account, recipients' data, the spec's nullability, the
  docs MCP server.
- `code-conventions.md` - where code goes, pages as route folders, Server vs Client
  Components, styling, TypeScript, keeping it small.
- `vault.md` - when a decision, finding, proposal or open question goes into `vault/`, which
  note owns it, and how a reversal is recorded.
- `tickets.md` - how a ticket is written, wherever it lives: a title that says what changes,
  the work in the ticket itself, its own *Blocked by*.

When the user says a rule should exist, write it in the rule file it belongs to, in the same
voice as the rest of that file. Then say where it went, so they can trim it. If no file fits,
add a new one here with a `description:` line at the top and list it above.

## Automation

- `.claude/settings.json` - allows lint, build, typecheck and read-only git commands without a
  prompt, and denies reading `.env` and creating branches (`checkout -b`, `switch -c`,
  `git branch <name>`, `worktree add`) - the user creates the branch before a ticket starts.
- `.claude/agents/submission-reviewer.md` - reviews the repo against the brief and the rules,
  the way a Proposales reviewer would, and reports what to fix. It never edits.
- `.mcp.json` - project MCP servers: `proposales-docs`, Proposales' public docs and OpenAPI spec
  (no key, no account access). Each developer approves it once on first use.

## Before you finish

- `npm run lint` and `npm run build` must pass.
- For changes that call the API, hit the route or page on `npm run dev` and check the response.
- A decision made along the way is in `vault/Decisions/`.
