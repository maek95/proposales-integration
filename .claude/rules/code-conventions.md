---
description: Where code goes in app/, Server vs Client Components, styling, TypeScript, and keeping an interview project small.
---

## Code conventions

- **Next.js 16.** APIs differ from older versions - check `node_modules/next/dist/docs/` before
  using a Next API you're unsure of (see `AGENTS.md`).
- **Where code goes:**
  - A new page section is a file in `app/_components/sections/`, added to `app/page.tsx`.
  - Page chrome (header, footer) lives in `app/_components/layout/`.
  - Anything reused across sections goes in `app/_components/ui/`. Use those rather than
    re-styling.
  - Non-UI code (API clients, helpers) lives in `app/_lib/`.
  - Imports use the `@/` alias (`@/app/_lib/proposales`); relative imports are fine within
    `_components/`.
- **Pages are route folders in `app/`** (`app/proposals/page.tsx` → `/proposals`).
  `_`-prefixed folders are private and ignored by routing. Never create a top-level `pages/`
  folder - Next treats it as the Pages Router. To group routes without changing URLs, use
  `app/(group)/`.
- **Server vs client.** Keep components as Server Components. Add `"use client"` only for small
  interactive pieces, passing them data as props.
- **Styling.** Tailwind utilities. Shared colours and fonts are tokens in `app/globals.css` -
  add one there rather than hard-coding hex values.
- **TypeScript.** No `any`.
- **Keep it small.** Interview project - readable, obvious code over abstraction. No new
  dependencies without a clear reason.
