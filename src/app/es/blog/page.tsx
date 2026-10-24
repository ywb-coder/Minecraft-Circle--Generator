import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ArticleMeta from "@/components/ArticleMeta";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Blog: Guías y Consejos para Construir en Minecraft",
  description:
    "Guías y consejos para construir mejor en Minecraft: círculos perfectos, óvalos, esferas, cúpulas y tamaños de bloques explicados paso a paso.",
  alternates: { canonical: `${SITE_URL}/es/blog/` },
};

export default async function BlogEsPage() {
  const dict = await getDictionary("es");
  return (
    <SeoShell dict={dict} locale="es">
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          Blog
        </h1>

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">Guías de Construcción</h2>
          <div className="mt-3 space-y-4">
            <div className="flex gap-4">
              <div className="shrink-0 border-2 border-mc-border bg-panel-2">
                <img
                  src="/shape-pngs/oval-21-9.png"
                  alt="Miniatura del plano generado de un óvalo de 21 por 9 bloques"
                  width={461}
                  height={209}
                  loading="lazy"
                  className="h-20 w-20 object-contain [image-rendering:pixelated]"
                />
              </div>
              <div>
                <Link
                  href="/es/blog/como-hacer-ovalo-minecraft/"
                  className="pixel-link text-sm font-bold"
                >
                  Cómo Hacer un Óvalo en Minecraft: Guía Paso a Paso
                </Link>
                <ArticleMeta
                  published="2026-10-23"
                  updated="2026-10-23"
                  locale="es"
                />
                <p className="mt-1 text-sm leading-7 text-muted">
                  Construye un óvalo con planos de ancho y alto: marca los ejes,
                  copia los cuadrantes, elige contorno o relleno y corrige la
                  simetría antes de rellenar.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 border-2 border-mc-border bg-panel-2">
                <img
                  src="/shape-pngs/circle-31.png"
                  alt="Miniatura de un diagrama de círculo de 31 bloques usado como referencia de capas para una esfera"
                  width={454}
                  height={454}
                  loading="lazy"
                  className="h-20 w-20 [image-rendering:pixelated]"
                />
              </div>
              <div>
                <Link
                  href="/es/blog/como-hacer-esfera-minecraft/"
                  className="pixel-link text-sm font-bold"
                >
                  Cómo Hacer una Esfera en Minecraft: Guía por Capas
                </Link>
                <ArticleMeta
                  published="2026-10-21"
                  updated="2026-10-21"
                  locale="es"
                />
                <p className="mt-1 text-sm leading-7 text-muted">
                  Construye una esfera apilando círculos: empieza por el
                  ecuador, elige un diámetro impar y decide entre cáscara hueca
                  o relleno antes de colocar la primera capa.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 border-2 border-mc-border bg-panel-2">
                <img
                  src="/shape-pngs/circle-101.png"
                  alt="Miniatura de un diagrama de círculo de 101 bloques para la tabla de medidas"
                  width={424}
                  height={424}
                  loading="lazy"
                  className="h-20 w-20 [image-rendering:pixelated]"
                />
              </div>
              <div>
                <Link
                  href="/es/blog/medidas-circulos-minecraft/"
                  className="pixel-link text-sm font-bold"
                >
                  Medidas de Círculos en Minecraft: Tabla de Tamaños
                </Link>
                <ArticleMeta
                  published="2026-10-21"
                  updated="2026-10-21"
                  locale="es"
                />
                <p className="mt-1 text-sm leading-7 text-muted">
                  Consulta bloques huecos y rellenos para diámetros de 5 a 101,
                  calcula las pilas necesarias y elige el tamaño según tu
                  construcción.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="shrink-0 border-2 border-mc-border bg-panel-2">
                <img
                  src="/shape-pngs/circle-15.png"
                  alt="Miniatura del plano generado de un círculo de 15 bloques"
                  width={380}
                  height={380}
                  loading="lazy"
                  className="h-20 w-20 [image-rendering:pixelated]"
                />
              </div>
              <div>
                <Link
                  href="/es/blog/como-hacer-circulos-minecraft/"
                  className="pixel-link text-sm font-bold"
                >
                  Cómo Hacer un Círculo en Minecraft: Guía Paso a Paso
                </Link>
                <ArticleMeta
                  published="2026-10-21"
                  updated="2026-10-21"
                  locale="es"
                />
                <p className="mt-1 text-sm leading-7 text-muted">
                  Aprende a hacer círculos perfectos en Minecraft: diámetros
                  impares y pares, construcción paso a paso, tabla de tamaños y
                  errores comunes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <Link href="/es/" className="pixel-link text-sm">
            ← Volver al generador
          </Link>
        </div>
      </div>
    </SeoShell>
  );
}
