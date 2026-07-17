-- Add RLS policies for enrollments table

-- Enable RLS on enrollments
DO $$
BEGIN
  EXECUTE 'ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY';
EXCEPTION WHEN OTHERS THEN
  NULL; -- Already enabled, ignore error
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS enrollments_select_own ON enrollments;
DROP POLICY IF EXISTS enrollments_insert_own ON enrollments;
DROP POLICY IF EXISTS enrollments_update_own ON enrollments;

-- Policy: Users can SELECT their own enrollment
CREATE POLICY enrollments_select_own ON enrollments
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can INSERT their own enrollment
CREATE POLICY enrollments_insert_own ON enrollments
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can UPDATE their own enrollment
CREATE POLICY enrollments_update_own ON enrollments
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
