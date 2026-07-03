"use client";

import Link from "next/link";

export default function SignUp() {
  // Account creation temporarily disabled due to Supabase maintenance
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-6">
            <p className="text-yellow-400 text-sm font-medium">⚠️ Temporarily Offline</p>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">Account Creation Paused</h1>
          <p className="text-slate-400 mb-6">
            Our authentication provider is currently under maintenance. New account creation is temporarily unavailable.
          </p>

          <div className="bg-slate-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-slate-300 mb-2">✓ We're actively working on this</p>
            <p className="text-sm text-slate-300 mb-2">✓ Check back in 30 minutes</p>
            <p className="text-sm text-slate-300">✓ Existing accounts can still sign in</p>
          </div>

          <div className="space-y-3">
            <Link
              href="/auth/sign-in"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition text-center"
            >
              Sign In →
            </Link>
            <Link
              href="/"
              className="block w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-lg transition text-center"
            >
              Back Home
            </Link>
          </div>

          <p className="text-slate-500 text-xs text-center mt-6">
            Questions? Check our status page or come back later.
          </p>
        </div>
      </div>
    </div>
  );
}
