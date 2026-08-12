import type { Metadata } from "next";
import type { Components } from "react-markdown";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/config";
import {
  formatDate,
  getAdjacentPosts,
  getAllPosts,
  getPost,
} from "@/lib/blog";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";

interface Props {
  params: Promise<{ slug: string }>;
}

const HOWTO_STEPS: Record<string, { name: string; text: string }[]> = {
  "how-to-build-a-circle-in-minecraft": [
    {
      name: "Pick a diameter and mark the center",
      text: "Choose an odd diameter such as 15 for a single center block, and mark the center point of the build area.",
    },
    {
      name: "Lay the four axis blocks",
      text: "Count 7 blocks north, south, east, and west from the center and place a block at each endpoint.",
    },
    {
      name: "Fill the first quadrant in rows",
      text: "Place rows of 7, 7, 6, 5, 4, 3, 2 blocks, stepping one block in each time, to build one quarter of the circle.",
    },
    {
      name: "Mirror the quadrant three times",
      text: "Copy the finished quadrant to the other three corners, checking that each row count matches exactly.",
    },
    {
      name: "Check the gaps and smooth the curve",
      text: "Walk around the ring and fix any spot where the diagonal step is two blocks or more by nudging a block sideways.",
    },
    {
      name: "Fill or frame the interior",
      text: "Fill the middle with solid blocks for a disc, or leave it hollow for a ring, using the generator blueprint to verify every position.",
    },
  ],
  "how-to-build-a-sphere-in-minecraft": [
    {
      name: "Choose a diameter and mark the center",
      text: "Pick an odd diameter such as 15 and mark the exact center block of the sphere, counting up and down from it.",
    },
    {
      name: "Build the widest ring at the equator",
      text: "Place a full 15-block circle at the center layer, roughly 56 perimeter blocks, using the circle chart method.",
    },
    {
      name: "Stack the shrinking rings",
      text: "Add 13-, 11-, 7-, and 3-block rings above and below the equator, then finish with 1-block caps at the top and bottom.",
    },
    {
      name: "Align every ring to the center column",
      text: "Count from the center marker before placing each layer so every ring shares the same center column.",
    },
    {
      name: "Fill the interior for a solid sphere",
      text: "Fill each ring solid as you go for a solid sphere, about 700 blocks total, or leave the walls one block thick for a hollow one.",
    },
    {
      name: "Smooth the visible seams",
      text: "Walk around the finished sphere and replace harsh staircase steps with slabs or stairs to soften the silhouette.",
    },
  ],
  "how-to-build-a-dome-in-minecraft": [
    {
      name: "Lay the base circle at floor level",
      text: "Mark the center of your building and place the full 15-block ring on the ground, about 56 blocks around the perimeter.",
    },
    {
      name: "Stack the shrinking rings",
      text: "Build the 13-block ring on top of the base, then 11, 7, and 3, counting from the center marker so every ring stays centered.",
    },
    {
      name: "Cap the dome with the top block",
      text: "Finish with a single cap block, or swap it for glass to create a skylight.",
    },
    {
      name: "Frame the doorway",
      text: "Cut a 2-block-tall entrance out of the bottom rings where you want access.",
    },
    {
      name: "Fill the rings with your wall material",
      text: "Solid blocks for a stone dome, or glass panes along the ring outlines for a greenhouse look.",
    },
    {
      name: "Detail the rim",
      text: "Add a one-block overhang of slabs or stairs around the base ring to tie the roof into the walls below.",
    },
  ],
  "how-to-build-an-oval-in-minecraft": [
    {
      name: "Mark the four extremes",
      text: "Place temporary markers at the full width and height of your oval, such as 10 blocks east and west and 6 blocks north and south for a 21x13 oval.",
    },
    {
      name: "Build the first half-circle",
      text: "Place a 13-block half-circle curving from the west marker down to the south marker, using the quadrant rows of a 13-block circle.",
    },
    {
      name: "Mirror the half-circle on the other side",
      text: "Build the matching curve on the east side, from the east marker down to the south marker.",
    },
    {
      name: "Connect the straight sections",
      text: "Fill the gap between the west and east markers with straight blocks equal to the width minus the height, 8 blocks for a 21x13 oval.",
    },
    {
      name: "Complete the top half",
      text: "Repeat the half-circles and straight sections on the north side to close the oval.",
    },
    {
      name: "Check the joins",
      text: "Make sure the straight sections and curve ends land on the same row line, shifting the straight section by one block if the join looks stepped.",
    },
  ],
};

const mdComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-10 mb-4 border-b-2 border-mc-border pb-2 font-pixel text-sm leading-relaxed text-ink">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-pixel text-[11px] leading-relaxed text-ink">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-7 text-ink/90">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 list-disc pl-6 text-ink/90">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal pl-6 text-ink/90">{children}</ol>
  ),
  li: ({ children }) => <li className="my-1.5 leading-7">{children}</li>,
  a: ({ children, href }) => (
    <a href={href} className="pixel-link">
      {children}
    </a>
  ),
  code: ({ children, className }) =>
    className?.includes("language-") ? (
      <code className={className}>{children}</code>
    ) : (
      <code className="border border-mc-border bg-panel-2 px-1.5 py-0.5 font-terminal text-cyan">
        {children}
      </code>
    ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto border-2 border-mc-border bg-panel-2 p-4 font-terminal text-lg leading-7 text-cyan">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-accent bg-panel-2 p-4 text-muted">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-8 border-mc-border" />,
  strong: ({ children }) => <strong className="text-accent">{children}</strong>,
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-sm text-ink/90">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-mc-border bg-panel-2 px-3 py-2 text-left font-semibold text-ink">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-mc-border px-3 py-2 text-ink/90">{children}</td>
  ),
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}/`,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const howToSteps = HOWTO_STEPS[post.slug];
  const dict = await getDictionary(defaultLocale);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}/`,
  };

  const schema = howToSteps
    ? {
        "@context": "https://schema.org",
        "@graph": [
          articleLd,
          {
            "@type": "HowTo",
            name: post.title,
            description: post.description,
            step: howToSteps.map((step, index) => ({
              "@type": "HowToStep",
              position: index + 1,
              name: step.name,
              text: step.text,
            })),
          },
        ],
      }
    : articleLd;

  return (
    <SeoShell dict={dict} locale={defaultLocale}>
      <div className="mx-auto max-w-3xl">
        <article>
          <div className="flex items-center gap-4 font-terminal text-sm text-accent">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime} min read</span>
          </div>
          <h1 className="mt-4 font-pixel text-lg leading-relaxed text-ink pixel-shadow sm:text-xl">
            {post.title}
          </h1>
          <p className="mt-4 leading-7 text-muted">{post.description}</p>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
            {post.content}
          </ReactMarkdown>
        </article>

        <nav className="mt-12 grid gap-4 border-t-2 border-mc-border pt-8 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}/`}
              className="mc-panel pixel-corners p-4 transition-colors hover:border-cyan"
            >
              <span className="font-terminal text-sm text-muted">
                Previous guide
              </span>
              <span className="mt-1 block pixel-link text-sm leading-6">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}/`}
              className="mc-panel pixel-corners p-4 text-right transition-colors hover:border-cyan"
            >
              <span className="font-terminal text-sm text-muted">
                Next guide
              </span>
              <span className="mt-1 block pixel-link text-sm leading-6">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>

        <div className="mc-panel-inset mt-8 p-6 text-center">
          <h2 className="font-pixel text-sm leading-relaxed text-ink">
            Generate your own circle blueprint
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Pick any diameter from 5 to 256 and get a block-by-block plan with
            build order, ready to copy in-game.
          </p>
          <Link
            href="/?t=circle&d=15"
            className="mc-btn mc-btn-primary mt-8 inline-block"
          >
            Open the circle generator
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </SeoShell>
  );
}
