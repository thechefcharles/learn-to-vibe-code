-- Add version support to dual-version system (with IF NOT EXISTS checks)

-- Add enrolled_version to enrollments
ALTER TABLE enrollments
ADD COLUMN IF NOT EXISTS enrolled_version TEXT DEFAULT 'adult' CHECK (enrolled_version IN ('kids', 'adult'));

-- Add target_audience to module_progress
ALTER TABLE module_progress
ADD COLUMN IF NOT EXISTS target_audience TEXT DEFAULT 'adult' CHECK (target_audience IN ('kids', 'adult'));

-- Add target_audience to quiz_attempts
ALTER TABLE quiz_attempts
ADD COLUMN IF NOT EXISTS target_audience TEXT DEFAULT 'adult' CHECK (target_audience IN ('kids', 'adult'));

-- Add target_audience to deliverables
ALTER TABLE deliverables
ADD COLUMN IF NOT EXISTS target_audience TEXT DEFAULT 'adult' CHECK (target_audience IN ('kids', 'adult'));

-- Add target_audience to capstone_submissions
ALTER TABLE capstone_submissions
ADD COLUMN IF NOT EXISTS target_audience TEXT DEFAULT 'adult' CHECK (target_audience IN ('kids', 'adult'));
