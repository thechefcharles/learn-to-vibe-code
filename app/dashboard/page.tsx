import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserXP, getUserBadges, getUserStreak } from "@/lib/actions/gamification";
import { getAllModuleProgress, getUserEnrolledVersion } from "@/lib/actions/course";
import { DashboardBackground } from "@/components/dashboard/DashboardBackground";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { CockpitDashboard } from "@/components/dashboard/CockpitDashboard";
import { Footer } from "@/components/Footer";

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
  const nextModule = progress.find((p) => p.status !== "completed");
  const continueHref = nextModule
    ? `/course/${String(nextModule.module_id).padStart(2, "0")}`
    : capstoneUnlocked ? "/capstone" : "/course/01";
  const currentModuleId = nextModule?.module_id || (capstoneUnlocked ? 16 : 1);

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardBackground />
      <DashboardHeader userName={user.user_metadata?.name || user.email || "Learner"} />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <CockpitDashboard
          userName={user.user_metadata?.name || user.email || "Learner"}
          xp={xp}
          badges={badges}
          streak={streak}
          progress={progress}
          version={version}
          completedModules={completedModules}
          capstoneUnlocked={capstoneUnlocked}
          continueHref={continueHref}
          currentModuleId={currentModuleId}
          badgeMetadata={BADGE_METADATA}
        />
      </main>

      <Footer />
    </div>
  );
}
