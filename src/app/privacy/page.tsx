import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ConsentSettingsButton from "@/components/ConsentSettingsButton";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { CONTENT_UPDATED, SITE_EMAIL, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy – Minecraft Circle Generator",
  description:
    "CircleGen privacy policy: the generator runs in your browser, Google Analytics stays off until you consent, and you can change your choice anytime.",
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
            is disabled by default and only loads if you accept analytics.
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
                Analytics and your consent
              </h3>
              <p className="mt-2">
                We use Google Analytics 4 only after you choose Accept
                analytics in the consent banner or in Privacy settings. If you
                reject analytics or do not make a choice, the Google Analytics
                script is not loaded. When you accept, Google Analytics may set
                first-party cookies such as <code>_ga</code>,{" "}
                <code>_ga_*</code> and <code>_gid</code> in your browser and
                collect usage information such as pages viewed, approximate
                location derived from your IP address, device and browser
                details, and interactions with the site. We use this data only
                to understand aggregate site usage and improve the site. Google
                LLC provides Google Analytics and processes data under its own
                terms and privacy policy.
              </p>
            </div>

            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                Your choice and how to change it
              </h3>
              <p className="mt-2">
                Your consent choice is stored in your browser&apos;s
                localStorage under the key <code>circlegen-consent-v1</code>.
                It stays on your device until you change it or clear site data.
                You can reopen the settings with the button below or with the
                Privacy settings link in the footer. If you withdraw consent,
                we disable Google Analytics for this site and remove its{" "}
                <code>_ga</code>, <code>_ga_*</code> and <code>_gid</code>{" "}
                cookies before reloading the page.
              </p>
              <p className="mt-3">
                <ConsentSettingsButton label={dict.consent.settings} />
              </p>
            </div>

            <div>
              <h3 className="font-pixel text-[10px] leading-relaxed text-ink">
                Cookies and browser controls
              </h3>
              <p className="mt-2">
                The only analytics cookies this site may use are the Google
                Analytics cookies described above, and only after you accept.
                You can delete or block cookies and clear localStorage through
                your browser settings. Blocking cookies does not prevent the
                generator from working. Clearing site data may reset your
                saved consent choice, in which case the banner will appear
                again.
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
                CircleGen currently displays no ads and does not load AdSense.
                If advertising is added later, we will update this policy and
                use a Google-certified consent management platform where
                required, for example in the EEA, the UK and Switzerland,
                before serving ads.
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
