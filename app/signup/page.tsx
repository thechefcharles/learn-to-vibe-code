'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { motion } from 'framer-motion';

export default function DifficultySelector() {
  const router = useRouter();
  const [selectedVersion, setSelectedVersion] = useState<'kids' | 'adult' | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectDifficulty = (version: 'kids' | 'adult') => {
    localStorage.setItem('version', version);
    setSelectedVersion(version);
    setTimeout(() => {
      router.push('/auth/sign-up');
    }, 300);
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-12 px-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block hover:opacity-80 transition">
            <Logo variant="cosmic" size="md" />
          </Link>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-display text-white mb-3">
            Choose Your Learning Path
          </h1>
          <p className="text-lg text-gray-300">
            Select the difficulty level that matches your experience level
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Kids Version */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelectDifficulty('kids')}
            disabled={selectedVersion === 'kids'}
            className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
              selectedVersion === 'kids'
                ? 'bg-gradient-to-br from-cyan-500/30 to-purple-600/30 border-purple-400 shadow-lg shadow-purple-500/50'
                : 'bg-white/5 backdrop-blur-md border-white/20 hover:border-purple-400/50 hover:bg-white/10'
            }`}
          >
            <div className="text-5xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold text-white mb-2">Beginner</h2>
            <p className="text-gray-300 mb-4">
              Perfect if you're new to coding. We'll start from the basics with visual guides and fun examples.
            </p>
            <div className="flex gap-2 flex-wrap justify-center mt-6">
              <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs rounded-full">
                Step-by-step lessons
              </span>
              <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs rounded-full">
                Interactive demos
              </span>
            </div>
          </motion.button>

          {/* Adult Version */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelectDifficulty('adult')}
            disabled={selectedVersion === 'adult'}
            className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
              selectedVersion === 'adult'
                ? 'bg-gradient-to-br from-cyan-500/30 to-purple-600/30 border-purple-400 shadow-lg shadow-purple-500/50'
                : 'bg-white/5 backdrop-blur-md border-white/20 hover:border-purple-400/50 hover:bg-white/10'
            }`}
          >
            <div className="text-5xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-white mb-2">Advanced</h2>
            <p className="text-gray-300 mb-4">
              For experienced developers. We'll move quickly through concepts with deeper technical details.
            </p>
            <div className="flex gap-2 flex-wrap justify-center mt-6">
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs rounded-full">
                Fast-paced
              </span>
              <span className="px-3 py-1 bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs rounded-full">
                Deep dives
              </span>
            </div>
          </motion.button>
        </div>

        {/* Info Text */}
        <p className="text-center text-gray-400 text-sm">
          You can change your difficulty level anytime in your dashboard settings.
        </p>
      </div>
    </div>
  );
}
