'use client';

import { useEffect, useState } from 'react';
import { useUnlockCeremony, UnlockCeremony } from './UnlockCeremony';
import { useAuth } from '@/lib/useAuth';

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
  const { user, loading } = useAuth();
  const { ceremony, trigger } = useUnlockCeremony();
  const [hasTriggered, setHasTriggered] = useState(false);

  // Listen for module completion (from progress tracking)
  useEffect(() => {
    if (!user || hasTriggered || loading) return;

    // Check if module was just completed
    const checkCompletion = async () => {
      try {
        const res = await fetch(`/api/progress/${moduleId}?user_id=${user.id}`);
        const data = await res.json();

        if (data.completed && data.newly_completed) {
          setHasTriggered(true);

          // Calculate level progression
          const level = Math.floor((data.module_number || 1) / 4) + 1;
          const levelNames = ['Foundations', 'Building', 'Production', 'Landscape'];

          // Trigger ceremony
          trigger({
            type: 'module-complete',
            title: `MODULE ${data.module_number} COMPLETE`,
            subtitle: moduleName,
            badgeType: 'lesson',
            badgeTier: data.all_checks_passed ? 'platinum' : 'gold',
            details: [
              `You've reached Tier ${level}: ${levelNames[level - 1]}`,
              nextModuleId ? `Next: Module ${nextModuleId}` : 'You\'re ready for Capstone!',
              `+${data.xp_earned || 100} XP earned`,
            ],
          });

          onComplete?.();
        }
      } catch (error) {
        console.error('Error checking module completion:', error);
      }
    };

    // Check every 2 seconds for completion
    const interval = setInterval(checkCompletion, 2000);
    return () => clearInterval(interval);
  }, [user, loading, moduleId, moduleName, hasTriggered, trigger, onComplete]);

  return (
    <>
      {children}
      <UnlockCeremony {...ceremony} />
    </>
  );
}
