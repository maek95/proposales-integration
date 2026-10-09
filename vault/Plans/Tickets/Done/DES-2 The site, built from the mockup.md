# DES-2 The site, built from the mockup

**Status:** Done 9 October 2026
**Blocked by:** [[DES-1 Mockup in Claude Design|DES-1]].
**Done when:** the site matches the mockup at desktop and phone width, with every state of the
form, against mocks.

## What

The site from the Fairway modern mockup ([[Fairway modern]] is the spec), in Next.js, replacing
the create-next-app placeholders.

## Outcome

Built 9 October 2026, then reshaped the same day on the user's feedback - the one-page mockup
read as if the whole site were the form.

- **Three pages** - a landing page at `/` (a full-screen course photo, the club's line, two ways
  in: *The club & tee times*, *Plan a group day*), the club at `/club` (intro, the course, the
  clubhouse, a way into group days), and group days at `/group-days` (how it works in three
  steps, then the form). The nav marks the current page as a green pill.
- **The form and every state** - products with steppers, date and contact fields, the dark
  summary panel with the indicative total, and the field-error, golf-system-down,
  Proposales-down, sending and sent states. The choices the mockup left open are in *Settled
  while building* in [[Fairway modern]].
- **Data** - products and prices from the mocked golf booking system
  ([[BE-1 The mocked golf booking system|BE-1]]). Send goes to a Server Action,
  `app/_lib/group-days/send-request.ts`, that only validates for now - nothing reaches
  Proposales yet.
- **The club** - fictional, Tallmora GK, its details in `app/_lib/club.ts`; stock photos from
  Unsplash, listed in `app/_lib/photos.ts`.
- **The code** - each route keeps its components in a private `_components/`
  (`app/club/_components/`); `app/_components/` holds only what's shared (`layout/`, `ui/`).
  One component per file, as `export default function`. Conventions in
  `.claude/rules/code-conventions.md`.

Checked: lint and build, screenshots at desktop and 500px, the golf-system-down state with
`GOLF_BOOKING_MOCK=error`. Not yet clicked through in a browser: the field-error, sending and
sent states.
