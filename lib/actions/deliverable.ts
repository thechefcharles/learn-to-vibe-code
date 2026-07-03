"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export interface DeliverableSubmission {
  repoUrl: string;
  liveUrl: string;
}

export async function submitDeliverable(
  moduleId: number,
  { repoUrl, liveUrl }: DeliverableSubmission
) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  // Validate URLs
  const errors: string[] = [];

  if (!isValidUrl(repoUrl)) {
    errors.push("Invalid repository URL format");
  }

  if (!isValidUrl(liveUrl)) {
    errors.push("Invalid live URL format");
  }

  // Check if repo exists (basic check)
  if (!repoUrl.includes("github.com")) {
    errors.push("Repository must be on GitHub");
  }

  if (errors.length > 0) {
    throw new Error(errors.join("; "));
  }

  // Server-side URL reachability check
  const autoChecks: Record<string, boolean> = {};

  try {
    const liveResponse = await fetch(liveUrl, { method: "HEAD" });
    autoChecks["live_url_reachable"] = liveResponse.status < 500;
  } catch {
    autoChecks["live_url_reachable"] = false;
  }

  // Basic GitHub repo check (just verify domain)
  autoChecks["github_repo_exists"] = repoUrl.includes("github.com/");

  const supabase = await createClient();

  // Upsert deliverable (one per user per module)
  const { error } = await supabase
    .from("deliverables")
    .upsert(
      {
        user_id: user.id,
        module_id: moduleId,
        repo_url: repoUrl,
        live_url: liveUrl,
        auto_checks: autoChecks,
        status: "pending",
      },
      {
        onConflict: "user_id,module_id",
      }
    );

  if (error) throw error;

  revalidatePath(`/course/${moduleId}/submit`);
  revalidatePath("/course");
  return { success: true, autoChecks };
}

export async function getDeliverable(moduleId: number) {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("deliverables")
    .select()
    .eq("user_id", user.id)
    .eq("module_id", moduleId)
    .single();

  return data;
}

export async function hasSubmittedDeliverable(moduleId: number): Promise<boolean> {
  const deliverable = await getDeliverable(moduleId);
  return deliverable !== null;
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
