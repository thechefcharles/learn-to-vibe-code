"use client";

import { useEffect, useState } from "react";

interface Streak {
  current: number;
  longest: number;
}

export function useUserStreak(): Streak | null {
  const [streak, setStreak] = useState<Streak | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("user-streak");
      if (saved) {
        const parsed = JSON.parse(saved);
        setStreak(parsed);
      }
    } catch (err) {
      console.error("Failed to load streak data:", err);
    }
  }, []);

  return streak;
}
