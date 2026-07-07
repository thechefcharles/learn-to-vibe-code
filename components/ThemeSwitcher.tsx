"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/lib/ThemeContext";
import { themes, type ThemeName } from "@/lib/themes";

const themeOrder: ThemeName[] = ["violet", "dark", "sage", "sunset", "ocean"];

export function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 z-50 flex gap-2 items-center"
    >
      <span className="text-xs text-slate-600 font-medium">THEME:</span>
      <div className="flex gap-2 p-2 bg-white/80 backdrop-blur-md rounded-full border border-violet-light/20 shadow-lg">
        {themeOrder.map((themeName) => {
          const theme = themes[themeName];
          const isActive = currentTheme === themeName;

          return (
            <motion.button
              key={themeName}
              onClick={() => setTheme(themeName)}
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
