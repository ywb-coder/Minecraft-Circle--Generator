import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  order: number;
  readingTime: number;
  content: string;
}

export interface PostSummary {
  slug: string;
  title: string;
}

const CONTENT_DIR = join(process.cwd(), "content", "blog");

function readPosts(): Post[] {
  return readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const raw = readFileSync(join(CONTENT_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const words = content.trim().split(/\s+/).length;
      return {
        slug: data.slug as string,
        title: data.title as string,
        description: data.description as string,
        date: data.date as string,
        order: data.order as number,
        readingTime: Math.ceil(words / 200),
        content: content.trim(),
      };
    });
}

export function getAllPosts(): Post[] {
  return readPosts().sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string): {
  prev?: PostSummary;
  next?: PostSummary;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? { slug: posts[index - 1].slug, title: posts[index - 1].title } : undefined,
    next:
      index < posts.length - 1
        ? { slug: posts[index + 1].slug, title: posts[index + 1].title }
        : undefined,
  };
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
