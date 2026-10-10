# FE-5 Send checks the required fields in the browser first, and jumps to the first one missing

**Status:** In progress - built 10 October 2026, not committed yet; the user puts it on its own
branch.
**Blocked by:** nothing.
**Done when:** pressing Send with a required field empty or wrong (no date, a date in the past,
no company or name, an email that isn't one) makes no call to our API, scrolls to the first such
field with the field clear of the screen's edge, and says what's wrong - and the route still
rejects the same input on its own.

## What

Raised 10 October 2026, by the user: Send should use the browser's own required-field check,
which scrolls to the field - so we don't call the API for what we already know is missing.

The form had `noValidate`, which turns the browser's checks off: every mistake went to
`POST /api/group-days/requests` and came back as a `400`.

## What happened

Built 10 October 2026.

- **`noValidate` is gone** from the form in `app/group-days/_components/request-form.tsx`, and
  the details are marked for the browser: `required` on date, company, name and email, `min`
  today on the date (`todayInSweden()`, the same day the route uses), `maxLength={200}` on
  company and name, matching the route's schema. The headcount select already had `required`.
- **The route checks everything again**, unchanged (`app/api/group-days/requests/schema.ts`):
  the browser's checks can be skipped by anyone calling the route directly. The browser saves a
  call for what we can tell in advance; the route is still what decides.
- **Not a browser check:** "pick at least one thing" - Send is disabled until something is
  picked, as before.
- **The browser's own messages**, in the visitor's browser language ("Please fill out this
  field."), not ours. Our wording still shows for anything only the route catches.
- **`scroll-my-40`** on every form control (`app/_components/ui/field-control.ts`): the browser
  scrolls the least it can, which left the field at the bottom edge of the screen; with the
  margin it stops with the field's label and heading in view.

**Checked** in headless Chrome on a production build: 16 people, one green fee, Send pressed
with the details empty - no request to our API, the date field focused with "Please fill out
this field.", the page scrolled down to it, the field 692 px from the top of a 900 px screen
(852 without the margin). `npm run lint` and `npm run build` pass.
