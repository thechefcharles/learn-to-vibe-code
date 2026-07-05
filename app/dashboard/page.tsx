import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserXP, getUserBadges, getUserStreak } from "@/lib/actions/gamification";
import { getAllModuleProgress } from "@/lib/actions/course";
import { signOutAction } from "@/lib/actions/auth";
import { AnimatedDashboard } from "@/components/AnimatedDashboard";
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
  const completedModules = progress.filter((p) => p.status === "completed").length;

  const dashboardData = {
    userName: user.user_metadata?.name || user.email,
    xpLevel: xp.level,
    xpPoints: xp.points,
    nextLevelXP,
    streakCurrent: streak.current,
    streakLongest: streak.longest,
    completedModules,
    totalModules: 16,
    badgeCount: badges.length,
    badges,
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1">
        <AnimatedDashboard data={dashboardData} onSignOut={signOutAction} />
      </div>
      <Footer />
    </div>
  );
}
