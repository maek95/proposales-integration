import { z } from "zod";
import { club } from "@/app/_content/club";
import { formatLongDate } from "@/app/_utils/formatters";
import { attempt } from "@/app/_clients/http";
import { getProducts } from "@/app/_clients/golf-booking";
import { postProposal } from "@/app/_clients/proposales";
import { GroupDayRequestSchema, type FieldErrors, type SendResult } from "./schema";

/**
 * POST /api/group-days/requests - the group-days form's Send. One press of Send becomes one
 * draft proposal in the club's Proposales account, which the club reviews and sends. Everything
 * is checked here, on our server, before anything goes out.
 */
export async function POST(request: Request) {
  // 1. The visitor's input.
  const parsed = GroupDayRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return reply({ ok: false, fieldErrors: firstErrorPerField(parsed.error) }, 400);
  const input = parsed.data;

  // 2. The picks, against our data. The browser only sends which products and how many -
  // every price comes from the golf booking system.
  const products = await attempt(getProducts);
  if (!products.ok) return reply({ ok: false, serviceError: products.message }, 502);

  const catalogue = new Map(products.data.map((product) => [product.id, product]));
  const picks = input.items.filter((item) => item.quantity > 0);
  if (picks.some((item) => !catalogue.has(item.productId))) {
    const items = "Something you picked isn't available any more. Reload the page and pick again.";
    return reply({ ok: false, fieldErrors: { items } }, 400);
  }

  // 3. Only now: the draft in Proposales.
  const created = await attempt(() =>
    postProposal({
      language: "en",
      title: `Golf day for ${input.company}`,
      // The proposal's intro - the customer reads it once the club sends the offer.
      description: `Your golf day at ${club.name} on **${formatLongDate(input.date)}**, as requested through our website.`,
      recipient: { name: input.name, email: input.email, companyName: input.company },
      items: picks.map(({ productId, quantity }) => {
        const product = catalogue.get(productId)!;
        return {
          title: product.name,
          description: `${product.description} Priced ${product.unit}.`,
          quantity,
          unitPriceKr: product.priceKr,
        };
      }),
      // How the club, or a later sync, tells website requests apart in Proposales.
      data: { source: "website", form: "group-days", request_id: crypto.randomUUID(), preferred_date: input.date },
    }),
  );
  // A service we depend on failed - we're a gateway, so 502.
  if (!created.ok) return reply({ ok: false, serviceError: created.message }, 502);

  return reply({ ok: true }, 201);
}

function reply(result: SendResult, status: number) {
  return Response.json(result, { status });
}

function firstErrorPerField(error: z.ZodError<z.infer<typeof GroupDayRequestSchema>>): FieldErrors {
  const { fieldErrors } = z.flattenError(error);
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
  ) as FieldErrors;
}
