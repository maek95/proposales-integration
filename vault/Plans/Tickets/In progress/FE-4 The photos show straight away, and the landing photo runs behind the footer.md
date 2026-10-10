# FE-4 The photos show straight away, and the landing photo runs behind the footer

**Status:** In progress - built and committed 10 October 2026 on branch `FE-4`; waiting for a
look on its preview deployment.
**Blocked by:** nothing.
**Done when:**
- refreshing any page in production shows the photo at once - a blurred preview, then the
  photo - never the grey overlay on an empty background;
- on the landing page, the photo fills everything below the header, the footer sits on it with
  white text and no panel, and the page fits the screen with no scrolling to reach the footer.
  Every other page keeps its grey footer.

*Changed 10 October 2026, from the user:* this was two tickets - FE-4 for the photos, FE-5 for
the landing footer - made one: both are the landing page's photo, built together.

## What

**The photos.** Raised 10 October 2026, by the user: on production, the landing page's photo
came in late on every refresh, grey until it did.

The cause: the three photos were loaded from `images.unsplash.com`. next/image fetched and
resized each one again once its cache ran out (4 hours by default), with nothing to show
meanwhile, and a remote photo gets no automatic placeholder.

**The landing footer.** Raised 10 October 2026, by the user: on the landing page you always had
to scroll down for the footer. The photo filled the screen below the header, so the footer was
always just below it.

## What happened

Built 10 October 2026.

### The photos

- **The photos are in the repo**, `app/_content/photos/` (`hero.jpg`, `lake-green.jpg`,
  `clubhouse.jpg`, 2400 px wide, about 2 MB together), and `app/_content/photos.ts` imports them.
  A static import is hashed by its content, so it's served as `immutable` and the browser keeps
  it; next/image builds a blurred placeholder from it. The Unsplash sources stay listed beside
  each photo.
- **`placeholder="blur"`** on the landing photo and in `Photo` (the club page's two photos).
- **`remotePatterns` is gone** from `next.config.ts` - nothing is loaded remotely, so our image
  optimiser can't be used as a proxy for anyone else's images.
- **Why not `public/`:** its files are served with `Cache-Control: max-age=0` - Next can't know
  they won't change - and a `src="/hero.jpg"` string gets no placeholder or size. `public/` is
  for files that need a fixed URL (favicon, `robots.txt`); files the code imports live next to
  it, here in `_content/`.
- **Why plain git:** 2 MB, replaced at most once, when the club has its own photos - not worth
  LFS or a CDN. Visitors download the resized versions (the hero at 1080 px is 70 KB).

**Checked** on a production build: the page carries the blurred hero inline; the photo comes
back with `Cache-Control: public, max-age=315360000, immutable`. Not yet checked on the live
site.

### The landing footer

- **The root layout** wraps `<main>` and the footer in one positioned box
  (`app/layout.tsx`), so the landing photo - `fill`, so absolutely positioned - covers both.
- **The hero fills what's left** below the header (`flex-1`) instead of its own
  `min-h-[calc(100svh-80px)]`, so photo, heading and footer fit one screen; a taller hero on a
  small phone still grows and scrolls.
- **A Tailwind variant, `landing:`** (`app/globals.css`), styles the page chrome only when the
  landing hero (`data-landing`) is on the page - `body:has([data-landing])`. The footer uses it:
  `landing:bg-transparent landing:text-white`. It switches back as soon as you navigate away.
- **Not a route group.** The Next way to give one page different chrome is a layout per group:
  `app/(site)/` with the footer for `club/` and `group-days/`, the landing page outside it. That
  moves both route folders and every path written to them in CLAUDE.md, the rules and the vault,
  for one page's footer colours. With more pages that differ, it's the better shape.

**Checked:** lint and build pass, and the built CSS has the `landing:` rules. Not checked in a
browser yet.
