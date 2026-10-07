import "server-only";
import { z } from "zod";
import { envelope, mocks, proposales } from "./client";
import { companies as companiesMock } from "./mocks/companies";

// Only the fields we use - zod strips the rest, including the company's inbox token.
export const CompanySchema = z.object({
  id: z.number(),
  name: z.string(),
});
export type Company = z.infer<typeof CompanySchema>;

/** GET /v3/companies - the companies the API key's user belongs to. */
export async function listCompanies(): Promise<Company[]> {
  const mocked = mocks.serve(companiesMock);
  if (mocked) return mocked;

  const { data } = await proposales("/v3/companies", envelope(z.array(CompanySchema)));
  return data;
}
