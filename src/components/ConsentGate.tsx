"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "@/components/StaticLink";
import {
  CONSENT_STORAGE_KEY,
  detectConsentRegion,
  parseConsent,
  serializeConsent,
  type ConsentChoice,
} from "@/lib/consent";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-ED1D95CXQV";
const GA_SCRIPT_ATTRIBUTE = "data-circlegen-ga";
const EXPIRED_COOKIE_DATE = "Thu, 01 Jan 1970 00:00:00 GMT";

type ConsentCopy = Dictionary["consent"];
type ConsentRegion = "eea" | "row";

let gtagBootstrapped = false;

function readStoredConsent(): ConsentChoice | null {
  try {
    return parseConsent(window.localStorage.getItem(CONSENT_STORAGE_KEY));
  } catch {
    return null;
  }
}

function storeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, serializeConsent(choice));
  } catch {
    // Storage may be unavailable (private mode, blocked cookies). The choice
    // still applies for this page view.
  }
}

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function getGtag(): GtagWindow["gtag"] {
  const analyticsWindow = window as GtagWindow;
  if (analyticsWindow.gtag) return analyticsWindow.gtag;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  const dataLayer = analyticsWindow.dataLayer;
  const gtag = (...args: unknown[]) => {
    dataLayer.push(args);
  };
  analyticsWindow.gtag = gtag;
  return gtag;
}

function setGaDisabled(disabled: boolean): void {
  (window as unknown as Record<string, unknown>)[
    `ga-disable-${GA_MEASUREMENT_ID}`
  ] = disabled;
}

/**
 * Load gtag.js once and install Consent Mode v2 defaults before the first hit.
 *
 * EEA/UK/CH visitors start with every storage type denied: GA4 still sends
 * cookieless pings (when the property has behavioral modeling enabled) but no
 * cookies are written until they accept. Visitors elsewhere start granted,
 * which keeps reporting complete for the site's main markets (LatAm/US) while
 * the footer still exposes an opt-out.
 */
function bootstrapGtag(region: ConsentRegion): void {
  if (gtagBootstrapped) return;
  gtagBootstrapped = true;

  setGaDisabled(false);
  const gtag = getGtag();
  if (!gtag) return;

  const grantAll = region === "row";

  gtag("consent", "default", {
    ad_storage: grantAll ? "granted" : "denied",
    ad_user_data: grantAll ? "granted" : "denied",
    ad_personalization: grantAll ? "granted" : "denied",
    analytics_storage: grantAll ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);

  if (!document.querySelector(`script[${GA_SCRIPT_ATTRIBUTE}]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      GA_MEASUREMENT_ID
    )}`;
    script.setAttribute(GA_SCRIPT_ATTRIBUTE, "true");
    document.head.appendChild(script);
  }
}

/** Push a Consent Mode v2 update after an explicit user decision. */
function applyConsent(choice: ConsentChoice): void {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}

/** Derive the registrable-looking domain used for GA's domain-wide cookie. */
function getCookieDomain(hostname: string): string | null {
  const host = hostname.toLowerCase();
  if (!host || host === "localhost" || host.includes(":")) return null;
  if (/^[\d.]+$/.test(host)) return null;
  const parts = host.split(".").filter(Boolean);
  if (parts.length < 2) return null;
  return parts.slice(-2).join(".");
}

function clearGaCookies(): void {
  try {
    const hostname = window.location.hostname;
    const baseDomain = getCookieDomain(hostname);
    const domains = new Set<string>([hostname, `.${hostname}`]);
    if (baseDomain) {
      domains.add(baseDomain);
      domains.add(`.${baseDomain}`);
    }

    const assignedNames = document.cookie
      .split(";")
      .map((cookie) => cookie.trim().split("=")[0])
      .filter(
        (name) =>
          name === "_ga" || name === "_gid" || name.startsWith("_ga_")
      );
    // GA4 names its container cookie after the measurement ID without the
    // "G-" prefix. Include it even when document.cookie cannot be enumerated.
    const measurementCookie = `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, "")}`;
    const names = new Set<string>([
      "_ga",
      "_gid",
      measurementCookie,
      ...assignedNames,
    ]);

    for (const name of names) {
      document.cookie = `${name}=; expires=${EXPIRED_COOKIE_DATE}; Max-Age=0; path=/; SameSite=Lax`;
      for (const domain of domains) {
        document.cookie = `${name}=; expires=${EXPIRED_COOKIE_DATE}; Max-Age=0; path=/; SameSite=Lax; domain=${domain}`;
      }
    }
  } catch {
    // Cookie access can throw when storage is blocked; nothing else to do.
  }
}

export default function ConsentGate({ copy }: { copy: ConsentCopy }) {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice | null>(null);

  useEffect(() => {
    // Defer until after hydration so the server-rendered markup and the first
    // client render stay identical.
    const init = window.setTimeout(() => {
      const stored = readStoredConsent();
      const region = detectConsentRegion();
      setChoice(stored);

      // Consent Mode defaults must be installed before the first GA hit, so
      // gtag loads for everyone; only the storage permissions differ.
      bootstrapGtag(region);

      if (stored === "granted") {
        applyConsent("granted");
        setGaDisabled(false);
      } else if (stored === "denied") {
        applyConsent("denied");
        setGaDisabled(true);
        clearGaCookies();
      } else if (region === "eea") {
        // Keep the denied defaults: cookieless pings may still feed GA4's
        // behavioral modeling, but no cookies are written before consent.
        setOpen(true);
      } else {
        // Rest of world: tracking is on by default; the footer exposes the
        // opt-out, which stores "denied" and reloads the consent state.
        applyConsent("granted");
      }

      setReady(true);
    }, 0);

    return () => window.clearTimeout(init);
  }, []);

  useEffect(() => {
    const openConsent = () => setOpen(true);
    window.addEventListener("circlegen:open-consent", openConsent);
    return () => window.removeEventListener("circlegen:open-consent", openConsent);
  }, []);

  const handleChoice = useCallback(
    (next: ConsentChoice) => {
      storeConsent(next);
      setChoice(next);
      setOpen(false);
      applyConsent(next);
      setGaDisabled(next === "denied");
      if (next === "denied") clearGaCookies();
    },
    []
  );

  if (!ready || !open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] px-3 pb-3 sm:px-4 sm:pb-4">
      <section
        role="region"
        aria-label={copy.title}
        className="mc-panel pixel-corners mx-auto max-h-[85vh] w-full max-w-3xl overflow-y-auto p-4 sm:p-5"
      >
        <h2 className="font-pixel text-[10px] leading-relaxed text-ink">
          {copy.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted">{copy.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="mc-btn"
            onClick={() => handleChoice("granted")}
          >
            {copy.accept}
          </button>
          <button
            type="button"
            className="mc-btn"
            onClick={() => handleChoice("denied")}
          >
            {copy.reject}
          </button>
          {choice !== null ? (
            <button
              type="button"
              className="pixel-link cursor-pointer bg-transparent p-0 text-sm"
              onClick={() => setOpen(false)}
            >
              {copy.close}
            </button>
          ) : null}
          <Link href="/privacy/" className="pixel-link ml-auto text-sm">
            {copy.privacy}
          </Link>
        </div>
      </section>
    </div>
  );
}
