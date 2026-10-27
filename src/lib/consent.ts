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

/**
 * IANA timezones that map to the EEA + UK + Switzerland, where GDPR/ePrivacy
 * requires opt-in consent for analytics and advertising cookies.
 *
 * This is a client-side heuristic: it avoids a Geo-IP request (and the extra
 * CSP entry / latency that comes with it) while still keeping the strict
 * banner for the regions that legally require it. Timezone data comes from
 * the browser, so VPN users may be classified by their apparent location.
 */
export const EEA_TIMEZONES: ReadonlySet<string> = new Set([
  "Europe/Amsterdam",
  "Europe/Andorra",
  "Europe/Athens",
  "Europe/Berlin",
  "Europe/Bratislava",
  "Europe/Brussels",
  "Europe/Bucharest",
  "Europe/Budapest",
  "Europe/Copenhagen",
  "Europe/Dublin",
  "Europe/Gibraltar",
  "Europe/Guernsey",
  "Europe/Helsinki",
  "Europe/Isle_of_Man",
  "Europe/Jersey",
  "Europe/Lisbon",
  "Europe/Ljubljana",
  "Europe/London",
  "Europe/Luxembourg",
  "Europe/Madrid",
  "Europe/Malta",
  "Europe/Mariehamn",
  "Europe/Monaco",
  "Europe/Oslo",
  "Europe/Paris",
  "Europe/Podgorica",
  "Europe/Prague",
  "Europe/Riga",
  "Europe/Rome",
  "Europe/San_Marino",
  "Europe/Sarajevo",
  "Europe/Skopje",
  "Europe/Sofia",
  "Europe/Stockholm",
  "Europe/Tallinn",
  "Europe/Tirane",
  "Europe/Vaduz",
  "Europe/Valletta",
  "Europe/Vatican",
  "Europe/Vienna",
  "Europe/Vilnius",
  "Europe/Warsaw",
  "Europe/Zagreb",
  "Europe/Zurich",
  "Atlantic/Canary",
  "Atlantic/Faroe",
  "Atlantic/Madeira",
  "Atlantic/Reykjavik",
  "Asia/Nicosia",
  "Asia/Famagusta",
]);

/** True when the timezone is inside the EEA/UK/CH consent zone. */
export function isEeaTimezone(timezone: string | null | undefined): boolean {
  if (!timezone) return false;
  return EEA_TIMEZONES.has(timezone);
}

/** Map a timezone to the consent region, defaulting to the strict zone. */
export function regionFromTimezone(
  timezone: string | null | undefined
): "eea" | "row" {
  if (!timezone) return "eea";
  return isEeaTimezone(timezone) ? "eea" : "row";
}

/**
 * Classify the visitor for consent purposes.
 *
 * Returns "eea" when the browser timezone is in the EEA/UK/CH zone, otherwise
 * "row" (rest of world). When timezone detection fails we fall back to "eea"
 * so the strict banner is shown rather than silently granting consent.
 */
export function detectConsentRegion(): "eea" | "row" {
  try {
    return regionFromTimezone(
      Intl.DateTimeFormat().resolvedOptions().timeZone
    );
  } catch {
    return "eea";
  }
}
