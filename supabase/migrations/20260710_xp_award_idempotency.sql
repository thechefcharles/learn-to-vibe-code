-- Security fix: server-side authorization + idempotency for XP awards (IDOR fix)
--
-- `awardXP` is invoked directly from a Client Component, so it is a public
-- RPC endpoint that must never trust a client-supplied user id or XP amount.
-- This migration adds the tables needed to (a) resolve rewards from
-- server-side data only and (b) make awarding idempotent so replaying the
-- call cannot be used to farm XP.

-- Step XP claims: one row per (user, module, step) that has had its XP
-- awarded. The unique constraint is what makes `awardXP` idempotent.
create table if not exists step_xp_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  module_id integer not null,
  step_id integer not null,
  xp_awarded integer not null,
  awarded_at timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  unique(user_id, module_id, step_id)
);

create index if not exists idx_step_xp_claims_user_id on step_xp_claims(user_id);

alter table step_xp_claims enable row level security;

-- Like xp/badges/streaks, there is intentionally no INSERT/UPDATE policy for
-- the authenticated role. Rows are only ever written by the service-role
-- client from lib/actions/gamification.ts (see awardXP), never directly by
-- a learner's own client — otherwise a learner could insert their own claim
-- rows (or flip xp_awarded on quiz_attempts) to farm XP directly via the
-- table API, bypassing the server-side amount/idempotency checks entirely.
create policy "Users can view their own step xp claims"
  on step_xp_claims for select
  using (auth.uid() = user_id);

-- Quiz XP idempotency: track whether XP has already been granted for a
-- given quiz attempt, so `awardQuizXP` can claim it exactly once (guarded
-- by a conditional update in application code).
alter table quiz_attempts
add column if not exists xp_awarded boolean not null default false;

comment on table step_xp_claims is 'Idempotency ledger for per-lesson-step XP awards. Prevents replaying awardXP() to farm XP.';
comment on column quiz_attempts.xp_awarded is 'Whether XP has already been granted for this quiz attempt (idempotency guard for awardQuizXP).';
