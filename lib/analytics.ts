/**
 * Analytics Queries Library
 *
 * Real-time monitoring metrics for the Learn to Vibe Code platform.
 * Powers the analytics dashboard and monitoring playbook.
 *
 * All queries are RLS-safe and handle empty result sets gracefully.
 * Requires read access to: enrollments, module_progress, quiz_attempts,
 * deliverables, capstone_submissions, certificates, profiles
 */

import { createClient as createServiceClient } from '@supabase/supabase-js';

/**
 * Type definitions for analytics responses
 */
export interface DailyErrorRateResult {
  errorRate: number; // percentage 0-100
  totalErrors: number;
}

export interface ActiveUsersResult {
  activeUsers: number;
}

export interface QuizPassRateResult {
  passRate: number; // percentage 0-100
  total: number;
}

export interface PendingDeliverableResult {
  pendingCount: number;
  submissions: Array<{
    user_id: string;
    module_id: number;
    repo_url: string;
    live_url: string;
    submitted_at: string;
    status: string;
  }>;
}

export interface CohortProgressResult {
  [moduleId: number]: number; // module_id -> completion count
}

export interface CompletionTrendResult {
  [date: string]: number; // YYYY-MM-DD -> daily completion count
}

export interface QuizCorrectnessByQuestionResult {
  [questionId: string]: {
    correct: number;
    total: number;
    accuracy: number; // percentage
  };
}

export interface VersionComparisonResult {
  kidsCompletion: number; // percentage
  adultCompletion: number; // percentage
  divergence: number; // absolute percentage point difference
}

export interface CapstoneSuccessRateResult {
  passRate: number; // percentage 0-100
  total: number;
}

export interface ModuleCompletionTimeResult {
  [moduleId: number]: {
    avgTimeMs: number;
    avgDays: number;
    count: number; // number of completions
  };
}

export interface CertificateIssuanceResult {
  certificatesIssued: number;
}

/**
 * Initialize Supabase service client for read-only analytics queries
 * Uses service role key to bypass RLS (analytics queries need cross-user access)
 */
function getAnalyticsClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase configuration for analytics');
  }

  return createServiceClient(url, key);
}

/**
 * DAILY METRICS
 */

/**
 * getDailyErrorRate: Track system errors and failed operations
 * Measures: Quiz attempts with 0% score, deliverable failures, failed auto-checks
 * Returns: error rate as percentage and absolute error count
 */
export async function getDailyErrorRate(days: number = 1): Promise<DailyErrorRateResult> {
  try {
    const supabase = getAnalyticsClient();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    // Count quiz attempts with 0% score (errors)
    const { data: failedQuizzes, error: quizError } = await supabase
      .from('quiz_attempts')
      .select('id', { count: 'exact' })
      .eq('score', 0)
      .gte('taken_at', startDate.toISOString());

    if (quizError) throw quizError;

    // Count deliverables with failed auto-checks or error status
    const { data: failedDeliverables, error: delivError } = await supabase
      .from('deliverables')
      .select('id', { count: 'exact' })
      .in('status', ['error', 'failed'])
      .gte('submitted_at', startDate.toISOString());

    if (delivError) throw delivError;

    const totalErrors = (failedQuizzes?.length || 0) + (failedDeliverables?.length || 0);

    // Count total quiz attempts and submissions
    const { count: totalAttempts } = await supabase
      .from('quiz_attempts')
      .select('id', { count: 'exact', head: true })
      .gte('taken_at', startDate.toISOString());

    const { count: totalSubmissions } = await supabase
      .from('deliverables')
      .select('id', { count: 'exact', head: true })
      .gte('submitted_at', startDate.toISOString());

    const totalOperations = (totalAttempts || 0) + (totalSubmissions || 0);
    const errorRate = totalOperations > 0 ? (totalErrors / totalOperations) * 100 : 0;

    return {
      errorRate: Math.round(errorRate * 100) / 100,
      totalErrors,
    };
  } catch (error) {
    console.error('Error in getDailyErrorRate:', error);
    throw error;
  }
}

/**
 * getActiveUsersToday: Count users with activity in the last 24 hours
 * Measures: Unique users who took quizzes, submitted deliverables, or viewed course content
 * Returns: number of active users
 */
export async function getActiveUsersToday(): Promise<ActiveUsersResult> {
  try {
    const supabase = getAnalyticsClient();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    startDate.setHours(0, 0, 0, 0);

    // Get distinct users from quiz attempts
    const { data: quizUsers } = await supabase
      .from('quiz_attempts')
      .select('user_id')
      .gte('taken_at', startDate.toISOString());

    // Get distinct users from deliverable submissions
    const { data: delivUsers } = await supabase
      .from('deliverables')
      .select('user_id')
      .gte('submitted_at', startDate.toISOString());

    // Get distinct users from module progress (completing modules)
    const { data: progressUsers } = await supabase
      .from('module_progress')
      .select('user_id')
      .eq('status', 'completed')
      .gte('completed_at', startDate.toISOString());

    // Merge and deduplicate
    const activeUserIds = new Set<string>();
    quizUsers?.forEach((u) => activeUserIds.add(u.user_id));
    delivUsers?.forEach((u) => activeUserIds.add(u.user_id));
    progressUsers?.forEach((u) => activeUserIds.add(u.user_id));

    return {
      activeUsers: activeUserIds.size,
    };
  } catch (error) {
    console.error('Error in getActiveUsersToday:', error);
    throw error;
  }
}

/**
 * getTodayQuizPassRate: Measure quiz performance for today
 * Measures: Quiz pass rate (score >= 80%) for attempts taken today
 * Returns: pass rate as percentage and total attempts
 */
export async function getTodayQuizPassRate(): Promise<QuizPassRateResult> {
  try {
    const supabase = getAnalyticsClient();
    const startDate = new Date();
    startDate.setDate(startDate.getDate());
    startDate.setHours(0, 0, 0, 0);

    // Get all quiz attempts today
    const { data: attempts, error } = await supabase
      .from('quiz_attempts')
      .select('score')
      .gte('taken_at', startDate.toISOString());

    if (error) throw error;

    const total = attempts?.length || 0;
    if (total === 0) {
      return { passRate: 0, total: 0 };
    }

    const passed = attempts?.filter((a) => a.score >= 80).length || 0;
    const passRate = (passed / total) * 100;

    return {
      passRate: Math.round(passRate * 100) / 100,
      total,
    };
  } catch (error) {
    console.error('Error in getTodayQuizPassRate:', error);
    throw error;
  }
}

/**
 * getPendingDeliverables: Track submissions awaiting review
 * Measures: Count and details of deliverables not yet approved
 * Returns: pending count and submission details (user, module, URLs, dates)
 */
export async function getPendingDeliverables(): Promise<PendingDeliverableResult> {
  try {
    const supabase = getAnalyticsClient();

    const { data: submissions, error } = await supabase
      .from('deliverables')
      .select(
        'user_id, module_id, repo_url, live_url, submitted_at, status'
      )
      .neq('status', 'approved')
      .neq('status', 'rejected')
      .order('submitted_at', { ascending: true });

    if (error) throw error;

    return {
      pendingCount: submissions?.length || 0,
      submissions: submissions || [],
    };
  } catch (error) {
    console.error('Error in getPendingDeliverables:', error);
    throw error;
  }
}

/**
 * WEEKLY METRICS
 */

/**
 * getCohortProgress: Track module completion across all learners
 * Measures: How many users have completed each module
 * Returns: object mapping moduleId -> completion count
 */
export async function getCohortProgress(): Promise<CohortProgressResult> {
  try {
    const supabase = getAnalyticsClient();

    const { data: completions, error } = await supabase
      .from('module_progress')
      .select('module_id')
      .eq('status', 'completed');

    if (error) throw error;

    const progress: CohortProgressResult = {};

    completions?.forEach((record) => {
      const moduleId = record.module_id;
      progress[moduleId] = (progress[moduleId] || 0) + 1;
    });

    return progress;
  } catch (error) {
    console.error('Error in getCohortProgress:', error);
    throw error;
  }
}

/**
 * getCompletionTrend: Track daily module completions over time
 * Measures: How many modules were completed each day over the past N days
 * Returns: object mapping YYYY-MM-DD -> completion count
 */
export async function getCompletionTrend(days: number = 7): Promise<CompletionTrendResult> {
  try {
    const supabase = getAnalyticsClient();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    startDate.setHours(0, 0, 0, 0);

    const { data: completions, error } = await supabase
      .from('module_progress')
      .select('completed_at')
      .eq('status', 'completed')
      .gte('completed_at', startDate.toISOString());

    if (error) throw error;

    const trend: CompletionTrendResult = {};

    completions?.forEach((record) => {
      if (record.completed_at) {
        const date = new Date(record.completed_at).toISOString().split('T')[0];
        trend[date] = (trend[date] || 0) + 1;
      }
    });

    return trend;
  } catch (error) {
    console.error('Error in getCompletionTrend:', error);
    throw error;
  }
}

/**
 * getQuizCorrectnessByQuestion: Analyze per-question performance
 * Measures: For each quiz question, track correct vs total attempts
 * Returns: object mapping questionId -> {correct, total, accuracy}
 * Note: Requires quiz answer data to be available in quiz_attempts table
 */
export async function getQuizCorrectnessByQuestion(): Promise<QuizCorrectnessByQuestionResult> {
  try {
    const supabase = getAnalyticsClient();

    // Fetch all quiz attempts with question-level data (if available)
    // This assumes quiz_attempts has a jsonb 'answers' or 'question_scores' field
    const { data: attempts, error } = await supabase
      .from('quiz_attempts')
      .select('id, data')
      .not('data', 'is', null);

    if (error) throw error;

    const result: QuizCorrectnessByQuestionResult = {};

    attempts?.forEach((attempt) => {
      // Parse question results from data field (structure depends on quiz implementation)
      if (attempt.data && typeof attempt.data === 'object') {
        const questionScores = attempt.data.questionScores || attempt.data.answers || {};

        Object.entries(questionScores).forEach(([questionId, answer]: [string, any]) => {
          if (!result[questionId]) {
            result[questionId] = { correct: 0, total: 0, accuracy: 0 };
          }
          result[questionId].total += 1;

          // Check if answer was correct
          if (answer?.correct === true || answer === true) {
            result[questionId].correct += 1;
          }
        });
      }
    });

    // Calculate accuracy percentage
    Object.keys(result).forEach((questionId) => {
      const q = result[questionId];
      q.accuracy = q.total > 0 ? Math.round((q.correct / q.total) * 100 * 100) / 100 : 0;
    });

    return result;
  } catch (error) {
    console.error('Error in getQuizCorrectnessByQuestion:', error);
    throw error;
  }
}

/**
 * getVersionComparison: Compare performance between kids and adult versions
 * Measures: Module completion rates for 'kids' vs 'adult' enrolled cohorts
 * Returns: completion rates and divergence percentage
 */
export async function getVersionComparison(): Promise<VersionComparisonResult> {
  try {
    const supabase = getAnalyticsClient();

    // Get all enrollments by version
    const { data: allEnrollments, error: enrollError } = await supabase
      .from('enrollments')
      .select('user_id, enrolled_version');

    if (enrollError) throw enrollError;

    if (!allEnrollments || allEnrollments.length === 0) {
      return {
        kidsCompletion: 0,
        adultCompletion: 0,
        divergence: 0,
      };
    }

    // Separate by version
    const kidsUsers = new Set(
      allEnrollments
        .filter((e) => e.enrolled_version === 'kids')
        .map((e) => e.user_id)
    );
    const adultUsers = new Set(
      allEnrollments
        .filter((e) => e.enrolled_version === 'adult')
        .map((e) => e.user_id)
    );

    // Get completions by version
    const { data: completions, error: compError } = await supabase
      .from('module_progress')
      .select('user_id')
      .eq('status', 'completed');

    if (compError) throw compError;

    const kidsCompletions = completions?.filter((c) => kidsUsers.has(c.user_id)).length || 0;
    const adultCompletions = completions?.filter((c) => adultUsers.has(c.user_id)).length || 0;

    const kidsCompletion = kidsUsers.size > 0 ? (kidsCompletions / kidsUsers.size) * 100 : 0;
    const adultCompletion = adultUsers.size > 0 ? (adultCompletions / adultUsers.size) * 100 : 0;
    const divergence = Math.abs(kidsCompletion - adultCompletion);

    return {
      kidsCompletion: Math.round(kidsCompletion * 100) / 100,
      adultCompletion: Math.round(adultCompletion * 100) / 100,
      divergence: Math.round(divergence * 100) / 100,
    };
  } catch (error) {
    console.error('Error in getVersionComparison:', error);
    throw error;
  }
}

/**
 * MONTHLY METRICS
 */

/**
 * getCapstoneSuccessRate: Measure capstone project completion
 * Measures: Percentage of capstone submissions that passed grading
 * Returns: pass rate as percentage and total submissions
 */
export async function getCapstoneSuccessRate(): Promise<CapstoneSuccessRateResult> {
  try {
    const supabase = getAnalyticsClient();

    // Get all capstone submissions this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { data: submissions, error } = await supabase
      .from('capstone_submissions')
      .select('result')
      .gte('submitted_at', startOfMonth.toISOString());

    if (error) throw error;

    const total = submissions?.length || 0;
    if (total === 0) {
      return { passRate: 0, total: 0 };
    }

    const passed = submissions?.filter((s) => s.result === 'pass').length || 0;
    const passRate = (passed / total) * 100;

    return {
      passRate: Math.round(passRate * 100) / 100,
      total,
    };
  } catch (error) {
    console.error('Error in getCapstoneSuccessRate:', error);
    throw error;
  }
}

/**
 * getModuleCompletionTime: Measure how long it takes to complete each module
 * Measures: Average time from module unlock to completion
 * Returns: object mapping moduleId -> {avgTimeMs, avgDays, count}
 */
export async function getModuleCompletionTime(): Promise<ModuleCompletionTimeResult> {
  try {
    const supabase = getAnalyticsClient();

    // Get module completion records with completion timestamps
    const { data: completions, error } = await supabase
      .from('module_progress')
      .select('module_id, unlocked_at, completed_at')
      .eq('status', 'completed')
      .not('completed_at', 'is', null);

    if (error) throw error;

    const result: ModuleCompletionTimeResult = {};

    completions?.forEach((record) => {
      const moduleId = record.module_id;

      if (!result[moduleId]) {
        result[moduleId] = { avgTimeMs: 0, avgDays: 0, count: 0 };
      }

      // Calculate time difference if both timestamps exist
      if (record.unlocked_at && record.completed_at) {
        const unlockedTime = new Date(record.unlocked_at).getTime();
        const completedTime = new Date(record.completed_at).getTime();
        const timeMs = completedTime - unlockedTime;

        result[moduleId].count += 1;
        result[moduleId].avgTimeMs = Math.round(
          (result[moduleId].avgTimeMs * (result[moduleId].count - 1) + timeMs) /
            result[moduleId].count
        );
      }
    });

    // Calculate days from milliseconds
    Object.keys(result).forEach((moduleId) => {
      const mod = result[parseInt(moduleId)];
      mod.avgDays = Math.round((mod.avgTimeMs / (1000 * 60 * 60 * 24)) * 100) / 100;
    });

    return result;
  } catch (error) {
    console.error('Error in getModuleCompletionTime:', error);
    throw error;
  }
}

/**
 * getCertificateIssuanceThisMonth: Track credential issuance
 * Measures: Number of certificates issued in current month
 * Returns: count of certificates issued
 */
export async function getCertificateIssuanceThisMonth(): Promise<CertificateIssuanceResult> {
  try {
    const supabase = getAnalyticsClient();

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count, error } = await supabase
      .from('certificates')
      .select('id', { count: 'exact', head: true })
      .gte('issued_at', startOfMonth.toISOString());

    if (error) throw error;

    return {
      certificatesIssued: count || 0,
    };
  } catch (error) {
    console.error('Error in getCertificateIssuanceThisMonth:', error);
    throw error;
  }
}
