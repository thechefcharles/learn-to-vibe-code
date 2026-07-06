export function DashboardBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: -1,
      }}
    >
      <source src="/videos/backgrounds/trippy-bg.mp4" type="video/mp4" />
    </video>
  );
}
