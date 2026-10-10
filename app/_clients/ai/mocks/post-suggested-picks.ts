import type { ModelAnswer } from "../post-suggested-picks";

// What AI_MOCK=true answers, whatever was written - roughly what the placeholder ("Half of us have
// never played...") gets: half the group new to golf, everyone at lunch. Sized to the headcount,
// so it stays within the per-person limit the model's answer is held to. Ids from the golf
// booking system's fixture. In the model's own shape, so it goes through the same check and the
// same cut: of the two unmatched wishes, the general one is dropped and the photographer shows
// under "Not added to the form".
export function suggestedPicks(headcount: number): ModelAnswer {
  const beginners = Math.ceil(headcount / 2);
  const players = headcount - beginners;
  return {
    items: [
      { productId: "green-fee-9", quantity: beginners },
      { productId: "beginner-clinic", quantity: Math.ceil(beginners / 8) }, // per group of up to 8
      { productId: "rental-clubs", quantity: beginners },
      ...(players > 0 ? [{ productId: "green-fee-18", quantity: players }] : []),
      { productId: "clubhouse-lunch", quantity: headcount },
      { productId: "draught-beer", quantity: headcount },
      { productId: "candy-bag", quantity: headcount },
      { productId: "longest-drive-markers", quantity: 1 },
      { productId: "prize-package", quantity: 1 },
    ],
    unmatched: [
      { text: "A photographer for the group photo", kind: "something to order" },
      { text: "A day to remember", kind: "general wish" },
    ],
  };
}
