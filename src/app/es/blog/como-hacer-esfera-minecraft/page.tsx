import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ArticleMeta from "@/components/ArticleMeta";
import SeoShell from "@/app/_seo/shell";
import ArticleJsonLd from "@/app/_seo/article-jsonld";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Cómo Hacer una Esfera en Minecraft: Guía por Capas",
  description:
    "Construye una esfera en Minecraft por capas: ecuador primero, diámetros impares, versión hueca o maciza y errores comunes al apilar círculos.",
  alternates: {
    canonical: `${SITE_URL}/es/blog/como-hacer-esfera-minecraft/`,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Cuántas capas tiene una esfera en Minecraft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Con CircleGen, una esfera de diámetro impar se reparte en tantas capas como bloques tiene el diámetro. Una de 21 se construye en 21 capas, del fondo a la parte superior. El ecuador es la más ancha y los extremos son los más pequeños.",
      },
    },
    {
      "@type": "Question",
      name: "¿La esfera de Minecraft tiene que ser hueca?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. El generador muestra la cáscara: cada capa es un anillo de un bloque. Puedes dejarla hueca para ahorrar material o iluminarla por dentro, o rellenar cada capa para una esfera maciza, que usa muchos más bloques.",
      },
    },
    {
      "@type": "Question",
      name: "¿Una esfera funciona igual en Java y Bedrock?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. El patrón es una cuadrícula de posiciones de bloques, así que funciona igual en Java y Bedrock. Solo cambian los materiales y la altura de cada capa.",
      },
    },
  ],
};

const faqJsonLdString = JSON.stringify(faqJsonLd).replace(/</g, "\\u003c");

export default async function ComoHacerEsferaMinecraftPage() {
  const dict = await getDictionary("es");
  return (
    <SeoShell dict={dict} locale="es">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLdString }}
      />
      <ArticleJsonLd
        title="Cómo Hacer una Esfera en Minecraft: Guía por Capas"
        description="Construye una esfera en Minecraft por capas: ecuador primero, diámetros impares, versión hueca o maciza y errores comunes al apilar círculos."
        path="/es/blog/como-hacer-esfera-minecraft/"
        locale="es"
        images={["/shape-pngs/circle-21.png", "/shape-pngs/circle-31.png"]}
        published="2026-10-21"
        updated="2026-10-21"
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          Cómo Hacer una Esfera en Minecraft: Guía por Capas
        </h1>
        <ArticleMeta published="2026-10-21" updated="2026-10-21" locale="es" />

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">Respuesta Rápida</h2>
          <div className="mt-3 rounded-sm border-2 border-cyan/30 bg-cyan/5 p-4 text-sm leading-7 text-ink">
            <p>
              Una esfera en Minecraft es una{" "}
              <strong className="text-ink">pila de círculos</strong>. La capa
              del medio es el ecuador y la más ancha; hacia arriba y abajo, cada
              capa reduce su diámetro hasta cerrarse. Elige un diámetro impar,
              construye el ecuador y avanza capa a capa.
            </p>
            <p className="mt-2">
              El{" "}
              <Link href="/es/" className="pixel-link">
                generador de esferas de CircleGen
              </Link>{" "}
              te muestra cada capa como un anillo independiente.
            </p>
          </div>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Una Esfera es una Pila de Capas
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Minecraft no tiene superficies curvas: una esfera se aproxima
            apilando círculos horizontales. Cada capa es un anillo plano cuyo
            diámetro cambia con la altura. En el ecuador se alcanza la anchura
            máxima; en los casquetes el anillo se reduce hasta un bloque o un
            grupo mínimo.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Visto de lado, el perfil se parece a un círculo: capas anchas cerca
            del centro y estrechas en los extremos. Por eso conviene empezar por
            el ecuador y usarlo como referencia. Si empiezas por la base, es
            fácil perder la altura del centro y acabar con una forma aplastada.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            En el generador, cada capa es un contorno. El total de bloques es la
            suma de los anillos, no el volumen completo.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Diámetro Impar o Par
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Un <strong className="text-ink">diámetro impar</strong> (15, 21, 31,
            51…) deja una columna central de un bloque. Sirve para marcar el
            centro, alinear un pilar temporal y comprobar cada capa. También da
            un punto de referencia claro al ecuador y a los casquetes.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Un <strong className="text-ink">diámetro par</strong> se organiza,
            en teoría, alrededor de un centro de 2×2. No es un error, pero no hay
            bloque central único y las capas alternan alrededor de ese centro.
            Para una primera esfera resulta más cómodo un impar.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            CircleGen acepta diámetros de 5 a 128 bloques y dibuja siempre
            anchos impares; las páginas de plano cubren los impares de 5 a 127.
            Si escribes un diámetro par, la estructura visible corresponde al
            impar inmediatamente superior; para una esfera estrictamente par
            tendrías que construir el centro de 2×2 a mano.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Cómo Leer la Esfera en el Generador
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Al abrir una esfera en CircleGen verás las capas ordenadas de abajo
            hacia arriba. La del centro es el ecuador; las demás reducen su
            anillo. No necesitas memorizar la lista: toma el ecuador como
            referencia, cuenta las capas hacia abajo hasta el casquete inferior
            y repite el mismo número hacia arriba.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Cada capa tiene su diámetro y su conteo. Lee el anillo que estás
            colocando, no el anterior: en los casquetes el cambio es más brusco y
            es fácil poner un bloque de más. Puedes consultar la{" "}
            <Link href="/es/sphere/21/" className="pixel-link">
              esfera de 21 bloques
            </Link>{" "}
            o la{" "}
            <Link href="/es/sphere/31/" className="pixel-link">
              esfera de 31 bloques
            </Link>{" "}
            para ver la secuencia completa.
          </p>
          <figure className="mt-5 border-2 border-mc-border bg-panel-2 p-3">
            <img
              src="/shape-pngs/circle-21.png"
              alt="Diagrama generado del corte ecuatorial de 21 bloques, usado como referencia de capas para una esfera de Minecraft"
              width={461}
              height={461}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-[260px] [image-rendering:pixelated]"
            />
            <figcaption className="mt-3 text-sm leading-6 text-muted">
              Diagrama generado, no una captura del juego ni un render de la
              esfera: es el anillo del ecuador de 21 bloques. Las capas
              superiores e inferiores repiten este patrón con anillos más
              pequeños.
            </figcaption>
          </figure>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Construir una Esfera Paso a Paso
          </h2>
          <ol className="mt-3 space-y-3 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">
                1. Elige el diámetro y marca el centro.
              </strong>{" "}
              Decide la altura del ecuador, el centro vertical de la esfera.
              Marca el punto con un bloque temporal y anota el radio: para un
              diámetro 21 son 10 bloques.
            </li>
            <li>
              <strong className="text-ink">2. Construye el ecuador.</strong>{" "}
              Coloca el anillo más ancho siguiendo el plano y comprueba que el
              diámetro mide lo mismo en los dos ejes.
            </li>
            <li>
              <strong className="text-ink">
                3. Levanta un pilar temporal en el centro.
              </strong>{" "}
              Si la esfera no se apoya en el suelo, usa un pilar vertical en la
              columna central para alinear las capas. Retíralo al terminar.
            </li>
            <li>
              <strong className="text-ink">
                4. Baja capa a capa hasta el casquete inferior.
              </strong>{" "}
              Desde el ecuador, coloca cada anillo inferior con el diámetro que
              indique el plano. Reduce el tamaño de forma progresiva y cierra el
              fondo con el anillo más pequeño.
            </li>
            <li>
              <strong className="text-ink">
                5. Vuelve al ecuador y sube hasta el casquete superior.
              </strong>{" "}
              Repite la secuencia hacia arriba. En una esfera completa, las capas
              por encima y por debajo deben coincidir.
            </li>
            <li>
              <strong className="text-ink">6. Revisa la silueta desde lejos.</strong>{" "}
              Aléjate y observa la curva. Si una capa sobresale, corrige esa fila
              antes de decorar.
            </li>
          </ol>
          <figure className="mt-5 border-2 border-mc-border bg-panel-2 p-3">
            <img
              src="/shape-pngs/circle-15.png"
              alt="Diagrama generado de un anillo de 15 bloques usado como capa pequeña de una esfera de Minecraft"
              width={380}
              height={380}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-[220px] [image-rendering:pixelated]"
            />
            <figcaption className="mt-3 text-sm leading-6 text-muted">
              Diagrama generado, no una captura del juego: un anillo de 15
              bloques sirve como referencia para una capa cercana al casquete.
              No representa el volumen de la esfera.
            </figcaption>
          </figure>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Esfera Hueca o Maciza
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            El generador dibuja la <strong className="text-ink">cáscara</strong>:
            cada capa es un anillo de un bloque. Esa versión hueca suele ser la
            más práctica, porque usa menos materiales y permite iluminar el
            interior o dejar una puerta.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            La esfera <strong className="text-ink">maciza</strong> se consigue
            rellenando cada capa o el interior después de cerrar la cáscara.
            Ocupa muchos más bloques y no cambia el aspecto exterior, pero tiene
            sentido si vas a excavar una sala o tallar la estructura.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Si eliges la versión maciza, calcula el material por capas: el número
            del generador corresponde al contorno, no al volumen relleno.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Qué Diámetro Elegir: 15, 21, 31 o 51
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">15 bloques:</strong> una esfera
              pequeña para remates, lámparas o la punta de una torre. Tiene pocas
              capas y una silueta muy pixelada.
            </li>
            <li>
              <strong className="text-ink">21 bloques:</strong> el tamaño
              intermedio más cómodo para una esfera decorativa grande, un globo
              colgante o una sala pequeña. Permite algo de espacio interior sin
              andamios enormes.
            </li>
            <li>
              <strong className="text-ink">31 bloques:</strong> una esfera
              protagonista para una plaza, un invernadero o una habitación con
              cúpula. Necesita más planificación y un acceso claro si la dejas
              hueca.
            </li>
            <li>
              <strong className="text-ink">51 bloques:</strong> una pieza grande
              que se lee bien desde lejos. Sirve para parques o monumentos, pero
              exige andamios, alineación cuidadosa y muchos más bloques.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-muted">
            Elige por la distancia desde la que se verá y por el espacio interior,
            no solo por el diámetro. Una esfera de 15 puede quedar perfecta como
            remate donde una de 51 parecería desproporcionada.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Errores Comunes al Construir una Esfera
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Empezar por la base sin marcar el ecuador.</strong>{" "}
              Sin referencia central, las capas se desplazan y la esfera queda
              inclinada.
            </li>
            <li>
              <strong className="text-ink">Usar el diámetro del ecuador en todas las capas.</strong>{" "}
              Cada capa tiene su anillo; repetir el mismo círculo produce un
              cilindro.
            </li>
            <li>
              <strong className="text-ink">Elegir un diámetro par sin querer.</strong>{" "}
              Si necesitas una columna central para alinear, usa un impar.
            </li>
            <li>
              <strong className="text-ink">Confundir la cáscara con el volumen.</strong>{" "}
              Los bloques del generador son el contorno de cada capa; una esfera
              maciza necesita más material.
            </li>
            <li>
              <strong className="text-ink">Cerrar la esfera antes de iluminarla.</strong>{" "}
              Si la dejas hueca, planifica una abertura o la luz desde el
              principio.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Cómo se Hizo Esta Guía
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Esta guía se basa en la matemática de cuadrícula del generador de
            CircleGen: las capas de una esfera se calculan como anillos
            horizontales y los diámetros se comprobaron contra la salida del
            generador, no a ojo. No afirmamos haber probado cada construcción
            dentro del juego; explicamos cómo leer y trasladar ese plano.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Si encuentras una capa o un conteo que no coincide con el generador,
            puedes enviar la corrección desde la{" "}
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
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Cuántas capas tiene una esfera en Minecraft?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Con CircleGen, una esfera de diámetro impar se reparte en tantas
                capas como bloques tiene el diámetro. Una de 21 se construye en
                21 capas, del fondo a la parte superior. El ecuador es la más
                ancha y los extremos son los más pequeños.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿La esfera de Minecraft tiene que ser hueca?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                No. El generador muestra la cáscara: cada capa es un anillo de un
                bloque. Puedes dejarla hueca para ahorrar material o iluminarla
                por dentro, o rellenar cada capa para una esfera maciza, que usa
                muchos más bloques.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Una esfera funciona igual en Java y Bedrock?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Sí. El patrón es una cuadrícula de posiciones de bloques, así que
                funciona igual en Java y Bedrock. Solo cambian los materiales y
                la altura de cada capa.
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
              — la base de cada capa de la esfera.
            </li>
            <li>
              <Link
                href="/es/blog/medidas-circulos-minecraft/"
                className="pixel-link"
              >
                Medidas de círculos en Minecraft: tabla de tamaños
              </Link>{" "}
              — bloques huecos y rellenos antes de empezar.
            </li>
            <li>
              <Link href="/es/sphere/21/" className="pixel-link">
                Plano de esfera de 21 bloques
              </Link>{" "}
              — la secuencia de capas completa.
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
