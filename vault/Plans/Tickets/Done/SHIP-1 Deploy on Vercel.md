# SHIP-1 Deploy on Vercel

**Status:** Done 10 October 2026
**Blocked by:** [[BE-4 Daily cap on drafts|BE-4]], [[BE-5 Prices and quantities in the draft|BE-5]].
**Done when:** the live URL works end to end.

## What

The app on Vercel, `PROPOSALES_API_KEY`, `PROPOSALES_COMPANY_ID` and (if set up)
`PROPOSALES_TEMPLATE_UUID` in the project's environment variables. `PROPOSALES_MOCK` off;
`GOLF_BOOKING_MOCK=true`, since no real booking system is connected and the form needs its
prices.

- **Env vars, checked 10 October 2026 against the code:** `PROPOSALES_API_KEY` (Sensitive),
  `PROPOSALES_COMPANY_ID`, `GOLF_BOOKING_MOCK=true` are required; `PROPOSALES_TEMPLATE_UUID`
  recommended; `PROPOSALES_MOCK` unset in Production. Redeploy after changing them.
- **Preview deployments write for real** if they get the same values - every branch and pull
  request becomes a live site creating drafts in the account. Give the Proposales variables to
  Production only and set `PROPOSALES_MOCK=true` for Preview.
- **Cap the Send route.** `POST /api/group-days/requests` is a public URL, so once the site
  is public anyone could fill the reviewers' Proposales account with drafts. Before going live:
  a limit on how often one visitor can send (and maybe a honeypot field). Noted 9 October 2026,
  while building BE-3.

## Outcome

*Done 10 October 2026* by the user, before [[BE-4 Daily cap on drafts|BE-4]] and
[[BE-5 Prices and quantities in the draft|BE-5]] - which this ticket listed as blocking. So the
live site creates real drafts in the account with no cap yet, and the drafts show no prices until
BE-5. Both stay in Todo.
