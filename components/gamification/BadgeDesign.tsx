'use client';

import { SVGProps } from 'react';

type BadgeTier = 'silver' | 'gold' | 'platinum';
type BadgeType = 'lesson' | 'quiz-perfect' | 'quiz-first-try' | 'deliverable' | 'capstone' | 'deployment' | 'production-master' | 'security-master' | 'automation';

interface BadgeProps {
  type: BadgeType;
  tier: BadgeTier;
  size?: 'sm' | 'md' | 'lg';
  showTier?: boolean;
  showLabel?: boolean;
}

const BADGE_COLORS = {
  silver: { bg: '#c0c0c0', accent: '#808080', light: '#e8e8e8' },
  gold: { bg: '#ffd700', accent: '#daa520', light: '#ffed4e' },
  platinum: { bg: '#e5e4e2', accent: '#9966cc', light: '#f5f5f0' },
};

const BADGE_SIZES = {
  sm: 64,
  md: 96,
  lg: 128,
};

const BADGE_ICONS: Record<BadgeType, string> = {
  'lesson': '📖',
  'quiz-perfect': '💯',
  'quiz-first-try': '⚡',
  'deliverable': '✅',
  'capstone': '🏆',
  'deployment': '🚀',
  'production-master': '👑',
  'security-master': '🔐',
  'automation': '⚙️',
};

const BADGE_LABELS: Record<BadgeType, Record<BadgeTier, string>> = {
  'lesson': { silver: 'Showed Up', gold: 'Lesson Master', platinum: 'Flawless' },
  'quiz-perfect': { silver: 'Passing', gold: 'Perfect Score', platinum: 'Quiz Master' },
  'quiz-first-try': { silver: 'Attempt 1', gold: 'No Retakes', platinum: 'Fearless' },
  'deliverable': { silver: 'Submitted', gold: 'Approved', platinum: 'Exemplary' },
  'capstone': { silver: 'Submitted', gold: 'Graded', platinum: 'Showcase' },
  'deployment': { silver: 'First Deploy', gold: '5 Deploys', platinum: 'Deployment Hero' },
  'production-master': { silver: 'Built', gold: 'Production', platinum: 'Master' },
  'security-master': { silver: 'Secure', gold: 'Locked Down', platinum: 'Master' },
  'automation': { silver: 'Built', gold: 'Automated', platinum: 'Master' },
};

export function Badge({ type, tier, size = 'md', showTier = false, showLabel = false }: BadgeProps) {
  const sizePixels = BADGE_SIZES[size];
  const colors = BADGE_COLORS[tier];
  const icon = BADGE_ICONS[type];
  const label = BADGE_LABELS[type][tier];

  return (
    <div className="flex flex-col items-center gap-2">
      <svg
        width={sizePixels}
        height={sizePixels}
        viewBox="0 0 128 128"
        className="drop-shadow-lg"
      >
        {/* Outer ring */}
        <circle cx="64" cy="64" r="60" fill={colors.bg} stroke={colors.accent} strokeWidth="2" />

        {/* Inner circle with gradient */}
        <defs>
          <radialGradient id={`grad-${tier}`} cx="35%" cy="35%">
            <stop offset="0%" stopColor={colors.light} />
            <stop offset="100%" stopColor={colors.bg} />
          </radialGradient>
          <filter id="shadow">
            <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>

        <circle cx="64" cy="64" r="55" fill={`url(#grad-${tier})`} />

        {/* Icon center */}
        <text
          x="64"
          y="72"
          fontSize="48"
          fontWeight="bold"
          textAnchor="middle"
          filter="url(#shadow)"
        >
          {icon}
        </text>

        {/* Tier indicator stars (bottom) */}
        {tier === 'silver' && (
          <circle cx="64" cy="110" r="4" fill={colors.accent} />
        )}
        {tier === 'gold' && (
          <>
            <circle cx="54" cy="110" r="4" fill={colors.accent} />
            <circle cx="64" cy="110" r="4" fill={colors.accent} />
            <circle cx="74" cy="110" r="4" fill={colors.accent} />
          </>
        )}
        {tier === 'platinum' && (
          <>
            <circle cx="44" cy="110" r="4" fill={colors.accent} />
            <circle cx="54" cy="110" r="4" fill={colors.accent} />
            <circle cx="64" cy="110" r="4" fill={colors.accent} />
            <circle cx="74" cy="110" r="4" fill={colors.accent} />
            <circle cx="84" cy="110" r="4" fill={colors.accent} />
          </>
        )}
      </svg>

      {showLabel && (
        <div className="text-center">
          <p className="font-bold text-sm text-gray-900">{label}</p>
          {showTier && <p className="text-xs text-gray-600 capitalize">{tier}</p>}
        </div>
      )}
    </div>
  );
}

export function BadgeGrid({ badges }: { badges: Array<{ type: BadgeType; tier: BadgeTier }> }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {badges.map((badge, idx) => (
        <div key={idx} className="flex justify-center">
          <Badge type={badge.type} tier={badge.tier} size="md" />
        </div>
      ))}
    </div>
  );
}
