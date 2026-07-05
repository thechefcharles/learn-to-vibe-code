"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ from, to, duration = 2, className = "" }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(from);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easeOutValue = 1 - Math.pow(1 - progress, 3); // easeOut cubic
      const current = Math.floor(from + (to - from) * easeOutValue);
      setDisplayValue(current);

      if (progress === 1) clearInterval(interval);
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [from, to, duration]);

  return <span className={className}>{displayValue}</span>;
}
