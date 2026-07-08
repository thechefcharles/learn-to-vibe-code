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

  const reversePlayback = (timestamp: number) => {
    if (lastTime === 0) lastTime = timestamp;

    const deltaTime = (timestamp - lastTime) / 1000; // Convert to seconds
    lastTime = timestamp;

    // Move backwards at same speed as forward playback
    video.currentTime -= deltaTime;

    if (video.currentTime <= 0) {
      video.currentTime = 0;
      isReversing = false;
      lastTime = 0;
      video.play();
      if (rafId) cancelAnimationFrame(rafId);
    } else {
      rafId = requestAnimationFrame(reversePlayback);
    }
  };

  const handleEnded = () => {
    isReversing = true;
    video.pause();
    lastTime = 0;
    rafId = requestAnimationFrame(reversePlayback);
  };

  video.addEventListener('ended', handleEnded);

  return () => {
    video.removeEventListener('ended', handleEnded);
    if (rafId) cancelAnimationFrame(rafId);
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
