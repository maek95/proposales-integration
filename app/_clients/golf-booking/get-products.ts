import "server-only";
import { z } from "zod";
import { mocks, noBookingSystem } from "./client";
import { products as productsMock } from "./mocks/get-products";

// What the club sells for group days. Prices in whole kronor, VAT included - the conversion to
// öre happens at the Proposales edge.
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  /** What one of it is: "per player", "per cart, all day". */
  unit: z.string(),
  priceKr: z.number().int().nonnegative(),
});
export type Product = z.infer<typeof ProductSchema>;

/** The products a group day can be put together from. */
export async function getProducts(): Promise<Product[]> {
  const mocked = mocks.serve(productsMock);
  if (mocked) return mocked;

  return noBookingSystem();
}
