import { createContext, useContext, useState } from "react";
import { translations, SUPPORTED_LANGUAGES } from "../i18n/translations";

const LanguageContext = createContext(null);

// Fade-out duration before the text actually swaps. Kept in sync with the
// CSS transition duration App.jsx applies via `isChanging` — changing one
// without the other breaks the crossfade timing.
const TRANSITION_MS = 240;

function getInitialLanguage() {
  try {
    const stored = localStorage.getItem("portfolio-lang");
    if (SUPPORTED_LANGUAGES.includes(stored)) return stored;
  } catch {
    // localStorage unavailable — fall through to browser detection
  }
  const browserLang = (navigator.language || "en").slice(0, 2);
  return SUPPORTED_LANGUAGES.includes(browserLang) ? browserLang : "en";
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLanguage);
  const [isChanging, setIsChanging] = useState(false);

  const setLang = (nextLang) => {
    if (!SUPPORTED_LANGUAGES.includes(nextLang) || nextLang === lang || isChanging) return;

    setIsChanging(true);
    window.setTimeout(() => {
      setLangState(nextLang);
      try {
        localStorage.setItem("portfolio-lang", nextLang);
      } catch {
        // ignore write failures
      }
      // Wait a beat so the browser commits the new text at opacity 0
      // before we transition back to 1 — flipping isChanging back in the
      // same tick as the text swap can get batched into one paint,
      // skipping the fade-in entirely. Uses setTimeout rather than rAF:
      // rAF is suspended on backgrounded tabs and never fires until the
      // tab regains focus, which would leave the page stuck invisible.
      window.setTimeout(() => setIsChanging(false), 30);
    }, TRANSITION_MS);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], isChanging }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
