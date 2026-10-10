/** The look of a form control - an input, a select, a textarea - with or without an error. The
 * control sets its own height. */
export default function fieldControl(error?: string) {
  return `rounded-xl bg-white px-3.5 text-base font-normal text-ink outline-none focus-visible:ring-2 focus-visible:ring-fairway/40 ${
    error ? "border-2 border-field-error" : "border-[1.5px] border-line focus-visible:border-fairway"
  }`;
}
