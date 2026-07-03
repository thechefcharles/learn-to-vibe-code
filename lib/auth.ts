import { createClient } from "@/lib/supabase/server";

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserProfile() {
  const supabase = await createClient();
  const user = await getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .single();

  return profile;
}

export async function signUp(
  email: string,
  password: string,
  name: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;
  if (!data.user) throw new Error("Failed to create user");

  // Create profile — role is always "learner" for sign-ups
  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    name,
    email,
    role: "learner",
  });

  if (profileError) throw profileError;

  // Create enrollment (always for learners)
  const { error: enrollmentError } = await supabase
    .from("enrollments")
    .insert({
      user_id: data.user.id,
    });

  if (enrollmentError) throw enrollmentError;

  // Initialize XP and streaks
  await supabase.from("xp").insert({
    user_id: data.user.id,
    points: 0,
    level: 1,
  });

  await supabase.from("streaks").insert({
    user_id: data.user.id,
    current: 0,
    longest: 0,
  });

  return data;
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
