'use client';

import React, { useState, useEffect } from 'react';
import { getSoundEnabled, setSoundEnabled } from '@/lib/sounds';

export const SoundToggle: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
      className="fixed top-6 right-6 z-50 px-4 py-2 rounded-lg font-semibold text-white text-lg transition-transform hover:scale-105 active:scale-95 bg-gradient-to-r from-cyan-400 to-purple-500 shadow-lg hover:shadow-xl"
      title={isEnabled ? 'Sound: On' : 'Sound: Off'}
    >
      <span className="inline-block">
        {isEnabled ? '🔊' : '🔇'}
      </span>
    </button>
  );
};

export default SoundToggle;
