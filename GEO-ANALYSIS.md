# GEO / SEO Analysis — Assaad Elaouzi Portfolio

**URL:** https://portfolio-ten-tau-451f9zrxlt.vercel.app/
**Date:** 2026-09-01
**Site type:** Single-page personal portfolio (React 19 + Vite, client-side rendered, no SSR)

## GEO Readiness Score: 57/100

This is an honest post-implementation score, not a target restated as a result. **100/100 is not achievable without server-side rendering or a prerender step** — see [Technical Accessibility](#5-technical-accessibility-20---6010) below for why, and the [Top 5](#top-5-highest-impact-changes) for the path to closing that gap. Everything else on this list has been implemented and verified in this session (build passes, JSON-LD validated, noscript content confirmed served, no console errors).

Before this session: no meta description, no structured data, no `robots.txt`, no `sitemap.xml`, an empty `<div id="root">` in the raw HTML (nothing for a non-JS crawler to read at all). Realistic baseline was roughly 15-20/100.

## Platform Breakdown

| Platform | Est. score | Why |
|---|---|---|
| Google AI Overviews | ~65/100 | Googlebot executes JS, so it sees the full React content; benefits most from the new meta/schema/sitemap work |
| Google AI Mode | ~55/100 | Same JS rendering, but this surface leans more on freshness/entity authority — no dated content, no scheduled-refresh signal |
| ChatGPT / OAI-SearchBot | ~45/100 | Does not execute JS — sees only the `<noscript>` fallback + JSON-LD, which is now solid but is a summary, not the full page |
| Perplexity | ~40/100 | Same JS limitation; leans on Reddit/Wikipedia community validation, which a personal portfolio structurally can't have |
| Bing Copilot | ~50/100 | Standard Bing indexing of the noscript/meta content; no IndexNow submission set up |

## 1. Citability Score (25%) — ~75/100

**Strong:**
- Concrete, self-contained facts throughout (exact dates, real company names, specific tech stacks per project) — e.g. "Developed during my end-of-studies internship at OCP Group (Jorf Lasfar)... 04/2024 – 06/2024" is a clean, quotable, attributable claim.
- The `<noscript>` fallback and JSON-LD both front-load the identity + role statement in the first sentence.

**Weak:**
- Paragraphs weren't written to the 134-167 word optimal-citation length — most are shorter (2-3 sentences), which is fine for readability but not deliberately structured for extraction.
- No FAQ-style "What does an IT Applications Developer do?" block — for a portfolio this can feel artificial, but one well-placed Q&A would help both AI citation and structural readability (see Top 5).

## 2. Structural Readability (20%) — ~65/100

**Strong:**
- Clean H1 → H2 → H3 hierarchy is enforced both in the React app (section headings) and now mirrored in the noscript fallback (H1 → H2 per section).
- Lists used correctly for experience, projects, and contact info in the noscript block.
- Semantic `<main>` now wraps the section content (was a bare `<div>` before), `<nav>` was already correct in the Navbar component.

**Weak:**
- No question-based headings anywhere ("Who is Assaad Elaouzi?", "What technologies does he use?") — matches query patterns better than declarative headings like "About Me & Core Skills".
- No comparison tables (low priority for a portfolio, but a simple skills/proficiency table would help both readability and multi-modal scoring).

## 3. Multi-Modal Content (15%) — ~35/100

**Strong:** One real photo (`/profile.png`), referenced consistently across OG, Twitter Card, and JSON-LD `image`.

**Weak:** Everything else is decorative/interactive (WebGL neural-glow shader, animated globe, cursor trail) — visually appealing for a human visitor, but invisible and irrelevant to crawlers, and doesn't count as citable multi-modal content. No video, no infographic/chart summarizing the tech stack or career timeline. This is the lowest-scoring category and the cheapest one to move (see Top 5).

## 4. Authority & Brand Signals (20%) — ~40/100

**Strong:**
- `sameAs` links to GitHub and LinkedIn now present in the Person schema.
- `worksFor` (Alphavest Asset Management) and `alumniOf` (FST Tanger, Webforce3) both present — these are real entity-linking signals.
- `dateModified` present in the JSON-LD.

**Weak:**
- No visible on-page "last updated" date (only in JSON-LD, not human-visible) — recency is explicitly called out as a ~3x citation multiplier and this site has no refresh cadence signal at all.
- No Wikipedia/Reddit/YouTube presence — expected and largely unfixable for an individual portfolio (these are brand/publisher signals, not personal-portfolio signals), noted for completeness rather than as an actionable gap.
- No author credentials/bio block beyond what's in the About section.

## 5. Technical Accessibility (20%) — ~60/100

**This is the ceiling on the overall score.** The site is a pure client-side-rendered SPA (`<div id="root"></div>`, filled in by React after `main.jsx` executes). Per this skill's own crawler table, GPTBot, OAI-SearchBot, ClaudeBot, and PerplexityBot **do not execute JavaScript** — without intervention, those crawlers would see nothing but an empty body.

**Implemented this session:**
- `robots.txt` explicitly allowing GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Google-CloudVertexBot, CCBot, plus a wildcard allow-all.
- A substantial `<noscript>` block mirroring the real page content (identity, about, all 5 experience entries, all 5 projects, contact) — this is now the *entire* page as seen by any non-JS-executing crawler.
- JSON-LD `ProfilePage` + `Person` schema — valid, present in raw HTML, doesn't depend on JS execution at all.

**Why this isn't 100:** the noscript fallback is a manually-maintained summary, not the real page — it's English-only regardless of the visitor's actual language preference (the live site supports EN/FR/ES via client-side switching, which crawlers can't trigger), it omits the Vision section, and it will silently drift out of sync the next time the React content changes since nothing enforces the two stay identical. True technical accessibility requires SSR or a build-time prerender step (see Top 5, #1).

## AI Crawler Access Status

| Crawler | Status |
|---|---|
| GPTBot (OpenAI) | ✅ Allowed |
| OAI-SearchBot (OpenAI) | ✅ Allowed |
| ClaudeBot (Anthropic) | ✅ Allowed |
| PerplexityBot | ✅ Allowed |
| Google-Extended | ✅ Allowed |
| Google-CloudVertexBot | ✅ Allowed |
| CCBot (Common Crawl) | ✅ Allowed (left open — broad visibility favors a job-seeking developer's portfolio over the usual "block training crawlers" default) |
| Googlebot | ✅ Allowed (wildcard; executes JS, sees full React content) |

## llms.txt Status

Present at `/llms.txt`. Per Google's AI optimization guide, this file is explicitly ignored by Google Search (AI Overviews and AI Mode) and carries no ranking/citation weight there — included only as a low-cost aid for non-Google AI crawlers/assistants that do read it. Contains site summary, section links, and key facts (stack, location, contact).

## Brand Mention Analysis

| Platform | Status |
|---|---|
| Wikipedia | None — expected for an individual, not actionable |
| Reddit | None |
| YouTube | None |
| LinkedIn | ✅ Linked (`sameAs` in schema + navbar icon) |
| GitHub | ✅ Linked (`sameAs` in schema + navbar icon) |

Backlinks/DR were not measured (no DataForSEO/Ahrefs extension available in this session) — per the skill's own citation data, brand mentions on YouTube/Reddit correlate far more strongly with AI visibility than backlinks would anyway, and those channels aren't a natural fit for a personal dev portfolio.

## Passage-Level Citability

The strongest existing passages for AI extraction (self-contained, factual, attributable):

> "As IT & Application Developer at Alphavest Asset Management, I manage core IT services — backups, domain administration, support and system maintenance — alongside developing a KYC compliance application with Laravel and Livewire."

> "Developed during my end-of-studies internship at OCP Group (Jorf Lasfar), this platform manages analysis requests between production plants and the central laboratory — automating the request workflow, improving coordination between teams, and ensuring full traceability of results."

Both are close to the 134-167 word target once combined with their surrounding sentence, attribute a specific claim to a specific employer, and don't require outside context to make sense — good citation candidates as-is.

## Server-Side Rendering Check

**Confirmed CSR-only.** `curl`/fetch of `/` before this session's changes returned an essentially empty body (`<div id="root"></div>`, no other content). The build output is a single `index.html` + JS bundle; no `vite-plugin-ssr`, no prerender plugin, no Next.js/Astro/Remix. The `<noscript>` fallback added this session is a mitigation, not a fix — see Top 5.

## Top 5 Highest-Impact Changes

Ranked by score impact per unit of effort:

1. **Add a build-time prerender step** (highest impact, medium effort). A Vite prerender plugin (e.g. `vite-plugin-prerender` running a headless Chromium pass at build time) or a migration to a framework with SSR/SSG (Astro is the lightest-weight option for a mostly-static portfolio) would let non-JS crawlers see the *actual* rendered page instead of the manually-maintained noscript summary. This directly raises the Technical Accessibility ceiling and is what would move the overall score from ~57 into the 80s. Not implemented this session — it's a build-tooling change with real risk (new dependency, Vercel build config, ~300MB headless Chromium in CI for the Puppeteer-based plugins) that deserves its own explicit go-ahead rather than being bundled into an SEO pass.
2. **Generate a proper 1200×630 OG/social card image** (high impact, low effort). Currently falls back to `/profile.png`, which is the wrong aspect ratio for link previews on Slack/Twitter/LinkedIn. A designed card with name, title, and a couple of tech-stack marks would also count toward Multi-Modal Content.
3. **Add a visible "last updated" date near the top of the page** (medium impact, trivial effort). Recency is one of the few GEO levers with a *quantified* multiplier in this skill's own data (~3x citation likelihood under 3 months old). Currently only in JSON-LD, not human- or crawler-visible in the noscript body.
4. **Add 3-4 question-framed FAQ items** ("What technologies does Assaad Elaouzi work with?", "Where is Assaad Elaouzi based?") near the bottom of the About section (medium impact, low effort). Matches AI query patterns directly and gives short, extractable answer blocks — the single highest citability-per-word addition available without restructuring existing content.
5. **Keep the noscript fallback in sync going forward** (low impact per instance, but compounding risk if skipped). Every future content edit to the React app (like the last several sessions' rewrites) should also touch `index.html`'s noscript block, or it silently becomes the stale, wrong version of the page for every non-JS crawler. Worth a one-line reminder in CLAUDE.md or a PR checklist item rather than a code fix.

## Schema Recommendations

Implemented: `ProfilePage` wrapping a `Person` (name, jobTitle, email, telephone, address, worksFor, alumniOf ×2, knowsAbout, sameAs ×2, image, dateModified, inLanguage).

Not implemented, worth considering if #1 above happens:
- `BreadcrumbList` — low value on a single-page site, skip.
- `FAQPage` schema, but only if #4 above is implemented as real FAQ content first; schema without matching visible content risks a manual action.

## Content Reformatting Suggestions

- The Vision section ("Concept & Vision: Global Super App") is not in the noscript fallback — it's speculative/forward-looking content, not CV-grounded, so deliberately left out of the crawler-facing summary rather than presented as a completed project. No change recommended here; flagging so the omission reads as intentional, not an oversight.
- Consider trimming the About section's two paragraphs into one tighter, front-loaded definition-style opener ("Assaad Elaouzi is an IT Applications Developer based in Casablanca, Morocco, specializing in X, Y, Z...") ahead of the current narrative framing — definition-pattern openers ("X is...") are called out specifically as a strong citability signal and the current opener leads with credentials before identity.
