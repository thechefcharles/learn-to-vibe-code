"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Confetto {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  rotation: number;
  size: number;
}

const confettiColors = [
  "#c084fc", // violet
  "#f97316", // orange
  "#84cc16", // lime
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#8b5cf6", // purple
];

export function Confetti() {
  const [confetti, setConfetti] = useState<Confetto[]>([]);
  const [show, setShow] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip confetti if reduced motion is preferred
    if (prefersReducedMotion) return;

    // Trigger confetti on mount
    setShow(true);

    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.3,
      duration: 2 + Math.random() * 1,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * 360,
      size: 4 + Math.random() * 6,
    }));

    setConfetti(pieces);

    // Auto-hide after animation completes
    const timer = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute rounded-full"
              style={{
                width: piece.size,
                height: piece.size,
                left: `${piece.left}%`,
                backgroundColor: piece.color,
                boxShadow: `0 0 8px ${piece.color}`,
                top: "-20px",
              }}
              animate={{
                y: window.innerHeight + 100,
                opacity: [1, 1, 0],
                rotate: piece.rotation + 720,
                x: (Math.random() - 0.5) * 200,
              }}
              transition={{
                delay: piece.delay,
                duration: piece.duration,
                ease: "easeIn",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
