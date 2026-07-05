"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface InfoTooltipProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export function InfoTooltip({ children, title, description }: InfoTooltipProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative inline-block w-full">
      <div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="w-full"
      >
        {children}
      </div>

      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none"
          >
            <div className="bg-slate-900/95 text-white rounded-lg px-4 py-3 shadow-xl max-w-xs backdrop-blur-sm">
              <p className="font-bold text-sm mb-1 text-white">{title}</p>
              <p className="text-xs leading-relaxed text-white/90">{description}</p>
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900/95 rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
