'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePreferredMotion } from '@/lib/hooks/usePreferredMotion';

interface ShareLessonProps {
  moduleName: string;
  lessonTitle: string;
  url: string;
}

export function ShareLesson({
  moduleName,
  lessonTitle,
  url,
}: ShareLessonProps) {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = usePreferredMotion();

  const shareText = `I'm learning vibe coding! Just completed '${lessonTitle}' from ${moduleName}. Join me at learn2vibecode.com`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleShareLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center pt-6">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        Share:
      </span>
      <div className="flex gap-2">
        {/* Copy Link Button */}
        <motion.button
          onClick={handleCopyLink}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
            copied
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
              : 'bg-slate-800/40 text-slate-300 border border-white/10 hover:bg-slate-700/50 hover:border-white/20'
          }`}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        >
          {copied ? '✓' : '🔗'} {copied ? 'Copied!' : 'Copy'}
        </motion.button>

        {/* Twitter Button */}
        <motion.button
          onClick={handleShareTwitter}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-slate-800/40 text-slate-300 border border-white/10 hover:bg-slate-700/50 hover:border-white/20 transition"
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          title="Share on Twitter"
          aria-label={`Share "${lessonTitle}" on Twitter`}
        >
          𝕏
        </motion.button>

        {/* LinkedIn Button */}
        <motion.button
          onClick={handleShareLinkedIn}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-slate-800/40 text-slate-300 border border-white/10 hover:bg-slate-700/50 hover:border-white/20 transition"
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          title="Share on LinkedIn"
          aria-label={`Share "${lessonTitle}" on LinkedIn`}
        >
          in
        </motion.button>
      </div>
    </div>
  );
}
