-- Create donations table for tracking optional donations (no subscription model)
create table if not exists donations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'usd',
  stripe_session_id text unique not null,
  stripe_charge_id text,
  status text not null default 'pending' check (status in ('pending', 'success', 'failed')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create indexes for common queries
create index if not exists idx_donations_user_id on donations(user_id);
create index if not exists idx_donations_status on donations(status);

-- Enable Row Level Security
alter table donations enable row level security;

-- DONATIONS TABLE POLICIES
-- Learners can view/insert only their own donations
create policy "Users can view their own donations"
  on donations for select
  using (auth.uid() = user_id);

create policy "Users can insert their own donations"
  on donations for insert
  with check (auth.uid() = user_id);

-- Instructors can view all donations (for audit/reporting purposes)
create policy "Instructors can view all donations"
  on donations for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'instructor'
    )
  );
