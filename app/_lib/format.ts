/** Whole kronor, Swedish style: 10 400 kr. */
export function formatKr(amount: number) {
  return `${amount.toLocaleString("sv-SE")} kr`;
}
