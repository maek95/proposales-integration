import "server-only";
import { connection } from "next/server";
import { unstable_rethrow } from "next/navigation";
import { z } from "zod";

/**
 * The shared layer every external API client builds on: one error type, one request
 * function, one mock switch. Service clients in app/_clients/<service>/ only add their base
 * URL, auth and schemas.
 */

const DEFAULT_TIMEOUT_MS = 10_000;

export type FailureKind =
  | "not-configured" // our side: a required env var is missing
  | "unreachable" // network error - we never got a response
  | "timeout"
  | "rejected" // the service answered with a non-2xx status
  | "invalid-response"; // the response isn't JSON, or doesn't match our schema

/** Any failure talking to an external service. `message` is for logs, `userMessage` for UI. */
export class ExternalApiError extends Error {
  constructor(
    readonly service: string,
    readonly kind: FailureKind,
    message: string,
    readonly status?: number,
    options?: { cause?: unknown },
  ) {
    super(message, options);
    this.name = "ExternalApiError";
  }

  /** Safe to show users - never includes upstream bodies. */
  get userMessage() {
    const s = this.service;
    switch (this.kind) {
      case "not-configured":
        return `${s} isn't set up on this server.`;
      case "unreachable":
        return `${s} isn't responding right now.`;
      case "timeout":
        return `${s} took too long to respond.`;
      case "invalid-response":
        return `${s} sent data we didn't expect.`;
      case "rejected":
        if (this.status === 429) return `${s} is busy right now.`;
        if (this.status === 401 || this.status === 403) return `${s} didn't accept our credentials.`;
        if (this.status === 404) return `${s} couldn't find what we asked for.`;
        if (this.status && this.status >= 500) return `${s} is having problems right now.`;
        return `${s} refused the request.`;
    }
  }

  /** Status for our own Route Handlers - we're a gateway, so upstream failures are 5xx. */
  get httpStatus() {
    if (this.kind === "timeout") return 504;
    if (this.kind === "rejected" && (this.status === 429 || this.status === 404)) return this.status;
    if (this.kind === "rejected" || this.kind === "invalid-response") return 502;
    return 503;
  }
}

// Every ExternalApiError is logged once, where it's created - never silent. Exported for a
// client whose SDK makes the request itself (app/_clients/ai/), so it fails the same way.
export function fail(err: ExternalApiError) {
  const status = err.status ? ` ${err.status}` : "";
  console.error(`[${err.service}] ${err.kind}${status}: ${err.message}`, err.cause ?? "");
  return err;
}

/** Read a required secret at request time. */
export function requireEnv(service: string, name: string) {
  const value = process.env[name];
  if (!value) throw fail(new ExternalApiError(service, "not-configured", `${name} is not set`));
  return value;
}

/**
 * For a service whose real API isn't connected yet: fails as `not-configured`, logged like any
 * failure. Its fixtures are only served with the mock switch on - never as a fallback.
 */
export function notConnected(service: string) {
  return fail(
    new ExternalApiError(service, "not-configured", "no real API is connected - set its mock switch to use fixtures"),
  );
}

export type RequestOptions = RequestInit & { timeoutMs?: number };

/**
 * Fetch JSON and validate it against `schema`. Every failure becomes an ExternalApiError.
 * Pass `options` as a function when it reads secrets, so they're read at request time.
 */
export async function requestJson<S extends z.ZodType>(
  service: string,
  url: string,
  schema: S,
  options: RequestOptions | (() => RequestOptions) = {},
): Promise<z.infer<S>> {
  // Live data: always request time, never prerendered at build.
  await connection();
  const { timeoutMs = DEFAULT_TIMEOUT_MS, ...init } =
    typeof options === "function" ? options() : options;

  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store", ...init, signal: AbortSignal.timeout(timeoutMs) });
  } catch (err) {
    unstable_rethrow(err);
    const timedOut = err instanceof DOMException && err.name === "TimeoutError";
    throw fail(
      new ExternalApiError(service, timedOut ? "timeout" : "unreachable", `${init.method ?? "GET"} ${url}`, undefined, { cause: err }),
    );
  }

  if (!res.ok) {
    const body = (await res.text().catch(() => "")).slice(0, 500);
    throw fail(new ExternalApiError(service, "rejected", `${url}: ${body}`, res.status));
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch (err) {
    throw fail(new ExternalApiError(service, "invalid-response", `${url}: not JSON`, res.status, { cause: err }));
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    throw fail(
      new ExternalApiError(service, "invalid-response", `${url}:\n${z.prettifyError(parsed.error)}`, res.status),
    );
  }
  return parsed.data;
}

/**
 * `<SERVICE>_MOCK=true` serves fixtures instead of calling out; `=error` simulates the
 * service being down. Usage: `return mocks.serve(fixture) ?? requestJson(...)`.
 */
export function mockSwitch(service: string, envVar: string) {
  const mode = () => process.env[envVar];
  return {
    /** Whether the service is mocked right now (`=true` or `=error`). */
    active() {
      return mode() === "true" || mode() === "error";
    },
    serve<T>(fixture: T): Promise<T> | null {
      if (!this.active()) return null;
      return (async () => {
        await connection(); // same request-time rendering as a real call
        if (mode() === "error") {
          throw fail(new ExternalApiError(service, "unreachable", `simulated by ${envVar}=error`));
        }
        return fixture;
      })();
    },
  };
}

/**
 * Run an external call for a feature without letting a failure crash the page.
 * Next's own control-flow errors are rethrown; anything else becomes a message to show.
 */
export async function attempt<T>(
  fn: () => Promise<T>,
): Promise<{ ok: true; data: T } | { ok: false; message: string }> {
  try {
    return { ok: true, data: await fn() };
  } catch (err) {
    unstable_rethrow(err);
    if (err instanceof ExternalApiError) return { ok: false, message: err.userMessage };
    console.error(err); // not an external failure - a bug on our side
    return { ok: false, message: "Something went wrong on our side." };
  }
}

/** The JSON error response for a Route Handler. */
export function errorResponse(err: unknown) {
  if (err instanceof ExternalApiError) {
    return Response.json({ error: err.userMessage }, { status: err.httpStatus });
  }
  console.error(err);
  return Response.json({ error: "Something went wrong on our side." }, { status: 500 });
}
