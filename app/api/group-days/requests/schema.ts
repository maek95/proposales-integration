import { z } from "zod";
import { todayInSweden } from "@/app/_utils/formatters";
import { MAX_QUANTITY_PER_PRODUCT } from "./limits";

// The contract of POST /api/group-days/requests (route.ts, next to this file): what the form
// sends and what it gets back. Shared by the form (types) and the route (validation) -
// the route never trusts the browser's copy.

export const GroupDayRequestSchema = z.object({
  date: z.iso
    .date({ error: "Pick a date for the day." })
    .refine((date) => date >= todayInSweden(), { error: "Pick a date from today onwards." }),
  company: z.string().trim().min(1, { error: "Enter the company or group name." }).max(200),
  name: z.string().trim().min(1, { error: "Enter your name." }).max(200),
  email: z.email({ error: "Enter an email address, like name@company.se" }),
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().min(0).max(MAX_QUANTITY_PER_PRODUCT),
      }),
    )
    .refine((items) => items.some((item) => item.quantity > 0), {
      error: "Pick at least one thing for the day.",
    }),
});
export type GroupDayRequest = z.infer<typeof GroupDayRequestSchema>;

export type FieldErrors = Partial<Record<keyof GroupDayRequest, string>>;

export type SendResult =
  | { ok: true }
  | { ok: false; fieldErrors: FieldErrors }
  /** A service the request depends on failed - the message is safe to show. */
  | { ok: false; serviceError: string };
