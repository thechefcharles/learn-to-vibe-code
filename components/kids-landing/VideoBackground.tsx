'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/lib/ThemeContext';

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { currentTheme } = useTheme();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsReady(true);
      if (currentTheme === 'violet') {
        video.play().catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      handleCanPlay();
    } else {
      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, [currentTheme]);

  useEffect(() => {
    if (videoRef.current && isReady) {
      if (currentTheme === 'violet') {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [currentTheme, isReady]);

  return (
    <video
      ref={videoRef}
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
