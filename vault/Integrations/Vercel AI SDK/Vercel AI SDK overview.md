# Vercel AI SDK overview

In use since 10 October 2026, behind "describe your day" - see
[[015 The model, the SDK and the limits behind describe your day]]. The brief names an LLM or the
Vercel AI SDK as the bonus (see [[The brief]]).
Researched 6 October 2026. Prices and free-tier details change: check the linked pages before
relying on them.

## What costs what

- **The AI SDK itself is free** - an open-source TypeScript library for calling LLMs (text,
  structured output, streaming, tools). It doesn't charge anything; the model it calls does.
- **Paying for the model, two ways:**
  - **Vercel AI Gateway.** One key (or automatic auth when deployed on Vercel), many providers,
    picked by a model string like `anthropic/claude-…`. No markup on token prices. Every Vercel
    account, Hobby included, gets a **free tier**: a monthly free credit for a subset of models,
    rate-limited per model. Over the limit it returns `429` rather than billing. Buying credits
    moves the account to the paid tier and ends the free monthly credit.
  - **A provider key directly** (e.g. `@ai-sdk/anthropic` with that provider's key). Pay per
    token from the first request. Small prompts cost fractions of a cent, but a public demo can
    be abused into a real bill.
- **Bring your own key through the Gateway** exists, but only on the paid tier.

## What it means for us

- On the free Gateway tier, the worst case for a public demo is a `429`, not a bill. Our rules
  already require handling `429` (`.claude/rules/external-apis.md`), so the feature shows "busy,
  try again" instead of breaking.
- It would follow the same pattern as Proposales: `app/_clients/ai/` with a server-only client and an
  `AI_MOCK` switch, so UI work doesn't spend credits.
- Structured output uses zod schemas, which the app already uses for validating API responses
  (see [[004 One shared layer for external APIs]]).

## Found building it

Checked 10 October 2026, building [[BE-7 An LLM fills in the form from the visitor's description of the day|BE-7]]:

- **`ai` 7 needs Node 22.** On Node 20, `npm install ai` gets 6 - still released, tagged
  `ai-v6`. Structured output is the same in both: `generateText` with `output: Output.object()`;
  `generateObject` is deprecated.
- **The Gateway needs no extra package** - a model string like `openai/gpt-4.1-mini` is enough.
  We add `@ai-sdk/gateway` only for its error classes.
- **The free tier's credit amount and rate limits aren't in the docs.** Only "a monthly credit"
  and "a lower limit per model"; past it, `429`. *Seen 10 October 2026, on the dashboard's AI
  Gateway page:* the free credit is **$5 a month**, for a limited set of models; it's switched on
  with **Use Free AI Gateway Credit**, which verifies a card without charging it. The rate limits
  still aren't stated anywhere. A `403 customer_verification_required` means
  the account needs a payment method on file before the free credit works. *Confirmed 10 October
  2026:* our first real call, with a new key, came back `403` "AI Gateway requires a valid credit
  card on file" - a card is needed even to use only the free credit.
- **The only Claude model on the free tier is `claude-3-haiku`.** Current Claude models need paid
  credits.
- **In production builds, a missing key isn't a `GatewayAuthenticationError`.** The SDK re-wraps
  it as a plain `AISDKError` named `"GatewayError"` (`wrapGatewayError` in `node_modules/ai`), so
  a check for the class alone misses it. `app/_clients/ai/client.ts` checks both.
- **The SDK's errors carry the request body** (`APICallError.requestBodyValues`) - the prompt.
  Logging the error object would log the visitor's text.
- **The firewall's rate limiting is on Hobby** - one rate-limit rule per project, keyed by IP,
  set in the dashboard or the `vercel firewall` CLI, not `vercel.json`. Counters are per region.

Decided - see [[015 The model, the SDK and the limits behind describe your day]].

## Links

- [AI SDK docs](https://ai-sdk.dev) · [AI SDK docs index (llms.txt)](https://ai-sdk.dev/llms.txt)
- [AI Gateway pricing](https://vercel.com/docs/ai-gateway/pricing) · [Free-tier models](https://vercel.com/ai-gateway/models?freeTier=true) · [Rate limits](https://vercel.com/docs/ai-gateway/rate-limits) · [Budgets](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets)
