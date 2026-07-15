"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import { loadStripe } from "@stripe/stripe-js";

interface DonationButtonProps {
  amount?: number;
  type?: "coffee" | "tea" | "lunch" | "dinner" | "custom";
  label: string;
  className?: string;
}

/**
 * DonationButton component for handling donations via Stripe Checkout
 * Requires user to be authenticated; redirects to login if not
 */
export function DonationButton({
  amount,
  type,
  label,
  className = "",
}: DonationButtonProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect to login if not authenticated (after auth check completes)
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/support");
    }
  }, [user, authLoading, router]);

  const handleDonate = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user) {
        setError("You must be logged in to donate");
        return;
      }

      // Prepare payload for donation API
      const payload: {
        userId: string;
        type?: string;
        amount?: number;
      } = {
        userId: user.id,
      };

      if (type) {
        payload.type = type;
      } else if (amount) {
        payload.amount = amount;
      }

      // Call donation API endpoint
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to initiate donation");
      }

      const { url } = await response.json();

      if (!url) {
        throw new Error("No checkout URL received from server");
      }

      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
      setIsLoading(false);
    }
  };

  // Show nothing while checking authentication
  if (authLoading) {
    return (
      <button
        disabled
        className={`px-4 py-2 bg-gray-400 text-white font-bold rounded-lg opacity-50 cursor-not-allowed ${className}`}
      >
        Loading...
      </button>
    );
  }

  // If not authenticated, don't render button (useEffect will redirect)
  if (!user) {
    return null;
  }

  return (
    <div>
      <button
        onClick={handleDonate}
        disabled={isLoading}
        className={`px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isLoading ? "Processing..." : label}
      </button>
      {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
    </div>
  );
}
