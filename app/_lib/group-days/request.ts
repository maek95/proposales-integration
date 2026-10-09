import { z } from "zod";

// What the group-days form sends. Shared by the form (types, limits) and the Server Action
// (validation) - the server never trusts the browser's copy.

/** Most of one product a single request can ask for. */
export const MAX_QUANTITY = 144;

/** Today in Sweden, as YYYY-MM-DD - the club's calendar, not the server's. */
function todayInSweden() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Stockholm" });
}

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
        quantity: z.number().int().min(0).max(MAX_QUANTITY),
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
