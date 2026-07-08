'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

const VIDEO_SOURCES: Record<string, string> = {
  sage: '/bg-sage.mp4',
};

export function VideoBackground() {
  const sageVideoRef = useRef<HTMLVideoElement>(null);
  const { currentTheme } = useTheme();

  useEffect(() => {
    const sageVideo = sageVideoRef.current;
    if (!sageVideo) return;

    if (currentTheme === 'sage') {
      sageVideo.style.visibility = 'visible';
      sageVideo.style.opacity = '1';
      sageVideo.play().catch(() => {});
    } else {
      sageVideo.style.visibility = 'hidden';
      sageVideo.style.opacity = '0';
      sageVideo.pause();
    }
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
    <video ref={sageVideoRef} muted loop playsInline style={videoStyle}>
      <source src={VIDEO_SOURCES.sage} type="video/mp4" />
    </video>
  );
}
