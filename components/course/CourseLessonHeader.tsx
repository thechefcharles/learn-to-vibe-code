'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from '@/components/Logo';
import { ProfileMenu } from '@/components/dashboard/ProfileMenu';
import { usePreferredMotion } from '@/lib/hooks/usePreferredMotion';
import { useCoursePageContext } from '@/components/course/CoursePageInteractive';
import type { User } from '@supabase/supabase-js';

interface CourseLessonHeaderProps {
  moduleId: string;
  lessonTitle: string;
  user: User | null;
  version?: "kids" | "adult";
}

export function CourseLessonHeader({
  moduleId,
  lessonTitle,
  user,
  version = "adult",
}: CourseLessonHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = usePreferredMotion();
  const { setMobileMenuOpen } = useCoursePageContext();

  const handleMobileMenuToggle = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    setMobileMenuOpen(newState);
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-gradient-to-b from-slate-900/95 to-slate-900/80 backdrop-blur-lg overflow-visible">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Logo */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2 hover:opacity-80 transition"
              title="Back to Dashboard"
            >
              <div className="scale-75 sm:scale-100">
                <Logo variant="cosmic-mark" size="sm" />
              </div>
            </Link>

            {/* Right: Profile Menu */}
            <div className="flex items-center justify-end gap-2 sm:gap-4 flex-shrink-0">
              {/* Profile Menu (if logged in) */}
              {user && (
                <div className="hidden sm:block">
                  <ProfileMenu userName={user.email?.split('@')[0] || 'User'} />
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={handleMobileMenuToggle}
                className="md:hidden flex flex-col gap-1.5 w-6 h-6 items-center justify-center hover:opacity-70 transition"
                aria-label="Toggle menu"
                title="Menu"
              >
                <motion.span
                  className="w-5 h-0.5 bg-white/80 rounded-full block"
                  animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-white/80 rounded-full block"
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-white/80 rounded-full block"
                  animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>


      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.nav
          role="navigation"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="md:hidden fixed top-0 left-0 right-0 z-50 pt-32 bg-slate-900/95 backdrop-blur-lg border-b border-white/10 pointer-events-auto"
        >
          <div className="max-w-7xl mx-auto px-3 py-4 flex flex-col gap-3">
            {/* Profile Menu in Mobile Menu */}
            {user ? (
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <span className="text-xs text-slate-400">Profile:</span>
                <ProfileMenu userName={user.email?.split('@')[0] || 'User'} />
              </div>
            ) : (
              <Link
                href="/auth/sign-in"
                className="text-sm text-blue-400 hover:text-blue-300 transition py-2"
              >
                Sign In
              </Link>
            )}
          </div>
        </motion.nav>
      )}
    </>
  );
}
