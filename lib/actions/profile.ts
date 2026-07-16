"use server";

import { createClient } from "@supabase/supabase-js";
import { getUser } from "@/lib/auth";

/**
 * Profile Management — Server actions for user profile updates and account deletion
 * Uses service role key for sensitive auth operations (user metadata, account deletion)
 */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function updateUserProfile(
  name: string,
  email: string
): Promise<{ success?: boolean; error?: string; message?: string }> {
  try {
    const user = await getUser();
    if (!user) {
      return { error: "Not authenticated" };
    }

    // Update user metadata (name)
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      user.id,
      {
        user_metadata: {
          name: name,
        },
      }
    );

    if (updateError) {
      console.error("[updateUserProfile] Metadata update error:", updateError);
      return { error: updateError.message || "Failed to update profile" };
    }

    // Update email if changed
    if (email !== user.email) {
      const { error: emailError } = await supabase.auth.admin.updateUserById(
        user.id,
        {
          email: email,
          email_confirm: false,
        }
      );

      if (emailError) {
        console.error("[updateUserProfile] Email update error:", emailError);
        return { error: emailError.message || "Failed to update email" };
      }
    }

    console.log("[updateUserProfile] Profile updated for user:", user.id);
    return {
      success: true,
      message: email !== user.email
        ? "Confirmation email sent. Please check your new email address to complete the change."
        : undefined,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update profile";
    console.error("[updateUserProfile] Unexpected error:", message);
    return { error: message };
  }
}

export async function deleteUserAccount(): Promise<{ success?: boolean; error?: string }> {
  try {
    const user = await getUser();
    if (!user) {
      return { error: "Not authenticated" };
    }

    // Delete user (cascade delete via RLS policies)
    const { error } = await supabase.auth.admin.deleteUser(user.id);

    if (error) {
      console.error("[deleteUserAccount] Delete error:", error);
      return { error: error.message || "Failed to delete account" };
    }

    console.log("[deleteUserAccount] Account deleted for user:", user.id);
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete account";
    console.error("[deleteUserAccount] Unexpected error:", message);
    return { error: message };
  }
}
