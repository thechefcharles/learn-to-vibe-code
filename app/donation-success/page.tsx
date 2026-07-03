import Link from "next/link";

export default function DonationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800 rounded-lg p-8 border-2 border-green-500 text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💜</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Thank You!</h1>
          <p className="text-slate-400 mb-6">
            Your donation means a lot to us. It helps keep Learn to Vibe Code free and continuously improved.
          </p>

          <div className="bg-slate-700 rounded-lg p-6 mb-8">
            <p className="text-slate-300 mb-4">
              Your support helps us:
            </p>
            <ul className="text-left space-y-2 text-slate-300">
              <li>✓ Keep the course free for everyone</li>
              <li>✓ Maintain and update course content</li>
              <li>✓ Pay for hosting and infrastructure</li>
              <li>✓ Create more educational resources</li>
            </ul>
          </div>

          <Link
            href="/certificate"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition mb-4"
          >
            Back to Certificate
          </Link>

          <Link
            href="/dashboard"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
