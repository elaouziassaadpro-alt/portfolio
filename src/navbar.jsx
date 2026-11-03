import React, { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from './contexts/ThemeContext'
import { useLanguage } from './contexts/LanguageContext'
import { SUPPORTED_LANGUAGES } from './i18n/translations'

const NAV_SECTIONS = ["about", "experience", "projects", "vision", "contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <nav
        style={{
          position: "fixed",
          width: "100%",
          padding: "20px 0",
          zIndex: 100,
          background: scrolled || open ? "var(--surface-color)" : "transparent",
          backdropFilter: scrolled || open ? "var(--glass-blur)" : "none",
          borderBottom: scrolled || open ? "1px solid var(--border-color)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <a href="#home" aria-label="Assaad Elaouzi" onClick={close}>
            <img src="/logo.png" alt="" width="50" height="50" style={{ display: "block" }} />
          </a>

          <div id="nav-links" className="nav-links" data-open={open}>
            {NAV_SECTIONS.map((id) => (
              <a key={id} href={`#${id}`} className="nav-link" onClick={close}>
                {t.nav[id]}
              </a>
            ))}

            <div className="nav-controls">
              <div className="lang-switch" role="group" aria-label="Language">
                {SUPPORTED_LANGUAGES.map((code) => (
                  <button
                    key={code}
                    type="button"
                    className={code === lang ? "active" : ""}
                    aria-pressed={code === lang}
                    onClick={() => setLang(code)}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              >
                {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
              </button>
            </div>
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
