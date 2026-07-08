'use client';

import React, { useState, useEffect } from 'react';
import { getSoundEnabled, setSoundEnabled } from '@/lib/sounds';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const SoundToggle: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Initialize from localStorage on mount (hydration-safe)
  useEffect(() => {
    setIsEnabled(getSoundEnabled());
    setIsMounted(true);
  }, []);

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    setSoundEnabled(newState);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={isEnabled ? 'Mute sound' : 'Unmute sound'}
      className={`fixed top-4 left-56 z-50 w-14 h-14 md:w-auto md:h-auto md:px-4 md:py-2 rounded-lg font-semibold text-white text-lg bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg flex items-center justify-center md:inline-flex ${!prefersReducedMotion ? 'transition-transform hover:scale-105 active:scale-95 hover:shadow-xl' : ''}`}
      title={isEnabled ? 'Sound: On' : 'Sound: Off'}
    >
      <span className="inline-block text-2xl md:text-lg">
        {isEnabled ? '🔊' : '🔇'}
      </span>
    </button>
  );
};

export default SoundToggle;
