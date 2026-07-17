export function getModuleMetadata(moduleId: number) {
  const titles: Record<number, string> = {
    1: "Setup & Accounts",
    2: "AI Fundamentals",
    3: "Prompt Engineering",
    4: "Planning with AI",
    5: "Building in Cursor",
    6: "Building in Claude Code",
    7: "Design & UX",
    8: "Supabase: Data & Auth",
    9: "Reading & Debugging",
    10: "Git & GitHub",
    11: "Deploying with Vercel",
    12: "Agent Workflows",
    13: "Production-Ready",
    14: "Automating Pipelines",
    15: "Brownfield",
    16: "Tooling Landscape",
  };

  return {
    id: moduleId,
    title: titles[moduleId] || `Module ${moduleId}`,
    description: `Learn module ${moduleId}`,
  };
}
