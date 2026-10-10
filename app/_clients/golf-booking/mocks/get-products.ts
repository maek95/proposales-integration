import type { Product } from "../get-products";

// The club's group-day products (ticket BE-1 in vault/Plans/Tickets/).
export const products: Product[] = [
  {
    id: "green-fee-18",
    name: "Green fee, 18 holes",
    description: "A full round on the course, including range balls before the start.",
    unit: "per player",
    priceKr: 650,
  },
  {
    id: "golf-cart",
    name: "Golf cart",
    description: "An electric cart for two players, for the whole day.",
    unit: "per cart, all day",
    priceKr: 400,
  },
  {
    id: "clubhouse-lunch",
    name: "Clubhouse lunch",
    description: "Lunch of the day in the clubhouse restaurant, with salad, bread and coffee.",
    unit: "per person",
    priceKr: 185,
  },
];
