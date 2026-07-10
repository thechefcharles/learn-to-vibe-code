import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserXP, getUserBadges, getUserStreak } from "@/lib/actions/gamification";
import { getAllModuleProgress, getUserEnrolledVersion } from "@/lib/actions/course";
import { signOutAction } from "@/lib/actions/auth";
import { ProfileHeroCard } from "@/components/dashboard/ProfileHeroCard";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { CourseProgress } from "@/components/dashboard/CourseProgress";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { BadgesShowcase } from "@/components/dashboard/BadgesShowcase";
import { DashboardBackground } from "@/components/dashboard/DashboardBackground";
import { Header } from "@/components/kids-landing/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

const BADGE_METADATA = [
  { key: "first_quiz_passed", name: "First Steps", description: "Passed your first quiz", icon: "🎯" },
  { key: "rls_locked_down", name: "Security Pro", description: "Mastered RLS", icon: "🔐" },
  { key: "went_live", name: "Live!", description: "Deployed to production", icon: "🚀" },
  { key: "automation_engineer", name: "Automation Master", description: "Built with automation", icon: "⚡" },
  { key: "capstone_submitted", name: "Capstone Complete", description: "Submitted capstone project", icon: "🏆" },
];

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

  const completedModules = progress.filter((p) => p.status === "completed").length;
  const capstoneUnlocked = completedModules >= 15;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <DashboardBackground />
      <Header />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Profile Hero */}
        <section className="mb-8">
          <ProfileHeroCard
            userName={user.user_metadata?.name || user.email || "Learner"}
            xpLevel={xp.level}
            xpPoints={xp.points}
            streakCurrent={streak.current}
            streakLongest={streak.longest}
          />
        </section>

        {/* Stats Grid */}
        <section className="mb-8">
          <StatsGrid
            completedModules={completedModules}
            totalModules={16}
            badgeCount={badges.length}
            xpLevel={xp.level}
            capstoneUnlocked={capstoneUnlocked}
          />
        </section>

        {/* Two Column Layout: Progress + Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left: Course Progress (65%) */}
          <div className="lg:col-span-2">
            <CourseProgress progress={progress} totalModules={16} />
          </div>

          {/* Right: Quick Actions (35%) */}
          <div className="lg:col-span-1">
            <QuickActions capstoneUnlocked={capstoneUnlocked} completedModules={completedModules} />
          </div>
        </div>

        {/* Badges Showcase */}
        <section className="mb-8">
          <BadgesShowcase badges={badges} allBadges={BADGE_METADATA} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
