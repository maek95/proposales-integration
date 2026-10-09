---
description: When something is decided, learned, proposed or left open mid-session, it goes into the vault before the session ends - the note that owns the subject, dated, in plain form.
---

## Write decisions, findings and open questions into the vault

`vault/` is the Obsidian vault for the whole repo - the product and every integration in it -
holding what we know, what we decided and what we haven't settled, one note per subject.
`vault/Home.md` says what belongs in each note and what does not. This file says *when* to
write, because the vault is only worth having if it's written to while the work happens.

The failure it prevents: the reasoning lives in one chat session. The brief says Proposales
grades the thought process over polish, and a choice made in conversation - why this idea, why
this LLM, what we cut - is gone when the session ends unless it was written down. It also
can't live in assistant memory or a local note: another developer working on the repo has to
be able to read it.

It happened on 6 October 2026: the Vercel AI SDK pricing was researched and a setup proposed in
chat, and none of it reached the vault until the user asked. The brief makes an LLM the bonus, so
that research was exactly what a reviewer would want to see.

- **The trigger is the discussion, not the code.** Choosing between options, cutting scope,
  finding a surprise in an API, changing approach, researching how something works for this
  app - each gets written down, whether or not code changed.
- **Undecided things count too.** When we discuss something we can't settle yet - options for
  the LLM, which idea to build, a question for the user - the options and any recommendation go
  in `Open questions.md`. When it's settled, it becomes a decision note and the open question
  links to it.
- **It goes in the note that owns the subject:**
  - A decision is a new note in `Decisions/`, following the shape in `Decisions/Decisions.md`,
    and listed in its log.
  - An open question or a proposal not yet decided is an entry in `Open questions.md`.
  - Work agreed but not started gets a step-by-step note in `Plans/`, marked *Not started* until
    it is. When it's done, the plan says so and links the decision that records it.
  - A ticket on a board is its own note in `Plans/Tickets/`, named `<ID> <title>` - never a
    section of the board - in the folder for its status: `Todo/`, `In progress/` or `Done/`. Its status, blockers, *Done when* and what happened live in the
    ticket; the board only links it under a column. Mention a ticket as a link,
    `[[BE-2 createProposal, with its fixture|BE-2]]`.
  - **The ticket is the work.** What it asks for and what it produces - a table, a checklist,
    the outcome - are written in the ticket itself, not in another note it points to.
    It doesn't direct other tickets either ("update BE-2 from this"): a ticket that needs
    another's result says so in its own *Blocked by*.
  - A new idea is a line in the matching note in `Ideas/`.
  - A finding about an integration is a line in its overview under `Integrations/<name>/`. A
    new integration - including one we're only evaluating - gets its own folder there.
  - Research about the app's world - how golf clubs work, what customers expect - goes in
    `Domain/`, with sources.
  - Don't open a new note for a sentence.
- **Not a coding guide.** Only what's specific to this repo and was worth discussing. How a
  library works in general stays in its docs; what we concluded about using it here goes in.
- **Date it.** *"Decided 7 October 2026"*, *"Proposed 6 October 2026"*. The vault is read later,
  next to older lines that may have been right at the time.
- **A reversal says what was there before.** Add a dated line to the old decision saying what
  changed and link the one that replaced it. Silently overwriting it loses the reasoning - and
  the reasoning is what's being graded.
- **Link, don't copy, an integration's docs.** Endpoint details, prices and limits change; the
  vault holds what we concluded from them.
- **`[[Wikilinks]]` between notes**, by note name. Add new notes to `Home.md`.
- **Say where it went, in one line, at the end of the turn.** The user trims what's wrong; they
  can't trim what they weren't told about.
