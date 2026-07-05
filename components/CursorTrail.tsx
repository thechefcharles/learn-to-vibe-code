"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  vx: number;
  vy: number;
}

const trailColors = [
  "#c084fc", // violet
  "#f97316", // orange
  "#84cc16", // lime
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#8b5cf6", // purple
];

export function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Skip trail if reduced motion is preferred
    if (prefersReducedMotion) return;

    let particleId = 0;
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const timeDelta = now - lastTime;

      // Create particles every 8ms for smooth trail
      if (timeDelta > 8 && (Math.abs(e.clientX - lastX) > 2 || Math.abs(e.clientY - lastY) > 2)) {
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;

        const newParticle: Particle = {
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
          color: trailColors[Math.floor(Math.random() * trailColors.length)],
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1, // bias upward
        };

        setParticles((prev) => {
          const updated = [...prev, newParticle];
          // Keep only last 50 particles for performance
          return updated.slice(-50);
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full blur-sm"
          style={{
            backgroundColor: particle.color,
            left: particle.x,
            top: particle.y,
            boxShadow: `0 0 8px ${particle.color}`,
          }}
          initial={{
            opacity: 0.8,
            scale: 1,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: 0,
            scale: 0,
            x: particle.vx * 40,
            y: particle.vy * 40,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
