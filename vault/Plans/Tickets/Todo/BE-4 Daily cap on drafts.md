# BE-4 Daily cap on drafts

**Status:** Todo
**Blocked by:** nothing.
**Done when:** once the cap for the day is reached, Send creates no draft and the visitor is
told why - checked against mocks, including the count failing - and the cap is set by an env
var.

## What

A site-wide limit on how many drafts the group-days form can create per day - the hard
guarantee that, whoever sends and from wherever, at most N drafts a day reach the club's
Proposales account (the one the reviewers can see). Per-IP limits don't give that: without a
login the IP is all we have, and a VPN changes it at will.

- **Where it runs** - in the Send route, `app/api/group-days/requests/route.ts`, after the input and the picks
  are checked and before `postProposal`. Nothing goes out once the cap is hit.
- **The cap** - an env var, e.g. `GROUP_DAY_DRAFTS_PER_DAY`, default 20. "A day" is the club's
  day, Swedish time.
- **Counting, proposed** - in Proposales itself, so no new service: each draft carries a
  `created_on` date in its `data` next to `source: "website"`, and before creating one we count
  today's with `GET /v3/proposal-search?filter[source]=website&filter[created_on]=<today>`. One
  extra call per Send. Check against the spec first: that the filter matches on `data` keys,
  whether drafts and archived proposals are counted, and how many results one call returns.
  Alternatives if that doesn't hold: a small Redis (Upstash) or Vercel's firewall.
- **At the cap** - `429` from the route; the form shows "We've had a lot of requests today -
  please call or email the club", with the club's phone number. Logged once, without personal
  data.
- **If counting fails** - Proposales is the one being protected, so fail closed: no draft, the
  same "requests can't be sent right now" as when Proposales is down.
- **Not exact** - two Sends at the same moment can both pass at N-1. Good enough for a cap whose
  job is to bound the damage.

Background, and the other measures (honeypot, per-IP limit, captcha) in
[[Open questions]] - *How do we protect the live site's Send?*
