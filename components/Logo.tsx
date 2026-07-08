import Image from "next/image";

interface LogoProps {
  variant?: "primary" | "tagline" | "reverse" | "mark" | "cosmic" | "cosmic-mark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Logo({
  variant = "primary",
  size = "md",
  className = "",
}: LogoProps) {
  const sizeMap = {
    sm: { width: 100, height: 26 },
    md: { width: 200, height: 52 },
    lg: { width: 330, height: 86 },
  };

  const cosmicSizeMap = {
    sm: { width: 200, height: 67 },
    md: { width: 400, height: 133 },
    lg: { width: 600, height: 200 },
  };

  const cosmicMarkSizeMap = {
    sm: { width: 80, height: 80 },
    md: { width: 150, height: 150 },
    lg: { width: 220, height: 220 },
  };

  const logoMap = {
    primary: "/brand/logo-primary.svg",
    tagline: "/brand/logo-tagline.svg",
    reverse: "/brand/logo-reverse.svg",
    mark: "/brand/logo-mark.svg",
    cosmic: "/learn_to_vibe_code_logo_cosmic_wordmark_transparent.png",
    "cosmic-mark": "/learn_to_vibe_code_logo_cosmic_mark_transparent.png",
  };

  const altMap = {
    primary: "Learn To Vibe Code",
    tagline: "Learn To Vibe Code - Hard to start. Impossible to stop.",
    reverse: "Learn To Vibe Code",
    mark: "Vibe Code mark",
    cosmic: "Learn To Vibe Code",
    "cosmic-mark": "Vibe Code cosmic mark",
  };

  let dimensions = sizeMap[size];
  if (variant === "cosmic") {
    dimensions = cosmicSizeMap[size];
  } else if (variant === "cosmic-mark") {
    dimensions = cosmicMarkSizeMap[size];
  }

  return (
    <Image
      src={logoMap[variant]}
      alt={altMap[variant]}
      width={dimensions.width}
      height={dimensions.height}
      priority={variant === "primary"}
      className={className}
    />
  );
}
