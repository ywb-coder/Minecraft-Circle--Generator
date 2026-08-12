import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import SeoShell from "@/app/_seo/shell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { defaultLocale } from "@/lib/i18n/locales";

export const metadata: Metadata = {
  title: "Minecraft Building Guides",
  description:
    "Minecraft building guides for circles, spheres, domes, ovals, castles, stadiums, fountains, and more — with step-by-step plans and block counts.",
};

export default async function BlogPage() {
  const posts = getAllPosts();
  const dict = await getDictionary(defaultLocale);

  return (
    <SeoShell dict={dict} locale={defaultLocale}>
      <h1 className="font-pixel text-xl leading-relaxed text-ink pixel-shadow">
        Minecraft Building Guides
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Step-by-step tutorials for circles, spheres, domes, ovals, castles,
        stadiums, fountains, and everything in between. Every guide includes
        block counts and coordinates, so you can build with confidence.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="mc-panel pixel-corners p-4 transition-colors hover:border-cyan"
          >
            <div className="flex items-center justify-between font-terminal text-sm">
              <time dateTime={post.date} className="text-accent">
                {formatDate(post.date)}
              </time>
              <span className="text-muted">{post.readingTime} min read</span>
            </div>
            <h2 className="mt-2 font-pixel text-[10px] leading-relaxed text-ink">
              {post.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </SeoShell>
  );
}
