'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CursorTrackedModuleArc } from '../CursorTrackedModuleArc';

export function ModuleArcWidget() {
  const [titleHover, setTitleHover] = useState(false);
  return (
    <div className="flex flex-col items-center justify-start h-full w-full overflow-visible">
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
    </div>
  );
}
