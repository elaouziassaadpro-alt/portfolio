import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Controls from "../components/Controls";
import { useLanguage } from "../contexts/LanguageContext";
import { profile, sections } from "../content";

// Floating glass bar. Links collapse into a menu sheet below 960px.
export default function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="nav" data-scrolled={scrolled || open}>
      <div className="nav-inner">
        <a href="#top" className="nav-logo" aria-label={profile.name} onClick={close}>
          A<em>E</em>
        </a>

        <nav className="nav-links" aria-label={t.a11y.sections}>
          {sections.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "true" : undefined}
            >
              {t.nav[id]}
            </a>
          ))}
        </nav>

        <div className="nav-controls">
          <Controls />
        </div>

        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t.nav.close : t.nav.menu}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" data-open={open}>
        <nav aria-label={t.a11y.sections}>
          {sections.map((id, i) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
              aria-current={active === id ? "true" : undefined}
              onClick={close}
            >
              <span className="section-index">{String(i + 1).padStart(2, "0")}</span>
              {t.nav[id]}
            </a>
          ))}
        </nav>
        <Controls />
      </div>
    </header>
  );
}
