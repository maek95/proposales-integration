// Small pure helpers for dates, money and counts - no calls, no state, safe in the browser and on the
// server.

/** Whole kronor, Swedish style: 10 400 kr. */
export function formatKr(amount: number) {
  return `${amount.toLocaleString("sv-SE")} kr`;
}

/** 1 → "1 person", 16 → "16 people". */
export function formatPeople(count: number) {
  return `${count} ${count === 1 ? "person" : "people"}`;
}

/** "2027-06-12" → "Saturday 12 June 2027". */
export function formatLongDate(isoDate: string) {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Today in Sweden, as YYYY-MM-DD - the club's calendar, not the server's. */
export function todayInSweden() {
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Stockholm" });
}
