import type { Locale } from "./i18n/locales";
import { SITE_URL } from "./config";

export type BlogSlug =
  | "minecraft-circle-guide"
  | "minecraft-circle-sizes"
  | "minecraft-sphere-guide"
  | "minecraft-dome-guide"
  | "minecraft-oval-guide"
  | "minecraft-tower-guide";

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogSection {
  h2: string;
  body: string[];
}

export interface BlogPost {
  slug: BlogSlug;
  title: string;
  description: string;
  published: string;
  updated: string;
  image: string;
  faqs: BlogFaq[];
  sections: BlogSection[];
}

export const BLOG_SLUGS: BlogSlug[] = [
  "minecraft-circle-guide",
  "minecraft-circle-sizes",
  "minecraft-sphere-guide",
  "minecraft-dome-guide",
  "minecraft-oval-guide",
  "minecraft-tower-guide",
];

export const BLOG_LOCALES: Locale[] = ["de", "fr", "pt", "ru"];

/** Locales that actually have the new (machine-translated) blog content. */
export type BlogContentLocale = "de" | "fr" | "pt" | "ru";

export function isBlogContentLocale(
  locale: Locale,
): locale is BlogContentLocale {
  return (
    locale === "de" || locale === "fr" || locale === "pt" || locale === "ru"
  );
}

const P = "2026-09-10";
const U = "2026-10-21";

export const BLOG_CONTENT: Record<BlogContentLocale, Record<BlogSlug, BlogPost>> = {
  de: {
    "minecraft-circle-guide": {
      slug: "minecraft-circle-guide",
      title: "Minecraft Kreis-Anleitung: Perfekte Kreise, Kugeln & Kuppeln bauen",
      description:
        "Komplette Anleitung zum Bauen von Kreisen in Minecraft. Lerne gerade vs. ungerade Durchmesser, Schritt für Schritt, und finde die passende Größe für dein Bauwerk.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-15.webp",
      sections: [
        {
          h2: "Warum Kreise in Minecraft schwierig sind",
          body: [
            "Minecraft-Welten bestehen aus quadratischen Blöcken auf einem Raster. Es gibt keine Kurven, also ist jeder Kreis eine Annäherung – ein Ring aus Pixeln, der aus der Ferne rund wirkt. Je größer der Durchmesser, desto glatter erscheint die Kurve.",
          ],
        },
        {
          h2: "Gerade vs. ungerade Durchmesser",
          body: [
            "Nutze immer ungerade Durchmesser (5, 7, 9, 15 …). Ein ungerader Kreis hat genau einen Mittelblock, sodass die Symmetrie stimmt. Gerade Durchmesser wirken verschoben und sind schwerer sauber zu bauen.",
          ],
        },
        {
          h2: "Schritt für Schritt bauen",
          body: [
            "Setze den Mittelblock, zähle dann die Ringe nach außen und übertrage das Pixel-Raster Block für Block. Starte mit kleinen Kreisen (7–15) für Brunnen und später größere (31+) für Arenen.",
          ],
        },
      ],
      faqs: [
        {
          q: "Wie viele Blöcke brauche ich für einen hohlen Minecraft-Kreis?",
          a: "Das hängt vom Durchmesser ab. Ein 15er Kreis braucht 40 Blöcke, ein 21er 56, ein 31er 84, ein 41er 112. Der CircleGen-Generator liefert exakte Zahlen für jeden Durchmesser.",
        },
        {
          q: "Funktionieren Kreise in Java und Bedrock gleich?",
          a: "Ja. Der Pixel-Kreis-Algorithmus nutzt in beiden Editionen dieselbe Raster-Mathematik. Jeder CircleGen-Bauplan funktioniert identisch in Java und Bedrock.",
        },
        {
          q: "Wie baue ich eine Kugel in Minecraft?",
          a: "Eine Kugel ist ein Stapel aus Kreis-Scheiben unterschiedlicher Durchmesser. Beginne mit dem größten Kreis am Äquator und setze darüber und darunter kleinere Scheiben, bis sie oben und unten auf einen Block zulaufen.",
        },
      ],
    },
    "minecraft-circle-sizes": {
      slug: "minecraft-circle-sizes",
      title: "Minecraft Kreis-Größen: Blockzahlen für jede Bauform",
      description:
        "Vollständige Größentabelle mit Blockzahlen für Kreise, Kugeln, Kuppeln, Ovale und Türme in Minecraft. Wähle die passende Größe für dein Projekt.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-101.webp",
      sections: [
        {
          h2: "Kreise nach Durchmesser",
          body: [
            "Kleine Kreise (5–15) eignen sich für Brunnen und Fenster, 21–49 für Türme und Räume, ab 65 für Stadien und Kolosseen. Ein 15er Außenkreis hat 40 Blöcke, ein 101er 316 Blöcke.",
          ],
        },
        {
          h2: "Kugeln und Kuppeln",
          body: [
            "Eine 15er Kugel besteht aus mehreren Lagen mit insgesamt 1143 Blöcken, eine 15er Kuppel aus der unteren Hälfte mit 570 Blöcken. Größere Durchmesser bauen sich Schicht für Schicht.",
          ],
        },
        {
          h2: "Die richtige Größe wählen",
          body: [
            "Plane zuerst den Zweck: Deko, Basis oder riesiges Bauwerk. Der CircleGen-Rechner zeigt sofort die Blockzahl, damit du Material und Aufwand gut einschätzen kannst.",
          ],
        },
      ],
      faqs: [
        {
          q: "Wie viele Blöcke hat ein 21er Kreis?",
          a: "Ein 21 Block großer Kreis (Außenlinie) verbraucht 56 Blöcke. Die genaue Zahl für jeden Durchmesser liefert der CircleGen-Generator.",
        },
        {
          q: "Wie viele Blöcke hat eine 15er Kugel?",
          a: "Eine Kugel mit Durchmesser 15 benötigt 1143 Blöcke über 15 Lagen. Eine passende Kuppel (Hälfte) braucht 570 Blöcke.",
        },
        {
          q: "Welcher Durchmesser für einen Turm?",
          a: "21–49 Blöcke sind ideal für Türme und Räume. 21–33 reichen für kompakte Türme, 41–49 für große Türme oder Arena-Ringe.",
        },
      ],
    },
    "minecraft-sphere-guide": {
      slug: "minecraft-sphere-guide",
      title: "Minecraft Kugel-Anleitung: Kreise zu einer Kugel stapeln",
      description:
        "Lerne, in Minecraft eine Kugel zu bauen. Verwandle Kreis-Scheiben in eine geschichtete Kugel – Schritt für Schritt mit exakten Bauplänen.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-21.webp",
      sections: [
        {
          h2: "Das Prinzip",
          body: [
            "Eine Kugel ist ein Stapel von Kreis-Scheiben mit variierenden Durchmessern. Die Mitte ist am breitesten, nach oben und unten laufen die Scheiben auf einen Block zu.",
          ],
        },
        {
          h2: "Vom Äquator nach außen",
          body: [
            "Baue zuerst den größten Kreis als Äquator, dann setze darüber und darunter kleinere Kreise, bis die Kugel schließt. Jede Lage ist ein eigener Bauplan.",
          ],
        },
        {
          h2: "Exakte Baupläne nutzen",
          body: [
            "Der CircleGen-Kugel-Generator gibt jede Scheibe als Block-für-Block-Bauplan aus. So vermeidest du Zählfehler und die Kugel wird symmetrisch.",
          ],
        },
      ],
      faqs: [
        {
          q: "Wie baue ich eine Kugel in Minecraft?",
          a: "Stapel Kreis-Scheiben abnehmender Durchmesser. Beginn mit dem größten Kreis als Äquator und arbeite nach oben und unten, bis eine einzelne Block-Spitze erreicht ist.",
        },
        {
          q: "Wie viele Blöcke hat eine 15er Kugel?",
          a: "Eine Kugel mit Durchmesser 15 hat 1143 Blöcke über 15 Lagen. Der Generator zeigt die genaue Zahl für jede Größe.",
        },
        {
          q: "Funktioniert das in Java und Bedrock?",
          a: "Ja. Die Baupläne sind reine Block-Positionen und funktionieren identisch in beiden Editionen.",
        },
      ],
    },
    "minecraft-dome-guide": {
      slug: "minecraft-dome-guide",
      title: "Minecraft Kuppel-Anleitung: Eine Halbkugel auf ebener Basis",
      description:
        "Baue in Minecraft eine Kuppel. Wähle einen Basis-Durchmesser und stapel eine Halbkugel als Dach – mit exakten, geschichteten Bauplänen.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-31.webp",
      sections: [
        {
          h2: "Kuppel = untere Hälfte einer Kugel",
          body: [
            "Eine Kuppel ist die untere Hälfte einer Kugel. Du baust von der ebenen Basis aus nach oben, die Ringe weiten sich zum Äquator und enden am breitsten Ring.",
          ],
        },
        {
          h2: "Basis-Durchmesser wählen",
          body: [
            "Ein 15er Durchmesser eignet sich für kleine Kuppeln, 31+ für große Hallen. Je größer, desto glatter wirkt die Wölbung.",
          ],
        },
        {
          h2: "Schicht für Schicht bauen",
          body: [
            "Beginne mit dem breitesten Ring auf dem Boden, dann setze kleinere Ringe darüber, bis die Kuppel schließt. Jede Lage ist ein eigener Bauplan.",
          ],
        },
      ],
      faqs: [
        {
          q: "Wie viele Blöcke hat eine 15er Kuppel?",
          a: "Eine Kuppel mit Durchmesser 15 hat 570 Blöcke über 8 Lagen. Der Generator liefert die Zahl für jede Größe.",
        },
        {
          q: "Wie baue ich eine Kuppel in Minecraft?",
          a: "Wähle einen Basis-Durchmesser, baue den breitesten Ring auf den Boden und stapel darüber kleinere Ringe, bis die Halbkugel schließt.",
        },
        {
          q: "Kann ich die Kuppel als Dach nutzen?",
          a: "Ja. Kuppeln eignen sich hervorragend als Dächer für Rundenhäuser, Tempel oder Arena-Hallen.",
        },
      ],
    },
    "minecraft-oval-guide": {
      slug: "minecraft-oval-guide",
      title: "Minecraft Oval-Anleitung: Breite und Höhe als Bauplan",
      description:
        "Baue in Minecraft ein Oval. Breite und Höhe ergeben gestreckte Kreis-Baupläne – Schritt für Schritt mit exakten Vorlagen.",
      published: P,
      updated: U,
      image: "/shape-pngs/oval-21-9.webp",
      sections: [
        {
          h2: "Oval = gestreckter Kreis",
          body: [
            "Ein Oval hat unabhängige Breite und Höhe. Es wird wie ein Kreis gebaut, nur auf einer Achse gestreckt. Typisch sind 21×9 oder 31×15.",
          ],
        },
        {
          h2: "Breite und Höhe wählen",
          body: [
            "Für Fenster und Gänge reichen kleine Ovale (15×7), für Hallen größere (31×15). Die Proportion bestimmt das Aussehen.",
          ],
        },
        {
          h2: "Bauplan übertragen",
          body: [
            "Der CircleGen-Oval-Generator gibt ein Pixel-Raster für deine Breite/Höhe aus. Übertrage es Block für Block in Minecraft.",
          ],
        },
      ],
      faqs: [
        {
          q: "Wie baue ich ein Oval in Minecraft?",
          a: "Wähle Breite und Höhe, lies den Bauplan und übertrage das Raster Block für Block, beginnend mit der Mittelachse.",
        },
        {
          q: "Was ist ein gutes Oval-Maß?",
          a: "21×9 eignet sich für Türen und Fenster, 31×15 für größere Räume. Die Werte bestimmen die Streckung.",
        },
        {
          q: "Funktioniert das in Java und Bedrock?",
          a: "Ja. Der Bauplan ist ein einfaches Block-Raster und funktioniert in beiden Editionen identisch.",
        },
      ],
    },
    "minecraft-tower-guide": {
      slug: "minecraft-tower-guide",
      title: "Minecraft Turm-Anleitung: Fußabdruck, Wand und Treppe planen",
      description:
        "Plane in Minecraft einen Turm. Wähle den Fußabdruck nach Innenfläche, Wänden und Treppen – mit exakten Kreis-Bauplänen.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-21.webp",
      sections: [
        {
          h2: "Fußabdruck bestimmen",
          body: [
            "Der Durchmesser legt fest, wie viel Innenraum der Turm hat. Ein 21er Kreis bietet Platz für eine kompakte Plattform, 41+ für große Türme.",
          ],
        },
        {
          h2: "Wand und Treppe",
          body: [
            "Eine dicke Wand (1–6 Blöcke) macht stabile Mauern. Plan Treppen oder Wendeltreppen entlang der Innenseite, damit der Turm begehbar bleibt.",
          ],
        },
        {
          h2: "Größe wählen",
          body: [
            "21–33 für kompakte Türme und Silos, 41–49 für große Türme oder Arena-Ringe. Größere Durchmesser wirken majestatischer.",
          ],
        },
      ],
      faqs: [
        {
          q: "Welcher Durchmesser für einen Turm?",
          a: "21–49 Blöcke sind ideal. 21–33 reichen für kompakte Türme, 41–49 für große Türme und Arena-Ringe.",
        },
        {
          q: "Wie plane ich die Treppe?",
          a: "Nutze die Innenseite des Kreises für eine Wendeltreppe. Ein dickerer Rand (2–4 Blöcke) gibt stabilen Wandplatz.",
        },
        {
          q: "Funktioniert das in Java und Bedrock?",
          a: "Ja. Die Kreis-Baupläne funktionieren identisch in beiden Editionen.",
        },
      ],
    },
  },
  fr: {
    "minecraft-circle-guide": {
      slug: "minecraft-circle-guide",
      title: "Guide du cercle Minecraft : cercles, sphères et dômes parfaits",
      description:
        "Guide complet pour construire des cercles dans Minecraft. Diamètres pairs ou impairs, étape par étape, et la taille idéale pour votre construction.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-15.webp",
      sections: [
        {
          h2: "Pourquoi les cercles sont difficiles",
          body: [
            "Les mondes Minecraft sont faits de blocs carrés sur une grille. Il n'y a pas de courbes, donc chaque cercle est une approximation – un anneau de pixels qui paraît rond de loin. Plus le diamètre est grand, plus la courbe semble lisse.",
          ],
        },
        {
          h2: "Diamètres pairs ou impairs",
          body: [
            "Utilisez toujours des diamètres impairs (5, 7, 9, 15 …). Un cercle impair a un bloc central exact, ce qui donne une symétrie parfaite. Les diamètres pairs paraissent décalés.",
          ],
        },
        {
          h2: "Construire étape par étape",
          body: [
            "Placez le bloc central, comptez les anneaux vers l'extérieur et recopiez la grille pixel par pixel. Commencez petit (7–15) pour les fontaines, puis plus grand (31+) pour les arènes.",
          ],
        },
      ],
      faqs: [
        {
          q: "Combien de blocs pour un cercle creux Minecraft ?",
          a: "Cela dépend du diamètre. Un cercle de 15 utilise 40 blocs, 21 en utilise 56, 31 en utilise 84, 41 en utilise 112. CircleGen donne le compte exact pour chaque diamètre.",
        },
        {
          q: "Les cercles diffèrent-ils entre Java et Bedrock ?",
          a: "Non. L'algorithme de cercle pixel utilise la même grille dans les deux éditions. Chaque plan CircleGen fonctionne à l'identique.",
        },
        {
          q: "Comment construire une sphère dans Minecraft ?",
          a: "Une sphère est une pile de tranches de cercles de diamètres décroissants. Commencez par le plus grand cercle à l'équateur, puis empilez des cercles plus petits jusqu'à un seul bloc en haut et en bas.",
        },
      ],
    },
    "minecraft-circle-sizes": {
      slug: "minecraft-circle-sizes",
      title: "Tailles de cercle Minecraft : nombre de blocs par construction",
      description:
        "Tableau complet des tailles avec le nombre de blocs pour cercles, sphères, dômes, ovales et tours dans Minecraft. Choisissez la bonne taille.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-101.webp",
      sections: [
        {
          h2: "Cercles par diamètre",
          body: [
            "Les petits cercles (5–15) conviennent aux fontaines et fenêtres, 21–49 aux tours et pièces, 65+ aux stades et colisées. Un cercle de 15 compte 40 blocs, un de 101 en compte 316.",
          ],
        },
        {
          h2: "Sphères et dômes",
          body: [
            "Une sphère de 15 compte 1143 blocs sur 15 couches, un dôme de 15 (moitié) en compte 570. Les grands diamètres se construisent couche par couche.",
          ],
        },
        {
          h2: "Choisir la bonne taille",
          body: [
            "Définissez d'abord l'usage : déco, base ou mégastructure. CircleGen affiche aussitôt le nombre de blocs pour estimer matériaux et effort.",
          ],
        },
      ],
      faqs: [
        {
          q: "Combien de blocs pour un cercle de 21 ?",
          a: "Un cercle de 21 (contour) utilise 56 blocs. CircleGen donne le compte exact pour chaque diamètre.",
        },
        {
          q: "Combien de blocs pour une sphère de 15 ?",
          a: "Une sphère de diamètre 15 nécessite 1143 blocs sur 15 couches. Un dôme équivalent en nécessite 570.",
        },
        {
          q: "Quel diamètre pour une tour ?",
          a: "21–49 blocs sont idéaux. 21–33 suffisent aux tours compactes, 41–49 aux grandes tours et anneaux d'arène.",
        },
      ],
    },
    "minecraft-sphere-guide": {
      slug: "minecraft-sphere-guide",
      title: "Guide de la sphère Minecraft : empiler des cercles en sphère",
      description:
        "Apprenez à construire une sphère dans Minecraft. Transformez des tranches de cercles en sphère en couches – étape par étape avec plans précis.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-21.webp",
      sections: [
        {
          h2: "Le principe",
          body: [
            "Une sphère est une pile de tranches de cercles de diamètres variés. Le centre est le plus large, puis les tranches rétrécissent vers un bloc en haut et en bas.",
          ],
        },
        {
          h2: "Depuis l'équateur",
          body: [
            "Construisez d'abord le plus grand cercle comme équateur, puis empilez des cercles plus petits au-dessus et en dessous jusqu'à la fermeture de la sphère.",
          ],
        },
        {
          h2: "Utiliser des plans précis",
          body: [
            "Le générateur de sphère CircleGen donne chaque tranche comme plan bloc par bloc, évitant les erreurs de comptage et garantissant la symétrie.",
          ],
        },
      ],
      faqs: [
        {
          q: "Comment construire une sphère dans Minecraft ?",
          a: "Empilez des tranches de cercles de diamètre décroissant. Commencez par le plus grand cercle à l'équateur et montez/descendez jusqu'à un seul bloc.",
        },
        {
          q: "Combien de blocs pour une sphère de 15 ?",
          a: "Une sphère de diamètre 15 compte 1143 blocs sur 15 couches. Le générateur donne le compte exact.",
        },
        {
          q: "Cela fonctionne-t-il sur Java et Bedrock ?",
          a: "Oui. Les plans sont de simples positions de blocs, identiques dans les deux éditions.",
        },
      ],
    },
    "minecraft-dome-guide": {
      slug: "minecraft-dome-guide",
      title: "Guide du dôme Minecraft : une demi-sphère sur base plane",
      description:
        "Construisez un dôme dans Minecraft. Choisissez un diamètre de base et empilez une demi-sphère comme toit – plans en couches précis.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-31.webp",
      sections: [
        {
          h2: "Dôme = moitié inférieure d'une sphère",
          body: [
            "Un dôme est la moitié inférieure d'une sphère. On construit depuis la base plane vers le haut, les anneaux s'élargissent jusqu'à l'équateur puis s'arrêtent au cercle le plus large.",
          ],
        },
        {
          h2: "Choisir le diamètre de base",
          body: [
            "Un diamètre de 15 convient aux petits dômes, 31+ aux grandes halles. Plus c'est grand, plus la courbure paraît lisse.",
          ],
        },
        {
          h2: "Construire couche par couche",
          body: [
            "Commencez par l'anneau le plus large au sol, puis empilez des anneaux plus petits jusqu'à la fermeture du dôme. Chaque couche est un plan distinct.",
          ],
        },
      ],
      faqs: [
        {
          q: "Combien de blocs pour un dôme de 15 ?",
          a: "Un dôme de diamètre 15 compte 570 blocs sur 8 couches. Le générateur donne le compte pour chaque taille.",
        },
        {
          q: "Comment construire un dôme dans Minecraft ?",
          a: "Choisissez un diamètre de base, posez le cercle le plus large au sol et empilez des anneaux plus petits jusqu'à fermer la demi-sphère.",
        },
        {
          q: "Puis-je utiliser le dôme comme toit ?",
          a: "Oui. Les dômes font d'excellents toits pour maisons rondes, temples ou halles d'arène.",
        },
      ],
    },
    "minecraft-oval-guide": {
      slug: "minecraft-oval-guide",
      title: "Guide de l'ovale Minecraft : largeur et hauteur comme plan",
      description:
        "Construisez un ovale dans Minecraft. Largeur et hauteur donnent des plans étirés – étape par étape avec gabarits précis.",
      published: P,
      updated: U,
      image: "/shape-pngs/oval-21-9.webp",
      sections: [
        {
          h2: "Ovale = cercle étiré",
          body: [
            "Un ovale a une largeur et une hauteur indépendantes. Il se construit comme un cercle, étiré sur un axe. Typiquement 21×9 ou 31×15.",
          ],
        },
        {
          h2: "Choisir largeur et hauteur",
          body: [
            "Les petits ovales (15×7) conviennent aux portes et fenêtres, les plus grands (31×15) aux halles. La proportion définit l'aspect.",
          ],
        },
        {
          h2: "Transposer le plan",
          body: [
            "Le générateur d'ovales CircleGen fournit une grille pixel pour votre largeur/hauteur. Recopiez-la bloc par bloc dans Minecraft.",
          ],
        },
      ],
      faqs: [
        {
          q: "Comment construire un ovale dans Minecraft ?",
          a: "Choisissez largeur et hauteur, lisez le plan et transposer la grille bloc par bloc en partant de l'axe central.",
        },
        {
          q: "Quelle est une bonne mesure d'ovale ?",
          a: "21×9 convient aux portes et fenêtres, 31×15 aux grandes pièces. Les valeurs définissent l'étirement.",
        },
        {
          q: "Cela fonctionne-t-il sur Java et Bedrock ?",
          a: "Oui. Le plan est une simple grille de blocs, identique dans les deux éditions.",
        },
      ],
    },
    "minecraft-tower-guide": {
      slug: "minecraft-tower-guide",
      title: "Guide de la tour Minecraft : emprise, mur et escalier",
      description:
        "Planifiez une tour dans Minecraft. Choisissez l'emprise selon l'espace, les murs et les escaliers – plans de cercle précis.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-21.webp",
      sections: [
        {
          h2: "Définir l'emprise",
          body: [
            "Le diamètre détermine l'espace intérieur de la tour. Un cercle de 21 offre une plateforme compacte, 41+ aux grandes tours.",
          ],
        },
        {
          h2: "Mur et escalier",
          body: [
            "Un mur épais (1–6 blocs) donne des murs solides. Prévoyez un escalier en colimaçon le long de l'intérieur pour garder la tour accessible.",
          ],
        },
        {
          h2: "Choisir la taille",
          body: [
            "21–33 pour tours compactes et silos, 41–49 pour grandes tours ou anneaux d'arène. Les grands diamètres paraissent plus majestueux.",
          ],
        },
      ],
      faqs: [
        {
          q: "Quel diamètre pour une tour ?",
          a: "21–49 blocs sont idéaux. 21–33 suffisent aux tours compactes, 41–49 aux grandes tours et anneaux d'arène.",
        },
        {
          q: "Comment planifier l'escalier ?",
          a: "Utilisez l'intérieur du cercle pour un escalier en colimaçon. Un bord plus épais (2–4 blocs) offre un mur stable.",
        },
        {
          q: "Cela fonctionne-t-il sur Java et Bedrock ?",
          a: "Oui. Les plans de cercle fonctionnent à l'identique dans les deux éditions.",
        },
      ],
    },
  },
  pt: {
    "minecraft-circle-guide": {
      slug: "minecraft-circle-guide",
      title: "Guia do círculo Minecraft: círculos, esferas e cúpulas perfeitos",
      description:
        "Guia completo para construir círculos no Minecraft. Diâmetros ímpares vs pares, passo a passo, e o tamanho ideal para sua construção.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-15.webp",
      sections: [
        {
          h2: "Por que círculos são difíceis",
          body: [
            "Mundos Minecraft são feitos de blocos quadrados em uma grade. Não há curvas, então cada círculo é uma aproximação – um anel de pixels que parece redondo de longe. Quanto maior o diâmetro, mais suave a curva.",
          ],
        },
        {
          h2: "Diâmetros ímpares vs pares",
          body: [
            "Use sempre diâmetros ímpares (5, 7, 9, 15 …). Um círculo ímpar tem um bloco central exato, garantindo simetria. Diâmetros pares parecem desalinhados.",
          ],
        },
        {
          h2: "Construir passo a passo",
          body: [
            "Coloque o bloco central, conte os anéis para fora e copie a grade pixel a pixel. Comece pequeno (7–15) para fontes, depois maior (31+) para arenas.",
          ],
        },
      ],
      faqs: [
        {
          q: "Quantos blocos preciso para um círculo oco no Minecraft?",
          a: "Depende do diâmetro. Um círculo de 15 usa 40 blocos, 21 usa 56, 31 usa 84, 41 usa 112. O CircleGen dá a contagem exata para cada diâmetro.",
        },
        {
          q: "Círculos funcionam diferente no Java e Bedrock?",
          a: "Não. O algoritmo de círculo pixel usa a mesma grade em ambas as edições. Cada planta CircleGen funciona igual.",
        },
        {
          q: "Como construir uma esfera no Minecraft?",
          a: "Uma esfera é uma pilha de fatias de círculos de diâmetros decrescentes. Comece pelo maior círculo no equador e empilhe círculos menores até um bloco no topo e embaixo.",
        },
      ],
    },
    "minecraft-circle-sizes": {
      slug: "minecraft-circle-sizes",
      title: "Tamanhos de círculo Minecraft: blocos por tipo de construção",
      description:
        "Tabela completa de tamanhos com contagem de blocos para círculos, esferas, cúpulas, oval e torres no Minecraft. Escolha o tamanho certo.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-101.webp",
      sections: [
        {
          h2: "Círculos por diâmetro",
          body: [
            "Pequenos círculos (5–15) servem para fontes e janelas, 21–49 para torres e salas, 65+ para estádios e coliseus. Um círculo de 15 tem 40 blocos, um de 101 tem 316.",
          ],
        },
        {
          h2: "Esferas e cúpulas",
          body: [
            "Uma esfera de 15 tem 1143 blocos em 15 camadas, uma cúpula de 15 (metade) tem 570. Diâmetros maiores se constroem camada por camada.",
          ],
        },
        {
          h2: "Escolher o tamanho certo",
          body: [
            "Defina primeiro o uso: decoração, base ou megaestrutura. O CircleGen mostra na hora a contagem de blocos para estimar materiais.",
          ],
        },
      ],
      faqs: [
        {
          q: "Quantos blocos tem um círculo de 21?",
          a: "Um círculo de 21 (contorno) usa 56 blocos. O CircleGen dá a contagem exata para cada diâmetro.",
        },
        {
          q: "Quantos blocos tem uma esfera de 15?",
          a: "Uma esfera de diâmetro 15 precisa de 1143 blocos em 15 camadas. Uma cúpula equivalente precisa de 570.",
        },
        {
          q: "Qual diâmetro para uma torre?",
          a: "21–49 blocos são ideais. 21–33 bastam para torres compactas, 41–49 para grandes torres e anéis de arena.",
        },
      ],
    },
    "minecraft-sphere-guide": {
      slug: "minecraft-sphere-guide",
      title: "Guia da esfera Minecraft: empilhar círculos em esfera",
      description:
        "Aprenda a construir uma esfera no Minecraft. Transforme fatias de círculos em esfera em camadas – passo a passo com plantas precisas.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-21.webp",
      sections: [
        {
          h2: "O princípio",
          body: [
            "Uma esfera é uma pilha de fatias de círculos de diâmetros variados. O centro é o mais largo, e as fatias afunilam para um bloco no topo e embaixo.",
          ],
        },
        {
          h2: "Do equador para fora",
          body: [
            "Construa primeiro o maior círculo como equador, depois empilhe círculos menores acima e abaixo até a esfera fechar.",
          ],
        },
        {
          h2: "Usar plantas precisas",
          body: [
            "O gerador de esfera CircleGen fornece cada fatia como planta bloco a bloco, evitando erros de contagem e garantindo simetria.",
          ],
        },
      ],
      faqs: [
        {
          q: "Como construir uma esfera no Minecraft?",
          a: "Empilhe fatias de círculos de diâmetro decrescente. Comece pelo maior círculo no equador e suba/desça até um único bloco.",
        },
        {
          q: "Quantos blocos tem uma esfera de 15?",
          a: "Uma esfera de diâmetro 15 tem 1143 blocos em 15 camadas. O gerador dá a contagem exata.",
        },
        {
          q: "Funciona no Java e Bedrock?",
          a: "Sim. As plantas são posições simples de blocos, idênticas nas duas edições.",
        },
      ],
    },
    "minecraft-dome-guide": {
      slug: "minecraft-dome-guide",
      title: "Guia da cúpula Minecraft: meia esfera sobre base plana",
      description:
        "Construa uma cúpula no Minecraft. Escolha um diâmetro de base e empilhe meia esfera como teto – plantas em camadas precisas.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-31.webp",
      sections: [
        {
          h2: "Cúpula = metade inferior da esfera",
          body: [
            "Uma cúpula é a metade inferior de uma esfera. Constrói-se da base plana para cima, os anéis alargam até o equador e param no anel mais largo.",
          ],
        },
        {
          h2: "Escolher o diâmetro de base",
          body: [
            "Um diâmetro de 15 serve para cúpulas pequenas, 31+ para grandes salões. Quanto maior, mais suave a curvatura.",
          ],
        },
        {
          h2: "Construir camada por camada",
          body: [
            "Comece pelo anel mais largo no chão, depois empilhe anéis menores até a cúpula fechar. Cada camada é uma planta própria.",
          ],
        },
      ],
      faqs: [
        {
          q: "Quantos blocos tem uma cúpula de 15?",
          a: "Uma cúpula de diâmetro 15 tem 570 blocos em 8 camadas. O gerador dá a contagem para cada tamanho.",
        },
        {
          q: "Como construir uma cúpula no Minecraft?",
          a: "Escolha um diâmetro de base, coloque o círculo mais largo no chão e empilhe anéis menores até fechar a meia esfera.",
        },
        {
          q: "Posso usar a cúpula como teto?",
          a: "Sim. Cúpulas são excelentes telhados para casas redondas, templos ou salões de arena.",
        },
      ],
    },
    "minecraft-oval-guide": {
      slug: "minecraft-oval-guide",
      title: "Guia do oval Minecraft: largura e altura como planta",
      description:
        "Construa um oval no Minecraft. Largura e altura geram plantas esticadas – passo a passo com gabaritos precisos.",
      published: P,
      updated: U,
      image: "/shape-pngs/oval-21-9.webp",
      sections: [
        {
          h2: "Oval = círculo esticado",
          body: [
            "Um oval tem largura e altura independentes. Constrói-se como um círculo, esticado em um eixo. Tipicamente 21×9 ou 31×15.",
          ],
        },
        {
          h2: "Escolher largura e altura",
          body: [
            "Pequenos ovais (15×7) servem para portas e janelas, maiores (31×15) para salões. A proporção define a aparência.",
          ],
        },
        {
          h2: "Transpor a planta",
          body: [
            "O gerador de ovais CircleGen fornece uma grade pixel para sua largura/altura. Copie bloco a bloco no Minecraft.",
          ],
        },
      ],
      faqs: [
        {
          q: "Como construir um oval no Minecraft?",
          a: "Escolha largura e altura, leia a planta e copie a grade bloco a bloco a partir do eixo central.",
        },
        {
          q: "Qual uma boa medida de oval?",
          a: "21×9 serve para portas e janelas, 31×15 para salas maiores. Os valores definem o esticamento.",
        },
        {
          q: "Funciona no Java e Bedrock?",
          a: "Sim. A planta é uma grade simples de blocos, idêntica nas duas edições.",
        },
      ],
    },
    "minecraft-tower-guide": {
      slug: "minecraft-tower-guide",
      title: "Guia da torre Minecraft: área, parede e escada",
      description:
        "Planeje uma torre no Minecraft. Escolha a área pela base, paredes e escadas – plantas de círculo precisas.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-21.webp",
      sections: [
        {
          h2: "Definir a área",
          body: [
            "O diâmetro determina o espaço interno da torre. Um círculo de 21 oferece uma plataforma compacta, 41+ para grandes torres.",
          ],
        },
        {
          h2: "Parede e escada",
          body: [
            "Uma parede espessa (1–6 blocos) dá muros sólidos. Planeje uma escada em caracol pela parte interna para manter a torre acessível.",
          ],
        },
        {
          h2: "Escolher o tamanho",
          body: [
            "21–33 para torres compactas e silos, 41–49 para grandes torres ou anéis de arena. Diâmetros maiores parecem mais imponentes.",
          ],
        },
      ],
      faqs: [
        {
          q: "Qual diâmetro para uma torre?",
          a: "21–49 blocos são ideais. 21–33 bastam para torres compactas, 41–49 para grandes torres e anéis de arena.",
        },
        {
          q: "Como planejar a escada?",
          a: "Use o interior do círculo para uma escada em caracol. Uma borda mais espessa (2–4 blocos) dá um muro estável.",
        },
        {
          q: "Funciona no Java e Bedrock?",
          a: "Sim. As plantas de círculo funcionam iguais nas duas edições.",
        },
      ],
    },
  },
  ru: {
    "minecraft-circle-guide": {
      slug: "minecraft-circle-guide",
      title: "Руководство по кругам в Minecraft: идеальные круги, сферы и купола",
      description:
        "Полное руководство по постройке кругов в Minecraft. Нечётные и чётные диаметры, шаг за шагом, и подходящий размер для вашей постройки.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-15.webp",
      sections: [
        {
          h2: "Почему круги сложны в Minecraft",
          body: [
            "Миры Minecraft состоят из квадратных блоков на сетке. Изогнутых граней нет, поэтому любой круг — это приближение: кольцо из пикселей, которое издали кажется круглым. Чем больше диаметр, тем глаже кривая.",
          ],
        },
        {
          h2: "Чётные и нечётные диаметры",
          body: [
            "Всегда используйте нечётные диаметры (5, 7, 9, 15 …). У нечётного круга есть ровно один центральный блок, что даёт симметрию. Чётные выглядят смещёнными.",
          ],
        },
        {
          h2: "Строим шаг за шагом",
          body: [
            "Поставьте центральный блок, отсчитайте кольца наружу и перенесите пиксельную сетку блок за блоком. Начните с малых (7–15) для фонтанов, потом больше (31+) для арен.",
          ],
        },
      ],
      faqs: [
        {
          q: "Сколько блоков нужно для пустого круга в Minecraft?",
          a: "Зависит от диаметра. Круг 15 занимает 40 блоков, 21 — 56, 31 — 84, 41 — 112. CircleGen даёт точное число для любого диаметра.",
        },
        {
          q: "Круги работают по-разному в Java и Bedrock?",
          a: "Нет. Алгоритм пиксельного круга использует одну сетку в обеих версиях. Любая схема CircleGen работает одинаково.",
        },
        {
          q: "Как построить сферу в Minecraft?",
          a: "Сфера — это стопка круговых срезов убывающего диаметра. Начните с самого большого круга по экватору и выкладывайте меньшие срезы вверх и вниз до одного блока.",
        },
      ],
    },
    "minecraft-circle-sizes": {
      slug: "minecraft-circle-sizes",
      title: "Размеры кругов Minecraft: блоки для каждой постройки",
      description:
        "Полная таблица размеров с числом блоков для кругов, сфер, куполов, овалов и башен в Minecraft. Выберите подходящий размер.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-101.webp",
      sections: [
        {
          h2: "Круги по диаметру",
          body: [
            "Малые круги (5–15) подходят для фонтанов и окон, 21–49 — для башен и комнат, 65+ — для стадионов и колизеев. Круг 15 содержит 40 блоков, 101 — 316.",
          ],
        },
        {
          h2: "Сферы и купола",
          body: [
            "Сфера 15 содержит 1143 блока в 15 слоях, купол 15 (половина) — 570. Большие диаметры строятся слой за слоём.",
          ],
        },
        {
          h2: "Выбрать правильный размер",
          body: [
            "Сначала определите назначение: декор, основание или мегапостройка. CircleGen сразу показывает число блоков для оценки материалов.",
          ],
        },
      ],
      faqs: [
        {
          q: "Сколько блоков в круге 21?",
          a: "Круг 21 (контур) занимает 56 блоков. CircleGen даёт точное число для любого диаметра.",
        },
        {
          q: "Сколько блоков в сфере 15?",
          a: "Сфера диаметром 15 требует 1143 блока в 15 слоях. Соответствующий купол требует 570.",
        },
        {
          q: "Какой диаметр для башни?",
          a: "21–49 блоков идеальны. 21–33 хватит для компактных башен, 41–49 — для больших башен и аренных колец.",
        },
      ],
    },
    "minecraft-sphere-guide": {
      slug: "minecraft-sphere-guide",
      title: "Руководство по сферам Minecraft: собираем сферу из кругов",
      description:
        "Узнайте, как построить сферу в Minecraft. Превратите круговые срезы в послойную сферу — шаг за шагом с точными схемами.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-21.webp",
      sections: [
        {
          h2: "Принцип",
          body: [
            "Сфера — это стопка круговых срезов разного диаметра. В центре она шире всего, к верху и низу срезы сужаются до одного блока.",
          ],
        },
        {
          h2: "От экватора наружу",
          body: [
            "Сначала постройте самый большой круг как экватор, затем выкладывайте меньшие круги выше и ниже, пока сфера не замкнётся.",
          ],
        },
        {
          h2: "Используйте точные схемы",
          body: [
            "Генератор сфер CircleGen выдаёт каждый срез как схему блок за блоком, исключая ошибки счёта и гарантируя симметрию.",
          ],
        },
      ],
      faqs: [
        {
          q: "Как построить сферу в Minecraft?",
          a: "Выложите стопку кругов убывающего диаметра. Начните с самого большого круга по экватору и идите вверх и вниз до одного блока.",
        },
        {
          q: "Сколько блоков в сфере 15?",
          a: "Сфера диаметром 15 содержит 1143 блока в 15 слоях. Генератор даёт точное число.",
        },
        {
          q: "Работает в Java и Bedrock?",
          a: "Да. Схемы — это простые позиции блоков, одинаковые в обеих версиях.",
        },
      ],
    },
    "minecraft-dome-guide": {
      slug: "minecraft-dome-guide",
      title: "Руководство по куполам Minecraft: полусфера на плоском основании",
      description:
        "Постройте купол в Minecraft. Выберите диаметр основания и выложите полусферу как крышу — точные послойные схемы.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-31.webp",
      sections: [
        {
          h2: "Купол = нижняя половина сферы",
          body: [
            "Купол — это нижняя половина сферы. Строим от плоского основания вверх: кольца расширяются к экватору и останавливаются на самом широком кольце.",
          ],
        },
        {
          h2: "Выбрать диаметр основания",
          body: [
            "Диаметр 15 подходит для малых куполов, 31+ — для больших залов. Чем больше, тем глаже изгиб.",
          ],
        },
        {
          h2: "Строим слой за слоем",
          body: [
            "Начните с самого широкого кольца на полу, затем выкладывайте меньшие кольца, пока купол не замкнётся. Каждый слой — отдельная схема.",
          ],
        },
      ],
      faqs: [
        {
          q: "Сколько блоков в куполе 15?",
          a: "Купол диаметром 15 содержит 570 блоков в 8 слоях. Генератор даёт число для любого размера.",
        },
        {
          q: "Как построить купол в Minecraft?",
          a: "Выберите диаметр основания, положите самый широкий круг на пол и выкладывайте меньшие кольца, пока полусфера не замкнётся.",
        },
        {
          q: "Можно использовать купол как крышу?",
          a: "Да. Купола отлично подходят в качестве крыш для круглых домов, храмов или аренных залов.",
        },
      ],
    },
    "minecraft-oval-guide": {
      slug: "minecraft-oval-guide",
      title: "Руководство по овалам Minecraft: ширина и высота как схема",
      description:
        "Постройте овал в Minecraft. Ширина и высота дают вытянутые схемы — шаг за шагом с точными шаблонами.",
      published: P,
      updated: U,
      image: "/shape-pngs/oval-21-9.webp",
      sections: [
        {
          h2: "Овал = вытянутый круг",
          body: [
            "У овала независимые ширина и высота. Он строится как круг, но вытянут по одной оси. Типично 21×9 или 31×15.",
          ],
        },
        {
          h2: "Выбрать ширину и высоту",
          body: [
            "Малые овалы (15×7) подходят для дверей и окон, большие (31×15) — для залов. Пропорция определяет вид.",
          ],
        },
        {
          h2: "Перенести схему",
          body: [
            "Генератор овалов CircleGen выдаёт пиксельную сетку для вашей ширины/высоты. Перенесите её блок за блоком в Minecraft.",
          ],
        },
      ],
      faqs: [
        {
          q: "Как построить овал в Minecraft?",
          a: "Выберите ширину и высоту, прочитайте схему и перенесите сетку блок за блоком, начиная с центральной оси.",
        },
        {
          q: "Какая хорошая мера овала?",
          a: "21×9 подходит для дверей и окон, 31×15 — для больших комнат. Значения задают вытянутость.",
        },
        {
          q: "Работает в Java и Bedrock?",
          a: "Да. Схема — это простая сетка блоков, одинаковая в обеих версиях.",
        },
      ],
    },
    "minecraft-tower-guide": {
      slug: "minecraft-tower-guide",
      title: "Руководство по башням Minecraft: основание, стена и лестница",
      description:
        "Спланируйте башню в Minecraft. Выберите основание по площади, стенам и лестницам — точные схемы кругов.",
      published: P,
      updated: U,
      image: "/shape-pngs/circle-21.webp",
      sections: [
        {
          h2: "Определить основание",
          body: [
            "Диаметр определяет внутреннее пространство башни. Круг 21 даёт компактную площадку, 41+ — большим башням.",
          ],
        },
        {
          h2: "Стена и лестница",
          body: [
            "Толстая стена (1–6 блоков) даёт прочные стены. Спланируйте винтовую лестницу по внутреннему краю, чтобы башня оставалась проходимой.",
          ],
        },
        {
          h2: "Выбрать размер",
          body: [
            "21–33 для компактных башен и силосов, 41–49 для больших башен или аренных колец. Большие диаметры выглядят величественнее.",
          ],
        },
      ],
      faqs: [
        {
          q: "Какой диаметр для башни?",
          a: "21–49 блоков идеальны. 21–33 хватит для компактных башен, 41–49 — для больших башен и аренных колец.",
        },
        {
          q: "Как спланировать лестницу?",
          a: "Используйте внутреннюю часть круга для винтовой лестницы. Более толстый край (2–4 блока) даёт устойчивую стену.",
        },
        {
          q: "Работает в Java и Bedrock?",
          a: "Да. Схемы кругов работают одинаково в обеих версиях.",
        },
      ],
    },
  },
};

export const BLOG_INDEX_META: Record<
  BlogContentLocale,
  { title: string; description: string }
> = {
  de: {
    title: "Blog: Minecraft Bauanleitungen & Tipps",
    description:
      "Anleitungen und Tipps für bessere Bauten in Minecraft. Kreisgrößen, Türme, Ovale, Kugeln und mehr.",
  },
  fr: {
    title: "Blog : guides et astuces de construction Minecraft",
    description:
      "Guides et astuces pour mieux construire dans Minecraft. Tailles de cercle, tours, ovales, sphères, et plus.",
  },
  pt: {
    title: "Blog: guias e dicas de construção Minecraft",
    description:
      "Guias e dicas para construções melhores no Minecraft. Tamanhos de círculo, torres, ovais, esferas e mais.",
  },
  ru: {
    title: "Блог: руководства и советы по постройке в Minecraft",
    description:
      "Руководства и советы для лучших построек в Minecraft. Размеры кругов, башни, овалы, сферы и многое другое.",
  },
};

// Locales that actually have blog content (used to build hreflang alternates).
export const BLOG_PUBLISHED_LOCALES: Locale[] = [
  "en",
  "es",
  ...BLOG_LOCALES,
];

/**
 * Spanish ships its own slugs; every other locale reuses the English ones.
 * Keeping this mapping here means a single source of truth for every link,
 * hreflang alternate and sitemap entry.
 */
const ES_SLUGS: Record<BlogSlug, string> = {
  "minecraft-circle-guide": "como-hacer-circulos-minecraft",
  "minecraft-circle-sizes": "medidas-circulos-minecraft",
  "minecraft-sphere-guide": "como-hacer-esfera-minecraft",
  "minecraft-dome-guide": "como-hacer-cupula-minecraft",
  "minecraft-oval-guide": "como-hacer-ovalo-minecraft",
  "minecraft-tower-guide": "como-hacer-torre-minecraft",
};

/** Spanish titles, kept in sync with the Spanish blog index page. */
const ES_TITLES: Record<BlogSlug, string> = {
  "minecraft-circle-guide":
    "Cómo Hacer un Círculo en Minecraft: Guía Paso a Paso",
  "minecraft-circle-sizes":
    "Medidas de Círculos en Minecraft: Tabla de Tamaños",
  "minecraft-sphere-guide":
    "Cómo Hacer una Esfera en Minecraft: Guía por Capas",
  "minecraft-dome-guide":
    "Cómo Hacer una Cúpula en Minecraft: Guía sobre Base Plana",
  "minecraft-oval-guide":
    "Cómo Hacer un Óvalo en Minecraft: Guía Paso a Paso",
  "minecraft-tower-guide":
    "Cómo Hacer una Torre en Minecraft: Diámetro y Planificación",
};

/** True when the locale publishes a blog of its own (Spanish included). */
export function hasBlog(locale: Locale): boolean {
  return locale === "es" || isBlogContentLocale(locale);
}

/** Blog index URL for a locale. Locales without a blog fall back to English. */
export function blogIndexPath(locale: Locale): string {
  if (locale === "es") return "/es/blog/";
  if (isBlogContentLocale(locale)) return `/${locale}/blog/`;
  return "/blog/";
}

/** URL of a single guide. Locales without a blog fall back to English. */
export function blogPath(locale: Locale, slug: BlogSlug): string {
  if (locale === "es") return `/es/blog/${ES_SLUGS[slug]}/`;
  if (isBlogContentLocale(locale)) return `/${locale}/blog/${slug}/`;
  return `/blog/${slug}/`;
}

/**
 * Localized link label for a guide. `fallback` keeps the short English label
 * for the locales that have no blog of their own.
 */
export function guideLabel(
  locale: Locale,
  slug: BlogSlug,
  fallback: string
): string {
  if (locale === "es") return ES_TITLES[slug];
  if (isBlogContentLocale(locale)) return BLOG_CONTENT[locale][slug].title;
  return fallback;
}

/** hreflang cluster for a guide — every locale that publishes it. */
export function blogHreflang(slug: BlogSlug): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of BLOG_PUBLISHED_LOCALES) {
    map[l] = `${SITE_URL}${blogPath(l, slug)}`;
  }
  map["x-default"] = `${SITE_URL}/blog/${slug}/`;
  return map;
}

/** hreflang cluster for the blog index. */
export function blogIndexHreflang(): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of BLOG_PUBLISHED_LOCALES) {
    map[l] = `${SITE_URL}${blogIndexPath(l)}`;
  }
  map["x-default"] = `${SITE_URL}/blog/`;
  return map;
}
