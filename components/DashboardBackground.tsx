export function DashboardBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.35,
        }}
      >
        <source src="/videos/backgrounds/trippy-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-slate-900/40" />
    </div>
  );
}
