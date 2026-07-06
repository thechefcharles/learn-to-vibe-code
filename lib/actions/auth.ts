"use server";

import { redirect } from "next/navigation";
import { signIn as supabaseSignIn, signUp as supabaseSignUp, signOut as supabaseSignOut } from "@/lib/auth";
import type { Version } from "@/lib/VersionContext";

export async function signInAction(
  email: string,
  password: string
): Promise<{ error?: string }> {
  try {
    await supabaseSignIn(email, password);
    return {};
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Sign in failed",
    };
  }
}

export async function signUpAction(
  email: string,
  password: string,
  name: string,
  version: Version = "adult"
): Promise<{ error?: string }> {
  try {
    await supabaseSignUp(email, password, name, version);
    return {};
  } catch (error) {
    const message = error instanceof Error ? error.message : "Sign up failed";
    console.error("[signUpAction] Error:", message, error);
    return { error: message };
  }
}

export async function signOutAction(): Promise<void> {
  try {
    await supabaseSignOut();
    redirect("/auth/sign-in");
  } catch (error) {
    console.error("[signOutAction] Error:", error);
    throw error;
  }
}
