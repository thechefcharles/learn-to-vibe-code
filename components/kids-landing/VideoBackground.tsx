'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

const VIDEO_SOURCES: Record<string, string> = {
  violet: '/bg-purple.mp4',
  sage: '/bg-sage.mp4',
  sunset: '/bg-orange.mp4',
};

export function VideoBackground() {
  const { currentTheme } = useTheme();
  const refs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Pure optimization: keep the active theme's video playing and pause the
  // rest so we don't decode three videos at once. Crucially, this effect does
  // NOT control visibility — opacity is set declaratively below from
  // currentTheme — so even if a play() call rejects on remount, the correct
  // video is still shown. That's what fixes the "blank background after
  // re-navigation" bug while preserving the crossfade.
  useEffect(() => {
    Object.entries(refs.current).forEach(([theme, video]) => {
      if (!video) return;
      if (theme === currentTheme) video.play().catch(() => {});
      else video.pause();
    });
  }, [currentTheme]);

  const baseStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    zIndex: -10,
    filter: 'blur(8px) brightness(0.4)',
    transition: 'opacity 0.6s ease-in-out',
  };

  return (
    <>
      {Object.entries(VIDEO_SOURCES).map(([theme, src]) => (
        <video
          key={theme}
          ref={(el) => {
            refs.current[theme] = el;
          }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ ...baseStyle, opacity: currentTheme === theme ? 1 : 0 }}
        >
          <source src={src} type="video/mp4" />
        </video>
      ))}
    </>
  );
}
