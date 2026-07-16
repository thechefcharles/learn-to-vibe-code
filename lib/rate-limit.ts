/**
 * In-memory rate limiter with sliding window algorithm
 * Fallback implementation when Upstash Redis is not available
 *
 * Production: Use Upstash Redis for distributed rate limiting across multiple instances
 * Local: This in-memory implementation works for development
 */

interface RequestRecord {
  timestamps: number[];
}

// In-memory store: identifier -> array of request timestamps
const rateLimitStore = new Map<string, RequestRecord>();

// Cleanup interval: remove old entries every 30 seconds
const CLEANUP_INTERVAL = 30 * 1000;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes in milliseconds
const MAX_REQUESTS = 5;

// Start cleanup timer
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    // Remove timestamps older than the window
    record.timestamps = record.timestamps.filter(
      (timestamp) => now - timestamp < WINDOW_MS
    );
    // Remove empty records
    if (record.timestamps.length === 0) {
      rateLimitStore.delete(key);
    }
  }
}, CLEANUP_INTERVAL);

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number; // timestamp when the oldest request in window expires
}

/**
 * Check rate limit for an identifier (IP address, email, etc.)
 * Uses sliding window algorithm: 5 requests per 15 minutes
 *
 * @param identifier - Unique identifier (IP, email, etc.)
 * @returns Result with success status, remaining requests, and reset time
 */
export async function checkRateLimit(identifier: string): Promise<RateLimitResult> {
  try {
    const now = Date.now();

    // Get or create record for this identifier
    let record = rateLimitStore.get(identifier);
    if (!record) {
      record = { timestamps: [] };
      rateLimitStore.set(identifier, record);
    }

    // Remove timestamps outside the sliding window
    record.timestamps = record.timestamps.filter(
      (timestamp) => now - timestamp < WINDOW_MS
    );

    // Check if limit exceeded (allow MAX_REQUESTS requests)
    if (record.timestamps.length >= MAX_REQUESTS) {
      const oldestTimestamp = Math.min(...record.timestamps);
      const reset = oldestTimestamp + WINDOW_MS;
      return {
        success: false,
        remaining: 0,
        reset,
      };
    }

    // Add current request timestamp
    record.timestamps.push(now);

    // Calculate when the limit will be reset (when oldest request expires)
    const reset = record.timestamps.length > 0
      ? Math.min(...record.timestamps) + WINDOW_MS
      : now + WINDOW_MS;

    return {
      success: true,
      remaining: MAX_REQUESTS - record.timestamps.length,
      reset,
    };
  } catch (error) {
    console.error("Rate limit check failed:", error);
    // Fail open: allow request if there's an error
    return {
      success: true,
      remaining: -1,
      reset: 0,
    };
  }
}

/**
 * Get IP address from request headers
 * Extracts from x-forwarded-for header (works with Vercel and proxies)
 *
 * @param headers - Request headers
 * @returns IP address or 'unknown'
 */
export function getIpFromHeaders(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs; take the first one
    return forwardedFor.split(",")[0].trim();
  }
  return headers.get("x-real-ip") || "unknown";
}
