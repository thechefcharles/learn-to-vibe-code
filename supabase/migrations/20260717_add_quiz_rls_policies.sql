-- Add RLS policies for quiz_attempts table

-- Enable RLS on quiz_attempts
DO $$
BEGIN
  EXECUTE 'ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY';
EXCEPTION WHEN OTHERS THEN
  NULL; -- Already enabled, ignore error
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS quiz_attempts_select_own ON quiz_attempts;
DROP POLICY IF EXISTS quiz_attempts_insert_own ON quiz_attempts;
DROP POLICY IF EXISTS quiz_attempts_select_all_instructor ON quiz_attempts;

-- Policy: Learners can SELECT their own quiz attempts
CREATE POLICY quiz_attempts_select_own ON quiz_attempts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Learners can INSERT their own quiz attempts
CREATE POLICY quiz_attempts_insert_own ON quiz_attempts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Instructors can SELECT all quiz attempts
CREATE POLICY quiz_attempts_select_all_instructor ON quiz_attempts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'instructor'
    )
  );
