'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CursorTrackedModuleArc } from '../CursorTrackedModuleArc';

interface ModuleArcWidgetProps {
  userName?: string;
  onUserNameChange?: (name: string) => void;
}

export function ModuleArcWidget({ userName = '', onUserNameChange }: ModuleArcWidgetProps) {
  const [titleHover, setTitleHover] = useState(false);
  return (
    <div className="flex flex-col items-center justify-between h-full w-full overflow-visible">
      {/* Title at top with spacing */}
      <div className="pt-1 pb-6">
        <motion.h3
          onMouseEnter={() => setTitleHover(true)}
          onMouseLeave={() => setTitleHover(false)}
          animate={{
            scale: titleHover ? 1.3 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="uppercase tracking-wide cursor-pointer font-bold text-center"
          style={{
            fontSize: titleHover ? '28px' : '20px',
            background: titleHover
              ? 'linear-gradient(to right, rgb(34, 211, 238), rgb(168, 85, 247), rgb(236, 72, 153))'
              : 'transparent',
            backgroundClip: titleHover ? 'text' : 'unset',
            WebkitBackgroundClip: titleHover ? 'text' : 'unset',
            WebkitTextFillColor: titleHover ? 'transparent' : 'white',
            color: titleHover ? 'transparent' : 'white',
            transformOrigin: 'center',
          }}
        >16 Modules</motion.h3>
      </div>

      {/* Arc Container - pushed down, centered horizontally */}
      <div className="flex-1 w-full flex items-center justify-center overflow-visible">
        <CursorTrackedModuleArc totalModules={16} />
      </div>

      {/* Welcome text above input */}
      <div className="w-full text-center mb-2 mt-2">
        <p className="text-xs uppercase tracking-widest opacity-40 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
          Welcome, {userName || 'Guest'}
        </p>
      </div>

      {/* Input Box at bottom */}
      <div className="w-full pt-2">
        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/10 transition-all">
          <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Input:</p>
          <div className="font-mono text-sm text-cyan-300 break-words">
            greet("<span className="inline-block"><input
              type="text"
              value={userName}
              onChange={(e) => onUserNameChange?.(e.target.value)}
              placeholder="your name"
              className="bg-transparent border-0 p-0 w-auto max-w-24 text-cyan-300 font-mono text-sm focus:outline-none focus:ring-0 placeholder-cyan-300/70"
            /></span>")
          </div>
        </div>
      </div>
    </div>
  );
}
