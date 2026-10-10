import "server-only";
import { connection } from "next/server";
import { mockSwitch, notConnected } from "../http";

// Internal to app/_clients/golf-booking/ - resources import from here, the app imports from index.ts.
//
// The club's golf booking system owns its products and prices. No real one is connected yet
// (vault/Decisions/011): the fixtures in mocks/ are served only with GOLF_BOOKING_MOCK=true, and
// without it every call fails as not configured. Connecting a real system means writing
// a request function with requestJson, like `proposales()`, in place of `noBookingSystem`.

const SERVICE = "The golf booking system";

export const mocks = mockSwitch(SERVICE, "GOLF_BOOKING_MOCK");

/** No booking system API is connected: fails as not configured, logged once. */
export async function noBookingSystem(): Promise<never> {
  await connection();
  throw notConnected(SERVICE);
}
