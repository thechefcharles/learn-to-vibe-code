'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ProfileMenu } from '@/components/dashboard/ProfileMenu';
import { usePreferredMotion } from '@/lib/hooks/usePreferredMotion';
import type { User } from '@supabase/supabase-js';

interface MobileMenuBurgerProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export function MobileMenuBurger({
  isOpen,
  onClose,
  user,
}: MobileMenuBurgerProps) {
  const prefersReducedMotion = usePreferredMotion();

  const menuItems = [
    { label: 'Course Map', href: '/course' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Capstone', href: '/capstone' },
    { label: 'Support', href: '/support' },
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Drawer Menu */}
          <motion.nav
            className="fixed top-0 right-0 bottom-0 w-72 bg-gradient-to-b from-slate-900 to-slate-800 border-l border-white/10 z-30 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              ease: 'easeOut',
            }}
          >
            {/* Close Button */}
            <div className="sticky top-0 flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/50">
              <h2 className="text-sm font-semibold text-white">Menu</h2>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-200 transition-colors"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.2,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-4 my-2 border-t border-white/10" />

            {/* Profile Section */}
            <div className="p-4 space-y-3">
              {user ? (
                <>
                  <div className="px-4 py-2 text-xs text-slate-400">
                    Signed in as
                  </div>
                  <div className="px-4 py-2 text-sm font-semibold text-white truncate">
                    {user.email?.split('@')[0] || 'User'}
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <ProfileMenu
                      userName={user.email?.split('@')[0] || 'User'}
                    />
                  </div>
                </>
              ) : (
                <Link
                  href="/auth/sign-in"
                  onClick={handleLinkClick}
                  className="block w-full px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all text-center"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
