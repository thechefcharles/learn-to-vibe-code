import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getCapstoneSubmission } from "@/lib/actions/capstone";
import Link from "next/link";
import DonationCard from "@/components/DonationCard";

export default async function CertificatePage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const capstone = await getCapstoneSubmission();

  // Only show certificate if capstone passed
  if (!capstone || capstone.result !== "pass") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
            <h1 className="text-3xl font-bold text-white mb-4">🎓 Certificate</h1>
            <p className="text-slate-400">
              Your capstone project must be approved before you can access your certificate.
            </p>
            <Link
              href="/capstone"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
            >
              Check Capstone Status →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const completionDate = new Date(capstone.reviewed_at || capstone.submitted_at).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 text-sm mb-6 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-5xl font-bold text-white mb-2">🎓 Your Certificate</h1>
          <p className="text-slate-400">Congratulations on completing Learn to Vibe Code!</p>
        </div>

        {/* Certificate Display */}
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg p-12 mb-12 border-4 border-yellow-400">
          <div className="text-center">
            {/* Certificate Header */}
            <div className="mb-8">
              <p className="text-sm text-gray-600 tracking-widest uppercase mb-2">Certificate of Completion</p>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Learn to Vibe Code</h2>
              <p className="text-gray-600">AI-Powered Application Development Course</p>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-gray-800 my-8"></div>

            {/* Body */}
            <div className="mb-8">
              <p className="text-gray-700 mb-4">This is to certify that</p>
              <p className="text-3xl font-bold text-gray-800 mb-4">{user.user_metadata?.name || user.email}</p>
              <p className="text-gray-700 mb-2">has successfully completed the</p>
              <p className="text-xl font-bold text-gray-800 mb-4">Learn to Vibe Code Course</p>
              <p className="text-gray-700 mb-2">demonstrating comprehensive knowledge of</p>
              <p className="text-gray-700">
                AI fundamentals, prompt engineering, building with AI, and deploying production-ready applications
              </p>
            </div>

            {/* Capstone */}
            <div className="bg-white bg-opacity-60 rounded p-4 mb-8 inline-block">
              <p className="text-sm text-gray-600 mb-1">Capstone Project Submitted</p>
              <p className="text-sm text-gray-700">{capstone.repo_url}</p>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-gray-800 pt-8">
              <p className="text-gray-700 mb-2">Date of Completion</p>
              <p className="text-xl font-bold text-gray-800">{completionDate}</p>
              <p className="text-xs text-gray-600 mt-4">
                Certificate ID: {user.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <button
            onClick={() => window.print()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition text-center"
          >
            🖨️ Print / Save as PDF
          </button>
          <Link
            href="/dashboard"
            className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 px-6 rounded-lg transition text-center"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Donation Section */}
        <DonationCard />

        {/* Share Section */}
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mt-12">
          <h2 className="text-2xl font-bold text-white mb-4">Share Your Achievement 🎉</h2>
          <p className="text-slate-400 mb-6">
            Let the world know you completed Learn to Vibe Code!
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                const text = `I just completed Learn to Vibe Code! 🚀 A comprehensive course on AI-powered app development. Check it out: https://learn-to-vibe-code.vercel.app`;
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
                  "twitter-share",
                  "width=550,height=420"
                );
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Share on Twitter/X 𝕏
            </button>
            <button
              onClick={() => {
                const text = `I just completed Learn to Vibe Code! Check out this amazing free course on building AI-powered applications.`;
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=https://learn-to-vibe-code.vercel.app`,
                  "linkedin-share",
                  "width=550,height=420"
                );
              }}
              className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Share on LinkedIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
