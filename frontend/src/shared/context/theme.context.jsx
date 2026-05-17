import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { THEMES, DEFAULT_THEME, STORAGE_KEY } from "@shared/theme/themes";

const ThemeContext = createContext(null);

const validIds = THEMES.map((t) => t.id);

const readInitial = () => {
  if (typeof window === "undefined") return DEFAULT_THEME;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && validIds.includes(stored)) return stored;
  return DEFAULT_THEME;
};

export const ThemeContextProvider = ({ children }) => {
  const [theme, setThemeState] = useState(readInitial);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((id) => {
    if (validIds.includes(id)) setThemeState(id);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((prev) => {
      const idx = validIds.indexOf(prev);
      return validIds[(idx + 1) % validIds.length];
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeContextProvider");
  return ctx;
};
