'use client';

import { useEffect, useRef } from 'react';

export function TimeWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const size = canvas.width / 2;
      const centerX = size;
      const centerY = size;
      const radius = size * 0.8;

      // Clear canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate hours (93 total)
      const now = Date.now();
      const hours = ((now / 100) % 93); // Cycle through 93 hours

      // Draw outer circle
      ctx.strokeStyle = 'rgba(107, 114, 128, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw progress arc (cyan to pink gradient)
      const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
      gradient.addColorStop(0, '#06B6D4'); // cyan
      gradient.addColorStop(0.5, '#A78BFA'); // purple
      gradient.addColorStop(1, '#EC4899'); // pink

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      const angle = (hours / 93) * Math.PI * 2 - Math.PI / 2;
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, angle);
      ctx.stroke();

      // Draw hour markers
      for (let i = 0; i < 93; i += 15) {
        const angle = (i / 93) * Math.PI * 2 - Math.PI / 2;
        const x1 = centerX + Math.cos(angle) * radius;
        const y1 = centerY + Math.sin(angle) * radius;
        const x2 = centerX + Math.cos(angle) * (radius - 12);
        const y2 = centerY + Math.sin(angle) * (radius - 12);

        ctx.strokeStyle = 'rgba(107, 114, 128, 0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Draw center circle
      ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#06B6D4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
      ctx.stroke();

      // Draw text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.floor(hours)}`, centerX, centerY);

      ctx.fillStyle = 'rgba(107, 114, 128, 0.8)';
      ctx.font = '12px sans-serif';
      ctx.fillText('/ 93 hours', centerX, centerY + 22);

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Course Time</h3>
      </div>

      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="w-full max-w-[180px]"
      />

      <p className="text-xs text-gray-400 text-center mt-4">
        93 hours of hands-on learning
      </p>
    </div>
  );
}
