import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function runSqlFile(filename: string): Promise<void> {
  const filepath = path.join(__dirname, "..", "supabase", filename);
  const sql = fs.readFileSync(filepath, "utf-8");

  console.log(`Running ${filename}...`);

  // Split by semicolons and filter empty statements
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !s.startsWith("--"));

  for (const statement of statements) {
    try {
      const { error } = await supabase.rpc("exec", { sql: statement });
      if (error) {
        console.warn(`  ⚠️  ${error.message}`);
      } else {
        console.log(`  ✓ Statement executed`);
      }
    } catch (err) {
      console.error(`  ❌ Error: ${err}`);
    }
  }
}

async function main(): Promise<void> {
  try {
    console.log("🔧 Setting up Supabase database...\n");

    await runSqlFile("schema.sql");
    console.log("");

    await runSqlFile("rls-policies.sql");
    console.log("");

    await runSqlFile("seed.sql");
    console.log("");

    console.log("✅ Supabase setup complete!");
  } catch (error) {
    console.error("❌ Setup failed:", error);
    process.exit(1);
  }
}

main();
