import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ArticleMeta from "@/components/ArticleMeta";
import SeoShell from "@/app/_seo/shell";
import ArticleJsonLd from "@/app/_seo/article-jsonld";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/config";

const TITLE = "Cómo Hacer un Óvalo en Minecraft: Guía Paso a Paso";
const DESCRIPTION =
  "Aprende a construir un óvalo en Minecraft con planos de ancho y alto: ejes, cuadrantes, contorno o relleno, tamaños recomendados y errores de simetría.";
const PATH = "/es/blog/como-hacer-ovalo-minecraft/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}${PATH}`,
  },
};

const ovalSizes = [
  {
    size: "15×7",
    outline: "42",
    filled: "69",
    stacks: "2",
    use: "Ventana o fuente pequeña",
  },
  {
    size: "21×9",
    outline: "62",
    filled: "133",
    stacks: "3",
    use: "Estanque o mesa",
  },
  {
    size: "31×15",
    outline: "90",
    filled: "337",
    stacks: "6",
    use: "Arena o patio",
  },
  {
    size: "41×21",
    outline: "122",
    filled: "641",
    stacks: "11",
    use: "Plaza o piscina grande",
  },
] as const;

const faqItems = [
  {
    question: "¿Un óvalo de Minecraft es igual que una elipse?",
    answer:
      "No del todo. Una elipse es una curva geométrica continua; el óvalo de Minecraft es una aproximación sobre la cuadrícula. La silueta recuerda a una elipse, pero sus bordes avanzan en escalones y el plano marca casillas, no una ecuación exacta.",
  },
  {
    question: "¿Qué tamaño de óvalo debería construir?",
    answer:
      "Depende del hueco y del uso. Un 15×7 sirve para una ventana o fuente; un 21×9 es versátil para estanques y mesas; un 31×15 encaja en una arena o patio; y un 41×21 es para plazas o piscinas grandes. Comprueba el interior y los bloques antes de empezar.",
  },
  {
    question: "¿Puedo hacer un óvalo hueco?",
    answer:
      "Sí. Un contorno de un bloque ya deja el interior vacío. En un 21×9, el hueco nominal mide 19×7, aunque la curva estrecha los extremos. Con una pared más gruesa el interior se reduce y debes recalcular el material; el relleno completo ocupa toda la superficie.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const faqJsonLdString = JSON.stringify(faqJsonLd).replace(/</g, "\\u003c");

export default async function ComoHacerOvaloMinecraftPage() {
  const dict = await getDictionary("es");
  return (
    <SeoShell dict={dict} locale="es">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLdString }}
      />
      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        path={PATH}
        locale="es"
        images={["/shape-pngs/oval-21-9.png"]}
        published="2026-10-23"
        updated="2026-10-23"
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          {TITLE}
        </h1>
        <ArticleMeta published="2026-10-23" updated="2026-10-23" locale="es" />

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">Respuesta Rápida</h2>
          <div className="mt-3 rounded-sm border-2 border-cyan/30 bg-cyan/5 p-4 text-sm leading-7 text-ink">
            <p>
              Un óvalo en Minecraft es un{" "}
              <strong className="text-ink">contorno de bloques</strong> más ancho
              que alto. No hay bloques curvos: el plano indica qué casillas
              ocupar. Fija el ancho y el alto, marca el centro y los cuatro
              extremos, y copia un cuadrante en los demás. Construye el contorno
              antes de rellenar.
            </p>
            <p className="mt-2">
              El{" "}
              <Link href="/es/oval/21/9/" className="pixel-link">
                plano de óvalo de 21×9
              </Link>{" "}
              es un buen punto de partida.
            </p>
          </div>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Un Óvalo es una Curva Aproximada
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Minecraft trabaja sobre una cuadrícula cúbica, así que toda curva
            avanza en escalones. Un óvalo es una forma cerrada estirada sobre dos
            ejes: el <strong className="text-ink">ancho</strong> horizontal y el{" "}
            <strong className="text-ink">alto</strong> vertical. No es una
            elipse exacta, sino una aproximación de bloques que se lee como
            óvalo.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Un círculo es el caso en que ambos ejes miden lo mismo. Al separarlos,
            la forma se alarga; cuanto mayor sea la diferencia entre ancho y
            alto, más plano se verá el resultado. El contorno ocupa un
            rectángulo de ancho × alto y avanza en escalones.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Cómo Elegir el Ancho y el Alto
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            El ancho es el eje horizontal largo; el alto, el vertical corto.
            CircleGen usa pares impares como 15×7, 21×9, 25×13, 31×15 y 41×21.
            Los impares dejan un bloque central único y facilitan marcar los ejes
            y comprobar la simetría.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Las medidas incluyen los extremos: un 21×9 ocupa 21 columnas y 9
            filas. El alto no es el grosor de la pared ni la altura de una
            habitación. Más ancho y menos alto produce un óvalo más plano.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Medidas, Contorno y Relleno
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            El contorno es un anillo de un bloque; el relleno ocupa todo el
            interior. Las pilas se calculan sobre el relleno y redondean hacia
            arriba: una pila contiene 64 bloques.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm text-ink">
              <thead>
                <tr className="border-b-2 border-mc-border">
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Ancho × alto
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Contorno
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Relleno
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Pilas
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Ideal para
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm leading-7">
                {ovalSizes.map((row) => (
                  <tr
                    key={row.size}
                    className="border-b border-mc-border/50 last:border-b-0"
                  >
                    <td className="px-3 py-2">{row.size}</td>
                    <td className="px-3 py-2">{row.outline}</td>
                    <td className="px-3 py-2">{row.filled}</td>
                    <td className="px-3 py-2">{row.stacks}</td>
                    <td className="px-3 py-2">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            Un 15×7 relleno usa 69 bloques: 2 pilas. Un 21×9 de contorno usa 62,
            una sola pila; su relleno pide 3.
          </p>
          <figure className="mt-5 border-2 border-mc-border bg-panel-2 p-3">
            <img
              src="/shape-pngs/oval-21-9.png"
              alt="Diagrama generado del contorno de un óvalo de 21 por 9 bloques para Minecraft, no una captura del juego"
              width={461}
              height={209}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-[360px] [image-rendering:pixelated]"
            />
            <figcaption className="mt-3 text-sm leading-6 text-muted">
              Diagrama generado, no una captura ni un render: plano del contorno
              de 21×9. Cada cuadrado es una posición de bloque.
            </figcaption>
          </figure>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Orden de Construcción: Centro, Ejes y Cuadrantes
          </h2>
          <ol className="mt-3 space-y-3 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">1. Marca el centro.</strong> Con
              medidas impares es un único bloque; coloca ahí un bloque temporal.
            </li>
            <li>
              <strong className="text-ink">
                2. Marca los cuatro extremos.
              </strong>{" "}
              Desde el centro, avanza (ancho − 1) ÷ 2 bloques a izquierda y
              derecha, y (alto − 1) ÷ 2 arriba y abajo. En 21×9 son 10 y 4.
            </li>
            <li>
              <strong className="text-ink">3. Dibuja un cuadrante.</strong>{" "}
              Copia el tramo entre el centro y dos extremos contiguos y
              refléjalo en los otros tres.
            </li>
            <li>
              <strong className="text-ink">4. Comprueba la simetría.</strong>{" "}
              Cuenta desde el centro hacia cada lado y compara la silueta desde
              cuatro lados.
            </li>
            <li>
              <strong className="text-ink">5. Cierra el contorno.</strong>{" "}
              Recorre el anillo completo antes de tocar el interior.
            </li>
            <li>
              <strong className="text-ink">6. Rellena al final.</strong> Si la
              superficie debe ser sólida, rellena desde el borde hacia dentro;
              hacerlo antes oculta los ejes.
            </li>
          </ol>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Hueco, Relleno y Grosor de Pared
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            El contorno de un bloque deja un interior nominal de ancho − 2 por
            alto − 2: un 21×9 deja 19×7. La curva escalonada estrecha los
            extremos, así que el espacio cómodo es menor. El relleno ocupa toda
            la superficie y sirve para suelos y plazas; usa los conteos de la
            tabla.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Una pared de dos bloques reduce el interior otros dos bloques por eje
            (unos 17×5 en 21×9) y consume más material. En tamaños grandes, un
            anillo de un bloque puede parecer frágil; valora un zócalo.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Usos Recomendados Según el Tamaño
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Un óvalo es útil cuando un círculo deja demasiado espacio vacío en
            una pared ancha o una sala rectangular. Si el hueco es casi cuadrado,
            el círculo suele verse mejor.
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">15×7: ventana o fuente.</strong> Ideal
              para un ventanal sobre una puerta o el brocal de una{" "}
              <Link href="/es/oval/15/7/" className="pixel-link">
                fuente pequeña de 15×7
              </Link>
              .
            </li>
            <li>
              <strong className="text-ink">21×9: estanque o mesa.</strong> El
              tamaño más equilibrado para empezar. Cabe en un jardín y deja un
              interior útil para un{" "}
              <Link href="/es/oval/21/9/" className="pixel-link">
                estanque de 21×9
              </Link>
              .
            </li>
            <li>
              <strong className="text-ink">31×15: arena o patio.</strong> La
              curva se lee desde lejos y el interior admite gradas. Un{" "}
              <Link href="/es/oval/31/15/" className="pixel-link">
                patio ovalado de 31×15
              </Link>{" "}
              rompe la monotonía de una sala rectangular.
            </li>
            <li>
              <strong className="text-ink">
                41×21: plaza o piscina grande.
              </strong>{" "}
              Sirve para una{" "}
              <Link href="/es/oval/41/21/" className="pixel-link">
                plaza de 41×21
              </Link>{" "}
              o una piscina de jardín.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Errores Comunes y Cómo Corregirlos
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Centro mal marcado.</strong> Si el
              centro está desplazado, los extremos quedan desiguales; vuelve a
              marcar los ejes.
            </li>
            <li>
              <strong className="text-ink">Confundir ancho y alto.</strong> Usa
              el mismo par en todo el plano. Un 21×9 no es un 9×21.
            </li>
            <li>
              <strong className="text-ink">Rellenar antes de revisar.</strong> El
              relleno tapa el centro y los ejes; comprueba el contorno primero.
            </li>
            <li>
              <strong className="text-ink">
                Usar medidas pares en una construcción impar.
              </strong>{" "}
              Un ancho par deja el centro entre cuatro casillas y desplaza la
              alineación respecto a puertas y muros impares.
            </li>
            <li>
              <strong className="text-ink">Anillo demasiado fino.</strong> Un
              solo bloque puede parecer débil en un 41×21; refuerza el borde con
              otra hilera.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Cómo se Hizo Esta Guía
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Los conteos se comprobaron contra la salida de CircleGen, no a ojo.
            No afirmamos haber probado cada construcción en el juego;
            explicamos cómo trasladar el plano.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Si algo no coincide, envía la corrección desde la{" "}
            <Link href="/contact/" className="pixel-link">
              página de contacto
            </Link>
            .
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Preguntas Frecuentes
          </h2>
          <div className="mt-3 space-y-4">
            {faqItems.map((item) => (
              <div key={item.question}>
                <h3 className="text-sm font-bold text-ink">{item.question}</h3>
                <p className="mt-1 text-sm leading-7 text-muted">
                  {item.answer}
                </p>
              </div>
            ))}
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
                Cómo hacer un círculo en Minecraft
              </Link>{" "}
              — el método de ejes y cuadrantes.
            </li>
            <li>
              <Link
                href="/es/blog/medidas-circulos-minecraft/"
                className="pixel-link"
              >
                Medidas de círculos en Minecraft
              </Link>{" "}
              — tablas de bloques huecos y rellenos.
            </li>
            <li>
              <Link
                href="/es/blog/como-hacer-esfera-minecraft/"
                className="pixel-link"
              >
                Cómo hacer una esfera en Minecraft
              </Link>{" "}
              — apilar anillos como los de un óvalo.
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
