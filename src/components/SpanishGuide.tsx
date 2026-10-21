import Link from "@/components/StaticLink";

const sizes = [
  { href: "/es/circle/15/", label: "Círculo 15" },
  { href: "/es/circle/21/", label: "Círculo 21" },
  { href: "/es/circle/33/", label: "Círculo 33" },
  { href: "/es/circle/41/", label: "Círculo 41" },
  { href: "/es/circle/101/", label: "Círculo 101" },
  { href: "/es/sphere/15/", label: "Esfera 15" },
  { href: "/es/dome/15/", label: "Cúpula 15" },
];

export default function SpanishGuide() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-10">
      <div className="mc-panel pixel-corners p-5">
        <h2 className="font-pixel text-sm text-ink pixel-shadow">
          Cómo hacer un círculo perfecto en Minecraft
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink">
          Minecraft está hecho de bloques cuadrados, así que un círculo siempre
          es una aproximación. La clave es elegir un <strong>diámetro impar</strong>{" "}
          (7, 9, 11, 15…): tiene un único bloque central y el patrón queda
          simétrico en ambos ejes. Los diámetros pares tienen un centro de 2×2 y
          funcionan mejor para muros y cercados.
        </p>
        <p className="mt-3 text-sm leading-7 text-ink">
          Cuanto mayor sea el diámetro, más suave se verá la curva. Un contorno
          de 15 bloques usa 44 bloques, uno de 21 usa 64 y uno de 33 usa 112.
          Para pozos y chimeneas basta con 7–9; para bases de torre, 15–21; para
          arenas y murallas, 31–51.
        </p>
        <p className="mt-3 text-sm leading-7 text-muted">
          El patrón funciona igual en Java y Bedrock. Si quieres la guía
          completa, con tabla de tamaños y errores comunes, lee{" "}
          <Link
            href="/es/blog/como-hacer-circulos-minecraft/"
            className="pixel-link"
          >
            Cómo hacer un círculo en Minecraft paso a paso
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {sizes.map((item) => (
            <Link key={item.href} href={item.href} className="mc-btn px-3! py-1!">
              <span className="font-pixel text-[10px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
