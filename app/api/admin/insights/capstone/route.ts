import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';
import { getCapstoneSuccessInsights } from '@/lib/capstone-success-factors';

/**
 * Capstone Success Analysis API Endpoint
 *
 * Returns capstone success insights:
 * - Strong success predictors (high correlation modules)
 * - At-risk modules (low pass rates)
 * - Weak predictor modules (low correlation)
 *
 * Requires instructor role.
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
        { error: 'Only instructors can access capstone insights' },
        { status: 403 }
      );
    }

    // Get capstone success insights
    const insights = await getCapstoneSuccessInsights();

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      data: insights,
    });
  } catch (error) {
    console.error('Capstone insights API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch capstone insights data' },
      { status: 500 }
    );
  }
}
