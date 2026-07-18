import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { isModuleUnlocked, getUserEnrolledVersion } from "@/lib/actions/course";
import { getCapstoneSubmission, submitCapstone } from "@/lib/actions/capstone";
import CapstoneSubmitForm from "@/components/CapstoneSubmitForm";
import Link from "next/link";
import type { Version } from "@/lib/VersionContext";

export default async function CapstonePage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  // Get user's enrolled version
  const version = await getUserEnrolledVersion();
  const isKids = version === "kids";

  // Check if all modules are unlocked (must complete Module 15)
  const moduleUnlocked = await isModuleUnlocked(15);
  if (!moduleUnlocked) {
    return (
      <main className={`min-h-screen py-12 px-4 ${isKids ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" : "bg-gradient-to-br from-slate-900 to-slate-800"}`}>
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-lg p-8 border ${isKids ? "bg-white border-purple-300" : "bg-slate-800 border-slate-700"}`}>
            <h1 className={`text-3xl font-bold mb-4 ${isKids ? "text-purple-700" : "text-white"}`}>
              {isKids ? "🎮 Build Your Project!" : "🎓 Capstone Project"}
            </h1>
            <p className={`mb-6 ${isKids ? "text-purple-600" : "text-slate-400"}`}>
              {isKids ? "Complete all 16 modules first, then show us what you can build! 🚀" : "You must complete Module 16 before submitting your project."}
            </p>
            <Link
              href="/course/15"
              className={`font-medium py-2 px-6 rounded-lg inline-block transition ${isKids ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              {isKids ? "Go to Module 16 🎯" : "Complete Module 16 →"}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const submission = await getCapstoneSubmission();

  return (
    <div className={`min-h-screen py-12 px-4 ${isKids ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" : "bg-gradient-to-br from-slate-900 to-slate-800"}`}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/dashboard" className={`text-sm mb-6 inline-block transition ${isKids ? "text-purple-600 hover:text-purple-800" : "text-blue-400 hover:text-blue-300"}`}>
            ← Back to Dashboard
          </Link>
          <h1 className={`text-5xl font-bold mb-2 ${isKids ? "text-purple-700" : "text-white"}`}>
            {isKids ? "🎮 Build Your Project!" : "🎓 Capstone Project"}
          </h1>
          <p className={`text-lg ${isKids ? "text-purple-600" : "text-slate-400"}`}>
            {isKids
              ? "Build your own app and show what you've learned! 🚀"
              : "Build and submit your final project to earn your certificate"}
          </p>
        </div>

        {/* Info Box - Version-Aware */}
        <div className={`border rounded-lg p-6 mb-8 ${isKids ? "bg-purple-100 border-purple-300" : "bg-blue-500/10 border-blue-500/20"}`}>
          <h2 className={`font-bold mb-3 ${isKids ? "text-purple-700" : "text-white"}`}>
            {isKids ? "🎯 Your Project Challenge" : "What's the Capstone?"}
          </h2>
          <p className={`mb-4 ${isKids ? "text-purple-700" : "text-slate-300"}`}>
            {isKids
              ? "Pick an idea you like (pet tracker, game list, habit tracker, etc.) and build it from scratch. You've learned everything you need!"
              : "Design and build a complete AI-powered application using everything you've learned. Show us your best work! Your project will be reviewed by our instructor team."}
          </p>
          <div className={`space-y-2 text-sm ${isKids ? "text-purple-700" : "text-slate-300"}`}>
            {isKids ? (
              <>
                <p>✅ Pick a project idea you're excited about</p>
                <p>✅ Use AI (Cursor/Claude Code) to build faster</p>
                <p>✅ Deploy it to the internet so everyone can use it</p>
                <p>✅ Record a video walkthrough of your app 🎥</p>
              </>
            ) : (
              <>
                <p>✓ Demonstrate your AI integration skills</p>
                <p>✓ Deploy to a production environment</p>
                <p>✓ Get feedback from experienced developers</p>
                <p>✓ Earn your course completion certificate</p>
              </>
            )}
          </div>
        </div>

        {/* Submission Status */}
        {submission ? (
          <div className={`rounded-lg p-8 border-2 mb-8 ${isKids ? "bg-white border-green-400" : "bg-slate-800 border-green-500"}`}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">✅</span>
              <h2 className={`text-2xl font-bold ${isKids ? "text-green-700" : "text-white"}`}>
                {isKids ? "Project Submitted! 🚀" : "Capstone Submitted"}
              </h2>
            </div>

            <div className={`space-y-4 mb-6 ${isKids ? "text-purple-700" : "text-slate-300"}`}>
              <div>
                <label className={`text-sm ${isKids ? "text-purple-600" : "text-slate-400"}`}>Repository</label>
                <a
                  href={submission.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`break-all ${isKids ? "text-purple-600 hover:text-purple-800" : "text-blue-400 hover:text-blue-300"}`}
                >
                  {submission.repo_url} →
                </a>
              </div>
              <div>
                <label className={`text-sm ${isKids ? "text-purple-600" : "text-slate-400"}`}>Live Project</label>
                <a
                  href={submission.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`break-all ${isKids ? "text-purple-600 hover:text-purple-800" : "text-blue-400 hover:text-blue-300"}`}
                >
                  {submission.live_url} →
                </a>
              </div>
            </div>

            {/* Status Badge */}
            {submission.result && (
              <div className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${isKids ? "bg-purple-100" : "bg-slate-700"}`}>
                <div className="flex-1">
                  <p className={`text-sm ${isKids ? "text-purple-600" : "text-slate-400"}`}>Grading Status</p>
                  <p className={`font-bold capitalize ${isKids ? "text-purple-700" : "text-white"}`}>
                    {submission.result === "pending" && "⏳ Pending Review"}
                    {submission.result === "pass" && "✅ Passed"}
                    {submission.result === "fail" && "❌ Did Not Pass"}
                  </p>
                </div>
              </div>
            )}

            {submission.result === "pass" && (
              <div className={`text-center ${isKids ? "bg-green-100 p-6 rounded-lg" : ""}`}>
                <p className={`text-lg font-bold mb-4 ${isKids ? "text-green-700" : "text-green-400"}`}>
                  {isKids ? "🎉 YOU DID IT!" : "🎉 Congratulations!"}
                </p>
                <p className={`mb-6 ${isKids ? "text-green-700" : "text-slate-400"}`}>
                  {isKids ? "You've completed the entire course! 🌟" : "You've completed the course. Your certificate has been generated."}
                </p>
                <Link
                  href="/certificate"
                  className={`font-medium py-2 px-6 rounded-lg inline-block transition ${isKids ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
                >
                  {isKids ? "Get Your Certificate 🏆" : "View Certificate →"}
                </Link>
              </div>
            )}
          </div>
        ) : (
          <CapstoneSubmitForm />
        )}
      </div>
    </main>
  );
}
