import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export const dynamic = "force-static";

/**
 * Everything on the site is public and free, so all crawlers are allowed.
 * AI/LLM agents are declared explicitly rather than relying on the wildcard:
 * `OAI-SearchBot` and `ChatGPT-User` are what surface pages inside ChatGPT
 * answers, and `GPTBot`/`PerplexityBot` feed the assistants' indexes — these
 * are first-class acquisition channels for this site.
 */
const AI_AGENTS = [
  "GPTBot", // OpenAI training crawler
  "OAI-SearchBot", // OpenAI search index (powers ChatGPT citations)
  "ChatGPT-User", // on-demand fetch when a ChatGPT user opens a link
  "PerplexityBot", // Perplexity index
  "ClaudeBot", // Anthropic training/index crawler
  "Google-Extended", // Google's Gemini/Bard training crawler
  "Applebot-Extended", // Apple Foundation Models training crawler
  "Bytespider", // ByteDance/TikTok AI index
  "Cohere-AI", // Cohere training crawler
  "Diffbot", // Diffbot AI index
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
