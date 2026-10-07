# Home

What we know and what we decided while building this app - the product and every integration
in it - in one place. Shared with anyone who works on the repo - a fact that lives only in one
chat session or one person's notes has to be rediscovered.

**How it stays current.** When something is decided, learned or left open mid-session - why we
picked an idea, a trade-off, a surprise in an API, options we haven't chosen between - it goes
into the note that owns the subject, dated, before the session ends. `.claude/rules/vault.md` says when and how.

**What does not go here.** How to write code is `.claude/rules/`. A procedure is a skill in
`.claude/skills/`. Exact endpoints, fields and limits of an integration are in its own docs -
link to them, don't copy them; they change. Nothing in this vault should restate any of those.

## The case

- [[The brief]] - what Proposales asked for, and how we pick what to build.
- [[The app]] - what we're building: a golf club's website with group booking through Proposales.
- [[010 First version - what we build]] - the scope to build from.

## The domain

- [[Golf clubs' group business]] - how clubs sell company and group days today, and why our feature fits.

## Integrations

- **Proposales** - the integration the case is about.
  - [[Proposales overview]] - ways to integrate, the main concepts, limits, links to the official docs.
- **Vercel AI SDK** - being evaluated for the brief's LLM bonus.
  - [[Vercel AI SDK overview]] - what costs what, and what it means for us.

## What we could build

- [[Proposales integration ideas]] - grouped by how each one plugs into Proposales.

## What we decided, what's open, and what's planned

- [[Decisions]] - one note per decision, the template, and the log.
- [[Open questions]] - discussed but not settled, with the options and any recommendation.
- `Plans/` - work agreed but not started, step by step:
  - [[First version build]] - the build order for the first version, against mocks first.
  - [[Demo venue setup]] - the golf club's catalogue in our repo, and just enough Proposales setup.

## Still to write

The club's identity - name, course, clubhouse - once it's picked.
