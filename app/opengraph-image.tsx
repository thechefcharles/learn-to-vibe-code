import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '40px',
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* Background glow effect */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            top: '-100px',
            left: '100px',
          }}
        />

        {/* Logo mark with gradient glow */}
        <div
          style={{
            width: '140px',
            height: '140px',
            background: 'linear-gradient(135deg, #06B6D4 0%, #A78BFA 50%, #EC4899 100%)',
            borderRadius: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 50px rgba(6, 182, 212, 0.5), inset 0 0 30px rgba(168, 85, 247, 0.2)',
          }}
        >
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              lineHeight: '1',
            }}
          >
            ◸
          </div>
        </div>

        {/* Text content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #06B6D4, #A78BFA, #EC4899)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-2px',
            }}
          >
            Learn to Vibe Code
          </div>

          <div
            style={{
              fontSize: '40px',
              color: '#e5e7eb',
              fontWeight: '500',
              letterSpacing: '0.5px',
            }}
          >
            Free Vibe Coding Course
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
