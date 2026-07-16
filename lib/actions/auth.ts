"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { signIn as supabaseSignIn, signUp as supabaseSignUp, signOut as supabaseSignOut } from "@/lib/auth";
import { checkRateLimit, getIpFromHeaders } from "@/lib/rate-limit";
import type { Version } from "@/lib/VersionContext";

export async function signInAction(
  email: string,
  password: string
): Promise<{ error?: string }> {
  try {
    // Normalize email: trim and lowercase for consistent rate-limiting keys
    const normalizedEmail = email.trim().toLowerCase();

    // Get client IP from headers
    const headersList = await headers();
    const ip = getIpFromHeaders(headersList);

    // Rate limit 1: IP-based (strict) — 10 attempts per minute per IP
    // This prevents distributed brute-force attacks
    const { success: ipLimited } = await checkRateLimit(
      `signin:ip:${ip}`,
      10,
      60
    );

    if (!ipLimited) {
      return {
        error: "Too many login attempts from this IP. Try again later.",
      };
    }

    // Attempt sign-in
    try {
      await supabaseSignIn(normalizedEmail, password);
      return {};
    } catch (error) {
      // Rate limit 2: Email-based (lenient, failure-only) — 5 failed attempts per 15 minutes
      // Only rate-limit this email if the sign-in failed
      const { success: emailLimited } = await checkRateLimit(
        `signin:email:${normalizedEmail}`,
        5,
        900
      );

      if (!emailLimited) {
        return {
          error: "Too many failed login attempts for this email. Try again in 15 minutes.",
        };
      }

      // Re-throw the original error
      throw error;
    }
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
    // Normalize email: trim and lowercase for consistent rate-limiting keys
    const normalizedEmail = email.trim().toLowerCase();

    // Rate limiting: 3 requests per 15 minutes per normalized email address
    const { success } = await checkRateLimit(`signup:${normalizedEmail}`, 3, 900);

    if (!success) {
      return {
        error: "Too many signup attempts. Please try again in 15 minutes.",
      };
    }

    await supabaseSignUp(normalizedEmail, password, name, version);
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
