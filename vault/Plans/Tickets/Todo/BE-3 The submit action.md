# BE-3 The submit action

**Status:** Todo
**Blocked by:** [[BE-2 createProposal, with its fixture|BE-2]].
**Done when:** each outcome - a draft created, field errors, Proposales down - comes back
correctly against mocks (`PROPOSALES_MOCK=true` and `=error`), and every state of the group-days form - field errors,
Proposales down, sending, sent - has been clicked through in a browser.

## What

What happens when the group-days form is sent. The Server Action is
already there, validating only: `app/_lib/group-days/send-request.ts`. Behind its validation:
turn the picks into blocks using the golf booking system's products and prices, call
`createProposal` once, and return success, field errors, or a service error - never throw to
the page. The form already handles all three.
