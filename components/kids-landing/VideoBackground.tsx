'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentTheme === 'violet') {
      video.style.visibility = 'visible';
      video.style.opacity = '1';
      video.play().catch(() => {});
    } else {
      video.style.visibility = 'hidden';
      video.style.opacity = '0';
      video.pause();
    }
  }, [currentTheme]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -10,
        visibility: 'hidden',
        opacity: 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      <source src="/bg-purple.mp4" type="video/mp4" />
    </video>
  );
}
