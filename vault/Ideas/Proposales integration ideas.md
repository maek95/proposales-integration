# Proposales integration ideas

Things we could build around Proposales, grouped by how they plug in (see
[[Proposales overview]]). Weighed against [[The brief]].

**Don't rebuild Proposales.** An idea is only worth building if it adds something the platform
doesn't already do - rebuilding their dashboard or their inbox widget shows we didn't look. What
the platform covers is listed in [[Proposales overview]] under *What the platform already does*.
Ideas it covers are kept at the bottom, with what covers them, so we don't propose them again.

🤖 = involves an LLM (the brief's bonus).

## Not covered by Proposales, as far as we can tell

Checked against their public site, 6 October 2026. We can't see inside the logged-in app, so
"not covered" means "not advertised".

### Read-only (lowest risk, works locally)

- 🤖 **Proposal coach** - an LLM reviews a proposal and suggests improvements: clearer title,
  missing details, upsell ideas. Their AI is on the inquiry side (inbox, Outlook); nothing
  advertised reviews the proposal itself.
- 🤖 **Lost-deal debrief** - an LLM reads rejected and expired proposals and looks for patterns
  in *why*. Their Insights show conversion numbers, not reasons.
- 🤖 **Proposal remix** (silly) - retell a proposal as a haiku, a movie trailer or a pirate's
  offer.
- **Calendar export** - an `.ics` invite for an accepted proposal's event dates. No calendar
  integration is listed. Small on its own.
- **Template picker** - help a salesperson choose a template by asking a few questions. Not
  advertised, but thin.

### Writes (real data - test carefully)

- 🤖 **Brochure to catalogue** - a venue pastes its website or uploads its event brochure; an LLM
  extracts the products (name, description, unit, price, optional or not); the venue reviews the
  list and the app creates it in the content library. Raised 6 October 2026, from the user
  asking how a golf club would ever fill in all its products by hand. Setup today is manual
  entry, booking-system sync for big hotels, or the content-import webhook - nothing advertised
  turns an existing brochure into a catalogue. Could be the venue-onboarding step of our app, or
  how we seed our own demo venue (write a fictional brochure, extract it). Needs the venue's own
  API key in a real multi-venue app. **Dropped 6 October 2026** - the user: filling a venue's
  catalogue is their business, and Proposales may have smarter options already; our effort goes
  into the integration (see [[006 We're a golf club]]).
- 🤖 **Auto-tagging** - score or tag proposals into custom `data` (urgency, size, mood), then
  search and filter by those tags.
- 🤖 **Proposal from a conversation** - paste an email or chat with a lead, extract the
  details, create a *draft proposal* from a template. Partly overlaps the Outlook add-in, which
  turns emails into RFPs - the difference is going straight to a draft. Needs a sharper angle to
  be worth it.

### Widgets (needs the powerup)

- 🤖 **Editor sidebar helper** - an editor widget that suggests products or fills in custom
  fields while drafting.

## Already covered by Proposales

- **Deal pulse** (dashboard of recent proposals and conversion) - Insights, and the proposal
  lists in the app.
- **Proposal → printable one-pager or shareable card** - the proposal is already a hosted
  eProposal, and has a PDF (`pdf_url` in the API).
- **Content library browser** - the content library in the app, and the Buyer Portal for
  customers.
- **Themed RFP form, chat intake, embeddable widget** - the AI-powered Inbox Widget with agentic
  inquiry handling.
- **Content sync** - PMS integrations (OPERA Cloud, D-EDGE…) bring in availability and pricing;
  the content-import webhook covers other sources.
- **Status notifications** - Zapier; no native Slack or Teams integration, but Zapier reaches
  them.
- **Booking hand-off** - native PMS integrations create reservations and room blocks on
  acceptance.
- **CRM lookup** - native Salesforce, HubSpot, SuperOffice and Dynamics 365 integrations.
