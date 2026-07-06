-- Add version support to dual-version system (corrected for actual schema)

-- Add enrolled_version to enrollments (track which version user is in)
ALTER TABLE enrollments
ADD COLUMN enrolled_version TEXT DEFAULT 'adult' CHECK (enrolled_version IN ('kids', 'adult'));

-- Add target_audience to module_progress (track which version progress is for)
ALTER TABLE module_progress
ADD COLUMN target_audience TEXT DEFAULT 'adult' CHECK (target_audience IN ('kids', 'adult'));

-- Add target_audience to quiz_attempts (track which version quiz is for)
ALTER TABLE quiz_attempts
ADD COLUMN target_audience TEXT DEFAULT 'adult' CHECK (target_audience IN ('kids', 'adult'));

-- Add target_audience to deliverables (track which version deliverable is for)
ALTER TABLE deliverables
ADD COLUMN target_audience TEXT DEFAULT 'adult' CHECK (target_audience IN ('kids', 'adult'));

-- Add target_audience to capstone_submissions (track which version capstone is for)
ALTER TABLE capstone_submissions
ADD COLUMN target_audience TEXT DEFAULT 'adult' CHECK (target_audience IN ('kids', 'adult'));

-- Add target_audience to badges (different badges per version)
ALTER TABLE badges
ADD COLUMN target_audience TEXT DEFAULT 'adult' CHECK (target_audience IN ('kids', 'adult'));

-- Create indexes for faster version filtering
CREATE INDEX idx_enrollments_enrolled_version ON enrollments(enrolled_version);
CREATE INDEX idx_module_progress_target_audience ON module_progress(target_audience);
CREATE INDEX idx_quiz_attempts_target_audience ON quiz_attempts(target_audience);
CREATE INDEX idx_deliverables_target_audience ON deliverables(target_audience);
CREATE INDEX idx_badges_target_audience ON badges(target_audience);

-- Add comments documenting the new fields
COMMENT ON COLUMN enrollments.enrolled_version IS 'Which version user enrolled in: kids or adult';
COMMENT ON COLUMN module_progress.target_audience IS 'Target audience version for this progress: kids or adult';
COMMENT ON COLUMN quiz_attempts.target_audience IS 'Target audience version for this quiz: kids or adult';
COMMENT ON COLUMN deliverables.target_audience IS 'Target audience version for this deliverable: kids or adult';
COMMENT ON COLUMN capstone_submissions.target_audience IS 'Target audience version for capstone: kids or adult';
COMMENT ON COLUMN badges.target_audience IS 'Target audience version for badge: kids or adult';
