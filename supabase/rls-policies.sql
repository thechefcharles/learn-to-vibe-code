-- Enable Row Level Security on all tables
alter table profiles enable row level security;
alter table enrollments enable row level security;
alter table module_progress enable row level security;
alter table checklist_items enable row level security;
alter table quiz_attempts enable row level security;
alter table deliverables enable row level security;
alter table capstone_submissions enable row level security;
alter table badges enable row level security;
alter table xp enable row level security;
alter table streaks enable row level security;
alter table certificates enable row level security;

-- PROFILES TABLE POLICIES
-- Learners can view their own profile
create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

-- Instructors can view all profiles
create policy "Instructors can view all profiles"
  on profiles for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'instructor'
    )
  );

-- Users can update their own profile
create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ENROLLMENTS TABLE POLICIES
-- Learners can view their own enrollment
create policy "Users can view their own enrollment"
  on enrollments for select
  using (auth.uid() = user_id);

-- Instructors can view all enrollments
create policy "Instructors can view all enrollments"
  on enrollments for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'instructor'
    )
  );

-- MODULE PROGRESS TABLE POLICIES
-- Learners can view their own progress
create policy "Users can view their own module progress"
  on module_progress for select
  using (auth.uid() = user_id);

-- Learners can update their own progress
create policy "Users can update their own module progress"
  on module_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Instructors can view all progress
create policy "Instructors can view all module progress"
  on module_progress for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'instructor'
    )
  );

-- CHECKLIST ITEMS TABLE POLICIES
-- Learners can view/update their own checklists
create policy "Users can view their own checklists"
  on checklist_items for select
  using (auth.uid() = user_id);

create policy "Users can update their own checklists"
  on checklist_items for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can insert their own checklists"
  on checklist_items for insert
  with check (auth.uid() = user_id);

-- QUIZ ATTEMPTS TABLE POLICIES
-- Learners can view their own attempts
create policy "Users can view their own quiz attempts"
  on quiz_attempts for select
  using (auth.uid() = user_id);

-- Learners can insert their own attempts
create policy "Users can insert their own quiz attempts"
  on quiz_attempts for insert
  with check (auth.uid() = user_id);

-- Instructors can view all attempts
create policy "Instructors can view all quiz attempts"
  on quiz_attempts for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'instructor'
    )
  );

-- DELIVERABLES TABLE POLICIES
-- Learners can view their own deliverables
create policy "Users can view their own deliverables"
  on deliverables for select
  using (auth.uid() = user_id);

-- Learners can insert their own deliverables with safe defaults only
create policy "Users can insert their own deliverables"
  on deliverables for insert
  with check (
    auth.uid() = user_id
    and status = 'pending'
    and reviewed_by is null
    and reviewed_at is null
    and notes is null
    and auto_checks is null
  );

-- Instructors can view all deliverables and update (review) them
create policy "Instructors can view all deliverables"
  on deliverables for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'instructor'
    )
  );

create policy "Instructors can review deliverables"
  on deliverables for update
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'instructor'
    )
  );

-- CAPSTONE SUBMISSIONS TABLE POLICIES
-- Learners can view their own submissions
create policy "Users can view their own capstone submission"
  on capstone_submissions for select
  using (auth.uid() = user_id);

-- Learners can insert their own submission with safe defaults only
create policy "Users can insert their own capstone submission"
  on capstone_submissions for insert
  with check (
    auth.uid() = user_id
    and result is null
    and graded_by is null
    and graded_at is null
    and rubric_scores is null
  );

-- Instructors can view and grade
create policy "Instructors can view all capstone submissions"
  on capstone_submissions for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'instructor'
    )
  );

create policy "Instructors can grade capstone submissions"
  on capstone_submissions for update
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'instructor'
    )
  );

-- BADGES TABLE POLICIES
-- Learners can view their own badges
create policy "Users can view their own badges"
  on badges for select
  using (auth.uid() = user_id);

-- Instructors can view all badges
create policy "Instructors can view all badges"
  on badges for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'instructor'
    )
  );

-- XP TABLE POLICIES
-- Learners can view their own XP
create policy "Users can view their own XP"
  on xp for select
  using (auth.uid() = user_id);

-- STREAKS TABLE POLICIES
-- Learners can view their own streaks
create policy "Users can view their own streaks"
  on streaks for select
  using (auth.uid() = user_id);

-- CERTIFICATES TABLE POLICIES
-- Learners can view their own certificates
create policy "Users can view their own certificates"
  on certificates for select
  using (auth.uid() = user_id);

-- Instructors can view all certificates
create policy "Instructors can view all certificates"
  on certificates for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'instructor'
    )
  );
