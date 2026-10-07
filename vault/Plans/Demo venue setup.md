# Demo venue setup

Planned 6 October 2026. **Not started** - nothing has been written to the account.

We're a golf club ([[006 We're a golf club]]), and the club's catalogue lives in our own data
([[007 Our catalogue lives with us]]). This plan sets up both sides: the catalogue in our repo,
and just enough of the Proposales account that the drafts our app creates look like they come
from the club.

*Reworked 6 October 2026:* the first version seeded the club's products into the Proposales
content library, with a script writing to the account. Since 007, the catalogue is ours and goes
into Proposales inline on each proposal block - so there's nothing to seed into Proposales, and
the content library is optional.

## Constraints

- **It's the real account, and the reviewers can see it.** Everything is clearly a demo,
  nothing is half-finished, and it can be undone.
- **A fictional club.** The name must not match a real golf club - check before using it - and
  carries "(demo)" where it shows.
- **No real people's data.** Test recipients use addresses we own.

## The club's catalogue

Group business only - company golf days, golf trips, tournaments; individual tee times are out of
scope. Working name: **[club name] (demo)**.

| Product | Unit | Indicative price |
|---|---|---|
| Green fee, 18 holes | per player | 650 SEK |
| Golf cart | per cart (two players) | 400 SEK |
| Clubhouse lunch | per person | 185 SEK |

Kept to the basics in [[009 A simple item list, Proposales does the proposal]]. *Earlier
version:* nine products, including a 9-hole green fee, club rental, a shotgun tournament setup,
a pro clinic, a prize dinner and the lounge - they can come back if the simple version holds up.

Descriptions: two or three plain sentences each, written when the data is created.

## Steps

### 1. Decide (the user)

- The club's name.
- Currency - the company is set to EUR; a Swedish club would use SEK. Check whether it can be
  changed in the company settings; the blocks we send carry a currency either way.
- Images: none at first, or free-licensed photos by public URL.
- Where the catalogue lives - a typed data file for the demo, or a database (see
  [[Open questions]]).

### 2. Set up by hand in the Proposales app (the user)

- **The company** - rename it to the club, or create a second company for it if Proposales
  allows, so the user's real company name isn't the "golf club". Logo optional.
- **One template** - intro text and layout for the club's proposals.
- Look at the **Buyer Portal** - it may already be a package configurator, which would overlap
  what we build (see *What we build, and what Proposales does* in [[Proposales overview]]).
- Not needed for this plan: the inbox (only if the app also takes requests that way), and the
  content library (only if the club also builds proposals by hand).

### 3. Create the catalogue in our repo

- The products, descriptions, units and prices as typed data, validated with a zod schema - in
  the app's own code, not under `app/_lib/proposales/`, since it's our data, not Proposales'.
- The fixtures for Proposales calls that need products build on the same data, not copies.

### 4. Verify with one real draft

- Create one draft proposal from a few catalogue items, with the user's go-ahead (it writes to
  the account).
- Open it in the Proposales app: the club's name, the template, the blocks with their prices.
  Check how blocks without a content-library link look in the editor.
- Send it, from the Proposales app, to an address the user owns - to see the customer's side: the
  email, the offer page, ticking extras, signing. We assume Proposales emails the offer link on
  send; this confirms it.
- Archive it afterwards, or keep it as the clearly named demo.

### 5. Record

- A decision note for what was set up.
- The club's name and what it offers in a vault note about the product, once the app is picked.

## Undoing it

A renamed company is renamed back; a second company is removed in the settings. Test drafts are
archived. Nothing else is written to the account.

## Open before starting

- The club's name, and a check that it isn't a real club.
- Currency.
- Images.
- Data file or database.
