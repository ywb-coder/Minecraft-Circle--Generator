/**
 * First-party product analytics helpers.
 *
 * Consent model: ConsentGate only injects gtag after the user grants
 * analytics consent (and clears it on withdrawal), so checking for the
 * presence of `window.gtag` is sufficient — denied users never get the
 * function, and every call below is a no-op for them.
 *
 * Keep event names snake_case and stable: GA4 reports are keyed on them and
 * renaming an event later breaks historical comparisons.
 */

export type AnalyticsParams = Record<string, string | number | boolean>;

interface AnalyticsWindow extends Window {
  gtag?: (...args: unknown[]) => void;
}

/** True when the GA4 gtag function is available (i.e. consent was granted). */
export function analyticsEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const w = window as AnalyticsWindow;
  return typeof w.gtag === "function";
}

/**
 * Send a product event to GA4. No-op when analytics is unavailable
 * (consent denied/withdrawn, SSR, or the script still loading).
 */
export function trackEvent(name: string, params: AnalyticsParams = {}): void {
  if (!analyticsEnabled()) return;
  (window as AnalyticsWindow).gtag!("event", name, params);
}
