-- Seed test data for development

-- Insert test users via auth (these would normally be created via sign-up)
-- For seed purposes, we'll insert into profiles table directly

-- Instructor profile
insert into profiles (id, name, email, role, plan, created_at)
values (
  'a0000000-0000-0000-0000-000000000001'::uuid,
  'Charlie Foreman',
  'instructor@learn-to-vibe-code.test',
  'instructor',
  'pro',
  now()
)
on conflict do nothing;

-- Demo learner profile
insert into profiles (id, name, email, role, plan, created_at)
values (
  'b0000000-0000-0000-0000-000000000001'::uuid,
  'Demo Learner',
  'learner@learn-to-vibe-code.test',
  'learner',
  'free',
  now()
)
on conflict do nothing;

-- Create enrollment for demo learner
insert into enrollments (user_id, enrolled_at, status)
values (
  'b0000000-0000-0000-0000-000000000001'::uuid,
  now(),
  'active'
)
on conflict do nothing;

-- Initialize XP and streaks for demo learner
insert into xp (user_id, points, level, created_at)
values (
  'b0000000-0000-0000-0000-000000000001'::uuid,
  0,
  1,
  now()
)
on conflict do nothing;

insert into streaks (user_id, current, longest, last_active, created_at)
values (
  'b0000000-0000-0000-0000-000000000001'::uuid,
  0,
  0,
  null,
  now()
)
on conflict do nothing;

-- Initialize module progress for modules 0-15
insert into module_progress (user_id, module_id, status, unlocked, created_at)
select
  'b0000000-0000-0000-0000-000000000001'::uuid,
  module_id,
  'not_started',
  (module_id = 0), -- Only module 0 is unlocked initially
  now()
from (
  select generate_series(0, 15) as module_id
) modules
on conflict do nothing;
