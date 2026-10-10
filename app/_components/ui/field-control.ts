/** The look of a form control - an input, a select, a textarea - with or without an error. The
 * control sets its own height. `scroll-my-40` doesn't scroll anything: when the browser scrolls
 * to the field itself - `required` taking Send to the first one missing - it stops with 160 px to
 * spare instead of leaving the field at the screen's edge. */
export default function fieldControl(error?: string) {
  return `scroll-my-40 rounded-xl bg-white px-3.5 text-base font-normal text-ink outline-none focus-visible:ring-2 focus-visible:ring-fairway/40 ${
    error ? "border-2 border-field-error" : "border-[1.5px] border-line focus-visible:border-fairway"
  }`;
}
