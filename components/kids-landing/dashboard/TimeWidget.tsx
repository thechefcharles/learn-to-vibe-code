'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function TimeWidget() {
  const [hours, setHours] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [speed, setSpeed] = useState(1);
  const timeRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    let animationId: number;

    const animate = () => {
      if (!isPaused && !isHovering) {
        const now = Date.now();
        const deltaMs = now - lastTimeRef.current;
        lastTimeRef.current = now;

        timeRef.current += (deltaMs / 1000) * speed * 5;
        if (timeRef.current >= 93) {
          timeRef.current = timeRef.current - 93;
        }

        setHours(Math.floor(timeRef.current));
      } else {
        lastTimeRef.current = Date.now();
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused, isHovering, speed]);

  const percentage = (hours / 93) * 100;
  const circumference = 2 * Math.PI * 85;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h3 className="text-2xl font-bold uppercase tracking-wide mb-6 bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Course Duration
      </h3>

      <motion.div
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => setIsPaused(!isPaused)}
        className="cursor-pointer group relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      >
        <svg className="w-40 h-40" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#A78BFA" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="rgba(107, 114, 128, 0.2)"
            strokeWidth="3"
          />

          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r="85"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.1, ease: 'linear' }}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: '100px 100px',
            }}
          />

          {/* Background "93" */}
          <text
            x="100"
            y="110"
            textAnchor="middle"
            fontSize="72"
            fontWeight="bold"
            fill="rgba(107, 114, 128, 0.1)"
            fontFamily="monospace"
          >
            93
          </text>

          {/* Hour markers */}
          {[0, 15, 30, 45, 60, 75, 90].map((h) => {
            const angle = (h / 93) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + 85 * Math.cos(rad);
            const y1 = 100 + 85 * Math.sin(rad);
            const x2 = 100 + 72 * Math.cos(rad);
            const y2 = 100 + 72 * Math.sin(rad);
            return (
              <line
                key={h}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(107, 114, 128, 0.4)"
                strokeWidth="1"
              />
            );
          })}
        </svg>

        {/* Center content - positioned absolutely to avoid overlap */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.div
            animate={{
              scale: isHovering ? 1.8 : 1,
              opacity: isHovering ? 1 : 1,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="font-bold text-cyan-300 font-mono leading-none"
            style={{
              fontSize: isHovering ? '56px' : '32px',
            }}
          >
            {isHovering ? '93' : hours}
          </motion.div>
        </div>

        {/* Pause indicator */}
        {isPaused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-cyan-300 font-semibold"
          >
            Paused
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
