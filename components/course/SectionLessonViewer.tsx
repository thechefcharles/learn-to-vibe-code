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
  const sections = step.sections || [];
  const [sectionIndex, setSectionIndex] = useState(0);
  const [viewedSections, setViewedSections] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState<LessonSectionProgress | null>(null);
  const [showReward, setShowReward] = useState(false);
  const prefersReducedMotion = usePreferredMotion();

  const lessonStorageKey = `lesson-${moduleId}-${step.id}-sections`;

  // Load progress from localStorage on mount
  useEffect(() => {
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
    if (viewedSections.size === sections.length && progress && !progress.rewardClaimed) {
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
        <details className="space-y-2">
          <summary className={`font-semibold cursor-pointer ${
            isKids ? 'text-purple-600' : 'text-cyan-400'
          }`}>
            Hints ({currentSection.hints.length})
          </summary>
          <ul className="space-y-1">
            {currentSection.hints.map((hint, i) => (
              <li key={i} className={`text-sm ${isKids ? 'text-purple-700' : 'text-slate-300'}`}>
                • {hint}
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* Resources */}
      {currentSection.resources && currentSection.resources.length > 0 && (
        <div className={`p-4 rounded-lg border ${
          isKids
            ? 'bg-green-50 border-green-200'
            : 'bg-green-500/10 border-green-500/30'
        }`}>
          <h4 className={`font-semibold mb-3 ${isKids ? 'text-green-900' : 'text-green-300'}`}>
            📚 Resources
          </h4>
          <ul className="space-y-2">
            {currentSection.resources.map((res, i) => (
              <li key={i}>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`underline hover:opacity-80 ${
                    isKids ? 'text-green-700' : 'text-green-400'
                  }`}
                >
                  {res.title} ({res.type})
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Challenge */}
      {currentSection.challenge && (
        <div className={`p-4 rounded-lg border ${
          isKids
            ? 'bg-orange-50 border-orange-200'
            : 'bg-orange-500/10 border-orange-500/30'
        }`}>
          <h4 className={`font-semibold mb-2 ${isKids ? 'text-orange-900' : 'text-orange-300'}`}>
            🎯 Challenge
          </h4>
          <p className={`mb-3 ${isKids ? 'text-orange-800' : 'text-orange-200'}`}>
            {currentSection.challenge.description}
          </p>
          <div className={`text-sm p-2 rounded ${
            isKids ? 'bg-orange-100 text-orange-900' : 'bg-orange-900/30 text-orange-300'
          }`}>
            <div className="font-semibold">Action:</div>
            {currentSection.challenge.action}
          </div>
        </div>
      )}

      {/* Viewed status indicator */}
      <div className={`text-xs ${isKids ? 'text-purple-600' : 'text-slate-400'}`}>
        {allSectionsViewed ? '✓ All sections completed' : `${viewedSections.size} of ${sections.length} sections viewed`}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-6 border-t border-slate-700">
        <motion.button
          onClick={() => setSectionIndex(Math.max(0, sectionIndex - 1))}
          disabled={isFirstSection}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${
            isFirstSection
              ? 'opacity-50 cursor-not-allowed'
              : isKids
              ? 'bg-purple-500 text-white hover:bg-purple-600'
              : 'bg-slate-700 text-white hover:bg-slate-600'
          }`}
        >
          ← Back
        </motion.button>

        {isLastSection ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!allSectionsViewed}
            className={`ml-auto px-4 py-2 rounded-lg font-semibold transition-all ${
              allSectionsViewed
                ? isKids
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                  : 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700'
                : 'opacity-50 cursor-not-allowed'
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
