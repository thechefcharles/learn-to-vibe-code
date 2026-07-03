export const metadata = {
  title: "Privacy Policy - Learn to Vibe Code",
  description: "Privacy Policy for Learn to Vibe Code course platform",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* DRAFT BANNER */}
        <div className="mb-8 p-4 bg-red-500/20 border-l-4 border-red-500">
          <p className="text-red-400 font-bold">
            ⚠️ DRAFT — Pending Attorney Review
          </p>
          <p className="text-red-300 text-sm mt-2">
            This Privacy Policy is pending legal review and should not be considered
            final or binding. Do not use in production until attorney approval is
            obtained.
          </p>
        </div>

        <div className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Information We Collect
          </h2>
          <p className="text-slate-300 mb-4">
            When you enroll, we collect:
          </p>
          <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
            <li>Name and email address</li>
            <li>Password (hashed and salted)</li>
            <li>Course progress and quiz scores</li>
            <li>Capstone project submissions and defense video URLs</li>
            <li>Certificate information</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-slate-300 mb-4">
            Your data is used to:
          </p>
          <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
            <li>Deliver course content and track your progress</li>
            <li>Assess your work (quizzes, capstone projects)</li>
            <li>Issue certificates upon completion</li>
            <li>Maintain accreditation records (CPD/IACET requirements)</li>
            <li>Improve course material and user experience</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Data Security
          </h2>
          <p className="text-slate-300 mb-4">
            Your personal information is stored securely using encryption and
            access controls. Passwords are hashed and never stored in plain text.
            We use Supabase for secure data storage with Row-Level Security (RLS)
            to ensure only authorized access.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Data Retention
          </h2>
          <p className="text-slate-300 mb-4">
            We retain your enrollment and course progress data for accreditation
            purposes as required by CPD and IACET standards (typically 7 years).
            You may request deletion of personal data subject to legal obligations.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Third-Party Services
          </h2>
          <p className="text-slate-300 mb-4">
            We use third-party services for:
          </p>
          <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
            <li>
              <strong>Supabase:</strong> Database and authentication
            </li>
            <li>
              <strong>Vercel:</strong> Hosting and deployment
            </li>
            <li>
              <strong>Stripe:</strong> Payment processing (donations only)
            </li>
          </ul>
          <p className="text-slate-300 mb-4">
            These services have their own privacy policies. We encourage you to
            review them.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Your Rights
          </h2>
          <p className="text-slate-300 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion (subject to legal obligations)</li>
            <li>Opt-out of marketing communications</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">
            Contact Us
          </h2>
          <p className="text-slate-300 mb-4">
            If you have questions about this Privacy Policy or your data, please
            contact us through the support page.
          </p>

          <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-400 text-sm">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-blue-300 text-sm mt-2">
              This policy is subject to change. Continued use of the course after
              changes constitutes acceptance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
