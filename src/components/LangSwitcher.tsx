"use client";

import {
  localeNames,
  defaultLocale,
  type Locale,
} from "@/lib/i18n/locales";

export default function LangSwitcher({ locale }: { locale: Locale }) {
  return (
    <select
      aria-label="Language"
      value={locale}
      onChange={(e) => {
        const next = e.target.value as Locale;
        window.location.href = next === defaultLocale ? "/" : `/${next}/`;
      }}
      className="rounded-md border border-zinc-300 bg-transparent px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
    >
      {Object.entries(localeNames).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
