import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ArticleMeta from "@/components/ArticleMeta";
import SeoShell from "@/app/_seo/shell";
import ArticleJsonLd from "@/app/_seo/article-jsonld";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/config";

const TITLE = "Cómo Hacer una Torre en Minecraft: Diámetro y Planificación";
const DESCRIPTION =
  "Elige el diámetro de tu torre de Minecraft según interior, grosor de muro, escaleras y altura. Compara huellas de 9 a 51 bloques con recuentos verificados.";
const PATH = "/es/blog/como-hacer-torre-minecraft/";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Qué diámetro debe tener una torre de Minecraft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iguala el diámetro al interior que necesitas y añade el grosor del muro. Una huella de 15 bloques deja unos 13 de interior con muro de un bloque y sirve para una torre inicial. Una de 21 deja unos 19, una de 31 unos 29, y las de 41 o 51 dan escala de torreón o monumento. Con muro de dos bloques, resta cuatro en vez de dos.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto espacio interior tiene una torre de 21 bloques?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Unos 19 bloques de ancho con muro de un bloque, o 17 con muro de dos. Es una aproximación de planificación: el círculo escalonado, las puertas y los huecos de escalera reducen las celdas exactas. Una escalera de caracol 3×3 sigue dejando un anillo transitable alrededor.",
      },
    },
    {
      "@type": "Question",
      name: "¿Debe ser impar o par el diámetro de una torre?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los diámetros impares son más fáciles porque dejan un bloque central para un mástil o una escalera de caracol. Los pares sirven para salas simétricas o puertas dobles, pero el centro cae entre cuatro celdas, así que el mástil hay que descentrarlo o hacerlo columna 2×2. El círculo plano mantiene el diámetro que introduces; comprueba la huella si la torre debe encajar en una cimentación existente.",
      },
    },
  ],
};

const faqJsonLdString = JSON.stringify(faqJsonLd).replace(/</g, "\\u003c");

export default async function ComoHacerTorreMinecraftPage() {
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
        images={["/shape-pngs/circle-21.png"]}
        published="2026-10-26"
        updated="2026-10-26"
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="pixel-shadow font-pixel text-lg text-ink sm:text-xl">
          {TITLE}
        </h1>
        <ArticleMeta published="2026-10-26" updated="2026-10-26" locale="es" />

        <section className="mc-panel pixel-corners mt-8 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            La Huella no es la Sala
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            El diámetro en CircleGen es el ancho exterior de la huella de la
            torre, el contorno que colocas primero. El espacio útil queda
            dentro, así que siempre es menor. Una{" "}
            <Link href="/es/circle/21/" className="pixel-link">
              torre de 21 bloques
            </Link>{" "}
            es el ejemplo estándar: con un muro de un bloque deja unos 19
            bloques por dentro, no 21.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Un muro de un bloque resta un bloque por cada lado, así que
            interior ≈ diámetro − 2; un muro de dos bloques da interior ≈
            diámetro − 4. Es una aproximación de planificación. El contorno
            escalonado del píxel es irregular y las puertas, ventanas y huecos
            de escalera recortan celdas útiles. Elige con estas estimaciones y
            confirma después el anillo exacto en el plano.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Empieza por el interior, no por la silueta. Mide la huella del
            núcleo de escalera, la cama, el almacenamiento y las estaciones de
            trabajo. Si una huella de 15 deja una sala de 13, ¿caben la escalera
            y los muebles a la vez? Si no, sube un tamaño. El interior no se
            puede ensanchar cuando la cáscara está construida.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Comparativa de Diámetros de Torre
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Estos recuentos son para un anillo de un bloque de grosor en cada
            diámetro, no para una torre terminada. El interior es el diámetro
            aproximado menos dos. Los tamaños pequeños no escalan de forma
            suave: el 9 usa 32 bloques de cáscara y el 11 usa 28, por cómo se
            dobla el contorno escalonado.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm text-ink">
              <thead>
                <tr className="border-b-2 border-mc-border">
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Diámetro
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Bloques de Cáscara
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Interior Aprox.
                  </th>
                  <th className="px-3 py-2 text-left font-pixel text-[10px] text-cyan">
                    Mejor Uso
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm leading-7">
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">
                    <Link href="/es/circle/9/" className="pixel-link">
                      torre de 9
                    </Link>
                  </td>
                  <td className="px-3 py-2">32</td>
                  <td className="px-3 py-2">~7</td>
                  <td className="px-3 py-2">Atalaya o pozo de luz</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">11</td>
                  <td className="px-3 py-2">28</td>
                  <td className="px-3 py-2">~9</td>
                  <td className="px-3 py-2">Torre de mago estrecha</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">
                    <Link href="/es/circle/15/" className="pixel-link">
                      torre de 15
                    </Link>
                  </td>
                  <td className="px-3 py-2">40</td>
                  <td className="px-3 py-2">~13</td>
                  <td className="px-3 py-2">Torre inicial</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">
                    <Link href="/es/circle/21/" className="pixel-link">
                      torre de 21
                    </Link>
                  </td>
                  <td className="px-3 py-2">56</td>
                  <td className="px-3 py-2">~19</td>
                  <td className="px-3 py-2">Torre estándar</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">25</td>
                  <td className="px-3 py-2">68</td>
                  <td className="px-3 py-2">~23</td>
                  <td className="px-3 py-2">Torre espaciosa</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">
                    <Link href="/es/circle/31/" className="pixel-link">
                      torreón de 31
                    </Link>
                  </td>
                  <td className="px-3 py-2">84</td>
                  <td className="px-3 py-2">~29</td>
                  <td className="px-3 py-2">Torreón o torre de arena</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">33</td>
                  <td className="px-3 py-2">112</td>
                  <td className="px-3 py-2">~31</td>
                  <td className="px-3 py-2">Torre grande</td>
                </tr>
                <tr className="border-b border-mc-border/50">
                  <td className="px-3 py-2">
                    <Link href="/es/circle/41/" className="pixel-link">
                      torre de acceso de 41
                    </Link>
                  </td>
                  <td className="px-3 py-2">112</td>
                  <td className="px-3 py-2">~39</td>
                  <td className="px-3 py-2">Torre de acceso o monumento</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">
                    <Link href="/es/circle/51/" className="pixel-link">
                      monumento de 51
                    </Link>
                  </td>
                  <td className="px-3 py-2">168</td>
                  <td className="px-3 py-2">~49</td>
                  <td className="px-3 py-2">Monumento grande</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm leading-7 text-muted">
            33 y 41 usan los mismos 112 bloques de cáscara en una capa, pero 41
            deja unos ocho bloques más de interior. Para una sala, ese espacio
            vale la pena al mismo coste de muro. Para una aguja decorativa, 33
            mantiene la huella más pequeña al mismo coste de anillo.
          </p>
          <figure className="mt-5 border-2 border-mc-border bg-panel-2 p-3">
            <img
              src="/shape-pngs/circle-21.png"
              alt="Diagrama generado, no es captura del juego, de un círculo de 21 bloques usado como base de una torre de Minecraft"
              width={461}
              height={461}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-[260px] [image-rendering:pixelated]"
            />
            <figcaption className="mt-3 text-sm leading-6 text-muted">
              Diagrama generado, no es una captura del juego: esta es la huella
              de 21 bloques, no una torre terminada. Muros, núcleo de escalera,
              suelos y techo se construyen sobre este contorno.
            </figcaption>
          </figure>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Diámetros Impares vs Pares
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Los diámetros impares dejan un único bloque central. Un mástil,
            escalera de mano o escalera de caracol puede girar alrededor de esa
            celda fija y cada planta comparte el mismo eje. Una torre de 21 es
            fácil de mantener centrada.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Los diámetros pares no están mal. Sirven para salas simétricas,
            puertas dobles o fachadas que se reflejan sobre un eje de dos
            bloques. Lo que no tienen es un único bloque central: el punto medio
            cae entre cuatro celdas, así que el mástil hay que descentrarlo o
            hacerlo columna 2×2.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            El círculo plano mantiene el diámetro que introduces, par o impar.
            Las herramientas de esfera y cúpula son distintas: se construyen con
            secciones de ancho impar, así que una petición de esfera o cúpula
            par puede resolverse un bloque más ancha. Si la torre debe asentar
            sobre una cimentación par existente, comprueba primero la cuadrícula
            del círculo. La{" "}
            <Link href="/es/blog/como-hacer-circulos-minecraft/" className="pixel-link">
              guía de círculos
            </Link>{" "}
            explica el contorno.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Grosor del Muro y Contrafuertes
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Usa un muro de un bloque del 9 al 21. Preserva el interior y sirve
            para una atalaya o un torreón pequeño. A partir de 31, usa dos
            bloques: un muro más grueso se lee como sillería, da alféizar a las
            ventanas y afianza una torre alta.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Engrosa siempre hacia dentro. El exterior se mantiene en el diámetro
            elegido y el interior pierde dos bloques de ancho por cada bloque de
            muro añadido, uno por cada lado. Una torre de 41 con muro de dos
            bloques tiene una sala de unos 37, menor de lo que sugiere la
            huella.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Añade contrafuertes cada 4–6 bloques por fuera. Rompen una curva
            larga en paños, dan sombra y hacen que un cilindro liso parezca
            diseñado. Colócalos primero en los cuatro puntos cardinales y
            reparte el resto por igual; mantenlos fuera de la puerta. Sobresalen
            hacia fuera, así que no reducen el interior pero sí ensanchan la
            huella al nivel del suelo; deja espacio junto a caminos y muros.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Escaleras, Plantas y Altura Libre
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Planifica el núcleo de escalera antes de que suba la cáscara. Una
            escalera de caracol 3×3 cabe en una torre estándar y deja suelo
            alrededor. Usa 5×5 cuando quieras escaleras de dos bloques o
            descansillos. Mantén una columna central, o deja el centro abierto
            como pozo de escalera de mano o de luz. No rellenes el núcleo para
            tallar después la escalera.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Fija las alturas de planta antes de construir. De cuatro a seis
            bloques de altura libre por nivel, incluido el suelo, sirve para la
            mayoría de las torres; las salas más altas se sienten más solemnes
            pero reducen el número de plantas. Marca cada nivel en el muro
            exterior con un bloque temporal y construye el forjado y el hueco de
            escalera a esa altura. El número exacto de escalones depende de la
            altura de planta y del giro: cuenta desde el plano.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Deja el hueco del suelo donde llega la escalera, no en el centro, y
            comprueba la altura libre sobre el último peldaño antes de colocar
            el siguiente techo.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Altura y Planificación de Materiales
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Si el mismo anillo se repite, bloques de cáscara ≈ recuento del
            anillo × altura. Un anillo de 21 usa 56 bloques por capa, así que 10
            capas de muro necesitan 560 bloques de cáscara. Un anillo de 31 usa
            84 por capa; 12 capas necesitan 1.008. Esos totales cubren solo el
            muro. Añade por separado suelos, techo, remate de puerta, ventanas y
            contrafuertes.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Para una torre afilada, cambia a la vista de capas. Cada capa
            cambia, así que multiplica cada anillo por su altura de capa y suma
            los resultados. No multipliques el anillo de la base por la altura
            total; eso sobreestima el afilado. Lo mismo aplica cuando el grosor
            del muro cambia a mitad de altura.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Consulta la{" "}
            <Link href="/es/blog/medidas-circulos-minecraft/" className="pixel-link">
              tabla de medidas de círculos
            </Link>{" "}
            para diámetros cercanos, y usa la{" "}
            <Link href="/es/blog/como-hacer-cupula-minecraft/" className="pixel-link">
              guía de cúpulas
            </Link>{" "}
            cuando la parte superior sea un techo curvo. Una torre es huella más
            altura más techo; cada parte tiene su propio recuento de materiales.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Errores Comunes que Conviene Evitar
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">
                Elegir solo por el exterior.
              </strong>{" "}
              Una huella ancha que no cabe el núcleo de escalera es peor que una
              torre menor que funcione.
            </li>
            <li>
              <strong className="text-ink">
                Olvidar el núcleo de escalera.
              </strong>{" "}
              Dibuja la huella 3×3 o 5×5 en el suelo antes que los muros;
              encajar después una escalera de caracol suele significar
              reconstruir plantas.
            </li>
            <li>
              <strong className="text-ink">
                Usar muro de un bloque en una torre de 41 o más.
              </strong>{" "}
              Las cáscaras grandes se ven de papel sin una segunda capa.
            </li>
            <li>
              <strong className="text-ink">
                Construir un cilindro macizo completo.
              </strong>{" "}
              Desperdicia bloques, esconde el interior y dificulta escaleras y
              suelos.
            </li>
            <li>
              <strong className="text-ink">
                Colocar la puerta antes de comprobar el interior.
              </strong>{" "}
              Recorre primero la planta: una puerta centrada por fuera puede
                abrir a la escalera o a un muro.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Cómo se Hizo esta Guía
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Esta guía se basa en las matemáticas de la cuadrícula de círculos de
            CircleGen. Los recuentos de la tabla provienen del contorno de un
            bloque del generador para cada diámetro, y las cifras de interior
            usan la aproximación de diámetro menos muro descrita arriba. Los
            consejos de construcción reflejan la geometría del plano, no pruebas
            manuales de cada diseño de torre.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">FAQ</h2>
          <div className="mt-3 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Qué diámetro debe tener una torre de Minecraft?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Iguala el diámetro al interior que necesitas y añade el grosor
                del muro. Una huella de 15 bloques deja unos 13 de interior con
                muro de un bloque y sirve para una torre inicial. Una de 21 deja
                unos 19, una de 31 unos 29, y las de 41 o 51 dan escala de
                torreón o monumento. Con muro de dos bloques, resta cuatro en
                vez de dos.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Cuánto espacio interior tiene una torre de 21 bloques?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Unos 19 bloques de ancho con muro de un bloque, o 17 con muro de
                dos. Es una aproximación de planificación: el círculo
                escalonado, las puertas y los huecos de escalera reducen las
                celdas exactas. Una escalera de caracol 3×3 sigue dejando un
                anillo transitable alrededor.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Debe ser impar o par el diámetro de una torre?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Los diámetros impares son más fáciles porque dejan un bloque
                central para un mástil o una escalera de caracol. Los pares
                sirven para salas simétricas o puertas dobles, pero el centro
                cae entre cuatro celdas, así que el mástil hay que descentrarlo
                o hacerlo columna 2×2. El círculo plano mantiene el diámetro que
                introduces; comprueba la huella si la torre debe encajar en una
                cimentación existente.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <Link href="/es/blog/" className="pixel-link text-sm">
            ← Volver al Blog
          </Link>
        </div>
      </div>
    </SeoShell>
  );
}
