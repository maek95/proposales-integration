---
name: proposales-endpoint
description: Wire up a Proposales API endpoint for use in the app — a typed helper in app/_clients/proposales/, plus a Route Handler if a client component needs it. Use when the user wants to read or write proposals, content, companies, templates or attachments, or asks to "call", "add" or "integrate" a Proposales endpoint.
---

# Proposales endpoint

Follow `.claude/rules/external-apis.md` and `.claude/rules/proposales.md`.

## Steps

1. **Look the endpoint up in the spec.** Fetch https://docs.proposales.com/openapi.json and find the path and method. Note:
   - Path and query parameters, and which are required.
   - The request body schema (for writes).
   - The `200`/`201` response schema — follow `$ref`s into `components.schemas`.
   If the spec doesn't cover what the user wants, say so rather than guessing a path.
2. **Add a file for the call, named for what it does** - `app/_clients/proposales/<method>-<thing>.ts` (`get-proposal.ts`, `post-proposal.ts`) - and add `export * from "./<method>-<thing>"` to `index.ts`. Follow `get-companies.ts`:
   - `<Thing>Schema` with only the fields the app uses, and `type <Thing> = z.infer<typeof <Thing>Schema>`. Mark a field `.nullable()` / `.optional()` only if the data really can be missing - not to make validation pass.
   - The helper checks `mocks.serve(fixture)` first, then calls `proposales(path, envelope(schema), init)` and returns the unwrapped value. Name it the same as the file (`get-content.ts` → `getContent`, `post-proposal.ts` → `postProposal`) and give it a one-line comment with the method and path.
   - Build query strings with `URLSearchParams`; send bodies with `JSON.stringify`.
   - Timeouts, errors, validation and logging are handled by `app/_clients/http.ts` - don't add any here.
3. **Add a fixture** in `app/_clients/proposales/mocks/<method>-<thing>.ts`, typed with the inferred type. For a read, make one real call to see the actual shape (the spec can be wrong - fields marked required come back `null`), then write the fixture from that shape with made-up values. For a write, build the fixture from the spec's response schema - no real call needed.
4. **Add a Route Handler only if a client component calls it.** `app/api/<path>/route.ts`: `export async function GET() { try { return Response.json({ data: await listThings() }); } catch (err) { return errorResponse(err); } }` - return only the fields the client uses. Validate any input from the request before forwarding it. In a Server Component, wrap the call in `attempt()` and render an `ErrorNotice` on failure.
5. **Add it to the API map** - a row in `vault/Integrations/API map.md`: the endpoint, the helper, what uses it, and any Route Handler as an inbound row.
6. **Verify.**
   - `npm run lint` and `npm run build`.
   - With `PROPOSALES_MOCK=true`: the page or route renders the fixture.
   - With `PROPOSALES_MOCK=error`: the feature shows its error state and the rest of the page still renders.
   - Reads: one real call (page load or curl) to confirm the helper works against the API. Not a loop.
   - Writes: don't call them to test without the user's go-ahead. Tell them what it will change.
