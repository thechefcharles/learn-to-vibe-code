#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

// Read SQL files
const schemaSQL = fs.readFileSync(
  path.join(__dirname, "../supabase/schema.sql"),
  "utf-8"
);
const rlsSQL = fs.readFileSync(
  path.join(__dirname, "../supabase/rls-policies.sql"),
  "utf-8"
);
const seedSQL = fs.readFileSync(
  path.join(__dirname, "../supabase/seed.sql"),
  "utf-8"
);

// Get Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Missing environment variables:");
  console.error(
    "   NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required"
  );
  process.exit(1);
}

// Parse database connection from URL
const url = new URL(supabaseUrl);
let dbHost = url.hostname;
const projectRef = dbHost.split(".")[0];

// Use connection pooler for better compatibility
// Try pooler first (port 6543), fall back to direct (port 5432)
dbHost = `${projectRef}-pooler.supabase.co`;

const dbUser = "postgres";
const dbPort = 6543; // Connection pooler port
const dbName = "postgres";

// Get password from environment or prompt user
const dbPassword = process.env.SUPABASE_DB_PASSWORD;

if (!dbPassword) {
  console.error("❌ SUPABASE_DB_PASSWORD environment variable not set");
  console.error(
    "   You need to provide your Supabase database password to run migrations"
  );
  console.error("");
  console.error("Option 1: Set environment variable");
  console.error("   export SUPABASE_DB_PASSWORD='your_password'");
  console.error("   node scripts/setup-db.js");
  console.error("");
  console.error("Option 2: Use Supabase SQL Editor (manual)");
  console.error("   Go to: https://app.supabase.com/project/" + projectRef + "/sql");
  console.error("   Paste the contents of:");
  console.error("     - supabase/schema.sql");
  console.error("     - supabase/rls-policies.sql");
  console.error("     - supabase/seed.sql");
  process.exit(1);
}

async function runSQL() {
  const { Client } = await import("pg");

  const client = new Client({
    host: dbHost,
    port: dbPort,
    database: dbName,
    user: dbUser,
    password: dbPassword,
    ssl: true,
  });

  try {
    console.log("🔧 Connecting to Supabase database...");
    await client.connect();
    console.log("✅ Connected\n");

    // Run schema
    console.log("📝 Creating database schema...");
    await client.query(schemaSQL);
    console.log("✅ Schema created\n");

    // Run RLS policies
    console.log("🔒 Setting up Row Level Security policies...");
    await client.query(rlsSQL);
    console.log("✅ RLS policies applied\n");

    // Run seed data
    console.log("🌱 Seeding test data...");
    await client.query(seedSQL);
    console.log("✅ Test data seeded\n");

    console.log("🎉 Database setup complete!");
    console.log("");
    console.log("Test credentials:");
    console.log("  Instructor: instructor@learn-to-vibe-code.test");
    console.log("  Learner: learner@learn-to-vibe-code.test");
  } catch (error) {
    console.error("❌ Error during setup:");
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runSQL();
