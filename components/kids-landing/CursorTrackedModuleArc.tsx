'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface CursorTrackedModuleArcProps {
  totalModules?: number; // Default 16
  externalModule?: number; // Optional external control (0-16)
}

export function CursorTrackedModuleArc({ totalModules = 16, externalModule }: CursorTrackedModuleArcProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ currentModule: externalModule ?? 0, arcPercentage: 0 });
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Cursor tracking with RAF throttling
  useEffect(() => {
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isScheduled = false;

    const updateArc = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = lastMouseX - rect.left;
      const y = lastMouseY - rect.top;

      // Calculate angle relative to arc center
      const centerX = rect.width / 2;
      const centerY = rect.height * 0.6;

      let angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      if (angle < 0) angle += 360;
      angle = (angle - 180) % 360;

      // Clamp to 0–180°
      angle = Math.max(0, Math.min(180, angle));
      const percentage = (angle / 180) * 100;
      const module = Math.round((percentage / 100) * totalModules);

      const newModule = Math.min(module, totalModules);
      const newPercentage = percentage;

      // Update DOM directly if changed
      if (
        stateRef.current.currentModule !== newModule ||
        Math.abs(stateRef.current.arcPercentage - newPercentage) > 1
      ) {
        stateRef.current.currentModule = newModule;
        stateRef.current.arcPercentage = newPercentage;

        // Update text content
        const moduleText = containerRef.current.querySelector('[data-module-text]');
        const moduleLabel = containerRef.current.querySelector('[data-module-label]');
        const dashPath = containerRef.current.querySelector('[data-arc-fill]') as SVGPathElement;

        if (moduleText) moduleText.textContent = String(newModule);
        if (moduleLabel) {
          const labels = [
            'Setup', 'HTML & CSS', 'JavaScript', 'AI Collaboration', 'React Basics',
            'Components & State', 'Design & UX', 'Databases', 'Full Stack',
            'APIs & Integration', 'Deployment', 'Security & Auth', 'Production Ready',
            'Testing', 'Frameworks', 'Future of Coding', 'Capstone',
          ];
          moduleLabel.textContent = labels[newModule] || '';
        }
        if (dashPath) {
          const dashLength = (newPercentage / 100) * 471;
          dashPath.setAttribute('stroke-dasharray', `${dashLength} 471`);
        }

        // Update dot position
        const dot = containerRef.current.querySelector('[data-arc-dot]') as SVGCircleElement;
        if (dot) {
          const dotX = 50 + (newPercentage / 100) * 300;
          dot.setAttribute('cx', String(dotX));
        }
      }

      isScheduled = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      if (!isScheduled) {
        isScheduled = true;
        rafRef.current = requestAnimationFrame(updateArc);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
  }, [totalModules]);

  // Handle external module changes
  useEffect(() => {
    if (externalModule === undefined || !containerRef.current) return;

    const newModule = Math.min(externalModule, totalModules);
    const percentage = (newModule / totalModules) * 100;

    stateRef.current.currentModule = newModule;
    stateRef.current.arcPercentage = percentage;

    // Update DOM
    const moduleText = containerRef.current.querySelector('[data-module-text]');
    const moduleLabel = containerRef.current.querySelector('[data-module-label]');
    const dashPath = containerRef.current.querySelector('[data-arc-fill]') as SVGPathElement;

    if (moduleText) moduleText.textContent = String(newModule);
    if (moduleLabel) {
      const labels = [
        'Setup', 'HTML & CSS', 'JavaScript', 'AI Collaboration', 'React Basics',
        'Components & State', 'Design & UX', 'Databases', 'Full Stack',
        'APIs & Integration', 'Deployment', 'Security & Auth', 'Production Ready',
        'Testing', 'Frameworks', 'Future of Coding', 'Capstone',
      ];
      moduleLabel.textContent = labels[newModule] || '';
    }
    if (dashPath) {
      const dashLength = (percentage / 100) * 471;
      dashPath.setAttribute('stroke-dasharray', `${dashLength} 471`);
    }

    // Update dot position
    const dot = containerRef.current.querySelector('[data-arc-dot]') as SVGCircleElement;
    if (dot) {
      const dotX = 50 + (percentage / 100) * 300;
      dot.setAttribute('cx', String(dotX));
    }
  }, [externalModule, totalModules]);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto h-36">
      {/* Static label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          data-module-text
        >
          0
        </div>
        <div className="text-gray-300 text-sm mt-2" data-module-label>
          Setup
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

        {/* Filled arc (rainbow gradient) */}
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff0000" />
            <stop offset="16.66%" stopColor="#ff7f00" />
            <stop offset="33.33%" stopColor="#ffff00" />
            <stop offset="50%" stopColor="#00ff00" />
            <stop offset="66.66%" stopColor="#0000ff" />
            <stop offset="83.33%" stopColor="#4b0082" />
            <stop offset="100%" stopColor="#9400d3" />
          </linearGradient>
        </defs>

        <path
          data-arc-fill
          d="M 50 150 A 150 150 0 0 1 350 150"
          stroke="url(#arcGradient)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="0 471"
        />

        {/* Center dot (follows current position) */}
        <circle
          data-arc-dot
          cx="50"
          cy="150"
          r="8"
          fill="currentColor"
          className="text-cyan-400"
        />
      </svg>

    </div>
  );
}
