'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/lib/ThemeContext';

const VIDEO_SOURCES: Record<string, string> = {
  violet: '/bg-purple.mp4',
  sunset: '/bg-orange.mp4',
};

function setupReverseLoop(video: HTMLVideoElement) {
  let isReversing = false;
  let rafId: number | null = null;
  let lastTime = 0;
  let checkId: number | null = null;

  const reversePlayback = (timestamp: number) => {
    if (lastTime === 0) lastTime = timestamp;

    const deltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    video.currentTime -= deltaTime;

    if (video.currentTime <= 0) {
      video.currentTime = 0;
      isReversing = false;
      lastTime = 0;
      video.play().catch(() => {});
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    } else {
      rafId = requestAnimationFrame(reversePlayback);
    }
  };

  const startReverse = () => {
    if (!isReversing && video.duration > 0 && video.currentTime >= video.duration - 0.2) {
      isReversing = true;
      video.pause();
      lastTime = 0;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(reversePlayback);
    }
  };

  const handleEnded = () => {
    startReverse();
  };

  const handleTimeUpdate = () => {
    if (!isReversing && video.duration > 0 && video.currentTime >= video.duration - 0.2) {
      startReverse();
    }
  };

  video.addEventListener('ended', handleEnded);
  video.addEventListener('timeupdate', handleTimeUpdate);

  // Fallback check in case events don't fire
  checkId = window.setInterval(() => {
    if (!isReversing && video.duration > 0 && !video.paused && video.currentTime >= video.duration - 0.1) {
      startReverse();
    }
  }, 100);

  return () => {
    video.removeEventListener('ended', handleEnded);
    video.removeEventListener('timeupdate', handleTimeUpdate);
    if (rafId) cancelAnimationFrame(rafId);
    if (checkId) clearInterval(checkId);
  };
}

export function VideoBackground() {
  const violetVideoRef = useRef<HTMLVideoElement>(null);
  const sunsetVideoRef = useRef<HTMLVideoElement>(null);
  const { currentTheme } = useTheme();

  // Setup reverse loop for both videos
  useEffect(() => {
    if (violetVideoRef.current) {
      return setupReverseLoop(violetVideoRef.current);
    }
  }, []);

  useEffect(() => {
    if (sunsetVideoRef.current) {
      return setupReverseLoop(sunsetVideoRef.current);
    }
  }, []);

  useEffect(() => {
    const violetVideo = violetVideoRef.current;
    const sunsetVideo = sunsetVideoRef.current;
    if (!violetVideo || !sunsetVideo) return;

    if (currentTheme === 'violet') {
      violetVideo.style.visibility = 'visible';
      violetVideo.style.opacity = '1';
      violetVideo.play().catch(() => {});
      sunsetVideo.style.visibility = 'hidden';
      sunsetVideo.style.opacity = '0';
      sunsetVideo.pause();
    } else if (currentTheme === 'sunset') {
      sunsetVideo.style.visibility = 'visible';
      sunsetVideo.style.opacity = '1';
      sunsetVideo.play().catch(() => {});
      violetVideo.style.visibility = 'hidden';
      violetVideo.style.opacity = '0';
      violetVideo.pause();
    } else {
      violetVideo.style.visibility = 'hidden';
      violetVideo.style.opacity = '0';
      violetVideo.pause();
      sunsetVideo.style.visibility = 'hidden';
      sunsetVideo.style.opacity = '0';
      sunsetVideo.pause();
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
    <>
      <video ref={violetVideoRef} muted playsInline style={videoStyle}>
        <source src={VIDEO_SOURCES.violet} type="video/mp4" />
      </video>
      <video ref={sunsetVideoRef} muted playsInline style={videoStyle}>
        <source src={VIDEO_SOURCES.sunset} type="video/mp4" />
      </video>
    </>
  );
}
