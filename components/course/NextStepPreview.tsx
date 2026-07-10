"use client";

import { motion } from "framer-motion";
import type { ModuleStep } from "@/lib/module-steps";

interface NextStepPreviewProps {
  nextStep: ModuleStep | undefined;
  isLastStep: boolean;
}

export function NextStepPreview({ nextStep, isLastStep }: NextStepPreviewProps) {
  if (isLastStep || !nextStep) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3 }}
      className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3 mb-4"
    >
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">
        Next
      </p>
      <p className="text-sm text-slate-200 font-medium mb-2">
        {nextStep.title}
      </p>
      {/* Duration intentionally omitted here — it's already shown in the
          "Time Estimates" hierarchy (Next lesson: ~X minutes) above this card. */}
      <p className="text-xs text-slate-400">
        {nextStep.type === "lesson"
          ? "📖"
          : nextStep.type === "checkpoint"
            ? "✓"
            : nextStep.type === "challenge"
              ? "🎯"
              : "?"}{" "}
        {nextStep.type}
      </p>
    </motion.div>
  );
}
