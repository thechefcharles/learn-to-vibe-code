'use client';

import { useTheme } from '@/lib/ThemeContext';

const VIDEO_SOURCES: Record<string, string> = {
  violet: '/bg-purple.mp4',
  sage: '/bg-sage.mp4',
  sunset: '/bg-orange.mp4',
};

export function VideoBackground() {
  const { currentTheme } = useTheme();
  const src = VIDEO_SOURCES[currentTheme] ?? VIDEO_SOURCES.violet;

  const videoStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    zIndex: -10,
    filter: 'blur(8px) brightness(0.4)',
  };

  // Render a single <video> for the active theme. `key={src}` forces a fresh
  // element whenever the theme changes, so the new source starts cleanly.
  // `autoPlay muted playsInline` means the browser begins playback on EVERY
  // mount — including client-side navigation back to a page — instead of
  // relying on a post-mount effect calling .play(), which raced on remount and
  // left the background blank until a theme toggle forced a re-render.
  return (
    <video
      key={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      style={videoStyle}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
