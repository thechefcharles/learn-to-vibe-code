"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RippleEffect } from "./RippleEffect";
import { MagneticButton } from "./MagneticButton";

interface PlayButtonProps {
  hasStarted: boolean;
}

export function PlayButton({ hasStarted }: PlayButtonProps) {
  const label = hasStarted ? "Resume" : "Start";
  const icon = hasStarted ? "▶" : "▶";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: "backOut" }}
      className="flex justify-center mb-12"
    >
      <MagneticButton className="relative">
        <RippleEffect>
          <Link href="/course">
            <motion.div
              className="relative w-32 h-32 rounded-full bg-gradient-to-br from-violet-600 via-violet-500 to-indigo-600 shadow-2xl shadow-violet/60 flex items-center justify-center overflow-hidden group cursor-pointer"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 40px rgba(124, 58, 237, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Rotating glow background */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-400/50 via-purple-400/30 to-indigo-400/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />

              {/* Pulsing rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-violet-300/40"
                animate={{ scale: [1, 1.2], opacity: [0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-violet-300/40"
                animate={{ scale: [1, 1.2], opacity: [0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />

              {/* Play icon + label */}
              <motion.div
                className="relative z-10 flex flex-col items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  className="text-5xl text-white"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {icon}
                </motion.span>
                <span className="text-sm font-bold text-white uppercase tracking-wider">
                  {label}
                </span>
              </motion.div>

              {/* Shine overlay */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-150%" }}
                whileHover={{ x: "150%" }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          </Link>
        </RippleEffect>
      </MagneticButton>
    </motion.div>
  );
}
