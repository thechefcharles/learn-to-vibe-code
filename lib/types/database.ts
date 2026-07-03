export type Profile = {
  id: string;
  name: string;
  email: string;
  role: "learner" | "instructor";
  plan: string;
  created_at: string;
  updated_at: string;
};

export type Enrollment = {
  id: string;
  user_id: string;
  enrolled_at: string;
  status: "active" | "paused" | "completed";
};

export type ModuleProgress = {
  id: string;
  user_id: string;
  module_id: number;
  status: "not_started" | "in_progress" | "completed";
  unlocked: boolean;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ChecklistItem = {
  id: string;
  user_id: string;
  module_id: number;
  item_key: string;
  checked: boolean;
  created_at: string;
  updated_at: string;
};

export type QuizAttempt = {
  id: string;
  user_id: string;
  module_id: number;
  score: number;
  passed: boolean;
  attempt_no: number;
  taken_at: string;
  created_at: string;
};

export type Deliverable = {
  id: string;
  user_id: string;
  module_id: number;
  repo_url: string;
  live_url: string;
  auto_checks: Record<string, any> | null;
  status: "pending" | "approved" | "returned";
  reviewed_by: string | null;
  notes: string | null;
  submitted_at: string;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type CapstoneSubmission = {
  id: string;
  user_id: string;
  repo_url: string;
  live_url: string;
  writeup: string | null;
  defense_video_url: string | null;
  defense_at: string | null;
  rubric_scores: Record<string, any> | null;
  result: "pending" | "pass" | "fail" | null;
  graded_by: string | null;
  submitted_at: string;
  graded_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Badge = {
  id: string;
  user_id: string;
  badge_key: string;
  earned_at: string;
  created_at: string;
};

export type XP = {
  id: string;
  user_id: string;
  points: number;
  level: number;
  created_at: string;
  updated_at: string;
};

export type Streak = {
  id: string;
  user_id: string;
  current: number;
  longest: number;
  last_active: string | null;
  created_at: string;
  updated_at: string;
};

export type Certificate = {
  id: string;
  user_id: string;
  cert_id: string;
  issued_at: string;
  url: string | null;
  created_at: string;
};
