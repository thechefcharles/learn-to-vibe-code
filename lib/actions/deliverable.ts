"use server";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { lookup } from "node:dns/promises";
import net from "node:net";

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

  // Server-side URL reachability check with SSRF protection
  const autoChecks: Record<string, boolean> = {};

  try {
    // Validate that URL resolves to a public IP (prevent SSRF)
    await assertPublicUrl(liveUrl);

    // Fetch with timeout and no automatic redirect following
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const liveResponse = await fetch(liveUrl, {
      method: "HEAD",
      redirect: "manual",
      signal: controller.signal,
    });

    clearTimeout(timeout);
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

async function assertPublicUrl(urlString: string): Promise<void> {
  const url = new URL(urlString);

  // Only allow http and https
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("URL must use http or https");
  }

  // Resolve hostname to IP address
  let address: string;
  try {
    const result = await lookup(url.hostname);
    address = result.address;
  } catch {
    throw new Error("Could not resolve hostname");
  }

  // Reject private/loopback/link-local/unspecified IPs
  const isPrivate = (ip: string) => {
    // IPv4 patterns
    if (
      /^127\./.test(ip) || // loopback 127.x.x.x
      /^10\./.test(ip) || // private 10.x.x.x
      /^192\.168\./.test(ip) || // private 192.168.x.x
      /^169\.254\./.test(ip) || // link-local 169.254.x.x
      /^0\./.test(ip) || // 0.x.x.x
      /^172\.(1[6-9]|2\d|3[01])\./.test(ip) // private 172.16-31.x.x
    ) {
      return true;
    }
    // IPv6 loopback/private patterns
    if (/^::1$|^fc|^fd|^fe80/.test(ip)) {
      return true;
    }
    return false;
  };

  if (isPrivate(address)) {
    throw new Error("URL must not point to a private or loopback address");
  }
}
