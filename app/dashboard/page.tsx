import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserXP, getUserBadges, getUserStreak } from "@/lib/actions/gamification";
import { getAllModuleProgress, getUserEnrolledVersion } from "@/lib/actions/course";
import { CourseProgress } from "@/components/dashboard/CourseProgress";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { BadgesShowcase } from "@/components/dashboard/BadgesShowcase";
import { DashboardBackground } from "@/components/dashboard/DashboardBackground";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
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

  // Find first incomplete module or default to first module
  const nextModule = progress.find((p) => p.status !== "completed");
  const continueHref = nextModule ? `/course/${String(nextModule.module_id).padStart(2, "0")}` : "/course/00";

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardBackground />
      <DashboardHeader userName={user.user_metadata?.name || user.email || "Learner"} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Version Indicator */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white mb-2">Enrolled in:</h2>
            <div className="inline-block px-4 py-2 rounded-lg font-semibold text-white bg-slate-900/90 border border-cyan-500/30">
              {version === "kids" ? "🚀 Beginner Course (Kids)" : "💻 Advanced Course (Professional)"}
            </div>
          </div>
        </div>

        {/* Continue Learning CTA */}
        <section className="mb-8">
          <Link href={continueHref} className="block group">
            <div
              className="relative bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-600 rounded-2xl p-8 sm:p-12 text-white font-bold text-2xl sm:text-3xl transition-all flex items-center justify-center gap-4 overflow-hidden"
              style={{
                boxShadow: '0 0 30px rgba(0, 217, 255, 0.4), 0 0 60px rgba(168, 85, 247, 0.2)',
              }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ animation: 'shimmer 2s infinite' }} />

              {/* Border glow effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400 opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

              {/* Content */}
              <span className="relative text-4xl group-hover:animate-bounce">▶</span>
              <span className="relative">Continue Learning</span>

              {/* Hover glow intensifier */}
              <style>{`
                @keyframes shimmer {
                  0% { transform: translateX(-100%); }
                  100% { transform: translateX(100%); }
                }
                .group:hover {
                  --tw-shadow: 0 0 40px rgba(0, 217, 255, 0.6), 0 0 80px rgba(168, 85, 247, 0.3);
                  box-shadow: var(--tw-shadow);
                }
              `}</style>
            </div>
          </Link>
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
