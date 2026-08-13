"use client";

import { useEffect, useState } from "react";
import Link from "@/components/StaticLink";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/locales";

const T: Record<Locale, { title: string; body: string; back: string }> = {
  en: {
    title: "404 – Page not found",
    body: "That block is missing. Head back to the generator or jump straight to a popular circle size below.",
    back: "Back to the generator",
  },
  de: {
    title: "404 – Seite nicht gefunden",
    body: "Dieser Block fehlt. Gehe zurück zum Generator oder springe direkt zu einer beliebten Kreisgröße unten.",
    back: "Zurück zum Generator",
  },
  es: {
    title: "404 – Página no encontrada",
    body: "Ese bloque falta. Vuelve al generador o salta directamente a un tamaño de círculo popular de abajo.",
    back: "Volver al generador",
  },
  fr: {
    title: "404 – Page introuvable",
    body: "Ce bloc est manquant. Revenez au générateur ou passez directement à une taille de cercle populaire ci-dessous.",
    back: "Retour au générateur",
  },
  pt: {
    title: "404 – Página não encontrada",
    body: "Esse bloco está faltando. Volte ao gerador ou pule direto para um tamanho de círculo popular abaixo.",
    back: "Voltar ao gerador",
  },
  tr: {
    title: "404 – Sayfa bulunamadı",
    body: "Bu blok eksik. Jeneratöre geri dönün veya aşağıdaki popüler bir daire boyutuna atlayın.",
    back: "Jeneratöre geri dön",
  },
  it: {
    title: "404 – Pagina non trovata",
    body: "Quel blocco manca. Torna al generatore o vai direttamente a una dimensione di cerchio popolare qui sotto.",
    back: "Torna al generatore",
  },
  ru: {
    title: "404 – Страница не найдена",
    body: "Этого блока нет. Вернитесь к генератору или перейдите к популярному размеру круга ниже.",
    back: "Вернуться к генератору",
  },
  pl: {
    title: "404 – Nie znaleziono strony",
    body: "Tego bloku brakuje. Wróć do generatora lub przejdź bezpośrednio do popularnego rozmiaru koła poniżej.",
    back: "Wróć do generatora",
  },
  id: {
    title: "404 – Halaman tidak ditemukan",
    body: "Blok itu hilang. Kembali ke generator atau langsung ke ukuran lingkaran populer di bawah ini.",
    back: "Kembali ke generator",
  },
  zh: {
    title: "404 – 页面未找到",
    body: "找不到这个页面。返回生成器,或直接跳转到下方常用圆形尺寸。",
    back: "返回生成器",
  },
};

const POPULAR_SIZES = [15, 21, 33, 49, 101];

export default function Localized404() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const seg = window.location.pathname.split("/")[1] ?? "";
      if (isLocale(seg)) setLocale(seg as Locale);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const t = T[locale];
  const prefix = locale === defaultLocale ? "" : `/${locale}`;

  return (
    <div className="mx-auto max-w-3xl text-center">
      <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
        {t.title}
      </h1>
      <p className="mt-4 text-base leading-7 text-muted">{t.body}</p>
      <div className="mt-6">
        <Link href={prefix ? `${prefix}/` : "/"} className="mc-btn mc-btn-primary inline-block">
          {t.back}
        </Link>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {POPULAR_SIZES.map((size) => (
          <Link
            key={size}
            href={`${prefix}/circle/${size}/`}
            className="mc-btn px-2! py-1! text-[10px]"
          >
            {size}
          </Link>
        ))}
      </div>
    </div>
  );
}
