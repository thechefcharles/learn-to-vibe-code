-- Create capstone upvotes table for showcase gamification
CREATE TABLE IF NOT EXISTS capstone_upvotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  capstone_id UUID NOT NULL REFERENCES capstone_submissions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(capstone_id, user_id)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_capstone_upvotes_capstone_id ON capstone_upvotes(capstone_id);
CREATE INDEX IF NOT EXISTS idx_capstone_upvotes_user_id ON capstone_upvotes(user_id);

-- Enable RLS
ALTER TABLE capstone_upvotes ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Users can read all upvotes" ON capstone_upvotes;
DROP POLICY IF EXISTS "Users can insert own upvotes" ON capstone_upvotes;

CREATE POLICY "Users can read all upvotes"
  ON capstone_upvotes FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own upvotes"
  ON capstone_upvotes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

GRANT SELECT, INSERT ON capstone_upvotes TO authenticated;
GRANT SELECT ON capstone_upvotes TO anon;
