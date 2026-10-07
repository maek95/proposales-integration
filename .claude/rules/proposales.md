---
description: What's specific to Proposales on top of external-apis.md - the client, the key, the spec, the inbox token, the real interview account, and which fields can't go in fixtures.
---

## Proposales

The general rules are in `external-apis.md`. This file only holds what's different about
Proposales. Background - what the API offers, its limits - is in
`vault/Integrations/Proposales/Proposales overview.md`.

- **The client** is `app/_lib/proposales/`; the key is `PROPOSALES_API_KEY`; the mock switch is
  `PROPOSALES_MOCK`.
- **The spec:** https://docs.proposales.com/openapi.json. It isn't always right about nullability -
  fields it marks required have come back `null` (company `timezone`, 6 October 2026). If we
  use such a field, the schema marks it `.nullable()` - otherwise validation fails loudly.
- **Money is in the smallest currency unit** - öre, cents. 650 kr is `65000`. Convert at the edge
  of `app/_lib/proposales/`, so the rest of the app works in whole currency units, and name
  fields so the unit is obvious.
- **The inbox token is a secret in disguise.** A company object includes `inbox_token`, and the
  inbox endpoint creates requests for proposal with that token alone - no API key. Never pass it
  to the browser or into a fixture, even though it arrives in an ordinary read.
- **This is the interview account.** The people grading the case can see it. A write that
  leaves junk proposals or archived content behind is visible to them - writes run only from the
  app's real flow, and test data is cleaned up or clearly named as test data.
- **Proposals hold other people's data.** Recipient names, emails, phone numbers and
  signatures belong to real recipients. Show them only where the feature needs them; never log
  them, never put them in fixtures, never send them to an LLM without a reason the feature
  depends on.
- To wire up a new endpoint, use the `proposales-endpoint` skill.
