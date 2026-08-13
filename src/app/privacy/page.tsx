import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy –?Minecraft Circle Generator",
  description:
    "Privacy policy for the free Minecraft circle generator: no cookies, no tracking, no personal data collected.",
  alternates: { canonical: `${SITE_URL}/privacy/` },
};

export default async function PrivacyPage() {
  const dict = await getDictionary(defaultLocale);
  return (
    <SeoShell dict={dict} locale={defaultLocale}>
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          Privacy Policy
        </h1>

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Short version
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            This website does not use cookies, does not create accounts, and
            does not collect any personal data from you. Everything runs in
            your browser.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">Full policy</h2>
          <div className="mt-3 space-y-4 text-sm leading-7 text-muted">
            <p>
              <strong className="text-ink">Data we collect:</strong> none.
              The circle generator runs entirely in your browser –?your shape,
              size and block settings never leave your device.
            </p>
            <p>
              <strong className="text-ink">Cookies:</strong> none are set by
              this site.
            </p>
            <p>
              <strong className="text-ink">Analytics:</strong> this site may
              use a privacy-friendly, cookie-free analytics script (Plausible)
              when the site owner enables it. It counts page views only and
              does not identify you.
            </p>
            <p>
              <strong className="text-ink">Third-party links:</strong> pages
              may link to external sites (Minecraft Wiki, Wikipedia,
              minecraft.net, GitHub). Those sites have their own privacy
              policies.
            </p>
            <p>
              <strong className="text-ink">Changes:</strong> if this policy
              changes, it will be updated on this page. Questions? Use the
              contact page or open an issue on GitHub.
            </p>
            <p>
              <Link href="/" className="pixel-link">
                Back to the generator
              </Link>
            </p>
          </div>
        </section>
      </div>
    </SeoShell>
  );
}
