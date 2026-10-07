import "server-only";
import { z } from "zod";
import { mockSwitch, requestJson, requireEnv } from "../external";

// Internal to app/_lib/proposales/ - resources import from here, the app imports from index.ts.

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

/** Proposales wraps response bodies in `{ data: ... }`. */
export const envelope = <S extends z.ZodType>(schema: S) => z.object({ data: schema });
