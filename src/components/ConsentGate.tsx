"use client";

import { useEffect } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "G-ED1D95CXQV";
const GA_SCRIPT_ATTRIBUTE = "data-circlegen-ga";

let gtagBootstrapped = false;

type GtagWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/**
 * Boot Google Analytics with Consent Mode v2 defaults set to granted.
 *
 * The consent banner was removed at the site owner's request (2026-10-27):
 * analytics now runs for every visitor, and a Google-certified CMP will be
 * wired in later for the AdSense launch. The consent commands stay in place
 * so that later CMP only needs to push `consent` updates — no loader rewrite.
 */
function bootstrapGtag(): void {
  if (gtagBootstrapped) return;
  gtagBootstrapped = true;

  const analyticsWindow = window as GtagWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  const dataLayer = analyticsWindow.dataLayer;

  // gtag.js reads each dataLayer entry as an `arguments` object. Pushing a
  // plain array makes the commands stall silently (no hits, no cookies), so
  // mirror Google's own snippet exactly.
  const gtag: (...args: unknown[]) => void = function () {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments as unknown as unknown[]);
  };
  analyticsWindow.gtag = gtag;

  gtag("consent", "default", {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
    functionality_storage: "granted",
    security_storage: "granted",
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

export default function ConsentGate() {
  useEffect(() => {
    const init = window.setTimeout(bootstrapGtag, 0);
    return () => window.clearTimeout(init);
  }, []);

  return null;
}
