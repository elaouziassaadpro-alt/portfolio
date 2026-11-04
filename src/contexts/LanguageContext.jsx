import { createContext, useContext, useEffect, useRef, useState } from "react";
import { languagePath, translations, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "../i18n/translations";

const LanguageContext = createContext(null);

// Fade-out duration before the text actually swaps. Kept in sync with the
// CSS transition duration App.jsx applies via `isChanging` — changing one
// without the other breaks the crossfade timing.
const TRANSITION_MS = 240;

// The URL decides the language: /, /fr/ and /es/ are separate pre-rendered pages.
function languageFromPath() {
  const segment = window.location.pathname.split("/")[1];
  return SUPPORTED_LANGUAGES.includes(segment) ? segment : DEFAULT_LANGUAGE;
}

function updateHead(lang) {
  const { title, description } = translations[lang].meta;
  document.documentElement.lang = lang;
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", window.location.origin + languagePath(lang));
}

export function LanguageProvider({ children, initialLang }) {
  const [lang, setLangState] = useState(() => initialLang ?? languageFromPath());
  const [isChanging, setIsChanging] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // On first render the pre-rendered head is already right for this page
    if (isFirstRender.current) {
      isFirstRender.current = false;
      document.documentElement.lang = lang;
      return;
    }
    updateHead(lang);
  }, [lang]);

  const setLang = (nextLang) => {
    if (!SUPPORTED_LANGUAGES.includes(nextLang) || nextLang === lang || isChanging) return;

    setIsChanging(true);
    window.setTimeout(() => {
      setLangState(nextLang);
      window.history.pushState(null, "", languagePath(nextLang) + window.location.hash);
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

  // Browser back/forward between language URLs
  useEffect(() => {
    const handlePop = () => setLangState(languageFromPath());
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

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
