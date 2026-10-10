# BE-5 Prices and quantities in the draft

**Status:** Todo
**Blocked by:** [[BE-3 Send to Proposales through our API, code organised by what it does|BE-3]].
**Done when:** a real Send creates a draft where every line shows its quantity and its price,
with VAT as intended, and what Proposales expects is recorded in the [[Proposales overview]].

## What

The first real draft (9 October 2026) had the right lines, but no prices on any of them, and a
quantity only on the green fee. We send each line's price in
`unit_value_without_discount_with_tax`, in öre, and no VAT rate - a product block has no field
for one.

Lead: the spec's blocks also carry `package_split` rows, each with a type (`food`, `other`, …),
values with and without tax, and a `vat` rate. The editor may take a line's price from there.

Steps:

1. In the draft, price one line by hand in the editor (the ⚙ on the block) - note what the
   settings offer: price with or without VAT, the rate, showing the quantity.
2. Fetch the draft: `GET /v3/proposal-search?recipient_email=<the email used>` for its uuid, then
   `GET /v3/proposals/<uuid>`. Compare the hand-priced block with ours.
3. Change `postProposal()` in `app/_clients/proposales/post-proposal.ts` to send what Proposales
   uses, and its request schema with it. Green fees and lunch may carry different VAT rates -
   the rate per product then comes from our product data.
4. One real Send to confirm, with test details; delete the test drafts afterwards.

Also open from the first draft: whether the template link copies the template's design and
text, and what the returned `url` opens.
