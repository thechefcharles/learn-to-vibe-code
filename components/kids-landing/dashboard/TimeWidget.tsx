'use client';

import { useEffect, useRef, useState } from 'react';

export function TimeWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const speedRef = useRef(1);
  const hoursRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const deltaTime = (now - lastTime) / 1000;
      lastTime = now;

      // Update hours based on speed (hover slows, click speeds up)
      if (!isHovering) {
        hoursRef.current += (deltaTime * speedRef.current);
      }
      if (hoursRef.current >= 93) {
        hoursRef.current = 0;
      }

      const size = canvas.width / 2;
      const centerX = size;
      const centerY = size;
      const radius = size * 0.75;

      // Clear canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw outer circle with glow
      ctx.shadowColor = 'rgba(6, 182, 212, 0.3)';
      ctx.shadowBlur = 12;
      ctx.strokeStyle = 'rgba(107, 114, 128, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowColor = 'transparent';

      // Draw progress arc (cyan to pink gradient)
      const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
      gradient.addColorStop(0, '#06B6D4'); // cyan
      gradient.addColorStop(0.5, '#A78BFA'); // purple
      gradient.addColorStop(1, '#EC4899'); // pink

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.beginPath();
      const angle = (hoursRef.current / 93) * Math.PI * 2 - Math.PI / 2;
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle);
      ctx.stroke();

      // Draw hour markers
      for (let i = 0; i < 93; i += 15) {
        const markerAngle = (i / 93) * Math.PI * 2 - Math.PI / 2;
        const x1 = centerX + Math.cos(markerAngle) * radius;
        const y1 = centerY + Math.sin(markerAngle) * radius;
        const x2 = centerX + Math.cos(markerAngle) * (radius - 15);
        const y2 = centerY + Math.sin(markerAngle) * (radius - 15);

        ctx.strokeStyle = 'rgba(107, 114, 128, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Draw center circle with gradient
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 14);
      centerGradient.addColorStop(0, 'rgba(6, 182, 212, 0.4)');
      centerGradient.addColorStop(1, 'rgba(6, 182, 212, 0.1)');
      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.stroke();

      // Draw hours number with better styling
      ctx.fillStyle = '#00D9FF';
      ctx.font = 'bold 56px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.floor(hoursRef.current)}`, centerX, centerY - 6);

      // Draw / 93 text
      ctx.fillStyle = 'rgba(6, 182, 212, 0.7)';
      ctx.font = '14px "Courier New", monospace';
      ctx.fillText('/ 93h', centerX, centerY + 20);

      requestAnimationFrame(animate);
    };

    animate();
  }, [isHovering]);

  const handleCanvasClick = () => {
    speedRef.current = Math.min(speedRef.current + 0.5, 5);
  };

  const handleCanvasDoubleClick = () => {
    speedRef.current = 1;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Course Time</h3>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={200}
          height={200}
          className="w-full max-w-[180px] cursor-pointer transition-opacity hover:opacity-90"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={handleCanvasClick}
          onDoubleClick={handleCanvasDoubleClick}
          title="Click to speed up, double-click to reset, hover to pause"
        />
        {isHovering && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-xs text-cyan-300 font-mono bg-black/40 px-2 py-1 rounded">
              Paused
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4 max-w-[160px]">
        93 hours of hands-on learning
      </p>
      <p className="text-2xs text-gray-500 text-center mt-1">
        💡 Hover to pause • Click to speed up
      </p>
    </div>
  );
}
