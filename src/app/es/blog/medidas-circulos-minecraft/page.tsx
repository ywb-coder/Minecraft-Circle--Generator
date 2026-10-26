import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ArticleMeta from "@/components/ArticleMeta";
import SeoShell from "@/app/_seo/shell";
import ArticleJsonLd from "@/app/_seo/article-jsonld";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Medidas de Círculos en Minecraft: Tabla de Tamaños",
  description:
    "Tabla de medidas de círculos en Minecraft: bloques huecos y rellenos para diámetros 5 a 101, pilas necesarias y qué tamaño elegir según tu construcción.",
  alternates: {
    canonical: `${SITE_URL}/es/blog/medidas-circulos-minecraft/`,
  },
};

const sizeChart = [
  { d: "5", hollow: "12", filled: "17", stacks: "<1", use: "Detalles pequeños" },
  { d: "7", hollow: "16", filled: "33", stacks: "<1", use: "Brocales de pozo" },
  { d: "9", hollow: "32", filled: "57", stacks: "1", use: "Torres de vigilancia" },
  { d: "11", hollow: "28", filled: "89", stacks: "2", use: "Fuentes" },
  { d: "15", hollow: "40", filled: "169", stacks: "3", use: "Bases de torre" },
  { d: "21", hollow: "56", filled: "333", stacks: "6", use: "Arenas" },
  { d: "31", hollow: "84", filled: "729", stacks: "12", use: "Murallas de castillo" },
  { d: "41", hollow: "112", filled: "1.293", stacks: "21", use: "Arenas grandes" },
  { d: "51", hollow: "168", filled: "2.005", stacks: "32", use: "Murallas de ciudad" },
  { d: "65", hollow: "188", filled: "3.273", stacks: "52", use: "Cúpulas gigantes" },
  { d: "81", hollow: "264", filled: "5.097", stacks: "80", use: "Estadios" },
  { d: "101", hollow: "316", filled: "7.957", stacks: "125", use: "Megaconstrucciones" },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuántos bloques necesita un círculo de 21 en Minecraft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Un círculo de 21 bloques usa 56 bloques si es hueco y 333 si es relleno. La columna de pilas redondea hacia arriba la cantidad del relleno, así que necesitas 6 pilas: 5 completas y 13 bloques sueltos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué diferencia hay entre un círculo hueco y uno relleno?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "El hueco es solo el anillo exterior de un bloque; el relleno ocupa también todo el interior. Por eso el relleno usa muchos más bloques. Un pozo o la base de una cúpula suelen ser huecos; una plataforma o un suelo circular, rellenos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuál es el círculo más grande que conviene construir en supervivencia?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para la mayoría de builds de supervivencia, 101 bloques ya es un límite práctico: el contorno hueco usa 316 bloques y el relleno 7.957, unas 125 pilas. Puedes hacer círculos mayores, pero prepara materiales y espacio.",
      },
    },
  ],
};

const faqJsonLdString = JSON.stringify(faqJsonLd).replace(/</g, "\\u003c");

export default async function MedidasCirculosMinecraftPage() {
  const dict = await getDictionary("es");
  return (
    <SeoShell dict={dict} locale="es">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLdString }}
      />
      <ArticleJsonLd
        title="Medidas de Círculos en Minecraft: Tabla de Tamaños"
        description="Tabla de medidas de círculos en Minecraft: bloques huecos y rellenos para diámetros 5 a 101, pilas necesarias y qué tamaño elegir según tu construcción."
        path="/es/blog/medidas-circulos-minecraft/"
        locale="es"
        images={["/shape-pngs/circle-21.png", "/shape-pngs/circle-101.png"]}
        published="2026-10-21"
        updated="2026-10-26"
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          Medidas de Círculos en Minecraft: Tabla de Tamaños
        </h1>
        <ArticleMeta published="2026-10-21" updated="2026-10-26" locale="es" />

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">Respuesta Rápida</h2>
          <div className="mt-3 rounded-sm border-2 border-cyan/30 bg-cyan/5 p-4 text-sm leading-7 text-ink">
            <p>
              Elige el diámetro según el uso y el espacio interior. Para pozos y
              chimeneas, 7–9 bloques; para torres, 9–21; para arenas, 21–41; para
              cúpulas y murallas, 31–51. Los tamaños de 65 en adelante son para
              proyectos que se ven desde lejos.
            </p>
            <p className="mt-2">
              Antes de picar piedra, consulta la tabla: un círculo{" "}
              <strong className="text-ink">hueco</strong> y uno{" "}
              <strong className="text-ink">relleno</strong> del mismo diámetro no
              usan la misma cantidad de bloques.
            </p>
            <p className="mt-2">
              Contornos más consultados:{" "}
              <strong className="text-ink">15 → 40 bloques</strong>,{" "}
              <strong className="text-ink">21 → 56</strong>,{" "}
              <strong className="text-ink">31 → 84</strong>,{" "}
              <strong className="text-ink">41 → 112</strong>,{" "}
              <strong className="text-ink">101 → 316</strong>.
            </p>
          </div>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Hueco y Relleno: Dos Formas de Medir el Mismo Círculo
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            El <strong className="text-ink">círculo hueco</strong> es el anillo
            exterior: una banda de bloques que dibuja la curva y deja el centro
            vacío. Sirve para el brocal de un pozo, el borde de una plataforma o
            la base de una cúpula. El{" "}
            <strong className="text-ink">círculo relleno</strong> ocupa también
            todo el interior, así que sirve para suelos, plataformas y
            superficies que deben sostener peso o impedir el paso.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            La diferencia de material crece rápido con el diámetro. En un círculo
            pequeño apenas se nota, pero a partir de 31 o 41 bloques el relleno
            puede multiplicar por varias veces la cantidad del anillo. Decide
            desde el principio si vas a construir el borde o la superficie
            completa.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Tabla de Medidas de Círculos
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Los conteos de bloques vienen del plano de CircleGen y se mantienen
            tal cual para que puedas comparar tamaños sin recalcular a mano.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm text-ink">
              <thead>
                <tr className="border-b-2 border-mc-border">
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Diámetro
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Bloques huecos
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Bloques rellenos
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Pilas necesarias
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Ideal para
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm leading-7">
                {sizeChart.map((row) => (
                  <tr
                    key={row.d}
                    className="border-b border-mc-border/50 last:border-b-0"
                  >
                    <td className="px-3 py-2">{row.d}</td>
                    <td className="px-3 py-2">{row.hollow}</td>
                    <td className="px-3 py-2">{row.filled}</td>
                    <td className="px-3 py-2">{row.stacks}</td>
                    <td className="px-3 py-2">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            La columna de pilas se refiere al círculo relleno y redondea hacia
            arriba: una pila contiene 64 bloques. Si construyes el anillo hueco,
            usa la columna de bloques huecos, que siempre es más económica.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            En diámetros pequeños el conteo puede subir o bajar entre filas
            cercanas: la cuadrícula no crece de forma lineal. Usa siempre la
            fila del diámetro exacto.
          </p>
          <figure className="mt-5 border-2 border-mc-border bg-panel-2 p-3">
            <img
              src="/shape-pngs/circle-101.png"
              alt="Diagrama generado de un círculo de Minecraft de 101 bloques de diámetro para megaconstrucciones"
              width={424}
              height={424}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-[280px] [image-rendering:pixelated]"
            />
            <figcaption className="mt-3 text-sm leading-6 text-muted">
              Diagrama generado, no una captura del juego: el diámetro 101 usa
              316 bloques de contorno y 7.957 bloques si se rellena. Es un tamaño
              de proyecto grande, no una decoración rápida.
            </figcaption>
          </figure>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Cómo Planificar las Pilas de Bloques
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Una pila de Minecraft contiene 64 bloques. Para el círculo hueco,
            divide los bloques entre 64 y redondea hacia arriba; para el relleno,
            usa la columna de pilas directamente. Un círculo de 21, por ejemplo,
            necesita 56 bloques huecos y 333 rellenos: 5 pilas completas y 13
            bloques sueltos, es decir, 6 pilas en total.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Añade un margen del 10–15 % si construyes a mano. No es una regla del
            juego, sino una precaución: siempre se coloca algún bloque en la
            posición equivocada. Si apilas el mismo anillo en varias capas (por
            ejemplo, una torre), multiplica el material del anillo por el número
            de capas; en una cúpula o esfera, cada capa usa un anillo distinto.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Las pilas de la tabla son una guía de compra. Puedes llevar los
            bloques en cofres o shulker boxes; lo importante es saber cuántos
            necesitas antes de empezar a minar.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Cómo Elegir el Diámetro
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Distancia de visión:</strong> si la
              estructura se verá desde lejos, un diámetro mayor produce una curva
              más limpia. Para un detalle de cerca, un tamaño pequeño puede
              bastar.
            </li>
            <li>
              <strong className="text-ink">Espacio interior:</strong> con un
              anillo de un bloque, el interior mide unos dos bloques menos que el
              diámetro. Un círculo de 15 deja unos 13 bloques; uno de 21, unos
              19. Comprueba que caben escaleras, cofres o mobiliario.
            </li>
            <li>
              <strong className="text-ink">Grosor de la pared:</strong> un muro
              grueso reduce todavía más el interior. Decide el grosor antes de
              elegir el diámetro exterior.
            </li>
            <li>
              <strong className="text-ink">Materiales:</strong> el relleno crece
              con el área, no solo con el borde. Un diámetro 31 relleno son 729
              bloques; uno de 51 son 2.005. En supervivencia, empieza por el
              anillo y valora si necesitas cerrar el centro.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Tamaños Recomendados por Tipo de Construcción
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Pozos y chimeneas:</strong> 7–9
              bloques. El brocal se ve proporcionado y el hueco basta para el agua
              o el humo.
            </li>
            <li>
              <strong className="text-ink">Torres y torres de vigilancia:</strong>{" "}
              9–21 bloques. Con el{" "}
              <Link href="/es/circle/15/" className="pixel-link">
                círculo de 15
              </Link>{" "}
              o el{" "}
              <Link href="/es/circle/21/" className="pixel-link">
                círculo de 21
              </Link>{" "}
              cabe una escalera de caracol y una sala por planta; con 9, la torre
              es más esbelta.
            </li>
            <li>
              <strong className="text-ink">Arenas y salas:</strong> 21–41 bloques.
              Desde 21 hay espacio para combatir o colocar gradas; 31 y 41
              permiten varios niveles y un techo circular.
            </li>
            <li>
              <strong className="text-ink">Cúpulas y murallas:</strong> 31–51
              bloques. La base de una cúpula necesita un anillo amplio; las
              murallas se leen mejor con diámetros grandes.
            </li>
            <li>
              <strong className="text-ink">Estadios y megaconstrucciones:</strong>{" "}
              51–101 bloques. Son proyectos de planificación larga y mucho
              material.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            De la Medida a la Construcción en Seis Pasos
          </h2>
          <ol className="mt-3 space-y-3 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">1. Define el uso y el espacio.</strong>{" "}
              Mide cuánto necesitas dentro y elige un diámetro que deje margen
              para paredes y decoración.
            </li>
            <li>
              <strong className="text-ink">2. Anota el conteo de bloques.</strong>{" "}
              Apunta las columnas de hueco y relleno y decide cuál de las dos
              versiones vas a construir.
            </li>
            <li>
              <strong className="text-ink">3. Marca el centro.</strong> Coloca un
              bloque temporal y traza los cuatro ejes. Con un diámetro impar, el
              centro es un único bloque y la simetría se comprueba mejor.
            </li>
            <li>
              <strong className="text-ink">4. Dibuja el anillo.</strong> Copia el
              patrón cuadrante por cuadrante y verifica el diámetro en los dos
              ejes.
            </li>
            <li>
              <strong className="text-ink">5. Decide si rellenas.</strong> Si el
              círculo es una plataforma, rellena desde el borde hacia dentro. Si
              es la base de una cúpula o un pozo, deja el centro vacío.
            </li>
            <li>
              <strong className="text-ink">6. Revisa antes de decorar.</strong>{" "}
              Camina por el borde y mira la curva desde varios ángulos. Corregir
              un bloque ahora es más barato que desmontar una pared.
            </li>
          </ol>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Errores Comunes con las Medidas
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Calcular el relleno con la fórmula del círculo perfecto.</strong>{" "}
              La cuadrícula no usa la misma cantidad que una circunferencia
              geométrica. Usa el conteo del plano para no quedarte corto.
            </li>
            <li>
              <strong className="text-ink">Contar el anillo como si fuera el área.</strong>{" "}
              Un diámetro 51 hueco son 168 bloques; el relleno son 2.005. Son dos
              presupuestos distintos.
            </li>
            <li>
              <strong className="text-ink">Elegir un diámetro par para una torre.</strong>{" "}
              El centro de 2×2 complica un pilar o una escalera central. Para
              torres, un impar suele ser más práctico.
            </li>
            <li>
              <strong className="text-ink">Olvidar el grosor de la pared.</strong>{" "}
              Un anillo grueso reduce el interior. Si necesitas una sala amplia,
              sube el diámetro exterior o mantén el muro en un bloque.
            </li>
            <li>
              <strong className="text-ink">Empezar sin material suficiente.</strong>{" "}
              Revisa la tabla y añade margen. Quedarse sin bloques a mitad de la
              curva obliga a cambiar el diseño o a dejar la obra a medias.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Cómo se Hizo Esta Guía
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Los conteos salen de la misma matemática de cuadrícula que usa
            CircleGen y se comprobaron contra la salida del generador, no se
            estimaron a ojo. La guía explica cómo leer las medidas; no afirmamos
            haber probado cada tamaño dentro del juego.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Si un conteo no coincide con el plano que ves en el generador,
            envíanos la corrección desde la{" "}
            <Link href="/contact/" className="pixel-link">
              página de contacto
            </Link>{" "}
            y lo revisaremos.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Preguntas Frecuentes
          </h2>
          <div className="mt-3 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Cuántos bloques necesita un círculo de 21 en Minecraft?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Un círculo de 21 bloques usa 56 bloques si es hueco y 333 si es
                relleno. La columna de pilas redondea hacia arriba la cantidad del
                relleno, así que necesitas 6 pilas: 5 completas y 13 bloques
                sueltos.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Qué diferencia hay entre un círculo hueco y uno relleno?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                El hueco es solo el anillo exterior de un bloque; el relleno ocupa
                también todo el interior. Por eso el relleno usa muchos más
                bloques. Un pozo o la base de una cúpula suelen ser huecos; una
                plataforma o un suelo circular, rellenos.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Cuál es el círculo más grande que conviene construir en
                supervivencia?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Para la mayoría de builds de supervivencia, 101 bloques ya es un
                límite práctico: el contorno hueco usa 316 bloques y el relleno
                7.957, unas 125 pilas. Puedes hacer círculos mayores, pero prepara
                materiales y espacio.
              </p>
            </div>
          </div>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Guías Relacionadas
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <Link
                href="/es/blog/como-hacer-circulos-minecraft/"
                className="pixel-link"
              >
                Cómo hacer un círculo en Minecraft paso a paso
              </Link>{" "}
              — el método para trasladar estas medidas al juego.
            </li>
            <li>
              <Link
                href="/es/blog/como-hacer-esfera-minecraft/"
                className="pixel-link"
              >
                Cómo hacer una esfera en Minecraft por capas
              </Link>{" "}
              — el siguiente paso después de dominar el círculo.
            </li>
            <li>
              <Link
                href="/es/blog/como-hacer-ovalo-minecraft/"
                className="pixel-link"
              >
                Cómo hacer un óvalo en Minecraft
              </Link>{" "}
              — medidas de ancho y alto para formas alargadas.
            </li>
            <li>
              <Link href="/es/circle/21/" className="pixel-link">
                Plano de círculo de 21 bloques
              </Link>{" "}
              — 56 bloques huecos y 333 rellenos.
            </li>
          </ul>
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
