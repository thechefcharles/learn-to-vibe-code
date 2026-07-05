import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserXP, getUserBadges, getUserStreak } from "@/lib/actions/gamification";
import { getAllModuleProgress } from "@/lib/actions/course";
import { signOutAction } from "@/lib/actions/auth";
import { ProgressBar } from "@/components/ProgressBar";
import { Footer } from "@/components/Footer";

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
    <div className="min-h-screen bg-paper flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 py-12 px-4">
        {/* Header */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <h1 className="text-5xl font-bold font-display text-ink mb-2">Dashboard</h1>
            <p className="text-slate">Welcome back, {user.user_metadata?.name || user.email}! 👋</p>
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="bg-danger hover:bg-red-700 text-paper font-medium py-2 px-4 rounded-lg transition"
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Level Card */}
          <div className="bg-white rounded-lg p-6 border border-violet-light/20">
            <div className="text-slate text-sm mb-2 font-medium">Level</div>
            <div className="text-4xl font-bold font-display text-violet">{xp.level}</div>
            <div className="mt-4">
              <ProgressBar current={xp.points} max={nextLevelXP} size="sm" showPercentage={false} />
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-white rounded-lg p-6 border border-violet-light/20">
            <div className="text-slate text-sm mb-2 font-medium">🔥 Streak</div>
            <div className="text-4xl font-bold font-display text-lime">{streak.current}</div>
            <div className="text-xs text-slate mt-2">Best: {streak.longest}</div>
          </div>

          {/* Modules Card */}
          <div className="bg-white rounded-lg p-6 border border-violet-light/20">
            <div className="text-slate text-sm mb-2 font-medium">Modules</div>
            <div className="text-4xl font-bold font-display text-success">
              {completedModules}<span className="text-slate">/16</span>
            </div>
          </div>

          {/* Badges Card */}
          <div className="bg-white rounded-lg p-6 border border-violet-light/20">
            <div className="text-slate text-sm mb-2 font-medium">🏆 Badges</div>
            <div className="text-4xl font-bold font-display text-violet">{badges.length}</div>
          </div>
        </div>

        {/* Badges Section */}
        {badges.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold font-display text-ink mb-6">Your Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {badges.map((badge) => (
                <div key={badge.id} className="bg-white rounded-lg p-6 border border-violet-light/20 text-center hover:border-violet/40 transition">
                  <div className="text-4xl mb-3">{getBadgeEmoji(badge.badge_key)}</div>
                  <h3 className="font-bold font-display text-ink mb-2">{getBadgeName(badge.badge_key)}</h3>
                  <p className="text-sm text-slate">{getBadgeDescription(badge.badge_key)}</p>
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
          <h2 className="text-2xl font-bold font-display text-ink mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/course"
              className="bg-violet hover:bg-violet-light text-paper font-medium py-4 px-6 rounded-lg transition text-center"
            >
              Continue Learning →
            </Link>
            <Link
              href="/capstone"
              className="bg-indigo hover:bg-violet text-paper font-medium py-4 px-6 rounded-lg transition text-center"
            >
              🎓 Capstone Project
            </Link>
            <Link
              href="/support"
              className="border-2 border-violet text-violet hover:bg-violet/5 font-medium py-4 px-6 rounded-lg transition text-center"
            >
              Support ❤️
            </Link>
          </div>
        </div>
      </div>

      <Footer />
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
