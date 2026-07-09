"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Stage {
  id: number;
  label: string;
  description: string;
  shortLabel: string;
}

const stages: Stage[] = [
  {
    id: 1,
    label: "Module",
    description: "Access course content and learning materials",
    shortLabel: "1",
  },
  {
    id: 2,
    label: "Quiz",
    description: "Take the module assessment and demonstrate knowledge",
    shortLabel: "2",
  },
  {
    id: 3,
    label: "Pass (80%)",
    description: "Achieve 80% or higher score to pass and earn XP",
    shortLabel: "3",
  },
  {
    id: 4,
    label: "Unlock Next",
    description: "Submit deliverable to unlock the next module",
    shortLabel: "4",
  },
  {
    id: 5,
    label: "Capstone",
    description: "After Module 15, access the capstone project challenge",
    shortLabel: "5",
  },
  {
    id: 6,
    label: "Certificate",
    description: "Earn your verifiable completion certificate and 9.3 CEUs",
    shortLabel: "6",
  },
];

export function ProgressFlowWidget() {
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [joystickX, setJoystickX] = useState(0);
  const [titleHover, setTitleHover] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const joystickRef = useRef<HTMLDivElement>(null);
  const joystickContainerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !joystickContainerRef.current || !joystickRef.current) return;

    const rect = joystickContainerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const clientX = e.clientX - rect.left;
    const offsetX = clientX - centerX;
    const maxOffset = 40;
    const constrainedX = Math.max(-maxOffset, Math.min(maxOffset, offsetX));

    setJoystickX(constrainedX);

    // Scroll based on drag position
    if (scrollContainerRef.current) {
      const scrollAmount = (constrainedX / maxOffset) * 15;
      scrollContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setJoystickX(0);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 overflow-hidden"
    >
      {/* Title */}
      <motion.h3
        onMouseEnter={() => setTitleHover(true)}
        onMouseLeave={() => setTitleHover(false)}
        animate={{
          scale: titleHover ? 1.3 : 1,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="uppercase tracking-wide mb-8 text-center cursor-pointer font-bold"
        style={{
          fontSize: titleHover ? '28px' : '20px',
          background: titleHover
            ? 'linear-gradient(to right, rgb(34, 211, 238), rgb(168, 85, 247), rgb(236, 72, 153))'
            : 'white',
          backgroundClip: titleHover ? 'text' : 'unset',
          WebkitBackgroundClip: titleHover ? 'text' : 'unset',
          WebkitTextFillColor: titleHover ? 'transparent' : 'white',
          color: titleHover ? 'transparent' : 'white',
        }}
      >
        Your Learning Journey
      </motion.h3>

      {/* Flow Container */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto scrollbar-hide"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="flex justify-center min-w-min px-4 relative pb-8">
          {/* Stage Items with connecting arrows */}
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              className="flex flex-col items-center relative flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: prefersReducedMotion ? 0 : 0.1 + index * 0.08,
                duration: 0.5,
              }}
            >
              {/* Stage Circle */}
              <motion.button
                onClick={() =>
                  setActiveStage(activeStage === stage.id ? null : stage.id)
                }
                className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-500/30 border-2 border-cyan-400/60 text-white font-bold text-sm cursor-pointer transition-all duration-300 hover:border-cyan-300/100 hover:shadow-lg hover:shadow-cyan-400/50 flex-shrink-0 group"
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: 1.12,
                        transition: { duration: 0.2 },
                      }
                }
                whileTap={
                  prefersReducedMotion
                    ? {}
                    : { scale: 0.9, transition: { duration: 0.1 } }
                }
              >
                {/* Animated glow ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Center glow */}
                <motion.div
                  className="absolute inset-2 rounded-full bg-cyan-400/10"
                  animate={{
                    opacity: activeStage === stage.id ? 0.6 : 0.2,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Text Label */}
                <span className="relative z-10 text-center leading-tight px-2">
                  {stage.shortLabel}
                </span>

                {/* Pulse animation on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-cyan-300/0 group-hover:border-cyan-300/60"
                  animate={{ scale: 1.3 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </motion.button>

              {/* Label */}
              <motion.p
                className="text-sm font-semibold text-white mt-4 text-center w-24 break-words"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.25 + index * 0.08,
                }}
              >
                {stage.label}
              </motion.p>

              {/* Interactive Tooltip */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: -15 }}
                animate={{
                  opacity: activeStage === stage.id ? 1 : 0,
                  scale: activeStage === stage.id ? 1 : 0.6,
                  y: activeStage === stage.id ? 15 : -15,
                  pointerEvents:
                    activeStage === stage.id ? "auto" : "none",
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-28 z-50 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 backdrop-blur-md rounded-xl p-4 w-max max-w-xs shadow-2xl border border-cyan-400/40 hover:border-cyan-300/60"
              >
                <p className="text-base font-bold bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stage.label}
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {stage.description}
                </p>

                {/* Tooltip arrow */}
                <motion.div
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border-t border-l border-cyan-400/40 rounded-sm"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glassy Joystick Control */}
      <div className="flex justify-center mt-6 relative h-20">
        <div ref={joystickContainerRef} className="relative w-32 h-16 flex items-center justify-center">
          {/* Base circle */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/30 shadow-lg shadow-white/20" />

          {/* Center crosshair glow */}
          <div className="absolute w-1 h-6 bg-gradient-to-b from-cyan-400/40 to-transparent" />
          <div className="absolute h-1 w-6 bg-gradient-to-r from-cyan-400/40 to-transparent" />

          {/* Joystick ball */}
          <motion.div
            ref={joystickRef}
            onMouseDown={handleMouseDown}
            animate={{ x: joystickX }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-12 h-12 rounded-full cursor-grab active:cursor-grabbing group"
          >
            {/* Ball gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-300/40 via-purple-400/40 to-pink-300/40 backdrop-blur-sm" />

            {/* Glossy shine */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/50 via-transparent to-transparent" />

            {/* Bright center glow */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-400/20" />

            {/* Subtle pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-cyan-300/0 group-hover:border-cyan-300/40"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Direction indicators */}
          <div className="absolute left-1 top-1/2 -translate-y-1/2 text-xs text-cyan-400/40">←</div>
          <div className="absolute right-1 top-1/2 -translate-y-1/2 text-xs text-cyan-400/40">→</div>
        </div>
      </div>

      {/* Scrollbar hide style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}
