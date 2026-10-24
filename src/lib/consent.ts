/**
 * First-party analytics consent helpers.
 *
 * Kept pure and browser-safe so they can be unit tested without a DOM.
 */

export const CONSENT_STORAGE_KEY = "circlegen-consent-v1";

export type ConsentChoice = "granted" | "denied";

/** Parse a raw localStorage value into a known consent choice. */
export function parseConsent(raw: string | null): ConsentChoice | null {
  const value = raw?.trim();
  if (value === "granted" || value === "denied") return value;
  return null;
}

/** Serialize a consent choice for localStorage. */
export function serializeConsent(choice: ConsentChoice): string {
  return choice;
}
