import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Magnetic from "../components/Magnetic";
import RevealText from "../components/RevealText";
import SceneBoundary from "../components/SceneBoundary";
import { useLanguage } from "../contexts/LanguageContext";
import { profile } from "../content";

// three.js is ~150 KB gzipped; load it in its own chunk after the page.
const HeroScene = lazy(() => import("../components/HeroScene"));

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] },
});

export default function Hero() {
  const { t } = useLanguage();
  const [first, last] = profile.name.split(" ");

  return (
    <section id="top" className="hero">
      <div className="hero-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="hero-visual">
        <div className="hero-orb" aria-hidden="true" />
        <SceneBoundary>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </SceneBoundary>
      </div>

      <div className="hero-inner">
        <motion.p className="hero-eyebrow" {...fadeUp(0.05)}>
          <span className="hero-eyebrow-rule" aria-hidden="true" />
          {t.intro.role}
        </motion.p>

        <h1 className="hero-name" aria-label={profile.name}>
          <RevealText text={first} delay={0.15} />
          <RevealText text={last} delay={0.4} className="hero-name-accent" />
        </h1>

        <motion.p className="hero-tagline" {...fadeUp(0.9)}>
          {t.intro.tagline}
        </motion.p>

        <motion.p className="now" {...fadeUp(1.05)}>
          <span className="now-dot" aria-hidden="true" />
          <span>
            <strong>{t.intro.nowLabel}</strong> — {t.intro.now}
          </span>
        </motion.p>

        <motion.div className="hero-actions" {...fadeUp(1.2)}>
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
        </motion.div>
      </div>

      <a href="#about" className="scroll-cue">
        <span className="scroll-cue-line" aria-hidden="true" />
        {t.intro.scroll}
      </a>
    </section>
  );
}
