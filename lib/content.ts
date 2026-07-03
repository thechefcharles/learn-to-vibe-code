import fs from "fs";
import path from "path";

export interface Module {
  id: number;
  title: string;
  content: string;
  slug: string;
}

const MODULES_DIR = path.join(process.cwd(), "content/modules");

export async function getModule(moduleId: number): Promise<Module | null> {
  try {
    const filename = `module-${String(moduleId).padStart(2, "0")}-*.md`;
    const files = fs.readdirSync(MODULES_DIR);
    const moduleFile = files.find((f) =>
      f.match(new RegExp(`^module-${String(moduleId).padStart(2, "0")}-`))
    );

    if (!moduleFile) return null;

    const filePath = path.join(MODULES_DIR, moduleFile);
    const content = fs.readFileSync(filePath, "utf-8");

    // Extract title from first heading
    const titleMatch = content.match(/^#\s+(.+?)(?:\n|$)/);
    const title = titleMatch ? titleMatch[1] : `Module ${moduleId}`;

    // Extract slug from filename
    const slug = moduleFile.replace("module-" + String(moduleId).padStart(2, "0") + "-", "").replace(".md", "");

    return {
      id: moduleId,
      title,
      content,
      slug,
    };
  } catch (error) {
    console.error(`Error loading module ${moduleId}:`, error);
    return null;
  }
}

export async function getAllModules(): Promise<Module[]> {
  const modules: Module[] = [];

  for (let i = 0; i <= 15; i++) {
    const module = await getModule(i);
    if (module) {
      modules.push(module);
    }
  }

  return modules;
}

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
