import Link from "next/link";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";

const POPULAR_SIZES = [15, 21, 33, 49, 101];

export default async function NotFound() {
  const dict = await getDictionary(defaultLocale);
  return (
    <SeoShell dict={dict} locale={defaultLocale}>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          404 — Page not found
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          That block is missing. Head back to the generator or jump straight
          to a popular circle size below.
        </p>
        <div className="mt-6">
          <Link href="/" className="mc-btn mc-btn-primary inline-block">
            Back to the generator
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {POPULAR_SIZES.map((size) => (
            <Link
              key={size}
              href={`/circle/${size}/`}
              className="mc-btn px-2! py-1! text-[10px]"
            >
              {size}
            </Link>
          ))}
        </div>
      </div>
    </SeoShell>
  );
}
