"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import { themes, type ThemeName } from "@/lib/themes";

const themeOrder: ThemeName[] = ["violet", "dark", "sage", "sunset", "ocean"];

export function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme();

  const handleThemeClick = (themeName: ThemeName) => {
    setTheme(themeName);
    // Apply background gradient to main container (transparent for violet to show video)
    const mainDiv = document.querySelector('[data-landing-container]');
    if (mainDiv) {
      const el = mainDiv as HTMLElement;
      if (themeName === 'violet') {
        el.style.background = 'transparent';
        el.style.backgroundColor = 'transparent';
        el.style.backgroundImage = 'none';
      } else {
        const theme = themes[themeName];
        el.style.background = theme.bg;
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 left-2 z-50"
    >
      <div className="flex gap-2 p-2 bg-white/80 backdrop-blur-md rounded-full border border-violet-light/20 shadow-lg">
        {themeOrder.map((themeName) => {
          const theme = themes[themeName];
          const isActive = currentTheme === themeName;

          return (
            <motion.button
              key={themeName}
              onClick={() => handleThemeClick(themeName)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={`w-6 h-6 rounded-full transition-all duration-300 ${
                isActive ? "ring-2 ring-offset-2 ring-slate-400 shadow-lg" : "hover:shadow-md"
              }`}
              style={{
                backgroundColor: theme.accent,
                cursor: "pointer",
              }}
              title={theme.name}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
