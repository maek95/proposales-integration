# Proposales overview

How an app can integrate with [Proposales](https://proposales.com), and what there is to work
with. Written 6 October 2026.

Deliberately high-level. For exact endpoints, fields, parameters and limits, use the live
[docs](https://docs.proposales.com) and [OpenAPI spec](https://docs.proposales.com/openapi.json) -
they change.

## Who it's for - and what our key reaches

Checked 6 October 2026. Proposales is software *for* venues - hotels, conference centres, event
venues - to answer inquiries with proposals and get them signed. It isn't a marketplace: there
is no catalogue of hotels to browse or book through the API.

- **The API key reaches only our own account** - our companies, templates, content library and
  proposals. With the API, *we are the venue*.
- **No bookings.** Proposales ends at the signed proposal; reservations happen in the venue's
  own booking system, through its integrations.
- **The only way to reach another venue** is its public inbox: anyone with a company's inbox
  token can send it a request for proposal, no key needed. But the API only gives out our own
  token, the request returns nothing but an id, and following what the venue does with it would
  need *their* key. And we don't send demo requests to real venues.

**A proposal is a venue's booking offer** - rooms, meeting spaces, catering and packages for an
event or group stay. The content library holds those products, e-signing is the customer
accepting the offer, and the integrations push accepted bookings into the venue's booking
system. Using it as a generic quote or contract tool works against the product.

So an app fits when it stays in that domain: something about **planning an event, a group trip
or a stay**, whose booking step asks a venue for a proposal. A venue joins such an app by giving
it their inbox token - the same way they embed the inquiry widget on their own site. In the demo,
our account is the venue, set up with believable rooms, meeting rooms and packages.

*Corrected 6 October 2026:* this section first said any seller - a band, a caterer, a freelancer -
fits, with Proposales as a generic back office for quotes and contracts. The user pointed out
that Proposales is built for venue bookings, not arbitrary contracts.

## What fits Proposales - and what doesn't

Reasoned 6 October 2026, from what the platform is built for. A purchase suits Proposales when
it is:

- **A group or an event**, not one person.
- **A package of several items** put together for this customer.
- **An offer the customer accepts and signs**, often after some back-and-forth - not an instant
  checkout.
- **Higher value**, worth a proper offer.

It doesn't suit **one standard unit, booked instantly** - a tee time, a table for two, one hotel
night. Those need live availability and checkout, which Proposales doesn't offer through its API.

"Venue" doesn't have to mean rooms: content items are just products, so green fees, cart hire
or a tournament setup work as well as a hotel room. Rooms mainly matter for the booking-system
integrations, which we don't use. Example - a golf club: individual tee times don't fit; a
company golf day (green fees, shotgun tournament, carts, lunch, prize dinner, lounge) fits
exactly.

## A venue's flow through Proposales

Written 6 October 2026, from their public site and the API spec. For a venue, Proposales is the
sales pipeline from "someone asks" to "signed booking":

1. **An inquiry arrives** - email (the Outlook add-in), the website widget or the inbox: a
   request for proposal.
2. **The venue builds an offer** from a template and its content library - rooms, meeting
   rooms, packages - with quantities, prices and discounts.
3. **The customer gets a hosted, interactive offer page** - they can tick optional extras and
   adjust quantities where the venue allows it (`optional`, `quantity_editable` on blocks).
4. **They accept and e-sign** - it becomes the contract; a deposit can be collected.
5. **It flows on** - the integrations put the booking into the venue's booking system and update
   the CRM. Negotiation means a new version.
6. **The venue learns from it** - Insights on opens, engagement and conversion.

**For our golf club** (see [[006 We're a golf club]]): individuals book tee times in the club's
ordinary booking system - standard, instant. Proposales handles what doesn't fit through that
door: a company asking for 50 players over two months, dinners, and the whole course and
clubhouse on the final day. The request arrives, the club answers with a proposal built from its
products (green fees ×50, carts, dinners, "exclusive course, final day"), the company signs, and
*then* the club blocks the times in its own booking system. Proposales doesn't hold tee times -
it's the offer and agreement layer. Hotels get that last step through the booking-system
integrations; no golf booking system is listed, so a club would do it by hand or through Zapier
(our reading of their integrations page, 6 October 2026).

**What that means for our app:** Proposales is *the offer and the signature*, the way Stripe is
the checkout. Our app never builds an offer page, extras picking, e-signing, contracts, PDFs or
versioning. It sits around the pipeline - before it (creating the inquiry or the draft offer,
where an LLM fits) and after it (reading the status back and showing it in our own UI).

## What we build, and what Proposales does

Reasoned 6 October 2026. Proposales offers no embeddable "pick products and book" interface
through its API - its customer-facing interfaces are its own inquiry widget and the offer page.
So an app that lets a customer put together a package builds that interface itself. The split is
like a custom storefront on Shopify:

| | Who |
|---|---|
| The catalogue - products, prices, units | Our data (see [[007 Our catalogue lives with us]]) |
| Picking products, quantities and dates | Our app, against our data |
| Turning the selection into an offer | Our app → Proposales: a draft proposal, each block carrying title, description, quantity and price inline |
| Offer page, extras, e-signature, contract, PDF, deposit, versions | Proposales |
| Status afterwards | Proposales → our app |

A block doesn't have to come from the content library - the proposal-block docs say so,
"possible only via the API" - so the library is optional for us.

*Changed 6 October 2026:* this table first had the catalogue in the Proposales dashboard, with our
app reading it through the API. But content comes without prices through the API (on read as well
as create), and the user pointed out the products are ours - so the catalogue moved to our data.

One catch:

- **The Buyer Portal** ("all-in-one buying journey for Groups & MICE") may already be this kind of
  configurator. No details on the public site - look in the logged-in app before building
  something similar.

## Ways to plug in

| Surface | Direction | Needs | Works locally? |
|---|---|---|---|
| **REST API (read)** | We pull from Proposales | API key | Yes |
| **REST API (write)** | We push to Proposales | API key, care - it's a real account | Yes |
| **Inbox (RFP intake)** | Anyone creates a proposal request | A company's inbox token, no API key | Yes |
| **Webhooks** | Proposales calls us on events | Public URL + connection powerup | Only via a tunnel |
| **Widgets** | Our UI inside the Proposales editor | Public URL + connection powerup | Only via a tunnel |

The connection powerup is enabled by Proposales customer success - see
[Connections](https://docs.proposales.com/connections). Once deployed on Vercel the app has a
public URL, so webhooks and widgets become reachable without a tunnel - but the powerup is
still needed, and it depends on someone else's response time.

## What there is to work with

- **Companies** - the accounts a user belongs to, and their proposal **templates**.
- **Proposals** - offers sent to a recipient. They have a lifecycle status (draft → sent →
  accepted / rejected / expired …), versions, a value, a recipient, e-signatures and a PDF.
- **Blocks** - the products and videos placed in a proposal.
- **Content library** - the reusable products and videos that blocks come from.
- **Custom `data`** - free-form key/values on a proposal that we can write and search by. The
  main hook for storing our own metadata.
- **RFPs** - inbound requests that start a proposal.

## What the platform already does

Checked 6 October 2026 against [proposales.com](https://proposales.com),
[/platform](https://proposales.com/platform) and [/connect](https://proposales.com/connect) - the
public site, not the logged-in app. What we build should add to this, not repeat it (see
[[Proposales integration ideas]]).

- **Proposals** - eProposals with branding, versions, e-signatures and contracts, a PDF, and
  automatic translation. Lists of drafts and sent proposals in the app.
- **Insights** - reports on proposal interactions, client behaviour and conversion.
- **Inquiry side, with AI** - an AI-powered Inbox Widget for websites with "agentic inquiry
  handling" (understands requirements, qualifies, checks availability), and an Outlook add-in
  that turns emails into structured RFPs.
- **Buyer Portal** - a buying journey for groups and MICE.
- **Integrations** - PMS (OPERA Cloud, Mews, Infor, Shiji, Apaleo, Amadeus Delphi, D-EDGE,
  Event Temple, Thynk), CRM (Salesforce, HubSpot, SuperOffice, Dynamics 365), payments (Stripe,
  Planet, Adyen), Zapier, virtual tours, Google Analytics and Tag Manager. No native Slack,
  Teams or calendar integration.
- **Showing proposals elsewhere** - no embed feature in the developer docs. Proposals reach
  other systems through their hosted link and PDF, the native integrations, Zapier, and the
  data widget (which works the other way: external data shown inside Proposales).
- The [help center](https://help.proposales.com/en/) has categories for Settings, Content,
  Proposals, Inbox, Insights, FAQ and Integrations (25 articles) - it renders client-side, so
  open it in a browser.

## Limits

- **The API creates proposals, it doesn't send them.** Checked 6 October 2026: a created
  proposal is a draft - recipient, title, description, priced blocks and custom `data` can all
  be set, but sending (and so the e-signature) happens when someone clicks Send in Proposales.
  An app can follow the status afterwards with get or search. Creating one returns its `uuid`
  and a `url` (checked 9 October 2026, from the spec) - which view the `url` opens is still to
  check on a real draft.
- **Inbox requests can be marked as tests** (`is_test`), so demo RFPs stay distinguishable.
- **A request for proposal carries no product lines.** Checked 6 October 2026: an inbox request
  has contact fields, dates and a message, and keeps unknown fields as metadata - but no blocks,
  so the venue's staff still build the offer by hand. Only a draft proposal, created with the
  venue's API key, carries product lines with prices.
- **Content has no price through the API.** Checked 6 October 2026: creating content takes a
  title, a description and images by public URL. Prices are set on each proposal block. Content
  also can't be given our own id on create.
- **A product block has no VAT rate.** Checked 9 October 2026, from the spec: a block carries a
  unit price in one of four `unit_value_*` fields (with or without discount, with or without
  tax), but no rate - only its `package_split` rows have `vat`. How the tax is worked out is
  still to check on a real draft.
- **Money is in the smallest currency unit.** Checked 6 October 2026, from the spec's own
  description: 650 kr is sent as `65000`. Sending `650` would make every price 100 times too low.
- **A proposal can record where it came from** - `tracking.created_from_template` (a template's
  uuid) and `tracking.created_from_rfp` (an inbox request's id). Whether the template link copies
  the template's content or only records lineage isn't stated - check on a real draft.
- **Companies, templates and the inbox have no create endpoints** - they're set up by hand in
  the Proposales app.
- **No documented rate limit.** Checked 6 October 2026: no `429` response in the OpenAPI spec,
  nothing in the docs. We treat it as unknown, not unlimited - `.claude/rules/external-apis.md`
  says how we keep call volume down.

## Links

- [Docs home](https://docs.proposales.com) · [API reference](https://docs.proposales.com/api-reference/introduction) · [OpenAPI spec](https://docs.proposales.com/openapi.json) · [Docs index (llms.txt)](https://docs.proposales.com/llms.txt)
- [Connections / integrations](https://docs.proposales.com/connections) · [Webhooks: proposal status update](https://docs.proposales.com/webhooks/proposal-status-update) · [Editor widget](https://docs.proposales.com/webhooks/editor-widget) · [Data widget](https://docs.proposales.com/webhooks/data-widget)
- [Inbox: create an RFP](https://docs.proposales.com/api-reference/inbox/create-rfp)
- [Help center](https://help.proposales.com) · [Status page](https://status.proposales.com) · [API key settings](https://secure.proposales.com/settings/profile)
