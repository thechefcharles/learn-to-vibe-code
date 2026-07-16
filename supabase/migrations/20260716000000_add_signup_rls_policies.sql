-- Add INSERT policies for profiles and enrollments tables on signup
-- Fixes sign-up flow where new users couldn't insert their own rows

-- profiles: allow users to insert their own row on signup
create policy "Users can insert own profile on signup"
  on profiles for insert
  with check (auth.uid() = id);

-- enrollments: allow users to insert their own enrollment on signup
create policy "Users can insert own enrollment on signup"
  on enrollments for insert
  with check (auth.uid() = user_id);
