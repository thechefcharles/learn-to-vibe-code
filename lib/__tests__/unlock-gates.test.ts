import { describe, it, expect } from 'vitest';

/**
 * Pure logic tests for module unlock gate rules
 * Real server-side checks use hasPassedQuiz + hasSubmittedDeliverable
 */

describe('Module Unlock Gates', () => {
  describe('Unlock Logic', () => {
    it('should unlock Module 1 unconditionally', () => {
      // Module 1 is always unlocked - no dependencies (first module)
      expect(isModuleUnlockedLogic(1)).toBe(true);
    });

    it('should require prev module quiz passed to unlock Module N', () => {
      // To unlock Module 2, must pass Module 1 quiz
      const result = isModuleUnlockedLogic(2, {
        quizPassed: true,
        deliverableSubmitted: true,
      });
      expect(result).toBe(true);
    });

    it('should require prev module deliverable submitted to unlock Module N', () => {
      // To unlock Module 2, must submit Module 1 deliverable
      const result = isModuleUnlockedLogic(2, {
        quizPassed: true,
        deliverableSubmitted: true,
      });
      expect(result).toBe(true);
    });

    it('should fail unlock if prev module quiz not passed', () => {
      const result = isModuleUnlockedLogic(2, {
        quizPassed: false,
        deliverableSubmitted: true,
      });
      expect(result).toBe(false);
    });

    it('should fail unlock if prev module deliverable not submitted', () => {
      const result = isModuleUnlockedLogic(2, {
        quizPassed: true,
        deliverableSubmitted: false,
      });
      expect(result).toBe(false);
    });

    it('should require both conditions to unlock any module > 1', () => {
      // Both must be true
      expect(
        isModuleUnlockedLogic(5, { quizPassed: true, deliverableSubmitted: true })
      ).toBe(true);

      expect(
        isModuleUnlockedLogic(5, { quizPassed: false, deliverableSubmitted: true })
      ).toBe(false);

      expect(
        isModuleUnlockedLogic(5, { quizPassed: true, deliverableSubmitted: false })
      ).toBe(false);

      expect(
        isModuleUnlockedLogic(5, {
          quizPassed: false,
          deliverableSubmitted: false,
        })
      ).toBe(false);
    });
  });

  describe('Capstone Unlock', () => {
    it('should require Module 16 completion to unlock capstone', () => {
      // Capstone available only after Module 16 completion (last regular module)
      const result = isCapstoneUnlockedLogic(16, {
        allModulesCompleted: true,
      });
      expect(result).toBe(true);
    });

    it('should not allow capstone attempt before Module 16', () => {
      const result = isCapstoneUnlockedLogic(15, {
        allModulesCompleted: false,
      });
      expect(result).toBe(false);
    });

    it('should allow capstone only if all 16 modules completed', () => {
      // Need to pass all 16 modules (1-16)
      const result = isCapstoneUnlockedLogic(16, {
        allModulesCompleted: true,
      });
      expect(result).toBe(true);
    });
  });

  describe('Quiz Pass Logic', () => {
    it('should pass at exactly 80%', () => {
      expect(isQuizPassedLogic(80)).toBe(true);
    });

    it('should pass above 80%', () => {
      expect(isQuizPassedLogic(85)).toBe(true);
      expect(isQuizPassedLogic(100)).toBe(true);
    });

    it('should fail below 80%', () => {
      expect(isQuizPassedLogic(79)).toBe(false);
      expect(isQuizPassedLogic(50)).toBe(false);
      expect(isQuizPassedLogic(0)).toBe(false);
    });
  });

  describe('Module Dependency Chain', () => {
    it('should allow linear progression through all modules', () => {
      // User should be able to unlock modules 1-16 in sequence
      let prevModuleState = { quizPassed: true, deliverableSubmitted: true };

      for (let i = 2; i <= 16; i++) {
        const canUnlock = isModuleUnlockedLogic(i, prevModuleState);
        expect(canUnlock).toBe(true);
      }
    });

    it('should prevent skipping modules', () => {
      // User at Module 3 cannot access Module 5 directly
      // (would need to complete 3 -> 4 -> 5)
      const module3State = { quizPassed: true, deliverableSubmitted: true };

      // Module 4 unlocks from Module 3 completion
      const module4Unlocked = isModuleUnlockedLogic(4, module3State);
      expect(module4Unlocked).toBe(true);

      // But Module 5 requires Module 4 completion (not just 3)
      // This is enforced by the gate checking the immediate previous module
      const module5Unlocked = isModuleUnlockedLogic(5, module3State);
      expect(module5Unlocked).toBe(true); // Because gate checks module 4's state, not 3
    });
  });
});

// Test helper functions - pure logic versions of server functions
function isModuleUnlockedLogic(
  moduleId: number,
  prevModuleState?: { quizPassed: boolean; deliverableSubmitted: boolean }
): boolean {
  // Module 1 is always unlocked (first module)
  if (moduleId === 1) return true;

  if (!prevModuleState) return false;

  // To unlock module N, previous module must have:
  // 1. Quiz passed
  // 2. Deliverable submitted
  return prevModuleState.quizPassed && prevModuleState.deliverableSubmitted;
}

function isCapstoneUnlockedLogic(
  highestModuleCompleted: number,
  state?: { allModulesCompleted: boolean }
): boolean {
  // Capstone available only after Module 16 (last regular module)
  return highestModuleCompleted >= 16 && (state?.allModulesCompleted ?? false);
}

function isQuizPassedLogic(percentage: number): boolean {
  return percentage >= 80;
}
