// The group-day request's limits - shared by the form (the steppers and the headcount select stop
// here) and the route (it rejects more), so the two can't disagree.

/** The most of one product - green fees, carts, lunches - a single request can ask for. */
export const MAX_QUANTITY_PER_PRODUCT = 144;

/** The largest group a request can be for - as many as the most of one product, so everyone can
 * have a green fee. */
export const MAX_HEADCOUNT = MAX_QUANTITY_PER_PRODUCT;
