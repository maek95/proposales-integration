# Demo venue setup

Planned 6 October 2026. **Not started** - nothing has been done in the account.

The Proposales-account side of the first version: what the user sets up by hand in the Proposales
app, so the drafts our site creates look like they come from the golf club
([[006 We're a golf club]]). Steps 1-4 are ticket [[ACC-2 Set up the golf club in the Proposales account - company, currency, template|ACC-2]] and step 5 is [[ACC-1 Check whether Proposales' Buyer Portal already does what our form does|ACC-1]] in
[[First version build]]; they're needed before the site goes live. Everything before
that runs against mocks.

*Cut down 7 October 2026:* this plan used to also hold the catalogue, creating it in our repo, and
verifying the first real draft. Since [[010 First version - what we build]], those are steps of
[[First version build]] - one home each. Images were dropped with the content library
([[007 Our catalogue lives with us]]). *Before that, 6 October 2026:* it seeded the club's
products into the Proposales content library with a script.

## Constraints

- **It's the real account, and the reviewers can see it.** Everything is clearly a demo,
  nothing is half-finished, and it can be undone.
- **A fictional club.** The name must not match a real golf club - check before using it - and
  carries "(demo)" where it shows.
- **No real people's data.** Test recipients use addresses we own.

## Steps (the user, in the Proposales app)

1. **Pick the club's name** - and check no real golf club has it.
   *Picked 9 October 2026:* **Tallmora GK**, chosen by Claude when the user asked for the site's
   placeholders to be filled in. A web search found no club with that name. The site's copy is in
   `app/_content/club.ts`; the phone number is from PTS's range for fiction, and the email uses the
   `.example` domain. The account still has to use the name too (steps 2-4).
2. **Currency** - the company is set to EUR; a Swedish club would use SEK. See whether it can be
   changed in the company settings. (Our blocks carry a currency either way.)
3. **The company** - rename it to the club, or create a second company for it if Proposales
   allows, so the user's real company name isn't the "golf club". Logo optional.
4. **One template** - intro text and layout for the club's proposals. Our drafts link to it.
5. **Look at the Buyer Portal** - it may already be a package configurator, which would overlap
   what we build (see *What we build, and what Proposales does* in [[Proposales overview]]). If it
   does, record what it covers before building the form.

Not needed: the inbox, and the content library.

## When it's done

Tell the next session the club's name and currency, so the site and the catalogue can use them,
and mark this plan done with the date.

## Undoing it

A renamed company is renamed back; a second company is removed in the settings. The template can
be deleted. Nothing else is written to the account.
