/**
 * In-memory rate limiter with sliding window algorithm
 * Fallback implementation when Upstash Redis is not available
 *
 * Production: Use Upstash Redis for distributed rate limiting across multiple instances
 * Local: This in-memory implementation works for development
 */

interface RequestRecord {
  windowBuckets: Record<string, number[]>;
}

// In-memory store: identifier -> window bucket records
const rateLimitStore = new Map<string, RequestRecord>();

// Cleanup interval: remove old entries every 30 seconds
const CLEANUP_INTERVAL = 30 * 1000;

// Warn if Redis is not configured for production
if (!process.env.UPSTASH_REDIS_REST_URL) {
  console.warn(
    'UPSTASH_REDIS_REST_URL not configured. In-memory rate limiting will NOT work correctly on Vercel (serverless instances do not share memory). Configure Upstash Redis before production deployment.'
  );
}

// Start cleanup timer
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    // Remove old records
    for (const [windowKey, timestamps] of Object.entries(record.windowBuckets)) {
      const windowMs = parseInt(windowKey);
      record.windowBuckets[windowKey] = timestamps.filter(
        (timestamp) => now - timestamp < windowMs
      );
      if (record.windowBuckets[windowKey].length === 0) {
        delete record.windowBuckets[windowKey];
      }
    }

    if (Object.keys(record.windowBuckets).length === 0) {
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
 * Uses sliding window algorithm
 *
 * @param identifier - Unique identifier (IP, email, etc.)
 * @param maxRequests - Maximum requests allowed (default: 5)
 * @param windowSeconds - Time window in seconds (default: 900 = 15 minutes)
 * @returns Result with success status, remaining requests, and reset time
 */
export async function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowSeconds: number = 900
): Promise<RateLimitResult> {
  try {
    const now = Date.now();
    const windowMs = windowSeconds * 1000;
    const windowKey = windowMs.toString();

    // Get or create record for this identifier
    let record = rateLimitStore.get(identifier);
    if (!record) {
      record = { windowBuckets: {} };
      rateLimitStore.set(identifier, record);
    }

    // Get timestamps for this window, or initialize empty array
    let timestamps = record.windowBuckets[windowKey] || [];

    // Remove timestamps outside the sliding window
    const validTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < windowMs
    );

    // Check if limit exceeded
    if (validTimestamps.length >= maxRequests) {
      const oldestTimestamp = Math.min(...validTimestamps);
      const reset = oldestTimestamp + windowMs;
      return {
        success: false,
        remaining: 0,
        reset,
      };
    }

    // Add current request timestamp
    validTimestamps.push(now);
    record.windowBuckets[windowKey] = validTimestamps;
    rateLimitStore.set(identifier, record);

    // Calculate when the limit will be reset
    const reset = validTimestamps.length > 0
      ? Math.min(...validTimestamps) + windowMs
      : now + windowMs;

    return {
      success: true,
      remaining: maxRequests - validTimestamps.length,
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
    // x-forwarded-for can contain multiple IPs
    // Vercel appends the real IP as the LAST entry, so take the last one
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    return ips[ips.length - 1];
  }
  return headers.get("x-real-ip") || "unknown";
}
