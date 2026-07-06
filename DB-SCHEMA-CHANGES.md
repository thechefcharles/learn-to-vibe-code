# Database Schema Changes for Dual-Version Support

## Migration: `20260706_add_version_support.sql`

This migration adds version-awareness to the database schema for supporting both "kids" and "adult" course tracks.

### Changes

#### New Columns (with default 'adult')

| Table | Column | Type | Purpose |
|-------|--------|------|---------|
| `modules` | `target_audience` | TEXT | Marks if module is for kids, adult, or both |
| `quizzes` | `target_audience` | TEXT | Version-specific quiz content |
| `quiz_questions` | `target_audience` | TEXT | Version-specific question variants |
| `deliverables` | `target_audience` | TEXT | Version-specific project specs |
| `capstone_submissions` | `target_audience` | TEXT | Tracks which version capstone is for |
| `badges` | `target_audience` | TEXT | Version-specific badge designs/names |
| `enrollments` | `enrolled_version` | TEXT | Tracks which version user enrolled in (kids or adult) |

#### Constraints

All `target_audience` columns accept: `'kids'`, `'adult'`, `'both'`

`enrolled_version` accepts: `'kids'`, `'adult'`

#### Indexes Added

- `idx_modules_target_audience` → Fast filtering when loading courses by version
- `idx_quizzes_target_audience` → Fast quiz lookups
- `idx_badges_target_audience` → Fast badge queries
- `idx_enrollments_enrolled_version` → Fast user enrollment lookups

### How to Apply

#### Option 1: Using Supabase CLI (Recommended)
```bash
cd /Users/admin/Charlie\ Foreman/My\ Projects/learn-to-vibe-code
supabase migration push
```

#### Option 2: Manual via Supabase Dashboard
1. Go to Supabase dashboard → Your project → SQL Editor
2. Copy contents of `supabase/migrations/20260706_add_version_support.sql`
3. Paste into query editor
4. Click "Run"

#### Option 3: Using psql
```bash
psql postgresql://[user]:[password]@[host]:[port]/[database] < supabase/migrations/20260706_add_version_support.sql
```

### Verify Migration

After running, verify columns exist:

```sql
-- Check modules table
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name='modules' AND column_name='target_audience';

-- Check enrollments table
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name='enrollments' AND column_name='enrolled_version';
```

### Rollback

If needed, rollback with:

```sql
-- Remove columns
ALTER TABLE modules DROP COLUMN target_audience;
ALTER TABLE quizzes DROP COLUMN target_audience;
ALTER TABLE quiz_questions DROP COLUMN target_audience;
ALTER TABLE deliverables DROP COLUMN target_audience;
ALTER TABLE capstone_submissions DROP COLUMN target_audience;
ALTER TABLE badges DROP COLUMN target_audience;
ALTER TABLE enrollments DROP COLUMN enrolled_version;

-- Remove indexes
DROP INDEX idx_modules_target_audience;
DROP INDEX idx_quizzes_target_audience;
DROP INDEX idx_badges_target_audience;
DROP INDEX idx_enrollments_enrolled_version;
```

### Next Steps

1. Update TypeScript types in `lib/` to reflect new columns
2. Update queries in `lib/actions/` to filter by version
3. Create kids-version content (modules, quizzes, badges)
