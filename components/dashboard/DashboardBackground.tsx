'use client';

export function DashboardBackground() {
  return (
    <>
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: 'url(/dashboard-ocean-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(3px)',
        }}
      />
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }}
      />
    </>
  );
}
