"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * Client-side hook to fetch and manage current user authentication state
 * Uses the /api/auth/user endpoint to check if user is authenticated
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/auth/user", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Not authenticated
            if (isMounted) {
              setUser(null);
              setLoading(false);
            }
            return;
          }
          throw new Error(`Auth error: ${response.status}`);
        }

        const userData = await response.json();
        if (isMounted) {
          setUser(userData);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : "Failed to fetch user";
          setError(message);
          setUser(null);
          setLoading(false);
        }
      }
    }

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading, error };
}
