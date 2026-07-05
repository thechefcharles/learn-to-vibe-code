"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RippleEffect } from "./RippleEffect";
import { MagneticButton } from "./MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedActionButtonProps {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "outline";
  index: number;
}

const variantClasses = {
  primary:
    "bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-violet/60 w-full text-center",
  secondary:
    "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo/60 w-full text-center",
  outline:
    "border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white hover:shadow-xl hover:shadow-violet/40 font-bold py-3 px-6 rounded-lg transition-all duration-300 w-full text-center",
};

export function AnimatedActionButton({
  href,
  label,
  variant = "primary",
  index,
}: AnimatedActionButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.6,
        delay: prefersReducedMotion ? 0 : 0.6 + index * 0.1,
        ease: "easeOut",
      }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              scale: 1.04,
              transition: { duration: 0.2 },
            }
      }
      whileTap={prefersReducedMotion ? {} : { scale: 0.96 }}
      className="w-full"
    >
      <MagneticButton className="w-full">
        <RippleEffect className="w-full">
          <Link
            href={href}
            className={`
              block w-full relative overflow-hidden
              ${variantClasses[variant]}
            `}
          >
            <motion.div
              className="absolute inset-0 bg-white/15 rounded-lg"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <motion.span
              className="relative z-10 inline-block"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          </Link>
        </RippleEffect>
      </MagneticButton>
    </motion.div>
  );
}
