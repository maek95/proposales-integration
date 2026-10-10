# Fairway modern

The look of the club's site, chosen 9 October 2026 - see [[012 The site's look is Fairway modern]].
This note is the build spec for [[DES-2 The site, built from the mockup|DES-2]] in [[First version build]]: what the mockup shows,
in terms of this repo. The mockup itself is the
[Claude Design canvas](https://claude.ai/artifact/KoaxopcEbmGGJmfFZYdJQ8) (row B); its source is
saved next to this note as `fairway-modern.dc.html` - a design file, not code to copy. Read it
for exact spacing; build with Tailwind and the components below.

**The mockup decides the look, not the data.** Prices, units and default quantities in it are
sample values. Products and prices come from the golf booking system ([[BE-1 The mocked golf booking system|BE-1]]).

## Tokens

Add these to `app/globals.css` as `@theme` tokens; never hard-code the hex values in components.
Light only for the first version - the current dark-mode block goes.

| Token | Value | Used for |
|---|---|---|
| `ink` | `#0E1411` | text, the dark summary panel, the tee-time pill |
| `muted` | `#48524C` | lead paragraphs, secondary copy |
| `subtle` | `#56605A` | unit/price lines, disabled button |
| `on-dark-muted` | `#A9B8AE` | secondary text on the dark panel |
| `on-dark-rule` | `#2A332E` | row dividers on the dark panel |
| `fairway` | `#17663A` | primary actions, the active nav link, the + button, the sent panel |
| `mint` | `#7BD49A` | the send button on the dark panel (ink text) |
| `panel` | `#F1F4F1` | item cards, footer, sending panel |
| `stepper` | `#E3E9E4` | the − button |
| `line` | `#CBD3CD` | input borders |
| `danger-bg` / `danger-text` / `danger-icon` | `#FDEEE7` / `#7A2A0C` / `#B4400F` | service-error notices |
| `field-error` | `#B3261E` | invalid field border and message |
| `on-fairway-muted` | `#D3E8DA` | the summary line on the sent panel |

**Type:** Hanken Grotesk (400, 500, 600, 700, 800) through `next/font/google`, replacing Geist.
- H1: `clamp(44px, 8vw, 104px)`, 800, line-height 0.95, letter-spacing -0.045em, max ~11em.
- H2: 44px, 800, line-height 1.05, letter-spacing -0.03em.
- Lead: 19px, `muted`. Body 16px / 1.5. Legends 18px 700. Labels 14px 600.
- Total: 40px 800, letter-spacing -0.03em, tabular numbers.

**Shape:** container max 1200px, 24px side padding. Radius 12px inputs, 14px cards and notices,
20px big panels and the photo, full pill for buttons and the stepper. Inputs 48px high; every
tap target at least 44px.

## The page, top to bottom

*Changed 9 October 2026, from the user:* **two pages, not one.** One long page with the club
intro and the form under it was confusing - it read as if the whole site were the group-days
form. Now `/` is the club's own page and `/group-days` is one part of the site, with the nav
marking the current page. The mockup's single page with anchors is described below as it was;
what changed:

- **The club** (`/club`, `app/club/_components/`) - "Golf among the pines.", the photo, *The course* (text
  and four facts), *The clubhouse*, and a `fairway` panel "Bring the whole team." linking to
  group days. The club's facts and copy are made up.
- **Group days** (`/group-days`, `app/group-days/_components/`) - the mockup's "Golf for the whole
  team." intro, then three steps (put it together, the club sends an offer, adjust and sign) -
  what happens after Send, which the one-page version never said - then the form.
- The header and footer are rendered once, in `app/layout.tsx`. *Contact* jumps to the footer
  on either page.

*Changed again 9 October 2026, from the user:* **three pages.** `/` is a landing page - a
full-screen photo of a course, the club's line, and two ways in: *The club & tee times* and
*Plan a group day*. The club moved to `/club` (its heading is now "Welcome to Tallmora GK.", so
it doesn't repeat the landing page). Each page's pieces live next to the route
(`app/club/_components/`), not in shared `sections/` - a page isn't a reusable section. The
photo is a free Unsplash stock photo, loaded through `next/image`
(`images.unsplash.com` allowed in `next.config.ts`), until the club has its own. *Same day:* the
club page's striped placeholders became Unsplash photos too (the lake green, the clubhouse),
through a `Photo` component; every stock photo and its source is listed in
`app/_content/photos.ts`.
*Changed 10 October 2026, from the user noticing a grey hero on every refresh in production:*
the photos were loaded from `images.unsplash.com`, so each one was fetched and resized again
once the optimiser's 4-hour cache ran out, with nothing to show meanwhile - the dark overlay on
an empty background. They're now in the repo (`app/_content/photos/`, 2400 px, about 2 MB for the
three) as static imports: hashed and cached as `immutable`, with a blurred placeholder built in.
`remotePatterns` is gone from `next.config.ts`. Kept in git rather than LFS or a CDN - 2 MB,
replaced at most once, when the club has its own. See [[FE-4 The photos show straight away, and the landing photo runs behind the footer|FE-4]].

*Changed 10 October 2026, from the user:* on the landing page the photo now runs behind the
footer to the bottom of the page, and the footer sits on it in white - see
[[FE-4 The photos show straight away, and the landing photo runs behind the footer|FE-4]].

As mocked up: one page (`app/page.tsx`), anchors for navigation. The companies demo section goes.

1. **Header** (`layout/header.tsx`) - wordmark with a small stroke flag icon in `fairway`, then
   nav: The club, **Group days** (current, `fairway`, bold), Contact, and a dark pill
   "Book a tee time" linking out to the club's booking system. Wraps on a phone.
   *Changed 9 October 2026, from the user:* the current page is a `fairway` pill with white
   text, not just green bold text - it wasn't obvious enough. The other links get a `panel`
   background on hover.
2. **Club intro** (`sections/hero.tsx`) - the big H1 "Golf for the whole team.", a lead line
   with the club's own sentence in `[brackets]` until the club exists, and a `fairway` pill
   "Plan a group day" with an arrow, jumping to the form. Below, a full-width photo, 440px
   high, radius 20 - a striped green placeholder until we have a photo.
3. **Group days** (`sections/group-days.tsx`, new) - heading "Put your day together" with a
   one-line explainer beside it, then the form.
4. **Footer** (`layout/footer.tsx`) - `panel` background, wordmark, address · phone · email
   placeholders.

## The form

Two columns that wrap: the inputs (wide) and a dark summary panel (`aside`, ~300px) beside them;
on a phone the panel drops below.

- **1 · What the day needs** - one `panel` card per product: name (17px 700), price and unit
  below in `subtle`, and a white pill stepper: − (`stepper`), the quantity (an `<output>`),
  + (`fairway`, white). Buttons carry `aria-label`s ("Fewer green fees").
- **2 · When and who** - Preferred date, Company, Your name, Email; four fields in a wrapping
  row, each a real `<label>` around its input.
- **Your day** (the dark panel) - one row per product, "16 × Green fee, 18 holes ... 10 400 kr",
  then "Indicative total", the total, "Incl. VAT. Final price and availability are confirmed in
  the club's offer.", and the full-width `mint` pill **Send request**.

Money is shown Swedish style - `10 400 kr` (`toLocaleString("sv-SE")`) - in whole kronor; the
conversion to öre happens only at the Proposales edge.

## States

The same area of the page swaps between them. Copy as in the mockup; tune it in [[DES-2 The site, built from the mockup|DES-2]].

| State | What shows |
|---|---|
| Form | as above |
| Field wrong | the field gets a 2px `field-error` border, `aria-invalid`, and a message under it ("Enter an email address, like name@company.se"). From the server's field errors ([[BE-3 Send to Proposales through our API, code organised by what it does|BE-3]]). |
| Golf system down (prices can't load) | the item cards are replaced by a `danger` notice "Prices aren't available right now..." and **Send is disabled** - the feature can't work without prices (`.claude/rules/external-apis.md`, critical vs nice-to-have). The rest of the page renders. |
| Proposales down | a `danger` notice above the form, "Requests can't be sent right now...", the visitor's input kept, and Send disabled until they try again. |
| Sending | the whole form area becomes a `panel` box: a ring spinner, "Sending your request…", "Just a few seconds. Please keep this page open." Send can't be pressed twice. |
| Sent | a `fairway` panel: white check, "Request sent.", "The club will email you an offer shortly. You can add extras, adjust numbers and sign right in the offer.", a one-line summary of the picks and total, and an outline pill "Start a new request". No status, no link to the offer - that's Proposales' email ([[The app]]). |

## Where it goes in the code

- Tokens and the font: `app/globals.css`, `app/layout.tsx` (also the page `title`).
- `app/_components/ui/` - the pieces reused across states: a pill `Button` (primary `fairway`,
  `mint`-on-dark, outline), `Stepper`, `Field` (label + input + error), and `ErrorNotice`
  restyled as the `danger` notice.
- `sections/group-days.tsx` is a Server Component: it loads the products through the golf
  system client inside `attempt()` and passes them as props to a small `"use client"` form
  (quantities, total, the states). The send goes to `POST /api/group-days/requests` ([[BE-3 Send to Proposales through our API, code organised by what it does|BE-3]]) - one call per
  submit, nothing while typing.

## Left open by the mockup

- Default quantities and validation - settled while building, see below.
- A minimum number of players - not required for now; the club adjusts in the offer.
- The club's name, its sentence, the photo, the contact details - [[Demo venue setup]].

## Settled while building

Decided 9 October 2026, while building [[DES-2 The site, built from the mockup|DES-2]].

- **Quantities start at 0**, and Send is disabled until something is picked. The panel says
  "Nothing picked yet." The mockup's 16 / 4 / 16 were there to show a full card.
- **At most 144 of one product per request.** The mockup's stepper used the same cap. A bigger
  group calls the club.
- **Validation happens on the server**, in one schema (`app/api/group-days/requests/schema.ts`): a date
  from today onwards in Swedish time, company, name, and a valid email. The browser's own
  validation is off (`noValidate`), so every error looks the same. A field's error clears as soon
  as the visitor changes that field.
- **"Proposales down" has a Try again link in the notice.** The mockup didn't say how Send comes
  back after it's been disabled. The link sends again, so retrying is one click and Send never
  stays enabled while a call is known to fail.
- **The four fields sit 2 × 2 on desktop** (flex basis 260px, not the mockup's 220px). The
  mockup's basis put three on a row and left Email alone on the next one.
