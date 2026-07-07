import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getCapstoneSubmissionsForReview } from "@/lib/actions/capstone";
import CapstoneReviewCard from "@/components/CapstoneReviewCard";
import CapstoneReviewsList from "@/components/CapstoneReviewsList";

export default async function CapstoneReviewsPage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  // Verify user is instructor
  const supabase = await (await import("@/lib/supabase/server")).createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "instructor") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <h1 className="text-3xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400">
              Only instructors can access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const submissions = await getCapstoneSubmissionsForReview();

  const pendingCount = submissions.filter((s) => s.result === "pending").length;
  const passedCount = submissions.filter((s) => s.result === "pass").length;
  const failedCount = submissions.filter((s) => s.result === "fail").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-start mb-6">
            <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 text-sm inline-block">
              ← Back to Dashboard
            </Link>
            <Link href="/admin/records" className="text-blue-400 hover:text-blue-300 text-sm inline-block">
              📊 Export Records
            </Link>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">📋 Capstone Reviews</h1>
          <p className="text-slate-400">Review and grade student capstone projects</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">Total Submissions</div>
            <div className="text-4xl font-bold text-blue-400">{submissions.length}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">⏳ Pending</div>
            <div className="text-4xl font-bold text-yellow-400">{pendingCount}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">✅ Passed</div>
            <div className="text-4xl font-bold text-green-400">{passedCount}</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <div className="text-slate-400 text-sm mb-2">❌ Failed</div>
            <div className="text-4xl font-bold text-red-400">{failedCount}</div>
          </div>
        </div>

        {/* Submissions */}
        <CapstoneReviewsList submissions={submissions} />
      </div>
    </div>
  );
}
