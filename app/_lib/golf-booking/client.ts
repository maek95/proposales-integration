import "server-only";
import { connection } from "next/server";
import { mockSwitch } from "../external";

// Internal to app/_lib/golf-booking/ - resources import from here, the app imports from index.ts.
//
// The club's golf booking system owns its products and prices. There's no real system behind
// this client: its fixtures are the data (vault/Decisions/011). Swapping in a real system means
// replacing `serve` with requestJson calls - the rest of the app doesn't change.

const SERVICE = "The golf booking system";

const mocks = mockSwitch(SERVICE, "GOLF_BOOKING_MOCK");

/** Serve a fixture as if it came from the system. `GOLF_BOOKING_MOCK=error` makes it fail. */
export async function serve<T>(fixture: T): Promise<T> {
  const mocked = mocks.serve(fixture);
  if (mocked) return mocked;
  await connection(); // request time, like a real call
  return fixture;
}
