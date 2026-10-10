import "server-only";
import { z } from "zod";
import { mockSwitch, requestJson, requireEnv } from "../http";

// Internal to app/_clients/proposales/ - resources import from here, the app imports from index.ts.

const SERVICE = "Proposales";
const BASE_URL = "https://api.proposales.com";

export const mocks = mockSwitch(SERVICE, "PROPOSALES_MOCK");

/** Authenticated request to Proposales, validated against `schema`. */
export function proposales<S extends z.ZodType>(path: string, schema: S, init?: RequestInit) {
  return requestJson(SERVICE, `${BASE_URL}${path}`, schema, () => ({
    ...init,
    headers: {
      Authorization: `Bearer ${requireEnv(SERVICE, "PROPOSALES_API_KEY")}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  }));
}

/** Where our drafts go: the club's company, and the template they're made from. */
export type Account = { companyId: number; templateUuid?: string };

/**
 * The account, set per deployment and read at request time - `PROPOSALES_COMPANY_ID` (the id
 * from GET /v3/companies) and optionally `PROPOSALES_TEMPLATE_UUID`. Mocked, a made-up one.
 */
export function account(): Account {
  if (mocks.active()) return { companyId: 1001, templateUuid: "0b9d5c3e-2f4a-4c6b-8e1d-7a9f3b5c2d10" };
  return {
    companyId: Number(requireEnv(SERVICE, "PROPOSALES_COMPANY_ID")),
    templateUuid: process.env.PROPOSALES_TEMPLATE_UUID || undefined,
  };
}

/** Proposales wraps response bodies in `{ data: ... }`. */
export const envelope = <S extends z.ZodType>(schema: S) => z.object({ data: schema });
