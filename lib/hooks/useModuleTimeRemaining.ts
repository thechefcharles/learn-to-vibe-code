import type { ModuleStepSequence } from "@/lib/module-steps";

export function useModuleTimeRemaining(
  steps: ModuleStepSequence,
  currentStepIndex: number
): { remaining: number; total: number } {
  const remaining = steps.steps
    .slice(currentStepIndex + 1)
    .reduce((sum, step) => sum + step.duration, 0);

  return {
    remaining,
    total: Math.round(steps.totalDuration),
  };
}
