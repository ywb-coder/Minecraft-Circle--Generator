import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { CONTENT_UPDATED, SITE_EMAIL, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy – Minecraft Circle Generator",
  description:
    "CircleGen privacy policy: the generator runs in your browser, Google Analytics measures aggregate site usage, and you can block cookies anytime in your browser.",
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
        <p className="mt-3 text-sm text-muted">
          Last updated: {CONTENT_UPDATED}
        </p>

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">Short version</h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            CircleGen is an independent, free Minecraft circle generator that
            runs in your browser. You do not need an account. Google Analytics
            is used to measure aggregate site usage; it does not change how the
            generator works and can be blocked in your browser at any time.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">Full policy</h2>
          <div className="mt-3 space-y-5 text-sm leading-7 text-muted">
            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                The generator
              </h3>
              <p className="mt-2">
                All circle, oval, sphere, dome and arc calculations happen
                locally in your browser. The sizes, shapes and block choices
                you enter are not sent to us. This site does not offer user
                accounts or file uploads.
              </p>
            </div>

            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                Hosting and technical logs
              </h3>
              <p className="mt-2">
                Like most websites, our hosting provider may process standard
                technical information such as your IP address, browser and
                user-agent string, the requested page and timestamps in server
                logs. This information is used to deliver the site, keep it
                secure and diagnose errors, and is handled under the hosting
                provider&apos;s terms.
              </p>
            </div>

            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                Analytics
              </h3>
              <p className="mt-2">
                We use Google Analytics 4 to understand aggregate site usage.
                Google Analytics may set first-party cookies such as{" "}
                <code>_ga</code>, <code>_ga_*</code> and <code>_gid</code> in
                your browser and collect usage information such as pages
                viewed, approximate location derived from your IP address,
                device and browser details, and interactions with the site. We
                use this data only to understand aggregate site usage and
                improve the site. Google LLC provides Google Analytics and
                processes data under its own terms and privacy policy. We do
                not use analytics to identify individual visitors and do not
                sell or share this data with third parties.
              </p>
            </div>

            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                Your choice and how to change it
              </h3>
              <p className="mt-2">
                Analytics is optional in practice even if it is on by default:
                you can delete or block the Google Analytics cookies through
                your browser settings or with a content-blocking extension, and
                the generator keeps working either way. We may later add a
                consent tool that lets you opt out of analytics directly on the
                site; until then the browser controls described below are the
                way to opt out.
              </p>
            </div>

            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                Cookies and browser controls
              </h3>
              <p className="mt-2">
                The only analytics cookies this site may use are the Google
                Analytics cookies described above. Advertising cookies, used
                only when ads are displayed, are described in the Advertising
                section below. You can delete or block cookies through your
                browser settings at any time. Blocking cookies does not prevent
                the generator from working.
              </p>
            </div>

            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                Your legal rights (EEA and UK)
              </h3>
              <p className="mt-2">
                If you are in the European Economic Area or the United Kingdom,
                you have the right to access, correct, delete, restrict or
                object to the processing of your personal data, and the right
                to data portability. You can withdraw your consent at any time;
                withdrawal does not affect the lawfulness of processing that
                happened before it. You also have the right to lodge a
                complaint with your local data protection authority. To
                exercise your rights, email{" "}
                <a href={`mailto:${SITE_EMAIL}`} className="pixel-link">
                  {SITE_EMAIL}
                </a>
                . Because this site has no accounts, we may not be able to
                identify you from a request, but we will help wherever we can.
              </p>
            </div>

            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                Third-party links
              </h3>
              <p className="mt-2">
                Pages may link to external sites such as Minecraft Wiki,
                Wikipedia, minecraft.net, GitHub or Product Hunt. The footer
                also loads a Product Hunt badge image, which may share standard
                technical data such as your IP address and user agent with
                Product Hunt. Those sites have their own privacy policies, and
                we are not responsible for their content or practices.
              </p>
            </div>

            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                Advertising
              </h3>
              <p className="mt-2">
                CircleGen may display advertisements served by Google AdSense
                and other third-party vendors. Third-party vendors, including
                Google, use cookies to serve ads based on your prior visits to
                this website or other websites. Google&apos;s use of
                advertising cookies enables it and its partners to serve ads to
                you based on your visit to this site and/or other sites on the
                Internet. These cookies may include the DoubleClick cookie, and
                vendors may also use web beacons and IP addresses to measure ad
                performance. Ads may not be enabled at all times; this section
                describes how advertising works when it is shown.
              </p>
              <p className="mt-2">
                You can opt out of personalised advertising by visiting{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-link"
                >
                  Google Ads Settings
                </a>
                . Opting out does not remove ads, but they will no longer be
                personalised. You can read how Google uses information from
                sites that use its services at{" "}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-link"
                >
                  policies.google.com/technologies/partner-sites
                </a>
                .
              </p>
              <p className="mt-2">
                If you are in the European Economic Area, the United Kingdom or
                Switzerland, personalised advertising is only enabled after you
                give consent through the consent message shown on the site
                (served by a Google-certified consent management platform). You
                can change or withdraw that choice at any time through the
                Privacy settings link in the footer.
              </p>
            </div>

            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                Children under 13
              </h3>
              <p className="mt-2">
                CircleGen is a general-audience tool and is not directed to
                children under 13. We do not knowingly collect personal
                information from children under 13. If you believe a child has
                provided information to us, contact us and we will delete it.
              </p>
            </div>

            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                Changes to this policy
              </h3>
              <p className="mt-2">
                We may update this policy as the site or applicable rules
                change. The date at the top of this page shows the latest
                revision.
              </p>
            </div>

            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                Contact
              </h3>
              <p className="mt-2">
                Questions about privacy? Email{" "}
                <a href={`mailto:${SITE_EMAIL}`} className="pixel-link">
                  {SITE_EMAIL}
                </a>{" "}
                or use the{" "}
                <Link href="/contact/" className="pixel-link">
                  contact page
                </Link>
                .
              </p>
            </div>

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
