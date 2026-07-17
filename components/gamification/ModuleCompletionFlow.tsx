'use client';

import { useUnlockCeremony, UnlockCeremony } from './UnlockCeremony';

interface ModuleCompletionFlowProps {
  moduleId: string;
  moduleName: string;
  nextModuleId?: string;
  onComplete?: () => void;
  children: React.ReactNode;
}

/**
 * Wraps module content and triggers unlock ceremony on completion.
 *
 * Usage:
 * <ModuleCompletionFlow moduleId="module-01" moduleName="Building with Claude Code">
 *   <LessonViewer {...} />
 * </ModuleCompletionFlow>
 */
export function ModuleCompletionFlow({
  moduleId,
  moduleName,
  nextModuleId,
  onComplete,
  children,
}: ModuleCompletionFlowProps) {
  const { ceremony } = useUnlockCeremony();

  // TODO: Module completion ceremony disabled
  // The /api/progress/{moduleId} endpoint does not exist
  // Completion is currently triggered through server actions instead

  return (
    <>
      {children}
      <UnlockCeremony {...ceremony} />
    </>
  );
}
