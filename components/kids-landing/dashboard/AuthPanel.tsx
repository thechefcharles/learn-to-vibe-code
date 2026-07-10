'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type AuthMode = 'signin' | 'signup';

export function AuthPanel() {
  const prefersReducedMotion = useReducedMotion();
  const [mode, setMode] = useState<AuthMode>('signin');

  return (
    <motion.div
      initial={!prefersReducedMotion ? { opacity: 0, y: 20 } : undefined}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
      transition={!prefersReducedMotion ? { duration: 0.5 } : undefined}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 w-full"
    >
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('signin')}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
            mode === 'signin'
              ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
              : 'bg-white/10 text-gray-300 hover:bg-white/15'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => setMode('signup')}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
            mode === 'signup'
              ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
              : 'bg-white/10 text-gray-300 hover:bg-white/15'
          }`}
        >
          Sign Up
        </button>
      </div>

      {mode === 'signin' ? (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-4">Welcome Back</h3>
          <p className="text-sm text-gray-400 mb-4">
            Sign in to access your learning dashboard and continue your journey.
          </p>
          <Link
            href="/auth/sign-in"
            className="block w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg text-center transition-all shadow-lg"
          >
            Go to Sign In →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white mb-4">Start Learning</h3>
          <p className="text-sm text-gray-400 mb-4">
            Create your free account and begin the accredited vibe coding course. 93 hours, 9.3 CEUs, lifetime access.
          </p>
          <Link
            href="/auth/sign-up"
            className="block w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg text-center transition-all shadow-lg"
          >
            Create Account →
          </Link>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-white/10">
        <p className="text-xs text-gray-500 text-center">
          {mode === 'signin'
            ? "Don't have an account? Click the Sign Up tab above."
            : 'Already have an account? Click the Sign In tab above.'}
        </p>
      </div>
    </motion.div>
  );
}
