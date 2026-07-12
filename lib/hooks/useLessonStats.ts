'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface LessonStats {
  xp: number;
  level: number;
  streakCurrent: number;
  streakLongest: number;
  badgesCount: number;
  loading: boolean;
}

export function useLessonStats(user: User | null): LessonStats {
  const [stats, setStats] = useState<LessonStats>({
    xp: 0,
    level: 0,
    streakCurrent: 0,
    streakLongest: 0,
    badgesCount: 0,
    loading: true,
  });

  useEffect(() => {
    async function fetchStats() {
      if (!user) {
        setStats((prev) => ({
          ...prev,
          loading: false,
        }));
        return;
      }

      try {
        const supabase = createClient();

        // Fetch XP and level
        const { data: xpData } = await supabase
          .from('xp')
          .select('points, level')
          .eq('user_id', user.id)
          .single();

        // Fetch streaks
        const { data: streakData } = await supabase
          .from('streaks')
          .select('current, longest')
          .eq('user_id', user.id)
          .single();

        // Fetch badges count
        const { data: badgesData, count: badgesCount } = await supabase
          .from('badges')
          .select('id', { count: 'exact' })
          .eq('user_id', user.id);

        setStats({
          xp: xpData?.points || 0,
          level: xpData?.level || 1,
          streakCurrent: streakData?.current || 0,
          streakLongest: streakData?.longest || 0,
          badgesCount: badgesCount || 0,
          loading: false,
        });
      } catch (error) {
        console.error('Failed to fetch lesson stats:', error);
        setStats((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    }

    fetchStats();
  }, [user?.id]);

  return stats;
}
