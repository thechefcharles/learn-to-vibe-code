'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (currentTheme === 'violet') {
        video.play().catch(() => {});
      }
    };

    if (currentTheme === 'violet') {
      video.style.visibility = 'visible';
      video.style.opacity = '1';
      if (video.readyState >= 1) {
        video.play().catch(() => {});
      }
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    } else {
      video.style.visibility = 'hidden';
      video.style.opacity = '0';
      video.pause();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [currentTheme, mounted]);

  if (!mounted) return null;

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="auto"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: -10,
        visibility: currentTheme === 'violet' ? 'visible' : 'hidden',
        opacity: currentTheme === 'violet' ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        pointerEvents: 'none',
      }}
    >
      <source src="/bg-purple.mp4" type="video/mp4" />
    </video>
  );
}
