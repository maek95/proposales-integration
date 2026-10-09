"use server";

import { z } from "zod";
import { GroupDayRequestSchema, type FieldErrors, type SendResult } from "./request";

/** The group-days form's submit: one call per press of Send. Never throws to the page. */
export async function sendGroupDayRequest(input: unknown): Promise<SendResult> {
  const parsed = GroupDayRequestSchema.safeParse(input);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    const firstOfEach = Object.fromEntries(
      Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
    ) as FieldErrors;
    return { ok: false, fieldErrors: firstOfEach };
  }

  // Not wired up yet - nothing is sent. BE-3 (vault/Plans/First version build.md) prices the
  // picks with the golf booking system's products and creates the draft with one
  // createProposal call, returning { ok: false, serviceError } when Proposales fails.
  return { ok: true };
}
