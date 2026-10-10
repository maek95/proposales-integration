# 003 Proposales calls go through the Next server

Decided 6 October 2026, at the start of the project. Recorded the same day, after 001 and 002 -
numbering follows when a note was written, not when the decision was made.

## Context

The app needs data from Proposales. The simplest-looking option is calling
`api.proposales.com` straight from the browser.

## Options

- **Call Proposales from the browser.** No server code. But the API key would ship in the
  JavaScript bundle, readable by anyone in DevTools, and browser requests to a third-party API
  are likely blocked by CORS anyway.
- **A separate proxy** (nginx or a small backend). Hides the key, but it's another thing to run
  and deploy - and Vercel doesn't host nginx.
- **The Next.js server as the proxy.** Server Components, Route Handlers and Server Actions
  already run on the server, locally and on Vercel. Server-to-server requests aren't subject to
  CORS.

## Decision

The Next.js server. One server-only client per service in `app/_clients/<service>/`; Server
Components call it directly, client components go through a Route Handler. The key stays in a
server env var and never reaches the browser. The rules that follow from this are in
`.claude/rules/external-apis.md`.

## Consequences

- Works the same on localhost and Vercel; no extra infrastructure.
- Gives us one place to validate responses, trim fields, handle errors and mock data - which
  [[001 Mock data for Proposales calls]] and [[002 Failing per feature, validating by hand]]
  build on.
- Every Proposales call costs a server hop, which doesn't matter at this scale.
