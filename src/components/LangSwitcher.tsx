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
      className="cursor-pointer border-2 border-mc-border bg-panel-2 px-2 py-1 font-pixel text-[10px] text-ink"
    >
      {Object.entries(localeNames).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}
