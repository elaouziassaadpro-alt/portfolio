# Architecture — Assaad Elaouzi Portfolio

A single-page personal portfolio built with **React 19 + Vite 7**, rendered entirely on the client, deployed as static files on Vercel
(`https://portfolio-ten-tau-451f9zrxlt.vercel.app/`). There is no backend, no router and no data fetching: all content ships in the JS bundle.

---

## 1. Tech stack

| Concern | Choice | Notes |
|---|---|---|
| UI | React 19 (`StrictMode`) | Function components + hooks only |
| Build / dev server | Vite 7 + `@vitejs/plugin-react` | `@` alias → `./src` (`vite.config.js`) |
| Animation | `framer-motion` (scroll reveals), `motion` (unused `animated-beam`) | Same library under two package names |
| 3D globe | `cobe` | WebGL globe in the Vision section |
| Background | Hand-written WebGL fragment shader | `src/neural-glow.jsx` |
| Icons | `lucide-react` | |
| Styling | Plain CSS with custom-property tokens + inline `style={{}}` objects | `clsx` / `tailwind-merge` are installed but **Tailwind itself is not** |
| i18n | Home-grown React context | EN / FR / ES |
| Theming | Home-grown React context | Light / dark via `data-theme` on `<html>` |
| Lint | ESLint 9 flat config (`js`, `react-hooks`, `react-refresh`) | `npm run lint` |

Scripts: `npm run dev` · `npm run build` (→ `dist/`) · `npm run preview` · `npm run lint`.

---

## 2. Directory map

```
portfolio/
├── index.html              # SEO head: meta, OG/Twitter, JSON-LD (ProfilePage/Person), <noscript> fallback
├── vite.config.js          # React plugin + "@" alias
├── eslint.config.js
├── public/                 # Served as-is from site root
│   ├── logo.png, favicon.png, profile.png
│   ├── robots.txt          # Allows all + explicit AI crawlers (GPTBot, ClaudeBot, PerplexityBot…)
│   ├── sitemap.xml         # Single URL
│   └── llms.txt            # Plain-text site summary for LLM crawlers
├── src/
│   ├── main.jsx            # Entry: ThemeProvider → LanguageProvider → App
│   ├── App.jsx             # The whole page: Hero, About, Experience, Projects, Vision, Contact, Footer
│   ├── navbar.jsx          # Fixed nav, anchor links, language switch, theme toggle
│   ├── Gradient.jsx        # Contact CTA buttons (email / WhatsApp / phone) — name is historical
│   ├── Globe.jsx           # Thin wrapper around components/ui/globe
│   ├── cursor.jsx          # Canvas "follow cursor" dot (respects prefers-reduced-motion)
│   ├── neural-glow.jsx     # Full-screen WebGL shader background (z-index -1)
│   ├── index.css           # Design tokens (light + dark), base styles, utility classes
│   ├── App.css             # Body reset only
│   ├── contexts/
│   │   ├── ThemeContext.jsx
│   │   └── LanguageContext.jsx
│   ├── i18n/
│   │   └── translations.js # All copy, keyed by language; SUPPORTED_LANGUAGES
│   ├── components/
│   │   ├── ScrollReveal.jsx       # framer-motion whileInView wrapper
│   │   └── ui/
│   │       ├── globe.jsx          # cobe globe (used)
│   │       ├── animated-beam.jsx  # (unused — copied UI-library component)
│   │       └── liquid-gradient.tsx# (unused)
│   ├── assets/
│   │   ├── Beam.jsx        # (unused demo of animated-beam, uses Tailwind classes)
│   │   └── react.svg       # (unused)
│   └── lib/utils.js        # cn() = twMerge(clsx()) — used only by animated-beam
├── lib/utils.{js,ts}       # Duplicate of src/lib/utils, outside src — unused
├── registry.json           # shadcn registry for "ui-layouts" (third-party, 2.3k lines) — unused by the build
├── GEO-ANALYSIS.md         # SEO/GEO audit report (2026-09-01)
└── claude-seo/             # Untracked third-party SEO tool checkout — not part of the site
```

---

## 3. Runtime composition

```
index.html
 └─ <div id="root">  ← main.jsx
     └─ <StrictMode>
         └─ <ThemeProvider>            sets <html data-theme>, persists "portfolio-theme"
             └─ <LanguageProvider>     exposes { lang, setLang, t, isChanging }, persists "portfolio-lang"
                 └─ <App>              wrapper fades/blurs while isChanging
                     ├─ <FollowCursor>   canvas appended to <body>
                     ├─ <NeuralGlow>     fixed WebGL canvas behind everything
                     ├─ <Navbar>
                     ├─ <main>
                     │   ├─ #home        hero + profile photo
                     │   ├─ #about       bio, tech pills, icon card
                     │   ├─ #experience  t.experience.items
                     │   ├─ #projects    t.projects.items (alternating layout)
                     │   ├─ #vision      tags + <GlobeDemo> (cobe)
                     │   └─ #contact     contact card + <Button> (Gradient.jsx)
                     └─ <footer>
```

Navigation is pure in-page anchors (`#about`, `#projects`, …); `html { scroll-behavior }` in `index.css` handles smoothing. There is no routing.

Every section below the hero is wrapped in `<ScrollReveal>` (`initial` → `whileInView`, `once: true`), which is the only use of framer-motion.

---

## 4. State management

Two contexts, both in `src/contexts/`, both following the same pattern: lazy initial state from `localStorage` (wrapped in `try/catch`), a hook that throws outside its provider.

### ThemeContext
- State: `theme: "light" | "dark"` (default `light`; does **not** follow `prefers-color-scheme`).
- Effect writes `data-theme` on `<html>` and persists to `localStorage["portfolio-theme"]`.
- All colour switching happens in CSS: `:root` defines light tokens, `:root[data-theme="dark"]` overrides them.

### LanguageContext
- State: `lang` (initial: stored value → `navigator.language` prefix → `en`) and `isChanging`.
- `t = translations[lang]` — components read copy as `t.section.key`.
- `setLang` runs a timed crossfade:
  1. `isChanging = true` → `App` fades to opacity 0 + blur (CSS transition 0.24 s).
  2. After `TRANSITION_MS = 240` ms, swap `lang`, persist to `localStorage["portfolio-lang"]`.
  3. After a further 30 ms (`setTimeout`, deliberately not `rAF` so backgrounded tabs don't stay invisible), `isChanging = false`.
- **Coupling:** `TRANSITION_MS` in `LanguageContext.jsx` and the `0.24s` transition in `App.jsx` must change together.

---

## 5. Content model (i18n)

`src/i18n/translations.js` exports `translations = { en, fr, es }` and `SUPPORTED_LANGUAGES = ["en","fr","es"]`. Each language object has the same shape:

```
nav{about,experience,projects,vision,contact}
hero{titleBefore,titleAccent,subtitle,ctaProjects,ctaContact,photoRole}
about{heading,p1,p2,expertiseHeading,cards[4]}
experience{heading,items[5]{role,company,period,desc}}
projects{heading,items[5]{eyebrow,title,desc,bullets?}}
vision{heading,p1,expertiseHeading,tags[]}
contact{eyebrow,heading,p1,…Labels,location,buttons{email,whatsapp,call}}
footer
```

**Non-translated data lives in `App.jsx`** and is joined to the translated arrays **by index**:

| `App.jsx` array | Paired with | Must have same length/order |
|---|---|---|
| `experienceIcons` | `t.experience.items` | 5 |
| `aboutCardIcons` | `t.about.cards` | 4 |
| `projectVisuals` (icon + tech tags) | `t.projects.items` | 5 |
| `projectDelays` | `t.projects.items` | 5 |

Adding/removing/reordering an experience or project means editing **all three languages plus the matching `App.jsx` array**. Contact details (email, phone, social URLs) are hard-coded in `App.jsx`, `Gradient.jsx`, `index.html` (JSON-LD + noscript) and `public/llms.txt`.

---

## 6. Styling system

- **Tokens** (`src/index.css`): `--bg-*`, `--text-*`, `--accent-primary/secondary` (burnt orange `#d85a30` / gold `#b89b5e`), `*-wash`, `*-border`, `--surface-*`, `--shadow-sm|md|lg`, `--glass-blur`, `--theme-transition`. Dark mode redefines the same names.
- **Shared classes**: `.section`, `.glass-card`, `.btn`, `.btn-outline`, `.btn-premium`, `.pill`, `.pill-gold`, `.icon-plate`, `.callout`, `.eyebrow`, `.section-index`, `.gradient-text`, `.lang-switch`, `.theme-toggle`, `.animate-fade-in`, `.animate-float`.
- **Layout** is mostly inline `style` objects in `App.jsx`; `.nav-link` styles are injected via a `<style>` tag inside `App`.
- One breakpoint: `@media (max-width: 768px)` at the end of `index.css`.
- Fonts: `Outfit` (headings) referenced by name in CSS/inline styles.

### Visual layers (back → front)
1. `NeuralGlow` — fixed WebGL canvas, `z-index: -1`, reacts to pointer, touch, click and scroll progress.
2. Page sections — `position: relative; z-index: 10`.
3. `Navbar` — fixed, `z-index: 100`, gains surface + blur after 50 px of scroll.
4. `FollowCursor` — fixed canvas on `<body>`, `pointer-events: none`.

---

## 7. SEO / GEO layer

Because the app is client-rendered, crawlers that don't run JS see only `index.html`. To compensate:

- `<head>`: title, description, canonical, `theme-color`, Open Graph (`profile` type, `en_US` + `fr_FR`/`es_ES` alternates), Twitter card.
- JSON-LD `ProfilePage` → `Person` (address, employer `Organization`, `alumniOf` institutions, `sameAs` links).
- `<noscript>` block with a static text version of the page.
- `public/robots.txt` (explicitly allows AI crawlers), `sitemap.xml`, `llms.txt`.
- Status and remaining gaps are tracked in `GEO-ANALYSIS.md` (score 57/100; ceiling limited by lack of SSR/prerender).

The `<html lang>` stays `"en"` regardless of the selected language, and all languages share one URL (no hreflang).

---

## 8. Known issues & technical debt

| # | Issue | Where |
|---|---|---|
| 1 | Dead code: `animated-beam.jsx`, `liquid-gradient.tsx`, `assets/Beam.jsx`, `assets/react.svg`, root `lib/`, `registry.json`; `motion`, `clsx`, `tailwind-merge` exist only for them | see §2 |
| 2 | Tailwind class names (`min-h-screen`, Beam.jsx) used without Tailwind installed — they do nothing | `App.jsx:66` |
| 3 | Index-coupled arrays between `App.jsx` and translations (see §5) — easy to desync | `App.jsx:34-59` |
| 4 | Many unused `lucide-react` imports | `App.jsx:2-24` |
| 5 | Globe colours are hard-coded for the light theme; doesn't adapt to dark mode | `components/ui/globe.jsx` |
| 6 | `FollowCursor` colour hard-coded (`#d85a30`) instead of a token; logs to console under reduced motion | `App.jsx:73`, `cursor.jsx` |
| 7 | `NeuralGlow` and `cobe` run continuous animation loops even off-screen / under reduced motion | `neural-glow.jsx`, `globe.jsx` |
| 8 | `<html lang>` not updated on language switch | `LanguageContext.jsx` |
| 9 | Contact data duplicated in 4 places (see §5) | |
| 10 | `Gradient.jsx` exports a component named `Button` that is actually the contact CTA group | `Gradient.jsx` |
| 11 | Project cards use `key={idx}`; `target="_blank"` links lack `rel="noopener noreferrer"` | `App.jsx:489`, `Gradient.jsx` |
| 12 | Theme default ignores OS preference | `ThemeContext.jsx` |

---

## 9. How to extend

- **Add a section:** create the JSX block in `App.jsx` with an `id`, wrap in `<ScrollReveal>`, add copy under a new key in **all three** language objects, add a `nav` label + `<a href="#id">` in `navbar.jsx`, and mirror the text in the `<noscript>` block / `llms.txt` for crawlers.
- **Add a language:** add an object to `translations` with the full shape above, append its code to `SUPPORTED_LANGUAGES` (the switcher renders from that list), and add an `og:locale:alternate`.
- **Add a project/experience:** append to `items` in every language **and** append the matching entry to `projectVisuals`/`projectDelays` or `experienceIcons`.
- **Change colours:** edit tokens in both `:root` and `:root[data-theme="dark"]` in `index.css`; avoid hard-coded hex in components.

---

## 10. Suggested next steps (by impact)

1. **Prerender / SSG** (e.g. `vite-plugin-prerender` or a move to an SSG) so non-JS crawlers get the full page — the main GEO ceiling.
2. **Move non-text data into `translations.js` or a shared `content.js`** keyed by id, removing the index coupling and the 4-way contact duplication.
3. **Delete dead code and unused deps** (§8.1, §8.4) to shrink the bundle.
4. **Split `App.jsx`** (720 lines) into `sections/Hero.jsx`, `About.jsx`, … and move inline styles to CSS classes.
5. **Pause WebGL loops** when off-screen or under `prefers-reduced-motion`; theme-aware globe colours.
