'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function InviteWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/landing-kids`
    : 'https://learn-to-vibe-code.vercel.app/landing-kids';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    // Create scratch overlay with tie-dye inspired texture
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#a78bfa');
    gradient.addColorStop(0.25, '#ec4899');
    gradient.addColorStop(0.5, '#06b6d4');
    gradient.addColorStop(0.75, '#a78bfa');
    gradient.addColorStop(1, '#ec4899');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add some noise/texture
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 20;
      data[i + 3] = Math.max(0, data[i + 3] - noise);
    }
    ctx.putImageData(imageData, 0, 0);

    // Add text overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('scratch to reveal', canvas.width / 2, canvas.height / 2);
  }, []);

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Scratch with larger brush
    ctx.clearRect(x - 20, y - 20, 40, 40);

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let scratched = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 128) scratched++;
    }
    const percentage = (scratched / (data.length / 4)) * 100;
    setScratchPercentage(percentage);
  };

  const handleMouseDown = () => setIsDrawing(true);
  const handleMouseUp = () => setIsDrawing(false);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Container with tie-dye background */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 25%, #06b6d4 50%, #a78bfa 75%, #ec4899 100%)',
          backgroundSize: '400% 400%',
        }}
      >
        {/* Tie-dye animated background */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 25%, #06b6d4 50%, #a78bfa 75%, #ec4899 100%)',
            backgroundSize: '400% 400%',
          }}
        />

        {/* Share link content underneath */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0 p-6">
          <p className="text-sm text-white/60 mb-3">your share link:</p>
          <p className="text-xs font-mono text-white/80 text-center break-all px-2">{shareUrl}</p>
          <motion.p
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-4 text-lg font-bold text-white"
          >
            share the vibe
          </motion.p>
        </div>

        {/* Scratch-off canvas overlay */}
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleScratch}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleScratch}
          className="absolute inset-0 cursor-pointer z-10"
          style={{ cursor: isDrawing ? 'grabbing' : 'grab' }}
        />

        {/* Scratch progress indicator */}
        {scratchPercentage > 0 && scratchPercentage < 100 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60 z-20"
          >
            {Math.round(scratchPercentage)}% scratched
          </motion.div>
        )}

        {/* Reveal celebration */}
        {scratchPercentage > 60 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          >
            <motion.div
              animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 360, 0] }}
              transition={{ duration: 1 }}
              className="text-4xl"
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
