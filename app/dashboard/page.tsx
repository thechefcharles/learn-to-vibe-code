import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserXP, getUserBadges, getUserStreak } from "@/lib/actions/gamification";
import { getAllModuleProgress, getUserEnrolledVersion } from "@/lib/actions/course";
import { signOutAction } from "@/lib/actions/auth";
import { AnimatedDashboard } from "@/components/AnimatedDashboard";
import { DashboardHeader } from "@/components/DashboardHeader";
import { DashboardBackground } from "@/components/DashboardBackground";
import { Footer } from "@/components/Footer";

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const [xp, badges, streak, progress, version] = await Promise.all([
    getUserXP(),
    getUserBadges(),
    getUserStreak(),
    getAllModuleProgress(),
    getUserEnrolledVersion(),
  ]);

  const nextLevelXP = (xp.level + 1) * 1000;
  const completedModules = progress.filter((p) => p.status === "completed").length;
  const capstoneUnlocked = completedModules >= 15;

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
    capstoneUnlocked,
    version,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardBackground />
      <DashboardHeader onSignOut={signOutAction} />
      <div className="max-w-6xl mx-auto w-full flex-1">
        <AnimatedDashboard data={dashboardData} />
      </div>
      <Footer />
    </div>
  );
}
