# 001 Mock data for Proposales calls

Decided 6 October 2026.

## Context

Proposales documents no rate limit (see [[Proposales overview]]), the API key belongs to a real
account, and building UI means reloading pages over and over - each reload a real API call.
Write flows are worse: testing one creates real proposals.

## Options

- **Always call the real API.** Simplest, always accurate. Every UI tweak spends calls, and write
  flows can't be tried safely.
- **Record and replay HTTP responses** (e.g. MSW or a fetch interceptor). Realistic, but adds a
  dependency and a layer most of this small app doesn't need.
- **Typed fixtures behind an env flag.** One fixture file per endpoint, returned by the helper
  when `PROPOSALES_MOCK=true`. No dependency; the fixture is typed, so it can't silently drift
  from what the app reads.

## Decision

Typed fixtures behind `PROPOSALES_MOCK`. The switch sits in each helper in
`app/_lib/proposales/` (fixtures in its `mocks/`), so pages and routes don't know whether data is mocked. Fixtures take
their shape from one real response but every value is made up - they're committed, and real
proposals contain other people's names and emails.

## Consequences

- Generalised the same day: every external API follows this pattern, with its own
  `<SERVICE>_MOCK` switch (`.claude/rules/external-apis.md`).

- UI work and write flows can be tried without touching the account or a key - a reviewer can
  run the app without signing up.
- Fixtures can go stale when Proposales changes a response. They only hold the fields we type,
  which limits that, and a final check against the real API catches the rest.
- The flag is off by default, so a misconfigured deploy fails loudly (missing key) rather than
  quietly showing fake data.
