# 014 Headcount first, then describe your day

Decided 10 October 2026, by the user, closing [[SHIP-3 Decide on an LLM, and a bigger catalogue|SHIP-3]].

## Context

The brief makes an LLM the bonus ([[The brief]]). SHIP-3 looked for where one belongs in the
group-days form, and the user ruled out one idea after another for the same reason: the input
was already structured, so code did it better. With three products (green fees, carts, lunch),
a sentence like *"16 of us, carts for half, lunch after"* is a headcount and two rules.

Two rules came out of that discussion, both from the user:

- **The LLM lives on the website**, in something the visitor does and sees happen. Nothing
  LLM-written lands in Proposales on its own - the draft holds only what the visitor chose.
- **An LLM only where code can't read the input** - free text, not numbers a field could hold.

## Options

All in SHIP-3, with why each was dropped:

- **A - "Describe your day" fills in the form.** First ruled out: with three products a
  headcount does it.
- **B - an LLM-written intro in the draft.** Hidden inside Proposales, and a template writes it.
- **C - suggested extras.** Structured input; a rule picks them.
- **D - a headcount that prefills the form,** no LLM.
- **E - "Ask the club"**, questions answered from the club's terms. Passed the tests, but sits
  beside the integration rather than in it.
- **F - scorecards to leaderboard** from a photo. Passed the tests, but furthest from Proposales.
- **No LLM**, with the reasoning written down.

## Decision

**A, made worth it by a real catalogue.** The club gets the range a real club sells for group
days - about 27 products in five groups: course, hire and shop, food, drinks, competition and
prizes, built in [[SHIP-3 Decide on an LLM, and a bigger catalogue|SHIP-3]]. Then the form asks in this order:

1. **How many are you?** - a required select, before anything else
   ([[FE-3 The form asks how many you are before anything else|FE-3]]). A number the visitor knows exactly stays a field, not
   something a model guesses.
2. **Describe your day** - an optional text box. *"Half have never played, lunch before, a few
   beers and something sweet after, prizes for the longest drive."* An LLM turns it into
   quantities across the whole catalogue, and the steppers fill in
   ([[BE-7 An LLM fills in the form from the visitor's description of the day|BE-7]]).
3. The visitor checks and adjusts every stepper, then sends - as today.

Why this passes both rules: across 27 products, prose like that maps onto a dozen lines -
beginner clinic, rental clubs, 9-hole fees, sweets, beer, the prize package - which no handful
of rules does well. The visitor sees the form fill in and changes what's wrong; the model
proposes ids and quantities only, through structured output limited to our product ids; prices
always come from the catalogue; Send is the visitor's press.

**No embeddings.** The model doesn't reach our data. The route reads the catalogue with
`getProducts()` and puts it in the prompt - 27 products is a few thousand tokens. Retrieval is
for data too large for the prompt.

**Not the Proposales MCP server.** Proposales has one (`docs.proposales.com/mcp`), but it
searches their documentation and API spec - knowledge about Proposales, not about the club or
the visitor's day. It's a tool for us while building, not for the feature
([[Proposales overview]]).

## Consequences

- **The form grows** - five groups of steppers. Grouping by category is done (SHIP-3); if it still
  feels long, collapsing groups is the next step.
- **Decision [[009 A simple item list, Proposales does the proposal|009]]'s three basic items
  are now the start of a longer list** - still an item list, still Proposales doing the proposal.
- **A new paid, public endpoint** - it needs a max input and output length and a per-visitor
  limit, like Send ([[BE-4 A daily cap on how many drafts the website can create in Proposales|BE-4]], `.claude/rules/external-apis.md`).
- **VAT differs per product** now (golf, food, alcohol, goods) - which
  [[BE-5 Every line in the Proposales draft shows its price and quantity|BE-5]] already expects to come from our product data.
- **With more time:** E ("Ask the club") on the same AI client, and the date from the
  description ("a Friday in early June") checked against availability.
