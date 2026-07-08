'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import Link from 'next/link';
import { playSound } from '@/lib/sounds';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface ProjectData {
  id: string;
  name: string;
  builderName: string;
  builderAge: number;
  description: string;
  techStack: string[];
  stats: string;
  link: string;
}

interface RotatableProjectCardProps {
  project: ProjectData;
}

export const RotatableProjectCard: React.FC<RotatableProjectCardProps> = ({
  project,
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Detect touch capability on mount
  useEffect(() => {
    setIsTouchDevice(() => {
      return (
        typeof window !== 'undefined' &&
        (window.matchMedia('(pointer:coarse)').matches ||
          ('ontouchstart' in window) ||
          (navigator as any).maxTouchPoints > 0)
      );
    });
  }, []);

  // Handle mouse down for drag
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  // Handle touch start for drag
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 0) return;
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  // Handle mouse/touch move for drag rotation
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientY - dragStart.y;
      const deltaY = e.clientX - dragStart.x;

      // Scale sensitivity: every 2 pixels = 1 degree
      const sensitivity = 0.5;
      setRotation((prev) => ({
        x: prev.x + deltaX * sensitivity,
        y: prev.y + deltaY * sensitivity,
      }));

      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const deltaX = e.touches[0].clientY - dragStart.y;
      const deltaY = e.touches[0].clientX - dragStart.x;

      // Scale sensitivity: every 2 pixels = 1 degree
      const sensitivity = 0.5;
      setRotation((prev) => ({
        x: prev.x + deltaX * sensitivity,
        y: prev.y + deltaY * sensitivity,
      }));

      setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, dragStart]);

  // Handle keyboard rotation (arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!cardRef.current || !cardRef.current.contains(document.activeElement)) {
        return;
      }

      const ROTATION_STEP = 10; // degrees per keypress

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setRotation((prev) => ({ ...prev, x: prev.x - ROTATION_STEP }));
          playSound('click');
          break;
        case 'ArrowDown':
          e.preventDefault();
          setRotation((prev) => ({ ...prev, x: prev.x + ROTATION_STEP }));
          playSound('click');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setRotation((prev) => ({ ...prev, y: prev.y - ROTATION_STEP }));
          playSound('click');
          break;
        case 'ArrowRight':
          e.preventDefault();
          setRotation((prev) => ({ ...prev, y: prev.y + ROTATION_STEP }));
          playSound('click');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Perspective 3D transform
  const transform3D = `perspective(1200px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

  return (
    <motion.div
      ref={cardRef}
      tabIndex={0}
      className="group relative focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black rounded-xl transition-transform duration-200"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => !prefersReducedMotion && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 30,
      }}
      style={{
        transform: prefersReducedMotion ? 'none' : transform3D,
        transformStyle: 'preserve-3d',
        cursor: isTouchDevice ? 'default' : isDragging ? 'grabbing' : 'grab',
      }}
    >
      <MotionConfig reducedMotion="user">
        {/* Card container */}
        <motion.div
          className="w-full max-w-sm bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl overflow-hidden border border-cyan-400/30 shadow-2xl"
          animate={
            isHovered && !prefersReducedMotion
              ? { boxShadow: '0 0 32px rgba(0, 217, 255, 0.4)' }
              : { boxShadow: '0 20px 25px rgba(0, 0, 0, 0.3)' }
          }
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 20,
          }}
        >
          {/* Gradient accent top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 opacity-60" />

          {/* Project header */}
          <div className="p-6 pb-4">
            <motion.h3
              className="text-2xl font-bold text-cyan-400 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {project.name}
            </motion.h3>

            <motion.p
              className="text-sm text-white/70 mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              Built by <span className="text-purple-300 font-semibold">{project.builderName}</span>, age {project.builderAge}
            </motion.p>
          </div>

          {/* Divider */}
          <div className="px-6 py-0">
            <div className="h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/30 to-cyan-400/0" />
          </div>

          {/* Description */}
          <div className="px-6 py-4">
            <motion.p
              className="text-white/85 text-sm leading-relaxed mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {project.description}
            </motion.p>

            {/* Tech stack */}
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <p className="text-xs text-white/60 font-semibold mb-2 uppercase tracking-wide">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    className="inline-block px-3 py-1 bg-cyan-400/10 border border-cyan-400/40 text-cyan-300 text-xs font-medium rounded-full hover:bg-cyan-400/20 hover:border-cyan-400/60 transition-colors"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 + idx * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="p-3 bg-white/5 rounded-lg border border-white/10 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-sm text-white/70">
                <span className="text-cyan-400 font-semibold">{project.stats}</span>
              </p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <div className="px-6 pb-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-bold rounded-lg text-center transition-all duration-300 hover:from-cyan-400 hover:to-cyan-300 hover:shadow-lg hover:shadow-cyan-400/30 active:scale-95 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-base"
              >
                See Project →
              </Link>
            </motion.div>
          </div>

          {/* Subtle drag hint */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 rounded-xl border border-cyan-400/20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={isDragging ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.div>
      </MotionConfig>

      {/* Drag hint text (show on focus or hover, desktop only) */}
      {!prefersReducedMotion && !isTouchDevice && (
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-xs text-white/50 font-medium whitespace-nowrap pointer-events-none"
          initial={{ opacity: 0, y: -5 }}
          animate={
            isHovered || document.activeElement === cardRef.current
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: -5 }
          }
          transition={{ duration: 0.2 }}
        >
          Drag to rotate • Arrow keys for 10°
        </motion.div>
      )}
    </motion.div>
  );
};

export default RotatableProjectCard;
