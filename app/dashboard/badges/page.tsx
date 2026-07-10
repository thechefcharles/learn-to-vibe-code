import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserBadges } from "@/lib/actions/gamification";
import { BadgesGrid } from "@/components/dashboard/BadgesGrid";
import { Header } from "@/components/kids-landing/Header";
import { Footer } from "@/components/Footer";
import { DashboardBackground } from "@/components/dashboard/DashboardBackground";
import Link from "next/link";

const BADGE_METADATA = [
  { key: "first_quiz_passed", name: "First Steps", description: "Passed your first quiz", icon: "🎯" },
  { key: "rls_locked_down", name: "Security Pro", description: "Mastered RLS security", icon: "🔐" },
  { key: "went_live", name: "Live!", description: "Deployed to production", icon: "🚀" },
  { key: "automation_engineer", name: "Automation Master", description: "Built with automation", icon: "⚡" },
  { key: "capstone_submitted", name: "Capstone Complete", description: "Submitted capstone project", icon: "🏆" },
];

export default async function BadgesPage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const badges = await getUserBadges();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <DashboardBackground />
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8">
          <Link href="/dashboard" className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white uppercase tracking-wide">
            Your Badges & Achievements
          </h1>
          <p className="text-gray-400 mt-2">Complete challenges and unlock badges</p>
        </div>

        <BadgesGrid badges={badges} allBadges={BADGE_METADATA} />
      </main>

      <Footer />
    </div>
  );
}
