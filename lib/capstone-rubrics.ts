/**
 * Version-aware capstone rubric definitions
 * Kids: simplified 9-item rubric (age-appropriate scope)
 * Adult: comprehensive 10-item rubric (professional standards)
 */

export interface RubricItem {
  key: string;
  label: string;
  description: string;
}

/**
 * Kids capstone rubric (simplified, 9 items, 0-3 scoring)
 * Focuses on core competencies without production complexity
 */
export const KIDS_RUBRIC: RubricItem[] = [
  {
    key: "functionality",
    label: "🎮 Does It Work?",
    description: "The app runs and the main features do what they're supposed to do",
  },
  {
    key: "user_interface",
    label: "✨ Is It Easy to Use?",
    description: "A new user can figure out how to use the app without much help",
  },
  {
    key: "code_quality",
    label: "🧹 Is the Code Clean?",
    description:
      "The code is organized, readable, and follows good practices (uses functions, meaningful names, etc.)",
  },
  {
    key: "deployment",
    label: "🚀 Is It Online?",
    description: "The app is deployed and accessible on the internet for others to use",
  },
  {
    key: "ai_integration",
    label: "🤖 Did You Use AI?",
    description: "You used Cursor/Claude Code effectively to build or improve your app",
  },
  {
    key: "problem_solving",
    label: "🧠 Problem Solving",
    description: "You overcame challenges and explained how you solved problems",
  },
  {
    key: "creativity",
    label: "💡 Originality",
    description: "Your app idea is interesting and shows your unique creativity",
  },
  {
    key: "completeness",
    label: "✅ Is It Finished?",
    description: "The project feels complete and polished (no major broken features)",
  },
  {
    key: "presentation",
    label: "🎬 Demo Video",
    description: "Your walkthrough video clearly shows what the app does",
  },
];

/**
 * Adult capstone rubric (comprehensive, 10 items, 0-3 scoring)
 * Professional standards: architecture, scalability, testing, production-readiness
 */
export const ADULT_RUBRIC: RubricItem[] = [
  {
    key: "functionality",
    label: "Core Functionality",
    description:
      "Application delivers all stated requirements; features work correctly and handles edge cases",
  },
  {
    key: "ai_integration",
    label: "AI/LLM Integration",
    description:
      "Effective AI assistant implementation; demonstrates understanding of prompts, context windows, and model selection",
  },
  {
    key: "code_quality",
    label: "Code Quality & Architecture",
    description:
      "Well-organized, maintainable code; proper separation of concerns; follows framework conventions",
  },
  {
    key: "database_design",
    label: "Database & Data Layer",
    description:
      "Appropriate schema design; proper use of RLS/security; efficient queries; data integrity",
  },
  {
    key: "deployment",
    label: "Production Deployment",
    description:
      "Successfully deployed to production (Vercel/similar); environment variables configured; monitoring in place",
  },
  {
    key: "testing",
    label: "Testing & QA",
    description:
      "Evidence of testing strategy; unit/integration tests or comprehensive manual testing documented",
  },
  {
    key: "security",
    label: "Security & Auth",
    description:
      "Proper authentication implementation; no OWASP vulnerabilities; secrets managed correctly",
  },
  {
    key: "performance",
    label: "Performance Optimization",
    description:
      "Core Web Vitals optimized; efficient API usage; caching strategy considered; load times acceptable",
  },
  {
    key: "documentation",
    label: "Documentation & README",
    description:
      "Clear setup instructions; API documentation if applicable; architecture decisions explained",
  },
  {
    key: "presentation",
    label: "Presentation & Writeup",
    description:
      "Professional defense video/writeup; articulates learning; demonstrates mastery of concepts",
  },
];

export function getRubricForVersion(version: "kids" | "adult"): RubricItem[] {
  return version === "kids" ? KIDS_RUBRIC : ADULT_RUBRIC;
}

/**
 * Scoring guide (same for both versions):
 * 0 = Not attempted / Major gaps
 * 1 = Started / Significant gaps
 * 2 = Adequate / Meets minimum requirements
 * 3 = Excellent / Exceeds expectations
 *
 * Pass threshold: All criteria >= 2 AND total score >= 80%
 */
export const SCORING_GUIDE = {
  0: "❌ Not attempted / Major gaps",
  1: "⚠️ Started / Significant gaps",
  2: "✓ Adequate / Meets requirements",
  3: "⭐ Excellent / Exceeds expectations",
};
