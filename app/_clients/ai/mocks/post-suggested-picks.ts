import type { SuggestedPicks } from "../post-suggested-picks";

// What AI_MOCK=true answers, whatever was written - roughly what the placeholder ("Half of us have
// never played...") gets: half the group new to golf, everyone at lunch. Sized to the headcount,
// so it stays within the per-person limit the model's answer is held to. Ids from the golf
// booking system's fixture. One wish goes unmatched, so the form's "we couldn't place these"
// shows.
export function suggestedPicks(headcount: number): SuggestedPicks {
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
    unmatched: ["A photographer for the group photo"],
  };
}
