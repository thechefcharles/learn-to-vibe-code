"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { themes, type ThemeName, type Theme } from "./themes";

interface ThemeContextType {
  currentTheme: ThemeName;
  theme: Theme;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("violet");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as ThemeName | null;
    if (saved && saved in themes) {
      setCurrentTheme(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    localStorage.setItem("theme", currentTheme);

    const theme = themes[currentTheme];
    document.documentElement.style.setProperty("--color-accent", theme.accent);
    document.documentElement.style.setProperty("--color-accent-light", theme.accentLight);
    document.documentElement.style.setProperty("--color-bg", theme.bg);
    document.documentElement.style.setProperty("--color-text", theme.text);
    document.documentElement.style.setProperty("--color-text-muted", theme.textMuted);
    document.documentElement.style.setProperty("--color-card-bg", theme.cardBg);
    document.documentElement.style.setProperty("--color-card-border", theme.cardBorder);
  }, [currentTheme, mounted]);

  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ currentTheme, theme: themes[currentTheme], setTheme: setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
