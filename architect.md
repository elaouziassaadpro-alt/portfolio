# Architecture — Assaad Elaouzi Portfolio

A single-page personal portfolio built with **React 19 + Vite 7**, rendered entirely on the client, deployed as static files on Vercel
(`https://portfolio-ten-tau-451f9zrxlt.vercel.app/`). There is no backend, no router and no data fetching: all content ships in the JS bundle.

---

## 1. Tech stack

| Concern | Choice | Notes |
|---|---|---|
| UI | React 19 (`StrictMode`) | Function components + hooks only |
| Build / dev server | Vite 7 + `@vitejs/plugin-react` | `@` alias → `./src` (`vite.config.js`) |
| Animation | `framer-motion` | Name reveal, scroll reveals; wrapped in `MotionConfig reducedMotion="user"` |
| 3D | `three` | Hero brain only (`HeroScene.jsx` + `brainGeometry.js`), lazy-loaded in its own chunk (~126 KB gzip) |
| Icons | `lucide-react` | |
| Styling | Plain CSS with custom-property tokens (`src/index.css`) | Class-based; inline styles only for the language crossfade |
| Fonts | Instrument Serif (display) + Inter (UI), Google Fonts via `<link>` in `index.html` | |
| i18n | Home-grown React context | EN / FR / ES |
| Theming | Home-grown React context | "Deep Ocean" (navy, teal, a little coral): dark by default, light mode via `data-theme="light"` |
| Lint | ESLint 9 flat config (`js`, `react-hooks`, `react-refresh`) | `npm run lint` |

Scripts: `npm run dev` · `npm run build` (→ `dist/`) · `npm run preview` · `npm run lint`.

---

## 2. Directory map

```
portfolio/
├── index.html              # SEO head (meta, OG/Twitter, JSON-LD), font links, <noscript> fallback
├── public/                 # profile.png, logo.png (favicon), robots.txt, sitemap.xml, llms.txt
├── src/
│   ├── main.jsx            # ThemeProvider → LanguageProvider → MotionConfig → App
│   ├── App.jsx             # Page shell: skip link, grain, nav, hero, marquee, sections, footer
│   ├── data/               # ALL site data: site.json (non-text) + en.json, fr.json, es.json (copy)
│   ├── content.js          # Loads data/site.json
│   ├── index.css           # Tokens (light + dark) and every component style
│   ├── App.css             # Body reset only
│   ├── i18n/translations.js   # Loads data/<lang>.json
│   ├── contexts/           # ThemeContext, LanguageContext
│   ├── hooks/              # useActiveSection (scroll-spy), useGlowPointer (card border glow)
│   ├── sections/           # Navbar, Hero, About (bento), Experience (timeline), Projects, Exploring, Contact
│   └── components/         # HeroScene + brainGeometry (three.js), SceneBoundary, RevealText, Magnetic, Marquee,
│                           # SectionHeading, ScrollReveal, Controls, CopyEmail, WorkflowSteps
├── PORTFOLIO-REVIEW.md     # Design review, references and action plan
└── GEO-ANALYSIS.md         # SEO/GEO audit
```

---

## 3. Layout

Top to bottom:
1. **Navbar** (`sections/Navbar.jsx`): a floating glass bar that becomes solid after 24px of scroll. Below 960px its links collapse into a menu sheet.
2. **Hero** (`#top`): the giant serif name reveals letter by letter (`RevealText`), with the role eyebrow, tagline, "Now" line and magnetic CTAs. Behind it sit the drifting aurora and the 3D brain.
3. **Marquee**: the stack technologies in a seamless loop that pauses on hover.
4. **Sections** in `.container`: About (a bento grid with the text, photo and stats), Experience (a hairline timeline), Projects (glow-border case studies plus "Other work"), Exploring, then Contact (centered, with copy-email and magnetic buttons).
5. **Footer**: a giant faded italic "Elaouzi" mark and the credit line.

**Hero 3D** (`components/HeroScene.jsx`):
- The brain is generated in code (`brainGeometry.js`), with no model file. Two displaced icosphere hemispheres get their folds from the zero contours of warped Perlin noise, and a cerebellum and brain stem complete it.
- A neural network sits on the fold crests: neurons wired to their nearest neighbours by arched paths. Coral signals hop from neuron to neuron, and each neuron flashes when one lands.
- The cortex material (`MeshPhysicalMaterial`, lit by a `RoomEnvironment` PMREM) has a soft wave of emissive activity injected through `onBeforeCompile`.
- The brain rotates slowly, breathes, and eases toward the pointer. Coarse-pointer devices get fewer triangles and neurons.
- It eases toward the pointer, pauses when off-screen (IntersectionObserver), renders a single frame under reduced motion and caps the device pixel ratio at 1.75.
- It is lazy-loaded behind `SceneBoundary`. If WebGL or the chunk fails, the CSS `.hero-orb` stays as the fallback.
- On phones the object sits above the text in the normal flow instead of behind it.

**Glow cards**: any `.glow-card` gets a 1px border that lights up near the cursor. `useGlowPointer` writes `--mx`/`--my` on every visible card from a single window listener.

**Important:** the `App` wrapper's `filter` must be `none` at rest. Any filter value makes it the containing block for `position: fixed` children, and the nav would then scroll away with the page.

---

## 4. State

### ThemeContext
- `theme: "light" | "dark"`: initial value is `localStorage["portfolio-theme"]`, else `"dark"`.
- Writes `data-theme` on `<html>`. A small inline script in `index.html` applies a saved light theme before first paint.
- All colour switching happens in CSS: `:root` holds the dark tokens and `:root[data-theme="light"]` overrides them.

### LanguageContext
- `lang`: initial value is the stored choice, else the `navigator.language` prefix, else `en`. Kept in sync with `<html lang>`.
- `t = translations[lang]`.
- `setLang` crossfades: `isChanging = true`, wait `TRANSITION_MS` (240 ms), swap, then clear 30 ms later. That 240 ms must match the `0.24s` transition on the `App` wrapper.

---

## 5. Content model

All site data lives in JSON in `src/data/`. To change text or data, edit these files; components don't need to change.

| File | Holds |
|---|---|
| `en.json`, `fr.json`, `es.json` | All visible copy for that language, plus screen-reader labels (`a11y`) |
| `site.json` | What every language shares: `profile` (name, photo, contact links), `sections`, `stack`, `experienceTags`, `featuredCount`, `projectMeta` |

`src/content.js` and `src/i18n/translations.js` only load these files and export them to the components.

Arrays are matched **by index**, so every language must keep the same order and lengths:

| `site.json` | Matches | Notes |
|---|---|---|
| `sections` | `nav[id]` in the language files, and the `<section id>`s | Order = nav order and section numbers |
| `experienceTags` | `experience.items` | One tag list per job |
| `projectMeta` | `projects.items` | `tags`, `image`, `links`, optional `flow` |
| `featuredCount` | — | The first N projects get the case-study layout; the rest appear under "Other work" |

Each project in the language files has `sector`, `title`, `context`, `summary` and `points[]`. A project with `"flow": true` in `projectMeta` also renders `WorkflowSteps` from `projects.flow`.

**To add a screenshot:** put the file in `public/projects/` and set `"image": "/projects/name.webp"` in `projectMeta`.
**To add links:** set `"links": { "live": "…", "repo": "…" }`, or `{ "private": true }` for code that can't be shared.
**To add a language:** add `src/data/<code>.json` with the same shape, then add it to `translations` in `src/i18n/translations.js`.

**Not read from JSON:** `index.html` (meta tags, JSON-LD, `<noscript>`) and `public/llms.txt` are static files for crawlers, so update them by hand when the facts change.

---

## 6. Styling

- **Tokens**:
  - `--bg`, `--bg-soft`, `--surface`, `--surface-2`, `--text`, `--text-soft`, `--text-muted`
  - `--accent`, `--accent-light`, `--accent-deep`, `--accent-text` (the AA-safe small accent text), `--accent-wash*`, `--accent-line`, `--spark` (coral)
  - `--border*`, `--glass`, `--status`
  - `--serif` / `--sans`
- **Buttons**: `.btn-primary` uses navy text on a teal gradient. `.btn-ghost` is glass with a hairline border.
- **Texture**: a fixed `.grain` SVG-noise overlay and the drifting `.hero-aurora` blobs.
- **Breakpoints**: 960px (nav collapses, single-column layout, hero object moves into the flow) and 480px (compact workflow steps, 2-up contact buttons).
- **Reduced motion**: Framer Motion via `MotionConfig`. CSS stops the aurora, pulse, scroll cue and marquee (the marquee wraps instead). `Magnetic` and the 3D loop stay off.

---

## 7. SEO / GEO

The app renders on the client, so `index.html` carries meta tags, Open Graph, JSON-LD (`ProfilePage` → `Person`) and a `<noscript>` text version. `public/` holds `robots.txt`, `sitemap.xml` and `llms.txt`. The remaining gap (no prerender) is tracked in `GEO-ANALYSIS.md`.

---

## 8. Known gaps

| Gap | Where |
|---|---|
| No project screenshots or links yet; the cards are ready for them | `content.js` → `projectMeta` |
| No CV download | Add the file to `public/` and a button in `Hero.jsx` |
| `logo.png` (favicon, 165 KB) and `profile.png` (222 KB) are unoptimised PNGs | `public/` |
| The `<noscript>` text and JSON-LD still use the old wording | `index.html` |
| No prerender/SSG | see `GEO-ANALYSIS.md` |
| ESLint fast-refresh warnings on the two context files (they export a hook next to the provider) | move the hooks to their own files |
