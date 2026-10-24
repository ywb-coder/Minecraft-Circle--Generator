# AdSense preparation — CircleGen

Status: **ready to apply (2026-10-24 更新).** The privacy-policy advertising
disclosure and the footer trademark disclaimer are now in place, so the
remaining checklist items are owner-side (confirm 18+, confirm no duplicate
AdSense account) plus post-approval tasks (ads.txt, ad code, certified CMP).
Full audit: `docs/adsense/audit-20261024.md` (73 requirements, 0 blockers).

This is an engineering checklist, not legal advice.

## What is already implemented

- Curated indexing: 29 shape pages are indexable; all other valid shape pages
  emit `noindex, follow` and are excluded from the sitemap.
- Sitemap: 346 URLs (29 shape paths × 11 locales, 11 home pages, 16 trust/blog
  pages).
- Internal shape links use real odd-diameter arrays and localized paths; the
  even-diameter dead links are removed.
- Shared footer with a real contact email, Product Hunt link and a content
  update date.
- About page describes an independent project and documents editorial
  standards; Contact page gives a direct email.
- Ten articles (three original plus seven new) have author/date metadata,
  BlogPosting and BreadcrumbList JSON-LD, generated diagrams and editorial
  notes.
- GA4 is no longer loaded unconditionally. A first-party consent gate stores
  the choice in `localStorage`, loads GA only after acceptance, and removes
  GA cookies when consent is withdrawn.
- Privacy policy covers local processing, hosting logs, analytics consent,
  cookies, EEA/UK rights, children, third-party links and the current
  no-ads state.
- Application-level tests: `tsc`, lint (warnings only), 70 unit tests and the
  static build pass. A static crawl found 0 broken internal links.

## Before applying

### 1. Deploy and verify the live site

- Commit/push only after explicit approval.
- Verify the deployed build, not only `out/`:
  - `/sitemap.xml` has 346 `<loc>` entries.
  - A non-curated valid page such as `/sphere/33/` returns 200 with
    `noindex, follow` and no hreflang alternates.
  - `/circle/15/` and `/zh/circle/15/` each have 12 alternates and a canonical.
  - `/privacy/` shows the consent gate; no `googletagmanager.com` request
    occurs before acceptance.
  - No internal 404s in the shape links.
- Submit the sitemap in Google Search Console after deployment.

### 2. Add enough original content

The site now has ten substantial articles and 29 indexable shape pages. The
original target of **6–8 genuinely useful articles** is met: seven new
articles were added alongside the three original guides. The site is still
below a mature reference-site content depth. Remaining editorial options:

- EN: circle, sizes, sphere, dome, oval and tower guides are done.
- ES: circle, sizes, sphere and oval guides are done; ES is the main traffic
  language.
- RU: one tested guide before translating the whole set (deferred).

For each article:

- Explain a real building problem, show the block math and include at least
  one generated diagram with a caption.
- Link to the relevant tool page and to 2–3 related articles.
- Add `ArticleMeta`, `BlogPosting` + `BreadcrumbList`, a unique title,
  description and canonical.
- Add the article to the blog index and the sitemap.
- Do not publish near-duplicate pages for every diameter.

The 29 indexed shape pages now have size-specific EN/ES intros; other locales
retain their localized generic copy. Keep the data table and layer view as the
source of truth.

### 3. Fix the author/trust signal

The About page says the site is built by an independent developer, but the
articles currently use the brand `CircleGen` as the author. That is honest,
but weaker than a named author. If the owner is willing to be public, add a
real name, one-line bio and (optionally) a photo or GitHub profile. If not,
keep the brand byline and do not invent a person or a team.

### 4. Certified CMP — required before ads in EEA/UK/Switzerland

The current banner is a **first-party consent gate, not a Google-certified
CMP**. It is appropriate for keeping GA off until consent while the site has
no ads. Before serving AdSense ads to EEA/UK/Swiss users:

- Choose a Google-certified CMP (Google’s own CMP, or a certified vendor such
  as Cookiebot, Osano, etc.).
- Replace or wrap the current gate so the certified CMP controls ad
  technology consent and provides the required “reject” path.
- Update the privacy policy with the vendor, ad partners, purposes and data
  transfers.
- Test consent, rejection and withdrawal on a real device.

Do not describe the first-party gate as a certified CMP in the privacy policy
or in the AdSense application.

### 5. CSP and ads.txt — after the AdSense account exists

Do not add a fake publisher ID. Once the account is approved and the real
`pub-…` ID is available:

- Add `public/ads.txt` at the site root:
  `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
  (replace with the real ID; keep the line exactly as Google provides it).
- Update `vercel.json` CSP for the AdSense domains. Use Google’s current
  AdSense CSP guide; at minimum this usually means allowing
  `pagead2.googlesyndication.com`, `googleads.g.doubleclick.net`,
  `tpc.googlesyndication.com`, `www.google.com`, `adservice.google.com` and
  the Funding Choices/CMP domains in the relevant `script-src`, `img-src`,
  `connect-src` and `frame-src` directives.
- Verify the live CSP does not block ads or the CMP before enabling ads.
- Keep ads off the generator controls, privacy page, 404 page and thin
  non-indexed pages.

### 6. AdSense account and site review

- Applicant must be 18+; the site itself is general-audience and not directed
  to children under 13.
- Have a real physical address and tax information ready.
- Add the site only after the deployed domain, sitemap, contact page and
  privacy policy are live.
- Use the “site ownership” verification method Google provides.
- Do not click ads or ask others to click them.
- Expect the first review to focus on content originality, navigation and
  policy compliance, not only technical SEO.

## Verification commands

```powershell
npm run lint
npx tsc --noEmit
npm test
npm run build
```

Expected after the current changes:

- lint: 0 errors; 28 existing `<img>` warnings
- unit tests: 70 passed
- build: 3,181 static pages
- `out/sitemap.xml`: 346 `<loc>` entries; all resolve, all canonical, none
  `noindex`
- internal-link crawl: 0 broken links
- shape intros: 58/58 EN/ES indexed pages rendered
- article JSON-LD: valid FAQPage, BlogPosting and BreadcrumbList blocks

## Release gate

Do not commit/push/deploy until the owner confirms. Once deployed, repeat the
live checks above, then finish the certified-CMP work before submitting the
AdSense application.
