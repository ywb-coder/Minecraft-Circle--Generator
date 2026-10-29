import type { Metadata } from "next";
import Link from "@/components/StaticLink";
import ArticleMeta from "@/components/ArticleMeta";
import SeoShell from "@/app/_seo/shell";
import ArticleJsonLd from "@/app/_seo/article-jsonld";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { SITE_URL } from "@/lib/config";

const TITLE = "Cómo Hacer una Cúpula en Minecraft: Guía sobre Base Plana";
const DESCRIPTION =
  "Construye una cúpula en Minecraft sobre una base plana: diámetro vs altura, interiores huecos, capa por capa y errores comunes al cerrar la cúpula.";
const PATH = "/es/blog/como-hacer-cupula-minecraft/";

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
      name: "¿Cuál es la diferencia entre una cúpula y una esfera en Minecraft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Una cúpula es media esfera con base plana. CircleGen empieza con el círculo completo de la base y apila anillos más pequeños hacia arriba hasta el casquete. Una esfera repite esos anillos por encima y por debajo del ecuador, sin base plana.",
      },
    },
    {
      "@type": "Question",
      name: "¿Qué diámetro usar para el techo de una cúpula?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iguala la base al ancho exterior de la sala circular. El diámetro 15 sirve para hornos pequeños y techos de cabaña, el 21 para glorieta e invernaderos pequeños, y el 31 o 51 para salones y observatorios grandes. Las cúpulas grandes se ven más lisas, pero necesitan más bloques y andamios.",
      },
    },
    {
      "@type": "Question",
      name: "¿Puede ser hueca una cúpula de Minecraft?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. El plano de cúpula de CircleGen es una cáscara de anillos, así que el interior queda libre. Construye el anillo de la base y los muros, deja el centro vacío y añade el suelo al nivel del terreno. Planifica puertas y huecos mientras construyas, en vez de cortar la cáscara terminada.",
      },
    },
  ],
};

const faqJsonLdString = JSON.stringify(faqJsonLd).replace(/</g, "\\u003c");

export default async function ComoHacerCupulaMinecraftPage() {
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
        images={["/shape-pngs/circle-31.webp", "/shape-pngs/circle-21.webp"]}
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
            Respuesta Rápida
          </h2>
          <div className="mt-3 rounded-sm border-2 border-cyan/30 bg-cyan/5 p-4 text-sm leading-7 text-ink">
            <p>
              Una cúpula en Minecraft es{" "}
              <strong className="text-ink">media esfera sobre una base plana</strong>
              . Empieza con un círculo completo en el suelo; cada capa superior
              es más estrecha y el conjunto termina en un casquete pequeño. La
              base plana es lo que separa una cúpula de una esfera.
            </p>
            <p className="mt-2">
              El{" "}
              <Link href="/es/" className="pixel-link">
                generador de cúpulas de CircleGen
              </Link>{" "}
              te muestra cada anillo, de la base al casquete.
            </p>
          </div>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Una Cúpula es Media Esfera sobre Base Plana
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Una cúpula de Minecraft empieza con un círculo completo en el
            suelo. Cada capa por encima es más pequeña y el apilado termina en
            un casquete. El resultado es media esfera: un techo curvo con huella
            plana. Esa base plana es lo que la separa de una esfera completa.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            El modo cúpula de CircleGen lista cada capa desde la base hasta el
            casquete. Usa el{" "}
            <Link href="/es/" className="pixel-link">
              generador de cúpulas
            </Link>{" "}
            para los anillos exactos; esta guía cubre la planificación y la
            construcción.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Diámetro de la Base vs Altura
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            En diámetros impares, el diámetro es el ancho de la base y la altura
            se deriva de él. Una cúpula mide como máximo la mitad de su ancho,
            contando base y casquete como capas. Una base más ancha produce una
            cúpula más alta. El modo cúpula no puede estirar la curva en
            vertical; para más altura, añade un muro cilíndrico recto debajo.
          </p>
          <p className="mt-3 text-sm leading-7 text-ink">
            Usa un diámetro impar cuando la base deba encajar con un plano
            existente. Cada sección es un círculo de ancho impar, así que un
            valor par se resuelve al impar siguiente: el diámetro 20 da una base
            de 21 bloques. Ese bloque de más puede descuadrar un muro o una
            puerta.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Los anillos tienen un bloque de grosor. Una segunda capa interior
            reduce el hueco un bloque por cada lado (dos bloques en total),
            así que decide el grosor del muro antes de colocar la base.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Leer el Plano de la Cúpula
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            En modo cúpula, la capa 1 es el círculo completo de la base. Las
            capas siguientes son anillos más pequeños y la última es el
            casquete. El recuento de la capa seleccionada corresponde solo a ese
            anillo. El total del resumen es toda la cáscara e incluye suelos ni
            detalles interiores.
          </p>
          <figure className="mt-5 border-2 border-mc-border bg-panel-2 p-3">
            <img
              src="/shape-pngs/circle-31.webp"
              alt="Diagrama generado (no es captura del juego) de un círculo de 31 bloques usado como huella de base para una cúpula de Minecraft"
              width={454}
              height={454}
              loading="lazy"
              className="mx-auto h-auto w-full max-w-[260px] [image-rendering:pixelated]"
            />
            <figcaption className="mt-3 text-sm leading-6 text-muted">
              Diagrama generado, no es una captura del juego: esta es la huella
              de base de una cúpula de 31 bloques. El generador apila anillos
              más pequeños encima hasta el casquete.
            </figcaption>
          </figure>
          <p className="mt-3 text-sm leading-7 text-muted">
            Comprueba la simetría de la base en ambos ejes antes de subir. Un
            error de un bloque se propaga a cada anillo y descentra el casquete.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Construcción Paso a Paso
          </h2>
          <ol className="mt-3 space-y-3 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">
                1. Elige un diámetro impar y comprueba la altura.
              </strong>{" "}
              Previsualiza la base y el número de capas, dejando holgura para el
              casquete y el suelo interior.
            </li>
            <li>
              <strong className="text-ink">2. Marca el centro.</strong> Coloca
              un pilar temporal más alto que la cúpula terminada. Cada anillo se
              coloca alrededor de él.
            </li>
            <li>
              <strong className="text-ink">3. Construye el anillo de la base.</strong>{" "}
              Traza el círculo sobre terreno llano. Si la cúpula será hueca,
              deja el centro vacío. Añade después el suelo con acceso para
              escaleras o puerta.
            </li>
            <li>
              <strong className="text-ink">4. Añade la segunda capa.</strong>{" "}
              Centra el anillo en el pilar y comprueba que la separación entre
              anillos sea uniforme en todo el contorno.
            </li>
            <li>
              <strong className="text-ink">5. Sigue la lista de capas hacia arriba.</strong>{" "}
              Cada anillo se reduce hacia el casquete. Revisa la silueta cada
              pocas capas para que un bloque mal colocado no se convierta en un
              hueco.
            </li>
            <li>
              <strong className="text-ink">
                6. Planifica los huecos antes del casquete.
              </strong>{" "}
              Deja bloques sin colocar para la chimenea de un horno, la rendija
              de un observatorio o el hueco de un farol, en las capas que
              correspondan.
            </li>
            <li>
              <strong className="text-ink">
                7. Cierra la parte superior y retira el pilar.
              </strong>{" "}
              Termina con el anillo más pequeño y añade suelos e iluminación.
              Suaviza los escalones pronunciados con escaleras o losas si hace
              falta.
            </li>
          </ol>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Interiores Huecos y Cúpulas Macizas
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            La salida del modo cúpula de CircleGen es una cáscara. Una cúpula
            hueca puede alojar un horno, un telescopio, una sala pequeña o un
            invernadero. El anillo de la base es el muro exterior; el centro
            vacío es espacio utilizable. Una cúpula maciza es decorativa y cuesta
            mucho más sin ganancia estructural.
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">Suelos:</strong> añade un círculo
              relleno al nivel del terreno. Un piso superior necesita un hueco
              para la columna de escalera o escalera de mano.
            </li>
            <li>
              <strong className="text-ink">Grosor:</strong> añade un anillo
              interior un bloque más adentro en cada capa, o usa escaleras y
              losas para sugerir grosor. Mantén el mismo centro.
            </li>
            <li>
              <strong className="text-ink">Huecos:</strong> planifica puertas,
              salidas de horno y rendijas de observatorio en los anillos, en vez
              de cortar muros terminados.
            </li>
            <li>
              <strong className="text-ink">Iluminación:</strong> cuelga faroles
              antes de cerrar el techo. Una cáscara hueca sellada queda a
              oscuras por dentro.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Techos, Hornos y Observatorios
          </h2>
          <h3 className="mt-4 text-sm font-bold text-ink">Techos de cúpula</h3>
          <p className="mt-1 text-sm leading-7 text-muted">
            Iguala la base a los muros exteriores, o sube un tamaño para un
            alero. La base puede estar a la altura del remate del muro; el
            apilado de capas funciona igual, pero el pilar central arranca desde
            el suelo de abajo. Cabañas y glorieta van bien con 15 o 21; los
            salones necesitan 31 o más.
          </p>
          <h3 className="mt-4 text-sm font-bold text-ink">Hornos y cocinas</h3>
          <p className="mt-1 text-sm leading-7 text-muted">
            Un horno es una cúpula hueca pequeña con puerta en la base y
            chimenea arriba. El diámetro 15 es práctico. Deja la entrada abierta
            y cubre el casquete con una trampilla. Ladrillo, pizarra profunda y
            cobre dan cáscaras creíbles.
          </p>
          <h3 className="mt-4 text-sm font-bold text-ink">Observatorios</h3>
          <p className="mt-1 text-sm leading-7 text-muted">
            Un observatorio necesita espacio para un telescopio y una zona de
            pie: el 21 es compacto y el 31 o 51 da una sala digna. Planifica una
            rendija vertical en el lado con mejor vista mientras construyes;
            cortarla después debilita los anillos. Coloca el telescopio sobre el
            eje central y deja el casquete abierto o acristalado.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Elegir entre 15, 21, 31 o 51
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">15: cubierta y detalle.</strong> Una{" "}
              <Link href="/es/dome/15/" className="pixel-link">
                cúpula de diámetro 15
              </Link>{" "}
              es un horno, la tapa de un pojo, el techo de un farol o un
              pequeño santuario. El interior es justo, trátala como cubierta.
            </li>
            <li>
              <strong className="text-ink">21: escala de jardín.</strong> Una{" "}
              <Link href="/es/dome/21/" className="pixel-link">
                cúpula de diámetro 21
              </Link>{" "}
              sirve para una glorieta, un invernadero pequeño, el techo de un
              porche o un observatorio compacto.
            </li>
            <li>
              <strong className="text-ink">31: escala de sala.</strong> Una{" "}
              <Link href="/es/dome/31/" className="pixel-link">
                cúpula de diámetro 31
              </Link>{" "}
              funciona como capilla, invernadero, observatorio o techo de torre
              grande, con sitio para muebles o bancales.
            </li>
            <li>
              <strong className="text-ink">51: escala de monumento.</strong> Una
              cúpula de diámetro 51 es un salón, el ábside de una catedral, un
              gran observatorio o el techo de una arena. Comprueba el total
              antes de comprometerte; necesita más andamios y un pilar más alto.
            </li>
          </ul>
          <p className="mt-3 text-sm leading-7 text-muted">
            Para un techo visto desde el suelo, un tamaño más se ve mejor. Para
            un horno, elige el tamaño más pequeño que deje libre la abertura.
            La{" "}
            <Link href="/es/blog/medidas-circulos-minecraft/" className="pixel-link">
              tabla de medidas de círculos
            </Link>{" "}
            ayuda a emparejar diámetros de base con anchos de sala y
            presupuestos. Si prefieres la bola completa, la{" "}
            <Link href="/es/blog/como-hacer-esfera-minecraft/" className="pixel-link">
              guía de esferas
            </Link>{" "}
            cubre las dos mitades, y la{" "}
            <Link href="/es/blog/como-hacer-circulos-minecraft/" className="pixel-link">
              guía de círculos
            </Link>{" "}
            explica el patrón del anillo plano.
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Errores Comunes que Conviene Evitar
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-ink">
            <li>
              <strong className="text-ink">
                Empezar con una base demasiado pequeña.
              </strong>{" "}
              La altura sigue al ancho: una base pequeña deja un interior justo.
              Decide primero qué debe caber dentro.
            </li>
            <li>
              <strong className="text-ink">
                Construir sin pilar central.
              </strong>{" "}
              Un desvío de un bloque cuesta notarlo hasta que el casquete queda
              descentrado.
            </li>
            <li>
              <strong className="text-ink">
                Rellenar la base por error.
              </strong>{" "}
              Una base maciza elimina el interior. Construye primero el anillo.
            </li>
            <li>
              <strong className="text-ink">
                Usar un diámetro par para un ajuste exacto.
              </strong>{" "}
              Las secciones de ancho impar pueden dejar la base un bloque más
              ancha de lo planeado.
            </li>
            <li>
              <strong className="text-ink">
                Cortar huecos cuando la cáscara está terminada.
              </strong>{" "}
              Una puerta, chimenea o rendija rompe el patrón del anillo.
              Planifícala en la capa correcta.
            </li>
            <li>
              <strong className="text-ink">Aplastar el casquete.</strong> Una
              losa ancha hace que la cúpula parezca cortada. Sigue el anillo más
              pequeño, o abre el hueco a propósito con un farol o un óculo de
              cristal.
            </li>
          </ul>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">
            Cómo se Hizo esta Guía
          </h2>
          <p className="mt-3 text-sm leading-7 text-ink">
            Esta guía se basa en las matemáticas de la cuadrícula de cúpulas de
            CircleGen: la base es un círculo completo y cada capa superior es un
            anillo de ancho impar más pequeño. Se contrastó con la salida del
            generador y las páginas de cúpula existentes del sitio, no con
            pruebas manuales de cada construcción.
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">
            ¿Has encontrado una capa o un recuento que no coincide? Envía una
            corrección por la{" "}
            <Link href="/contact/" className="pixel-link">
              página de contacto
            </Link>
            .
          </p>
        </section>

        <section className="mc-panel pixel-corners mt-6 p-5">
          <h2 className="font-pixel text-[10px] text-cyan">FAQ</h2>
          <div className="mt-3 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Cuál es la diferencia entre una cúpula y una esfera en
                Minecraft?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Una cúpula es media esfera con base plana. CircleGen empieza con
                el círculo completo de la base y apila anillos más pequeños
                hacia arriba hasta el casquete. Una esfera repite esos anillos
                por encima y por debajo del ecuador, sin base plana.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Qué diámetro usar para el techo de una cúpula?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Iguala la base al ancho exterior de la sala circular. El
                diámetro 15 sirve para hornos pequeños y techos de cabaña, el 21
                para glorieta e invernaderos pequeños, y el 31 o 51 para salones
                y observatorios grandes. Las cúpulas grandes se ven más lisas,
                pero necesitan más bloques y andamios.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">
                ¿Puede ser hueca una cúpula de Minecraft?
              </h3>
              <p className="mt-1 text-sm leading-7 text-muted">
                Sí. El plano de cúpula de CircleGen es una cáscara de anillos,
                así que el interior queda libre. Construye el anillo de la base
                y los muros, deja el centro vacío y añade el suelo al nivel del
                terreno. Planifica puertas y huecos mientras construyas, en vez
                de cortar la cáscara terminada.
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
