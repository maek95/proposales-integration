// The group-day request's limits - shared by the form (the stepper stops here) and the route
// (it rejects more), so the two can't disagree.

/** The most of one product - green fees, carts, lunches - a single request can ask for. */
export const MAX_QUANTITY_PER_PRODUCT = 144;
