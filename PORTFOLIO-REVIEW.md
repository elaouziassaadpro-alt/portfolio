# Portfolio Review & Action Plan

Site reviewed: https://portfolio-ten-tau-451f9zrxlt.vercel.app/ (live build, 2026-11-03), at 1440×900 and 375×812 (mobile), light and dark, EN and FR.
File references point to this repo.

---

## 1. Review

### Scores

| Area | Score | Why |
|---|---|---|
| First impression & hero | **5/10** | The photo card is strong and the title is readable. But "IT Applications Developer" could describe thousands of people. The subtitle is a 50-word sentence. In FR the title wraps to 4 lines at 72px and pushes the CTAs below the fold on a laptop. The neon blue/purple "AE" logo is the only cold colour on a cream and burnt-orange page, so it looks borrowed. |
| Visual hierarchy, type, colour | **6.5/10** | The colour tokens (`index.css` `:root` / `[data-theme="dark"]`) are consistent and AA-checked, and Outfit + Inter pair well. The weak points: the shader streak in `NeuralGlow` runs vertically *through* the About and Experience text, every section heading has the same weight, and in Contact a small h2 ("05. What's Next?") sits above a 3rem h3 ("Get In Touch"), so the heading order is inverted. |
| Project presentation | **3/10** | This is the weakest section, and it's the one recruiters spend the most time on. Each card gives about 55% of its width to a faded Lucide icon (`App.jsx:402-414`). There are no screenshots, no links, no statement of your role, no outcome or numbers, and no technical decisions. Every description follows the same template ("Built during my internship at X, this platform…"). The **Vision** section is a concept with no artifact, which dilutes the real work above it. |
| Navigation, CTAs, contact | **6/10** | The anchors work and the contact options are clear (email / WhatsApp / call). But there's no CV download anywhere, no active-section indicator, and the GitHub/LinkedIn links are bare 24px icons with no label. The projects have no CTA at all. Your email appears twice in the Contact section. |
| Responsiveness | **3/10** | **The nav is broken on mobile.** At 375px the nav row is 705px wide (measured), so the whole page scrolls sideways, "À propos" wraps under the logo, and there's no menu button. The project card grid collapses to an `80px / 288px` column split on mobile, which turns the image area into a strip. |
| Performance | **6/10** | Load is fast (DOMContentLoaded about 220 ms). But the page runs **3 canvases**: a full-screen WebGL shader, a cobe globe and the cursor dot, all on endless `requestAnimationFrame` loops. JS is 368 KB before compression. `logo.png` is 165 KB but shown at 50px, `favicon.png` is 378 KB and `profile.png` is 222 KB (PNG). Fonts arrive through a CSS `@import`, which adds an extra round trip before text paints. |
| Accessibility | **5/10** | Good: there's a `:focus-visible` outline and contrast was tuned. Problems: the GitHub/LinkedIn links have no accessible name, `<html lang>` stays `en` when you switch to FR or ES, the logo's alt text is "logo", only the cursor respects `prefers-reduced-motion` (the shader, globe, float and scroll reveals don't), and the `target="_blank"` links have no `rel`. |
| Animation & micro-interactions | **5/10** | The scroll reveals (`ScrollReveal.jsx`) are tasteful, and the blur crossfade on language switch is a nice detail. But too many things move at once: shader + cursor dot + 3 floating cards (`animate-float` on the photo, About card and globe card) + card lift + spinning globe. The cursor dot lags behind the real cursor and adds nothing. In dark mode the globe stays bright cream (`globe.jsx` uses fixed light colours) and becomes the brightest thing on the page. |

### Top 5 problems, by impact

1. **The projects don't prove anything** (`#projects`). There are no screenshots, links, role or results, so a recruiter can't tell what *you* did on the KYC platform versus what the team did. Everything else on the site matters less than this.
2. **Mobile is broken** (`navbar.jsx`). The page is 705px wide on a 375px phone. Many recruiters first open a portfolio from LinkedIn on their phone.
3. **The positioning is generic and long** (`#home`). The interesting fact, that you are *both* the developer *and* the IT person at an asset manager, is buried in paragraph 2 of About. There's no CV, no availability status, and no proof in the first viewport.
4. **Decorative noise competes with the content.** The shader streak runs through body text, the cursor dot follows you around, three cards bob up and down, the globe is glaring in dark mode, and Vision is a "concept" section. Each one adds a little; together they make the page feel template-built.
5. **Basic accessibility and performance debt.** Unlabelled icon links, the wrong `lang`, about 765 KB of PNGs where about 60 KB of WebP would do, three never-ending animation loops, and no reduced-motion handling.

---

## 2. References

All links below were opened and confirmed live on 2026-11-03.
**Skipped:** `portfolios.anav.dev`, whose domain doesn't resolve.
**Awwwards' portfolio category** is live, but its current list (Griflan Labs, HOLM, Daiki Fujita…) is almost all agencies and visual designers, so I took nothing from it for a backend/IT profile. Dribbble and Behance are live, but they show shots, not working sites, so they're no help here.

### The five you named

| Site | What makes it work (specifically) | Borrow ONE idea → where |
|---|---|---|
| [brittanychiang.com](https://brittanychiang.com/) (Next.js + Tailwind, Vercel) | A two-column layout: the left column (name, role, one-liner, a vertical section nav that highlights the current section, socials) stays put (`position: sticky` — I checked) while the right column scrolls. Each experience row has the date in its own narrow column on the left, a linked "Role · Company" title, 2–3 lines of text, and tech tags. Some project rows show a measurable badge ("100k+ installs"). | **The experience row format**: date column + linked title + tags → your `#experience` cards, which currently put the date at the far right where people miss it. |
| [rauno.me](https://rauno.me/) | Almost nothing on the page, and every detail is deliberate: a one-line bio, a short manifesto, and an email link that copies your address and shows "Copied" instead of opening a mail client. Craft is shown through small, polished interactions rather than effects. | **Click-to-copy email with a "Copied" state** → the email row of the `#contact` card. That removes the duplicate `mailto:` link. |
| [bruno-simon.com](https://bruno-simon.com/) (Three.js with TSL for WebGL/WebGPU, Rapier physics, Howler audio; source: [brunosimon/folio-2025](https://github.com/brunosimon/folio-2025), MIT) | The whole portfolio is a world you drive through. It works because 3D *is* his job. There's a quality/renderer setting, but no 2D fallback. | **One signature interaction that's tied to your work, not decoration.** Your cobe globe is already your "3D". Make its markers the real places your systems run (Casablanca, Jorf Lasfar, Tanger) with labels, or delete it. Don't copy the 3D world itself: it doesn't match your profile. |
| [joshwcomeau.com](https://www.joshwcomeau.com/) | A strong personal voice, a sound toggle next to the dark-mode toggle, and "interactive guides" where you learn by playing with a live widget. | **A small interactive explainer inside one case study**: a 4-step stepper of the KYC flow (submit → verify → review → approve) → inside the KYC project in `#projects`. That shows Laravel workflow thinking far better than a paragraph. |
| [jhey.dev](https://jhey.dev/) | A numbered "Latest" list of dated prototypes, live footer widgets (weather, Spotify) and a revision hash in the footer, so the site feels alive and maintained. | **A one-line "Now" status** ("Now: building the KYC platform at Alphavest · Open to Laravel/React roles") → under the hero subtitle. It's the cheapest way to make the page feel current. |

### More from the galleries and lists

Sources: [colorlib developer portfolios (2026 edition)](https://colorlib.com/wp/developer-portfolios/), [portfolio-ideas](https://portfolio-ideas.vercel.app/portfolio.html), [awesome-portfolios](https://github.com/benzara-tahar/awesome-portfolios).

| Site | Style | What's great | Borrow → where |
|---|---|---|---|
| [arpitbhayani.me](https://arpitbhayani.me/) | Editorial / backend | A backend engineer who leads with **numbers**: years of experience, counts of posts and videos, GitHub stars per project. Each project gets one line saying what it does, plus a link. | Add a stats strip to `#about` (e.g. "4 internships · 5 shipped systems · 1 regulated-finance platform"), using only numbers you can stand behind. |
| [tomweightman.com](https://www.tomweightman.com/) | Minimal | Each project is one line that says **what *he* did and on which platform** ("I built this app in Swift…", "Co-founder/CTO"). | Start every project `desc` with your role, in the first person. |
| [antfu.me/projects](https://antfu.me/projects) | Terminal-ish / dev | Projects are grouped by ecosystem, and each has a role label ("Maintainer", "Team member") and a link. | A role chip on each project card ("Solo developer", "Team of 3 · backend"). |
| [taniarascia.com](https://www.taniarascia.com/) | Minimal | A career timeline, and every project links to **both** its source and its demo. | A links row on each project card: "Demo · Code · Case study" (or "Private — NDA" when you can't share). |
| [diogotc.com](https://diogotc.com/) (source: [diogotcorreia/dtc-website](https://github.com/diogotcorreia/dtc-website)) | Minimal | A reverse-chronological timeline where entries carry language labels and links. "Top projects" cards each have an image and a "Visit Website" button. | A real image + button on each project card. |
| [emilkowal.ski](https://emilkowal.ski/) | Minimal | Text-only projects with one-line descriptions, plus writing about *why* he animates less. The restraint is the brand. | A reminder to drop `FollowCursor` and two of the three `animate-float`s. |
| [braydoncoyer.dev](https://braydoncoyer.dev/) | Bento / creative | The homepage is a stack of linked cards: About, Toolbox, an embedded **book-a-call** calendar, recent posts and a changelog. | A "Book a 30-min call" card (a free Cal.com link) in `#contact` next to WhatsApp. |
| [portfolio-magicui.vercel.app](https://portfolio-magicui.vercel.app/) | Minimal / template | All content lives in one data file. | The architecture idea: move all non-text project data into one `content.js` (see `architect.md` §5). |

### GitHub source studied

| Repo | Stars | Stack | What to learn |
|---|---|---|---|
| [magicuidesign/portfolio](https://github.com/magicuidesign/portfolio) | 1.5k | Next.js 14, TS, shadcn/ui, Tailwind, Framer Motion, Magic UI | Everything is driven by `src/data/resume.tsx`, a single typed content file. That's the fix for your index-coupled arrays in `App.jsx`. |
| [bchiang7/v4](https://github.com/bchiang7/v4) | 8.3k | Gatsby, styled-components, Netlify | Content lives in a `content/` folder, one file per job and project, separate from the layout. The README allows forks *with attribution* and asks people not to pass the design off as their own, so take patterns, not the look. |
| [benzara-tahar/awesome-portfolios](https://github.com/benzara-tahar/awesome-portfolios) | 12 | Svelte, Tailwind | A small list, but its criteria (contrast, readable type, theme switch, *few animations*, SEO-friendly text) make a good checklist. |
| [topics/developer-portfolio](https://github.com/topics/developer-portfolio) | — | — | The top templates (developerFolio 6.6k, soumyajit4419/Portfolio 6.5k, masterPortfolio 4.2k) are the source of the "template look". Avoid their particle backgrounds and typing-effect heroes. |

---

## 3. Action plan

### Quick wins (under 1 hour each)

1. **Fix the mobile nav**: add a hamburger menu. Code is in §4.1 below.
2. **Rewrite the hero** (`translations.js` → `hero`). Title: keep "IT Applications Developer", but shorten FR to "Développeur d'applications". Subtitle, ≤25 words, leading with your edge, e.g.:
   *"I build Laravel & React systems for finance and industry — and keep the IT behind them running. Currently at Alphavest Asset Management."*
   Then add the "Now" line (borrowed from jhey) and a **Download CV** button next to "View projects".
3. **Make the icon links accessible** (`App.jsx:136-165`): add `aria-label="GitHub"` / `aria-label="LinkedIn"`, and add `rel="noopener noreferrer"` to the `target="_blank"` links in `Gradient.jsx`. Remove `target="_blank"` from the `mailto:` link.
4. **Keep `<html lang>` in sync** with the language: in `LanguageContext.jsx`, add `useEffect(() => { document.documentElement.lang = lang; }, [lang]);`.
5. **Compress the images**:
   - `logo.png` (165 KB): export at 100×100 as WebP, about 5 KB
   - `favicon.png` (378 KB): export at 48×48, about 2 KB
   - `profile.png` (222 KB): convert to WebP at 800px wide, about 50 KB
   Recolour the logo into the burnt orange / ink palette.
6. **Cut motion noise**:
   - delete `<FollowCursor>` (`App.jsx:73`)
   - keep `animate-float` only on the hero photo
   - fade the shader out after the hero (code in §4.3)
7. **Fix the Contact headings**: make "Get In Touch" the `h2`, and turn "05. What's Next?" into a `span.section-index` above it, the same pattern as the other sections.
8. **Make the globe theme-aware** (`components/ui/globe.jsx`): read `useTheme()`, then set `dark: 1` and darker `baseColor`/`glowColor` values in dark mode, and add `theme` to the effect's dependency array.
9. **Load fonts without the `@import`**: move the Google Fonts request from `index.css:1` to `<link rel="preconnect">` plus `<link rel="stylesheet">` tags in `index.html`.

### Medium (1–3 days)

1. **Real case studies for the top 3 projects** (KYC, Laboratory, Project Evaluation). For each one:
   - a screenshot (blurred or with fake data if it's under NDA) or an architecture diagram
   - your role
   - problem → what you built → result
   - 2–3 technical decisions (e.g. "Livewire instead of an SPA because…")
   - links, or "Private (NDA)"

   Use §4.2 as the card. Move "Desktop Business Applications" and "Tour Booking" into a compact "Other work" list.
2. **Redesign the Experience section** using Brittany Chiang's row pattern: dates in a left column, a linked title, 2 lines of text, tags.
3. **Replace or cut Vision.** Either turn it into "What I'm exploring" with a real artifact (a repo, a schema diagram, a prototype), or reduce it to one line in About. In both cases, repurpose the globe (see the Bruno Simon row above) or drop it.
4. **Prerender the page** with `vite-react-ssg` or `vite-plugin-prerender`. That gives a full-HTML first paint and fixes the SEO ceiling noted in `GEO-ANALYSIS.md`.
5. **Add a CV PDF in EN/FR/ES**, plus a scroll-spy that highlights the current section in the nav.
6. **Clean the codebase**: delete the dead code listed in `architect.md` §8, and move all non-text data into a single `src/content.js`.

### Redesign directions (pick one)

**A. "Brittany Chiang clarity + Rauno details": *The Engineer's Ledger***
- Desktop has a sticky left column: name, a one-line positioning statement, scroll-spy nav, CV button, socials. The right column scrolls through About → Experience → Projects.
- Keep your cream and burnt-orange tokens, but drop the shader entirely. Add a subtle spotlight gradient that follows the cursor *inside the card you're hovering* instead.
- Details: copy-email with "Copied", hovering one row dims the others, `kbd`-style tags.
- Best if you want recruiters to scan the page in 30 seconds. Effort: about 3 days.

**B. "Arpit Bhayani numbers + Tom Weightman roles": *Enterprise Dossier***
- An editorial, document-like layout: big serif or Outfit numerals, a stats strip, and each project as a dated "file" with Role / Context / Architecture / Outcome fields.
- Each project gets a hand-drawn system diagram (SVG) of its data flow, e.g. KYC: client → upload → verification queue → compliance review → audit log.
- This leans into your real differentiator: regulated finance plus IT operations. Best for enterprise and consulting employers. Effort: 3–5 days, mostly writing and diagrams.

**C. "Josh Comeau personality + your globe": *Built in Morocco, Running Everywhere***
- Warm and playful. The hero globe becomes a map of where your systems run (OCP Jorf Lasfar, Casablanca, Tanger) with clickable markers that open each project.
- One interactive explainer per case study (the KYC stepper), plus a sound or "IT ops" easter egg (a fake uptime terminal) in the footer.
- The most memorable option and the most work: 1–2 weeks. You must keep the content as strong as in A or B, or it turns into decoration again.

My recommendation is **A for structure plus B's case-study fields**. It fixes problems 1–4 directly and suits a Laravel/IT profile.

### Libraries: when to use, when to avoid

| Library | Use it when | Avoid it when / notes for you |
|---|---|---|
| **Framer Motion** (already installed) | Scroll reveals, layout transitions (expanding a project card), `AnimatePresence` for the mobile menu | Keep it. Remove the duplicate `motion` package; it's the same library and only the dead `animated-beam` uses it. Wrap the app in `<MotionConfig reducedMotion="user">`. |
| **GSAP + ScrollTrigger** | Pinned, scroll-scrubbed storytelling (direction C) | Avoid it for A and B: it's another 40+ KB to do what Framer Motion already does for you. |
| **Lenis** | Very long, scroll-driven, designed sites | Avoid it. It hijacks native scroll, which hurts accessibility and makes anchor jumps feel wrong, and your page isn't long enough to benefit. |
| **shadcn/ui** | If you migrate to Tailwind (e.g. a Next.js rewrite) and need accessible primitives (Dialog, Sheet for the mobile menu, Tooltip) | Avoid it on the current stack: it needs Tailwind, which you don't have. That's why the `min-h-screen` class does nothing today. |
| **Magic UI** | One-off effects on a Tailwind stack (marquee, number ticker for the stats strip) | Avoid pasting effects for their own sake. `animated-beam.jsx` is already sitting unused in your repo. If you add one, give it a purpose (e.g. NumberTicker for real stats). |
| **Three.js / R3F** | Direction C, if the globe becomes interactive with clickable markers | Avoid it otherwise. `cobe` (about 5 KB) already draws your globe; Three.js is about 150 KB or more. |
| **vite-react-ssg** | Now: it prerenders the page to HTML | — |
| **vite-imagetools** or Squoosh | Generating WebP/AVIF images in several sizes | — |

---

## 4. Code for the three most impactful changes

### 4.1 Mobile navigation (fixes the horizontal scroll)

`src/navbar.jsx` (replace the links container and add the button):

```jsx
import React, { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
// …existing imports

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  // …existing scroll effect

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav /* …existing style */>
      <div /* …existing inner container style */>
        <a href="#home" aria-label="Assaad Elaouzi — home">
          <img src="/logo.webp" alt="" width="50" height="50" />
        </a>

        <div id="nav-links" className="nav-links" data-open={open}>
          {["about", "experience", "projects", "vision", "contact"].map((id) => (
            <a key={id} href={`#${id}`} className="nav-link" onClick={close}>
              {t.nav[id]}
            </a>
          ))}
          {/* …existing .lang-switch and .theme-toggle, unchanged */}
        </div>

        <button
          type="button"
          className="nav-burger"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? t.nav.close : t.nav.menu}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  )
}
```

Add `menu` / `close` to `nav` in each language: `"Menu"/"Close"`, `"Menu"/"Fermer"`, `"Menú"/"Cerrar"`.

`src/index.css`:

```css
.nav-links {
display: flex;
align-items: center;
gap: 2rem;
font-weight: 500;
font-size: 0.95rem;
}

.nav-burger {
display: none;
align-items: center;
justify-content: center;
width: 44px;
height: 44px;
border-radius: 12px;
border: 1px solid var(--border-color);
background: var(--surface-solid);
color: var(--text-primary);
cursor: pointer;
}

@media (max-width: 860px) {
.nav-burger {
display: inline-flex;
}

.nav-links {
display: none;
position: fixed;
top: 84px;
left: 16px;
right: 16px;
flex-direction: column;
align-items: flex-start;
gap: 1.25rem;
padding: 1.5rem;
background: var(--surface-solid);
border: 1px solid var(--border-color);
border-radius: 16px;
box-shadow: var(--shadow-lg);
}

.nav-links[data-open="true"] {
display: flex;
}
}
```

### 4.2 Project case-study card (proof instead of icons)

Data. In `translations.js`, add the translated fields to each project. **Fill in real values; don't invent metrics:**

```js
{
  eyebrow: "Financial Sector",
  title: "Enterprise KYC Platform",
  role: "Sole developer · Laravel, Livewire",
  problem: "Client onboarding checks were tracked by hand across …",
  solution: "A Laravel + Livewire app with document upload, a verification queue and a full audit log.",
  outcome: "Onboarding now … (e.g. time per file, files processed, manual steps removed)",
},
```

In `App.jsx`, extend `projectVisuals` (non-text data, same index as today):

```js
const projectVisuals = [
  { Icon: ShieldCheck, tags: ["Laravel", "PHP", "Livewire", "MySQL"], image: "/projects/kyc.webp", links: { private: true } },
  { Icon: Activity, tags: ["Laravel", "React.js", "Docker"], image: "/projects/lab.webp", links: { repo: "https://github.com/…" } },
  // …
];
```

Card (replaces the `imageBlock` / `textBlock` pair in `#projects`):

```jsx
<ScrollReveal key={project.title} delay={projectDelays[idx]}>
  <article className="glass-card project-card" data-flip={!imageFirst}>
    <div className="project-media">
      {image ? (
        <img src={image} alt={`${project.title} — screenshot`} loading="lazy" width="1200" height="750" />
      ) : (
        <Icon size={80} color="var(--text-secondary)" opacity={0.3} aria-hidden="true" />
      )}
    </div>

    <div className="project-body">
      <span className="eyebrow">{project.eyebrow}</span>
      <h3 style={{ fontSize: "1.6rem", margin: "0.5rem 0 0.25rem" }}>{project.title}</h3>
      {project.role && <p className="project-role">{project.role}</p>}

      <dl className="project-facts">
        <dt>{t.projects.labels.problem}</dt><dd>{project.problem ?? project.desc}</dd>
        {project.solution && (<><dt>{t.projects.labels.solution}</dt><dd>{project.solution}</dd></>)}
        {project.outcome && (<><dt>{t.projects.labels.outcome}</dt><dd>{project.outcome}</dd></>)}
      </dl>

      <ul className="project-tags" aria-label="Stack">
        {tags.map((tag) => <li key={tag} className="pill">{tag}</li>)}
      </ul>

      <div className="project-links">
        {links.live && <a href={links.live} target="_blank" rel="noopener noreferrer" className="btn btn-outline">{t.projects.labels.live} <ExternalLink size={16} /></a>}
        {links.repo && <a href={links.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline">{t.projects.labels.code} <Github size={16} /></a>}
        {links.private && <span className="project-private">{t.projects.labels.private}</span>}
      </div>
    </div>
  </article>
</ScrollReveal>
```

Add `labels: { problem, solution, outcome, live, code, private }` under `projects` in each language, e.g. FR: `"Problème", "Solution", "Résultat", "Voir en ligne", "Code", "Code privé (client)"`.

`src/index.css`:

```css
.project-card {
display: grid;
grid-template-columns: 1.1fr 1fr;
padding: 0;
overflow: hidden;
}

.project-card[data-flip="true"] .project-media {
order: 2;
}

.project-media {
display: flex;
align-items: center;
justify-content: center;
min-height: 280px;
background: var(--bg-elevated);
}

.project-media img {
width: 100%;
height: 100%;
object-fit: cover;
object-position: top left;
}

.project-body {
padding: 2rem;
display: flex;
flex-direction: column;
gap: 0.75rem;
}

.project-role {
font-family: "Outfit", sans-serif;
font-weight: 600;
color: var(--accent-text);
}

.project-facts {
display: grid;
grid-template-columns: max-content 1fr;
gap: 0.4rem 1rem;
font-size: 0.95rem;
}

.project-facts dt {
font-family: "Outfit", sans-serif;
font-weight: 600;
color: var(--text-primary);
}

.project-facts dd {
color: var(--text-secondary);
}

.project-tags,
.project-links {
display: flex;
flex-wrap: wrap;
gap: 0.5rem;
list-style: none;
}

.project-private {
font-size: 0.85rem;
color: var(--text-muted);
}

@media (max-width: 860px) {
.project-card {
grid-template-columns: 1fr;
}

.project-card[data-flip="true"] .project-media {
order: 0;
}

.project-facts {
grid-template-columns: 1fr;
}
}
```

This also removes the negative `marginLeft: "-50px"` on `.callout`, which pushed text into the image column.

### 4.3 Calm, accessible motion (shader only in the hero, respects reduced motion)

`src/main.jsx`: make every Framer Motion animation (all the `ScrollReveal`s) honour the OS setting:

```jsx
import { MotionConfig } from 'framer-motion'
// …
<ThemeProvider>
  <LanguageProvider>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </LanguageProvider>
</ThemeProvider>
```

`src/neural-glow.jsx`: fade the glow out as you scroll past the hero, and stop the loop once it's invisible. That removes the streak through your About/Experience text and frees the GPU for the rest of the page.

```jsx
const BASE_OPACITY = 0.3;

const render = () => {
  const gl = glRef.current;
  const uniforms = uniformsRef.current;
  const canvas = canvasRef.current;
  if (!gl || !uniforms || !canvas) return;

  // Fully visible at the top, gone after one viewport of scroll.
  const fade = Math.max(0, 1 - window.scrollY / window.innerHeight);
  canvas.style.opacity = String(BASE_OPACITY * fade);
  if (fade === 0) {
    animationRef.current = null; // paused; onScroll restarts it
    return;
  }

  // …existing pointer easing, uniforms and drawArrays

  if (!reduceMotionRef.current) {
    animationRef.current = requestAnimationFrame(render);
  }
};
```

```jsx
const reduceMotionRef = useRef(false);

useEffect(() => {
  reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  glRef.current = initShader();
  resizeCanvas();
  render(); // with reduced motion this draws one static frame

  const onScroll = () => {
    if (animationRef.current == null) render();
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  // …existing listeners

  return () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    window.removeEventListener('scroll', onScroll);
    // …existing removals
  };
}, []);
```

Also remove `opacity: 0.3` from the canvas inline style, since `render` sets it now. Then delete `<FollowCursor>` from `App.jsx`, and add to `index.css`:

```css
@media (prefers-reduced-motion: reduce) {
.animate-float,
.animate-fade-in {
animation: none;
}

.glass-card:hover,
.btn-premium:hover {
transform: none;
}
}
```
