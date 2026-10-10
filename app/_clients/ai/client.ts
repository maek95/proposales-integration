import "server-only";
import { connection } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { AISDKError, APICallError, generateText, NoObjectGeneratedError, NoOutputGeneratedError, Output, RetryError } from "ai";
import { GatewayAuthenticationError, GatewayError, type GatewayModelId } from "@ai-sdk/gateway";
import type { z } from "zod";
import { ExternalApiError, fail, mockSwitch } from "../http";

// Internal to app/_clients/ai/ - calls import from here, the app imports from index.ts.
//
// The model, through the Vercel AI Gateway (vault/Decisions/015). The AI SDK makes the request,
// so this file does what requestJson does for the other services: a timeout, the schema check,
// and every failure as one logged ExternalApiError. Auth: AI_GATEWAY_API_KEY locally; on Vercel
// the deployment's OIDC token, with nothing to set.

const SERVICE = "Our assistant";

type Tier = {
  model: GatewayModelId;
  /** Whether the model can think before answering - and so whether `thinking` changes anything. */
  reasons: boolean;
};

/**
 * The models, by tier - named by what a call needs, not by the call, so a new call picks an
 * existing tier rather than a model of its own. Both on the Gateway's free tier (decision 015).
 */
const tiers = {
  /** Matching words to a list, extracting: follows a schema strictly, answers in a second or two. */
  low: { model: "openai/gpt-4.1-mini", reasons: false },
  /** Judgment the low tier gets wrong. No call uses it yet. */
  high: { model: "openai/gpt-5-mini", reasons: true },
} satisfies Record<string, Tier>;

export type ModelTier = keyof typeof tiers;

/**
 * Whether the model thinks before answering. Every call states it - never a default, because
 * thinking tokens bill at the output rate and add seconds the visitor waits.
 */
export type Thinking = "on" | "off";

const TIMEOUT_MS = 20_000;

export const mocks = mockSwitch(SERVICE, "AI_MOCK");

/**
 * One call to the model, answered as an object that matches `schema` - or an ExternalApiError.
 * No retries: one press, one call (`.claude/rules/external-apis.md`).
 */
export async function askModel<S extends z.ZodType>({
  tier,
  thinking,
  instructions,
  prompt,
  schema,
  maxOutputTokens,
}: {
  tier: ModelTier;
  thinking: Thinking;
  instructions: string;
  prompt: string;
  schema: S;
  maxOutputTokens: number;
}): Promise<z.infer<S>> {
  await connection();
  const { model } = tiers[tier];
  const providerOptions = thinkingOptions(tiers[tier], thinking);
  const signal = AbortSignal.timeout(TIMEOUT_MS);
  try {
    const { output } = await generateText({
      model,
      providerOptions,
      system: instructions,
      prompt,
      output: Output.object<z.infer<S>>({ schema }),
      maxOutputTokens,
      maxRetries: 0,
      abortSignal: signal,
    });
    return output;
  } catch (err) {
    unstable_rethrow(err);
    throw fail(toApiError(err, signal, model));
  }
}

// Thinking is set per provider - the SDK has no common switch for it. A model that can't think
// has nothing to turn off; asking it to think is a mistake in the call, so it fails loudly.
function thinkingOptions({ model, reasons }: Tier, thinking: Thinking) {
  if (!reasons) {
    if (thinking === "on") throw new Error(`${model} can't think - use a tier that reasons`);
    return undefined;
  }
  const provider = model.split("/")[0];
  switch (provider) {
    case "openai":
      // OpenAI's reasoning models can't stop thinking entirely - "minimal" is the least.
      return { openai: { reasoningEffort: thinking === "on" ? "medium" : "minimal" } };
    default:
      throw new Error(`No thinking setting for ${provider} yet - add one here`);
  }
}

// The SDK's errors carry the request - the prompt, and so the visitor's text - so only their
// name and message are logged, never the error itself.
function toApiError(thrown: unknown, signal: AbortSignal, model: string): ExternalApiError {
  const err = RetryError.isInstance(thrown) ? thrown.lastError : thrown;
  if (signal.aborted) return new ExternalApiError(SERVICE, "timeout", `${model}: no answer in ${TIMEOUT_MS} ms`);
  // No key and no OIDC token. In production builds the SDK re-wraps this as a plain AISDKError
  // named "GatewayError" (node_modules/ai, wrapGatewayError).
  const unauthenticated =
    GatewayAuthenticationError.isInstance(err) || (AISDKError.isInstance(err) && err.name === "GatewayError");
  if (unauthenticated) {
    return new ExternalApiError(SERVICE, "not-configured", `no AI_GATEWAY_API_KEY or Vercel OIDC token: ${err.message}`);
  }
  if (GatewayError.isInstance(err)) {
    return new ExternalApiError(SERVICE, "rejected", `${model}: ${err.name}: ${err.message}`, err.statusCode);
  }
  if (APICallError.isInstance(err)) {
    return err.statusCode
      ? new ExternalApiError(SERVICE, "rejected", `${model}: ${err.message}`, err.statusCode)
      : new ExternalApiError(SERVICE, "unreachable", `${model}: ${err.message}`);
  }
  if (NoObjectGeneratedError.isInstance(err) || NoOutputGeneratedError.isInstance(err)) {
    return new ExternalApiError(SERVICE, "invalid-response", `${model}: the answer didn't match the schema (${err.name})`);
  }
  // Anything else is a bug on our side - attempt() logs it as one.
  throw thrown;
}
