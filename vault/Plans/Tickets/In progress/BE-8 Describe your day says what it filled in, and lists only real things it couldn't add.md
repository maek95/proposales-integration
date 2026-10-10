# BE-8 Describe your day says what it filled in, and lists only real things it couldn't add

**Status:** In progress - built 10 October 2026, not committed yet; the user puts it on its own
branch.
**Blocked by:** nothing - follows [[BE-7 An LLM fills in the form from the visitor's description of the day|BE-7]], merged.
**Done when:** a vague description ("make us the best day possible") fills in nothing and lists
nothing as not added, and says so plainly; a concrete wish the club doesn't sell (a vegetarian
option) still shows under "Not added to the form"; and the result box never reads as a failure
when the call worked.

## What

Raised 10 October 2026, by the user: "make us the best day possible" (39 people) filled in one
line and listed "best day possible" under the unmatched wishes - so the form read as if
something had failed.

## What happened

Built 10 October 2026.

- **The model labels each unmatched wish** - `kind`: "something to order" (a photographer) or
  "general wish" ("the best day possible") - and `toPicks()` in
  `app/_clients/ai/post-suggested-picks.ts` keeps only the first kind. Telling the model to
  leave general wishes out didn't work: in one call it still listed it. Labelling did. The mock
  answers in the model's shape, with one wish of each kind, so the cut is exercised.
- **The result box reads as a result, not an error:** "Filled in 1 line ... check it below",
  a hint to say more when it filled in two lines or fewer, "Nothing in your description
  matched what we offer - pick below, or tell us more about the day" when it filled in none,
  and "Not added to the form:" above the unmatched wishes.

**Checked** with one real call each: the vague description gets nothing and no wishes; the full
description plus "make it the best day possible" keeps "vegetarian option" and drops the rest.
The quantities are still loose (two beginner clinics for eight, two beers for sixteen) - see
*First real calls* in [[BE-7 An LLM fills in the form from the visitor's description of the day|BE-7]]; not this ticket's
work.
