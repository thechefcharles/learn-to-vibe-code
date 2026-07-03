export function getModuleMetadata(moduleId: number) {
  const titles: Record<number, string> = {
    0: "Setup & Accounts",
    1: "AI Fundamentals",
    2: "Prompt Engineering",
    3: "Planning with AI",
    4: "Building in Cursor",
    5: "Building in Claude Code",
    6: "Design & UX",
    7: "Supabase: Data & Auth",
    8: "Reading & Debugging",
    9: "Git & GitHub",
    10: "Deploying with Vercel",
    11: "Agent Workflows",
    12: "Production-Ready",
    13: "Automating Pipelines",
    14: "Brownfield",
    15: "Tooling Landscape",
  };

  return {
    id: moduleId,
    title: titles[moduleId] || `Module ${moduleId}`,
    description: `Learn module ${moduleId}`,
  };
}
