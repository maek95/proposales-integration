"use client";

import { useState, useTransition } from "react";
import { MAX_DESCRIPTION_LENGTH } from "@/app/api/group-days/limits";
import type { SuggestRequest, SuggestResult, Suggestion } from "@/app/api/group-days/suggest/schema";
import Button from "@/app/_components/ui/button";
import ErrorNotice from "@/app/_components/ui/error-notice";
import fieldControl from "@/app/_components/ui/field-control";

/** POST /api/group-days/suggest - our own API; the server talks to the model. */
async function postSuggest(request: SuggestRequest): Promise<SuggestResult> {
  try {
    const response = await fetch("/api/group-days/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    // The firewall's per-visitor limit answers before our route, without our JSON.
    if (response.status === 429) return { ok: false, serviceError: "You've asked a lot in a short while - wait a minute." };
    return (await response.json()) as SuggestResult;
  } catch {
    return { ok: false, serviceError: "We couldn't reach the club's website." };
  }
}

/**
 * "Describe your day": the visitor writes what they have in mind, presses Fill in the form, and
 * the steppers below are set from it - one call per press, never while typing. Optional: if the
 * assistant fails, the steppers still work.
 */
export default function DescribeDay({
  headcount,
  onSuggestion,
}: {
  headcount: number;
  /** Sets the steppers. The visitor checks and changes them before anything is sent. */
  onSuggestion: (suggestion: Suggestion) => void;
}) {
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [filled, setFilled] = useState<Suggestion | null>(null);
  const [isFilling, startFilling] = useTransition();

  function fill() {
    setError(null);
    setServiceError(null);
    startFilling(async () => {
      const result = await postSuggest({ headcount, description });
      if (result.ok) {
        setFilled(result);
        onSuggestion(result);
      } else if ("fieldErrors" in result) {
        setError(result.fieldErrors.description ?? result.fieldErrors.headcount ?? null);
      } else {
        setServiceError(result.serviceError);
      }
    });
  }

  return (
    <fieldset>
      <legend className="mb-1.5 text-lg font-bold">
        2 · Describe your day <span className="font-normal text-muted">(optional)</span>
      </legend>
      <p className="mb-3.5 text-muted">
        Tell us what you have in mind and we&apos;ll fill in the form. You check every line before
        anything is sent.
      </p>
      <label className="flex flex-col gap-1.5 text-sm font-semibold">
        <span className="sr-only">Your day, in your own words</span>
        <textarea
          name="description"
          rows={3}
          maxLength={MAX_DESCRIPTION_LENGTH}
          placeholder="Half of us have never played. Lunch before, a few beers and something sweet after, and a prize for the longest drive."
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
            setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "description-error" : undefined}
          className={`min-h-28 resize-y py-3 ${fieldControl(error ?? undefined)}`}
        />
        {error && (
          <span id="description-error" className="font-semibold text-field-error">
            {error}
          </span>
        )}
      </label>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button variant="primary" onClick={fill} disabled={isFilling || description.trim().length === 0}>
          {isFilling ? "Filling in…" : "Fill in the form"}
        </Button>
        <span className="text-sm text-subtle tabular-nums">
          {description.length} / {MAX_DESCRIPTION_LENGTH}
        </span>
      </div>

      <div aria-live="polite" className="mt-3.5 empty:hidden">
        {serviceError && (
          <ErrorNotice title="We couldn't fill in the form.">
            {serviceError} You can still pick everything yourself below.
          </ErrorNotice>
        )}
        {filled && !serviceError && !isFilling && (
          <div className="rounded-card bg-panel px-4.5 py-4">
            <p className="font-semibold">
              {filled.items.length === 0
                ? "We couldn't place anything from your description in the form - pick below instead."
                : `Filled in ${filled.items.length} ${filled.items.length === 1 ? "line" : "lines"} from your description - check them below.`}
            </p>
            {filled.unmatched.length > 0 && (
              <>
                <p className="mt-2 text-muted">
                  We couldn&apos;t place these in the form. If you find them below, pick them yourself -
                  if not, mention them to the club when your offer arrives:
                </p>
                <ul className="mt-1 list-disc pl-5 text-muted">
                  {filled.unmatched.map((wish) => (
                    <li key={wish}>{wish}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </fieldset>
  );
}
