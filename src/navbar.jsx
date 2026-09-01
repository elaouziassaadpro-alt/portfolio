import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './contexts/ThemeContext'
import { useLanguage } from './contexts/LanguageContext'
import { SUPPORTED_LANGUAGES } from './i18n/translations'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
        style={{
          position: "fixed",
          width: "100%",
          padding: "20px 0",
          zIndex: 100,
          background: scrolled ? "var(--surface-color)" : "transparent",
          backdropFilter: scrolled ? "var(--glass-blur)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-color)" : "none",
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
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "800",
              fontFamily: "Outfit",
            }}
          >
            <span className="gradient-text"><img src="/logo.png" alt="logo" style={{ width: "50px", height: "50px" }} /></span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem", fontWeight: "500", fontSize: "0.95rem" }}>
            <a href="#about" className="nav-link">{t.nav.about}</a>
            <a href="#experience" className="nav-link">{t.nav.experience}</a>
            <a href="#projects" className="nav-link">{t.nav.projects}</a>
            <a href="#vision" className="nav-link">{t.nav.vision}</a>
            <a href="#contact" className="nav-link">{t.nav.contact}</a>

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
      </nav>
  )
}