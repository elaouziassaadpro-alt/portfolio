import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { languagePath, SUPPORTED_LANGUAGES } from "../i18n/translations";

// Language switch + theme toggle, shared by the nav bar and the mobile menu.
export default function Controls() {
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="controls">
      <div className="lang-switch" role="group" aria-label={t.a11y.language}>
        {SUPPORTED_LANGUAGES.map((code) => (
          // Real links, so crawlers can follow them to each language's page
          <a
            key={code}
            href={languagePath(code)}
            hrefLang={code}
            className={code === lang ? "active" : ""}
            aria-current={code === lang ? "true" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLang(code);
            }}
          >
            {code.toUpperCase()}
          </a>
        ))}
      </div>

      <button
        type="button"
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={theme === "light" ? t.a11y.toDark : t.a11y.toLight}
      >
        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </div>
  );
}
