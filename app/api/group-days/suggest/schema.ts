import { z } from "zod";
import { MAX_DESCRIPTION_LENGTH, MAX_HEADCOUNT } from "../limits";

// The contract of POST /api/group-days/suggest (route.ts, next to this file): "Fill in the form"
// on the group-days form. Shared by the form (types) and the route (validation).

const headcountError = { error: "Choose how many you are first." };

export const SuggestRequestSchema = z.object({
  headcount: z.number(headcountError).int(headcountError).min(1, headcountError).max(MAX_HEADCOUNT, headcountError),
  description: z
    .string({ error: "Describe your day in a sentence or two." })
    .trim()
    .min(3, { error: "Describe your day in a sentence or two." })
    .max(MAX_DESCRIPTION_LENGTH, { error: `Keep it to ${MAX_DESCRIPTION_LENGTH} characters or fewer.` }),
});
export type SuggestRequest = z.infer<typeof SuggestRequestSchema>;

export type SuggestFieldErrors = Partial<Record<keyof SuggestRequest, string>>;

/** A suggestion for the form's steppers - ids and quantities only, never prices. */
export type Suggestion = {
  items: { productId: string; quantity: number }[];
  /** What the visitor asked for that the model didn't match to a product - which may be the club
   * not selling it, or the model missing it. A few words each, for the visitor to check. */
  unmatched: string[];
};

export type SuggestResult =
  | ({ ok: true } & Suggestion)
  | { ok: false; fieldErrors: SuggestFieldErrors }
  /** The assistant or the catalogue failed, or the visitor asked too often - safe to show. */
  | { ok: false; serviceError: string };
