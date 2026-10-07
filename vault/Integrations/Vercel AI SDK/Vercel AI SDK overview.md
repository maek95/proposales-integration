# Vercel AI SDK overview

Being evaluated - the brief names an LLM or the Vercel AI SDK as the bonus (see [[The brief]]).
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
- It would follow the same pattern as Proposales: `app/_lib/ai/` with a server-only client and an
  `AI_MOCK` switch, so UI work doesn't spend credits.
- Structured output uses zod schemas, which the app already uses for validating API responses
  (see [[004 One shared layer for external APIs]]).

Not decided yet - see [[Open questions]].

## Links

- [AI SDK docs](https://ai-sdk.dev) · [AI SDK docs index (llms.txt)](https://ai-sdk.dev/llms.txt)
- [AI Gateway pricing](https://vercel.com/docs/ai-gateway/pricing) · [Free-tier models](https://vercel.com/ai-gateway/models?freeTier=true) · [Rate limits](https://vercel.com/docs/ai-gateway/rate-limits) · [Budgets](https://vercel.com/docs/ai-gateway/observability-and-spend/budgets)
