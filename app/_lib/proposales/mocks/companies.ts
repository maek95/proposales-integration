import type { Company } from "../companies";

// Shape taken from a real GET /v3/companies response (6 October 2026), values made up.
export const companies: Company[] = [
  { id: 1001, name: "Northwind Events AB" },
  { id: 1002, name: "Fjällstugan Hotel & Conference" },
];
