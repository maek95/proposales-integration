import "server-only";
import { z } from "zod";
import { account, mocks, proposales, type Account } from "./client";
import { createdProposal as postedProposalMock } from "./mocks/post-proposal";

// Proposales' format stays in this file: callers describe a proposal in our own terms (whole
// kronor, one name field), and postProposal builds the request the API expects.

/** A new draft proposal, in our own terms. Which company it goes to is the account's business. */
export type NewProposal = {
  /** Proposales' language code, e.g. "en". */
  language: string;
  title: string;
  /** Markdown. */
  description: string;
  recipient: { name: string; email: string; companyName: string };
  items: NewProposalItem[];
  /** Our own metadata on the proposal - how drafts from the website are found again. */
  data: Record<string, string>;
};

export type NewProposalItem = {
  title: string;
  description: string;
  quantity: number;
  /** Including VAT, no discount, in whole kronor. */
  unitPriceKr: number;
};

// What we send - checked before every call, mocked or not, so a mistake in building it fails
// here rather than as a 400 from Proposales. Only the fields we set.
const CreateProposalBodySchema = z.object({
  company_id: z.number().int(),
  language: z.string().min(1),
  title_md: z.string(),
  description_md: z.string(),
  recipient: z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.email(),
    company_name: z.string(),
  }),
  blocks: z.array(
    z.object({
      type: z.literal("product-block"),
      title: z.string(),
      description: z.string(),
      quantity: z.number().int().positive(),
      currency: z.string(),
      /** Öre. Our prices include VAT and have no discount, so this is the field. */
      unit_value_without_discount_with_tax: z.number().int().nonnegative(),
    }),
  ),
  tracking: z.object({ created_from_template: z.uuid() }).optional(),
  data: z.record(z.string(), z.string()),
});
type CreateProposalBody = z.infer<typeof CreateProposalBodySchema>;

export const CreatedProposalSchema = z.object({
  uuid: z.uuid(),
  /** A link to the draft in Proposales. */
  url: z.url(),
});
export type CreatedProposal = z.infer<typeof CreatedProposalSchema>;

/** POST /v3/proposals - creates a draft; someone at the club sends it from Proposales. */
export async function postProposal(proposal: NewProposal): Promise<CreatedProposal> {
  const body = CreateProposalBodySchema.parse(toRequestBody(proposal, account()));

  const mocked = mocks.serve(postedProposalMock);
  if (mocked) return mocked;

  const { proposal: created } = await proposales(
    "/v3/proposals",
    z.object({ proposal: CreatedProposalSchema }),
    { method: "POST", body: JSON.stringify(body) },
  );
  return created;
}

function toRequestBody(proposal: NewProposal, { companyId, templateUuid }: Account): CreateProposalBody {
  const [firstName, ...rest] = proposal.recipient.name.trim().split(/\s+/);
  return {
    company_id: companyId,
    language: proposal.language,
    title_md: proposal.title,
    description_md: proposal.description,
    recipient: {
      first_name: firstName,
      last_name: rest.join(" "),
      email: proposal.recipient.email,
      company_name: proposal.recipient.companyName,
    },
    blocks: proposal.items.map((item) => ({
      type: "product-block",
      title: item.title,
      description: item.description,
      quantity: item.quantity,
      currency: "SEK",
      unit_value_without_discount_with_tax: Math.round(item.unitPriceKr * 100),
    })),
    tracking: templateUuid ? { created_from_template: templateUuid } : undefined,
    data: proposal.data,
  };
}
