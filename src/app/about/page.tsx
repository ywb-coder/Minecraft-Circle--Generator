import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";
import { GITHUB_URL, SOURCES, SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "About 鈥?Minecraft Circle Generator",
  description:
    "About CircleGen, the free Minecraft circle generator. How the block-by-block blueprint algorithm works, why it is free, and who builds it.",
  alternates: { canonical: `${SITE_URL}/about/` },
};

export default async function AboutPage() {
  const dict = await getDictionary(defaultLocale);
  return (
    <SeoShell dict={dict} locale={defaultLocale}>
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          About CircleGen
        </h1>

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            What this site does
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            CircleGen is a free Minecraft circle generator. It turns any
            diameter from 5 to 256 blocks into a block-by-block pixel blueprint
            for circles, ovals, spheres, domes and arcs. Every blueprint works
            identically in Java Edition and Bedrock Edition, and everything on
            this site is free 鈥?no accounts, no paywalls, no ads.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            How the generator works
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            The tool renders a discrete circle on the pixel grid: for a chosen
            diameter, every cell whose center distance from the middle falls in
            the half-block ring around the radius is marked as a block. That is
            the same family of math as the midpoint circle algorithm, and it is
            why odd diameters produce a clean, symmetric ring. Spheres and
            domes are built by stacking rings, one layer per slice, from the
            bottom up.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            The methodology is documented by the following public references:
          </p>
          <ul className="mt-3 list-disc pl-6 text-sm leading-7 text-ink">
            {SOURCES.map((source) => (
              <li key={source.url} className="my-1">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pixel-link"
                >
                  {source.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Who builds it
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            CircleGen is made by the CircleGen Team 鈥?a small group of
            Minecraft builders who got tired of squinting at circle charts. The
            source code is open on{" "}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-link"
            >
              GitHub
            </a>
            , and you can reach us any time via the{" "}
            <Link href="/contact/" className="pixel-link">
              contact page
            </Link>{" "}
            or by opening an issue on GitHub.
          </p>
        </section>
      </div>
    </SeoShell>
  );
}
