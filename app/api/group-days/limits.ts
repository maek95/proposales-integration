// The group-days limits - shared by the form (it stops here) and the routes (they reject more),
// so the two can't disagree.

/** The most of one product - green fees, carts, lunches - a single request can ask for. */
export const MAX_QUANTITY_PER_PRODUCT = 144;

/** The largest group a request can be for - as many as the most of one product, so everyone can
 * have a green fee. */
export const MAX_HEADCOUNT = MAX_QUANTITY_PER_PRODUCT;

/** The longest "describe your day" the assistant reads - a few sentences, and a cap on what each
 * call costs. */
export const MAX_DESCRIPTION_LENGTH = 500;
