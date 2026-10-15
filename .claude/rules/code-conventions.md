---
description: Where code goes in app/, Server vs Client Components, styling, TypeScript, and keeping an interview project small.
---

## Code conventions

- **Next.js 16.** APIs differ from older versions - check `node_modules/next/dist/docs/` before
  using a Next API you're unsure of (see `AGENTS.md`).
- **Where code goes:**
  - A piece of one page lives next to it, in that route's private `_components/`
    (`app/club/_components/course.tsx`), composed by its `page.tsx`. A page is never reused as
    a section of another.
  - `app/_components/` holds only what's shared across pages: `layout/` and `ui/`.
  - **One component per file**, as `export default function`, the file named after it
    (`page-heading.tsx` → `PageHeading`). Related components share a folder, not a file
    (`ui/headings/`). The same goes for a helper like `pill()` (`ui/pill.ts`).
  - Page chrome (header, footer) lives in `app/_components/layout/` and is rendered once, in
    `app/layout.tsx`.
  - Anything reused across pages or sections goes in `app/_components/ui/`. Use those rather than
    re-styling.
  - Non-UI code goes by what it is (`.claude/rules/external-apis.md`): `app/api/` our endpoints -
    each route the whole backend for its request, its `schema.ts` beside it -
    `app/_clients/` calls to other systems' APIs, one file per call named for what it does
    (`get-products.ts`). Site content with no logic - the club's details, photos - is in
    `app/_content/`. Small pure helpers - dates, money - are in `app/_utils/formatters.ts`.
  - Imports use the `@/` alias (`@/app/_clients/proposales`); relative imports are fine within
    `_components/`.
- **Pages are route folders in `app/`** (`app/proposals/page.tsx` → `/proposals`).
  `_`-prefixed folders are private and ignored by routing. Never create a top-level `pages/`
  folder - Next treats it as the Pages Router. To group routes without changing URLs, use
  `app/(group)/`.
- **Server vs client.** Keep components as Server Components. Add `"use client"` only for small
  interactive pieces, passing them data as props.
- **Links are `next/link`, never a raw `<a>`** - also for external URLs, `#` anchors and links
  styled as buttons (`pill()`).
- **Styling.** Tailwind utilities. Shared colours and fonts are tokens in `app/globals.css` -
  add one there rather than hard-coding hex values.
- **Text is styled by what it is, never by its size.** The sizes are roles, defined once in
  `app/globals.css`; Tailwind's own sizes (`text-sm`, `text-xl` …) are switched off there, so
  they don't exist.
  - Headings: a plain `<h1>`-`<h6>` (and `<legend>`) already has its size - don't add one.
  - Other text: `<Text variant="lead | eyebrow | stat | item | caption | fine | label">`
    (`app/_components/ui/text.tsx`), with `as` for the element. Its `className` is colour and
    margins only.
  - Something that isn't text - a `<label>`, a button, a nav - takes a role class
    (`text-label`, `text-caption`, `text-body`).
  - No sizes in brackets (`text-[19px]`), nor bracketed `leading-`/`tracking-`. A role that's
    missing is added in `globals.css` (and as a variant) first.
- **TypeScript.** No `any`.
- **Keep it small.** Interview project - readable, obvious code over abstraction. No new
  dependencies without a clear reason.
