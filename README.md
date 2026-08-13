# CircleGen –?Minecraft Circle Generator

A free, SEO-optimized Minecraft shape generator. Block-by-block blueprints for circles, ovals, spheres, domes and arcs with live 3D preview, build-order animation, layer slicing and multi-format exports. Supports 11 languages and ships 3,100+ static pages.

## Features

- **Shapes**: circle / oval / sphere / dome / arc, each with 3 styles –?outline (pixel-perfect ring), chart (classic Minecraft chart) and filled
- **Live tool**: interactive blueprint grid, isometric 3D preview, build-order animation, layer-by-layer slicing for spheres/domes, 45-block color palette
- **Exports**: PNG, SVG, CSV, JSON, copy coordinates, shareable URL state
- **i18n**: en / de / es / fr / pt / tr / it / ru / pl / id / zh
- **SEO**: static export (`output: export`), per-size pages `/circle/5` –?`/circle/256` (plus sphere/dome/oval), hreflang alternates, JSON-LD (WebApplication, FAQPage, BreadcrumbList, HowTo), sitemap + robots

## Tech stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4 (custom "Blueprint Night" Minecraft-pixel design system in `src/app/globals.css`)
- Local pixel fonts (Press Start 2P / VT323 / Inter) –?no external font requests
- Zero backend, zero runtime dependencies –?pure static output

## Getting started

```bash
npm install
npm run dev       # local dev at http://localhost:3000
npm test          # geometry engine unit tests (vitest)
npm run lint
npm run build     # static export to ./out (~3,100 pages)
```

## Configuration (required before deploy)

Set these environment variables at build time:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Final domain, e.g. `https://circles.example.com`. Used for canonical URLs, hreflang and JSON-LD. **The placeholder in `src/lib/config.ts` must be replaced.** |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional. Enables the Plausible analytics snippet. |

## Deploy

Any static host works –?the build output is plain HTML in `./out`.

### Cloudflare Pages (recommended)

1. Push to GitHub, then in Cloudflare Dashboard 鈫?Pages 鈫?Create project 鈫?connect the repo
2. Build command: `npm run build`, output directory: `out`
3. Add the env vars above (especially `NEXT_PUBLIC_SITE_URL`)

### Vercel

1. Import the repo
2. Build command: `npm run build`, output directory: `out`
3. Add env vars, deploy

## Post-launch checklist

1. Replace `NEXT_PUBLIC_SITE_URL` with the real domain and rebuild
2. Submit `sitemap.xml` in Google Search Console (and Bing Webmaster Tools)
3. Set the hreflang `x-default` on the root page if desired
4. After indexing and stable rankings: AdSense (needs privacy policy page) or hosting affiliate links

## Project structure

```
src/
鈹溾攢鈹€ app/                 # routes: / (en), /[locale], /circle|sphere|dome|oval/[d], sitemap, robots
鈹?  鈹溾攢鈹€ _seo/            # shared SEO-page components (blueprint grid, shell, JSON-LD)
鈹?  鈹斺攢鈹€ [locale]/        # 10 subpath locales (zh/de/es/fr/pt/tr/it/ru/pl/id)
鈹溾攢鈹€ components/
鈹?  鈹溾攢鈹€ tool/            # CircleTool: controls, grid, iso preview, build order, palette, exports
鈹?  鈹斺攢鈹€ HomePage.tsx     # localized homepage
鈹溾攢鈹€ lib/
鈹?  鈹溾攢鈹€ shapes/          # geometry engine (midpoint-perfect pixel circles) + vitest suite
鈹?  鈹溾攢鈹€ i18n/            # dictionaries for 11 locales, format helpers
鈹?  鈹溾攢鈹€ export.ts        # PNG/SVG/CSV/JSON/copy/share utilities
鈹?  鈹溾攢鈹€ blocks.ts        # 45-block palette
鈹?  鈹溾攢鈹€ seo.ts           # per-size ranges, hreflang map, sitemap helpers
鈹?  鈹斺攢鈹€ config.ts        # SITE_URL + hreflang configuration
```
