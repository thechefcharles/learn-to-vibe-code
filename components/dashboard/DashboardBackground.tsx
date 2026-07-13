'use client';

export function DashboardBackground() {
  const backgroundStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(/dashboard-ocean-bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    zIndex: -10,
  };

  return <div style={backgroundStyle} />;
}
