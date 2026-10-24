"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "@/components/StaticLink";
import {
  CONSENT_STORAGE_KEY,
  parseConsent,
  serializeConsent,
  type ConsentChoice,
} from "@/lib/consent";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-ED1D95CXQV";
const GA_SCRIPT_ATTRIBUTE = "data-circlegen-ga";
const EXPIRED_COOKIE_DATE = "Thu, 01 Jan 1970 00:00:00 GMT";

let gaConfigured = false;

type ConsentCopy = Dictionary["consent"];

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

function setGaDisabled(disabled: boolean): void {
  (window as unknown as Record<string, unknown>)[
    `ga-disable-${GA_MEASUREMENT_ID}`
  ] = disabled;
}

function loadGoogleAnalytics(): void {
  setGaDisabled(false);

  const analyticsWindow = window as Window & {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  const dataLayer = analyticsWindow.dataLayer;

  if (gaConfigured) return;
  gaConfigured = true;

  // Queue the commands before the external script loads, matching Google's
  // standard snippet. The script drains this array when it is ready.
  const gtag = (...args: unknown[]) => {
    dataLayer.push(args);
  };
  analyticsWindow.gtag = gtag;
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
      setChoice(stored);

      if (stored === "granted") {
        loadGoogleAnalytics();
      } else {
        setGaDisabled(true);
        clearGaCookies();
        if (!stored) setOpen(true);
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
      const previous = choice ?? readStoredConsent();
      storeConsent(next);
      setChoice(next);
      setOpen(false);

      if (previous !== null && previous !== next) {
        setGaDisabled(next === "denied");
        clearGaCookies();
        window.location.reload();
        return;
      }

      if (next === "granted") {
        loadGoogleAnalytics();
      } else {
        setGaDisabled(true);
        clearGaCookies();
      }
    },
    [choice]
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
