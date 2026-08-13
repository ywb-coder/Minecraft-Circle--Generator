# CircleGen – Minecraft Circle Generator

A free, open-source Minecraft shape generator that turns any diameter into a
block-by-block pixel blueprint you can copy straight into the game.

**Live demo: [https://pixelcircle.online](https://pixelcircle.online)**

Generate circles, ovals, spheres, domes, arcs, toruses and ellipsoids with
pixel-perfect outlines, live 3D preview, build-order animation, layer slicing
and multi-format exports. Supports 11 languages and ships 3,100+ static pages.

## Features

- **Shapes** — circle / oval / sphere / dome / arc / torus / ellipsoid, each
  with 3 styles: outline (pixel-perfect ring), chart (classic Minecraft chart)
  and filled
- **Interactive tool** — live blueprint grid with coordinates and row counts,
  isometric 3D preview (drag to rotate), build-order animation, layer-by-layer
  slicing for spheres and domes, 45-block color palette, zoom control
- **Exports** — PNG, SVG, CSV, JSON, copy block coordinates, copy `/setblock`
  commands with world coordinates, shareable URL state, permanent links
- **Builder mode** — step through every block placement with Next/Prev or
  auto-play
- **i18n** — en / de / es / fr / pt / tr / it / ru / pl / id / zh
- **SEO/GEO** — static export, per-size pages (`/circle/15/` … `/circle/256/`
  plus sphere/dome/oval/torus/ellipsoid in every language), hreflang
  alternates, JSON-LD (WebApplication, FAQPage, WebSite, Organization),
  llms.txt for AI engines, sitemap + AI-friendly robots.txt

## Tech stack

- Next.js 16 (App Router, static export), React 19, TypeScript
- Tailwind CSS v4 — custom "Blueprint Night" Minecraft-pixel design system
- Local pixel fonts (Press Start 2P / VT323 / Inter) — no external requests
- Zero backend, zero runtime dependencies — pure static output

## Getting started

```bash
npm install
npm run dev       # local dev at http://localhost:3000
npm test          # geometry engine unit tests (vitest)
npm run lint
npm run build     # static export to ./out (~3,100 pages)
npm run test:e2e  # full browser E2E suite (Playwright)
```

## Deploy

Any static host works — the build output is plain HTML in `./out`.

**Vercel (current setup):**

1. Import the repo
2. Build command: `npm run build`, output directory: `out`
3. Set `NEXT_PUBLIC_SITE_URL=https://pixelcircle.online` (used for canonical
   URLs, hreflang and JSON-LD), deploy

**Cloudflare Pages:**

1. Push to GitHub, Cloudflare Dashboard → Pages → Create project → connect repo
2. Build command: `npm run build`, output directory: `out`
3. Add the same env var

## Project structure

```
src/
  app/                 # routes: / (en), /[locale], /circle|sphere|dome|oval|torus|ellipsoid/..., sitemap, robots, llms.txt
    _seo/              # shared SEO-page components and JSON-LD
  components/
    tool/              # CircleTool: controls, blueprint grid, iso preview, build order, palette, exports
  lib/
    shapes/            # geometry engine (midpoint-perfect pixel circles) + vitest suite
    i18n/              # dictionaries for 11 locales
    export.ts          # PNG/SVG/CSV/JSON/copy/share utilities
    blocks.ts          # 45-block color palette
    config.ts          # SITE_URL + hreflang configuration
```

## License

MIT
