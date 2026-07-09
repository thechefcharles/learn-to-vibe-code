'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function InviteWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = 'https://learntovibecode.io';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 240;
    canvas.height = 80;

    // Create tie-dye gradient for scratch box
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#a78bfa');
    gradient.addColorStop(0.33, '#ec4899');
    gradient.addColorStop(0.66, '#06b6d4');
    gradient.addColorStop(1, '#a78bfa');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add texture
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 15;
      data[i + 3] = Math.max(0, data[i + 3] - noise);
    }
    ctx.putImageData(imageData, 0, 0);

    // Add text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch To Reveal', canvas.width / 2, canvas.height / 2);
  }, []);

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

    // Scratch with brush
    ctx.clearRect(x - 18, y - 18, 36, 36);

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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const isRevealed = scratchPercentage > 50;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      {/* Title */}
      <h3 className="text-lg font-semibold text-white uppercase tracking-wide">
        share the vibe
      </h3>

      {/* Scratch box container */}
      <div className="relative">
        {/* Scratch canvas */}
        <canvas
          ref={canvasRef}
          onMouseEnter={() => setIsDrawing(true)}
          onMouseLeave={() => setIsDrawing(false)}
          onMouseMove={handleScratch}
          onTouchStart={() => setIsDrawing(true)}
          onTouchEnd={() => setIsDrawing(false)}
          onTouchMove={handleScratch}
          className="rounded-lg transition-all"
          style={{ cursor: isRevealed ? 'pointer' : 'crosshair' }}
        />

        {/* Revealed content - link + copy button */}
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-4"
          >
            <div className="px-3 py-1.5 rounded-full bg-white/10 border border-white/30">
              <p className="text-xs text-white font-semibold tracking-wide">
                learntovibecode.io
              </p>
            </div>

            <motion.button
              onClick={handleCopyLink}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400/40 to-purple-500/40 border border-cyan-300/60 text-white font-semibold text-xs hover:border-cyan-200/100 hover:shadow-lg hover:shadow-cyan-400/50 transition-all"
            >
              {copied ? '✨ Link Copied' : 'Copy link'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
