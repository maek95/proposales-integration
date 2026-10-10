/** The classes of a form control - an input or a select - with or without an error. */
export default function fieldControl(error?: string) {
  return `h-12 rounded-xl bg-white px-3.5 text-base font-normal text-ink outline-none focus-visible:ring-2 focus-visible:ring-fairway/40 ${
    error ? "border-2 border-field-error" : "border-[1.5px] border-line focus-visible:border-fairway"
  }`;
}
