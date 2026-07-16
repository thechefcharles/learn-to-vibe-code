import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import type { Version } from "@/lib/VersionContext";

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
  name: string,
  version: Version = "adult"
) {
  const supabase = await createClient();

  console.log("[signUp] Starting signup for", email, "version:", version);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error("[signUp] Auth error:", error);
    throw error;
  }
  if (!data.user) throw new Error("Failed to create user");

  console.log("[signUp] User created:", data.user.id);

  // Create profile — role is always "learner" for sign-ups
  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    name,
    email,
    role: "learner",
  });

  if (profileError) {
    console.error("[signUp] Profile insert error:", profileError);
    throw profileError;
  }

  console.log("[signUp] Profile created");

  // Create enrollment with version selection
  const { error: enrollmentError } = await supabase
    .from("enrollments")
    .insert({
      user_id: data.user.id,
      enrolled_version: version,
    });

  if (enrollmentError) {
    console.error("[signUp] Enrollment insert error:", enrollmentError);
    throw enrollmentError;
  }

  console.log("[signUp] Enrollment created with version:", version);

  // Initialize XP and streaks using service-role client (bypasses RLS)
  const serviceClient = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  await serviceClient.from("xp").insert({
    user_id: data.user.id,
    points: 0,
    level: 1,
  });

  await serviceClient.from("streaks").insert({
    user_id: data.user.id,
    current: 0,
    longest: 0,
  });

  console.log("[signUp] XP and streaks initialized");

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
