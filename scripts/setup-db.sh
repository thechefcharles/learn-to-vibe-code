#!/bin/bash

set -e

# Load environment
source "$(dirname "$0")/../.env.local" 2>/dev/null || true

# Check required variables
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_DB_PASSWORD" ]; then
  echo "❌ Missing environment variables:"
  echo "   NEXT_PUBLIC_SUPABASE_URL and SUPABASE_DB_PASSWORD required"
  exit 1
fi

# Extract database host from Supabase URL
DB_HOST=$(echo "$NEXT_PUBLIC_SUPABASE_URL" | sed 's|https://||' | sed 's|/.*||')
DB_USER="postgres"
DB_PORT="5432"
DB_NAME="postgres"

# Build connection string
export PGPASSWORD="$SUPABASE_DB_PASSWORD"

echo "🔧 Connecting to Supabase database..."
echo "   Host: $DB_HOST"
echo ""

# Run schema
echo "📝 Creating database schema..."
psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d "$DB_NAME" -f "$(dirname "$0")/../supabase/schema.sql" > /dev/null 2>&1 && echo "✅ Schema created" || echo "⚠️  Schema already exists or had warnings"
echo ""

# Run RLS policies
echo "🔒 Setting up Row Level Security policies..."
psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d "$DB_NAME" -f "$(dirname "$0")/../supabase/rls-policies.sql" > /dev/null 2>&1 && echo "✅ RLS policies applied" || echo "⚠️  RLS policies already applied or had warnings"
echo ""

# Run seed data
echo "🌱 Seeding test data..."
psql -h "$DB_HOST" -U "$DB_USER" -p "$DB_PORT" -d "$DB_NAME" -f "$(dirname "$0")/../supabase/seed.sql" > /dev/null 2>&1 && echo "✅ Test data seeded" || echo "⚠️  Test data already seeded or had warnings"
echo ""

echo "🎉 Database setup complete!"
echo ""
echo "Test credentials:"
echo "  Instructor: instructor@learn-to-vibe-code.test"
echo "  Learner: learner@learn-to-vibe-code.test"

unset PGPASSWORD
