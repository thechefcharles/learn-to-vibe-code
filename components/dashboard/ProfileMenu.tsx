'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signOutAction } from '@/lib/actions/auth';

interface ProfileMenuProps {
  userName: string;
}

export function ProfileMenu({ userName }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    await signOutAction();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
      >
        {getInitial(userName)}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-50"
        >
          <div className="p-4 border-b border-white/10">
            <p className="text-white font-semibold text-sm truncate">{userName}</p>
          </div>

          <div className="py-2">
            <Link
              href="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-white hover:bg-white/10 transition-colors text-sm font-semibold text-cyan-400 border-b border-white/10"
            >
              📊 Dashboard
            </Link>
            <Link
              href="/dashboard/settings"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-white hover:bg-white/10 transition-colors text-sm"
            >
              ⚙️ Settings
            </Link>
            <Link
              href="/dashboard/badges"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-white hover:bg-white/10 transition-colors text-sm"
            >
              🏆 Badges
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                handleSignOut();
              }}
              className="w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors text-sm"
            >
              🚪 Sign Out
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
