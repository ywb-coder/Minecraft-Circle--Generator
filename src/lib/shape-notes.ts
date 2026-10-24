export type ShapeNote = {
  en: string;
  es: string;
};

/**
 * Size-specific intros for the indexable shape pages.
 *
 * Keys are canonical, unlocalized paths. Keep them in sync with
 * `INDEXABLE_SHAPE_PATHS` in `src/lib/seo.ts`.
 */
export const SHAPE_NOTES = {
  "/circle/7": {
    en: "Seven blocks across is a deliberately compact circle, and it works well as a well, chimney, or narrow pillar footprint. Check headroom and clearance before committing, because the tight interior leaves almost no room for detail or a ladder.",
    es: "Siete bloques forman un círculo deliberadamente compacto, y funciona muy bien como pozo, chimenea o base de pilar estrecho. Revisa el espacio libre antes de construir, porque el interior ajustado casi no deja sitio para detalles ni para una escalera.",
  },
  "/circle/9": {
    en: "Nine blocks works well for a light well, a compact column, or a small dipping pool where a seven-block circle would feel cramped. The usable center is still narrow, so plan ladders and lighting before you place the first ring.",
    es: "Nueve bloques van bien para un pozo de luz, una columna compacta o una pequeña fuente donde un círculo de siete quedaría apretado. El centro útil sigue siendo estrecho, así que decide escaleras e iluminación antes de colocar el primer anillo.",
  },
  "/circle/11": {
    en: "Eleven blocks suits a small fountain, a garden well, or a modest decorative ring that reads clearly from a distance. Leave the inner edge free of clutter if you want water or a lantern to stay visible from above.",
    es: "Once bloques encajan en una fuente pequeña, un pozo de jardín o un aro decorativo que se distinga desde lejos. Deja el borde interior despejado si quieres que el agua o una linterna se vean desde arriba.",
  },
  "/circle/15": {
    en: "Fifteen blocks is a practical starter size for a tower base, fountain basin, or small plaza that does not overwhelm a build. Watch the wall thickness, since adding a second layer quickly eats the interior space you planned.",
    es: "Quince bloques es un tamaño práctico para la base de una torre, una fuente o una plaza pequeña que no domine el resto de la construcción. Vigila el grosor de la pared, porque una segunda capa reduce enseguida el espacio interior que habías planeado.",
  },
  "/circle/21": {
    en: "Twenty-one blocks gives a standard tower or compact arena enough room to feel open without becoming a major excavation. Confirm your doorway width early, because a single opening can dominate the silhouette at this scale.",
    es: "Veintiún bloques dan a una torre estándar o a una arena compacta espacio suficiente para sentirse abiertos sin exigir una excavación enorme. Define el ancho de la puerta desde el principio, porque una sola abertura puede marcar toda la silueta a esta escala.",
  },
  "/circle/25": {
    en: "Twenty-five blocks is a comfortable size for a garden pond, courtyard, or round room that needs a little breathing space. Plan paths and seating around the rim first, as the larger footprint can crowd nearby builds.",
    es: "Veinticinco bloques es un tamaño cómodo para un estanque de jardín, un patio o una sala redonda que necesite algo de aire. Organiza los caminos y los asientos alrededor del borde primero, ya que la huella más amplia puede apretar las construcciones vecinas.",
  },
  "/circle/31": {
    en: "Thirty-one blocks fits castle towers and mid-sized arenas where the circle should read as a strong architectural feature. Check the height-to-width ratio before building upward, or the tower may look squat when viewed from the ground.",
    es: "Treinta y un bloques encajan en torres de castillo y arenas medianas donde el círculo debe leerse como un elemento arquitectónico fuerte. Comprueba la proporción entre altura y anchura antes de levantar muros, o la torre parecerá achaparrada desde el suelo.",
  },
  "/circle/33": {
    en: "Thirty-three blocks is close to thirty-one but adds a little more presence, which helps when a spire or large tower needs to stand out. Avoid shrinking the interior too much with thick walls, since the extra diameter is easy to lose.",
    es: "Treinta y tres bloques se acercan a treinta y uno, pero añaden algo más de presencia, útil cuando una aguja o una torre grande debe destacar. Evita engrosar demasiado los muros, porque el diámetro extra se pierde con facilidad.",
  },
  "/circle/41": {
    en: "Forty-one blocks is a good arena or courtyard size, with enough circumference for seating, gates, and decorative detail. Decide where traffic enters before laying the ring, because multiple openings are much easier to plan early.",
    es: "Cuarenta y un bloques es una buena medida para una arena o un patio, con circunferencia suficiente para gradas, puertas y detalles decorativos. Decide por dónde entrará la gente antes de cerrar el anillo, porque varias aberturas son mucho más fáciles de planificar al inicio.",
  },
  "/circle/49": {
    en: "Forty-nine blocks suits a keep or large tower where the base should feel monumental rather than merely round. Watch the scale of doors and windows, since standard one-block details start to look lost on a footprint this wide.",
    es: "Cuarenta y nueve bloques sirven para un torreón o una torre grande cuya base deba sentirse monumental, no solo redonda. Cuida la escala de puertas y ventanas, porque los detalles de un bloque empiezan a perderse en una huella tan ancha.",
  },
  "/circle/51": {
    en: "Fifty-one blocks works for a city wall circuit, a broad arena, or a courtyard that needs a generous open floor. Confirm the wall height relative to nearby buildings, or the ring may visually overpower the street around it.",
    es: "Cincuenta y un bloques funcionan para una muralla urbana, una arena amplia o un patio con una superficie despejada generosa. Ajusta la altura del muro al resto de los edificios, o el anillo dominará visualmente la calle que lo rodea.",
  },
  "/circle/65": {
    en: "Sixty-five blocks is large enough for a domed hall or coliseum floor, where the circle becomes a defining piece of the build. Check the ceiling plan first, because a dome at this diameter needs careful support around the rim.",
    es: "Sesenta y cinco bloques es suficiente para una sala con cúpula o el suelo de un coliseo, donde el círculo se convierte en pieza central de la obra. Revisa el plan del techo primero, porque una cúpula de este diámetro necesita apoyo cuidadoso en el borde.",
  },
  "/circle/101": {
    en: "One hundred one blocks is stadium or temple territory, offering a dramatic footprint for a centerpiece build. The main risk is empty space, so sketch the interior layout before you commit to such a wide ring.",
    es: "Ciento un bloques es territorio de estadio o templo, con una huella espectacular para una construcción central. El riesgo principal es el vacío, así que boceta el interior antes de comprometerte con un anillo tan amplio.",
  },
  "/sphere/15": {
    en: "A fifteen-block sphere is a detail piece rather than a room, ideal for lanterns, finials, and decorative globes on top of towers. Keep it hollow only if you need to hide a light source, because the shell is what sells the round silhouette.",
    es: "Una esfera de quince bloques es una pieza de detalle más que una habitación, ideal para linternas, remates y globos decorativos sobre torres. Déjala hueca solo si necesitas esconder una fuente de luz, porque la cáscara es lo que define la silueta redonda.",
  },
  "/sphere/21": {
    en: "Twenty-one blocks makes a convincing globe or a small internal room for a spawn hub or treasure chamber. Keep access in mind from the start, since a hollow sphere this size has limited flat wall space for doors.",
    es: "Veintiún bloques crean un globo convincente o una sala interior pequeña para un centro de aparición o una cámara del tesoro. Piensa en el acceso desde el principio, porque una esfera hueca de este tamaño tiene poca pared plana para puertas.",
  },
  "/sphere/31": {
    en: "Thirty-one blocks reads as a planetoid or boss arena, large enough to walk around inside without feeling cramped. Watch the floor level, because flattening the bottom for a platform changes the silhouette more than you might expect.",
    es: "Treinta y un bloques se leen como un planetoide o una arena de jefe, lo bastante grande para recorrer el interior sin agobios. Vigila el nivel del suelo, porque aplanar la base para una plataforma cambia la silueta más de lo que parece.",
  },
  "/sphere/51": {
    en: "Fifty-one blocks is a strong choice for a spawn globe, greenhouse, or enclosed arena with real interior volume. Plan lighting and access early, since a shell this large can become dark once the roof closes over.",
    es: "Cincuenta y un bloques es una gran opción para un globo de aparición, un invernadero o una arena cerrada con volumen interior real. Planifica la iluminación y el acceso desde el inicio, porque una cáscara así puede quedar oscura al cerrar el techo.",
  },
  "/sphere/101": {
    en: "One hundred one blocks turns the sphere into a landmark or a literal small planet, with room for layered terrain inside. Be realistic about the surface area, because covering a shell this size in detail is a long-term project rather than a quick build.",
    es: "Ciento un bloques convierten la esfera en un punto de referencia o en un pequeño planeta, con espacio para terrenos por capas dentro. Sé realista con la superficie, porque detallar una cáscara de este tamaño es un proyecto de largo plazo y no una construcción rápida.",
  },
  "/dome/15": {
    en: "Fifteen blocks is a compact dome, well suited to kiln covers, small wells, and decorative caps. Keep the opening generous if you plan to use the space underneath, since the curve closes in quickly at this size.",
    es: "Quince bloques forman una cúpula compacta, muy útil para cubrir hornos, pozos pequeños y remates decorativos. Mantén la abertura amplia si quieres aprovechar el espacio inferior, porque la curva se cierra rápido a este tamaño.",
  },
  "/dome/21": {
    en: "Twenty-one blocks makes a useful pavilion or greenhouse roof, with enough headroom for a bench, planter, or small altar. Check the base ring before raising the dome, because a small mismatch there is hard to correct later.",
    es: "Veintiún bloques dan una cúpula práctica para un pabellón o un invernadero, con altura suficiente para un banco, una maceta o un altar pequeño. Revisa el anillo de la base antes de levantar la cúpula, porque un desajuste pequeño allí cuesta corregir después.",
  },
  "/dome/31": {
    en: "Thirty-one blocks is chapel or hall scale, where a dome can become the visual center of a courtyard or sanctuary. Watch the transition to the walls, since the widest ring needs support that matches the rest of the structure.",
    es: "Treinta y un bloques alcanzan escala de capilla o salón, donde la cúpula puede ser el centro visual de un patio o un santuario. Cuida la transición hacia los muros, porque el anillo más ancho necesita un apoyo que dialogue con el resto de la estructura.",
  },
  "/oval/15/7": {
    en: "The fifteen-by-seven oval is a window-shaped footprint, useful for fountains, framed openings, and narrow decorative pools. Keep the long axis aligned with the wall or path it faces, or the shape will look accidentally skewed.",
    es: "El óvalo de quince por siete tiene forma de ventana y sirve para fuentes, aberturas enmarcadas y estanques decorativos estrechos. Alinea el eje largo con la pared o el camino al que mira, o la forma parecerá torcida sin querer.",
  },
  "/oval/21/9": {
    en: "Twenty-one by nine is a good pond or table shape, long enough to feel intentional but shallow enough to fit a room. Check the surrounding floor pattern, because an oval this narrow can clash with square paths and borders.",
    es: "Veintiuno por nueve es una buena forma para un estanque o una mesa, bastante larga para verse intencional y bastante estrecha para caber en una sala. Revisa el suelo alrededor, porque un óvalo así puede chocar con caminos y bordes cuadrados.",
  },
  "/oval/31/15": {
    en: "Thirty-one by fifteen suits an arena, courtyard, or formal lawn where the oval should dominate the layout. Plan entrances on the short ends if you want the long sides left open for seating or planting.",
    es: "Treinta y uno por quince encaja en una arena, un patio o un jardín formal donde el óvalo deba dominar la composición. Coloca las entradas en los extremos cortos si quieres dejar los lados largos libres para asientos o plantas.",
  },
  "/oval/41/21": {
    en: "Forty-one by twenty-one is plaza or large-pool scale, with room for islands, bridges, and a real walking route around the edge. Watch the overall proportions against nearby buildings, since a long oval can stretch a space visually.",
    es: "Cuarenta y uno por veintiuno alcanza escala de plaza o piscina grande, con sitio para islas, puentes y un recorrido real alrededor del borde. Vigila las proporciones frente a los edificios cercanos, porque un óvalo alargado puede estirar visualmente el espacio.",
  },
  "/torus/21/4": {
    en: "A twenty-one-block ring with a four-block tube is a compact torus, handy for portals, small arches, and floating ring decorations. Check the inner opening before placing it, because the tube thickness leaves a smaller pass-through than the outer diameter suggests.",
    es: "Un anillo de veintiún bloques con tubo de cuatro es un toro compacto, práctico para portales, arcos pequeños y aros flotantes decorativos. Comprueba la abertura interior antes de colocarlo, porque el grosor del tubo deja un paso más estrecho de lo que sugiere el diámetro exterior.",
  },
  "/torus/33/6": {
    en: "Thirty-three blocks with a six-block tube make a bold ring or arch that can frame a gateway or serve as a decorative centerpiece. Plan the anchor points first, since a ring this size needs support to avoid looking like it is floating by accident.",
    es: "Treinta y tres bloques con un tubo de seis forman un anillo o arco llamativo, capaz de enmarcar una puerta o servir de pieza decorativa central. Define primero los puntos de anclaje, porque un aro de este tamaño necesita apoyo para no parecer flotante por accidente.",
  },
  "/ellipsoid/15/11/7": {
    en: "The fifteen-by-eleven-by-seven ellipsoid is a small planet or egg shape, ideal for decorations, floating islands, and compact builds. Keep the vertical axis in mind when placing it, because the flattened depth makes the shape read differently from the side.",
    es: "El elipsoide de quince por once por siete es un planeta pequeño o una forma de huevo, ideal para decoraciones, islas flotantes y construcciones compactas. Ten en cuenta el eje vertical al colocarlo, porque la profundidad aplanada hace que se vea distinto desde un lado.",
  },
  "/ellipsoid/21/15/9": {
    en: "Twenty-one by fifteen by nine gives a larger globe or airship envelope, with enough volume to suggest a rounded craft. Watch the mounting point, since a shape this wide can look unbalanced if the support sits off-center.",
    es: "Veintiuno por quince por nueve ofrece un globo mayor o la envoltura de un dirigible, con volumen suficiente para sugerir una nave redondeada. Cuida el punto de montaje, porque una forma tan ancha puede verse desequilibrada si el soporte queda descentrado.",
  },
} satisfies Record<string, ShapeNote>;

export type ShapeNotePath = keyof typeof SHAPE_NOTES;

function normalizeShapePath(path: string): string {
  let normalized = path.trim();
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  normalized = normalized.replace(/\/+/g, "/").replace(/\/+$/, "");
  // Accept localized paths such as /es/circle/15 as a convenience.
  normalized = normalized.replace(/^\/(?:en|es)(?=\/)/, "");
  return normalized === "" ? "/" : normalized;
}

/**
 * Returns the size-specific intro for a canonical shape path and locale.
 * Unknown paths and locales other than `en`/`es` return `undefined`.
 */
export function getShapeNote(
  path: string,
  locale: string
): string | undefined {
  if (locale !== "en" && locale !== "es") return undefined;
  return SHAPE_NOTES[normalizeShapePath(path) as ShapeNotePath]?.[locale];
}
