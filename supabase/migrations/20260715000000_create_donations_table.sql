-- Create donations table for tracking optional donations
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  currency TEXT NOT NULL DEFAULT 'usd',
  stripe_session_id TEXT NOT NULL UNIQUE,
  stripe_charge_id TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_donations_user_id ON donations(user_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own donations" ON donations;
DROP POLICY IF EXISTS "Users can insert own donations" ON donations;
DROP POLICY IF EXISTS "Instructors can read all donations" ON donations;

CREATE POLICY "Users can read own donations"
  ON donations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own donations"
  ON donations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Instructors can read all donations"
  ON donations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'instructor'
    )
  );

GRANT SELECT, INSERT ON donations TO authenticated;
GRANT SELECT ON donations TO anon;
