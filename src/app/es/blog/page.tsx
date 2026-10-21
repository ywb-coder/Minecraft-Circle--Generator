import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Blog: Guías y Consejos para Construir en Minecraft",
  description:
    "Guías y consejos para construir mejor en Minecraft: círculos perfectos, esferas, cúpulas y tamaños de bloques explicados paso a paso.",
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
            <div>
              <Link
                href="/es/blog/como-hacer-circulos-minecraft/"
                className="pixel-link text-sm font-bold"
              >
                Cómo Hacer un Círculo en Minecraft: Guía Paso a Paso
              </Link>
              <p className="mt-1 text-sm leading-7 text-muted">
                Aprende a hacer círculos perfectos en Minecraft: diámetros
                impares y pares, construcción paso a paso, tabla de tamaños y
                errores comunes.
              </p>
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
