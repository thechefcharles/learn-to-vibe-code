import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { isModuleUnlocked } from "@/lib/actions/course";
import { getCapstoneSubmission, submitCapstone } from "@/lib/actions/capstone";
import CapstoneSubmitForm from "@/components/CapstoneSubmitForm";
import Link from "next/link";

export default async function CapstonePage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  // Check if all modules are unlocked (must complete Module 15)
  const moduleUnlocked = await isModuleUnlocked(15);
  if (!moduleUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <h1 className="text-3xl font-bold text-white mb-4">🎓 Capstone Project</h1>
            <p className="text-slate-400 mb-6">
              You must complete Module 15 before submitting your capstone project.
            </p>
            <Link
              href="/course/15"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg inline-block"
            >
              Complete Module 15 →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const submission = await getCapstoneSubmission();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 text-sm mb-6 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-5xl font-bold text-white mb-2">🎓 Capstone Project</h1>
          <p className="text-slate-400 text-lg">
            Build and submit your final project to earn your certificate
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 mb-8">
          <h2 className="font-bold text-white mb-3">What's the Capstone?</h2>
          <p className="text-slate-300 mb-4">
            Design and build a complete AI-powered application using everything you've learned.
            Show us your best work! Your project will be reviewed by our instructor team.
          </p>
          <div className="space-y-2 text-sm text-slate-300">
            <p>✓ Demonstrate your AI integration skills</p>
            <p>✓ Deploy to a production environment</p>
            <p>✓ Get feedback from experienced developers</p>
            <p>✓ Earn your course completion certificate</p>
          </div>
        </div>

        {/* Submission Status */}
        {submission ? (
          <div className="bg-slate-800 rounded-lg p-8 border-2 border-green-500 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">✓</span>
              <h2 className="text-2xl font-bold text-white">Capstone Submitted</h2>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm text-slate-400">Repository</label>
                <a
                  href={submission.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 break-all"
                >
                  {submission.repo_url} →
                </a>
              </div>
              <div>
                <label className="text-sm text-slate-400">Live Project</label>
                <a
                  href={submission.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 break-all"
                >
                  {submission.live_url} →
                </a>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-3 p-4 bg-slate-700 rounded-lg mb-6">
              <div className="flex-1">
                <p className="text-sm text-slate-400">Status</p>
                <p className="font-bold text-white capitalize">
                  {submission.status === "pending" && "⏳ Pending Review"}
                  {submission.status === "in_review" && "👀 Under Review"}
                  {submission.status === "approved" && "✅ Approved"}
                  {submission.status === "rejected" && "❌ Needs Revision"}
                </p>
              </div>
            </div>

            {/* Feedback */}
            {submission.instructor_feedback && (
              <div className="bg-slate-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-slate-400 mb-2">Instructor Feedback</p>
                <p className="text-white">{submission.instructor_feedback}</p>
              </div>
            )}

            {submission.status === "rejected" && (
              <div className="text-center">
                <p className="text-slate-400 mb-4">Ready to revise and resubmit?</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg">
                  Resubmit Capstone
                </button>
              </div>
            )}

            {submission.status === "approved" && (
              <div className="text-center">
                <p className="text-green-400 text-lg font-bold mb-4">🎉 Congratulations!</p>
                <p className="text-slate-400 mb-6">You've completed the course. Your certificate has been generated.</p>
                <Link
                  href="/certificate"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg inline-block"
                >
                  View Certificate →
                </Link>
              </div>
            )}
          </div>
        ) : (
          <CapstoneSubmitForm />
        )}
      </div>
    </div>
  );
}
