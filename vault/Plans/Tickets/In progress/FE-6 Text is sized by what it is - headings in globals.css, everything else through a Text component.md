# FE-6 Text is sized by what it is - headings in globals.css, everything else through a Text component

**Status:** In progress - built 15 October 2026, not committed yet; the user puts it on its own
branch.
**Blocked by:** nothing.
**Done when:** no font size, line height or letter spacing is written in brackets anywhere in
`app/` (`text-[19px]`, `leading-[0.95]`); `h1`-`h6`, `legend` and the body text get theirs from
`app/globals.css`; other text is a `Text` variant or a role class, with Tailwind's own sizes
switched off; and the three pages look the same as before, give or take the pixel moves listed
below.

## What

Raised 15 October 2026, by the user: we shouldn't write `text-[19px]` and
`text-[clamp(44px,8vw,104px)]` on elements - the headings, paragraphs and the base font size
belong in `globals.css`, so a `p` or an `h1` never carries a size of its own.

Before: 16 sizes in brackets across 11 files, plus 5 bracketed line heights and letter spacings.
The heading components (`PageHeading`, `SectionHeading`) each carried their own sizes, and the
same 40-px number style was written twice.

## What happened

Built 15 October 2026.

- **Tokens** in `@theme` (`app/globals.css`) for the sizes Tailwind's scale doesn't have, each
  with its line height, spacing and weight: `display` (the page headline, 44-104 px), `title`
  (a section heading, 32-44 px), `heading` (30 px), `stat` (the 40-px numbers), and
  `tracking-eyebrow` (the small capitals over the landing headline).
- **Element defaults** in `@layer base`: `h1` display, `h2` title, `h3` heading, `h4` and
  `legend` 18 px bold, `h5` 16 px bold, `h6` 14 px semibold; body 16 px / 1.5 (it was on
  `<body>` in `app/layout.tsx`).
- **The headings lost their classes.** `PageHeading`, `SectionHeading`, the landing `h1`, the
  form's state headings and legends now carry only layout (`mb-6`, `max-w-[11em]`).
- **One-offs moved to Tailwind's scale** where it's within a pixel: 19 → `text-xl` (20), 17 →
  `text-lg` (18), 15 → `text-sm` (14), 13 → `text-xs` (12); 30 was `text-3xl` already.
  "Request sent." was 36 px and is now the shared h3, 30.
- **One exception, named:** the form's category labels ("On the course") are `h3` for the page
  outline but look like a small grey label - `text-sm font-semibold tracking-normal`, all
  named sizes.
- **A rule** in `.claude/rules/code-conventions.md`, so new code doesn't bring sizes in brackets
  back.

**Checked:** lint and build pass; the compiled CSS has the element defaults. Full-page
screenshots of the three pages before and after, at 1440 and 390 px wide, in headless Chrome:
heights within 22 px, except the group-days page on a phone, 52 px taller - 2 px per product
card, from the 18-px names. The club page's fact cards are about 10 px shorter (the stat line
height is 1.1, was 1.25).

## Next: text roles, not sizes

Raised 15 October 2026, by the user: `text-xl` on the club teaser is still a size, not what the
text *is* - and with any of Tailwind's sizes available, the next developer picks their own.

**Research, 15 October 2026:**

- **Tailwind** recommends a component for styles reused across files; custom CSS when a
  component is heavy-handed; not `@apply`
  ([styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes)).
- **Design systems** give text a fixed set of roles in one component: Radix Themes `<Text size>`
  on a fixed 1-9 scale with `as` for the element
  ([Radix Text](https://www.radix-ui.com/themes/docs/components/text)); MUI
  `<Typography variant="body1 | caption | overline">`.
- **Enforcement** is removing the alternatives: Tailwind v4's `--text-*: initial;` in `@theme`
  deletes the default sizes, so only the ones we define exist
  ([theme](https://tailwindcss.com/docs/theme)); a lint rule makes a bracketed size fail.

The roles the site uses: lead, eyebrow, stat, item title, caption, fine print, label.

**Proposed 15 October 2026:** headings stay element defaults; one `Text` component with a
`variant` (`lead`, `eyebrow`, `stat`, `item`, `caption`, `fine`, `label`) and `as`, sizes
inside, `className` for colour and margins only; `--text-*: initial` with only the role sizes
defined; a lint rule against bracketed sizes. Waiting for the user's go-ahead.

*Decided 15 October 2026, by the user:* the `Text` component, yes; the lint rule, not yet.

**Built 15 October 2026:**

- **Only role sizes exist.** `--text-*: initial` in `@theme` switches off Tailwind's `text-xs` …
  `text-9xl` - checked in the built CSS: gone. Defined instead: `display`, `title`, `heading`,
  `stat` (from before), and `lead`, `body`, `item`, `label`, `caption`, `fine`, `brand`.
- **`Text`** (`app/_components/ui/text.tsx`): `variant` `lead | eyebrow | stat | item | caption |
  fine | label`, `as` for the element (`p`, `span`, `div`, `dt`, `dd`); `className` for colour
  and margins. It replaces `Lead`, which is gone; the lead's 32em width moved into the variant.
- **Every call site** uses a variant, an element default or - for what isn't text (a field's
  `<label>`, the nav, buttons, the stepper) - a role class. No Tailwind size is left in `app/`.
- **The rule** in `.claude/rules/code-conventions.md` says it the same way.
- **Not yet:** the lint rule that would fail `npm run lint` on a bracketed size - the user wants
  to wait with it. Until then, a `text-[19px]` would still work; `text-xl` wouldn't.

**Checked:** lint and build pass. Full-page screenshots against the step before (element
defaults): page heights within 1-12 px, from line-height rounding; the landing page, header,
form cards and summary look the same.

