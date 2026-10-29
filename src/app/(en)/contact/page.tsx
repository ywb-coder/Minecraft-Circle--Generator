import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { GITHUB_URL, SITE_EMAIL, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact – Minecraft Circle Generator",
  description:
    "Contact CircleGen by email or GitHub Issues for bug reports, corrections, feature requests and questions about the free Minecraft circle generator.",
  alternates: { canonical: `${SITE_URL}/contact/` },
};

export default async function ContactPage() {
  const dict = await getDictionary(defaultLocale);
  return (
    <SeoShell dict={dict} locale={defaultLocale}>
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          Contact CircleGen
        </h1>

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">Get in touch</h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Found a bug, spotted a blueprint that looks wrong, want a new shape,
            or just want to say hi? Email is the most direct way to get in
            touch.
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-ink">
            <li>
              Email:{" "}
              <a href={`mailto:${SITE_EMAIL}`} className="pixel-link">
                {SITE_EMAIL}
              </a>{" "}
              –for questions, corrections and anything you would rather not post
              publicly.
            </li>
            <li>
              <a
                href={`${GITHUB_URL}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                className="pixel-link"
              >
                Report a bug or request a feature on GitHub Issues
              </a>{" "}
              –issues are public and tracked.
            </li>
          </ul>
          <p className="mt-4 text-sm leading-7 text-muted">
            For bug reports, please include the shape, diameter and the browser
            you used so the problem can be reproduced.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Before you write
          </h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Most questions are answered on the{" "}
            <Link href="/" className="pixel-link">
              generator page
            </Link>{" "}
            and in our{" "}
            <Link href="/#faq" className="pixel-link">
              FAQ
            </Link>
            . For anything about this website, you can also read the{" "}
            <Link href="/privacy/" className="pixel-link">
              privacy policy
            </Link>{" "}
            and{" "}
            <Link href="/terms/" className="pixel-link">
              terms of use
            </Link>
            .
          </p>
        </section>
      </div>
    </SeoShell>
  );
}
