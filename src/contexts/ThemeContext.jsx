import { createContext, useContext, useSyncExternalStore } from "react";

const ThemeContext = createContext(null);
const listeners = new Set();

// The inline script in index.html applies a saved light theme before first
// paint, so the attribute is the source of truth. Pre-rendered HTML is always
// dark (the default look); React swaps in the real value right after hydration.
const getTheme = () => (document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
const getServerTheme = () => "dark";

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function toggleTheme() {
  const next = getTheme() === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("portfolio-theme", next);
  } catch {
    // ignore write failures
  }
  listeners.forEach((listener) => listener());
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
