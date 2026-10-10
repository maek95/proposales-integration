import { z } from "zod";
import { club } from "@/app/_content/club";
import { attempt } from "@/app/_clients/http";
import { getProducts } from "@/app/_clients/golf-booking";
import { postSuggestedPicks } from "@/app/_clients/ai";
import { MAX_QUANTITY_PER_PRODUCT } from "../limits";
import { SuggestRequestSchema, type SuggestFieldErrors, type SuggestResult } from "./schema";

/**
 * POST /api/group-days/suggest - "Fill in the form" on the group-days form. The visitor's
 * description and the catalogue go to the model; ids and quantities come back for the steppers.
 * Nothing reaches Proposales from here - the visitor checks the steppers and presses Send.
 *
 * How often one visitor can call it is the Vercel firewall's rate-limit rule on /api/group-days/,
 * which answers 429 before this runs (vault/Decisions/015). The Gateway's free tier caps the rest:
 * past it, a 429, never a bill.
 */
export async function POST(request: Request) {
  // 1. The visitor's input. The description is never logged.
  const parsed = SuggestRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return reply({ ok: false, fieldErrors: firstErrorPerField(parsed.error) }, 400);
  const { headcount, description } = parsed.data;

  // 2. Our catalogue - the only products the model can pick from.
  const products = await attempt(getProducts);
  if (!products.ok) return reply({ ok: false, serviceError: products.message }, 502);
  if (products.data.length === 0) return reply({ ok: true, items: [], unmatched: [] }, 200);

  // 3. The model.
  const picks = await attempt(() =>
    postSuggestedPicks({
      clubName: club.name,
      headcount,
      description,
      products: products.data,
      maxQuantity: MAX_QUANTITY_PER_PRODUCT,
    }),
  );
  if (!picks.ok) return reply({ ok: false, serviceError: picks.message }, 502);

  // 4. The answer. postSuggestedPicks already held it to a schema built from this catalogue -
  // our ids only, quantities up to the limit - and fails if it doesn't match. What's left: a
  // product named twice counts once (the last wins).
  const quantities = new Map(picks.data.items.map((item) => [item.productId, item.quantity]));
  const items = [...quantities].map(([productId, quantity]) => ({ productId, quantity }));

  return reply({ ok: true, items, unmatched: picks.data.unmatched }, 200);
}

function reply(result: SuggestResult, status: number) {
  return Response.json(result, { status });
}

function firstErrorPerField(error: z.ZodError<z.infer<typeof SuggestRequestSchema>>): SuggestFieldErrors {
  const { fieldErrors } = z.flattenError(error);
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
  ) as SuggestFieldErrors;
}
