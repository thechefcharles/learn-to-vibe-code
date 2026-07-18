-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Profiles table
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  email text unique not null,
  role text not null check (role in ('learner', 'instructor')),
  plan text default 'free',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enrollments table
create table if not exists enrollments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  enrolled_at timestamp with time zone default now(),
  status text not null default 'active' check (status in ('active', 'paused', 'completed')),
  unique(user_id)
);

-- Module progress table
create table if not exists module_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  module_id integer not null,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  unlocked boolean default false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, module_id)
);

-- Checklist items table
create table if not exists checklist_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  module_id integer not null,
  item_key text not null,
  checked boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, module_id, item_key)
);

-- Quiz attempts table
create table if not exists quiz_attempts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  module_id integer not null,
  score integer not null,
  passed boolean not null,
  attempt_no integer not null default 1,
  xp_awarded boolean not null default false,
  taken_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Deliverables table
create table if not exists deliverables (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  module_id integer not null,
  repo_url text not null,
  live_url text not null,
  auto_checks jsonb,
  status text not null default 'pending' check (status in ('pending', 'approved', 'returned')),
  reviewed_by uuid references profiles(id),
  notes text,
  submitted_at timestamp with time zone default now(),
  reviewed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, module_id)
);

-- Capstone submissions table
create table if not exists capstone_submissions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  repo_url text not null,
  live_url text not null,
  writeup text,
  defense_video_url text,
  defense_at timestamp with time zone,
  rubric_scores jsonb,
  result text check (result in ('pending', 'pass', 'fail')),
  graded_by uuid references profiles(id),
  submitted_at timestamp with time zone default now(),
  graded_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id)
);

-- Badges table
create table if not exists badges (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  badge_key text not null,
  earned_at timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  unique(user_id, badge_key)
);

-- XP table
create table if not exists xp (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade unique,
  points integer not null default 0,
  level integer not null default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Streaks table
create table if not exists streaks (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade unique,
  current integer not null default 0,
  longest integer not null default 0,
  last_active timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Step XP claims table (idempotency ledger for per-lesson-step XP awards;
-- see lib/actions/gamification.ts#awardXP)
create table if not exists step_xp_claims (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  module_id integer not null,
  step_id integer not null,
  xp_awarded integer not null,
  awarded_at timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  unique(user_id, module_id, step_id)
);

-- Certificates table
create table if not exists certificates (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  cert_id text not null unique,
  issued_at timestamp with time zone default now(),
  url text,
  created_at timestamp with time zone default now(),
  unique(user_id)
);

-- Learner feedback table
create table if not exists learner_feedback (
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

-- Create indexes for common queries
create index if not exists idx_module_progress_user_id on module_progress(user_id);
create index if not exists idx_module_progress_module_id on module_progress(module_id);
create index if not exists idx_quiz_attempts_user_id on quiz_attempts(user_id);
create index if not exists idx_deliverables_user_id on deliverables(user_id);
create index if not exists idx_badges_user_id on badges(user_id);
create index if not exists idx_step_xp_claims_user_id on step_xp_claims(user_id);
create index if not exists idx_learner_feedback_user_id on learner_feedback(user_id);
