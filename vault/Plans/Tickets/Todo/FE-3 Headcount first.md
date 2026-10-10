# FE-3 Headcount first

**Status:** Todo
**Blocked by:** nothing.
**Done when:** the form starts with a required "How many are you?" select, the rest of the
form appears once it's set, and the headcount reaches the draft.

## What

From [[014 Headcount first, then describe your day]]: the one number the visitor knows exactly is
a field, asked before anything else - not something an LLM guesses from prose. It's also the
context "describe your day" needs ([[BE-7 Describe your day fills in the form|BE-7]]).

1. A select at the top of `app/group-days/_components/request-form.tsx`, before *What the day
   needs*. Until it's set, the steppers and details stay hidden (or disabled) - the order is
   the point.
2. **Which numbers:** a select needs a list. Proposed: every number up to 40, then in steps up
   to `MAX_QUANTITY_PER_PRODUCT` - to settle when building. Clubs often have a minimum of about
   12 ([[Golf clubs' group business]]); whether the site enforces one is the club's call - not
   for now.
3. `headcount` in `GroupDayRequestSchema` (`app/api/group-days/requests/schema.ts`), validated in
   the route like every field.
4. Into the draft: the title or intro says how many ("Group day for 16"), and `data` carries
   `headcount`, so the club can find requests by size.

Open: whether setting the headcount also prefills anything (green fees = headcount). Proposed
no - picks come from the visitor or from their own description, and a silent prefill is a
guess the visitor didn't ask for.

## Handoff

Written 10 October 2026 for the next session, at the end of
[[SHIP-3 Decide on an LLM, and a bigger catalogue|SHIP-3]].

**Where things stand**

- Branch `SHIP-3`, nothing committed yet: the bigger catalogue (27 products with a `category`,
  the form grouped by it), decision [[014 Headcount first, then describe your day|014]], and
  this ticket and [[BE-7 Describe your day fills in the form|BE-7]]. The user commits and
  merges; start FE-3 on a new branch from `main` once SHIP-3 is in.
- Deadline Monday 12 October 2026 ([[The brief]]). FE-3 is small and BE-7 is the LLM feature
  the brief rewards - FE-3 shouldn't take more than a couple of hours.
- After FE-3 the board has BE-7, then [[BE-5 Prices and quantities in the draft|BE-5]].

**Why this ticket comes first**

The headcount is the one number the visitor knows exactly, so it's a field, never a model's
guess - and it's the context BE-7's prompt needs. Asking it first is the point of the order
in 014: headcount → describe your day (optional) → check the steppers → Send.

**Where it plugs in**

- **The form:** `app/group-days/_components/request-form.tsx`. Today it has two fieldsets,
  *1 · What the day needs* (steppers grouped by category) and *2 · When and who*. The select
  goes before both, as a new step 1 - renumber the legends. Until it's set, the rest is hidden
  or disabled.
- **No select component yet.** `app/_components/ui/field.tsx` is an `<input>` only. Either a
  `select-field.tsx` beside it in the same style (label, error, the same border and focus
  classes), or widen `Field` - per `.claude/rules/code-conventions.md`, one component per file,
  reused rather than re-styled.
- **The contract:** `app/api/group-days/requests/schema.ts` - add `headcount` to
  `GroupDayRequestSchema`, an integer from 1 to `MAX_QUANTITY_PER_PRODUCT`
  (`limits.ts`, shared with the form), with a message like the other fields'. The route
  validates it like everything else.
- **The draft:** `app/api/group-days/requests/route.ts` builds the title (`Golf day for
  ${company}`) and the intro - add the headcount to one of them, e.g. "Golf day for 16 from
  Acme". `data` is `Record<string, string>` in `app/_clients/proposales/post-proposal.ts`, so
  `headcount: String(input.headcount)`.
- **The sent state** shows a summary line - the headcount belongs in it too.
- `startOver()` resets the headcount with everything else.

**Open, decided when building**

- The list of numbers in the select (proposed above: each number up to 40, then steps).
- No prefill from headcount (proposed above) - confirm with the user if in doubt.

**Testing**

- `PROPOSALES_MOCK=true GOLF_BOOKING_MOCK=true npm run dev`. The user's `.env` is set for
  **real** Proposales calls - force `PROPOSALES_MOCK=true`, or a test Send creates a real draft
  in the reviewers' account. The user often has a dev server running already on port 3000 -
  check before starting one.
- Click through: no headcount → the rest hidden; a headcount → the form; Send without one →
  the field's error (the route checks too - try it with one `curl`); sent → the summary.
- `npm run lint` and `npm run build`. A real Send only with the user's go-ahead.
