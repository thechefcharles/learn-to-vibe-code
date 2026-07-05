// Pure logic functions for gamification calculations
// These are testable without server dependencies

export interface XPCalculation {
  totalPoints: number;
  newLevel: number;
}

export interface StreakCalculation {
  newCurrent: number;
  newLongest: number;
  badgesEarned: string[];
}

/**
 * Calculate new XP and level from points
 * Level formula: floor(points / 1000) + 1
 */
export function calculateXP(currentPoints: number, pointsToAdd: number): XPCalculation {
  const totalPoints = currentPoints + pointsToAdd;
  const newLevel = Math.floor(totalPoints / 1000) + 1;

  return {
    totalPoints,
    newLevel,
  };
}

/**
 * Calculate level names based on numeric level
 */
export function getLevelName(level: number): string {
  // Level progression: 1-4 Foundations, 5-8 Building, 9-12 Production, 13+ Landscape
  if (level >= 13) return 'Landscape';
  if (level >= 9) return 'Production';
  if (level >= 5) return 'Building';
  return 'Foundations';
}

/**
 * Calculate new streak and milestone badges
 */
export function calculateStreak(
  currentStreak: number,
  longestStreak: number,
  increment: boolean = true
): StreakCalculation {
  const newCurrent = increment ? currentStreak + 1 : 0;
  const newLongest = Math.max(longestStreak, newCurrent);
  const badgesEarned: string[] = [];

  // Check for milestone badges
  if (newCurrent === 7) badgesEarned.push('streak_7');
  if (newCurrent === 30) badgesEarned.push('streak_30');

  return {
    newCurrent,
    newLongest,
    badgesEarned,
  };
}

/**
 * Determine XP reward for quiz result
 */
export function getQuizReward(passed: boolean, score: number): number {
  if (!passed) return 0;
  return score === 100 ? 150 : 100; // Bonus for perfect score
}

/**
 * Check which badges should be awarded for level/points milestone
 */
export function getBadgesMilestones(
  newLevel: number,
  totalPoints: number
): string[] {
  const badges: string[] = [];

  if (newLevel >= 5) badges.push('five_modules_complete');
  if (newLevel >= 16) badges.push('all_modules_complete');

  return badges;
}

/**
 * Calculate progress to next level
 */
export function getLevelProgress(points: number): {
  currentLevel: number;
  pointsInLevel: number;
  pointsNeededForNext: number;
  progressPercent: number;
} {
  const currentLevel = Math.floor(points / 1000) + 1;
  const pointsForCurrentLevel = (currentLevel - 1) * 1000;
  const pointsInLevel = points - pointsForCurrentLevel;
  const pointsNeededForNext = 1000;
  const progressPercent = Math.round((pointsInLevel / pointsNeededForNext) * 100);

  return {
    currentLevel,
    pointsInLevel,
    pointsNeededForNext,
    progressPercent,
  };
}
