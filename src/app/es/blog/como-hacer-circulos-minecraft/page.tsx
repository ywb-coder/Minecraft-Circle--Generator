import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cómo Hacer un Círculo en Minecraft — Guía Paso a Paso",
  description:
    "Aprende a hacer círculos perfectos en Minecraft: elige el diámetro, sigue el patrón de bloques y usa la tabla de tamaños. Funciona en Java y Bedrock.",
  alternates: {
    canonical: `${SITE_URL}/es/blog/como-hacer-circulos-minecraft/`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cómo se hace un círculo perfecto en Minecraft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Elige un diámetro impar (7, 9, 11, 15…), marca el bloque central y coloca los bloques siguiendo un patrón simétrico desde los cuatro ejes. El generador de CircleGen te muestra el patrón exacto bloque por bloque para cualquier diámetro.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuántos bloques necesito para un círculo en Minecraft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depende del diámetro y de si el círculo es hueco o relleno. Un contorno de diámetro 15 usa 40 bloques, uno de 21 usa 56 y uno de 31 usa 84. El generador calcula el número exacto para cualquier tamaño.",
      },
    },
    {
      "@type": "Question",
      name: "¿Los círculos funcionan igual en Java y Bedrock?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. El patrón es una cuadrícula de posiciones de bloques, así que funciona igual en Java Edition y en Bedrock Edition.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuál es el mejor diámetro para una torre?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para la base de una torre, un diámetro de 15 a 21 bloques suele ser el mejor equilibrio entre espacio interior y recursos. Si quieres una torre más esbelta, usa 11 o 13; para una torre grande, 25 o 31.",
      },
    },
  ],
};

export default async function ComoHacerCirculosMinecraftPage() {
  const dict = await getDictionary("es");
  return (
    <SeoShell dict={dict} locale="es">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          Cómo Hacer un Círculo en Minecraft: Guía Paso a Paso
        </h1>

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">Respuesta Rápida</h2>
          <div className="mt-3 rounded-sm border-2 border-cyan/30 bg-cyan/5 p-4 text-sm leading-7 text-ink">
            <p>
              Para hacer un círculo perfecto en Minecraft, elige un{" "}
              <strong className="text-ink">diámetro impar</strong> (7, 9, 11,
              15…), marca el bloque central y coloca los bloques siguiendo un
              patrón simétrico. Cuanto mayor sea el diámetro, más suave se verá
              la curva.
            </p>
            <p className="mt-2">
              El{" "}
              <Link href="/es/" className="pixel-link">
                generador de círculos de CircleGen
              </Link>{" "}
              te da el patrón exacto bloque por bloque para cualquier tamaño.
            </p>
          </div>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Por Qué los Círculos Son Difíciles en Minecraft
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Minecraft está construido sobre una cuadrícula de bloques
            cuadrados. No existen bordes curvos, así que cada círculo es una
            aproximación: un anillo de píxeles que parece redondo desde lejos.
            La clave es que cuanto mayor sea el diámetro, más suave se verá la
            curva. Un círculo de 5 bloques es claramente dentado, pero uno de 31
            bloques se ve como un anillo limpio incluso de cerca.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            CircleGen usa el algoritmo del punto medio para colocar los bloques
            donde su centro queda a menos de medio bloque del radio. Así se
            obtiene el círculo de píxeles más preciso para cada diámetro.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Diámetro Impar o Par
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Los <strong className="text-ink">diámetros impares</strong> (5, 7, 9,
            11…) tienen un único bloque central. Son ideales para torres,
            pilares y cualquier construcción donde necesites un punto central
            para un techo, un faro o una columna.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Los <strong className="text-ink">diámetros pares</strong> (6, 8, 10,
            12…) tienen un centro de 2×2 bloques. Funcionan bien para muros,
            cercados y construcciones donde no necesitas un bloque central,
            sobre todo para rodear una estructura existente.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Para empezar, se recomiendan los diámetros impares: el bloque
            central hace que la colocación sea más sencilla y el círculo
            resultante siempre es simétrico en ambos ejes.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Cómo Construir un Círculo Paso a Paso
          </h2>
          <ol className="mt-3 space-y-3 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">1. Elige un diámetro impar.</strong>{" "}
              Escoge un tamaño que encaje en tu construcción. Los números
              impares (7, 9, 11, 15…) te dan un único bloque central.
            </li>
            <li>
              <strong className="text-ink">2. Marca el bloque central.</strong>{" "}
              Coloca un bloque donde quieras el centro del círculo. Será tu
              punto de referencia para todo lo demás.
            </li>
            <li>
              <strong className="text-ink">3. Construye los cuatro ejes.</strong>{" "}
              Desde el centro, cuenta hacia fuera en las cuatro direcciones
              (norte, sur, este y oeste) y coloca un bloque a la distancia del
              radio. Para un círculo de diámetro 9, son 4 bloques desde el
              centro en cada dirección.
            </li>
            <li>
              <strong className="text-ink">4. Conecta las puntas.</strong> Entre
              cada par de extremos, añade bloques para formar la curva. El plano
              de CircleGen te muestra exactamente qué celdas rellenar en cada
              cuadrante.
            </li>
            <li>
              <strong className="text-ink">5. Copia los cuadrantes.</strong>{" "}
              Cuando tengas un cuadrante, copia el patrón en los otros tres.
              Todo círculo de píxeles es simétrico en los ejes horizontal y
              vertical.
            </li>
          </ol>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Tabla de Tamaños de Círculos
          </h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm text-ink">
              <thead>
                <tr className="border-b-2 border-mc-border">
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Diámetro
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Bloques (contorno)
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Ideal para
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm leading-7">
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">7</td>
                  <td className="px-3 py-2">16</td>
                  <td className="px-3 py-2">Pozos, chimeneas</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">9</td>
                  <td className="px-3 py-2">32</td>
                  <td className="px-3 py-2">Torres de vigilancia, estanques</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">11</td>
                  <td className="px-3 py-2">28</td>
                  <td className="px-3 py-2">Fuentes, habitaciones pequeñas</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">15</td>
                  <td className="px-3 py-2">40</td>
                  <td className="px-3 py-2">Bases de torre</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">21</td>
                  <td className="px-3 py-2">56</td>
                  <td className="px-3 py-2">Arenas, salas grandes</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">31</td>
                  <td className="px-3 py-2">84</td>
                  <td className="px-3 py-2">Murallas de castillo, bases de cúpula</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">41</td>
                  <td className="px-3 py-2">112</td>
                  <td className="px-3 py-2">Arenas grandes</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">51</td>
                  <td className="px-3 py-2">168</td>
                  <td className="px-3 py-2">Murallas de ciudad</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            Los números son los del plano exacto de CircleGen. En diámetros
            pequeños el contorno puede ocupar dos bloques en algunos puntos, así
            que la cantidad no siempre sube de forma lineal. Un círculo relleno
            usa muchos más bloques.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Planos Listos para Usar
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Si ya sabes el tamaño que necesitas, abre directamente el plano:
          </p>
          <ul className="mt-3 grid gap-2 text-sm leading-7 text-ink sm:grid-cols-2">
            <li>
              <Link href="/es/circle/15/" className="pixel-link">
                Círculo de 15 bloques — 40 bloques
              </Link>
            </li>
            <li>
              <Link href="/es/circle/21/" className="pixel-link">
                Círculo de 21 bloques — 56 bloques
              </Link>
            </li>
            <li>
              <Link href="/es/circle/33/" className="pixel-link">
                Círculo de 33 bloques — 112 bloques
              </Link>
            </li>
            <li>
              <Link href="/es/circle/41/" className="pixel-link">
                Círculo de 41 bloques — 112 bloques
              </Link>
            </li>
            <li>
              <Link href="/es/circle/101/" className="pixel-link">
                Círculo de 101 bloques — 316 bloques
              </Link>
            </li>
            <li>
              <Link href="/es/sphere/15/" className="pixel-link">
                Esfera de 15 bloques
              </Link>
            </li>
            <li>
              <Link href="/es/dome/15/" className="pixel-link">
                Cúpula de 15 bloques
              </Link>
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Errores Comunes que Debes Evitar
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">
                Usar diámetros pares cuando necesitas un centro.
              </strong>{" "}
              Los círculos pares tienen un centro de 2×2, lo que impide colocar
              un pilar, un faro o el centro de un techo. Usa siempre diámetros
              impares para torres.
            </li>
            <li>
              <strong className="text-ink">Improvisar la colocación.</strong>{" "}
              Calcular a ojo produce resultados asimétricos. Usa un plano para
              saber exactamente qué celdas rellenar antes de empezar.
            </li>
            <li>
              <strong className="text-ink">
                Confundir círculo hueco con relleno.
              </strong>{" "}
              Un círculo hueco y uno relleno usan cantidades de bloques muy
              distintas. Una base de cúpula es hueca; una plataforma es rellena.
            </li>
            <li>
              <strong className="text-ink">Empezar demasiado pequeño.</strong>{" "}
              Los círculos de diámetro 5–7 se ven muy dentados. Si te importa la
              estética, usa al menos 9 u 11 para curvas visibles, y 21 o más
              para resultados suaves.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Preguntas Frecuentes
          </h2>
          <div className="mt-3 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Cómo se hace un círculo perfecto en Minecraft?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Elige un diámetro impar (7, 9, 11, 15…), marca el bloque central
                y coloca los bloques siguiendo un patrón simétrico desde los
                cuatro ejes. El{" "}
                <Link href="/es/" className="pixel-link">
                  generador de CircleGen
                </Link>{" "}
                te muestra el patrón exacto bloque por bloque.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Cuántos bloques necesito para un círculo?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Depende del diámetro y de si es hueco o relleno. Un contorno de
                diámetro 15 usa 40 bloques, uno de 21 usa 56 y uno de 31 usa 84.
                Usa la tabla de arriba o el generador para obtener el número
                exacto.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Los círculos funcionan igual en Java y Bedrock?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Sí. El patrón es una cuadrícula de posiciones de bloques, así
                que funciona igual en Java Edition y en Bedrock Edition.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Cuál es el mejor diámetro para una torre?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Para la base de una torre, un diámetro de 15 a 21 bloques suele
                ser el mejor equilibrio entre espacio interior y recursos. Para
                una torre esbelta, usa 11 o 13; para una torre grande, 25 o 31.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <Link href="/es/blog/" className="pixel-link text-sm">
            ← Volver al blog
          </Link>
        </div>
      </div>
    </SeoShell>
  );
}
