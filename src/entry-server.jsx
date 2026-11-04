import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { domAnimation, LazyMotion, MotionConfig } from "framer-motion";
import App from "./App.jsx";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

// Build-time render of one language; see scripts/prerender.mjs.
export function render(lang) {
  return renderToString(
    <StrictMode>
      <ThemeProvider>
        <LanguageProvider initialLang={lang}>
          <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">
              <App />
            </MotionConfig>
          </LazyMotion>
        </LanguageProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
