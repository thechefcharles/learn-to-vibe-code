-- Add RLS policies for quiz_attempts table

-- Enable RLS on quiz_attempts (if not already enabled)
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Policy: Learners can SELECT their own quiz attempts
CREATE POLICY IF NOT EXISTS quiz_attempts_select_own ON quiz_attempts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Learners can INSERT their own quiz attempts
CREATE POLICY IF NOT EXISTS quiz_attempts_insert_own ON quiz_attempts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Instructors can SELECT all quiz attempts
CREATE POLICY IF NOT EXISTS quiz_attempts_select_all_instructor ON quiz_attempts
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'instructor'
    )
  );
