import { Version } from "./VersionContext";

export const versionStyles = {
  kids: {
    // Typography
    baseFontSize: "18px",
    headingScale: 1.3,
    fontFamily: "var(--font-space-grotesk)",
    fontWeight: 700,

    // Spacing
    padding: "24px",
    gap: "20px",
    borderRadius: "16px",
    marginBottom: "32px",

    // Colors
    bgPrimary: "from-pink-400 to-purple-500",
    bgSecondary: "from-blue-400 to-cyan-500",
    accentBright: "#ff6b9d",
    textColor: "#1a1a2e",
    textMuted: "#555",

    // Components
    buttonSize: "lg",
    buttonPadding: "16px 24px",
    cardHeight: "h-80",
    emoji: true,
    celebratory: true,

    // Gamification
    streakEmoji: "🔥",
    levelEmoji: "⭐",
    badgeSize: "w-16 h-16",
    xpCelebration: true,
  },

  adult: {
    // Typography
    baseFontSize: "16px",
    headingScale: 1.2,
    fontFamily: "var(--font-inter)",
    fontWeight: 500,

    // Spacing
    padding: "20px",
    gap: "16px",
    borderRadius: "12px",
    marginBottom: "24px",

    // Colors
    bgPrimary: "from-violet-600 to-indigo-600",
    bgSecondary: "from-slate-700 to-slate-900",
    accentBright: "#7c3aed",
    textColor: "#ffffff",
    textMuted: "#e0e7ff",

    // Components
    buttonSize: "md",
    buttonPadding: "12px 20px",
    cardHeight: "h-56",
    emoji: false,
    celebratory: false,

    // Gamification
    streakEmoji: "🔥",
    levelEmoji: "📊",
    badgeSize: "w-12 h-12",
    xpCelebration: false,
  },
};

export const badgeNames = {
  kids: {
    first_quiz_passed: "Quiz Explorer",
    rls_locked_down: "Security Guardian",
    went_live: "Web Wizard",
    automation_engineer: "Code Sorcerer",
    capstone: "Ultimate Master",
  },
  adult: {
    first_quiz_passed: "Assessment Pass",
    rls_locked_down: "Security Hardening",
    went_live: "Production Deployment",
    automation_engineer: "Pipeline Automation",
    capstone: "Capstone Completion",
  },
};

export const badgeEmojis = {
  kids: {
    first_quiz_passed: "🎯",
    rls_locked_down: "🔒",
    went_live: "🚀",
    automation_engineer: "⚙️",
    capstone: "👑",
  },
  adult: {
    first_quiz_passed: "✅",
    rls_locked_down: "🔐",
    went_live: "📈",
    automation_engineer: "🤖",
    capstone: "🏆",
  },
};

export function getVersionStyle(version: Version, key: keyof typeof versionStyles.adult) {
  return versionStyles[version][key];
}

export function getBadgeName(version: Version, badgeKey: string) {
  return badgeNames[version][badgeKey as keyof typeof badgeNames.adult] || badgeKey;
}

export function getBadgeEmoji(version: Version, badgeKey: string) {
  return badgeEmojis[version][badgeKey as keyof typeof badgeEmojis.adult] || "⭐";
}
