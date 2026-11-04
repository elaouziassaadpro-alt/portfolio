# GEO / SEO Analysis — Assaad Elaouzi Portfolio

**URL:** https://portfolio-ten-tau-451f9zrxlt.vercel.app/ (`/`, `/fr/`, `/es/`)
**Date:** 2026-11-04
**Site type:** Personal portfolio (React 19 + Vite, pre-rendered to static HTML at build time)

## Measured: Lighthouse 12.8

Run locally on the production build, served with Brotli and cache headers to match Vercel. Lighthouse's mobile run simulates a slow 4G phone. Re-run this on the deployed URL to confirm.

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` mobile | 91 | 100 | 100 | 100 |
| `/fr/` mobile | 87 | 100 | 100 | 100 |
| `/` desktop | 99 | 100 | 100 | 100 |

Core metrics on `/` mobile: LCP 2.9 s, TBT 0 ms, CLS 0.006. Desktop: LCP 0.6 s, TBT 80 ms, CLS 0.003.

The Lighthouse SEO score checks technical basics only. It does not predict rankings.

## Estimated: GEO readiness ~79/100

This is a judgement against the criteria below, not a measurement. It was about 57 before pre-rendering. **The code can't take it much higher**: most of the remaining points are off-site.

| Criterion | Weight | Estimate | Status |
|---|---|---|---|
| Citability | 25% | 85 | "X is…" definition opener, self-contained FAQ answers, specific facts. No original research or numeric outcomes yet. |
| Structure | 20% | 95 | Clean H1→H2→H3, question headings, lists. |
| Multi-modal | 15% | 50 | Photo and 3D only. No project screenshots, diagrams or video. |
| Authority and brand | 20% | 55 | Person schema, `sameAs`, visible last-updated date. No Wikipedia, press, YouTube or Reddit presence. |
| Technical access | 20% | 100 | Full HTML without JavaScript in every language; all AI crawlers allowed. |

## What's in place

- **Real HTML per language**: `scripts/prerender.mjs` writes `/`, `/fr/`, `/es/`, each with about 1,100 words readable without JavaScript. This removes the earlier ceiling for non-JS crawlers.
- **Separate indexable URLs** with `hreflang` (including `x-default`), self-canonicals, translated titles and descriptions, and crawlable language links.
- **Structured data per language**, generated from `src/data`: `WebSite`, `ProfilePage`, `Person`, `ItemList` of projects, `FAQPage`. Validate these with Google's Rich Results Test after deploying.
- **Generated files**: `sitemap.xml` with language alternates, `llms.txt`, `llms-full.txt`.
- **Static files**: `robots.txt`, `site.webmanifest`, `404.html` (noindex), favicons, 1200×630 `og-image.jpg`, `vercel.json` (security and cache headers, trailing slashes).
- **Content**: definition-style intro, FAQ section, visible last-updated date.
- **Performance**: photo reduced from 1.4 MB to 67 KB (WebP), non-blocking fonts, CSS-only name reveal, 3D generated in a Web Worker and started after page load.

`llms.txt` is included for non-Google assistants. Google has stated it does not use it for Search, and it is not a ranking lever.

`FAQPage` schema matches visible content, but Google limits FAQ rich results to a small set of authoritative sites, so don't expect a rich result. Its value is machine-readable Q&A.

## Top actions left (all need you, not code)

1. **Use a custom domain** (for example `assaadelaouzi.com`). The `*.vercel.app` address carries little authority or brand signal. When it changes, update `url` in `src/data/site.json` and the `Sitemap:` line in `public/robots.txt`.
2. **Submit to Google Search Console and Bing Webmaster Tools** and send them the sitemap. Bing's index feeds Copilot.
3. **Link to the site** from your LinkedIn profile and GitHub profile/README. These profiles are already in `sameAs`, and consistent identity helps.
4. **Add project screenshots or architecture diagrams, with real results** (`image` and `links` in `site.json`).
5. **Publish under your name elsewhere**: a technical article or talk, for example on Spring Boot with React Native or KYC workflows. Brand mentions correlate with AI citations more strongly than backlinks.
6. **Keep it fresh**: update `lastUpdated` in `site.json` whenever the content really changes. Don't bump it without a real change.
