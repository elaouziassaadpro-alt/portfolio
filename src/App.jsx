import "./App.css";
import Marquee from "./components/Marquee";
import { useLanguage } from "./contexts/LanguageContext";
import useActiveSection from "./hooks/useActiveSection";
import useGlowPointer from "./hooks/useGlowPointer";
import { lastUpdated, profile, sections, stack } from "./content";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Exploring from "./sections/Exploring";
import Faq from "./sections/Faq";
import Contact from "./sections/Contact";

function App() {
  const { lang, t, isChanging } = useLanguage();
  const active = useActiveSection(sections);
  useGlowPointer();

  return (
    <div
      // The crossfade duration must match TRANSITION_MS in LanguageContext.
      // filter must be "none" at rest: any filter value turns this wrapper
      // into the containing block for position: fixed children (the nav),
      // so they would scroll away with the page.
      style={{
        opacity: isChanging ? 0 : 1,
        filter: isChanging ? "blur(6px)" : "none",
        transition: "opacity 0.24s ease, filter 0.24s ease",
      }}
    >
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <div className="grain" aria-hidden="true" />
      <Navbar active={active} />

      <main id="main">
        <Hero />
        <Marquee items={stack} label={t.about.stackHeading} />
        <div className="container">
          <About />
          <Experience />
          <Projects />
          <Exploring />
          <Faq />
          <Contact />
        </div>
      </main>

      <footer className="footer">
        <p className="footer-mark" aria-hidden="true">
          {profile.name.split(" ")[1]}
        </p>
        <div className="container footer-row">
          <p>
            {t.footer} © {new Date().getFullYear()} · {t.updated}{" "}
            <time dateTime={lastUpdated}>
              {new Date(lastUpdated).toLocaleDateString(lang, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}
            </time>
          </p>
          <a href="#top" className="text-link">
            ↑ {t.backToTop}
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
