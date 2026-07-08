'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (videoRef.current) {
      if (currentTheme === 'violet') {
        videoRef.current.style.opacity = '1';
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.style.opacity = '0';
        videoRef.current.pause();
      }
    }
  }, [currentTheme]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="fixed inset-0 w-full h-full object-cover -z-10 transition-opacity duration-500"
      style={{ opacity: currentTheme === 'violet' ? 1 : 0 }}
    >
      <source src="/bg-purple.mp4" type="video/mp4" />
    </video>
  );
}
