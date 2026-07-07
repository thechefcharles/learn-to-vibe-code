import fs from "fs";
import path from "path";

export interface Module {
  id: number;
  title: string;
  content: string;
  slug: string;
}

export async function getModule(moduleId: number, version: "kids" | "adult" = "adult"): Promise<Module | null> {
  try {
    const modulesDir = version === "kids"
      ? path.join(process.cwd(), "content/modules-kids")
      : path.join(process.cwd(), "content/modules");

    const files = fs.readdirSync(modulesDir);
    const moduleFile = files.find((f) =>
      f.match(new RegExp(`^module-${String(moduleId).padStart(2, "0")}-`))
    );

    if (!moduleFile) return null;

    const filePath = path.join(modulesDir, moduleFile);
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

export async function getAllModules(version: "kids" | "adult" = "adult"): Promise<Module[]> {
  const modules: Module[] = [];

  for (let i = 0; i <= 15; i++) {
    const module = await getModule(i, version);
    if (module) {
      modules.push(module);
    }
  }

  return modules;
}

