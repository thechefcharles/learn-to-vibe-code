"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface BookmarkButtonProps {
  moduleId: number;
  stepIndex: number;
  stepTitle: string;
}

export function BookmarkButton({
  moduleId,
  stepIndex,
  stepTitle,
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const storageKey = `bookmark-${moduleId}-${stepIndex}`;

  // Load bookmark state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setIsBookmarked(saved === "true");
  }, [storageKey]);

  const handleToggle = () => {
    const newState = !isBookmarked;
    setIsBookmarked(newState);

    if (newState) {
      localStorage.setItem(storageKey, "true");
      // Store bookmark metadata for bookmarks list/dashboard
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");
      bookmarks[storageKey] = {
        moduleId,
        stepIndex,
        stepTitle,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    } else {
      localStorage.removeItem(storageKey);
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}");
      delete bookmarks[storageKey];
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`p-2 rounded-lg transition ${
        isBookmarked
          ? "bg-amber-500/20 text-amber-400 border border-amber-500/50"
          : "bg-slate-700/50 text-slate-400 border border-slate-600/50 hover:bg-slate-600/50 hover:text-slate-300"
      }`}
      title={isBookmarked ? "Remove bookmark" : "Bookmark this step"}
    >
      <span className="text-lg">{isBookmarked ? "🔖" : "📖"}</span>
    </motion.button>
  );
}
