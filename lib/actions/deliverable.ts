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
    // Validate that URL resolves to a public IP and get the safe IP to use
    const safeIp = await getPublicIpForUrl(liveUrl);

    // Fetch with timeout and no automatic redirect following
    // Use the resolved IP directly to prevent DNS rebinding attacks
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const url = new URL(liveUrl);
    const fetchUrl = liveUrl.replace(url.hostname, safeIp);

    const liveResponse = await fetch(fetchUrl, {
      method: "HEAD",
      headers: { Host: url.hostname }, // Preserve original hostname in Host header
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

export async function getPublicIpForUrl(urlString: string): Promise<string> {
  const url = new URL(urlString);

  // Only allow http and https
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("URL must use http or https");
  }

  // Resolve hostname to ALL possible IP addresses
  let addresses: Array<{ address: string; family: number }>;
  try {
    addresses = await lookup(url.hostname, {
      all: true,
      verbatim: true,
    });
  } catch {
    throw new Error("Could not resolve hostname");
  }

  if (addresses.length === 0) {
    throw new Error("Hostname resolved to no addresses");
  }

  // Check if address is private/loopback/link-local/unspecified
  const isPrivateOrLoopback = (ip: string): boolean => {
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

    // IPv6 patterns (comprehensive)
    if (
      /^::1$/.test(ip) || // loopback ::1
      /^::$/.test(ip) || // unspecified ::
      /^::0$/.test(ip) || // unspecified ::0
      /^fc/.test(ip) || // unique local fc00::/7
      /^fd/.test(ip) || // unique local fd00::/8
      /^fe80/.test(ip) || // link-local fe80::/10
      /^::ffff:/.test(ip) // IPv4-mapped IPv6
    ) {
      return true;
    }

    return false;
  };

  // Find first public address
  const publicAddress = addresses.find(
    (addr) => !isPrivateOrLoopback(addr.address)
  );
  if (!publicAddress) {
    throw new Error(
      "URL must not point to a private, loopback, or link-local address"
    );
  }

  return publicAddress.address;
}
