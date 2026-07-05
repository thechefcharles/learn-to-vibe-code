"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface OrbProps {
  delay: number;
  duration: number;
  x: string;
  y: string;
  size: number;
  color: string;
  opacity: number;
}

function Orb({ delay, duration, x, y, size, color, opacity }: OrbProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="absolute rounded-full blur-3xl pointer-events-none"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        backgroundColor: color,
        opacity: opacity,
      }}
      animate={
        prefersReducedMotion
          ? {}
          : {
              x: [0, 30, -30, 0],
              y: [0, -40, 40, 0],
              scale: [1, 1.2, 0.8, 1],
            }
      }
      transition={
        prefersReducedMotion
          ? {}
          : {
              delay,
              duration,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    />
  );
}

export function FloatingOrbs() {
  const orbs: OrbProps[] = [
    {
      delay: 0,
      duration: 20,
      x: "10%",
      y: "20%",
      size: 300,
      color: "rgba(168, 85, 247, 0.15)", // purple
      opacity: 0.4,
    },
    {
      delay: 2,
      duration: 25,
      x: "60%",
      y: "10%",
      size: 250,
      color: "rgba(59, 130, 246, 0.15)", // blue
      opacity: 0.3,
    },
    {
      delay: 4,
      duration: 22,
      x: "70%",
      y: "60%",
      size: 280,
      color: "rgba(236, 72, 153, 0.15)", // pink
      opacity: 0.35,
    },
    {
      delay: 1,
      duration: 28,
      x: "20%",
      y: "70%",
      size: 320,
      color: "rgba(34, 197, 94, 0.15)", // green
      opacity: 0.25,
    },
    {
      delay: 3,
      duration: 24,
      x: "80%",
      y: "30%",
      size: 260,
      color: "rgba(249, 115, 22, 0.15)", // orange
      opacity: 0.3,
    },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {orbs.map((orb, idx) => (
        <Orb key={idx} {...orb} />
      ))}
    </div>
  );
}
