import Image from "next/image";

interface LogoProps {
  variant?: "primary" | "tagline" | "reverse" | "mark";
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

  const logoMap = {
    primary: "/brand/logo-primary.svg",
    tagline: "/brand/logo-tagline.svg",
    reverse: "/brand/logo-reverse.svg",
    mark: "/brand/logo-mark.svg",
  };

  const altMap = {
    primary: "Learn To Vibe Code",
    tagline: "Learn To Vibe Code - Hard to start. Impossible to stop.",
    reverse: "Learn To Vibe Code",
    mark: "Vibe Code mark",
  };

  const dimensions = sizeMap[size];

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
