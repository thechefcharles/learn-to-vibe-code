'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

const VIDEO_SOURCES: Record<string, string> = {
  violet: '/bg-purple.mp4',
  sage: '/bg-sage.mp4',
  sunset: '/bg-orange.mp4',
};

export function VideoBackground() {
  const videoRefs = {
    violet: useRef<HTMLVideoElement>(null),
    sage: useRef<HTMLVideoElement>(null),
    sunset: useRef<HTMLVideoElement>(null),
  };
  const { currentTheme } = useTheme();

  useEffect(() => {
    const themes = Object.keys(videoRefs) as Array<keyof typeof videoRefs>;
    themes.forEach((theme) => {
      const video = videoRefs[theme].current;
      if (!video) return;

      if (theme === currentTheme) {
        video.style.visibility = 'visible';
        video.style.opacity = '1';
        video.play().catch(() => {});
      } else {
        video.style.visibility = 'hidden';
        video.style.opacity = '0';
        video.pause();
      }
    });
  }, [currentTheme]);

  const videoStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    zIndex: -10,
    visibility: 'hidden' as const,
    opacity: 0,
    transition: 'opacity 0.5s ease-in-out',
  };

  return (
    <>
      <video ref={videoRefs.violet} muted loop playsInline style={videoStyle}>
        <source src={VIDEO_SOURCES.violet} type="video/mp4" />
      </video>
      <video ref={videoRefs.sage} muted loop playsInline style={videoStyle}>
        <source src={VIDEO_SOURCES.sage} type="video/mp4" />
      </video>
      <video ref={videoRefs.sunset} muted loop playsInline style={videoStyle}>
        <source src={VIDEO_SOURCES.sunset} type="video/mp4" />
      </video>
    </>
  );
}
