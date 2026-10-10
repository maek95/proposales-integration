import type { CreatedProposal } from "../post-proposal";

// Shape from the spec's response to POST /v3/proposals (9 October 2026), not a real response -
// a create can't be observed without writing to the account. BE-3's first real Send checks it against a real one.
export const createdProposal: CreatedProposal = {
  uuid: "6f2c1a9e-4b7d-4e2a-9c1f-0a3b5d7e9f11",
  url: "https://example.com/proposals/6f2c1a9e-4b7d-4e2a-9c1f-0a3b5d7e9f11",
};
