import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserXP, getUserBadges, getUserStreak } from "@/lib/actions/gamification";
import { getAllModuleProgress } from "@/lib/actions/course";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const [xp, badges, streak, progress] = await Promise.all([
    getUserXP(),
    getUserBadges(),
    getUserStreak(),
    getAllModuleProgress(),
  ]);

  const nextLevelXP = (xp.level + 1) * 1000;
  const progressPercent = Math.round((xp.points / nextLevelXP) * 100);
  const completedModules = progress.filter((p) => p.status === "completed").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400">Welcome back, {user.user_metadata?.name || user.email}! 👋</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Level Card */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">Level</div>
            <div className="text-4xl font-bold text-blue-400">{xp.level}</div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-slate-400 mb-2">
                <span>{xp.points} XP</span>
                <span>{nextLevelXP} XP</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">🔥 Streak</div>
            <div className="text-4xl font-bold text-orange-400">{streak.current}</div>
            <div className="text-xs text-slate-400 mt-2">Best: {streak.longest}</div>
          </div>

          {/* Modules Card */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">Modules</div>
            <div className="text-4xl font-bold text-green-400">
              {completedModules}<span className="text-slate-400">/16</span>
            </div>
          </div>

          {/* Badges Card */}
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">🏆 Badges</div>
            <div className="text-4xl font-bold text-purple-400">{badges.length}</div>
          </div>
        </div>

        {/* Badges Section */}
        {badges.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Your Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <div key={badge.id} className="bg-slate-800 rounded-lg p-6 border border-slate-700 text-center">
                  <div className="text-4xl mb-3">{getBadgeEmoji(badge.badge_id)}</div>
                  <h3 className="font-bold text-white mb-2">{getBadgeName(badge.badge_id)}</h3>
                  <p className="text-sm text-slate-400">{getBadgeDescription(badge.badge_id)}</p>
                  <p className="text-xs text-slate-500 mt-3">
                    Earned {new Date(badge.earned_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/course"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 rounded-lg transition text-center"
            >
              Continue Learning →
            </Link>
            <Link
              href="/settings"
              className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-4 px-6 rounded-lg transition text-center"
            >
              Settings ⚙️
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function getBadgeEmoji(badgeId: string): string {
  const emojis: Record<string, string> = {
    first_quiz_passed: "🎯",
    five_modules_complete: "⭐",
    all_modules_complete: "👑",
    perfect_quiz: "💯",
    streak_7: "🔥",
    streak_30: "🌟",
  };
  return emojis[badgeId] || "🏆";
}

function getBadgeName(badgeId: string): string {
  const names: Record<string, string> = {
    first_quiz_passed: "Quiz Master",
    five_modules_complete: "Dedicated Learner",
    all_modules_complete: "Course Champion",
    perfect_quiz: "Perfect Score",
    streak_7: "Week Warrior",
    streak_30: "Consistency King",
  };
  return names[badgeId] || "Achievement";
}

function getBadgeDescription(badgeId: string): string {
  const descriptions: Record<string, string> = {
    first_quiz_passed: "Passed your first quiz",
    five_modules_complete: "Completed 5 modules",
    all_modules_complete: "Completed entire course",
    perfect_quiz: "Scored 100% on a quiz",
    streak_7: "7-day learning streak",
    streak_30: "30-day learning streak",
  };
  return descriptions[badgeId] || "Special achievement";
}
