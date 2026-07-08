'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ParticleEffectProps {
  trigger: boolean;
  count?: number;
  color?: string;
  duration?: number;
}

interface Particle {
  id: string;
  angle: number;
  distance: number;
}

export const ParticleEffect: React.FC<ParticleEffectProps> = ({
  trigger,
  count = 8,
  color = '#00d9ff',
  duration = 1,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Trigger particle burst when trigger prop changes
  useEffect(() => {
    if (!trigger) return;

    // Generate particles in radial burst pattern
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2; // 0° to 360°
      const distance = 60 + Math.random() * 40; // 60-100px random distance

      return {
        id: `particle-${Date.now()}-${i}`,
        angle,
        distance,
      };
    });

    setParticles(newParticles);

    // Auto-cleanup: remove particles from DOM after animation completes
    const cleanupTimer = setTimeout(() => {
      setParticles([]);
    }, duration * 1000 + 50); // Small buffer to ensure animation completes

    return () => clearTimeout(cleanupTimer);
  }, [trigger, count, duration]);

  if (prefersReducedMotion || particles.length === 0) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ perspective: '1000px' }}
    >
      {particles.map((particle) => {
        const x = Math.cos(particle.angle) * particle.distance;
        const y = Math.sin(particle.angle) * particle.distance;

        return (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: color,
              left: '50%',
              top: '50%',
              marginLeft: '-4px',
              marginTop: '-4px',
              boxShadow: `0 0 8px ${color}`,
            }}
            initial={{
              x: 0,
              y: 0,
              opacity: 1,
              scale: 1,
            }}
            animate={{
              x,
              y,
              opacity: 0,
              scale: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration,
              ease: 'easeOut',
            }}
          />
        );
      })}
    </div>
  );
};

export default ParticleEffect;
