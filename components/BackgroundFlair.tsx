"use client";

import { motion } from "framer-motion";

interface FlairElementProps {
  delay: number;
  duration: number;
  x: string;
  y: string;
  size: number;
  color: string;
  rotation?: number;
}

function FlairElement({ delay, duration, x, y, size, color, rotation = 0 }: FlairElementProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.2, 0.8], rotate: [rotation, rotation + 180, rotation + 360] }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Geometric shape - triangle */}
      <svg viewBox="0 0 100 100" className="w-full h-full" fill={color}>
        <polygon points="50,10 90,90 10,90" />
      </svg>
    </motion.div>
  );
}

function FlairCircle({ delay, duration, x, y, size, color }: Omit<FlairElementProps, "rotation">) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 20, 0],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        delay,
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function BackgroundFlair() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Top right cluster */}
      <FlairElement delay={0} duration={8} x="75%" y="10%" size={80} color="rgba(192, 132, 252, 0.25)" rotation={0} />
      <FlairCircle delay={0.5} duration={6} x="80%" y="8%" size={120} color="rgba(139, 92, 246, 0.15)" />

      {/* Left side decorations */}
      <FlairElement delay={1} duration={10} x="5%" y="30%" size={100} color="rgba(34, 197, 94, 0.2)" rotation={45} />
      <FlairCircle delay={1.5} duration={7} x="2%" y="25%" size={90} color="rgba(34, 197, 94, 0.12)" />

      {/* Bottom right */}
      <FlairElement delay={2} duration={9} x="70%" y="75%" size={120} color="rgba(59, 130, 246, 0.2)" rotation={90} />
      <FlairCircle delay={2.5} duration={8} x="75%" y="80%" size={100} color="rgba(59, 130, 246, 0.12)" />

      {/* Center-left accent */}
      <FlairElement delay={0.3} duration={11} x="15%" y="60%" size={70} color="rgba(236, 72, 153, 0.2)" rotation={-45} />
      <FlairCircle delay={0.8} duration={6.5} x="10%" y="65%" size={80} color="rgba(236, 72, 153, 0.1)" />

      {/* Top left small accent */}
      <FlairCircle delay={1.2} duration={5} x="20%" y="15%" size={50} color="rgba(249, 115, 22, 0.15)" />

      {/* Right side floating */}
      <FlairElement delay={3} duration={12} x="85%" y="45%" size={90} color="rgba(168, 85, 247, 0.18)" rotation={180} />
    </div>
  );
}
