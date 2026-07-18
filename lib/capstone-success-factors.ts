/**
 * Capstone Success Factor Analysis
 *
 * Analyzes which module performance best predicts capstone success.
 * Identifies bottleneck modules where learners struggle most and need content improvements.
 *
 * Powers the post-launch analytics dashboard and curriculum iteration recommendations.
 * Requires read access to: capstone_submissions, quiz_attempts, deliverables, module_progress, profiles
 */

import { createClient as createServiceClient } from '@supabase/supabase-js';
import type { CapstoneSubmission, QuizAttempt, Deliverable } from '@/lib/types/database';

/**
 * Type definitions for capstone success factor analysis
 */
export interface CapstoneSuccessFactor {
  moduleId: number;
  moduleName: string;
  quizPassRate: number; // percentage 0-100
  deliverableApprovalRate: number; // percentage 0-100
  capstonePassRateForCompleters: number; // percentage 0-100 for learners who completed this module
  pearsonCorrelation: number; // -1 to 1, strength of prediction
  sampleSize: number; // number of learners with capstone outcome + module data
}

export interface CapstoneSuccessInsights {
  strongCorrelations: CapstoneSuccessFactor[]; // correlation > 0.7
  weakCorrelations: CapstoneSuccessFactor[]; // correlation < 0.3
  lowestPassRateModules: CapstoneSuccessFactor[]; // bottom 3 modules by pass rate
}

/**
 * Module display names for reporting
 */
const MODULE_NAMES: Record<number, string> = {
  0: 'Module 0: Setup & Onboarding',
  1: 'Module 1: AI Foundations',
  2: 'Module 2: Claude & Cursor',
  3: 'Module 3: JavaScript Essentials',
  4: 'Module 4: React Fundamentals',
  5: 'Module 5: Full-Stack Setup',
  6: 'Module 6: Design & UX',
  7: 'Module 7: Database Design',
  8: 'Module 8: Authentication',
  9: 'Module 9: API Integration',
  10: 'Module 10: Testing & QA',
  11: 'Module 11: DevOps Basics',
  12: 'Module 12: Production Ready',
  13: 'Module 13: Security Hardening',
  14: 'Module 14: Performance',
  15: 'Module 15: Tooling Landscape',
};

/**
 * Initialize Supabase service client for analytics queries
 * Uses service role key to bypass RLS (analysis queries need cross-user access)
 */
function getAnalyticsClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase configuration for capstone success factor analysis');
  }

  return createServiceClient(url, key);
}

/**
 * Calculate Pearson correlation coefficient
 * Measures linear relationship between two variables (-1 to 1)
 *
 * @param x Array of numeric values (module performance: 0 or 1)
 * @param y Array of numeric values (capstone outcome: 0 or 1)
 * @returns Pearson correlation coefficient (-1 to 1)
 */
function calculatePearsonCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length === 0) {
    return 0;
  }

  const n = x.length;

  // Calculate means
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;

  // Calculate covariance and standard deviations
  let covariance = 0;
  let sumSqX = 0;
  let sumSqY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    covariance += dx * dy;
    sumSqX += dx * dx;
    sumSqY += dy * dy;
  }

  const stdX = Math.sqrt(sumSqX);
  const stdY = Math.sqrt(sumSqY);

  // Handle edge cases (no variance)
  if (stdX === 0 || stdY === 0) {
    return 0;
  }

  // Return Pearson correlation
  return covariance / (stdX * stdY);
}

/**
 * analyzeCapstoneSuccessFactors: Analyze which module performance predicts capstone success
 *
 * For each module (0-15):
 * - Calculates quiz pass rate
 * - Calculates deliverable approval rate
 * - Calculates capstone pass rate for learners who completed this module
 * - Computes Pearson correlation between module performance and capstone outcome
 *
 * @returns Array of CapstoneSuccessFactor sorted by correlation (strongest first)
 * @throws Error if database query fails
 */
export async function analyzeCapstoneSuccessFactors(): Promise<CapstoneSuccessFactor[]> {
  try {
    const supabase = getAnalyticsClient();

    // Fetch all capstone submissions with outcomes
    const { data: capstoneSubs, error: capstoneError } = await supabase
      .from('capstone_submissions')
      .select('user_id, result')
      .in('result', ['pass', 'fail']);

    if (capstoneError) throw capstoneError;

    if (!capstoneSubs || capstoneSubs.length === 0) {
      // Return empty analysis if no capstone data
      return Array.from({ length: 16 }, (_, i) => ({
        moduleId: i,
        moduleName: MODULE_NAMES[i] || `Module ${i}`,
        quizPassRate: 0,
        deliverableApprovalRate: 0,
        capstonePassRateForCompleters: 0,
        pearsonCorrelation: 0,
        sampleSize: 0,
      }));
    }

    // Map learner IDs to capstone outcomes (1 = pass, 0 = fail)
    const capstoneOutcomes = new Map<string, number>();
    capstoneSubs.forEach((sub) => {
      capstoneOutcomes.set(sub.user_id, sub.result === 'pass' ? 1 : 0);
    });

    // Fetch all quiz attempts
    const { data: quizAttempts, error: quizError } = await supabase
      .from('quiz_attempts')
      .select('user_id, module_id, passed');

    if (quizError) throw quizError;

    // Fetch all deliverables
    const { data: deliverables, error: delivError } = await supabase
      .from('deliverables')
      .select('user_id, module_id, status');

    if (delivError) throw delivError;

    // Fetch all module progress records
    const { data: moduleProgress, error: progError } = await supabase
      .from('module_progress')
      .select('user_id, module_id, status');

    if (progError) throw progError;

    // Prepare results array
    const results: CapstoneSuccessFactor[] = [];

    // Analyze each module (0-15)
    for (let moduleId = 0; moduleId < 16; moduleId++) {
      // Filter data for this module and learners with capstone outcomes
      const moduleCapstoneUsers = Array.from(capstoneOutcomes.keys());

      const moduleQuizzes = (quizAttempts || [])
        .filter((q) => q.module_id === moduleId && moduleCapstoneUsers.includes(q.user_id));

      const moduleDeliverables = (deliverables || [])
        .filter((d) => d.module_id === moduleId && moduleCapstoneUsers.includes(d.user_id));

      const moduleCompletions = (moduleProgress || [])
        .filter((p) => p.module_id === moduleId && moduleCapstoneUsers.includes(p.user_id));

      // Calculate quiz pass rate
      let quizPassRate = 0;
      if (moduleQuizzes.length > 0) {
        const passedQuizzes = moduleQuizzes.filter((q) => q.passed).length;
        quizPassRate = (passedQuizzes / moduleQuizzes.length) * 100;
      }

      // Calculate deliverable approval rate
      let deliverableApprovalRate = 0;
      if (moduleDeliverables.length > 0) {
        const approvedDeliverables = moduleDeliverables.filter((d) => d.status === 'approved').length;
        deliverableApprovalRate = (approvedDeliverables / moduleDeliverables.length) * 100;
      }

      // Get unique users who completed this module and have capstone outcomes
      const completedUsers = new Set(
        moduleCompletions
          .filter((p) => p.status === 'completed' && moduleCapstoneUsers.includes(p.user_id))
          .map((p) => p.user_id)
      );

      // Calculate capstone pass rate for learners who completed this module
      let capstonePassRateForCompleters = 0;
      if (completedUsers.size > 0) {
        const passedCount = Array.from(completedUsers).filter(
          (userId) => capstoneOutcomes.get(userId) === 1
        ).length;
        capstonePassRateForCompleters = (passedCount / completedUsers.size) * 100;
      }

      // Calculate Pearson correlation between module performance and capstone outcome
      // For each user with capstone outcome:
      // - X = module performance (1 if quiz passed AND deliverable approved, 0 otherwise)
      // - Y = capstone outcome (1 if pass, 0 if fail)
      const correlationX: number[] = [];
      const correlationY: number[] = [];

      moduleCapstoneUsers.forEach((userId) => {
        // Check if user passed quiz in this module
        const quizPassed = moduleQuizzes.some((q) => q.user_id === userId && q.passed);

        // Check if user got deliverable approved in this module
        const delivApproved = moduleDeliverables.some((d) => d.user_id === userId && d.status === 'approved');

        // Module performance = 1 if both passed (or if only one exists and is positive)
        const modulePerformance = (quizPassed && delivApproved) ? 1 : 0;

        // Capstone outcome = 1 if pass, 0 if fail
        const capstoneOutcome = capstoneOutcomes.get(userId) || 0;

        // Only include in correlation if we have both data points
        if (quizPassed || delivApproved) {
          correlationX.push(modulePerformance);
          correlationY.push(capstoneOutcome);
        }
      });

      // Calculate Pearson correlation
      const pearsonCorrelation = correlationX.length > 1
        ? calculatePearsonCorrelation(correlationX, correlationY)
        : 0;

      results.push({
        moduleId,
        moduleName: MODULE_NAMES[moduleId] || `Module ${moduleId}`,
        quizPassRate: Math.round(quizPassRate * 100) / 100,
        deliverableApprovalRate: Math.round(deliverableApprovalRate * 100) / 100,
        capstonePassRateForCompleters: Math.round(capstonePassRateForCompleters * 100) / 100,
        pearsonCorrelation: Math.round(pearsonCorrelation * 10000) / 10000,
        sampleSize: correlationX.length,
      });
    }

    // Sort by correlation (strongest predictors first)
    results.sort((a, b) => Math.abs(b.pearsonCorrelation) - Math.abs(a.pearsonCorrelation));

    return results;
  } catch (error) {
    console.error('Error in analyzeCapstoneSuccessFactors:', error);
    throw error;
  }
}

/**
 * identifyAtRiskModules: Identify modules with low pass rates needing content review
 *
 * Returns module IDs where the combined pass rate (quiz + deliverable) falls below threshold.
 * Flags modules as bottlenecks for curriculum iteration.
 *
 * @param passRateThreshold Minimum pass rate threshold (default 0.6 = 60%)
 * @returns Array of module IDs with pass rate below threshold, sorted by pass rate (lowest first)
 */
export async function identifyAtRiskModules(passRateThreshold: number = 0.6): Promise<number[]> {
  try {
    const factors = await analyzeCapstoneSuccessFactors();

    // Calculate combined pass rate for each module (average of quiz and deliverable rates)
    const atRisk = factors
      .map((factor) => ({
        moduleId: factor.moduleId,
        combinedPassRate: (factor.quizPassRate + factor.deliverableApprovalRate) / 2 / 100,
      }))
      .filter((item) => item.combinedPassRate < passRateThreshold)
      .sort((a, b) => a.combinedPassRate - b.combinedPassRate)
      .map((item) => item.moduleId);

    return atRisk;
  } catch (error) {
    console.error('Error in identifyAtRiskModules:', error);
    throw error;
  }
}

/**
 * getCapstoneSuccessInsights: Grouped insights for dashboard consumption
 *
 * Returns:
 * - Strong correlations: modules where performance strongly predicts capstone success (>0.7)
 * - Weak correlations: modules where performance doesn't predict outcome (<0.3)
 * - Lowest pass rate: top 3 bottleneck modules
 *
 * @returns Object with three categories of insights
 */
export async function getCapstoneSuccessInsights(): Promise<CapstoneSuccessInsights> {
  try {
    const factors = await analyzeCapstoneSuccessFactors();

    // Strong correlations: modules that predict capstone success well
    const strongCorrelations = factors
      .filter((f) => Math.abs(f.pearsonCorrelation) > 0.7)
      .slice(0, 5); // Top 5

    // Weak correlations: modules that don't predict outcome
    const weakCorrelations = factors
      .filter((f) => Math.abs(f.pearsonCorrelation) < 0.3)
      .slice(0, 5); // Top 5

    // Lowest pass rate modules: bottlenecks for curriculum
    const lowestPassRateModules = factors
      .map((f) => ({
        ...f,
        combinedPassRate: (f.quizPassRate + f.deliverableApprovalRate) / 2,
      }))
      .sort((a, b) => a.combinedPassRate - b.combinedPassRate)
      .slice(0, 3)
      .map(({ combinedPassRate, ...f }) => f);

    return {
      strongCorrelations,
      weakCorrelations,
      lowestPassRateModules,
    };
  } catch (error) {
    console.error('Error in getCapstoneSuccessInsights:', error);
    throw error;
  }
}
