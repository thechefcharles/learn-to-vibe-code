"use server";

import { signIn as supabaseSignIn, signUp as supabaseSignUp } from "@/lib/auth";

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
  name: string
): Promise<{ error?: string }> {
  try {
    await supabaseSignUp(email, password, name);
    return {};
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Sign up failed",
    };
  }
}
