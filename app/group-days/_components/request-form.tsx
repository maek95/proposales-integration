"use client";

import { useState, useTransition } from "react";
import { club } from "@/app/_lib/club";
import { formatKr } from "@/app/_lib/format";
import type { Product } from "@/app/_lib/golf-booking";
import { MAX_QUANTITY, type FieldErrors, type GroupDayRequest } from "@/app/_lib/group-days/request";
import { sendGroupDayRequest } from "@/app/_lib/group-days/send-request";
import Button from "@/app/_components/ui/button";
import ErrorNotice from "@/app/_components/ui/error-notice";
import Field from "@/app/_components/ui/field";
import Stepper from "@/app/_components/ui/stepper";

type Details = Pick<GroupDayRequest, "date" | "company" | "name" | "email">;

const emptyDetails: Details = { date: "", company: "", name: "", email: "" };

/** A field's error goes away as soon as the visitor changes that field. */
function without(errors: FieldErrors, field: keyof FieldErrors): FieldErrors {
  const rest = { ...errors };
  delete rest[field];
  return rest;
}

/**
 * The group-days form and the states that replace it: sending and sent. Nothing is called while
 * the visitor picks and types - one Server Action call per press of Send.
 */
export default function RequestForm({
  products,
  productsError,
}: {
  /** null when the golf booking system couldn't be reached. */
  products: Product[] | null;
  productsError?: string;
}) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [sentSummary, setSentSummary] = useState<string | null>(null);
  const [isSending, startSending] = useTransition();

  const lines = (products ?? []).map((product) => {
    const quantity = quantities[product.id] ?? 0;
    return { product, quantity, amountKr: quantity * product.priceKr };
  });
  const picked = lines.filter((line) => line.quantity > 0);
  const totalKr = lines.reduce((sum, line) => sum + line.amountKr, 0);
  const canSend = picked.length > 0 && !serviceError && !isSending;

  function setQuantity(productId: string, quantity: number) {
    setQuantities((current) => ({ ...current, [productId]: quantity }));
    setFieldErrors((current) => without(current, "items"));
  }

  function setDetail(field: keyof Details, value: string) {
    setDetails((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => without(current, field));
  }

  function send() {
    setServiceError(null);
    startSending(async () => {
      const items = lines.map(({ product, quantity }) => ({ productId: product.id, quantity }));
      const result = await sendGroupDayRequest({ ...details, items });
      if (result.ok) {
        setSentSummary(
          [...picked.map((line) => `${line.quantity} × ${line.product.name}`), `${formatKr(totalKr)} indicative`].join(" · "),
        );
      } else if ("fieldErrors" in result) {
        setFieldErrors(result.fieldErrors);
      } else {
        setServiceError(result.serviceError);
      }
    });
  }

  function startOver() {
    setQuantities({});
    setDetails(emptyDetails);
    setFieldErrors({});
    setSentSummary(null);
  }

  if (isSending) {
    return (
      <div role="status" className="rounded-panel bg-panel px-8 py-20 text-center">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto animate-spin" aria-hidden="true">
          <circle cx="24" cy="24" r="20" strokeWidth="4" className="stroke-line" />
          <path d="M24 4a20 20 0 0 1 20 20" strokeWidth="4" strokeLinecap="round" className="stroke-fairway" />
        </svg>
        <h3 className="mt-5 mb-2 text-[30px] font-extrabold tracking-[-0.02em]">Sending your request…</h3>
        <p className="text-muted">Just a few seconds. Please keep this page open.</p>
      </div>
    );
  }

  if (sentSummary) {
    return (
      <div
        role="status"
        className="flex flex-wrap items-start gap-x-12 gap-y-6 rounded-panel bg-fairway px-10 py-14 text-white"
      >
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <circle cx="28" cy="28" r="28" className="fill-white" />
          <path
            d="M17 29l7 7 15-16"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-fairway"
          />
        </svg>
        <div className="min-w-0 flex-[1_1_400px]">
          <h3 className="mb-3 text-4xl leading-[1.1] font-extrabold tracking-[-0.03em]">Request sent.</h3>
          <p className="mb-4.5 text-[19px]">
            The club will email you an offer shortly. You can add extras, adjust numbers and sign
            right in the offer.
          </p>
          <p className="mb-7 text-sm text-on-fairway-muted">{sentSummary}</p>
          <Button variant="outline" onClick={startOver}>
            Start a new request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      aria-label="Group day request"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        if (canSend) send();
      }}
      className="flex flex-wrap items-start gap-7"
    >
      <div className="flex min-w-0 flex-[999_1_520px] flex-col gap-7">
        {serviceError && (
          <ErrorNotice title="Requests can't be sent right now.">
            {serviceError} Try again in a little while, or call us on {club.phone}.{" "}
            <button type="button" onClick={send} className="cursor-pointer font-semibold underline">
              Try again
            </button>
          </ErrorNotice>
        )}

        <fieldset aria-describedby={fieldErrors.items ? "items-error" : undefined}>
          <legend className="mb-3.5 text-lg font-bold">1 · What the day needs</legend>
          {products === null ? (
            <ErrorNotice title="Prices aren't available right now.">
              {productsError} Group requests are paused - please try again later.
            </ErrorNotice>
          ) : products.length === 0 ? (
            <p className="rounded-card bg-panel px-4.5 py-4 text-muted">
              The club has no group-day products online right now.
            </p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {lines.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-card bg-panel px-4.5 py-4"
                >
                  <div className="min-w-0 flex-[1_1_200px]">
                    <div className="text-[17px] font-bold">{product.name}</div>
                    <div className="text-sm text-subtle">
                      {formatKr(product.priceKr)} {product.unit}
                    </div>
                  </div>
                  <Stepper
                    value={quantity}
                    max={MAX_QUANTITY}
                    label={product.name}
                    onChange={(value) => setQuantity(product.id, value)}
                  />
                </div>
              ))}
            </div>
          )}
          {fieldErrors.items && (
            <p id="items-error" className="mt-2 font-semibold text-field-error">
              {fieldErrors.items}
            </p>
          )}
        </fieldset>

        <fieldset>
          <legend className="mb-3.5 text-lg font-bold">2 · When and who</legend>
          <div className="flex flex-wrap gap-4">
            <Field
              label="Preferred date"
              name="date"
              type="date"
              value={details.date}
              onChange={(event) => setDetail("date", event.target.value)}
              error={fieldErrors.date}
            />
            <Field
              label="Company"
              name="company"
              autoComplete="organization"
              placeholder="Company or group name"
              value={details.company}
              onChange={(event) => setDetail("company", event.target.value)}
              error={fieldErrors.company}
            />
            <Field
              label="Your name"
              name="name"
              autoComplete="name"
              value={details.name}
              onChange={(event) => setDetail("name", event.target.value)}
              error={fieldErrors.name}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              value={details.email}
              onChange={(event) => setDetail("email", event.target.value)}
              error={fieldErrors.email}
            />
          </div>
        </fieldset>
      </div>

      <aside aria-label="Your day" className="min-w-0 flex-[1_1_300px] rounded-panel bg-ink p-7 text-white">
        <div className="mb-4 text-sm font-semibold text-on-dark-muted">Your day</div>
        {picked.length === 0 ? (
          <p className="border-b border-on-dark-rule py-2 text-[15px] text-on-dark-muted">Nothing picked yet.</p>
        ) : (
          <ul>
            {picked.map(({ product, quantity, amountKr }) => (
              <li
                key={product.id}
                className="flex justify-between gap-3 border-b border-on-dark-rule py-2 text-[15px]"
              >
                <span>
                  {quantity} × {product.name}
                </span>
                <span className="whitespace-nowrap tabular-nums">{formatKr(amountKr)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-5.5 text-sm text-on-dark-muted">Indicative total</div>
        <div aria-live="polite" className="text-[40px] font-extrabold tracking-[-0.03em] tabular-nums">
          {formatKr(totalKr)}
        </div>
        <p className="mt-1.5 mb-6 text-[13px] text-on-dark-muted">
          Incl. VAT. Final price and availability are confirmed in the club&apos;s offer.
        </p>
        <Button type="submit" variant="mint" disabled={!canSend}>
          Send request
        </Button>
      </aside>
    </form>
  );
}
