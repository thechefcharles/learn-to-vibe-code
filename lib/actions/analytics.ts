'use server';

import { createClient } from '@/lib/supabase/server';
import { getUser } from '@/lib/auth';

export interface AnalyticsEvent {
  event_type: 'page_view' | 'quiz_attempt' | 'quiz_answer' | 'lesson_jump' | 'module_select' | 'module_complete' | 'deliverable_submit' | 'session_start' | 'bookmark' | 'share' | 'time_tracked';
  module_id?: number;
  lesson_id?: number;
  data?: Record<string, any>;
}

export async function logEvent(event: AnalyticsEvent) {
  try {
    const user = await getUser();
    if (!user) return;

    const supabase = await createClient();

    await supabase.from('analytics_events').insert({
      user_id: user.id,
      event_type: event.event_type,
      module_id: event.module_id,
      lesson_id: event.lesson_id,
      data: event.data || {},
      created_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Failed to log event:', error);
  }
}

export async function getAnalyticsSummary() {
  try {
    const supabase = await createClient();

    // Total users
    const { count: totalUsers } = await supabase
      .from('analytics_events')
      .select('user_id', { count: 'exact', head: true })
      .then(res => ({ count: res.data?.length || 0 }));

    // Total events
    const { count: totalEvents } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true });

    // Most visited modules
    const { data: topModules } = await supabase
      .from('analytics_events')
      .select('module_id')
      .eq('event_type', 'page_view')
      .not('module_id', 'is', null);

    const moduleViews = new Map<number, number>();
    topModules?.forEach(evt => {
      if (evt.module_id) {
        moduleViews.set(evt.module_id, (moduleViews.get(evt.module_id) || 0) + 1);
      }
    });

    const topModulesArray = Array.from(moduleViews.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([moduleId, views]) => ({ moduleId, views }));

    // Quiz attempt patterns
    const { data: quizAttempts } = await supabase
      .from('analytics_events')
      .select('module_id, data')
      .eq('event_type', 'quiz_attempt');

    const quizStats = new Map<number, { attempts: number; correct: number }>();
    quizAttempts?.forEach(evt => {
      if (evt.module_id) {
        const current = quizStats.get(evt.module_id) || { attempts: 0, correct: 0 };
        current.attempts += 1;
        if (evt.data?.correct) current.correct += 1;
        quizStats.set(evt.module_id, current);
      }
    });

    // Most skipped lessons
    const { data: lessonJumps } = await supabase
      .from('analytics_events')
      .select('data')
      .eq('event_type', 'lesson_jump');

    const skipPatterns = new Map<string, number>();
    lessonJumps?.forEach(evt => {
      const key = `${evt.data?.from || '?'} -> ${evt.data?.to || '?'}`;
      skipPatterns.set(key, (skipPatterns.get(key) || 0) + 1);
    });

    const topSkips = Array.from(skipPatterns.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Completion rates
    const { data: completions } = await supabase
      .from('analytics_events')
      .select('module_id')
      .eq('event_type', 'module_complete');

    const completionsByModule = new Map<number, number>();
    completions?.forEach(evt => {
      if (evt.module_id) {
        completionsByModule.set(evt.module_id, (completionsByModule.get(evt.module_id) || 0) + 1);
      }
    });

    return {
      summary: {
        totalUsers,
        totalEvents: totalEvents || 0,
      },
      topModules: topModulesArray,
      quizStats: Object.fromEntries(quizStats),
      topSkips,
      completions: Object.fromEntries(completionsByModule),
    };
  } catch (error) {
    console.error('Failed to get analytics summary:', error);
    return null;
  }
}
