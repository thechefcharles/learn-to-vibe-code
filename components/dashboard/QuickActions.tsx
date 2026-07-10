'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface QuickActionsProps {
  capstoneUnlocked: boolean;
  completedModules: number;
}

export function QuickActions({ capstoneUnlocked, completedModules }: QuickActionsProps) {
  const prefersReducedMotion = useReducedMotion();

  const actions = [
    {
      label: 'Continue Learning',
      icon: '▶',
      href: '/course',
      color: 'from-cyan-500 to-blue-600',
      subtext: 'Jump back in',
    },
    {
      label: 'View Badges',
      icon: '🏆',
      href: '/dashboard/badges',
      color: 'from-purple-500 to-pink-600',
      subtext: `${completedModules} earned`,
    },
    ...(capstoneUnlocked
      ? [
          {
            label: 'Capstone Project',
            icon: '🎯',
            href: '/capstone',
            color: 'from-green-500 to-emerald-600',
            subtext: 'Final challenge',
          },
        ]
      : []),
    {
      label: 'Profile Settings',
      icon: '⚙',
      href: '/dashboard/settings',
      color: 'from-orange-500 to-red-600',
      subtext: 'Preferences',
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {actions.map((action, idx) => (
        <motion.div
          key={action.label}
          initial={!prefersReducedMotion ? { opacity: 0, x: 20 } : undefined}
          animate={!prefersReducedMotion ? { opacity: 1, x: 0 } : undefined}
          transition={!prefersReducedMotion ? { duration: 0.5, delay: idx * 0.1 } : undefined}
        >
          <Link href={action.href} className="block">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:border-white/40 transition-all hover:bg-white/15 group cursor-pointer">
              <div className="flex items-center gap-3">
                <div
                  className={`text-2xl w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center`}
                >
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm sm:text-base">{action.label}</h4>
                  <p className="text-xs text-gray-400">{action.subtext}</p>
                </div>
                <div className="text-gray-500 group-hover:text-white transition-colors">→</div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
