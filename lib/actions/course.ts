"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { hasPassedQuiz } from "./quiz";
import { hasSubmittedDeliverable } from "./deliverable";
import type { Version } from "@/lib/VersionContext";

// Helper to get user's enrolled version
export async function getUserEnrolledVersion(): Promise<Version> {
  const user = await getUser();
  if (!user) return "adult";

  const supabase = await createClient();
  const { data: enrollment } = await supabase
    .from("enrollments")
    .select("enrolled_version")
    .eq("user_id", user.id)
    .single();

  return (enrollment?.enrolled_version as Version) || "adult";
}

export async function getUserModuleProgress(moduleId: number) {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("module_progress")
    .select()
    .eq("user_id", user.id)
    .eq("module_id", moduleId)
    .single();

  return data;
}

export async function markModuleComplete(moduleId: number) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  const supabase = await createClient();

  // Verify all checklist items are completed
  const { data: items } = await supabase
    .from("checklist_items")
    .select("item_key, checked")
    .eq("user_id", user.id)
    .eq("module_id", moduleId);

  const requiredKeys = ["watched", "exercise", "quiz", "deliverable"];
  const allChecked = requiredKeys.every((key) =>
    items?.find((i: any) => i.item_key === key && i.checked)
  );

  if (!allChecked) {
    throw new Error(
      "Cannot mark complete: all checklist items must be checked"
    );
  }

  // Mark module complete
  const { error } = await supabase
    .from("module_progress")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("user_id", user.id)
    .eq("module_id", moduleId);

  if (error) throw error;

  revalidatePath(`/course/${moduleId}`);
  revalidatePath("/course");
  return true;
}

export async function toggleChecklistItem(
  moduleId: number,
  itemKey: string,
  checked: boolean
) {
  const user = await getUser();
  if (!user) throw new Error("Not authenticated");

  const supabase = await createClient();

  // Upsert the checklist item
  const { error } = await supabase
    .from("checklist_items")
    .upsert(
      {
        user_id: user.id,
        module_id: moduleId,
        item_key: itemKey,
        checked,
      },
      {
        onConflict: "user_id,module_id,item_key",
      }
    );

  if (error) throw error;

  revalidatePath(`/course/${moduleId}`);
  return true;
}

export async function getChecklistItems(moduleId: number) {
  const user = await getUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("checklist_items")
    .select()
    .eq("user_id", user.id)
    .eq("module_id", moduleId);

  return data || [];
}

export async function isModuleUnlocked(moduleId: number): Promise<boolean> {
  // Module 1 is always unlocked (first module)
  if (moduleId === 1) return true;

  const user = await getUser();
  if (!user) return false;

  const prevModuleId = moduleId - 1;

  // Check unlock gates for previous module:
  // 1. Quiz passed
  // 2. Deliverable submitted
  const quizPassed = await hasPassedQuiz(prevModuleId);
  const deliverableSubmitted = await hasSubmittedDeliverable(prevModuleId);

  return quizPassed && deliverableSubmitted;
}

export async function getAllModuleProgress() {
  const user = await getUser();
  if (!user) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("module_progress")
    .select()
    .eq("user_id", user.id)
    .order("module_id");

  return data || [];
}
