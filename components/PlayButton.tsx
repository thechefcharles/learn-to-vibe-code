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
              className="relative px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {/* Play icon + label */}
              <span className="text-2xl text-white">{icon}</span>
              <span className="text-lg font-bold text-white uppercase tracking-wide">
                {label}
              </span>
            </motion.div>
          </Link>
        </RippleEffect>
      </MagneticButton>
    </motion.div>
  );
}
