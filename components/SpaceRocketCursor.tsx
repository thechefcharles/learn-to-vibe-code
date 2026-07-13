'use client';

import { useState, useEffect, useRef } from 'react';

export function SpaceRocketCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isOverBackground, setIsOverBackground] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if mouse is over background (not over content elements)
      let element = document.elementFromPoint(e.clientX, e.clientY) as Element | null;

      let isBackground = false;
      let depth = 0;
      const maxDepth = 10;

      // Check element tree for interactive elements
      while (element && depth < maxDepth) {
        const tagName = element.tagName.toLowerCase();
        const className = element.className?.toString() || '';

        // Skip rocket cursor elements themselves
        if (className.includes('rocket') || className.includes('trail')) {
          element = element.parentElement;
          depth++;
          continue;
        }

        // If we hit interactive elements, it's not background
        if (
          ['a', 'button', 'input', 'textarea', 'select'].includes(tagName) ||
          className.includes('prose') ||
          className.includes('article') ||
          className.includes('rounded-2xl') ||
          className.includes('border')
        ) {
          isBackground = false;
          break;
        }

        // If we hit main content containers
        if (tagName === 'main' || className.includes('min-h-screen')) {
          isBackground = true;
          break;
        }

        element = element.parentElement;
        depth++;
      }

      setIsOverBackground(isBackground);

      // Add trail effect
      if (isBackground) {
        setTrail((prev) => {
          const newTrail = [
            { x: e.clientX, y: e.clientY, id: trailIdRef.current++ },
            ...prev.slice(0, 8),
          ];
          return newTrail;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {isOverBackground && (
        <>
          {/* Trail effect */}
          {trail.map((point, index) => (
            <div
              key={point.id}
              className="fixed pointer-events-none w-2 h-2 rounded-full"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: 'translate(-50%, -50%)',
                opacity: (1 - index / trail.length) * 0.6,
                background: `radial-gradient(circle, rgba(34, 211, 238, ${0.8 - index / trail.length}), rgba(168, 85, 247, ${0.4 - index / trail.length}))`,
                boxShadow: `0 0 ${8 - index}px rgba(34, 211, 238, ${0.6 - index / trail.length})`,
              }}
            />
          ))}

          {/* Rocket */}
          <div
            className="fixed pointer-events-none text-5xl z-[9999]"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: 'translate(-50%, -50%) rotate(-45deg)',
              filter: 'drop-shadow(0 0 12px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 24px rgba(168, 85, 247, 0.6))',
              textShadow: '0 0 20px rgba(34, 211, 238, 0.8)',
            }}
          >
            🚀
          </div>

          {/* Glow effect */}
          <div
            className="fixed pointer-events-none rounded-full z-[9998]"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              transform: 'translate(-50%, -50%)',
              width: '40px',
              height: '40px',
              background:
                'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, rgba(168, 85, 247, 0.2) 70%, transparent 100%)',
              boxShadow: '0 0 40px rgba(34, 211, 238, 0.3), inset 0 0 20px rgba(168, 85, 247, 0.2)',
            }}
          />
        </>
      )}
    </>
  );
}
