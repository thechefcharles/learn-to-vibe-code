'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { ModuleStep } from '@/lib/module-steps';
import type { LessonSectionProgress } from '@/lib/types/lesson-section';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { CodeBlockWithCopy } from '@/components/course/CodeBlockWithCopy';
import { KeyPointCard } from '@/components/course/KeyPointCard';
import { usePreferredMotion } from '@/lib/hooks/usePreferredMotion';
import { LessonCompletionReward } from '@/components/course/LessonCompletionReward';

interface SectionLessonViewerProps {
  step: ModuleStep;
  moduleId: number;
  isKids: boolean;
  onLessonComplete?: () => void;
}

export function SectionLessonViewer({
  step,
  moduleId,
  isKids,
  onLessonComplete,
}: SectionLessonViewerProps) {
  console.log(`🎬 [SECTIONLESSONVIEWER MOUNT] step.id=${step.id}, title="${step.title}", sections=${step.sections?.length || 0}`);

  const sections = step.sections || [];
  const [sectionIndex, setSectionIndex] = useState(0);
  const [viewedSections, setViewedSections] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState<LessonSectionProgress | null>(null);
  const [showReward, setShowReward] = useState(false);
  const prefersReducedMotion = usePreferredMotion();

  const lessonStorageKey = `lesson-${moduleId}-${step.id}-sections`;

  // Load progress from localStorage on mount
  useEffect(() => {
    console.log(`📖 [SECTIONLESSONVIEWER EFFECT 1] Loading progress from localStorage for key="${lessonStorageKey}"`);
    const stored = localStorage.getItem(lessonStorageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as LessonSectionProgress;
        // Migration: if totalSections changed, reset
        if (parsed.totalSections !== sections.length) {
          const fresh: LessonSectionProgress = {
            moduleId,
            lessonId: step.id,
            totalSections: sections.length,
            viewedSections: [],
            lastViewedSection: 0,
            completed: false,
            rewardClaimed: false,
            updatedAt: Date.now(),
          };
          localStorage.setItem(lessonStorageKey, JSON.stringify(fresh));
          setProgress(fresh);
          setViewedSections(new Set());
          setSectionIndex(0);
        } else {
          setProgress(parsed);
          setViewedSections(new Set(parsed.viewedSections));
          setSectionIndex(parsed.lastViewedSection);
        }
      } catch {
        // Corrupted storage, reset
        const fresh: LessonSectionProgress = {
          moduleId,
          lessonId: step.id,
          totalSections: sections.length,
          viewedSections: [],
          lastViewedSection: 0,
          completed: false,
          rewardClaimed: false,
          updatedAt: Date.now(),
        };
        localStorage.setItem(lessonStorageKey, JSON.stringify(fresh));
        setProgress(fresh);
      }
    } else {
      const fresh: LessonSectionProgress = {
        moduleId,
        lessonId: step.id,
        totalSections: sections.length,
        viewedSections: [],
        lastViewedSection: 0,
        completed: false,
        rewardClaimed: false,
        updatedAt: Date.now(),
      };
      localStorage.setItem(lessonStorageKey, JSON.stringify(fresh));
      setProgress(fresh);
    }
  }, [moduleId, step.id, sections.length, lessonStorageKey]);

  // Mark current section as viewed when it mounts
  useEffect(() => {
    console.log(`📖 [SECTIONLESSONVIEWER EFFECT 2] Marking section ${sectionIndex} as viewed`);
    setViewedSections(prev => {
      if (prev.has(sectionIndex)) return prev;
      const next = new Set(prev).add(sectionIndex);

      // Persist to localStorage
      const updated: LessonSectionProgress = {
        moduleId,
        lessonId: step.id,
        totalSections: sections.length,
        viewedSections: Array.from(next),
        lastViewedSection: sectionIndex,
        completed: next.size === sections.length,
        rewardClaimed: progress?.rewardClaimed ?? false,
        updatedAt: Date.now(),
      };
      localStorage.setItem(lessonStorageKey, JSON.stringify(updated));
      setProgress(updated);

      return next;
    });
  }, [sectionIndex, moduleId, step.id, sections.length, lessonStorageKey, progress?.rewardClaimed]);

  // Fire completion reward when all sections viewed
  useEffect(() => {
    console.log(`📖 [SECTIONLESSONVIEWER EFFECT 3] Checking completion: viewed=${viewedSections.size}, total=${sections.length}, progress=${progress ? 'exists' : 'null'}, rewardClaimed=${progress?.rewardClaimed}`);
    if (viewedSections.size === sections.length && progress && !progress.rewardClaimed) {
      console.log(`🎉 [SECTIONLESSONVIEWER] ALL SECTIONS VIEWED! Firing onLessonComplete callback`);
      setProgress(prev => prev ? { ...prev, completed: true, rewardClaimed: true } : null);
      localStorage.setItem(lessonStorageKey, JSON.stringify({
        ...progress,
        completed: true,
        rewardClaimed: true,
      }));
      setShowReward(true);
      onLessonComplete?.();
    }
  }, [viewedSections.size, sections.length, progress, onLessonComplete, lessonStorageKey]);

  const currentSection = sections[sectionIndex];
  const isFirstSection = sectionIndex === 0;
  const isLastSection = sectionIndex === sections.length - 1;
  const allSectionsViewed = viewedSections.size === sections.length;

  return (
    <motion.div
      key={`section-${sectionIndex}`}
      initial={!prefersReducedMotion ? { opacity: 0, y: 10 } : {}}
      animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Section Header */}
      <div>
        <h2 className={`text-3xl font-bold ${isKids ? 'text-purple-600' : 'text-white'}`}>
          {currentSection.heading}
        </h2>
      </div>

      {/* Section Progress Bar */}
      <div className={`h-1 rounded-full overflow-hidden ${isKids ? 'bg-purple-200' : 'bg-slate-700'}`}>
        <motion.div
          className={`h-full ${isKids ? 'bg-purple-500' : 'bg-cyan-500'}`}
          animate={{ width: `${((sectionIndex + 1) / sections.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Section Content */}
      <div className={`prose max-w-none leading-[1.75] ${isKids ? 'prose-purple' : 'prose-invert'}`}>
        <MarkdownRenderer content={currentSection.content} />
      </div>

      {/* Code Block */}
      {currentSection.codeBlock && (
        <CodeBlockWithCopy
          code={currentSection.codeBlock.code}
          language={currentSection.codeBlock.language}
        />
      )}

      {/* Key Point */}
      {currentSection.keyPoint && (
        <KeyPointCard keyPoint={currentSection.keyPoint} />
      )}

      {/* Tip */}
      {currentSection.tip && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border ${
            isKids
              ? 'bg-blue-50 border-blue-200 text-blue-900'
              : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
          }`}>
          <p className="font-bold text-sm uppercase tracking-wider mb-2">💡 Tip</p>
          <p className="text-sm leading-relaxed">{currentSection.tip}</p>
        </motion.div>
      )}

      {/* Hints */}
      {currentSection.hints && currentSection.hints.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg p-4 mb-8 border ${
            isKids
              ? 'bg-blue-50 border-blue-200'
              : 'bg-blue-500/10 border-blue-500/30'
          }`}
        >
          <div className={`font-bold uppercase text-xs tracking-wider mb-3 cursor-pointer ${
            isKids ? 'text-blue-700' : 'text-blue-300'
          }`}>
            💡 Hints ({currentSection.hints.length})
          </div>
          <ul className="space-y-2">
            {currentSection.hints.map((hint, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`text-sm leading-relaxed flex items-start gap-2 ${isKids ? 'text-blue-700' : 'text-blue-200'}`}
              >
                <span className="flex-shrink-0 mt-0.5">•</span>
                <span>{hint}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Resources */}
      {currentSection.resources && currentSection.resources.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border mb-8 ${
            isKids
              ? 'bg-green-50 border-green-200'
              : 'bg-green-500/10 border-green-500/30'
          }`}
        >
          <h4 className={`font-bold uppercase text-xs tracking-wider mb-4 ${isKids ? 'text-green-900' : 'text-green-300'}`}>
            📚 Resources
          </h4>
          <ul className="space-y-2">
            {currentSection.resources.map((res, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 4 }}
                className={`text-sm transition-all ${
                  isKids ? 'text-green-700' : 'text-green-400'
                }`}
              >
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  {res.type === 'docs' ? '📖' : res.type === 'video' ? '🎥' : '📄'} {res.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Challenge */}
      {currentSection.challenge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg border mb-8 ${
            isKids
              ? 'bg-orange-50 border-orange-200'
              : 'bg-orange-500/10 border-orange-500/30'
          }`}
        >
          <h4 className={`font-bold uppercase text-xs tracking-wider mb-3 ${isKids ? 'text-orange-900' : 'text-orange-300'}`}>
            🎯 Challenge
          </h4>
          <p className={`mb-4 leading-relaxed ${isKids ? 'text-orange-800' : 'text-orange-200'}`}>
            {currentSection.challenge.description}
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className={`text-sm p-3 rounded border ${
              isKids
                ? 'bg-orange-100 text-orange-900 border-orange-200'
                : 'bg-orange-900/30 text-orange-300 border-orange-500/30'
            }`}
          >
            <div className="font-bold uppercase text-xs tracking-wider mb-2">Action:</div>
            <div className="font-mono text-xs leading-relaxed">{currentSection.challenge.action}</div>
          </motion.div>
        </motion.div>
      )}

      {/* Viewed status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`text-xs font-semibold uppercase tracking-wider mb-4 ${isKids ? 'text-purple-600' : 'text-slate-400'}`}
      >
        {allSectionsViewed ? (
          <span className={isKids ? 'text-purple-700' : 'text-emerald-400'}>✓ All sections completed</span>
        ) : (
          <span>{viewedSections.size} of {sections.length} sections viewed</span>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex gap-4 pt-6 border-t border-slate-700">
        <motion.button
          onClick={() => setSectionIndex(Math.max(0, sectionIndex - 1))}
          disabled={isFirstSection}
          whileHover={!isFirstSection ? { y: -2 } : {}}
          className={`px-6 py-2.5 rounded-lg font-bold transition-all duration-200 uppercase text-sm tracking-wider ${
            isFirstSection
              ? 'opacity-30 cursor-not-allowed text-slate-500'
              : isKids
              ? 'bg-purple-500 text-white hover:bg-purple-600 shadow-lg'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
          }`}
        >
          ← Back
        </motion.button>

        {isLastSection ? (
          <motion.button
            whileHover={allSectionsViewed ? { scale: 1.02, y: -2 } : {}}
            disabled={!allSectionsViewed}
            className={`ml-auto px-6 py-2.5 rounded-lg font-bold transition-all duration-200 uppercase text-sm tracking-wider ${
              allSectionsViewed
                ? isKids
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg'
                  : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 shadow-lg shadow-purple-500/50'
                : 'opacity-30 cursor-not-allowed'
            }`}
          >
            Lesson Complete! 🎉
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setSectionIndex(Math.min(sections.length - 1, sectionIndex + 1))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`ml-auto px-4 py-2 rounded-lg font-semibold transition-all ${
              isKids
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700'
            }`}
          >
            Next →
          </motion.button>
        )}
      </div>

      {showReward && (
        <LessonCompletionReward
          xpReward={step.xpReward}
          lessonTitle={step.title}
          isKids={isKids}
          onClose={() => setShowReward(false)}
        />
      )}
    </motion.div>
  );
}
