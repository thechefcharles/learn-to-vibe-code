'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface CursorTrackedModuleArcProps {
  totalModules?: number; // Default 16
}

export function CursorTrackedModuleArc({ totalModules = 16 }: CursorTrackedModuleArcProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentModule, setCurrentModule] = useState(0);
  const [arcPercentage, setArcPercentage] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Cursor tracking logic
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate angle relative to arc center
      const centerX = rect.width / 2;
      const centerY = rect.height * 0.6; // Arc center (lower part)

      let angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      // Adjust angle: -180 (left) to 0 (right) to 180 (left again)
      // Map 0° (right) to 180° (left) as 0–100% of arc (left to right)
      if (angle < 0) angle += 360;
      angle = (angle - 180) % 360; // Rotate so left is 0

      // Clamp to 0–180° (left to right arc)
      angle = Math.max(0, Math.min(180, angle));
      const percentage = (angle / 180) * 100;

      // Map percentage to module number (0–16)
      const module = Math.round((percentage / 100) * totalModules);

      setCurrentModule(Math.min(module, totalModules));
      setArcPercentage(percentage);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [totalModules]);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto h-64">
      {/* Static label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          {currentModule}
        </div>
        <div className="text-gray-300 text-sm mt-2">
          {currentModule === 0 && 'Setup'}
          {currentModule === 1 && 'HTML & CSS'}
          {currentModule === 2 && 'JavaScript'}
          {currentModule === 3 && 'AI Collaboration'}
          {currentModule === 4 && 'React Basics'}
          {currentModule === 5 && 'Components & State'}
          {currentModule === 6 && 'Design & UX'}
          {currentModule === 7 && 'Databases'}
          {currentModule === 8 && 'Full Stack'}
          {currentModule === 9 && 'APIs & Integration'}
          {currentModule === 10 && 'Deployment'}
          {currentModule === 11 && 'Security & Auth'}
          {currentModule === 12 && 'Production Ready'}
          {currentModule === 13 && 'Testing'}
          {currentModule === 14 && 'Frameworks'}
          {currentModule === 15 && 'Future of Coding'}
          {currentModule === 16 && 'Capstone'}
        </div>
      </div>

      {/* SVG Arc */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
        {/* Background arc (gray) */}
        <path
          d="M 50 150 A 150 150 0 0 1 350 150"
          stroke="rgba(107, 114, 128, 0.3)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
        />

        {/* Filled arc (gradient, animated if motion allowed) */}
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" /> {/* cyan */}
            <stop offset="100%" stopColor="#a855f7" /> {/* purple */}
          </linearGradient>
        </defs>

        <path
          d="M 50 150 A 150 150 0 0 1 350 150"
          stroke="url(#arcGradient)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${(arcPercentage / 100) * 314} 314`} // 314 ≈ arc length
          style={prefersReducedMotion ? {} : { transition: 'stroke-dasharray 100ms ease-out' }}
        />

        {/* Center dot (follows current position) */}
        <circle
          cx={50 + (arcPercentage / 100) * 300}
          cy="150"
          r="8"
          fill="currentColor"
          className="text-cyan-400"
        />
      </svg>

      {/* Year labels */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-4 text-xs text-gray-400">
        <span>Module 0</span>
        <span>Module 16</span>
      </div>
    </div>
  );
}
