"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { RippleEffect } from "./RippleEffect";
import { MagneticButton } from "./MagneticButton";

interface AnimatedActionButtonProps {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "outline";
  index: number;
}

const variantClasses = {
  primary:
    "bg-gradient-to-r from-violet to-violet-light hover:shadow-xl hover:shadow-violet/60 text-paper font-medium py-4 px-6 rounded-lg transition-all duration-300",
  secondary:
    "bg-gradient-to-r from-indigo to-violet hover:shadow-xl hover:shadow-indigo/60 text-paper font-medium py-4 px-6 rounded-lg transition-all duration-300",
  outline:
    "border-2 border-violet text-violet hover:bg-violet/10 hover:shadow-xl hover:shadow-violet/40 font-medium py-4 px-6 rounded-lg transition-all duration-300",
};

export function AnimatedActionButton({
  href,
  label,
  variant = "primary",
  index,
}: AnimatedActionButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.6 + index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.04,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.96 }}
      className="w-full"
    >
      <MagneticButton>
        <RippleEffect className="w-full">
          <Link
            href={href}
            className={`
              block relative overflow-hidden
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
              className="relative inline-block"
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
