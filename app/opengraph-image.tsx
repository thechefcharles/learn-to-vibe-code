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
          gap: '20px',
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

        {/* Logo and text container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '30px',
            zIndex: 1,
          }}
        >
          {/* Logo placeholder with cosmic colors */}
          <div
            style={{
              width: '120px',
              height: '120px',
              background: 'linear-gradient(135deg, #06B6D4 0%, #A78BFA 50%, #EC4899 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '60px',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0 0 40px rgba(6, 182, 212, 0.5)',
            }}
          >
            V
          </div>

          {/* Main title */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <div
              style={{
                fontSize: '72px',
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #06B6D4, #A78BFA, #EC4899)',
                backgroundClip: 'text',
                color: 'transparent',
                textAlign: 'center',
                letterSpacing: '-2px',
              }}
            >
              Learn to Vibe Code
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: '36px',
                color: '#e5e7eb',
                textAlign: 'center',
                letterSpacing: '1px',
              }}
            >
              Free Vibe Coding Course
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
