// Auth layer (stub).
//
// In production this module would export a configured Supabase client and the
// Reading List would be scoped to the signed-in user via Row-Level Security.
// For the practice repo we stub it so the app runs without credentials — but
// the shape is here so you can trace "where auth would live" when you map the
// architecture (Objective 1 of the module).
//
// If you want to wire it up for real, this is the seam:
//   import { createBrowserClient } from "@supabase/ssr";
//   export const supabase = createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
//   );

export interface AuthUser {
  id: string;
  email: string;
}

// Stubbed "current user" — stands in for a real Supabase session.
export async function getCurrentUser(): Promise<AuthUser | null> {
  return { id: "practice-user", email: "learner@example.com" };
}
