import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserEnrolledVersion } from "@/lib/actions/course";
import FeedbackForm from "@/components/FeedbackForm";
import Link from "next/link";

export const metadata = {
  title: "Course Feedback - Learn to Vibe Code",
  description: "Share your feedback to help us improve the course",
};

export default async function FeedbackPage() {
  const user = await getUser();
  if (!user) {
    redirect("/auth/sign-in");
  }

  const version = await getUserEnrolledVersion();
  const isKids = version === "kids";

  return (
    <div className={`min-h-screen py-12 px-4 ${isKids ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" : "bg-gradient-to-br from-slate-900 to-slate-800"}`}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link href="/dashboard" className={`text-sm mb-6 inline-block transition ${isKids ? "text-purple-600 hover:text-purple-800" : "text-blue-400 hover:text-blue-300"}`}>
            ← Back to Dashboard
          </Link>
          <h1 className={`text-5xl font-bold mb-4 ${isKids ? "text-purple-700" : "text-white"}`}>
            {isKids ? "💬 Tell Us Your Thoughts!" : "Course Feedback"}
          </h1>
          <p className={`text-lg ${isKids ? "text-purple-600" : "text-slate-400"}`}>
            {isKids
              ? "Help us make the course even better with your honest feedback! 🌟"
              : "Your feedback helps us continuously improve the course for all learners"}
          </p>
        </div>

        {/* Info Box */}
        <div className={`rounded-lg p-6 mb-8 border ${isKids ? "bg-purple-100 border-purple-300" : "bg-blue-500/10 border-blue-500/20"}`}>
          <h2 className={`font-bold mb-3 ${isKids ? "text-purple-700" : "text-white"}`}>
            {isKids ? "🎯 Why We Ask" : "Why Your Feedback Matters"}
          </h2>
          <p className={`mb-4 ${isKids ? "text-purple-700" : "text-slate-300"}`}>
            {isKids
              ? "We want to know what worked, what didn't, and how we can help you learn even better. Your honest answers really do help us improve! 💜"
              : "We use your feedback to improve course materials, clarify confusing topics, adjust difficulty levels, and enhance the learning experience for everyone."}
          </p>
          <ul className={`space-y-2 text-sm ${isKids ? "text-purple-700" : "text-slate-300"}`}>
            {isKids ? (
              <>
                <li>✅ Your answers help us write clearer lessons</li>
                <li>✅ We learn which topics need more examples</li>
                <li>✅ We hear what's working and what's not</li>
              </>
            ) : (
              <>
                <li>✓ Identify topics that need clarification</li>
                <li>✓ Adjust difficulty to match learner needs</li>
                <li>✓ Improve assessments and materials</li>
              </>
            )}
          </ul>
        </div>

        {/* Feedback Form */}
        <FeedbackForm onSuccess={() => {
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        }} />
      </div>
    </div>
  );
}
