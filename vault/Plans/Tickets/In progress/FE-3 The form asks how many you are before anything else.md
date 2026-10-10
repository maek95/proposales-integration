# FE-3 The form asks how many you are before anything else

**Status:** In progress - built 10 October 2026, waiting for a click-through in the browser.
**Blocked by:** nothing.
**Done when:** the form starts with a required "How many are you?" select, the rest of the
form appears once it's set, and the headcount reaches the draft.

## What

From [[014 Headcount first, then describe your day]]: the one number the visitor knows exactly is
a field, asked before anything else - not something an LLM guesses from prose. It's also the
context "describe your day" needs ([[BE-7 An LLM fills in the form from the visitor's description of the day|BE-7]]).

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

## What happened

Built 10 October 2026, on branch `FE-3`.

- **The select** is `app/_components/ui/select-field.tsx`, beside `Field`. The border and focus
  classes both use moved into `ui/field-control.ts`, so the two can't drift apart.
- **The order:** *1 · Your group* (the select), then *2 · What the day needs* and *3 · When and
  who*, hidden until a headcount is chosen. If the booking system is down, the select is
  disabled and the "prices aren't available" notice shows straight away - there's nothing to
  ask for. The *Your day* panel stays, with Send disabled, and its heading shows the headcount.
- **The numbers:** 1 to 40, then in fours up to 144 - golf is played in groups of four, and the
  exact number can be adjusted in the offer. `MAX_HEADCOUNT` in `limits.ts` is
  `MAX_QUANTITY_PER_PRODUCT`, so everyone can have a green fee. Briefly set to 72 (a shotgun
  start, four players on 18 tees) and reverted the same day, with the user: the green-fee link
  is the better reason.
- **No minimum** - 12 is common ([[Golf clubs' group business]]), but that's the club's call.
- **No prefill** from the headcount, as proposed above: picks come from the visitor or their own
  description. Proposales could do it on its side instead - a block's quantity can come from a
  formula ([[Proposales overview]]).
- **In the draft:** title *"Golf day for Acme, 16 people"*, intro *"Your golf day for 16 people
  at ..."*, and `data.headcount`. The sent summary starts with it, and *Start a new request*
  clears it.

**Checked** against mocks (`next start` with both switches on - the user's dev server held the
dev lock): the page renders only step 1 and all the numbers; the route answers `400` with *"Choose how
many you are."* for a missing headcount and for `0`; a valid request gets `201`. `npm run lint`
and `npm run build` pass. **Not checked:** clicking through in a browser - choosing a number
shows the rest, the error under the select, the sent summary.

## Handoff

Written 10 October 2026 for the next session, at the end of
[[SHIP-3 Decide on an LLM, and a bigger catalogue|SHIP-3]].

**Where things stand**

- Branch `SHIP-3`, nothing committed yet: the bigger catalogue (27 products with a `category`,
  the form grouped by it), decision [[014 Headcount first, then describe your day|014]], and
  this ticket and [[BE-7 An LLM fills in the form from the visitor's description of the day|BE-7]]. The user commits and
  merges; start FE-3 on a new branch from `main` once SHIP-3 is in.
- Deadline Monday 12 October 2026 ([[The brief]]). FE-3 is small and BE-7 is the LLM feature
  the brief rewards - FE-3 shouldn't take more than a couple of hours.
- After FE-3 the board has BE-7, then [[BE-5 Every line in the Proposales draft shows its price and quantity|BE-5]].

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
