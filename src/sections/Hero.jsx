import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowDownRight } from "lucide-react";
import Magnetic from "../components/Magnetic";
import RevealText from "../components/RevealText";
import SceneBoundary from "../components/SceneBoundary";
import { useLanguage } from "../contexts/LanguageContext";
import { profile } from "../content";

// three.js is ~125 KB gzipped; load it in its own chunk after the page.
const HeroScene = lazy(() => import("../components/HeroScene"));

// How long after page load the 3D starts, so it never competes with the content.
// Phones have less CPU to share, so they wait longer (the CSS orb shows until then).
const SCENE_DELAY_MS = 1200;
const SCENE_DELAY_PHONE_MS = 3000;

const fadeDelay = (seconds) => ({ animationDelay: `${seconds}s` });

export default function Hero() {
  const { t } = useLanguage();
  const [first, last] = profile.name.split(" ");
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    let timer;
    const schedule = () => {
      const fine = window.matchMedia("(pointer: fine)").matches;
      timer = window.setTimeout(() => setShowScene(true), fine ? SCENE_DELAY_MS : SCENE_DELAY_PHONE_MS);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", schedule);
    };
  }, []);

  return (
    <section id="top" className="hero">
      <div className="hero-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="hero-visual">
        <div className="hero-orb" aria-hidden="true" />
        {showScene && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <HeroScene />
            </Suspense>
          </SceneBoundary>
        )}
      </div>

      <div className="hero-inner">
        <p className="hero-eyebrow hero-fade" style={fadeDelay(0.05)}>
          <span className="hero-eyebrow-rule" aria-hidden="true" />
          {t.intro.role}
        </p>

        <h1 className="hero-name" aria-label={profile.name}>
          <RevealText text={first} delay={0.15} />{" "}
          <RevealText text={last} delay={0.4} className="hero-name-accent" />
        </h1>

        <p className="hero-tagline hero-fade" style={fadeDelay(0.7)}>
          {t.intro.tagline}
        </p>

        <p className="now hero-fade" style={fadeDelay(0.85)}>
          <span className="now-dot" aria-hidden="true" />
          <span>
            <strong>{t.intro.nowLabel}</strong> — {t.intro.now}
          </span>
        </p>

        <div className="hero-actions hero-fade" style={fadeDelay(1)}>
          <Magnetic>
            <a href="#contact" className="btn btn-primary">
              {t.intro.ctaContact}
              <ArrowDownRight size={18} />
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#projects" className="btn btn-ghost">
              {t.intro.ctaProjects}
            </a>
          </Magnetic>
        </div>
      </div>

      <a href="#about" className="scroll-cue">
        <span className="scroll-cue-line" aria-hidden="true" />
        {t.intro.scroll}
      </a>
    </section>
  );
}
