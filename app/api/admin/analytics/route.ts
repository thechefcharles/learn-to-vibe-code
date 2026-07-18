import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import {
  getDailyErrorRate,
  getActiveUsersToday,
  getTodayQuizPassRate,
  getPendingDeliverables,
  getVersionComparison,
  getCapstoneSuccessRate,
} from '@/lib/analytics';

/**
 * Analytics API Endpoint
 *
 * Supports querying specific metrics via ?metric= parameter:
 * - all: all metrics
 * - error-rate: daily error rate
 * - active-users: active users today
 * - quiz-pass-rate: quiz pass rate
 * - pending-deliverables: pending submissions
 * - version-comparison: kids vs adult comparison
 * - capstone-success: capstone pass rate
 */
export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify instructor role
    const supabase = await createClient();
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'instructor') {
      return NextResponse.json(
        { error: 'Only instructors can access analytics' },
        { status: 403 }
      );
    }

    // Get metric query parameter
    const metricParam = req.nextUrl.searchParams.get('metric') || 'all';

    // Define metric queries
    const queries = {
      'error-rate': getDailyErrorRate,
      'active-users': getActiveUsersToday,
      'quiz-pass-rate': getTodayQuizPassRate,
      'pending-deliverables': getPendingDeliverables,
      'version-comparison': getVersionComparison,
      'capstone-success': getCapstoneSuccessRate,
    };

    // Build response based on metric parameter
    const response: Record<string, any> = {
      timestamp: new Date().toISOString(),
    };

    if (metricParam === 'all') {
      // Fetch all metrics in parallel
      const [errorRate, activeUsers, quizPassRate, pendingDeliverables, versionComparison, capstoneSuccess] =
        await Promise.all([
          getDailyErrorRate(),
          getActiveUsersToday(),
          getTodayQuizPassRate(),
          getPendingDeliverables(),
          getVersionComparison(),
          getCapstoneSuccessRate(),
        ]);

      response.errorRate = errorRate;
      response.activeUsers = activeUsers;
      response.quizPassRate = quizPassRate;
      response.pendingDeliverables = pendingDeliverables;
      response.versionComparison = versionComparison;
      response.capstoneSuccess = capstoneSuccess;
    } else if (metricParam in queries) {
      const query = queries[metricParam as keyof typeof queries];
      const result = await query();
      response.metric = metricParam;
      response.data = result;
    } else {
      return NextResponse.json(
        { error: `Unknown metric: ${metricParam}` },
        { status: 400 }
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
