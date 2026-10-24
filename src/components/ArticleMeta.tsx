import Link from "@/components/StaticLink";

type ArticleLocale = "en" | "es";

const MONTHS: Record<ArticleLocale, string[]> = {
  en: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  es: [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ],
};

function formatDate(value: string, locale: ArticleLocale): string {
  const [year, month, day] = value.split("-");
  const monthName = MONTHS[locale][Number(month) - 1];
  if (!year || !monthName || !day) return value;

  return locale === "es"
    ? `${Number(day)} ${monthName} ${year}`
    : `${monthName} ${Number(day)}, ${year}`;
}

const LABELS: Record<
  ArticleLocale,
  { by: string; published: string; updated: string }
> = {
  en: { by: "By", published: "Published", updated: "Updated" },
  es: { by: "Por", published: "Publicado", updated: "Actualizado" },
};

export default function ArticleMeta({
  published,
  updated,
  locale = "en",
}: {
  published: string;
  updated: string;
  locale?: ArticleLocale;
}) {
  const labels = LABELS[locale];

  return (
    <p className="mt-3 text-sm text-muted">
      {labels.by}{" "}
      <Link href="/about/" className="pixel-link">
        CircleGen
      </Link>
      <span aria-hidden="true"> · </span>
      {labels.published}{" "}
      <time dateTime={published}>{formatDate(published, locale)}</time>
      <span aria-hidden="true"> · </span>
      {labels.updated}{" "}
      <time dateTime={updated}>{formatDate(updated, locale)}</time>
    </p>
  );
}
