-- Create learner_feedback table for collecting learner feedback on course

CREATE TABLE IF NOT EXISTS learner_feedback (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  clarity text not null check (clarity in ('very-clear', 'mostly-clear', 'somewhat-unclear', 'not-clear')),
  difficulty text not null check (difficulty in ('too-easy', 'just-right', 'too-hard')),
  challenge text not null,
  suggestions text not null,
  would_recommend text not null check (would_recommend in ('yes', 'maybe', 'no')),
  created_at timestamp with time zone default now(),
  unique(user_id)
);

-- Create index for user_id lookups
CREATE INDEX IF NOT EXISTS idx_learner_feedback_user_id ON learner_feedback(user_id);

-- Enable RLS on learner_feedback
DO $$
BEGIN
  EXECUTE 'ALTER TABLE learner_feedback ENABLE ROW LEVEL SECURITY';
EXCEPTION WHEN OTHERS THEN
  NULL; -- Already enabled, ignore error
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS learner_feedback_select_own ON learner_feedback;
DROP POLICY IF EXISTS learner_feedback_insert_own ON learner_feedback;
DROP POLICY IF EXISTS learner_feedback_select_all_instructor ON learner_feedback;

-- Policy: Learners can SELECT their own feedback
CREATE POLICY learner_feedback_select_own ON learner_feedback
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Learners can INSERT their own feedback
CREATE POLICY learner_feedback_insert_own ON learner_feedback
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Instructors can SELECT all feedback
CREATE POLICY learner_feedback_select_all_instructor ON learner_feedback
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'instructor'
    )
  );
